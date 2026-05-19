import type { Cue } from '../narrationCues';

/**
 * Cues for "Milagros de Jesús".
 * Pins: jesus(0), lazaro(1), marta(2), maria-de-betania(3).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'lago-galilea', 'sepulcro-lazaro'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Sanaciones — halo divino
  { match: /sanaciones|san[oó] a|ciegos|paralitico|paral[ií]tico|lepros|hemorro[ií]sa|sanando|cur[oó]/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Glow sobre el sanado
  { match: /sanaciones|san[oó] a|ciegos recuperan|limpios|levántate y anda/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Exorcismos — pulso rojizo
  { match: /exorcism|endemoniado|expulsar demonios|Gerasa|esp[ií]ritu inmundo|epil[eé]ptico/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Pesca milagrosa — REGLA #1: anima el pez-cristiano ya en escena
  { match: /pesca milagrosa|dos peces|peces|redes|red se llenaba|red llena de peces/i, cueId: 'fx:animate-scene-object', data: { id: 'pez-cristiano', kind: 'sway', duration: 1.8 } },
  // Multiplicación de peces — REGLA #1
  { match: /pesca milagrosa|peces y pan|multiplicaci[oó]n.{0,6}peces|los peces/i, cueId: 'fx:animate-scene-object', data: { id: 'pez-cristiano', kind: 'pulse', duration: 2.0 } },
  // Pan multiplicado — bread multiply
  { match: /multiplicaci[oó]n de.{0,6}panes|cinco panes|panes y peces|reparti[oó].{0,12}panes|saciaron.{0,15}multitud/i, cueId: 'fx:bread-multiply', data: { position: [580, 352] } },
  // Bodas de Caná — agua
  { match: /bodas de Can[áa]|agua.{0,6}vino|primer signo|primer milagro|Can[áa] de Galilea/i, cueId: 'fx:water-wave', data: { position: [580, 351] } },
  // Jarra de agua — cántaro
  { match: /jarras de piedra|c[áa]ntaros|seis tinajas|t[ií]najas|llenadles de agua/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Caminar sobre las aguas — water wave
  { match: /caminar sobre.{0,6}agua|tempestad calmada|agua.{0,12}camina/i, cueId: 'fx:water-wave', data: { position: [582, 355] } },
  // Lago y tormenta
  { match: /tempestad calmada|viento recio|tormenta en el lago|olas que crecían|calmad|cállate|enmudeced/i, cueId: 'fx:storm-clouds' },
  // Lázaro resucita — sepulcro escena-object animado
  { match: /L[áa]zaro|cuarto d[ií]a|sepulcro|tumba de L[áa]zaro|sal fuera|piedra del sepulcro/i, cueId: 'fx:animate-scene-object', data: { id: 'sepulcro-lazaro', kind: 'pulse', duration: 1.8 } },
  // Luz de resurrección de Lázaro
  { match: /L[áa]zaro.{0,20}(resucit|sal fuera|vivi[oó])|resucit[oó].{0,20}L[áa]zaro/i, cueId: 'fx:resurrection-light', data: { position: [583, 360] } },
  // Piedra removida — rolling stone
  { match: /quitad la piedra|piedra del sepulcro|r[eé]tirala|la piedra/i, cueId: 'fx:rolling-stone', data: { position: [583, 361] } },
  // Pájaros de barro (Corán) — dove flight
  { match: /p[áa]jaros de barro|figura de p[áa]jaro|arcilla|con permiso de Dios|sopla en ella/i, cueId: 'fx:dove-flight', data: { from: [580, 355], to: [580, 345] } },
  // Pez y moneda — REGLA #1: anima pez-cristiano
  { match: /pez.{0,20}moneda|estatero en la boca|moneda en el pez/i, cueId: 'fx:animate-scene-object', data: { id: 'pez-cristiano', kind: 'wobble', duration: 1.6 } },
  // Cordero — Jesús como pastor y curador
  { match: /obejas perdidas|pastor que busca|noventa y nueve|ovejas|rebaño/i, cueId: 'fx:goat-herd', data: { position: [580, 355] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Jesús emerge como sanador
  { match: /signos del Reino|sigma|s[eē]mei?a|dyn[áa]meis|Reino .{0,6}acerca|Reino .{0,6}llegado/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Lázaro emerge del sepulcro
  { match: /L[áa]zaro|cuarto d[ií]a|resucit[oó].{0,20}L[áa]zaro|sal fuera|Betania/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Marta emerge
  { match: /Marta|yo soy la resurrecci[oó]n|hermanas|Mar[ií]a de Betania|ungi[oó] los pies/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Incienso / ungüento de mirra
  { match: /ungüento|nardo|mirra|ungi[oó]|frasco de perfume/i, cueId: 'fx:incense-spiral', data: { position: [583, 360] } },
  // Flash blanco al milagro cumbre
  { match: /sal fuera.{0,10}L[áa]zaro|resucit[oó].{0,6}muerto|milagro mayor|se[ñn]al más grande/i, cueId: 'fx:flash-white' },
  // Radial bloom al obrar el milagro
  { match: /yo soy la resurrecci[oó]n y la vida|el que cree en m[ií]|no morir[áa] jam[áa]s/i, cueId: 'fx:radial-bloom', data: { position: [583, 360] } },
  // Zoom al tocarlo y sanar
  { match: /lo toc[oó]|puso las manos|la mano sobre [eé]l|extendi[oó] la mano/i, cueId: 'fx:zoom-pulse' },
  // Multitud asombrada
  { match: /qued[oó] admirada|asombro.{0,12}gente|todo el pueblo|los que lo vieron/i, cueId: 'fx:bowing-crowd', data: { position: [580, 360] } },
];

export default CUES;
