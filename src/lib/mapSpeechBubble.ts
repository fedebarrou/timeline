/**
 * Speech-bubble overlay anchored to character pins.
 *
 * Listens to `timeline:character-active` (dispatched by
 * CharacterInfoPanel whenever it cycles to a new character) and, if the
 * character has a `quote`, anchors a small papyrus-toned bubble next to
 * that character's pin on the SVG map. The bubble fades in, lingers for
 * a few seconds, and fades out — or is replaced immediately if a new
 * character becomes active before it dissolves.
 *
 * Pin discovery uses the pair `[data-marker][data-char-id]` selectors
 * added in mapMarkers.ts. Bubble position tracks the pin in screen
 * coordinates via `getBoundingClientRect`, so it follows map pans/zooms
 * driven by the camera (the screen rect changes as the SVG transform
 * does, and we re-position on each frame while visible).
 */

interface ActiveCharDetail {
  eventId: string;
  charId: string;
  quote?: string | null;
  name?: string | null;
}

let bubble: HTMLElement | null = null;
let pinEl: SVGElement | null = null;
let rafId: number | null = null;
let hideTimer: number | null = null;
let stylesInstalled = false;

const SHOW_MS = 5200;       // total visible duration before auto-hide
const FADE_IN_MS = 320;
const FADE_OUT_MS = 420;

function installStyles(): void {
  if (stylesInstalled) return;
  stylesInstalled = true;
  const css = `
    [data-speech-bubble] {
      position: fixed;
      z-index: 70;
      max-width: 320px;
      min-width: 160px;
      padding: 0.65rem 0.95rem 0.7rem;
      pointer-events: none;
      opacity: 0;
      transform: translateY(6px) scale(0.96);
      transition: opacity ${FADE_IN_MS}ms ease, transform ${FADE_IN_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1);
      background-color: color-mix(in srgb, var(--era-text, #e8d4c8) 96%, var(--era-bg, #1a0f08) 4%);
      background-image:
        radial-gradient(
          ellipse at center,
          transparent 55%,
          color-mix(in srgb, var(--era-primary, #a04048) 16%, transparent) 100%
        ),
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.10  0 0 0 0 0.06  0 0 0 0.16 0'/></filter><rect width='220' height='220' filter='url(%23n)'/></svg>");
      background-size: cover, 220px 220px;
      background-blend-mode: multiply, multiply;
      border: 1.5px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
      border-radius: 8px;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--era-text, #e8d4c8) 70%, transparent),
        0 8px 22px rgba(0, 0, 0, 0.5);
      color: #1a0f08;
      font-family: var(--era-body, 'EB Garamond', Georgia, serif);
      font-size: 14px;
      line-height: 1.45;
    }
    [data-speech-bubble].is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    [data-speech-bubble].is-leaving {
      transition: opacity ${FADE_OUT_MS}ms ease, transform ${FADE_OUT_MS}ms ease;
      opacity: 0;
      transform: translateY(-6px) scale(0.97);
    }
    [data-speech-bubble] .sb-quote { font-style: italic; }
    [data-speech-bubble] .sb-quote::before { content: '“'; margin-right: 2px; }
    [data-speech-bubble] .sb-quote::after  { content: '”'; margin-left: 2px; }
    [data-speech-bubble] .sb-attrib {
      margin-top: 0.35rem;
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.72;
      color: color-mix(in srgb, var(--era-primary, #a04048) 70%, #1a0f08);
    }
    /* Tail — a small rotated square pointing toward the pin. Positioned
       absolutely on the LEFT edge of the bubble; mapSpeechBubble flips
       the side when the bubble has to render on the LEFT of the pin. */
    [data-speech-bubble] .sb-tail {
      position: absolute;
      width: 10px;
      height: 10px;
      background: inherit;
      border-left: 1.5px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
      border-bottom: 1.5px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
      transform: rotate(45deg);
      top: 50%;
      margin-top: -5px;
      left: -6px;
    }
    [data-speech-bubble][data-side="right"] .sb-tail {
      left: auto;
      right: -6px;
      border-left: none;
      border-bottom: none;
      border-right: 1.5px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
      border-top: 1.5px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
    }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-speech-bubble-styles', '');
  style.textContent = css;
  document.head.appendChild(style);
}

function ensureBubble(): HTMLElement {
  if (bubble) return bubble;
  installStyles();
  bubble = document.createElement('div');
  bubble.setAttribute('data-speech-bubble', '');
  bubble.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bubble);
  return bubble;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function findPin(eventId: string, charId: string): SVGElement | null {
  return document.querySelector<SVGElement>(
    `[data-marker="${eventId}"] [data-char-pin-wrap][data-char-id="${charId}"]`,
  );
}

function positionBubble(): void {
  if (!bubble || !pinEl) return;
  const r = pinEl.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) {
    // Pin not visible / not painted — hide instead of pinning to (0,0).
    bubble.classList.remove('is-visible');
    return;
  }
  const w = bubble.offsetWidth || 220;
  const h = bubble.offsetHeight || 60;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = 14;
  // Default: bubble RIGHT of the pin, vertically centered.
  let x = r.right + pad;
  let y = r.top + r.height / 2 - h / 2;
  let side = 'left'; // tail on the bubble's LEFT, pointing at pin on its left
  if (x + w + 8 > vw) {
    // Flip to the LEFT of the pin instead.
    x = r.left - w - pad;
    side = 'right'; // tail on the bubble's RIGHT, pointing at pin on its right
  }
  if (y < 8) y = 8;
  if (y + h + 8 > vh) y = vh - h - 8;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.setAttribute('data-side', side);
}

function trackLoop(): void {
  positionBubble();
  rafId = requestAnimationFrame(trackLoop);
}

function startTracking(): void {
  if (rafId == null) rafId = requestAnimationFrame(trackLoop);
}
function stopTracking(): void {
  if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
}

function hide(): void {
  if (!bubble) return;
  bubble.classList.add('is-leaving');
  bubble.classList.remove('is-visible');
  if (hideTimer != null) { clearTimeout(hideTimer); hideTimer = null; }
  setTimeout(() => {
    if (!bubble) return;
    bubble.classList.remove('is-leaving');
    stopTracking();
    pinEl = null;
  }, FADE_OUT_MS + 40);
}

function show(detail: ActiveCharDetail): void {
  const quote = (detail.quote ?? '').trim();
  if (!quote) { hide(); return; }
  const pin = findPin(detail.eventId, detail.charId);
  if (!pin) { hide(); return; }
  const el = ensureBubble();
  pinEl = pin;
  el.innerHTML = `
    <div class="sb-tail"></div>
    <div class="sb-quote">${escapeHtml(quote)}</div>
    ${detail.name ? `<div class="sb-attrib">— ${escapeHtml(detail.name)}</div>` : ''}
  `;
  positionBubble();
  startTracking();
  // Next frame so the appended HTML has laid out before the transition.
  requestAnimationFrame(() => {
    el.classList.remove('is-leaving');
    el.classList.add('is-visible');
  });
  if (hideTimer != null) clearTimeout(hideTimer);
  hideTimer = window.setTimeout(hide, SHOW_MS);
}

/** Install ONE global listener for the `timeline:character-active`
 *  event. Idempotent. */
let installed = false;
export function initSpeechBubble(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  window.addEventListener('timeline:character-active', (ev: Event) => {
    const d = (ev as CustomEvent<ActiveCharDetail>).detail;
    if (!d) return;
    show(d);
  });
  // Hide on scene change so a leftover bubble for the previous scene
  // doesn't ghost over the new one until its timeout drains.
  window.addEventListener('timeline:scene-changed', () => hide());
}
