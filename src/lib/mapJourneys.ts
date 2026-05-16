import { gsap } from './scrollytelling';

export interface JourneySpec {
  id: string;
  from: [number, number];
  to: [number, number];
  style: 'boat' | 'walking' | 'caravan' | 'exile';
}

const STYLE_DASH: Record<JourneySpec['style'], string> = {
  boat: '4 2',
  walking: '2 2',
  caravan: '6 3',
  exile: '8 4',
};

export function drawJourney(svgRoot: SVGSVGElement, journey: JourneySpec) {
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;

  const ns = 'http://www.w3.org/2000/svg';
  const [x1, y1] = journey.from;
  const [x2, y2] = journey.to;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.15;

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'var(--era-accent)');
  path.setAttribute('stroke-width', '1.2');
  path.setAttribute('stroke-dasharray', STYLE_DASH[journey.style]);
  path.setAttribute('data-journey', journey.id);
  group.appendChild(path);

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: 'power1.inOut',
    onComplete: () => {
      path.style.strokeDasharray = STYLE_DASH[journey.style];
      path.style.strokeDashoffset = '0';
    },
  });
}

export function clearJourneys(svgRoot: SVGSVGElement) {
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;
  group.innerHTML = '';
}
