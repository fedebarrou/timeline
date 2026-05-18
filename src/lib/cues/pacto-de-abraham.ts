import type { Cue } from '../narrationCues';

/**
 * Cues for "El pacto de Abraham".
 * Pins: abraham(0), sara(1). Escenario: Hebrón / Mamre [582, 365].
 */
const CUES: Cue[] = [
  // Abraham/Abram
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sara/Saray
  { match: /Sara|Saray|Sarah|princesa/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Promesa de descendencia "como las estrellas"
  { match: /como las estrellas|cuenta las estrellas|descendencia|tu descendencia|le fue contado por justicia/i, cueId: 'fx:glow-pulse', data: { position: [582, 365], color: '#fff1c0' } },
  // Ritual de las piezas — animales partidos, antorcha y humo
  { match: /piezas|animales partidos|animales divididos|antorcha de fuego|horno humeante/i, cueId: 'fx:fire-flicker', data: { position: [582, 365] } },
  // Humo del horno
  { match: /humo .{0,8}horno|humeante.{0,12}pasaba|sue[ñn]o profundo/i, cueId: 'fx:smoke-rise', data: { position: [582, 365] } },
  // Cambio de nombre Abram → Abraham / Saray → Sara
  { match: /padre de multitudes|cambio de nombre|Abram.{0,12}Abraham|Saray.{0,12}Sara/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Circuncisión — señal corporal del pacto
  { match: /circuncisi[oó]n|circuncidad|octavo d[ií]a|brit milah|se[ñn]al del pacto/i, cueId: 'fx:blood-stain', data: { position: [582, 365] } },
  // Ḥanīf — Abraham anterior al judaísmo y cristianismo
  { match: /ḥan[īi]f|hanif|ni jud[ií]o ni cristiano|monote[íi]sta puro|im[áa]m de los pueblos/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6d4a0' } },
];

export default CUES;
