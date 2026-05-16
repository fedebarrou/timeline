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

  // Always-on passive pulse halo (CSS-animated)
  const passivePulse = document.createElementNS(ns, 'circle');
  passivePulse.setAttribute('r', '7');
  passivePulse.setAttribute('fill', 'var(--era-accent)');
  passivePulse.setAttribute('opacity', '0.3');
  passivePulse.setAttribute('data-passive-pulse', '');
  passivePulse.classList.add('marker-passive-pulse');
  g.appendChild(passivePulse);

  // Active halo (GSAP-animated when marker activates)
  const halo = document.createElementNS(ns, 'circle');
  halo.setAttribute('r', '12');
  halo.setAttribute('fill', 'var(--era-accent)');
  halo.setAttribute('opacity', '0');
  halo.setAttribute('data-halo', '');
  g.appendChild(halo);

  // Main dot — larger and more visible
  const dot = document.createElementNS(ns, 'circle');
  dot.setAttribute('r', '7');
  dot.setAttribute('fill', 'var(--era-accent)');
  dot.setAttribute('stroke', 'var(--era-primary)');
  dot.setAttribute('stroke-width', '2');
  dot.setAttribute('filter', 'drop-shadow(0 0 6px var(--era-accent))');
  dot.classList.add('marker-dot');
  g.appendChild(dot);

  const labelBg = document.createElementNS(ns, 'rect');
  labelBg.setAttribute('x', '8');
  labelBg.setAttribute('y', '-14');
  const labelText = document.createElementNS(ns, 'text');
  labelText.setAttribute('x', '14');
  labelText.setAttribute('y', '-2');
  labelText.setAttribute('fill', 'var(--era-text)');
  labelText.setAttribute('font-size', '8');
  labelText.setAttribute('font-family', "var(--era-display, 'Cinzel', serif)");
  labelText.setAttribute('opacity', '0');
  labelText.setAttribute('data-marker-label', '');
  labelText.textContent = marker.label;

  // Background rect sized roughly to text
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

  // Character token group (initials of associated characters)
  if (marker.characterIds && marker.characterIds.length > 0) {
    const charGroup = document.createElementNS(ns, 'g');
    charGroup.setAttribute('data-marker-chars', '');
    charGroup.setAttribute('opacity', '0');
    marker.characterIds.slice(0, 4).forEach((charId, idx) => {
      const cx = 18 + idx * 14;
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
      // 2-letter id, capitalized
      text.textContent = charId.slice(0, 2).toUpperCase();
      charGroup.appendChild(circle);
      charGroup.appendChild(text);
    });
    g.appendChild(charGroup);
  }

  group.appendChild(g);
}

export function activateMarker(svgRoot: SVGSVGElement, id: string) {
  // Reset all markers and labels
  const all = svgRoot.querySelectorAll('[data-marker]');
  all.forEach((m) => {
    m.classList.remove('active');
    const lbl = m.querySelector('[data-marker-label]');
    const lblBg = m.querySelector('[data-marker-label-bg]');
    const chars = m.querySelector('[data-marker-chars]');
    if (lbl) (lbl as SVGElement).setAttribute('opacity', '0');
    if (lblBg) (lblBg as SVGElement).setAttribute('opacity', '0');
    if (chars) (chars as SVGElement).setAttribute('opacity', '0');
  });

  const target = svgRoot.querySelector(`[data-marker="${id}"]`);
  if (!target) return;
  target.classList.add('active');

  const halo = target.querySelector('[data-halo]');
  if (halo) {
    gsap.killTweensOf(halo);
    gsap.fromTo(halo,
      { opacity: 0.6, r: 6 },
      { opacity: 0, r: 22, duration: 1.6, repeat: -1, ease: 'sine.out' }
    );
  }

  // Fade in label
  const labelText = target.querySelector('[data-marker-label]');
  const labelBg = target.querySelector('[data-marker-label-bg]');
  if (labelText) {
    gsap.fromTo(labelText, { opacity: 0, x: -4 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power1.out' });
  }
  if (labelBg) {
    gsap.fromTo(labelBg, { opacity: 0, x: -4 }, { opacity: 0.85, x: 0, duration: 0.6, ease: 'power1.out' });
  }

  // Fade in character tokens
  const chars = target.querySelector('[data-marker-chars]');
  if (chars) {
    gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.2 });
  }
}
