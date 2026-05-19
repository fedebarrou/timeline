import { MAP_VIEWBOX } from './mapManuscript';

/** Zoom factor in mobile. 1 = world view; 2.4 = focused regional view. */
export const MOBILE_ZOOM = 2.4;
const JOURNEY_PADDING_PCT = 0.2;
const MIN_JOURNEY_W = MAP_VIEWBOX.w / MOBILE_ZOOM;
const MIN_JOURNEY_H = MAP_VIEWBOX.h / MOBILE_ZOOM;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/** SVG viewBox string centered on (cx, cy) with the world divided by MOBILE_ZOOM. */
export function viewBoxFor(cx: number, cy: number): string {
  const w = MAP_VIEWBOX.w / MOBILE_ZOOM;
  const h = MAP_VIEWBOX.h / MOBILE_ZOOM;
  const x = clamp(cx - w / 2, 0, MAP_VIEWBOX.w - w);
  const y = clamp(cy - h / 2, 0, MAP_VIEWBOX.h - h);
  return `${x} ${y} ${w} ${h}`;
}

/** Bounding-box viewBox for a journey from→to with 20% padding, never smaller than the single-point zoom. */
export function viewBoxForJourney(from: [number, number], to: [number, number]): string {
  const minX = Math.min(from[0], to[0]);
  const minY = Math.min(from[1], to[1]);
  const maxX = Math.max(from[0], to[0]);
  const maxY = Math.max(from[1], to[1]);
  let w = (maxX - minX) * (1 + JOURNEY_PADDING_PCT * 2);
  let h = (maxY - minY) * (1 + JOURNEY_PADDING_PCT * 2);
  if (w < MIN_JOURNEY_W) w = MIN_JOURNEY_W;
  if (h < MIN_JOURNEY_H) h = MIN_JOURNEY_H;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const x = clamp(cx - w / 2, 0, MAP_VIEWBOX.w - w);
  const y = clamp(cy - h / 2, 0, MAP_VIEWBOX.h - h);
  return `${x} ${y} ${w} ${h}`;
}

interface SceneConfig {
  eventId: string;
  svgPosition: [number, number];
  journeys?: Array<{ from: [number, number]; to: [number, number]; style?: string } | null>;
}

/** Wire scene-change events to animated viewBox transitions on the SVG. Mobile-only. */
export async function initMobileZoom(svg: SVGSVGElement, configs: SceneConfig[]): Promise<() => void> {
  if (typeof window === 'undefined') return () => {};
  if (!window.matchMedia('(max-width: 767px)').matches) return () => {};
  const gsap = (await import('gsap')).default;
  const byId = new Map(configs.map((c) => [c.eventId, c]));

  function applyFor(eventId: string) {
    const cfg = byId.get(eventId);
    if (!cfg) return;
    const validJourneys = (cfg.journeys ?? []).filter(Boolean) as Array<{ from: [number, number]; to: [number, number] }>;
    const vb = validJourneys.length
      ? viewBoxForJourney(validJourneys[0].from, validJourneys[0].to)
      : viewBoxFor(cfg.svgPosition[0], cfg.svgPosition[1]);
    gsap.to(svg, { attr: { viewBox: vb }, duration: 0.6, ease: 'power2.inOut' });
  }

  const handler = (e: Event) => {
    const id = (e as CustomEvent).detail?.eventId;
    if (id) applyFor(id);
  };
  window.addEventListener('timeline:scene-changed', handler);

  // Apply for the first event immediately so the initial view is centred.
  if (configs.length > 0) applyFor(configs[0].eventId);

  return () => window.removeEventListener('timeline:scene-changed', handler);
}
