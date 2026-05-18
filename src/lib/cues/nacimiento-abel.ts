import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Abel".
 * Pins: adan(0), eva(1), abel(2).
 */
const CUES: Cue[] = [
  // Eva da a luz por segunda vez
  { match: /dio a luz|hermano de Ca[ií]n|segundo hijo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#cfe6c8' } },
  // Abel nace — entrada delicada
  { match: /Abel|H[eé]vel|H[áa]b[ií]l/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Nombre significa vapor / aliento — destello pálido (premonición)
  { match: /vapor|aliento|vanidad|vida breve|brevedad/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#b8c7d6' } },
  // Pastor de ovejas — pulso sobre Abel
  { match: /pastor|pastor de ovejas|pastorea|rebaño/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#dceacb' } },
  // Adán como padre presente
  { match: /padre del segundo|familia humana se expande/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
];

export default CUES;
