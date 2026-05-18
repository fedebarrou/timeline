import type { BoundarySet } from './types';

/**
 * Patriarcal era (~2100–1500 BC) — Middle Bronze Age political landscape.
 *
 * IMPORTANT: these polygons are ILLUSTRATIVE APPROXIMATIONS, not precise
 * GIS. They're meant to convey "Abraham left Ur (Sumer), passed through
 * Harán (north Mesopotamia), and settled in Canaán" — not to map borders
 * at the kilometre. A historian-grade refinement would replace these with
 * a real GeoJSON (Cliopatria or hand-traced) and project through
 * `mapManuscript.svgCoordsFor`. Until then, they ground the user in the
 * basic geopolitical reality of the era.
 *
 * Coordinates are SVG units (viewBox 1000×600). Reference anchors from
 * ManuscriptMap.astro: MESOPOTAMIA (620,290), EGIPTO (470,410),
 * LEVANTE (565,340), ARABIA (610,430), PERSIA (720,320).
 */
export const patriarcalBoundaries: BoundarySet = {
  eraId: 'patriarcal',
  caption: 'c. 2100–1500 a.C.',
  polygons: [
    {
      id: 'sumer',
      name: 'Sumer',
      paths: [[
        [620, 325], [665, 318], [700, 330], [710, 355],
        [680, 372], [635, 365], [615, 348],
      ]],
      label: { x: 660, y: 348, size: 9 },
    },
    {
      id: 'akkad-babilonia',
      name: 'Akkad',
      paths: [[
        [600, 275], [675, 270], [705, 295], [705, 322],
        [670, 322], [615, 318], [590, 300],
      ]],
      label: { x: 645, y: 296, size: 9 },
    },
    {
      id: 'asiria-norte',
      name: 'Mari · Norte',
      paths: [[
        [555, 240], [625, 235], [655, 255], [650, 275],
        [605, 278], [565, 268],
      ]],
      label: { x: 595, y: 258, size: 8 },
    },
    {
      id: 'canaan',
      name: 'Canaán',
      paths: [[
        [548, 318], [582, 315], [596, 345], [590, 368],
        [560, 378], [545, 360], [540, 335],
      ]],
      label: { x: 568, y: 348, size: 9 },
    },
    {
      id: 'egipto-medio',
      name: 'Egipto · Reino Medio',
      paths: [[
        [455, 360], [495, 358], [520, 395], [515, 440],
        [490, 465], [460, 455], [445, 415],
      ]],
      label: { x: 482, y: 412, size: 9 },
    },
    {
      id: 'elam',
      name: 'Elam',
      paths: [[
        [710, 305], [760, 300], [780, 335], [760, 365],
        [725, 360], [710, 335],
      ]],
      label: { x: 740, y: 333, size: 8 },
    },
  ],
};
