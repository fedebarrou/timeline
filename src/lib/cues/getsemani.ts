import type { Cue } from '../narrationCues';

/**
 * Cues for "Agonía en Getsemaní".
 * Pins: jesus(0), pedro(1), judas-iscariote(2).
 */
const CUES: Cue[] = [
  // Cruzan el Cedrón hasta Getsemaní
  { match: /Getseman[ií]|Cedr[oó]n|huerto.{0,12}olivos|al otro lado del Cedr[oó]n|lagar de aceite/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Oración angustiada — Padre, pase esta copa
  { match: /pase de m[ií] esta copa|no se haga mi voluntad|alma .{0,6}triste hasta la muerte|orar.{0,20}intensamente/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a4040' } },
  // Ángel conforta
  { match: /[áa]ngel.{0,12}(confortaba|fortalecerle|aparece)|fortalecerle/i, cueId: 'fx:angel-descent', data: { pinIdx: 0 } },
  // Sudor de sangre — hematidrosis
  { match: /sudor.{0,6}sangre|gotas de sangre|hematidrosis|ca[ií]an hasta la tierra/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Discípulos duermen — receden
  { match: /dormidos|no hab[eé]is podido velar|tres veces vuelve|encuentra a los tres dormidos/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Judas llega con cohorte
  { match: /Judas.{0,20}(llega|cohorte|antorchas)|beso|al que yo bese|salve.{0,6}Maestro/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Pedro saca espada y corta oreja a Malco
  { match: /Pedro.{0,20}espada|oreja a Malco|corta la oreja|guarda tu espada|todos los que tomen espada/i, cueId: 'fx:lightning-strike', data: { from: [580, 355], to: [582, 363] } },
  // Lo prenden — Jesús recede
  { match: /lo prenden|prendieron a Jes[uú]s|los disc[ií]pulos huyen|huyen|arresto/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
