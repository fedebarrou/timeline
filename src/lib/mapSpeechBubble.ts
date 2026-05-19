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

import { VIRTUAL_SPEAKERS, type DialogEventDetail } from './dialogTypes';

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

// ─── Dialog overlay state ────────────────────────────────────────────────
// Up to 2 simultaneous dialog bubbles, FIFO queue for overflow. Distinct
// from the single `bubble` (which serves timeline:character-active).

const MAX_DIALOG_BUBBLES = 2;
const DIALOG_FADE_IN_MS = 280;
const DIALOG_FADE_OUT_MS = 380;

interface DialogSlot {
  el: HTMLElement;
  rafId: number | null;
  hideTimer: number | null;
  pinEl: SVGElement | null;
  /** Virtual position (svg viewport-relative) when no pin. */
  virtualAnchor: 'top-center' | 'top-side' | 'bottom-center' | null;
  /** Connector path drawn to addressee, if any. */
  connector: SVGPathElement | null;
  /** Element to anchor connector start from (DOM rect). */
  speakerRectSrc: SVGElement | null;
  addresseeEl: SVGElement | null;
}

const dialogSlots: DialogSlot[] = [];
const dialogQueue: DialogEventDetail[] = [];
let dialogStylesInstalled = false;

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

// ─── Dialog bubble (char-to-char) ────────────────────────────────────────

