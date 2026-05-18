import type { Cue } from '../narrationCues';

/**
 * Cues for "Bautismo de Jesús".
 * Pins: jesus(0), juan-bautista(1).
 */
const CUES: Cue[] = [
  // Jordán — agua que fluye
  { match: /Jord[áa]n|baja al Jord[áa]n|aguas del r[ií]o|sumerge.{0,12}aguas|subi[oó] del agua/i, cueId: 'fx:water-wave', data: { position: [585, 362] } },
  // Jordán figurativo — aguas que se abren en torno al Mesías
  { match: /Jord[áa]n|aguas del r[ií]o|aguas se .{0,8}(abren|apartan)|sumerge.{0,12}aguas/i, cueId: 'fx:parted-waters', data: { position: [585, 362] } },
  // Juan el Bautista predica
  { match: /Juan.{0,12}(predica|bautiza|reconoce)|Bautista|bautismo de conversi[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Jesús entra al Jordán
  { match: /Jes[uú]s.{0,30}(bautizado|se acerca|se sumerge|cumplir toda justicia)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Cielos se abren / Espíritu desciende como paloma
  { match: /cielos.{0,12}abren|cielos.{0,12}abiertos|Esp[ií]ritu .{0,12}desciende|paloma|forma corporal/i, cueId: 'fx:dove-flight', data: { position: [585, 348] } },
  // Voz del Padre — halo trinitario
  { match: /voz del cielo|este es mi Hijo amado|tengo complacencia|voz del Padre/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Cordero de Dios — testimonio del Bautista
  { match: /Cordero de Dios|quita el pecado del mundo|testimonio del Bautista/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#fff1c0' } },
  // Manifestación / epifanía
  { match: /epifan[ií]a|manifestaci[oó]n|trinitar|tres personas/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
