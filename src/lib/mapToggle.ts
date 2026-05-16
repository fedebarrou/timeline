import { createMap, addMarker, flyTo, type MarkerData } from './mapModern';
import type * as maplibregl from 'maplibre-gl';

type MLMap = maplibregl.Map;

let modernMap: MLMap | null = null;
let initialized = false;
let markers: MarkerData[] = [];

export function registerMarkers(data: MarkerData[]) {
  markers = data;
}

function initModernMap() {
  const container = document.querySelector<HTMLElement>('[data-modern-map]');
  if (!container || modernMap) return;
  modernMap = createMap(container);
  modernMap.on('load', () => {
    markers.forEach((m) => addMarker(modernMap!, m));
  });
  initialized = true;
}

export function toggleMap() {
  const wrapper = document.querySelector<HTMLElement>('[data-modern-map-wrapper]');
  const manuscript = document.querySelector<HTMLElement>('[data-map-root]');
  if (!wrapper || !manuscript) return;

  const showModern = wrapper.classList.contains('hidden');
  if (showModern) {
    wrapper.classList.remove('hidden');
    manuscript.style.opacity = '0';
    if (!initialized) initModernMap();
  } else {
    wrapper.classList.add('hidden');
    manuscript.style.opacity = '1';
  }
}

export function flyModern(coords: [number, number], zoom = 6) {
  if (modernMap) flyTo(modernMap, coords, zoom);
}
