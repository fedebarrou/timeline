type PreviewData = {
  kind: 'character' | 'location';
  title: string;
  imageSrc?: string | null;
  subtitle?: string | null;   // meaning OR modern name
  role?: string | null;        // event-specific role for chars
  body?: string | null;        // significance OR description
};

let cardEl: HTMLElement | null = null;
let hideTimer: number | null = null;

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
    width: '280px',
    background: 'var(--era-surface)',
    border: '1px solid var(--era-primary)',
    borderRadius: '12px',
    overflow: 'hidden',
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
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

  const parts: string[] = [];
  if (data.imageSrc) {
    const safe = escape(data.imageSrc);
    parts.push(`
      <div style="width:100%;height:180px;overflow:hidden;background:var(--era-bg);position:relative;">
        <img src="${safe}" alt="${escape(data.title)}" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;"
          onerror="this.style.display='none'" />
        <div style="position:absolute;inset:0;background:linear-gradient(to top, var(--era-surface) 0%, transparent 40%);"></div>
      </div>
    `);
  }
  parts.push('<div style="padding: 14px 16px 16px;">');
  // Kind chip
  parts.push(`<div style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.55;margin-bottom:4px;">${data.kind === 'character' ? 'Personaje' : 'Lugar'}</div>`);
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
  // Body
  if (data.body) {
    const text = data.body.length > 240 ? data.body.slice(0, 240).trim() + '…' : data.body;
    parts.push(`<p style="font-size:13px;line-height:1.5;margin-top:10px;opacity:0.88;">${escape(text)}</p>`);
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
