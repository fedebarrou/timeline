import { gsap } from './scrollytelling';
import { showPreview, movePreview, hidePreview } from './mapHoverPreview';

// ---------------------------------------------------------------------------
// Tooltip helpers (shared across all map interactive elements)
// ---------------------------------------------------------------------------

type MapTooltipData = {
  title: string;
  subtitle?: string;
  role?: string;
  body?: string;
};

function ensureMapTooltip(): HTMLElement {
  let tip = document.querySelector<HTMLElement>('[data-map-tooltip]');
  if (tip) return tip;
  tip = document.createElement('div');
  tip.setAttribute('data-map-tooltip', '');
  Object.assign(tip.style, {
    position: 'fixed',
    padding: '10px 14px',
    background: 'var(--era-surface)',
    border: '1px solid var(--era-primary)',
    borderRadius: '8px',
    fontFamily: "var(--era-body, 'EB Garamond', serif)",
    color: 'var(--era-text)',
    pointerEvents: 'none',
    zIndex: '70',
    boxShadow: '0 8px 20px rgba(0,0,0,0.55)',
    opacity: '0',
    transition: 'opacity 150ms ease',
    maxWidth: '280px',
    fontSize: '12px',
    lineHeight: '1.4',
  });
  document.body.appendChild(tip);
  return tip;
}

export function showMapTooltip(e: MouseEvent, data: MapTooltipData) {
  const tip = ensureMapTooltip();
  const parts: string[] = [];
  parts.push(`<div style="font-family:var(--era-display,'Cinzel',serif);font-size:14px;letter-spacing:0.08em;color:var(--era-primary);">${escapeHtml(data.title)}</div>`);
  if (data.subtitle) {
    parts.push(`<div style="font-style:italic;opacity:0.75;margin-top:2px;font-size:11px;">${escapeHtml(data.subtitle)}</div>`);
  }
  if (data.role) {
    parts.push(`<div style="margin-top:6px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.65;">Rol · ${escapeHtml(data.role)}</div>`);
  }
  if (data.body) {
    parts.push(`<div style="margin-top:8px;opacity:0.9;">${escapeHtml(data.body)}</div>`);
  }
  tip.innerHTML = parts.join('');
  tip.style.left = `${e.clientX + 14}px`;
  tip.style.top = `${e.clientY + 14}px`;
  tip.style.opacity = '1';
}

export function moveMapTooltip(e: MouseEvent) {
  const tip = document.querySelector<HTMLElement>('[data-map-tooltip]');
  if (!tip) return;
  // Keep within viewport: flip horizontally if near right edge
  const vw = window.innerWidth;
  const offset = 14;
  let x = e.clientX + offset;
  if (x + 300 > vw) x = e.clientX - 300 - offset;
  tip.style.left = `${x}px`;
  tip.style.top = `${e.clientY + offset}px`;
}

