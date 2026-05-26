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
      max-width: 380px;
      min-width: 180px;
      padding: 0.8rem 1.1rem 0.85rem;
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
      font-size: 19px;
      line-height: 1.5;
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
      margin-top: 0.4rem;
      font-size: 13px;
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
    /* Docked mode (mobile): bubble sits at the bottom of the viewport
       instead of next to a pin, so the tail is meaningless — hide it.
       Slightly stronger drop shadow lifts the card off the map below. */
    [data-speech-bubble].is-docked .sb-tail { display: none; }
    [data-speech-bubble].is-docked {
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--era-text, #e8d4c8) 70%, transparent),
        0 -6px 24px rgba(0, 0, 0, 0.55);
    }
    /* Narrow viewports: never let the bubble overflow the screen. The
       380px max-width is wider than a 375px iPhone, so on mobile we cap
       at viewport-24px and shrink the typography a tick to keep it
       legible without forcing huge bubbles. */
    @media (max-width: 767px) {
      [data-speech-bubble] {
        max-width: calc(100vw - 24px);
        min-width: 0;
        font-size: 16px;
        padding: 0.65rem 0.9rem 0.7rem;
      }
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

/** Mobile = no room for pin-anchored bubbles. We dock everything to the
 *  bottom of the viewport instead of trying to point at tiny pins on a
 *  35vh map. Threshold matches the existing `<768px` mobile breakpoint
 *  used across the codebase. */
function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
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
  const edge = 8;

  // Mobile: dock to the bottom of the viewport, centered. The tail is
  // hidden via the `is-docked` class — pointing at a pin on a tiny map
  // doesn't add information and bubbles kept overflowing when the pin
  // was near a screen edge.
  if (isMobile()) {
    const x = Math.max(edge, (vw - w) / 2);
    const y = vh - h - 16;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.setAttribute('data-side', 'docked');
    bubble.classList.add('is-docked');
    return;
  }
  bubble.classList.remove('is-docked');

  // Desktop: bubble RIGHT of the pin, vertically centered.
  let x = r.right + pad;
  let y = r.top + r.height / 2 - h / 2;
  let side = 'left'; // tail on the bubble's LEFT, pointing at pin on its left
  if (x + w + edge > vw) {
    // Flip to the LEFT of the pin instead.
    x = r.left - w - pad;
    side = 'right'; // tail on the bubble's RIGHT, pointing at pin on its right
  }
  // Final viewport clamp — handles narrow desktops where neither side fits.
  if (x + w + edge > vw) x = vw - w - edge;
  if (x < edge) x = edge;
  if (y < edge) y = edge;
  if (y + h + edge > vh) y = vh - h - edge;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.setAttribute('data-side', side);
  // Realign the tail to the pin's vertical center within the bubble.
  // After horizontal clamping the bubble may sit far from the pin; keeping
  // the tail at 50% would point at empty space.
  const tail = bubble.querySelector<HTMLElement>('.sb-tail');
  if (tail) {
    const pinCenterY = r.top + r.height / 2;
    const localY = Math.max(10, Math.min(h - 10, pinCenterY - y));
    tail.style.top = `${localY}px`;
    tail.style.marginTop = '-5px';
  }
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
      font-size: 15.5px;
      line-height: 1.45;
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
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.72;
      color: color-mix(in srgb, var(--era-primary, #a04048) 70%, #1a0f08);
    }
    [data-dialog-bubble].is-docked {
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--era-text, #e8d4c8) 70%, transparent),
        0 -6px 24px rgba(0, 0, 0, 0.55);
    }
    @media (max-width: 767px) {
      [data-dialog-bubble] {
        max-width: calc(100vw - 24px);
        min-width: 0;
        font-size: 14px;
        padding: 0.55rem 0.85rem 0.6rem;
      }
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

/** Bounding box of the map container (where pins live). On desktop the
 *  map is the right ~60% of the screen; virtual anchors must center on
 *  THAT box, not on the viewport, or Yahvé renders over the narrative
 *  column on the left. Falls back to the full viewport if missing. */
function getMapRect(): { left: number; top: number; right: number; bottom: number; width: number; height: number } {
  const el = document.querySelector<HTMLElement>('.map-container');
  if (el) {
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
  }
  return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: window.innerHeight };
}

/** Speaking indicator — a tiny SVG speech-bubble badge with three blinking
 *  dots, anchored to the pin's top-right. Visual cue that THIS character
 *  is the one speaking, especially useful on mobile where the bubble is
 *  docked far away from the pin. */
function ensureSpeakBadgeStyles(): void {
  if (document.querySelector('[data-speak-badge-styles]')) return;
  const css = `
    @keyframes speak-blink {
      0%, 60%, 100% { opacity: 0.3; }
      30%           { opacity: 1; }
    }
    [data-speak-badge] { pointer-events: none; }
    [data-speak-badge] .sb-dot { animation: speak-blink 1.2s infinite ease-in-out; transform-origin: center; }
    [data-speak-badge] .sb-dot-2 { animation-delay: 0.18s; }
    [data-speak-badge] .sb-dot-3 { animation-delay: 0.36s; }
    @keyframes speak-badge-in {
      from { opacity: 0; transform: translate(10px, -22px) scale(0.6); }
      to   { opacity: 1; transform: translate(10px, -22px) scale(1); }
    }
    [data-speak-badge] { animation: speak-badge-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1); transform-origin: center; }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-speak-badge-styles', '');
  style.textContent = css;
  document.head.appendChild(style);
}

function addSpeakBadge(pin: SVGElement): void {
  if (!pin) return;
  if (pin.querySelector('[data-speak-badge]')) return;
  ensureSpeakBadgeStyles();
  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('data-speak-badge', '');
  g.setAttribute('transform', 'translate(10, -22)');
  // Speech-bubble ellipse + tail pointing back at the pin.
  g.innerHTML = `
    <ellipse cx="0" cy="0" rx="10" ry="7" fill="var(--era-text, #e8d4c8)" stroke="var(--era-primary, #a04048)" stroke-width="0.8" />
    <path d="M -4 5 L -7 9 L -1 6 Z" fill="var(--era-text, #e8d4c8)" stroke="var(--era-primary, #a04048)" stroke-width="0.8" stroke-linejoin="round" />
    <circle class="sb-dot sb-dot-1" cx="-3.5" cy="0" r="1.1" fill="var(--era-primary, #a04048)" />
    <circle class="sb-dot sb-dot-2" cx="0"    cy="0" r="1.1" fill="var(--era-primary, #a04048)" />
    <circle class="sb-dot sb-dot-3" cx="3.5"  cy="0" r="1.1" fill="var(--era-primary, #a04048)" />
  `;
  pin.appendChild(g);
}

function removeSpeakBadge(pin: SVGElement | null): void {
  if (!pin) return;
  const b = pin.querySelector('[data-speak-badge]');
  if (b) b.remove();
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

/** Top of the safe area below the sticky nav stack, so virtual-anchor
 *  bubbles ('top-center' / 'top-side') don't slide under SiteNav +
 *  TimelineNav. Falls back to a generous default when the nav can't be
 *  measured. */
function navStackBottom(): number {
  const tnav = document.querySelector<HTMLElement>('[data-timeline-nav]');
  const snav = document.querySelector<HTMLElement>('[data-site-nav]');
  const bottoms: number[] = [];
  if (tnav) bottoms.push(tnav.getBoundingClientRect().bottom);
  if (snav) bottoms.push(snav.getBoundingClientRect().bottom);
  return bottoms.length ? Math.max(...bottoms) : 120;
}

function positionDialogSlot(slot: DialogSlot): void {
  const el = slot.el;
  if (!el) return;
  const w = el.offsetWidth || 200;
  const h = el.offsetHeight || 50;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const edge = 8;
  let x = 0;
  let y = 0;

  // Mobile: dock ALL bubbles (virtual + pin-anchored) to the bottom of
  // the viewport, stacked vertically. Pointing at a pin on a 35vh map
  // is more confusing than helpful on a phone, and Yahvé's top-center
  // placement was hitting the nav stack / overflowing the side.
  if (isMobile()) {
    el.classList.add('is-docked');
    if (slot.connector) slot.connector.setAttribute('opacity', '0');
    // Stack order: newest at the bottom, older ones above it. The slot's
    // index in `dialogSlots` is its stack position (0 = oldest).
    const idx = Math.max(0, dialogSlots.indexOf(slot));
    const gap = 8;
    // Heights of slots stacked BELOW this one (newer entries pushed up
    // above by counting from the bottom).
    let below = 0;
    for (let i = dialogSlots.length - 1; i > idx; i--) {
      below += (dialogSlots[i].el.offsetHeight || h) + gap;
    }
    x = Math.max(edge, (vw - w) / 2);
    y = vh - h - 16 - below;
    if (y < edge) y = edge;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    return;
  }
  el.classList.remove('is-docked');
  if (slot.connector) slot.connector.setAttribute('opacity', '0.7');

  if (slot.virtualAnchor) {
    // Virtual anchors render as standalone bubbles (no pin to point at).
    // CENTER on the MAP container — on desktop the map is only the right
    // ~60% of the viewport, so centering on `vw` would land Yahvé over
    // the narrative column. Using the map rect keeps the bubble visually
    // tied to the place the action is happening.
    const m = getMapRect();
    const navBottom = navStackBottom();
    const topY = Math.max(m.top + 12, navBottom + 12, 16);
    switch (slot.virtualAnchor) {
      case 'top-center':
        x = m.left + (m.width - w) / 2;
        y = topY;
        break;
      case 'top-side':
        x = m.right - w - 16;
        y = topY + 8;
        break;
      case 'bottom-center':
        x = m.left + (m.width - w) / 2;
        y = m.bottom - h - 24;
        break;
    }
  } else if (slot.pinEl) {
    const r = slot.pinEl.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) { el.classList.remove('is-visible'); return; }
    const cx = r.right;
    const cy = r.top + r.height / 2;
    const pad = 14;
    x = cx + pad;
    y = cy - h / 2;
    if (x + w + edge > vw) x = cx - w - pad;
  } else {
    return;
  }

  // Final viewport clamp — applies to BOTH pin-anchored and virtual
  // bubbles, so nothing can ever overflow on narrow phones.
  if (x + w + edge > vw) x = vw - w - edge;
  if (x < edge) x = edge;
  if (y < edge) y = edge;
  if (y + h + edge > vh) y = vh - h - edge;
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
  removeSpeakBadge(slot.pinEl);
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
  if (pin) addSpeakBadge(pin);
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
