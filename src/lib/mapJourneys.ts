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

function ensureArrowDef(svgRoot: SVGSVGElement) {
  let defs = svgRoot.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svgRoot.insertBefore(defs, svgRoot.firstChild);
  }
  if (defs.querySelector('#journey-arrow')) return;
  const ns = 'http://www.w3.org/2000/svg';
  const marker = document.createElementNS(ns, 'marker');
  marker.setAttribute('id', 'journey-arrow');
  marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '8');
  marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '6');
  marker.setAttribute('markerHeight', '6');
  marker.setAttribute('orient', 'auto-start-reverse');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
  path.setAttribute('fill', 'var(--era-accent)');
  marker.appendChild(path);
  defs.appendChild(marker);
}

export function drawJourney(svgRoot: SVGSVGElement, journey: JourneySpec) {
  ensureArrowDef(svgRoot);
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;

  const ns = 'http://www.w3.org/2000/svg';
  const [x1, y1] = journey.from;
  const [x2, y2] = journey.to;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.15;

  // The path being drawn
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'var(--era-accent)');
  path.setAttribute('stroke-width', '1.5');
  path.setAttribute('stroke-dasharray', STYLE_DASH[journey.style]);
  path.setAttribute('marker-end', 'url(#journey-arrow)');
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

  // Moving SVG arrow (triangle) that travels along the path,
  // rotating to match the path direction.
  const arrowG = document.createElementNS(ns, 'g');
  arrowG.setAttribute('data-journey-arrow', journey.id);
  const arrow = document.createElementNS(ns, 'path');
  // small triangle pointing in +x direction; centered at (0,0)
  arrow.setAttribute('d', 'M -4 -3 L 5 0 L -4 3 Z');
  arrow.setAttribute('fill', 'var(--era-accent)');
  arrow.setAttribute('stroke', 'var(--era-primary)');
  arrow.setAttribute('stroke-width', '0.4');
  arrow.setAttribute('filter', 'drop-shadow(0 0 3px var(--era-accent))');
  arrowG.appendChild(arrow);
  group.appendChild(arrowG);

  // Animate position + rotation along path
  const initialPt = path.getPointAtLength(0);
  arrowG.setAttribute('transform', `translate(${initialPt.x}, ${initialPt.y}) rotate(0)`);

  const ahead = 1; // small lookahead distance to estimate tangent
  const obj = { progress: 0 };
  gsap.to(obj, {
    progress: 1,
    duration: 2.5,
    ease: 'power1.inOut',
    onUpdate: () => {
      const d = obj.progress * length;
      const pt = path.getPointAtLength(d);
      const ptNext = path.getPointAtLength(Math.min(length, d + ahead));
      const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180 / Math.PI;
      arrowG.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
    },
    onComplete: () => {
      // After arrival, park at endpoint
      const endPt = path.getPointAtLength(length);
      const before = path.getPointAtLength(Math.max(0, length - 1));
      const angle = Math.atan2(endPt.y - before.y, endPt.x - before.x) * 180 / Math.PI;
      arrowG.setAttribute('transform', `translate(${endPt.x}, ${endPt.y}) rotate(${angle})`);
    },
  });
}

export function clearJourneys(svgRoot: SVGSVGElement) {
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;
  group.innerHTML = '';
}
