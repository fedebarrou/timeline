import type { Cue } from '../narrationCues';

/**
 * Cues for "Los profetas mayores".
 * Pins: isaias(0), jeremias(1), ezequiel(2).
 */
const CUES: Cue[] = [
  // Isaías — visión inaugural del trono
  { match: /Isa[ií]as|Sha[ʿʼ´']y[āa]|visi[oó]n inaugural|trono alto|serafines|trisagio|santo.{0,8}santo.{0,8}santo/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Carbón encendido — comisión profética
  { match: /carb[oó]n encendido|labios|comisi[oó]n prof[eé]tica|aqu[ií] estoy|h[eé]me aqu[ií]/i, cueId: 'fx:fire-flicker', data: { position: [582, 363] } },
  // Siervo Sufriente — Isaías 53
  { match: /Siervo Sufriente|Isa[ií]as 53|cantos del Siervo|despreciado y desechado|cargad[oa] .{0,8}dolores/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Jeremías — el profeta llorón
  { match: /Jerem[ií]as|Anatot|profeta llor[oó]n|cisterna|llevado a Egipto|nueva alianza/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Rollo / Lamentaciones / scroll desplegado
  { match: /Lamentaciones|rollo|escrita en los corazones|Jer 31|nueva alianza|cinco poemas/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
  // Ezequiel — visión de la merkavá
  { match: /Ezequiel|merkav[áa]|r[ií]o Quebar|cuatro seres vivientes|cuatro caras|ruedas dentro de ruedas|trono de zafiro/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Valle de los huesos secos — resurrección
  { match: /valle de los huesos secos|huesos secos|resurrecci[oó]n nacional|el esp[ií]ritu.{0,8}entr[oó]/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#cfe6c8' } },
  // Tronos del cielo / kavod — destello divino
  { match: /kavod|gloria divina|trono de Yahveh|destello.{0,12}cielo|cielos abiertos/i, cueId: 'fx:halo-divine', data: { position: [582, 358] } },
];

export default CUES;
