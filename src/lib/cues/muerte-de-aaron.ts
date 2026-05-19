import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Aarón en el monte Hor".
 * Pins: moises(0), aaron(1), eleazar(2).
 */
const CUES: Cue[] = [
  // Suben al monte Hor — viaje
  { match: /monte Hor|Jebel Harun|sube.{0,15}monte|cumbre del monte/i, cueId: 'fx:journey-trace', data: { from: [565, 405], to: [575, 410] } },
  // Aarón sube a los 123 años
  { match: /Aar[óo]n.{0,15}(123|ciento veintitr[ée]s)|H[āa]r[ūu]n|sube con Eleazar/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Moisés desnuda las vestiduras
  { match: /desnud[óo].{0,15}vestiduras|quita.{0,15}vestiduras|efod|pectoral|vestiduras sagradas/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffd27a' } },
  // Eleazar recibe el sumo sacerdocio
  { match: /Eleazar|sucesor|nuevo sumo sacerdote|vistió a Eleazar|recibe.{0,15}vestiduras/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Aarón muere en la cima
  { match: /Aar[óo]n.{0,15}muri[óo]|muri[óo] all[íi]|beso de Dios|mitat neshikah/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Duelo nacional 30 días
  { match: /treinta d[íi]as|30 d[íi]as|duelo|llor[óo] el pueblo|hicieron duelo/i, cueId: 'fx:smoke-rise', data: { position: [575, 410] } },
  // Halo divino sobre el sacerdocio
  { match: /sumo sacerdocio|kohanim|dinastía sacerdotal|sucesi[óo]n sacerdotal/i, cueId: 'fx:halo-divine', data: { pinIdx: 2 } },
  // Atardecer en la cima — fade visual al duelo
  { match: /Aar[óo]n.{0,15}muri[óo]|baj[óo].{0,15}solo|al atardecer|descendi[óo] Mois[ée]s solo/i, cueId: 'fx:dusk-fall' },
];

export default CUES;
