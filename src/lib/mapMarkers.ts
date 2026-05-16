import { gsap } from './scrollytelling';

export interface CharacterPin {
  id: string;
  name: string;
  portrait?: string | null;
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
}

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

  // Character token group with real portraits
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

      const safePortrait = char.portrait ? char.portrait.replace(/"/g, '&quot;') : '';
      const safeInitials = initials.replace(/'/g, "\\'");
      fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;border:1px solid var(--era-primary);background:var(--era-surface);display:flex;align-items:center;justify-content:center;font-size:6px;color:var(--era-primary);font-family:var(--era-display,'Cinzel',serif);">${
        char.portrait
          ? `<img src="${safePortrait}" alt="${char.name}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentNode.textContent='${safeInitials}'" />`
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
      charGroup.appendChild(pinWrap);
    });
    g.appendChild(charGroup);
  }

  // Rectangular location thumbnail
  if (marker.locationPortrait) {
    const locGroup = document.createElementNS(ns, 'g');
    locGroup.setAttribute('data-marker-location-portrait', '');
    locGroup.setAttribute('opacity', '0');

    const W = 64, H = 40;
    const offsetX = 12;
    const offsetY = -28 - H; // sit above the marker dot

    const fo = document.createElementNS(ns, 'foreignObject');
    fo.setAttribute('x', `${offsetX}`);
    fo.setAttribute('y', `${offsetY}`);
    fo.setAttribute('width', `${W}`);
    fo.setAttribute('height', `${H + 10}`); // extra room for caption
    fo.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${W}px;display:flex;flex-direction:column;gap:2px;align-items:center;font-family:var(--era-display,'Cinzel',serif);"><div style="width:${W}px;height:${H}px;border-radius:4px;overflow:hidden;border:1px solid var(--era-primary);background:var(--era-surface);box-shadow:0 2px 6px rgba(0,0,0,0.4);"><img src="${marker.locationPortrait.replace(/"/g, '&quot;')}" alt="${(marker.locationName ?? '').replace(/"/g, '&quot;')}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none'" /></div>${marker.locationName ? `<div style="font-size:5px;color:var(--era-text);text-align:center;letter-spacing:0.5px;text-transform:uppercase;opacity:0.8;">${marker.locationName.replace(/</g, '&lt;')}</div>` : ''}</div>`;

    locGroup.appendChild(fo);
    g.appendChild(locGroup);
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
  });

  const target = svgRoot.querySelector<SVGGElement>(`[data-marker="${id}"]`);
  if (!target) return;
  target.classList.add('active');
  target.style.pointerEvents = 'auto';
  gsap.to(target, { opacity: 1, duration: 0.4 });

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

