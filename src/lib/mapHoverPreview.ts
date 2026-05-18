import { CANONICITY_COLORS, CANONICITY_LABELS, type Canonicity } from './canonicity';

type PreviewData = {
  kind: 'character' | 'location';
  title: string;
  imageSrc?: string | null;
  subtitle?: string | null;   // meaning OR modern name
  role?: string | null;        // event-specific role for chars
  body?: string | null;        // significance OR description
  canonicity?: Canonicity;     // characters only: tier badge color
  disputed?: boolean;          // locations only: surface "Localización disputada" pill
};

let cardEl: HTMLElement | null = null;
let hideTimer: number | null = null;
let globalGuardInstalled = false;

/**
 * Installs a single document-level mousemove guard the first time a preview
 * is shown. If the pointer ever leaves the boundary of every hover-eligible
 * SVG element (character pins + location portraits), we force-hide. This
 * handles the case where mouseleave fails to fire (e.g. when pointer-events
 * are toggled off mid-hover during marker switches, or when the cursor
 * leaves the SVG via a path the per-element listeners don't catch).
 */
function installGlobalGuard() {
  if (globalGuardInstalled) return;
  globalGuardInstalled = true;
  document.addEventListener('mousemove', (e) => {
    if (!cardEl || cardEl.style.opacity === '0') return;
    const t = e.target as Element | null;
    if (!t) { hidePreview(); return; }
    const overHover = t.closest('[data-char-pin-wrap], [data-marker-location-portrait]');
    if (!overHover) hidePreview();
  }, { passive: true });
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function ensureCard(): HTMLElement {
  if (cardEl) return cardEl;
  cardEl = document.createElement('div');
  cardEl.setAttribute('data-map-preview', '');
  Object.assign(cardEl.style, {
    position: 'fixed',
    zIndex: '80',
    width: '320px',
    maxHeight: '78vh',
    overflowY: 'auto',
    background: 'var(--era-surface)',
    border: '1px solid var(--era-primary)',
    borderRadius: '12px',
    boxShadow: '0 18px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.4)',
    pointerEvents: 'none',
    opacity: '0',
    transform: 'translateY(6px)',
    transition: 'opacity 180ms ease, transform 180ms ease',
    fontFamily: "var(--era-body, 'EB Garamond', Georgia, serif)",
    color: 'var(--era-text)',
  });
  document.body.appendChild(cardEl);
  return cardEl;
}

export function showPreview(e: MouseEvent, data: PreviewData) {
  const card = ensureCard();
  installGlobalGuard();
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

  const parts: string[] = [];
  if (data.imageSrc) {
    const safe = escape(data.imageSrc);
    // Image: object-contain so portraits/landscapes aren't cropped.
    // Aspect-ratio gives a stable area; background tinted with era-bg.
    parts.push(`
      <div style="width:100%;aspect-ratio:4/3;background:var(--era-bg);display:flex;align-items:center;justify-content:center;overflow:hidden;">
        <img src="${safe}" alt="${escape(data.title)}" style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block;"
          onerror="this.style.display='none'" />
      </div>
    `);
  }
  parts.push('<div style="padding: 14px 16px 16px;">');
  // Top row: kind chip + canonicity badge (characters only)
  const kindLabel = data.kind === 'character' ? 'Personaje' : 'Lugar';
  if (data.kind === 'character' && data.canonicity) {
    const c = data.canonicity;
    const color = CANONICITY_COLORS[c];
    const label = CANONICITY_LABELS[c];
    parts.push(`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px;">
        <div style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.55;">${kindLabel}</div>
        <div title="Canonicidad" style="display:inline-flex;align-items:center;gap:5px;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;padding:2px 8px;border-radius:999px;border:1px solid ${color};color:${color};background:color-mix(in srgb, ${color} 12%, transparent);">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${color};"></span>
          ${escape(label)}
        </div>
      </div>
    `);
  } else if (data.kind === 'location' && data.disputed) {
    // Locations: surface the disputed status with an amber pill in the same top row
    const amber = '#f59e0b';
    parts.push(`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px;">
        <div style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.55;">${kindLabel}</div>
        <div title="Localización académicamente disputada" style="display:inline-flex;align-items:center;gap:5px;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;padding:2px 8px;border-radius:999px;border:1px solid ${amber};color:${amber};background:color-mix(in srgb, ${amber} 14%, transparent);">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="${amber}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          </svg>
          Disputada
        </div>
      </div>
    `);
  } else {
    parts.push(`<div style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.55;margin-bottom:4px;">${kindLabel}</div>`);
  }
  // Title
  parts.push(`<div style="font-family:var(--era-display,'Cinzel',serif);font-size:18px;letter-spacing:0.04em;color:var(--era-primary);line-height:1.2;">${escape(data.title)}</div>`);
  // Subtitle (meaning / modern name)
  if (data.subtitle) {
    parts.push(`<div style="font-style:italic;font-size:13px;opacity:0.78;margin-top:4px;">${escape(data.subtitle)}</div>`);
  }
  // Role
  if (data.role) {
    parts.push(`<div style="margin-top:10px;display:inline-block;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;padding:3px 8px;border:1px solid var(--era-border);border-radius:999px;opacity:0.85;">${escape(data.role)}</div>`);
  }
  // Body — full text, no truncation. Card max-height + scroll handles overflow.
  if (data.body) {
    parts.push(`<p style="font-size:13px;line-height:1.5;margin-top:10px;opacity:0.88;white-space:pre-line;">${escape(data.body)}</p>`);
  }
  parts.push('</div>');
  card.innerHTML = parts.join('');

  positionCard(e);

  // Trigger fade-in next frame
  requestAnimationFrame(() => {
    if (!cardEl) return;
    cardEl.style.opacity = '1';
    cardEl.style.transform = 'translateY(0)';
  });
}

export function movePreview(e: MouseEvent) {
  if (!cardEl) return;
  positionCard(e);
}

function positionCard(e: MouseEvent) {
  if (!cardEl) return;
  const cardW = cardEl.offsetWidth || 280;
  const cardH = cardEl.offsetHeight || 320;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = 14;
  let x = e.clientX + pad;
  let y = e.clientY + pad;
  // Flip horizontally if near right edge
  if (x + cardW + 4 > vw) x = e.clientX - cardW - pad;
  // Avoid bottom overflow
  if (y + cardH + 4 > vh) y = vh - cardH - 8;
  if (y < 8) y = 8;
  if (x < 8) x = 8;
  cardEl.style.left = `${x}px`;
  cardEl.style.top = `${y}px`;
}

export function hidePreview() {
  if (!cardEl) return;
  cardEl.style.opacity = '0';
  cardEl.style.transform = 'translateY(6px)';
  // Optional: remove from DOM after fade to save memory
  hideTimer = window.setTimeout(() => {
    if (cardEl && cardEl.parentElement) {
      // Keep it; just hidden. Removing would re-create every hover.
    }
  }, 220);
}
