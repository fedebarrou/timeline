import type { Cue } from '../narrationCues';

/**
 * Cues for "Pentecostés".
 * Pins: pedro(0), juan-apostol(1), maria(2).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'aposento-pentecostal'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Reunidos en el Cenáculo — REGLA #1: anima el aposento-pentecostal
  { match: /cen[áa]culo|aposento alto|estaban todos un[áa]nimes|reunidos en oraci[oó]n|d[ií]a de Pentecost[eé]s/i, cueId: 'fx:animate-scene-object', data: { id: 'aposento-pentecostal', kind: 'glow', duration: 2.0 } },
  // Reunidos — emerge Pedro
  { match: /cen[áa]culo|aposento alto|estaban todos un[áa]nimes|reunidos en oraci[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Estruendo de viento recio
  { match: /estruendo|viento recio|del cielo|llen[oó] toda la casa|de repente/i, cueId: 'fx:earthquake-shake', data: { position: [582, 363] } },
  // Viento — wind streaks
  { match: /\bviento\b|r[áa]faga|como un viento|soplo del Esp[ií]ritu/i, cueId: 'fx:wind-streaks' },
  // Lenguas de fuego sobre cada uno
  { match: /lenguas.{0,12}fuego|lenguas repartidas|se asentaban|sobre cada uno|asent[áa]ndose/i, cueId: 'fx:fire-flicker', data: { position: [582, 358] } },
  // Fuego — lenguas ígneas
  { match: /\bfuego\b|llamas|ardientes/i, cueId: 'fx:fire-flicker', data: { position: [582, 360] } },
  // Aposento — REGLA #1: anima de nuevo con pulse al recibir el fuego
  { match: /lenguas.{0,12}fuego|asent[áa]ndose|sobre cada uno/i, cueId: 'fx:animate-scene-object', data: { id: 'aposento-pentecostal', kind: 'pulse', duration: 1.5 } },
  // Espíritu Santo desciende — paloma / dove-flight
  { match: /Esp[ií]ritu Santo|llenos del Esp[ií]ritu|R[uū][hḥ] al-Qudus|don del Esp[ií]ritu/i, cueId: 'fx:dove-flight', data: { from: [582, 348], to: [582, 358] } },
  // Halo sobre los que reciben el Espíritu
  { match: /hablar en otras lenguas|cada uno los o[ií]a|propia lengua|don de lenguas|partos.{0,12}medos/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Halo sobre Pedro al levantarse a predicar
  { match: /Pedro.{0,12}(pone de pie|predica|levant[oó])|alzando la voz/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Radial bloom al derramarse el Espíritu
  { match: /derramar[eé] mi Esp[ií]ritu|se derram[oó]|sed llenos|llen[oó] de Esp[ií]ritu/i, cueId: 'fx:radial-bloom', data: { position: [582, 360] } },
  // Flash blanco — el descenso del Espíritu
  { match: /de repente|como un viento|l[le]n[oó] toda la casa|de s[uú]bito/i, cueId: 'fx:flash-white' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Pedro predica el primer kerigma
  { match: /Pedro.{0,12}(pone de pie|predica|sermon)|primer kerigma|derramar[eé] mi Esp[ií]ritu|Joel/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Juan emerge junto a Pedro
  { match: /junto a Pedro|Juan.{0,12}testigo|el disc[ií]pulo que Jes[uú]s amaba.{0,20}testigo/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // María emerge — Madre en Pentecostés
  { match: /Mar[ií]a.{0,20}(oraci[oó]n|cen[áa]culo|reunida|madre)|madre de Jes[uú]s.{0,20}all[ií]/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Tres mil se bautizan — gran luz
  { match: /tres mil|bautizaron|arrepentios|nacimiento de la Iglesia|kerigma/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Inversión de Babel
  { match: /inversi[oó]n de Babel|Babel|unidad del Esp[ií]ritu|unifica la diversidad/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Zoom al momento del fuego
  { match: /sobre cada uno de ellos|sobre toda carne|cada uno los o[ií]a/i, cueId: 'fx:zoom-pulse' },
  // Vignette al primer kerigma
  { match: /Pedro.{0,12}(pone de pie|alzando|predica)|primer kerigma/i, cueId: 'fx:vignette-pulse' },

  // ── Pasada 3: cierre ──────────────────────────────────────────────────

  // Nacimiento de la Iglesia — dawn
  { match: /nacimiento de la Iglesia|comunidad cristiana|primera comunidad|tres mil almas/i, cueId: 'fx:dawn-break' },
  // Rollo de Joel — profecía cumplida
  { match: /profeta Joel|lo que dijo Joel|derramar[eé] mi Esp[ií]ritu.{0,10}toda carne/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 360] } },
];

export default CUES;
