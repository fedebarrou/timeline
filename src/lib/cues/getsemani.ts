import type { Cue } from '../narrationCues';

/**
 * Cues for "Agonía en Getsemaní".
 * Pins: jesus(0), pedro(1), judas-iscariote(2).
 * CUMBRE — 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Cruzan el Cedrón hasta Getsemaní
  { match: /Getseman[ií]|Cedr[oó]n|huerto.{0,12}olivos|al otro lado del Cedr[oó]n|lagar de aceite/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Olivos — aceite de oliva, lagar
  { match: /olivos|huerto de los olivos|aceite|lagar de aceite/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#8aad60' } },
  // Oración angustiada — Padre, pase esta copa
  { match: /pase de m[ií] esta copa|no se haga mi voluntad|alma .{0,6}triste hasta la muerte|orar.{0,20}intensamente/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a4040' } },
  // Copa mencionada — REGLA #1: no hay cáliz en escena aquí, usamos chalice OK
  { match: /esta copa|copa del sufrimiento|copa de amargura/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#a05050' } },
  // Ángel conforta
  { match: /[áa]ngel.{0,12}(confortaba|fortalecerle|aparece)|fortalecerle/i, cueId: 'fx:angel-descent', data: { pinIdx: 0 } },
  // Sudor de sangre — hematidrosis
  { match: /sudor.{0,6}sangre|gotas de sangre|hematidrosis|ca[ií]an hasta la tierra/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Sangre
  { match: /\bsangre\b/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Noche — oscuridad total
  { match: /noche en el huerto|en la oscuridad|cruzaron de noche|tras la cena nocturna/i, cueId: 'fx:night-fall' },
  // Antorchas — luz de los soldados
  { match: /antorchas|faroles|linternas.{0,12}soldados|cohorte romana/i, cueId: 'fx:fire-flicker', data: { position: [582, 363] } },
  // Halo sobre Jesús en oración
  { match: /se postr[oó]|postrado en tierra|rostro en tierra|ora .{0,12}solo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Luz divina en la agonía
  { match: /no se haga mi voluntad sino la tuya|Abbá|Padre.{0,12}todo es posible/i, cueId: 'fx:divine-light-beam', data: { position: [582, 358] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Discípulos duermen — receden
  { match: /dormidos|no hab[eé]is podido velar|tres veces vuelve|encuentra a los tres dormidos/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Pedro intenta velar
  { match: /Pedro.{0,20}(despierta|velar|vigilar)|Pedro.{0,12}duerme/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#7a5a3a' } },
  // Judas llega con cohorte
  { match: /Judas.{0,20}(llega|cohorte|antorchas)|beso|al que yo bese|salve.{0,6}Maestro/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Beso de Judas — traición
  { match: /beso de Judas|le bes[oó]|salve Maestro|se[ñn]al del beso/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#a05050' } },
  // Pedro saca espada y corta oreja a Malco
  { match: /Pedro.{0,20}espada|oreja a Malco|corta la oreja|guarda tu espada|todos los que tomen espada/i, cueId: 'fx:lightning-strike', data: { from: [580, 355], to: [582, 363] } },
  // Espada — REGLA: no hay scene-object 'espada' en Getsemaní
  { match: /\bespada\b|esgrim[ií]|sac[oó] la espada/i, cueId: 'fx:sword-strike', data: { from: [580, 355], to: [582, 363] } },
  // Lo prenden — Jesús recede
  { match: /lo prenden|prendieron a Jes[uú]s|los disc[ií]pulos huyen|huyen|arresto/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Vignette al momento del arresto
  { match: /prendieron|arrestaron|le atan|le llevan/i, cueId: 'fx:vignette-pulse' },

  // ── Pasada 3: contexto y cierre ───────────────────────────────────────

  // Zoom en el fiat de Jesús
  { match: /no se haga mi voluntad sino la tuya|Abbá.{0,10}Padre|que se cumpla/i, cueId: 'fx:zoom-pulse' },
  // Huyen en la oscuridad
  { match: /joven que huye|dejando la s[áa]bana|todos le abandona|huyeron todos/i, cueId: 'fx:fade-to-black' },
];

export default CUES;
