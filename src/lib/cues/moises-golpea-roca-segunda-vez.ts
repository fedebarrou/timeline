import type { Cue } from '../narrationCues';

/**
 * Cues for "Moisés golpea la roca por segunda vez".
 * Pins: moises(0), aaron(1).
 */
const CUES: Cue[] = [
  // Muerte de Miriam — contexto
  { match: /muri[óo] Miriam|muerte de Miriam|sec[óo].{0,15}pozo de Miriam/i, cueId: 'fx:character-recede', data: { position: [560, 405] } },
  // Pueblo sin agua — murmuración
  { match: /no hab[íi]a agua|sed|murmur|ojal[áa] hubi[ée]ramos muerto/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Dios ordena HABLAR a la roca
  { match: /hablad a la pe[ñn]a|hablar a la roca|orden divina.{0,15}hablar/i, cueId: 'fx:halo-divine', data: { position: [565, 405] } },
  // Moisés golpea la roca dos veces (desobediencia)
  { match: /golpe[óo] la roca|golpe[óo] la pe[ñn]a|dos veces|golpea.{0,15}vara|¿os hemos de hacer salir/i, cueId: 'fx:idol-shatter', data: { position: [565, 405] } },
  // Palabras irreverentes
  { match: /o[íi]d.{0,5}rebeldes|rebeldes|habl[óo] precipitadamente|ira de Mois[ée]s/i, cueId: 'fx:earthquake-shake', data: { position: [565, 405] } },
  // El agua sale igual
  { match: /agua.{0,15}sali[óo]|sale agua|brota.{0,10}agua/i, cueId: 'fx:water-wave', data: { position: [565, 405] } },
  // Sentencia divina: no entrarán a la tierra
  { match: /no.{0,10}entrar[áa]n|no meter[ée]is.{0,15}tierra|excluy[óo].{0,15}tierra prometida|no creísteis en m[íi]/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Aaron también queda excluido
  { match: /Aar[óo]n.{0,15}tampoco|Aar[óo]n.{0,15}exclu|H[āa]r[ūu]n.{0,15}castigad|no entrará Aar[óo]n/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
];

export default CUES;
