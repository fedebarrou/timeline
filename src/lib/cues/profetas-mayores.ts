import type { Cue } from '../narrationCues';

/**
 * Cues for "Los profetas mayores" — EVENTO CUMBRE (≥15 cues).
 * Pins: isaias(0), jeremias(1), ezequiel(2).
 * Scene-objects: rollo-profetico.
 *
 * REGLA #1: 'rollo-profetico' → animate-scene-object (no fx:scroll-unfurl duplicado sobre él).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Rollo profético — animar scene-object (REGLA #1: no fx:scroll-unfurl redundante)
  { match: /Lamentaciones|rollo|escrita en los corazones|Jer 31|cinco poemas|libro de las profec[ií]as/i,
    cueId: 'fx:animate-scene-object', data: { id: 'rollo-profetico', kind: 'rise', duration: 1.8 } },

  // Serafines — formación angélica
  { match: /serafines?|seis alas|santificar|cubrían .{0,8}rostro|con dos volaban/i,
    cueId: 'fx:angel-formation', data: { position: [582, 356] } },

  // Carbón encendido — fuego de la comisión
  { match: /carb[oó]n encendido|labios|comisi[oó]n prof[eé]tica|aqu[ií] estoy|h[eé]me aqu[ií]/i,
    cueId: 'fx:fire-flicker', data: { position: [582, 363] } },

  // Humo en el templo — kavod
  { match: /humo llen[oó]|columna de humo|se llen[oó] el templo de humo/i,
    cueId: 'fx:smoke-column', data: { position: [582, 358] } },

  // Trisagio — destello de la gloria
  { match: /santo.{0,8}santo.{0,8}santo|gloria .{0,8}llena .{0,8}tierra|Yahveh de los ej[eé]rcitos/i,
    cueId: 'fx:divine-light-beam', data: { position: [582, 356] } },

  // Incienso — liturgia del templo visionario
  { match: /incienso|ofrendas|aroma .{0,8}(ofrenda|sacrificio)|en el templo visionario/i,
    cueId: 'fx:incense-spiral', data: { position: [582, 360] } },

  // Valle de los huesos secos — respiración del Espíritu
  { match: /valle de los huesos secos|huesos secos|resurrecci[oó]n nacional|el esp[ií]ritu.{0,8}entr[oó]/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#cfe6c8' } },

  // Viento del Espíritu sobre los huesos
  { match: /sopla .{0,12}huesos|viento desde los cuatro puntos|cuatro vientos|ruf del esp[ií]ritu/i,
    cueId: 'fx:wind-streaks' },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Isaías — visión del trono
  { match: /Isa[ií]as|Sha[ʿʼ´']y[āa]|visi[oó]n inaugural|trono alto|trisagio/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Jeremías — el profeta llorón
  { match: /Jerem[ií]as|Anatot|profeta llor[oó]n|cisterna|llevado a Egipto|nueva alianza/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Ezequiel — visión de la merkavá
  { match: /Ezequiel|merkav[áa]|r[ií]o Quebar|cuatro seres vivientes|cuatro caras|ruedas dentro de ruedas/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Siervo Sufriente — profecía mesiánica
  { match: /Siervo Sufriente|Isa[ií]as 53|cantos del Siervo|despreciado y desechado|cargad[oa] .{0,8}dolores/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Profecía del Mesías — la estrella en Isaías
  { match: /brote de Jes[eé]|ra[ií]z de Jes[eé]|Emmanuel|v[ií]rgen .{0,8}concebirá|luz .{0,12}tinieblas/i,
    cueId: 'fx:starfield-shimmer' },

  // Ezequiel — kavod abandona el Templo
  { match: /kavod|gloria divina|trono de Yahveh|destello.{0,12}cielo|cielos abiertos/i,
    cueId: 'fx:halo-divine', data: { position: [582, 358] } },

  // ── Pasada 3: cinematográficos ───────────────────────────────────────────

  // Visión del trono de Ezequiel — radial bloom épico
  { match: /trono de zafiro|trono de Yahveh .{0,12}(visi[oó]n|vio|aparec)|aspecto de cristal|firmamento brillante/i,
    cueId: 'fx:radial-bloom', data: { position: [582, 355] } },

  // Zoom en el momento de la comisión
  { match: /¿a qui[eé]n enviar[eé]|y qui[eé]n ir[áa]|h[eé]me aqu[ií]|aqu[ií] estoy .{0,8}env[ií]ame/i,
    cueId: 'fx:zoom-pulse' },
];

export default CUES;
