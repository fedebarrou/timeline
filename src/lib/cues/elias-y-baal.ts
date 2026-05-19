import type { Cue } from '../narrationCues';

/**
 * Cues for "Elías contra los profetas de Baal".
 * Pins: elias(0), ajab(1), jezabel(2).
 */
const CUES: Cue[] = [
  // Sequía anunciada — tres años sin lluvia
  { match: /sequ[ií]a|no habr[áa] lluvia|tres a[ñn]os|cuervos lo alimenta|arroyo Querit/i, cueId: 'fx:dust-burst', data: { position: [578, 350] } },
  // Elías reta a Ajab y a los profetas paganos
  { match: /El[ií]as .{0,20}(tisbita|profeta|reta)|Ily[āa]s|hasta cu[áa]ndo claudicar/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Profetas de Baal — danza, gritos, ironía
  { match: /450 profetas|profetas de Baal|danza|hieren con cuchillos|chorrear la sangre|quiz[áa] est[áa] dormido/i, cueId: 'fx:idol-shatter', data: { position: [582, 352] } },
  // Empapamiento con agua — doce cántaros
  { match: /doce c[áa]ntaros|cuatro c[áa]ntaros|empap[oó]|agua corre por .{0,8}zanja/i, cueId: 'fx:water-wave', data: { position: [578, 350] } },
  // Fuego del cielo cae sobre el altar de Yahveh (REGLA #1: anima scene-object)
  { match: /fuego .{0,8}(cay[oó]|del cielo|de Yahveh|consumi[oó])|holocausto.{0,16}le[ñn]a.{0,16}piedras|lami[oó] el agua/i, cueId: 'fx:animate-scene-object', data: { id: 'altar-yahve', kind: 'burn', duration: 3.0 } },
  // Pueblo se postra — Yahveh es Dios
  { match: /pueblo se postr|Yahveh es el Dios|adonai hu ha-elohim/i, cueId: 'fx:halo-divine', data: { position: [578, 350] } },
  // Profetas degollados en el Cisón
  { match: /torrente Cis[oó]n|Cis[oó]n|los mat[oó] [eé]l mismo|degolla|matanza/i, cueId: 'fx:blood-stain', data: { position: [580, 352] } },
  // Lluvia al final — pequeña nube como mano
  { match: /pequeña nube|nube como .{0,8}mano|cay[oó] gran lluvia|el cielo se oscurec/i, cueId: 'fx:rain', data: { position: [578, 348] } },
];

export default CUES;