export function hideMapTooltip() {
  const tip = document.querySelector<HTMLElement>('[data-map-tooltip]');
  if (!tip) return;
  tip.style.opacity = '0';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface CharacterPin {
  id: string;
  name: string;
  portrait?: string | null;
  avatar?: string | null;
  role?: string;
  lore?: string | null;
  meaning?: string | null;
  significance?: string | null;
}

export interface MarkerSpec {
  id: string;
  svgPosition: [number, number];
  label: string;
  characters?: CharacterPin[];
  /** @deprecated use characters instead */
  characterIds?: string[];
  locationPortrait?: string | null;
  locationName?: string;
  locationDescription?: string | null;
  locationModernName?: string | null;
  eventTitle?: string;
  eventSubtitle?: string | null;
}

// ---------------------------------------------------------------------------
// renderMarker
// ---------------------------------------------------------------------------

export function renderMarker(svgRoot: SVGSVGElement, marker: MarkerSpec) {
  const group = svgRoot.querySelector('[data-layer="markers"]');
  if (!group) return;
  if (group.querySelector(`[data-marker="${marker.id}"]`)) return;

  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('data-marker', marker.id);
  g.setAttribute('transform', `translate(${marker.svgPosition[0]}, ${marker.svgPosition[1]})`);
  // Hidden by default — only revealed when activated
  g.setAttribute('opacity', '0');
  g.style.pointerEvents = 'none';

  // Active halo (GSAP-animated when marker activates)
  const halo = document.createElementNS(ns, 'circle');
  halo.setAttribute('r', '12');
  halo.setAttribute('fill', 'var(--era-accent)');
  halo.setAttribute('opacity', '0');
  halo.setAttribute('data-halo', '');
  g.appendChild(halo);

  // Main dot
  const dot = document.createElementNS(ns, 'circle');
  dot.setAttribute('r', '7');
  dot.setAttribute('fill', 'var(--era-accent)');
  dot.setAttribute('stroke', 'var(--era-primary)');
  dot.setAttribute('stroke-width', '2');
  dot.setAttribute('filter', 'drop-shadow(0 0 6px var(--era-accent))');
  dot.classList.add('marker-dot');
  g.appendChild(dot);

  // Determine character list: prefer new `characters` field, fall back to legacy `characterIds`
  const charPins: CharacterPin[] = marker.characters
    ? marker.characters
    : (marker.characterIds ?? []).map((id) => ({ id, name: id, portrait: null }));

  // Rectangular location thumbnail — appended FIRST so character pins render on top in SVG z-order
  if (marker.locationPortrait) {
    const locGroup = document.createElementNS(ns, 'g');
    locGroup.setAttribute('data-marker-location-portrait', '');
    locGroup.setAttribute('opacity', '0');

    const W = 120, H = 72;
    const offsetX = 14;
    const offsetY = -28 - H; // sit above the marker dot

    const fo = document.createElementNS(ns, 'foreignObject');
    fo.setAttribute('x', `${offsetX}`);
    fo.setAttribute('y', `${offsetY}`);
    fo.setAttribute('width', `${W}`);
    fo.setAttribute('height', `${H + 26}`); // extra room for wrapped caption
    fo.innerHTML = `
  <div xmlns="http://www.w3.org/1999/xhtml" style="width:${W}px;display:flex;flex-direction:column;gap:4px;align-items:center;font-family:var(--era-display,'Cinzel',serif);pointer-events:none;">
    <div style="
      width:${W}px;
      height:${H}px;
      border-radius:8px;
      overflow:hidden;
      border:1.5px solid var(--era-primary);
      background:var(--era-surface);
      box-shadow:
        0 4px 14px rgba(0,0,0,0.55),
        0 0 0 1px rgba(0,0,0,0.6),
        0 0 18px rgba(0,0,0,0.35);
      position:relative;
      pointer-events:auto;
    ">
      <img src="${marker.locationPortrait.replace(/"/g, '&quot;')}"
           alt="${(marker.locationName ?? '').replace(/"/g, '&quot;')}"
           style="width:140%;height:140%;object-fit:cover;display:block;margin-left:-20%;margin-top:-20%;"
           onerror="this.style.display='none'" />
      <div style="
        position:absolute;
        inset:0;
        background:linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%);
        pointer-events:none;
      "></div>
    </div>
    ${marker.locationName ? `<div style="
      font-size:7px;
      color:var(--era-primary);
      text-align:center;
      letter-spacing:1px;
      text-transform:uppercase;
      opacity:0.95;
      line-height:1.25;
      white-space:normal;
      word-wrap:break-word;
      max-width:${W}px;
      padding:2px 6px;
      background:rgba(0,0,0,0.45);
      border-radius:4px;
      font-weight:600;
      font-family:var(--era-display,'Cinzel',serif);
      pointer-events:none;
    ">${marker.locationName.replace(/</g, '&lt;')}</div>` : ''}
  </div>`;

    locGroup.appendChild(fo);

    // --- Hover interaction: scale up + tooltip ---
    locGroup.style.cursor = 'pointer';
    locGroup.style.pointerEvents = 'none';

    const showLocTip = (e: MouseEvent) => {
      showPreview(e, {
        kind: 'location',
        title: marker.locationName ?? '',
        imageSrc: marker.locationPortrait ?? null,
        subtitle: marker.locationModernName ?? null,
        role: null,
        body: marker.locationDescription ?? null,
      });
      // Scale up the location portrait inside locGroup
      const innerFo = locGroup.querySelector('foreignObject');
      if (innerFo) {
        (innerFo as SVGElement).style.transition = 'transform 200ms ease';
        (innerFo as SVGElement).style.transformOrigin = '50% 50%';
        (innerFo as SVGElement).style.transform = 'scale(1.18)';
      }
    };
    const moveLocTip = (e: MouseEvent) => movePreview(e);
    const hideLocTip = () => {
      hidePreview();
      const innerFo = locGroup.querySelector('foreignObject');
      if (innerFo) (innerFo as SVGElement).style.transform = 'scale(1)';
    };

    locGroup.addEventListener('mouseenter', showLocTip);
    locGroup.addEventListener('mousemove', moveLocTip);
    locGroup.addEventListener('mouseleave', hideLocTip);

    g.appendChild(locGroup);
  }

  // Character token group with real portraits — appended LAST so they sit on top in SVG z-order
  if (charPins.length > 0) {
    const charGroup = document.createElementNS(ns, 'g');
    charGroup.setAttribute('data-marker-chars', '');
    charGroup.setAttribute('opacity', '0');
    charPins.slice(0, 5).forEach((char, idx) => {
      const cx = 18 + idx * 22;
      const cy = 14;
      const size = 16;
      const initials = char.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

      const fo = document.createElementNS(ns, 'foreignObject');
      fo.setAttribute('x', `${-size / 2}`);
      fo.setAttribute('y', `${-size / 2}`);
      fo.setAttribute('width', `${size}`);
      fo.setAttribute('height', `${size}`);

      const imgSrc = char.avatar ?? char.portrait ?? '';
      const safePortrait = imgSrc ? imgSrc.replace(/"/g, '&quot;') : '';
      const safeInitials = initials.replace(/'/g, "\\'");
      fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;border:1px solid var(--era-primary);background:var(--era-surface);display:flex;align-items:center;justify-content:center;font-size:6px;color:var(--era-primary);font-family:var(--era-display,'Cinzel',serif);">${
        imgSrc
          ? `<img src="${safePortrait}" alt="${char.name}" style="width:100%;height:100%;object-fit:cover;object-position:top;" onerror="this.style.display='none';this.parentNode.textContent='${safeInitials}'" />`
          : initials
      }</div>`;

      // tiny name below the thumbnail
      const nameText = document.createElementNS(ns, 'text');
      nameText.setAttribute('x', `0`);
      nameText.setAttribute('y', `${size / 2 + 5}`);
      nameText.setAttribute('text-anchor', 'middle');
      nameText.setAttribute('font-size', '4');
      nameText.setAttribute('font-family', "var(--era-display, 'Cinzel', serif)");
      nameText.setAttribute('fill', 'var(--era-text)');
      nameText.textContent = char.name;

      const pinWrap = document.createElementNS(ns, 'g');
      pinWrap.setAttribute('data-char-pin-wrap', '');
      pinWrap.setAttribute('transform', `translate(${cx}, ${cy})`);
      pinWrap.appendChild(fo);
      pinWrap.appendChild(nameText);

      // --- Hover interaction: scale up + tooltip ---
      pinWrap.style.cursor = 'pointer';
      pinWrap.style.pointerEvents = 'none';  // default off — enabled only when marker is active

      const showCharTip = (e: MouseEvent) => {
        showPreview(e, {
          kind: 'character',
          title: char.name,
          imageSrc: char.avatar ?? char.portrait ?? null,
          subtitle: char.meaning ?? null,
          role: char.role ?? null,
          body: char.lore ?? char.significance ?? null,
        });
        // Scale up the pin
        pinWrap.style.transition = 'transform 200ms ease';
        const base = pinWrap.getAttribute('data-base-transform') ?? pinWrap.getAttribute('transform') ?? 'translate(0,0)';
        pinWrap.setAttribute('data-base-transform', base);
        pinWrap.setAttribute('transform', `${base} scale(1.4)`);
      };
      const moveCharTip = (e: MouseEvent) => movePreview(e);
      const hideCharTip = () => {
        hidePreview();
        const base = pinWrap.getAttribute('data-base-transform');
        if (base) pinWrap.setAttribute('transform', base);
      };

      pinWrap.addEventListener('mouseenter', showCharTip);
      pinWrap.addEventListener('mousemove', moveCharTip);
      pinWrap.addEventListener('mouseleave', hideCharTip);

      charGroup.appendChild(pinWrap);
    });
    g.appendChild(charGroup);
  }

  group.appendChild(g);
}

