import { gsap } from './scrollytelling';
import { MAP_VIEWBOX } from './mapManuscript';

export interface CameraTarget {
  cx: number;
  cy: number;
  zoom: number;
}

export function panTo(svg: SVGSVGElement, target: CameraTarget, duration = 1.2) {
  const w = MAP_VIEWBOX.w / target.zoom;
  const h = MAP_VIEWBOX.h / target.zoom;
  const x = target.cx - w / 2;
  const y = target.cy - h / 2;
  const newViewBox = `${x} ${y} ${w} ${h}`;

  gsap.to(svg, {
    attr: { viewBox: newViewBox },
    duration,
    ease: 'power2.inOut',
  });
}

export function resetCamera(svg: SVGSVGElement, duration = 1.5) {
  gsap.to(svg, {
    attr: { viewBox: `0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}` },
    duration,
    ease: 'power2.inOut',
  });
}

export function fitBounds(
  svg: SVGSVGElement,
  points: [number, number][],
  paddingPct = 0.35,
  duration = 1.6,
) {
  if (points.length === 0) return;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const dx = Math.max(maxX - minX, 30);
  const dy = Math.max(maxY - minY, 30);
  const w = dx * (1 + paddingPct * 2);
  const h = dy * (1 + paddingPct * 2);
  const aspect = MAP_VIEWBOX.w / MAP_VIEWBOX.h;
  const wAdj = Math.max(w, h * aspect);
  const hAdj = wAdj / aspect;
  const x = cx - wAdj / 2;
  const y = cy - hAdj / 2;
  gsap.to(svg, {
    attr: { viewBox: `${x} ${y} ${wAdj} ${hAdj}` },
    duration,
    ease: 'power2.inOut',
  });
}