function installDialogStyles(): void {
  if (dialogStylesInstalled) return;
  dialogStylesInstalled = true;
  const css = `
    [data-dialog-bubble] {
      position: fixed;
      z-index: 71;
      max-width: 280px;
      min-width: 140px;
      padding: 0.55rem 0.85rem 0.6rem;
      pointer-events: none;
      opacity: 0;
      transform: translateY(6px) scale(0.96);
      transition: opacity ${DIALOG_FADE_IN_MS}ms ease, transform ${DIALOG_FADE_IN_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1);
      background-color: color-mix(in srgb, var(--era-text, #e8d4c8) 96%, var(--era-bg, #1a0f08) 4%);
      border: 1.5px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
      border-radius: 8px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
      color: #1a0f08;
      font-family: var(--era-body, 'EB Garamond', Georgia, serif);
      font-size: 13px;
      line-height: 1.42;
    }
    [data-dialog-bubble].is-visible { opacity: 1; transform: translateY(0) scale(1); }
    [data-dialog-bubble].is-leaving {
      transition: opacity ${DIALOG_FADE_OUT_MS}ms ease, transform ${DIALOG_FADE_OUT_MS}ms ease;
      opacity: 0; transform: translateY(-6px) scale(0.97);
    }
    [data-dialog-bubble] .db-text { font-style: italic; }
    [data-dialog-bubble] .db-text::before { content: '“'; margin-right: 2px; }
    [data-dialog-bubble] .db-text::after  { content: '”'; margin-left: 2px; }
    /* Virtual speakers — distinct treatments. */
    [data-dialog-bubble][data-virtual="yahve"],
    [data-dialog-bubble][data-virtual="allah"],
    [data-dialog-bubble][data-virtual="dios-padre"] {
      border-color: #ffd866;
      box-shadow: 0 0 0 1px rgba(255, 216, 102, 0.45), 0 6px 22px rgba(0, 0, 0, 0.55);
      background-color: color-mix(in srgb, #ffd866 12%, var(--era-text, #e8d4c8));
    }
    [data-dialog-bubble][data-virtual="yahve"] .db-text,
    [data-dialog-bubble][data-virtual="allah"] .db-text,
    [data-dialog-bubble][data-virtual="dios-padre"] .db-text {
      font-style: italic;
      font-weight: 600;
    }
    [data-dialog-bubble][data-virtual="angel-anonimo"] {
      border-color: #ffffff;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.45), 0 6px 22px rgba(0, 0, 0, 0.5);
      background-color: color-mix(in srgb, #ffffff 16%, var(--era-text, #e8d4c8));
    }
    [data-dialog-bubble][data-virtual="voz-multitud"] {
      text-transform: lowercase;
      font-variant: small-caps;
      letter-spacing: 0.05em;
    }
    [data-dialog-bubble] .db-attrib {
      margin-top: 0.3rem;
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.72;
      color: color-mix(in srgb, var(--era-primary, #a04048) 70%, #1a0f08);
    }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-dialog-bubble-styles', '');
  style.textContent = css;
  document.head.appendChild(style);
}

function getMapSvg(): SVGSVGElement | null {
  return document.querySelector<SVGSVGElement>('[data-map-root]');
}

function findCharPin(eventId: string, charId: string): SVGElement | null {
  return document.querySelector<SVGElement>(
    `[data-marker="${eventId}"] [data-char-pin-wrap][data-char-id="${charId}"]`,
  );
}

function virtualAnchorRect(kind: 'top-center' | 'top-side' | 'bottom-center'): { x: number; y: number; w: number; h: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  switch (kind) {
    case 'top-center':    return { x: vw / 2, y: 80,           w: 0, h: 0 };
    case 'top-side':      return { x: vw - 180, y: 90,         w: 0, h: 0 };
    case 'bottom-center': return { x: vw / 2, y: vh - 120,     w: 0, h: 0 };
  }
}

function positionDialogSlot(slot: DialogSlot): void {
  const el = slot.el;
  if (!el) return;
  let cx = 0, cy = 0;
  if (slot.pinEl) {
    const r = slot.pinEl.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) { el.classList.remove('is-visible'); return; }
    cx = r.right;
    cy = r.top + r.height / 2;
  } else if (slot.virtualAnchor) {
    const a = virtualAnchorRect(slot.virtualAnchor);
    cx = a.x; cy = a.y;
  }
  const w = el.offsetWidth || 200;
  const h = el.offsetHeight || 50;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = 14;
  let x = cx + pad;
  let y = cy - h / 2;
  if (x + w + 8 > vw) x = cx - w - pad;
  if (y < 8) y = 8;
  if (y + h + 8 > vh) y = vh - h - 8;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  // update connector
  updateDialogConnector(slot, x + w / 2, y + h / 2);
}

function updateDialogConnector(slot: DialogSlot, bx: number, by: number): void {
  if (!slot.connector || !slot.addresseeEl) return;
  const r = slot.addresseeEl.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return;
  const ax = r.left + r.width / 2;
  const ay = r.top + r.height / 2;
  // Convert from viewport to SVG coordinates using the map SVG's matrix.
  const svg = getMapSvg();
  if (!svg) return;
  const pt = svg.createSVGPoint();
  const ctm = svg.getScreenCTM();
  if (!ctm) return;
  const inv = ctm.inverse();
  pt.x = ax; pt.y = ay; const p1 = pt.matrixTransform(inv);
  pt.x = bx; pt.y = by; const p2 = pt.matrixTransform(inv);
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2 - 18;
  slot.connector.setAttribute('d', `M ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Q ${mx.toFixed(2)} ${my.toFixed(2)} ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`);
}

function startDialogTracking(slot: DialogSlot): void {
  if (slot.rafId != null) return;
  const loop = () => { positionDialogSlot(slot); slot.rafId = requestAnimationFrame(loop); };
  slot.rafId = requestAnimationFrame(loop);
}

function stopDialogTracking(slot: DialogSlot): void {
  if (slot.rafId != null) { cancelAnimationFrame(slot.rafId); slot.rafId = null; }
}

function hideDialogSlot(slot: DialogSlot): void {
  slot.el.classList.add('is-leaving');
  slot.el.classList.remove('is-visible');
  if (slot.hideTimer != null) { clearTimeout(slot.hideTimer); slot.hideTimer = null; }
  setTimeout(() => {
    stopDialogTracking(slot);
    if (slot.connector?.parentNode) slot.connector.parentNode.removeChild(slot.connector);
    slot.el.remove();
    const idx = dialogSlots.indexOf(slot);
    if (idx >= 0) dialogSlots.splice(idx, 1);
    // drain queue
    if (dialogQueue.length > 0) {
      const next = dialogQueue.shift()!;
      mountDialog(next);
    }
  }, DIALOG_FADE_OUT_MS + 40);
}

function mountDialog(detail: DialogEventDetail): void {
  installDialogStyles();
  const speaker = detail.speakerCharId;
  const virtual = VIRTUAL_SPEAKERS.has(speaker as string);
  const el = document.createElement('div');
  el.setAttribute('data-dialog-bubble', '');
  if (virtual) el.setAttribute('data-virtual', String(speaker));
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <div class="db-text">${escapeHtml(detail.text)}</div>
    ${speaker ? `<div class="db-attrib">— ${escapeHtml(String(speaker).replace(/-/g, ' '))}</div>` : ''}
  `;
  document.body.appendChild(el);

  let pin: SVGElement | null = null;
  let virtualAnchor: DialogSlot['virtualAnchor'] = null;
  if (!virtual) {
    pin = findCharPin(detail.eventId, speaker as string);
    if (!pin) {
      // unresolved real speaker → fallback to top-center virtual placement.
      virtualAnchor = 'top-center';
    }
  } else {
    if (speaker === 'voz-multitud') virtualAnchor = 'bottom-center';
    else if (speaker === 'angel-anonimo') virtualAnchor = 'top-side';
    else virtualAnchor = 'top-center';
  }

  // Addressee connector — only if addressee resolves to a real pin.
  let connector: SVGPathElement | null = null;
  let addresseeEl: SVGElement | null = null;
  if (detail.addresseeCharId && !VIRTUAL_SPEAKERS.has(detail.addresseeCharId as string)) {
    addresseeEl = findCharPin(detail.eventId, detail.addresseeCharId as string);
    const svg = getMapSvg();
    if (svg && addresseeEl) {
      const layer = svg.querySelector('[data-layer="narration-fx"]') ?? svg;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'var(--era-primary, #a04048)');
      path.setAttribute('stroke-width', '0.6');
      path.setAttribute('stroke-dasharray', '2 1.5');
      path.setAttribute('opacity', '0.7');
      path.setAttribute('pointer-events', 'none');
      layer.appendChild(path);
      connector = path;
    }
  }

  const slot: DialogSlot = {
    el,
    rafId: null,
    hideTimer: null,
    pinEl: pin,
    virtualAnchor,
    connector,
    speakerRectSrc: pin,
    addresseeEl,
  };
  dialogSlots.push(slot);
  positionDialogSlot(slot);
  startDialogTracking(slot);
  requestAnimationFrame(() => {
    el.classList.remove('is-leaving');
    el.classList.add('is-visible');
  });
  const hold = detail.holdMs ?? 4500;
  slot.hideTimer = window.setTimeout(() => hideDialogSlot(slot), hold);
}

function clearAllDialogs(): void {
  dialogQueue.length = 0;
  // Snapshot to avoid mutating mid-iteration.
  const snapshot = [...dialogSlots];
  snapshot.forEach((s) => hideDialogSlot(s));
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
  // Dialog cues (char-to-char). Queue if slots full.
  window.addEventListener('timeline:dialog', (ev: Event) => {
    const d = (ev as CustomEvent<DialogEventDetail>).detail;
    if (!d || !d.text) return;
    if (dialogSlots.length >= MAX_DIALOG_BUBBLES) {
      dialogQueue.push(d);
      return;
    }
    mountDialog(d);
  });
  // Hide on scene change so a leftover bubble for the previous scene
  // doesn't ghost over the new one until its timeout drains.
  window.addEventListener('timeline:scene-changed', () => { hide(); clearAllDialogs(); });
}
