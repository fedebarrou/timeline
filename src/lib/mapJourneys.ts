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

const STYLE_ICON: Record<JourneySpec['style'], string> = {
  boat: '&#x26F5;',
  walking: '&#x1F6B6;',
  caravan: '&#x1F42B;',
  exile: '&#x26D3;',
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

  // Add a moving icon along the path using a text element
  const movingText = document.createElementNS(ns, 'text');
  movingText.setAttribute('text-anchor', 'middle');
  movingText.setAttribute('dominant-baseline', 'middle');
  movingText.setAttribute('font-size', '10');
  movingText.innerHTML = STYLE_ICON[journey.style];
  movingText.setAttribute('data-journey-icon', journey.id);
  group.appendChild(movingText);

  // Animate the icon along the path by interpolating point position
  const totalLength = path.getTotalLength();
  const startPt = path.getPointAtLength(0);
  movingText.setAttribute('x', `${startPt.x}`);
  movingText.setAttribute('y', `${startPt.y}`);

  gsap.to({ progress: 0 }, {
    progress: 1,
    duration: 2.5,
    ease: 'power1.inOut',
    onUpdate: function () {
      const pt = path.getPointAtLength(this.targets()[0].progress * totalLength);
      movingText.setAttribute('x', `${pt.x}`);
      movingText.setAttribute('y', `${pt.y}`);
    },
  });
}

export function clearJourneys(svgRoot: SVGSVGElement) {
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;
  group.innerHTML = '';
}
