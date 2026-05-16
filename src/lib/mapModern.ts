import maplibregl, { Map as MLMap, Marker as MLMarker } from 'maplibre-gl';

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export interface MarkerData {
  id: string;
  coords: [number, number];
  label: string;
}

export function createMap(container: HTMLElement): MLMap {
  return new maplibregl.Map({
    container,
    style: STYLE_URL,
    center: [35, 30],
    zoom: 3.2,
    attributionControl: true,
  });
}

export function addMarker(map: MLMap, m: MarkerData): MLMarker {
  const el = document.createElement('div');
  el.className = 'modern-marker';
  el.dataset.markerId = m.id;
  el.innerHTML = `<div class="dot"></div><div class="ring"></div>`;
  return new maplibregl.Marker({ element: el })
    .setLngLat([m.coords[1], m.coords[0]])
    .setPopup(new maplibregl.Popup({ offset: 20 }).setText(m.label))
    .addTo(map);
}

export function flyTo(map: MLMap, coords: [number, number], zoom = 6) {
  map.flyTo({ center: [coords[1], coords[0]], zoom, duration: 1800 });
}
