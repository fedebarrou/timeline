import type { Cue } from '../narrationCues';

/**
 * Cues for "Última Cena".
 * Pins: jesus(0), pedro(1), juan-apostol(2), judas-iscariote(3).
 */
const CUES: Cue[] = [
  // Preparan la Pascua en sala alta
  { match: /preparar la Pascua|sala alta|panes [áa]cimos|cen[áa]culo|aposento alto/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pan partido — institución eucarística
  { match: /tom[oó] el pan|bendijo|parti[oó].{0,12}pan|esto es mi cuerpo|haced esto en memoria/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Pan figurativo — panes que se multiplican
  { match: /tom[oó] el pan|parti[oó].{0,12}pan|esto es mi cuerpo|\bpan\b/i, cueId: 'fx:bread-multiply', data: { position: [582, 363] } },
  // Copa / vino — sangre del nuevo pacto
  { match: /la copa|esta copa|nuevo pacto|sangre.{0,20}derrama|cordero pascual/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#a04040' } },
  // Cáliz figurativo — copa de vino/sangre
  { match: /la copa|esta copa|\bvino\b|nuevo pacto|sangre.{0,20}derrama|copa de bendici[oó]n/i, cueId: 'fx:chalice', data: { position: [584, 363] } },
  // Anuncio de traición
  { match: /uno de vosotros me entregar[áa]|anuncio de la traici[oó]n|el traidor|bocado mojado/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Judas sale — y era de noche
  { match: /Judas.{0,30}(sale|salio|era de noche)|lo que has de hacer hazlo pronto/i, cueId: 'fx:character-recede', data: { pinIdx: 3 } },
  // Lavatorio de pies — Juan
  { match: /lavatorio|lav[oó] los pies|se ci[ñn][oó] una toalla|ejemplo|mandamiento nuevo/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Anuncio negaciones de Pedro
  { match: /negar[áa]s tres veces|anuncio.{0,12}negaciones|antes que el gallo/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Mesa coránica
  { match: /mesa servida|Al-Ma'ida|mesa del cielo|manjares del cielo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
];

export default CUES;