export function activateMarker(svgRoot: SVGSVGElement, id: string) {
  // Hide all markers
  const all = svgRoot.querySelectorAll<SVGGElement>('[data-marker]');
  all.forEach((m) => {
    m.classList.remove('active');
    gsap.killTweensOf(m);
    gsap.to(m, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
    const chars = m.querySelector('[data-marker-chars]');
    if (chars) (chars as SVGElement).setAttribute('opacity', '0');
    const loc = m.querySelector('[data-marker-location-portrait]');
    if (loc) (loc as SVGElement).setAttribute('opacity', '0');
    const halo = m.querySelector('[data-halo]');
    if (halo) gsap.killTweensOf(halo);
    const pinWraps = m.querySelectorAll<SVGGElement>('[data-char-pin-wrap]');
    pinWraps.forEach((pin) => {
      pin.dataset.motionStarted = '';
    });
    // Disable pointer-events on this marker's pin/location children
    m.querySelectorAll<SVGElement>('[data-char-pin-wrap], [data-marker-location-portrait]').forEach((el) => {
      el.style.pointerEvents = 'none';
    });
  });

  const target = svgRoot.querySelector<SVGGElement>(`[data-marker="${id}"]`);
  if (!target) return;
  target.classList.add('active');
  target.style.pointerEvents = 'auto';
  gsap.to(target, { opacity: 1, duration: 0.4 });

  // Enable hover on the active marker's children (pins, location portrait)
  target.querySelectorAll<SVGElement>('[data-char-pin-wrap], [data-marker-location-portrait]').forEach((el) => {
    el.style.pointerEvents = 'auto';
  });

  const halo = target.querySelector('[data-halo]');
  if (halo) {
    gsap.fromTo(halo,
      { opacity: 0.6, r: 6 },
      { opacity: 0, r: 22, duration: 1.6, repeat: -1, ease: 'sine.out' }
    );
  }

  const chars = target.querySelector('[data-marker-chars]');
  if (chars) {
    gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.2 });
  }

  const locPortrait = target.querySelector('[data-marker-location-portrait]');
  if (locPortrait) {
    gsap.fromTo(locPortrait, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3 });
  }
}

