import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Set".
 * Pins: adan(0), eva(1), set(2).
 */
const CUES: Cue[] = [
  // Recuerdo de Abel muerto y Caín exiliado — pulso melancólico sobre los padres
  { match: /Abel muerto|Ca[ií]n exiliado|familia queda rota|duelo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#5a6b7a' } },
  // Eva concibe a Set
  { match: /tercer hijo|otra simiente|en lugar de Abel|sustituido/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffd27a' } },
  // Set nace — luz nueva de esperanza
  { match: /Set|Sh[eií]th|nace .{0,8}Set|reemplazo|reinicio/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Brillo de esperanza sobre Set — designado / consagrado
  { match: /designado|sustituto|fundar|poner|linaje justo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#f6e6a8' } },
  // Inicio del culto público — "comenzaron a invocar el nombre"
  { match: /invocar el nombre|culto|oraci[oó]n p[uú]blica|monote[ií]sta/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#e8c14a' } },
];

export default CUES;
