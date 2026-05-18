/**
 * A single political/territorial polygon plotted onto the ManuscriptMap.
 *
 * Coordinates are in SVG units (the same 1000×600 viewBox the rest of the
 * map uses), NOT lat/lng. That keeps boundary authoring simple — open the
 * SVG, eyeball positions against the existing `ANCIENT_LABELS` anchors,
 * and write the points directly. If we later need lat/lng (e.g. importing
 * a real historical GeoJSON), `mapManuscript.svgCoordsFor(lat, lng)` is
 * the conversion you want.
 *
 * Authoring tips:
 *   - Reference label anchors in ManuscriptMap.astro (MESOPOTAMIA at
 *     (620,290), EGIPTO at (470,410), LEVANTE at (565,340), etc.).
 *   - Multiple disjoint regions for the same polity? Use multiple entries
 *     in `paths`. Each entry is one closed ring.
 *   - Keep rings to 5–10 points. The shapes are illustrative, not GIS.
 */
export type BoundaryPolygon = {
  /** Stable id, unique per era set. Used for DOM data-* attributes. */
  id: string;
  /** Human label shown over the region (italic, era-accent). Omit `label`
   *  to hide the caption. */
  name: string;
  /** One or more closed rings in SVG coords. Each ring is auto-closed (a
   *  trailing "Z" is appended when building the `d` attribute). */
  paths: Array<Array<[number, number]>>;
  /** Optional label placement. If omitted, no text is drawn. */
  label?: { x: number; y: number; size?: number };
  /** Optional CSS color override. Defaults to var(--era-accent) so each
   *  era's boundaries pick up the era theme automatically. */
  color?: string;
};

/**
 * Per-era set of boundaries. A future sub-period extension would let us
 * key by `eventId` instead of `eraId` and crossfade between sets as the
 * play head advances. For now a single set per era keeps the pilot tight.
 */
export type BoundarySet = {
  eraId: string;
  /** Optional one-line caption for the toggle UI ("Reino unido — c. 1000 BC"). */
  caption?: string;
  polygons: BoundaryPolygon[];
};
