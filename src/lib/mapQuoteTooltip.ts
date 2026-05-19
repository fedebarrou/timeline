/**
 * Tiny speech-bubble tooltip shown on character-pin hover.
 *
 * Replaces the previous full info-card preview for characters — the
 * identity + bio info now lives in the right-side CharacterInfoPanel,
 * so the hover doesn't need to repeat it. Instead, when a `quote` is
 * authored for that (event, character) pair, we render it as a
 * single-line italic phrase in a parchment-toned bubble next to the
 * cursor. Pins without a quote render no tooltip at all.
 *
 * Public surface:
 *   showQuote(e, quote, name?)  — display bubble at the mouse position
 *   moveQuote(e)                — track the cursor while shown
 *   hideQuote()                 — fade + dismount
 */

let bubble: HTMLElement | null = null;
let hideTimer: number | null = null;
let stylesInstalled = false;

function installStyles(): void {
  if (stylesInstalled) return;
  stylesInstalled = true;
  const css = `
    [data-quote-tooltip] {
      position: fixed;
      z-index: 80;
      max-width: 280px;
      padding: 0.55rem 0.85rem 0.6rem;
      pointer-events: none;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity 160ms ease, transform 160ms ease;
      /* Parchment tone matching the info panel — era-text base with a
         subtle vignette toward the era-primary. */
      background-color: color-mix(in srgb, var(--era-text, #e8d4c8) 96%, var(--era-bg, #1a0f08) 4%);
      background-image: radial-gradient(
        ellipse at center,
        transparent 55%,
        color-mix(in srgb, var(--era-primary, #a04048) 18%, transparent) 100%
      );
      color: #1a0f08;
      font-family: var(--era-body, 'EB Garamond', Georgia, serif);
      font-size: 13px;
      line-height: 1.4;
      border: 1px solid color-mix(in srgb, var(--era-primary, #a04048) 55%, var(--era-text, #e8d4c8));
      border-radius: 6px;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--era-text, #e8d4c8) 70%, transparent),
        0 6px 18px rgba(0, 0, 0, 0.45);
    }
    [data-quote-tooltip].is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    [data-quote-tooltip] .qt-quote {
      font-style: italic;
      /* Hanging open-quote glyph using ::before keeps the text aligned
         with subsequent lines and reads like a manuscript citation. */
    }
    [data-quote-tooltip] .qt-quote::before { content: '“'; margin-right: 2px; }
    [data-quote-tooltip] .qt-quote::after  { content: '”'; margin-left: 2px; }
    [data-quote-tooltip] .qt-attrib {
      margin-top: 0.3rem;
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.7;
      color: color-mix(in srgb, var(--era-primary, #a04048) 70%, #1a0f08);
    }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-quote-tooltip-styles', '');
  style.textContent = css;
  document.head.appendChild(style);
}

function ensureBubble(): HTMLElement {
  if (bubble) return bubble;
  installStyles();
  bubble = document.createElement('div');
  bubble.setAttribute('data-quote-tooltip', '');
  bubble.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bubble);
  return bubble;
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render and position the bubble. If `quote` is empty/null, nothing
 * happens — character pins without a per-event quote stay silent.
 */
export function showQuote(
  e: MouseEvent,
  quote: string | null | undefined,
  attribName?: string | null,
): void {
  const text = (quote ?? '').trim();
  if (!text) { hideQuote(); return; }
  const el = ensureBubble();
  if (hideTimer != null) { clearTimeout(hideTimer); hideTimer = null; }
  const html: string[] = [`<div class="qt-quote">${escape(text)}</div>`];
  if (attribName) html.push(`<div class="qt-attrib">— ${escape(attribName)}</div>`);
  el.innerHTML = html.join('');
  positionBubble(e);
  // Next frame so the appended HTML has laid out before the transition.
  requestAnimationFrame(() => el.classList.add('is-visible'));
}

export function moveQuote(e: MouseEvent): void {
  if (!bubble) return;
  positionBubble(e);
}

export function hideQuote(): void {
  if (!bubble) return;
  bubble.classList.remove('is-visible');
}

function positionBubble(e: MouseEvent): void {
  if (!bubble) return;
  const pad = 14;
  const w = bubble.offsetWidth || 240;
  const h = bubble.offsetHeight || 56;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let x = e.clientX + pad;
  let y = e.clientY + pad;
  // Flip horizontally if it would clip the right edge.
  if (x + w + 4 > vw) x = e.clientX - w - pad;
  // Flip vertically if it would clip the bottom edge.
  if (y + h + 4 > vh) y = e.clientY - h - pad;
  if (x < 8) x = 8;
  if (y < 8) y = 8;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
}
