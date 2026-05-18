import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Caín".
 * Pins: adan(0), eva(1), cain(2).
 */
const CUES: Cue[] = [
  // Eva concibe — pulso sobre la madre
  { match: /concibi[oó]|conoci[oó] Ad[áa]n|dio a luz|vientre de una mujer/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffd27a' } },
  // Caín nace — emerge el primogénito
  { match: /Ca[ií]n|Qayin|primer humano|primer ser humano|primogénito/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Adán reacciona con orgullo paterno
  { match: /Ad[áa]n|padre del primer/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // "He adquirido un varón" — destello sobre Caín
  { match: /adquirido|adquirir|qanah|por voluntad de/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#e8c14a' } },
  // Tradición de la hermana gemela Awan — leve aparición simbólica
  { match: /Awan|hermana gemela/i, cueId: 'fx:dust-burst', data: { pinIdx: 2 } },
];

export default CUES;
