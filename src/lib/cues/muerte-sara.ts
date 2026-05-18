import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Sara y compra de Macpela".
 * Pins: sara(0), abraham(1), isaac(2). Escenario: Quiriat-Arbá / Hebrón [582, 365].
 */
const CUES: Cue[] = [
  // Sara — la primera matriarca
  { match: /Sara|Sarah|matriarca/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abraham hace duelo
  { match: /Abraham|Ibr[āa]h[īi]m.{0,18}(duelo|llora|hace duelo)/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Sara muere — recede
  { match: /muri[oó] Sara|muere a los 127|ciento veintisiete|muerte de Sara/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Negociación con los hititas y compra de Macpela
  { match: /hijos de Het|hititas|cuatrocientos siclos|400 siclos|Efr[oó]n|compra.{0,12}sepulcro/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 365] } },
  // Cueva de Macpela — sepulcro patriarcal por excelencia
  { match: /Macpela|cueva.{0,12}heredad|Mamre|Haram al-Khalil|Tumba de los Patriarcas/i, cueId: 'fx:glow-pulse', data: { position: [582, 365], color: '#e6d4a0' } },
  // Conexión con la Akedah (lectura midrásica)
  { match: /Akedah|noticia del sacrificio|conexi[oó]n.{0,12}sacrificio de Isaac|muere de la noticia/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
];

export default CUES;
