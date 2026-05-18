import type { BoundarySet } from './types';

/**
 * Revelación era (~620 d.C.) — víspera de las conquistas islámicas.
 *
 * Snapshot de Asia occidental hacia 620 d.C., en plena última guerra
 * romano-sasánida (602–628). Mahoma ha emigrado a Medina (Hégira, 622) y
 * la península arábiga está fragmentada entre tribus.
 *
 *   - Imperio Bizantino (Heraclio, 610–641): Anatolia, Egipto recién
 *     reconquistado por los sasánidas en este momento (614–628), Siria
 *     ocupada. Mostramos las fronteras "ideales" pre-conflicto en Anatolia
 *     y África para no confundir.
 *   - Imperio Sasánida (Cosroes II): Persia, Mesopotamia, y por el momento
 *     Siria/Palestina/Egipto bajo ocupación temporal — los pintamos como
 *     "ocupación sasánida" sobre el Levante.
 *   - Arabia tribal:
 *       · Quraysh en La Meca (oligarquía mercantil, custodios de la Kaaba)
 *       · Aws / Jazraj en Medina (oasis de Yathrib)
 *       · Ghassánidas (vasallos de Bizancio, frontera siria) — colapsados
 *         hacia 582 pero aún relevantes culturalmente
 *       · Lájmidas (vasallos sasánidas, capital Hira) — abolidos en 602,
 *         su territorio queda bajo control sasánida directo
 *
 * Decisiones:
 *   - "Ocupación sasánida en Levante" es históricamente correcto para 620
 *     pero hace pedagógicamente confuso el mapa; preferimos mostrar la
 *     frontera tradicional romano-sasánida sobre el Éufrates, dejando
 *     Siria/Palestina como bizantinas. La caption avisa la fecha.
 *   - Quraysh / Aws-Jazraj son círculos pequeños alrededor de Meca/Medina:
 *     no son estados territoriales, son confederaciones tribales urbanas.
 *   - Yemen (himyaríes, ocupación sasánida desde 575) lo dejamos fuera por
 *     caer cerca del borde inferior del viewBox.
 */
export const revelacionBoundaries: BoundarySet = {
  eraId: 'revelacion',
  caption: 'c. 620 d.C. · vísperas de las conquistas islámicas',
  polygons: [
    {
      id: 'imperio-bizantino',
      name: 'Imperio Bizantino',
      paths: [
        // Bloque Anatolia + Levante + Egipto
        [
          [340, 230], [430, 225], [510, 228], [575, 232], [615, 248],
          [610, 275], [598, 295], [578, 305], [560, 315], [552, 340],
          [555, 370], [548, 395], [528, 425], [515, 470], [482, 482],
          [450, 470], [430, 432], [422, 392], [430, 355], [412, 320],
          [380, 295], [358, 268],
        ],
      ],
      label: { x: 440, y: 265, size: 12 },
    },
    {
      id: 'imperio-sasanida',
      name: 'Imperio Sasánida',
      paths: [[
        [615, 235], [710, 230], [775, 252], [810, 295],
        [800, 345], [770, 385], [720, 392], [680, 378],
        [645, 355], [625, 325], [612, 295], [610, 262],
      ]],
      label: { x: 720, y: 312, size: 12 },
    },
    {
      id: 'quraysh-meca',
      name: 'Quraysh · La Meca',
      paths: [[
        [598, 430], [615, 428], [622, 442], [618, 455],
        [602, 458], [592, 448], [592, 438],
      ]],
      label: { x: 608, y: 448, size: 7 },
    },
    {
      id: 'aws-jazraj-medina',
      name: 'Aws · Jazraj · Medina',
      paths: [[
        [592, 408], [610, 405], [618, 418], [612, 432],
        [598, 432], [588, 422],
      ]],
      label: { x: 602, y: 422, size: 7 },
    },
    {
      id: 'ghassanidas',
      name: 'Ghassánidas',
      paths: [[
        [585, 355], [615, 350], [628, 378], [620, 398],
        [598, 400], [585, 385],
      ]],
      label: { x: 605, y: 378, size: 7 },
    },
    {
      id: 'lajmidas',
      name: 'Lájmidas (Hira)',
      paths: [[
        [638, 348], [668, 345], [678, 365], [668, 380],
        [645, 380], [635, 365],
      ]],
      label: { x: 655, y: 365, size: 7 },
    },
    {
      id: 'arabia-interior',
      name: 'Arabia tribal',
      paths: [[
        [615, 380], [680, 378], [705, 410], [700, 460],
        [665, 488], [625, 482], [602, 460], [600, 425],
      ]],
      label: { x: 650, y: 432, size: 10 },
    },
  ],
};
