import { gsap } from './scrollytelling';

export interface MarkerSpec {
  id: string;
  svgPosition: [number, number];
  label: string;
}

export function renderMarker(svgRoot: SVGSVGElement, marker: MarkerSpec) {
  const group = svgRoot.querySelector('[data-layer="markers"]');
  if (!group) return;
  if (group.querySelector(`[data-marker="${marker.id}"]`)) return;

  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('data-marker', marker.id);
  g.setAttribute('transform', `translate(${marker.svgPosition[0]}, ${marker.svgPosition[1]})`);

  const halo = document.createElementNS(ns, 'circle');
  halo.setAttribute('r', '12');
  halo.setAttribute('fill', 'var(--era-accent)');
  halo.setAttribute('opacity', '0');
  halo.setAttribute('data-halo', '');

  const dot = document.createElementNS(ns, 'circle');
  dot.setAttribute('r', '3');
  dot.setAttribute('fill', 'var(--era-primary)');

  g.appendChild(halo);
  g.appendChild(dot);
  group.appendChild(g);
}

export function activateMarker(svgRoot: SVGSVGElement, id: string) {
  const all = svgRoot.querySelectorAll('[data-marker]');
  all.forEach((m) => m.classList.remove('active'));
  const target = svgRoot.querySelector(`[data-marker="${id}"]`);
  if (!target) return;
  target.classList.add('active');
  const halo = target.querySelector('[data-halo]');
  if (halo) {
    gsap.killTweensOf(halo);
    gsap.fromTo(halo,
      { opacity: 0.6, r: 6 },
      { opacity: 0, r: 18, duration: 1.4, repeat: -1, ease: 'sine.out' }
    );
  }
}
