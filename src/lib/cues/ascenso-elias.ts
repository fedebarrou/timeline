import type { Cue } from '../narrationCues';

/**
 * Cues for "El ascenso de Elías" — EVENTO CUMBRE (≥15 cues).
 * Pins: elias(0), eliseo(1).
 * Scene-objects: manto-elias, carro-fuego.
 *
 * REGLA #1: 'manto-elias' → animate-scene-object (no fx:glow-pulse duplicado).
 * REGLA #1: 'carro-fuego' → animate-scene-object.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // El manto de Elías — lo golpea en el Jordán (REGLA #1: anima scene-object)
  { match: /manto .{0,16}(golpe|divid|cruz|Jord[áa]n|recoge|cae|cay[oó])/i,
    cueId: 'fx:animate-scene-object', data: { id: 'manto-elias', kind: 'sway', duration: 1.2 } },

  // Carro de fuego asciende (REGLA #1: anima scene-object)
  { match: /carro de fuego|caballos de fuego|torbellino|sa[ʿʼ´']ar[áa]/i,
    cueId: 'fx:animate-scene-object', data: { id: 'carro-fuego', kind: 'rise', duration: 2.0 } },

  // Cruzan el Jordán a pie seco — el agua cede
  { match: /Jord[áa]n|aguas se divid|cruzan a pie seco|golpea .{0,8}agua/i,
    cueId: 'fx:water-wave', data: { position: [585, 360] } },

  // Caballos de fuego — galope celestial
  { match: /caballos de fuego|jinetes de fuego|corceles ardientes/i,
    cueId: 'fx:horse-gallop', data: { position: [585, 345] } },

  // Viento tempestuoso — torbellino
  { match: /torbellino|viento tempestuoso|remolino|viento recio|sa[ʿʼ´']ar/i,
    cueId: 'fx:wind-streaks' },

  // Nubes que acompañan el ascenso
  { match: /torbellino.{0,16}cielo|fue arrebatado.{0,12}torbellino|nubes del ascenso/i,
    cueId: 'fx:storm-clouds' },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Elías y Eliseo marchan juntos
  { match: /El[ií]as .{0,12}Eliseo|juntos .{0,12}Betel|Jeric[oó]|van juntos/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Doble porción del espíritu — petición testamentaria
  { match: /doble porci[oó]n|pide lo que quieras|si me vieres/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#cfa14c' } },

  // Cielo abierto — cortejo angélico
  { match: /subi[oó] al cielo|arrebatad|cielo abierto|asunci[oó]n/i,
    cueId: 'fx:angel-descent', data: { position: [585, 340] } },

  // Elías sube y desaparece
  { match: /El[ií]as .{0,16}(subi[oó]|arrebatad|quitad|desapare)|no muere f[ií]sicamente/i,
    cueId: 'fx:character-recede', data: { pinIdx: 0 } },

  // Eliseo hereda el manto — emerge en el rol profético
  { match: /esp[ií]ritu de El[ií]as repos[oó]|Eliseo .{0,12}(recoge|levant|recibe|hereda)/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Eliseo divide las aguas — confirmación del ministerio
  { match: /Eliseo .{0,20}(divid|golpe|cruz|aguas)|d[oó]nde est[áa] Yahveh/i,
    cueId: 'fx:water-wave', data: { position: [585, 362] } },

  // Profetas hijos — buscan a Elías
  { match: /hijos de los profetas|buscan .{0,12}El[ií]as|tres d[ií]as .{0,8}buscar/i,
    cueId: 'fx:journey-trace', data: { from: [582, 360], to: [585, 360], color: '#a4a4a4' } },

  // Retorno escatológico — antes del Mesías
  { match: /copa de El[ií]as|Malaqu[ií]as|antes del Mes[ií]as|dos testigos|Juan el Bautista/i,
    cueId: 'fx:silhouette-horizon' },

  // ── Pasada 3: cinematográficos ───────────────────────────────────────────

  // Transfiguración — Elías vuelve en gloria
  { match: /Transfiguraci[oó]n|Moisés y El[ií]as|monta[ñn]a santa|resplandeci[oó]/i,
    cueId: 'fx:halo-divine', data: { position: [585, 345] } },

  // Flash del momento del rapto
  { match: /fue arrebatado|subi[oó] en torbellino|quitad El[ií]as/i,
    cueId: 'fx:flash-white' },

  // Radial al momento del doble espíritu
  { match: /doble porci[oó]n.{0,24}(concedida|sea as[ií]|te lo doy)|si me ves cuando/i,
    cueId: 'fx:radial-bloom', data: { pinIdx: 1 } },
];

export default CUES;
