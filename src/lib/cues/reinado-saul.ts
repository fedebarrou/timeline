import type { Cue } from '../narrationCues';

/**
 * Cues for "Reinado de Saúl".
 * Pins: saul(0), samuel(1), jonatan(2).
 */
const CUES: Cue[] = [
  // Saúl aparece — alto y hermoso
  { match: /Sa[uú]l|[ṬT][āa]l[uū]t|hijo de Cis|benjaminita|primer rey|de hombros arriba/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Samuel unge — derrama el aceite
  { match: /Samuel.{0,16}(unge|derrama|beso|vaso de aceite)|unci[oó]n .{0,8}(privada|p[uú]blica)/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Aceite / unción — destello sagrado
  { match: /aceite|vaso .{0,8}aceite|ungido|profeta unge/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfa14c' } },
  // Jonatán — hijo y heredero
  { match: /Jonat[áa]n|hijo mayor de Sa[uú]l|escudero|Micmas|asalta solo/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Desobediencia: sacrificio en Gilgal / Agag perdonado
  { match: /Gilgal|sacrificio prematuro|Amalec|herem|Agag|obedecer es mejor/i, cueId: 'fx:blood-stain', data: { position: [582, 360] } },
  // Espíritu malo — atormentado
  { match: /esp[ií]ritu malo|atormenta|se apart[oó] de Sa[uú]l|jabalina|persigue a David/i, cueId: 'fx:smoke-rise', data: { position: [582, 360] } },
  // Pitonisa de Endor — Samuel convocado desde el más allá
  { match: /pitonisa|Endor|nigromancia|m[eé]dium|convoca a Samuel|del m[áa]s all[áa]/i, cueId: 'fx:angel-descent', data: { position: [582, 358] } },
  // Gilboa — los hijos caen, Saúl se arroja sobre su espada
  { match: /Gilboa|sus tres hijos|se arroja sobre|propia espada|suicidio|escudero rehu/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
