import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Caín".
 * Pins: adan(0), eva(1), cain(2).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // Eva concibe / da a luz — glow materno
  { match: /concibi[oó]|conoci[oó] Ad[áa]n|dio a luz|vientre de una mujer/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // 'tierra' / 'tierra maldita' — Caín labrador de la tierra maldecida
  { match: /labrador de la tierra|labr[oó] la tierra|cultiv[oó]/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 2 } },

  // Amanecer — primer día del nuevo ser humano nacido de mujer
  { match: /primer ser humano nacido|primer humano nacido|umbral en la historia/i,
    cueId: 'fx:dawn-break' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Caín emerge — primogénito
  { match: /Ca[ií]n|Qayin|primer humano|primog[eé]nito/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // "He adquirido un varón" — orgullo de Eva, pulso dorado sobre Caín
  { match: /adquirido|adquirir|qanah|por voluntad de|he adquirido/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // Adán reacciona con orgullo paterno
  { match: /primer padre|orgullo paterno|familia fuera del Ed[eé]n|comienza el linaje/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Hermana gemela Awan — tradición del Libro de los Jubileos
  { match: /Awan|hermana gemela|Libro de los Jubileos/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 2 } },

  // Halo sobre Eva — primera madre de la humanidad histórica
  { match: /primera madre|primero nacid|asombro de la primera madre/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 1 } },

  // 'nombre' — etimología de Qayin
  { match: /nombre.{0,20}Qayin|Qayin.{0,20}adquirir|forjador/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // 'campo' — el escenario de la vida de Caín (y más tarde del fratricidio)
  { match: /campo|tierra de labor|campos fuera del Ed[eé]n/i,
    cueId: 'fx:dust-burst', data: { position: [620, 325] } },

  // 'linaje' / 'simiente' — Caín inaugura el linaje histórico de la humanidad
  { match: /simiente|linaje|primer eslab[oó]n|humanidad hist[oó]rica/i,
    cueId: 'fx:radial-bloom', data: { position: [620, 318] } },

  // 'Jehová' / voz divina — Eva invoca el nombre del Señor al dar a luz
  { match: /ayuda de (Jehov[áa]|Yahveh|el Se[ñn]or)|por voluntad de/i,
    cueId: 'fx:divine-light-beam', data: { position: [618, 308] } },

  // 'noche' — el tiempo sombrío que llegará con sus decisiones
  { match: /\bnoche\b|oscuridad (moral|futura)/i,
    cueId: 'fx:night-fall' },

  // 'vientre' — alumbrado del vientre, primer nacimiento humano natural
  { match: /vientre de una mujer|alumbr[oó]|naci[oó] de mujer/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // Eva declara: "He adquirido varón con la ayuda de Yahveh"
  { match: /He adquirido (var[oó]n|hombre) (con|por) (la ayuda de|voluntad de)/i,
    cueId: 'fx:dialog', data: { eventId: 'nacimiento-cain' } },
];

export default CUES;
