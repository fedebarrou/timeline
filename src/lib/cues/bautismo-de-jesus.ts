import type { Cue } from '../narrationCues';

/**
 * Cues for "Bautismo de Jesús".
 * Pins: jesus(0), juan-bautista(1).
 * CUMBRE — 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Río Jordán — ola de agua
  { match: /Jord[áa]n|baja al Jord[áa]n|aguas del r[ií]o/i, cueId: 'fx:water-wave', data: { position: [585, 362] } },
  // Sumerge en aguas — parted waters
  { match: /sumerge.{0,12}aguas|subi[oó] del agua|sumergido|inmersion|purificaci[oó]n en el r[ií]o/i, cueId: 'fx:parted-waters', data: { position: [585, 362] } },
  // Neblina del río — mist rise
  { match: /r[ií]o|bruma del r[ií]o|orilla|desemboca|corriente/i, cueId: 'fx:mist-rise', data: { position: [585, 362] } },
  // Paloma del Espíritu Santo — variante evangelio (dove-spirit = dove-flight aquí)
  { match: /Esp[ií]ritu .{0,12}desciende|paloma|forma corporal|como paloma/i, cueId: 'fx:dove-flight', data: { from: [585, 348], to: [585, 358] } },
  // Voz del Padre — halo trinitario + luz divina
  { match: /voz del cielo|este es mi Hijo amado|tengo complacencia|voz del Padre/i, cueId: 'fx:divine-light-beam', data: { position: [585, 350] } },
  // Flash blanco en el bautismo
  { match: /cielos.{0,12}abren|cielos.{0,12}abiertos|se rasg[oó] el cielo/i, cueId: 'fx:flash-white' },
  // Bloom trinitario
  { match: /manifestaci[oó]n trinitaria|Padre.{0,12}Hijo.{0,12}Esp[ií]ritu|Trinidad/i, cueId: 'fx:radial-bloom', data: { position: [585, 358] } },
  // Halo sobre Jesús
  { match: /voz del cielo|este es mi Hijo amado|tengo complacencia|voz del Padre/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Rayos de luz divina
  { match: /resplandor.{0,12}cielo|luz.{0,12}desciende|gloria del cielo/i, cueId: 'fx:divine-light-beam', data: { position: [585, 352] } },
  // Cordero de Dios — testimonio del Bautista
  { match: /Cordero de Dios|quita el pecado del mundo|testimonio del Bautista/i, cueId: 'fx:ram', data: { position: [585, 360] } },
  // Juan con su manto de camello
  { match: /pelo de camello|cintur[oó]n de cuero|manto de camello/i, cueId: 'fx:camel-train', data: { position: [583, 360] } },
  // Multitud que acude — bowing crowd
  { match: /multitud.{0,20}(bautiz|acudi[oa]|llega)|todo Judea|todos los de Jerusal[eé]n/i, cueId: 'fx:bowing-crowd', data: { position: [585, 362] } },
  // Amanecer del ministerio
  { match: /inicio del ministerio|comenz[oó] Jes[uú]s|al comienzo de su vida p[uú]blica/i, cueId: 'fx:dawn-break' },
  // Nube gloriosa
  { match: /nube|nube .{0,12}cubre|nube luminosa/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Juan el Bautista predica
  { match: /Juan.{0,12}(predica|bautiza|reconoce)|Bautista|bautismo de conversi[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Jesús entra al Jordán
  { match: /Jes[uú]s.{0,30}(bautizado|se acerca|se sumerge|cumplir toda justicia)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Juan reconoce a Jesús
  { match: /Juan.{0,20}reconoc[ií]a|necesito ser bautizado.{0,12}por ti|yo he de ser bautizado/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },
  // Paloma desciende — vignette para el momento clave
  { match: /paloma|Esp[ií]ritu desciende|descend[ií]a sobre [eé]l/i, cueId: 'fx:vignette-pulse' },
  // Epifanía — zoom
  { match: /epifan[ií]a|manifestaci[oó]n|trinitar|tres personas/i, cueId: 'fx:zoom-pulse' },

  // ── Pasada 3: entorno y diálogo ───────────────────────────────────────

  // Frutos de penitencia — hacha al pie del árbol
  { match: /hacha.{0,12}ra[ií]z|[áa]rbol que no da buen fruto|arrepentimiento/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },
  // Desierto donde predica Juan
  { match: /desierto de Judea|desierto.{0,20}Juan|en el desierto|voz que clama/i, cueId: 'fx:heat-shimmer' },
  // Sumergido en agua — shimmer
  { match: /sumergido.{0,20}completo|inmersion total|bajo el agua/i, cueId: 'fx:water-wave', data: { position: [585, 363] } },
  // Apertura del cielo — starfield
  { match: /cielos abiertos|vio los cielos|desde las alturas/i, cueId: 'fx:starfield-shimmer' },
  // Halo sobre Juan también
  { match: /Juan.{0,12}profeta|[uú]ltimo profeta|m[áa]s que un profeta|mensajero/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Ríos de agua viva — shimmer final
  { match: /agua viva|r[ií]os de agua|aguas purificadoras/i, cueId: 'fx:water-wave', data: { position: [585, 360] } },
];

export default CUES;
