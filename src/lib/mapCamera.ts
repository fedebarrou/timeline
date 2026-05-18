import { gsap } from './scrollytelling';
import { MAP_VIEWBOX } from './mapManuscript';

export interface CameraTarget {
  cx: number;
  cy: number;
  zoom: number;
}

export function panTo(svg: SVGSVGElement, target: CameraTarget, duration = 2.0) {
  // Cancel any in-flight camera tween so rapid scroll doesn't blend animations
  gsap.killTweensOf(svg);

  const w = MAP_VIEWBOX.w / target.zoom;
  const h = MAP_VIEWBOX.h / target.zoom;
  const x = target.cx - w / 2;
  const y = target.cy - h / 2;
  const newViewBox = `${x} ${y} ${w} ${h}`;

  const tl = gsap.timeline();
  tl.to(svg, {
    attr: { viewBox: newViewBox },
    duration,
    ease: 'expo.inOut',
  });

  // Subtle cinematic "breathing": tiny zoom-out after settling
  const breathZoom = Math.max(target.zoom * 0.95, 1.0);
  const bw = MAP_VIEWBOX.w / breathZoom;
  const bh = MAP_VIEWBOX.h / breathZoom;
  const bx = target.cx - bw / 2;
  const by = target.cy - bh / 2;
  tl.to(svg, {
    attr: { viewBox: `${bx} ${by} ${bw} ${bh}` },
    duration: 0.5,
    ease: 'sine.out',
  });
}

export function resetCamera(svg: SVGSVGElement, duration = 1.5) {
  gsap.killTweensOf(svg);
  gsap.to(svg, {
    attr: { viewBox: `0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}` },
    duration,
    ease: 'expo.inOut',
  });
}

/**
 * Frame the marker group of an event so that every element it contains
 * (marker dot, character pins, location portrait, scene-objects, journey
 * end-points) is visible in the viewport with a healthy padding.
 *
 * Falls back to a fixed-zoom panTo when the marker isn't rendered yet or
 * the bbox can't be measured.
 */
export function fitMarkerBBox(
  svg: SVGSVGElement,
  eventId: string,
  opts: {
    extraPoints?: [number, number][];
    paddingPct?: number;
    /** Don't zoom in more than this (SVG zoom factor). */
    maxZoom?: number;
    /** Don't zoom out beyond this. */
    minZoom?: number;
    duration?: number;
  } = {},
): boolean {
  const target = svg.querySelector<SVGGElement>(`[data-marker="${eventId}"]`);
  if (!target) return false;
  let bbox: DOMRect | { x: number; y: number; width: number; height: number };
  try { bbox = target.getBBox(); } catch { return false; }
  if (bbox.width <= 0 || bbox.height <= 0) return false;

  const paddingPct = opts.paddingPct ?? 0.35;
  const maxZoom = opts.maxZoom ?? 2.6;
  const minZoom = opts.minZoom ?? 1.0;
  const duration = opts.duration ?? 2.0;

  // Translate the marker group's own transform (translate(cx, cy)) so the
  // bbox is in svg-viewport coords. getBBox() returns coords in the local
  // coordinate system, so we read the transform and add it back.
  const transform = target.getAttribute('transform') ?? '';
  const m = /translate\(\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)\s*\)/.exec(transform);
  const tx = m ? parseFloat(m[1]) : 0;
  const ty = m ? parseFloat(m[2]) : 0;

  let minX = bbox.x + tx;
  let maxX = bbox.x + bbox.width + tx;
  let minY = bbox.y + ty;
  let maxY = bbox.y + bbox.height + ty;

  // Include extra geographic points (e.g. journey origin/destination markers
  // that don't belong to this marker group but should stay visible).
  if (opts.extraPoints) {
    for (const [x, y] of opts.extraPoints) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  // Pad the box and enforce the viewport's aspect ratio.
  const dx = (maxX - minX) * (1 + paddingPct * 2);
  const dy = (maxY - minY) * (1 + paddingPct * 2);
  const aspect = MAP_VIEWBOX.w / MAP_VIEWBOX.h;
  let w = Math.max(dx, dy * aspect);
  let h = w / aspect;

  // Clamp to min/max zoom (zoom = viewbox / actual width).
  const zoomFromW = MAP_VIEWBOX.w / w;
  let clampedZoom = Math.min(maxZoom, Math.max(minZoom, zoomFromW));
  w = MAP_VIEWBOX.w / clampedZoom;
  h = w / aspect;

  const x = cx - w / 2;
  const y = cy - h / 2;
  gsap.killTweensOf(svg);
  gsap.to(svg, {
    attr: { viewBox: `${x} ${y} ${w} ${h}` },
    duration,
    ease: 'expo.inOut',
  });
  return true;
}

export function fitBounds(
  svg: SVGSVGElement,
  points: [number, number][],
  paddingPct = 0.4,
  duration = 2.0,
) {
  if (points.length === 0) return;
  gsap.killTweensOf(svg);
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
    ease: 'expo.inOut',
  });
}
