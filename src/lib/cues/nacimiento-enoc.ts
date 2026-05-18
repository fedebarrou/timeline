import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Enoc".
 * Pins: enoc(0), jared(1), mahalalel(2), vigilantes(3), semjaza(4), azazel(5), nephilim(6).
 */
const CUES: Cue[] = [
  // Jared (padre) — descenso es su nombre
  { match: /Jared|descenso|engendr[oó] a Enoc/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#c8b88a' } },
  // Enoc nace — luz consagrada (séptimo desde Adán)
  { match: /Enoc|Janoj|consagrado|s[eé]ptimo desde Ad[áa]n|s[eé]ptimo eslab[oó]n|iniciar|dedicar/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Mahalalel (abuelo) — alabanza a Dios
  { match: /Mahalalel|alabanza a Dios|abuelo de Enoc/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#e6d4a0' } },
  // Descenso de los Vigilantes al Monte Hermón
  { match: /Vigilantes|Grigori|Watchers|monte Herm[oó]n|200 [aá]ngeles|descienden los/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Semjaza, líder de los Vigilantes
  { match: /Semjaza|l[ií]der de los Vigilantes/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Azazel — destello oscuro
  { match: /Azazel|metalurgia|cosm[eé]ticos/i, cueId: 'fx:character-emerge', data: { pinIdx: 5 } },
  // Nephilim emergen — gigantes
  { match: /Nephilim|gigantes|raza h[ií]brida|hijos de los Vigilantes/i, cueId: 'fx:character-emerge', data: { pinIdx: 6 } },
];

export default CUES;
