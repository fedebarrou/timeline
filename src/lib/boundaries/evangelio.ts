import type { BoundarySet } from './types';

/**
 * Evangelio era (~30 d.C.) — Pax Romana, comienzo del Principado.
 *
 * Snapshot del Mediterráneo oriental bajo Tiberio (~30 d.C.):
 *
 *   - Imperio Romano: provincias Acaya, Asia, Galacia, Siria, Egipto.
 *     Pintamos un único polígono "envoltorio" para el Imperio en el
 *     occidente y norte del mapa.
 *   - Judea como provincia procuratorial (post-6 d.C., bajo Poncio Pilato).
 *   - Tetrarquía herodiana: Galilea + Perea (Herodes Antipas) e
 *     Iturea-Traconítide (Filipo) — los hijos de Herodes el Grande.
 *   - Reino Nabateo (Aretas IV) al sur/este, capital Petra.
 *   - Imperio Parto (Arsácidas, Artabano II) al este del Éufrates.
 *   - Reino de Armenia como estado tapón entre Roma y Partia.
 *
 * Decisiones:
 *   - Mostramos la fragmentación interna de Palestina (Judea procuratorial
 *     separada de las tetrarquías) porque es central al relato evangélico:
 *     Jesús cruza esas fronteras todo el tiempo.
 *   - No incluimos provincias romanas occidentales (Hispania, Galia, Italia)
 *     porque caen fuera del viewBox útil (340–820, 180–500).
 *   - Egipto romano se pinta como parte del "Imperio Romano" envolvente.
 */
export const evangelioBoundaries: BoundarySet = {
  eraId: 'evangelio',
  caption: 'c. 30 d.C. · Imperio Romano · tetrarquía herodiana',
  polygons: [
    {
      id: 'imperio-romano',
      name: 'Imperio Romano',
      paths: [
        // Bloque mediterráneo occidental/central + Anatolia + Siria + Egipto
        [
          [340, 240], [430, 232], [500, 235], [570, 232], [625, 240],
          [620, 270], [600, 295], [565, 295], [555, 282], [540, 285],
          [535, 305], [515, 320], [495, 340], [510, 380], [525, 425],
          [510, 475], [475, 485], [445, 470], [428, 432], [422, 392],
          [430, 355], [410, 320], [380, 295], [360, 270],
        ],
      ],
      label: { x: 440, y: 270, size: 12 },
    },
    {
      id: 'judea-provincia',
      name: 'Judea (provincia)',
      paths: [[
        [552, 350], [582, 348], [592, 368], [588, 388],
        [565, 395], [548, 382], [546, 362],
      ]],
      label: { x: 568, y: 372, size: 8 },
    },
    {
      id: 'galilea-perea',
      name: 'Galilea · Perea',
      paths: [
        // Galilea (norte)
        [
          [548, 318], [578, 315], [588, 335], [582, 350],
          [560, 350], [546, 335],
        ],
        // Perea (este del Jordán)
        [
          [585, 355], [602, 350], [608, 380], [600, 400],
          [588, 398], [585, 375],
        ],
      ],
      label: { x: 565, y: 332, size: 8 },
    },
    {
      id: 'iturea-traconitide',
      name: 'Iturea · Traconítide',
      paths: [[
        [578, 295], [610, 292], [620, 312], [612, 325],
        [588, 325], [575, 312],
      ]],
      label: { x: 595, y: 312, size: 7 },
    },
    {
      id: 'nabatea',
      name: 'Reino Nabateo',
      paths: [[
        [582, 392], [618, 388], [635, 415], [628, 445],
        [605, 458], [580, 448], [572, 420],
      ]],
      label: { x: 602, y: 422, size: 8 },
    },
    {
      id: 'imperio-parto',
      name: 'Imperio Parto',
      paths: [[
        [625, 240], [710, 235], [770, 258], [800, 295],
        [795, 340], [770, 372], [725, 378], [690, 365],
        [665, 348], [635, 330], [620, 300], [620, 268],
      ]],
      label: { x: 720, y: 310, size: 11 },
    },
    {
      id: 'armenia',
      name: 'Armenia',
      paths: [[
        [630, 205], [695, 200], [725, 218], [720, 240],
        [680, 245], [640, 238], [625, 222],
      ]],
      label: { x: 670, y: 222, size: 9 },
    },
  ],
};
