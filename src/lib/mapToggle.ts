/**
 * IMPORTANT: this module deliberately does NOT statically import
 * `maplibre-gl` or `./mapModern`. Maplibre is ~600KB and ESM-wraps a UMD
 * bundle that Vite occasionally fails to pre-bundle (the recurring
 * "504 Outdated Optimize Dep"). If we imported it at the top, ANY Vite
 * hiccup with maplibre would crash the entire page script — breaking
 * the narrator buttons, scrollytelling and timeline together. Lazy
 * importing it inside `initModernMap()` isolates the failure: the
 * "Mapa actual" button is the only thing that breaks when maplibre is
 * broken; everything else keeps working.
 */
import type { MarkerData } from './mapModern';
type AnyMap = { resize(): void; flyTo(opts: any): void; on(ev: string, cb: any): void };

let modernMap: AnyMap | null = null;
let initialized = false;
let markers: MarkerData[] = [];

/** Cache the last fly target so the modern map can sync to the current
    scrollytelling scene as soon as it's initialized (the maplibre instance
    only exists after the first user toggle). */
let pendingFly: { coords: [number, number]; zoom: number } | null = null;

/* No-op kept for backwards compatibility — `data-map-mode` on the
   container is now enough to swap the SVG's label/land layers (see
   ManuscriptMap.astro CSS). Maplibre is no longer needed. */
function applyModernSvgOverlay(_on: boolean) {
  /* intentionally empty */
}

export function registerMarkers(data: MarkerData[]) {
  markers = data;
  console.log('[mapToggle] registerMarkers', { count: markers.length });
}

/**
 * Wait until the container has non-zero dimensions, then run cb.
 * MapLibre creates a 0×0 canvas if the container is empty at construction time,
 * which manifests as a "blank" modern map even though the GL context is alive.
 */
function whenSized(el: HTMLElement, cb: (rect: DOMRect) => void, attempt = 0) {
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    cb(rect);
    return;
  }
  if (attempt >= 20) {
    console.warn('[mapToggle] container still 0×0 after 20 retries, giving up', { rect });
    return;
  }
  // ~50ms between retries → up to 1s total wait
  setTimeout(() => whenSized(el, cb, attempt + 1), 50);
}

/** Wait for the CDN-loaded `window.maplibregl` to exist (the script has `defer`). */
function waitForMaplibre(attempt = 0): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).maplibregl) { resolve((window as any).maplibregl); return; }
    if (attempt >= 50) { reject(new Error('maplibregl CDN script never loaded')); return; }
    setTimeout(() => waitForMaplibre(attempt + 1).then(resolve, reject), 100);
  });
}

async function initModernMap() {
  const container = document.querySelector<HTMLElement>('[data-modern-map]');
  if (!container) {
    console.warn('[mapToggle] no container found for modern map');
    return;
  }
  if (modernMap) {
    console.log('[mapToggle] init skipped, modernMap already exists');
    return;
  }
  try { await waitForMaplibre(); }
  catch (err) { console.error('[mapToggle]', err); return; }

  // Dynamic import — small wrapper module, no maplibre static import.
  const { createMap, addMarker } = await import('./mapModern');

  whenSized(container, (rect) => {
    console.log('[mapToggle] container dims at init', { w: rect.width, h: rect.height, markers: markers.length });
    try {
      modernMap = createMap(container) as unknown as AnyMap;
      console.log('[mapToggle] modern map created');
      modernMap.on('load', () => {
        console.log('[mapToggle] modern map loaded, adding markers');
        markers.forEach((m) => addMarker(modernMap as any, m));
        try { modernMap!.resize(); } catch {}
        // Sync to the current scrollytelling scene if one is queued.
        if (pendingFly) {
          try {
            (modernMap as any).flyTo({
              center: [pendingFly.coords[1], pendingFly.coords[0]],
              zoom: pendingFly.zoom,
              duration: 800,
            });
          } catch {}
        }
      });
      modernMap.on('error', (e: unknown) => {
        console.error('[mapToggle] maplibre error event', e);
      });
      initialized = true;
    } catch (err) {
      console.error('[mapToggle] createMap failed', err);
    }
  });
}

export function toggleMap() {
  const container = document.querySelector<HTMLElement>('.map-container');
  const wrapper = document.querySelector<HTMLElement>('[data-modern-map-wrapper]');
  if (!container || !wrapper) {
    console.warn('[mapToggle] missing container or wrapper', { container, wrapper });
    return;
  }

  const currentMode = container.getAttribute('data-map-mode') ?? 'manuscript';
  const showModern = currentMode !== 'modern';
  console.log('[mapToggle] toggling to mode', showModern ? 'modern' : 'manuscript');

  // The toggle is now a pure CSS swap on `data-map-mode`. No maplibre
  // bootstrap, no extra wrapper, no flyTo sync — the same SVG renders
  // ancient or modern labels driven by the attribute (see ManuscriptMap.astro).
  container.setAttribute('data-map-mode', showModern ? 'modern' : 'manuscript');
}

export function flyModern(coords: [number, number], zoom = 6) {
  // Always cache the params — even if maplibre isn't loaded yet, the next
  // toggle/init replays them, keeping manuscript and modern in sync.
  pendingFly = { coords, zoom };
  if (modernMap) {
    modernMap.flyTo({ center: [coords[1], coords[0]], zoom, duration: 1800 });
  }
}
