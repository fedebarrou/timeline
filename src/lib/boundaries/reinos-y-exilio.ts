import type { BoundarySet } from './types';

/**
 * Reinos y Exilio era (~1000–500 BC) — Iron Age political landscape.
 *
 * El período cubre desde la monarquía unida (David/Salomón, ~1000 a.C.)
 * hasta el regreso del exilio babilónico (~538 a.C.). Por simplicidad
 * mostramos UN único set representativo cercano a ~850 a.C.:
 *
 *   - Reino de Judá al sur (capital Jerusalén)
 *   - Reino de Israel al norte (capital Samaria) — tras el cisma del 930 a.C.
 *   - Fenicia (Tiro, Sidón) en la costa norte
 *   - Filistea en la costa sur
 *   - Aram-Damasco al noreste
 *   - Imperio Neoasirio en expansión sobre Mesopotamia
 *   - Babilonia (aún vasalla de Asiria en esta fecha)
 *   - Egipto (Tercer Período Intermedio / dinastía XXII libia)
 *   - Edom, Moab, Amón al este del Jordán
 *
 * Decisiones:
 *   - ~850 a.C. permite ver "el escenario del profetismo clásico" (Elías,
 *     Eliseo, Amós) con los dos reinos vivos y Asiria amenazando.
 *   - No representamos el Imperio Neobabilónico (605–539) ni el Persa
 *     (post-539) — pedirían sets adicionales. La caption lo aclara.
 *   - Fenicia es una franja costera, no un estado unificado; la pintamos
 *     como un solo polígono por claridad visual.
 */
export const reinosYExilioBoundaries: BoundarySet = {
  eraId: 'reinos-y-exilio',
  caption: 'c. 850 a.C. · reinos divididos · Asiria neo en expansión',
  polygons: [
    {
      id: 'judah',
      name: 'Reino de Judá',
      paths: [[
        [552, 350], [582, 348], [592, 365], [588, 385],
        [568, 392], [550, 380], [548, 362],
      ]],
      label: { x: 568, y: 370, size: 9 },
    },
    {
      id: 'israel-norte',
      name: 'Reino de Israel',
      paths: [[
        [548, 310], [585, 305], [598, 325], [592, 348],
        [565, 352], [548, 340], [542, 322],
      ]],
      label: { x: 568, y: 328, size: 9 },
    },
    {
      id: 'fenicia',
      name: 'Fenicia',
      paths: [[
        [538, 282], [560, 280], [565, 305], [555, 318],
        [540, 315], [532, 295],
      ]],
      label: { x: 548, y: 298, size: 7 },
    },
    {
      id: 'filistea',
      name: 'Filistea',
      paths: [[
        [528, 350], [552, 348], [552, 372], [538, 385],
        [522, 378], [520, 360],
      ]],
      label: { x: 535, y: 367, size: 7 },
    },
    {
      id: 'aram-damasco',
      name: 'Aram · Damasco',
      paths: [[
        [565, 295], [610, 290], [625, 312], [615, 332],
        [585, 335], [565, 322],
      ]],
      label: { x: 592, y: 314, size: 8 },
    },
    {
      id: 'asiria-neo',
      name: 'Imperio Neoasirio',
      paths: [[
        [560, 230], [660, 225], [710, 245], [725, 275],
        [710, 305], [665, 312], [615, 305], [580, 285],
        [560, 258],
      ]],
      label: { x: 645, y: 268, size: 11 },
    },
    {
      id: 'babilonia-vasalla',
      name: 'Babilonia',
      paths: [[
        [625, 312], [695, 312], [715, 335], [705, 360],
        [665, 372], [625, 360], [615, 335],
      ]],
      label: { x: 660, y: 340, size: 9 },
    },
    {
      id: 'egipto-tip',
      name: 'Egipto · III Período Intermedio',
      paths: [[
        [445, 358], [500, 355], [528, 385], [538, 430],
        [515, 472], [482, 482], [455, 465], [435, 428],
        [430, 388],
      ]],
      label: { x: 482, y: 418, size: 8 },
    },
    {
      id: 'edom-moab-amon-hierro',
      name: 'Edom · Moab · Amón',
      paths: [[
        [592, 358], [615, 352], [625, 385], [618, 418],
        [598, 425], [582, 410], [582, 380],
      ]],
      label: { x: 602, y: 388, size: 7 },
    },
  ],
};
