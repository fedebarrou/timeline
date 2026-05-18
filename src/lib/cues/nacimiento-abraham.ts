import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Abraham".
 * Pins: abraham(0), tare(1). Escenario: Ur de los Caldeos [665, 365].
 */
const CUES: Cue[] = [
  // Abraham nace (Abram, padre exaltado)
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Taré padre
  { match: /Tar[ée]|setenta a[ñn]os|sacerdote.{0,12}[íi]dolos|fabricante de [íi]dolos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Ur de los Caldeos — ciudad sumeria
  { match: /Ur de los [Cc]aldeos|Tell el-Muqayyar|sumeria|zigurat.{0,12}Nanna|culto astral/i, cueId: 'fx:glow-pulse', data: { position: [665, 365], color: '#e6d4a0' } },
  // Tradición: fuga al desierto / cueva para escapar de Nimrod
  { match: /matanza de los reci[ée]n nacidos|fuga al desierto|cueva|Nimrod.{0,16}astr[oó]logos|esconde a Ibr[āa]h[īi]m/i, cueId: 'fx:smoke-rise', data: { position: [665, 365] } },
  // Nombre nuevo Abram → Abraham (Gn 17:5)
  { match: /padre exaltado|padre de multitudes|cambio de nombre|Gn 17|pacto/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Excavaciones de Woolley — descubrimiento moderno
  { match: /Woolley|excavaciones de Ur|1922|British Museum/i, cueId: 'fx:dust-burst', data: { position: [665, 365] } },
];

export default CUES;
