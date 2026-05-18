import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Adán y Eva".
 * Pins: adan(0), eva(1), lilith(2).
 */
const CUES: Cue[] = [
  // Adán formado del polvo de la tierra
  { match: /polvo de la tierra|polvo|barro|arcilla/i, cueId: 'fx:dust-burst', data: { pinIdx: 0 } },
  // Aliento de vida — Adán cobra forma
  { match: /aliento de vida|sopl[oó] en su nariz|insufl[oó]|alma viviente|ser viviente/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Costilla / costado — chispa al nacer Eva
  { match: /costilla|costado|sue[ñn]o profundo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Eva emerge — primera mujer
  { match: /primera mujer|form[oó] .{0,10}Eva|dio el nombre de Eva|Eva|madre de los vivientes/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Lilith — tradición rabínica tardía
  { match: /Lilit|primera esposa|Alfabeto de Ben Sir[áa]|Zohar/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Iblis rechaza prosternarse — destello de orgullo
  { match: /Iblis|rechazo de Iblis|se rehus[óa]/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#a04040' } },
];

export default CUES;
