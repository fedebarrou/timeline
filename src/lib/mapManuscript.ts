import { geoMercator, geoPath, type GeoProjection } from 'd3-geo';

export const MAP_VIEWBOX = { w: 1000, h: 600 };

export function buildProjection(): GeoProjection {
  return geoMercator()
    .center([35, 30])
    .scale(800)
    .translate([MAP_VIEWBOX.w / 2, MAP_VIEWBOX.h / 2]);
}

export function geoJsonToPath(geojson: GeoJSON.FeatureCollection): string[] {
  const projection = buildProjection();
  const path = geoPath(projection);
  return geojson.features.map((f) => path(f) ?? '').filter(Boolean);
}

export function svgCoordsFor(lat: number, lng: number): [number, number] {
  const projection = buildProjection();
  const xy = projection([lng, lat]);
  return xy ?? [0, 0];
}
