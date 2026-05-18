import type { Cue } from '../narrationCues';

/**
 * Cues for "Milagros de Jesús".
 * Pins: jesus(0), lazaro(1), marta(2), maria-de-betania(3).
 */
const CUES: Cue[] = [
  // Sanaciones — pulso de luz
  { match: /sanaciones|san[oó] a|ciegos|paralitico|paral[ií]tico|lepros|hemorro[ií]sa|sanando|cur[oó]/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Exorcismos — pulso rojizo
  { match: /exorcism|endemoniado|expulsar demonios|Gerasa|esp[ií]ritu inmundo|epil[eé]ptico/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a4040' } },
  // Bodas de Caná — agua en vino
  { match: /bodas de Can[áa]|agua.{0,6}vino|primer signo|primer milagro/i, cueId: 'fx:water-wave', data: { position: [580, 351] } },
  // Caminar sobre las aguas / tempestad calmada
  { match: /caminar sobre.{0,6}agua|tempestad calmada|multiplicaci[oó]n de panes|pesca milagrosa/i, cueId: 'fx:water-wave', data: { position: [580, 351] } },
  // Multiplicación de los panes — panes que se duplican
  { match: /multiplicaci[oó]n de.{0,6}panes|cinco panes|panes y peces|reparti[oó].{0,12}panes|saciaron.{0,15}multitud/i, cueId: 'fx:bread-multiply', data: { position: [580, 352] } },
  // Pesca milagrosa / panes y peces — peces multiplicados
  { match: /pesca milagrosa|dos peces|peces|redes|red se llenaba/i, cueId: 'fx:fish-multiply', data: { position: [580, 354] } },
  // Lázaro resucita
  { match: /L[áa]zaro|cuarto d[ií]a|resucit[oó].{0,20}L[áa]zaro|sal fuera|Betania/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Marta y María
  { match: /Marta|yo soy la resurrecci[oó]n|hermanas|Mar[ií]a de Betania|ungi[oó] los pies/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Pájaros de barro (Corán)
  { match: /p[áa]jaros de barro|figura de p[áa]jaro|arcilla|con permiso de Dios|sopla en ella/i, cueId: 'fx:dove-flight', data: { position: [580, 348] } },
  // Reino que se acerca — signos
  { match: /signos del Reino|sigma|s[eē]mei?a|dyn[áa]meis|Reino .{0,6}acerca|Reino .{0,6}llegado/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
