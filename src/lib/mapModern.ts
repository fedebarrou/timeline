/**
 * Modern map adapter — uses maplibre-gl loaded from the CDN as a global.
 *
 * Why CDN instead of `import maplibre-gl`:
 *  - maplibre v5 ships a UMD bundle (`dist/maplibre-gl.js`) that Vite cannot
 *    reliably pre-bundle to ESM with a `default` export. The recurring
 *    "504 Outdated Optimize Dep" and "module does not provide an export
 *    named 'default'" errors come from that mismatch.
 *  - Loading the UMD bundle directly via `<script>` (see ModernMapLayer.astro)
 *    exposes `window.maplibregl` — exactly the namespace the lib was designed
 *    to expose. Vite never has to touch it.
 *
 * Public API is identical to before: createMap / addMarker / flyTo.
 */

declare global {
  interface Window { maplibregl: any }
}

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export const MAP_BASE_ZOOM = 3.0;
export const MAP_SCENE_ZOOM = 3.85;

export interface MarkerData {
  id: string;
  coords: [number, number];
  label: string;
}

/** Resolve the maplibre namespace, throwing a useful error if the CDN script hasn't loaded yet. */
function ml(): any {
  if (typeof window === 'undefined' || !window.maplibregl) {
    throw new Error(
      '[mapModern] maplibre-gl is not loaded. Make sure the CDN <script> in ModernMapLayer.astro is present.',
    );
  }
  return window.maplibregl;
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia) return window.matchMedia('(max-width: 768px)').matches;
  return window.innerWidth <= 768;
}

export function getSvgSceneZoom(): number {
  return isMobileViewport() ? 3.0 : 2.1;
}

export function getSceneZoom(): number {
  return MAP_BASE_ZOOM + Math.log2(getSvgSceneZoom());
}

export function getJourneyPaddingPct(): number {
  return isMobileViewport() ? 0.2 : 0.4;
}

export function createMap(container: HTMLElement): any {
  const m = ml();
  return new m.Map({
    container,
    style: STYLE_URL,
    center: [35, 30],
    zoom: MAP_BASE_ZOOM,
    attributionControl: {},
    interactive: false,
  });
}

export function addMarker(map: any, marker: MarkerData): any {
  const m = ml();
  const el = document.createElement('div');
  el.className = 'modern-marker';
  el.dataset.markerId = marker.id;
  el.innerHTML = `<div class="dot"></div><div class="ring"></div>`;
  return new m.Marker({ element: el })
    .setLngLat([marker.coords[1], marker.coords[0]])
    .setPopup(new m.Popup({ offset: 20 }).setText(marker.label))
    .addTo(map);
}

export function flyTo(map: any, coords: [number, number], zoom = MAP_SCENE_ZOOM) {
  map.flyTo({ center: [coords[1], coords[0]], zoom, duration: 1800 });
}
