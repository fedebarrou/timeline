import type { Cue } from '../narrationCues';

/**
 * Cues for "Entrada triunfal en Jerusalén".
 * Pins: jesus(0), pedro(1), juan-apostol(2).
 */
const CUES: Cue[] = [
  // Descenso desde Monte de los Olivos a Jerusalén
  { match: /Monte de los Olivos|Betfag[eé]|se aproxima a Jerusal[eé]n|al acercarse a Jerusal[eé]n/i, cueId: 'fx:journey-trace', data: { from: [583, 363], to: [582, 363] } },
  // Jesús sobre pollino — emerge
  { match: /pollino|asno|cabalgando|manso y sentado|Zacar[ií]as 9/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Multitud aclamante — ¡Hosanna!
  { match: /Hosanna|hosianna|bendito el que viene|Hijo de David|en el nombre del Se[ñn]or/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Mantos y palmas — polvo del camino
  { match: /mantos|palmas|ramos|tendian sus mantos|ramas de los [áa]rboles/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
  // Discípulos acompañan
  { match: /discipulos|los Doce|Pedro y .{0,8}Juan|acompa[ñn]a la entrada/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Llanto sobre la ciudad
  { match: /llora sobre|llanto.{0,20}ciudad|destrucci[oó]n|tiempo de tu visitaci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a4040' } },
  // Las piedras gritarían
  { match: /las piedras gritar[ií]an|si [eé]stos callaran/i, cueId: 'fx:earthquake-shake', data: { position: [582, 363] } },
];

export default CUES;
