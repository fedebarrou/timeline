import type { Cue } from '../narrationCues';

/**
 * Cues for "Pentecostés".
 * Pins: pedro(0), juan-apostol(1), maria(2).
 */
const CUES: Cue[] = [
  // Reunidos en el Cenáculo
  { match: /cen[áa]culo|aposento alto|estaban todos un[áa]nimes|reunidos en oraci[oó]n|d[ií]a de Pentecost[eé]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Estruendo de viento recio
  { match: /estruendo|viento recio|del cielo|llen[oó] toda la casa|de repente/i, cueId: 'fx:earthquake-shake', data: { position: [582, 363] } },
  // Lenguas de fuego sobre cada uno
  { match: /lenguas.{0,12}fuego|lenguas repartidas|se asentaban|sobre cada uno|asent[áa]ndose/i, cueId: 'fx:fire-flicker', data: { position: [582, 363] } },
  // Espíritu Santo desciende — paloma
  { match: /Esp[ií]ritu Santo|llenos del Esp[ií]ritu|R[uū][hḥ] al-Qudus|don del Esp[ií]ritu/i, cueId: 'fx:dove-flight', data: { position: [582, 358] } },
  // Hablan en otras lenguas — gloria/halo
  { match: /hablar en otras lenguas|cada uno los o[ií]a|propia lengua|don de lenguas|partos.{0,12}medos/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Pedro predica el primer kerigma
  { match: /Pedro.{0,12}(pone de pie|predica|sermon)|primer kerigma|derramar[eé] mi Esp[ií]ritu|Joel/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Tres mil se bautizan — gran luz
  { match: /tres mil|bautizaron|arrepentios|nacimiento de la Iglesia|kerigma/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Inversión de Babel
  { match: /inversi[oó]n de Babel|Babel|unidad del Esp[ií]ritu|unifica la diversidad/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
];

export default CUES;