// Prominent event-title badge shown at the top center of the map for ~5 seconds.
export function showEventTitleToast(title: string) {
  const svg = document.querySelector<SVGSVGElement>('[data-map-root]');
  if (!svg) return;
  const wrapper = svg.parentElement;
  if (!wrapper) return;

  let toast = wrapper.querySelector<HTMLElement>('[data-event-title-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.setAttribute('data-event-title-toast', '');
    toast.style.position = 'absolute';
    toast.style.top = '46px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '8px 18px';
    toast.style.borderRadius = '999px';
    toast.style.fontFamily = "var(--era-display, 'Cinzel', serif)";
    toast.style.fontSize = '14px';
    toast.style.letterSpacing = '0.12em';
    toast.style.color = 'var(--era-primary)';
    toast.style.background = 'rgba(0,0,0,0.55)';
    toast.style.backdropFilter = 'blur(8px)';
    toast.style.border = '1px solid var(--era-border)';
    toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.45)';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.style.zIndex = '21';
    toast.style.whiteSpace = 'nowrap';
    toast.style.maxWidth = '90%';
    if (getComputedStyle(wrapper).position === 'static') {
      wrapper.style.position = 'relative';
    }
    wrapper.appendChild(toast);
  }

  toast.textContent = title;
  gsap.killTweensOf(toast);
  gsap.fromTo(
    toast,
    { opacity: 0, y: -10 },
    {
      opacity: 1, y: 0, duration: 0.6, ease: 'power1.out',
      onComplete: () => {
        gsap.to(toast, { opacity: 0, y: -10, duration: 0.8, delay: 4.5, ease: 'power1.in' });
      },
    }
  );
}
