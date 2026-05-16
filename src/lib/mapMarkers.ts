import { gsap } from './scrollytelling';

export interface MarkerSpec {
  id: string;
  svgPosition: [number, number];
  label: string;
  characterIds?: string[];
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

  // Label text + background
  const labelBg = document.createElementNS(ns, 'rect');
  labelBg.setAttribute('x', '12');
  labelBg.setAttribute('y', '-14');
  const labelText = document.createElementNS(ns, 'text');
  labelText.setAttribute('x', '18');
  labelText.setAttribute('y', '-2');
  labelText.setAttribute('fill', 'var(--era-text)');
  labelText.setAttribute('font-size', '8');
  labelText.setAttribute('font-family', "var(--era-display, 'Cinzel', serif)");
  labelText.setAttribute('opacity', '0');
  labelText.setAttribute('data-marker-label', '');
  labelText.textContent = marker.label;

  const approxWidth = Math.max(40, marker.label.length * 4.5);
  labelBg.setAttribute('width', `${approxWidth + 8}`);
  labelBg.setAttribute('height', '14');
  labelBg.setAttribute('rx', '2');
  labelBg.setAttribute('fill', 'var(--era-surface)');
  labelBg.setAttribute('stroke', 'var(--era-border)');
  labelBg.setAttribute('stroke-width', '0.5');
  labelBg.setAttribute('opacity', '0');
  labelBg.setAttribute('data-marker-label-bg', '');

  g.appendChild(labelBg);
  g.appendChild(labelText);

  // Character token group
  if (marker.characterIds && marker.characterIds.length > 0) {
    const charGroup = document.createElementNS(ns, 'g');
    charGroup.setAttribute('data-marker-chars', '');
    charGroup.setAttribute('opacity', '0');
    marker.characterIds.slice(0, 4).forEach((charId, idx) => {
      const cx = 22 + idx * 14;
      const cy = 10;
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', `${cx}`);
      circle.setAttribute('cy', `${cy}`);
      circle.setAttribute('r', '6');
      circle.setAttribute('fill', 'var(--era-surface)');
      circle.setAttribute('stroke', 'var(--era-primary)');
      circle.setAttribute('stroke-width', '0.8');
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', `${cx}`);
      text.setAttribute('y', `${cy + 2}`);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '6');
      text.setAttribute('font-family', "var(--era-display, 'Cinzel', serif)");
      text.setAttribute('fill', 'var(--era-primary)');
      text.textContent = charId.slice(0, 2).toUpperCase();
      charGroup.appendChild(circle);
      charGroup.appendChild(text);
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
    const lbl = m.querySelector('[data-marker-label]');
    const lblBg = m.querySelector('[data-marker-label-bg]');
    const chars = m.querySelector('[data-marker-chars]');
    if (lbl) (lbl as SVGElement).setAttribute('opacity', '0');
    if (lblBg) (lblBg as SVGElement).setAttribute('opacity', '0');
    if (chars) (chars as SVGElement).setAttribute('opacity', '0');
    const halo = m.querySelector('[data-halo]');
    if (halo) gsap.killTweensOf(halo);
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

  const labelText = target.querySelector('[data-marker-label]');
  const labelBg = target.querySelector('[data-marker-label-bg]');
  if (labelText) {
    gsap.fromTo(labelText, { opacity: 0, x: -4 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power1.out' });
  }
  if (labelBg) {
    gsap.fromTo(labelBg, { opacity: 0, x: -4 }, { opacity: 0.85, x: 0, duration: 0.6, ease: 'power1.out' });
  }

  const chars = target.querySelector('[data-marker-chars]');
  if (chars) {
    gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.2 });
  }
}

// Transient toast inside the map area, showing the modern country name.
// Fades in, holds, fades out automatically. Replaces any prior toast.
export function showLocationToast(text: string) {
  const svg = document.querySelector<SVGSVGElement>('[data-map-root]');
  if (!svg) return;
  const wrapper = svg.parentElement;
  if (!wrapper) return;

  let toast = wrapper.querySelector<HTMLElement>('[data-location-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.setAttribute('data-location-toast', '');
    toast.style.position = 'absolute';
    toast.style.top = '16px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '6px 14px';
    toast.style.borderRadius = '999px';
    toast.style.fontFamily = "var(--era-display, 'Cinzel', serif)";
    toast.style.fontSize = '11px';
    toast.style.letterSpacing = '0.18em';
    toast.style.textTransform = 'uppercase';
    toast.style.color = 'var(--era-text)';
    toast.style.background = 'var(--era-surface)';
    toast.style.border = '1px solid var(--era-border)';
    toast.style.boxShadow = '0 4px 14px rgba(0,0,0,0.4)';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.style.zIndex = '20';
    toast.style.whiteSpace = 'nowrap';
    if (getComputedStyle(wrapper).position === 'static') {
      wrapper.style.position = 'relative';
    }
    wrapper.appendChild(toast);
  }

  toast.textContent = text;
  gsap.killTweensOf(toast);
  gsap.fromTo(
    toast,
    { opacity: 0, y: -8 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to(toast, {
          opacity: 0,
          y: -8,
          duration: 0.8,
          delay: 3.5,
          ease: 'power1.in',
        });
      },
    }
  );
}
