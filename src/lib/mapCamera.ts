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
