import type { BoundarySet } from './types';

/**
 * Éxodo era (~1500–1200 BC) — Late Bronze Age political landscape.
 *
 * Esta es la era de las "grandes potencias" del Bronce Tardío: Egipto del
 * Reino Nuevo (XVIII–XX dinastía, Tutmosis III, Ramsés II) compite con el
 * Imperio Hitita por el control del Levante, mientras Mitanni domina el
 * norte de Mesopotamia hasta su colapso (~1350 a.C.) frente a Asiria Media.
 * Babilonia está bajo la dinastía Casita. Canaán es un mosaico de ciudades-
 * estado vasallas (cartas de Amarna). Edom/Moab/Amón aparecen como entidades
 * tribales tardías hacia el final del período.
 *
 * Decisiones:
 *   - Mostramos un "snapshot" cercano a ~1350 a.C. (período de Amarna),
 *     con Mitanni aún visible pero menguante.
 *   - Hatti se extiende sobre Anatolia central; sus vasallos sirios (Ugarit,
 *     Amurru) los englobamos dentro de "Canaán · ciudades-estado" para no
 *     fragmentar el mapa.
 *   - Edom/Moab/Amón son aproximados al sur/este del Mar Muerto: en rigor
 *     emergen mejor documentadas en el Hierro I (~1200 a.C.), apenas al
 *     cierre de este período.
 *
 * Coordenadas en unidades SVG (viewBox 1000×600). Ver anchors en
 * ManuscriptMap.astro.
 */
export const exodoBoundaries: BoundarySet = {
  eraId: 'exodo',
  caption: 'c. 1500–1200 a.C. · Bronce Tardío',
  polygons: [
    {
      id: 'egipto-reino-nuevo',
      name: 'Egipto · Reino Nuevo',
      paths: [[
        [445, 355], [500, 350], [530, 380], [540, 425],
        [520, 470], [485, 480], [455, 465], [438, 425],
        [432, 385],
      ]],
      label: { x: 482, y: 415, size: 9 },
    },
    {
      id: 'hatti',
      name: 'Imperio Hitita',
      paths: [[
        [475, 200], [555, 188], [610, 200], [625, 225],
        [605, 248], [555, 252], [505, 245], [475, 228],
      ]],
      label: { x: 545, y: 220, size: 10 },
    },
    {
      id: 'mitanni',
      name: 'Mitanni',
      paths: [[
        [560, 250], [625, 248], [665, 258], [665, 280],
        [625, 285], [580, 278], [560, 268],
      ]],
      label: { x: 615, y: 268, size: 9 },
    },
    {
      id: 'asiria-media',
      name: 'Asiria Media',
      paths: [[
        [665, 258], [710, 260], [725, 280], [715, 300],
        [680, 300], [665, 285],
      ]],
      label: { x: 692, y: 282, size: 8 },
    },
    {
      id: 'babilonia-casita',
      name: 'Babilonia Casita',
      paths: [[
        [625, 295], [695, 295], [720, 320], [715, 355],
        [680, 372], [635, 365], [615, 340], [615, 310],
      ]],
      label: { x: 665, y: 332, size: 9 },
    },
    {
      id: 'canaan-ciudades-estado',
      name: 'Canaán · ciudades-estado',
      paths: [[
        [548, 308], [585, 305], [600, 330], [598, 360],
        [575, 380], [548, 372], [540, 345], [540, 320],
      ]],
      label: { x: 568, y: 342, size: 8 },
    },
    {
      id: 'edom-moab-amon',
      name: 'Edom · Moab · Amón',
      paths: [[
        [585, 365], [610, 360], [620, 385], [615, 410],
        [595, 418], [578, 405], [575, 380],
      ]],
      label: { x: 597, y: 390, size: 7 },
    },
    {
      id: 'elam-medio',
      name: 'Elam',
      paths: [[
        [720, 305], [765, 302], [785, 335], [765, 365],
        [728, 360], [718, 335],
      ]],
      label: { x: 748, y: 333, size: 8 },
    },
  ],
};
