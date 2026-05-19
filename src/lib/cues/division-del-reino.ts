import type { Cue } from '../narrationCues';

/**
 * Cues for "La división del reino" — EVENTO CUMBRE (≥15 cues).
 * Pins: roboam(0), jeroboam(1).
 * Scene-objects: manto-rasgado, becerro-oro-dan.
 *
 * REGLA #1: 'manto-rasgado' → animate-scene-object.
 * REGLA #1: 'becerro-oro-dan' → animate-scene-object (no fx:golden-calf duplicado).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Manto rasgado — animar scene-object del profeta Ahías (REGLA #1)
  { match: /capa nueva|rasga en doce|doce pedazos|diez tribus|Ah[ií]as|manto .{0,8}rasga/i,
    cueId: 'fx:animate-scene-object', data: { id: 'manto-rasgado', kind: 'shake', duration: 1.0 } },

  // Becerros de oro — animar scene-object en Dan (REGLA #1: no fx:golden-calf)
  { match: /becerros de oro|Betel.{0,12}Dan|he aqu[ií] tus dioses|culto .{0,8}(irregular|Jeroboam)/i,
    cueId: 'fx:animate-scene-object', data: { id: 'becerro-oro-dan', kind: 'glow', duration: 1.5 } },

  // Corona real de Salomón — traspaso del trono
  { match: /corona|sube al trono|aclamado|ungido rey|toma .{0,8}(trono|corona)/i,
    cueId: 'fx:crown-descent', data: { pinIdx: 0 } },

  // Trono de Roboam — pulso del poder
  { match: /trono .{0,12}(Roboam|Salom[oó]n)|sala del trono|palacio real/i,
    cueId: 'fx:throne', data: { pinIdx: 0 } },

  // Ejército de Sisac — caballería y carros egipcios
  { match: /Sisac|Sheshonq|Karnak|carros .{0,12}fara[oó]n|campa[ñn]a .{0,12}egipcia/i,
    cueId: 'fx:horse-gallop', data: { position: [570, 363] } },

  // Polvo de la campaña egipcia
  { match: /Sisac|Sheshonq|Karnak|escudos de oro|escudos de bronce/i,
    cueId: 'fx:dust-burst', data: { position: [582, 363] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Roboam — heredero de Salomón
  { match: /Roboam|hijo de Salom[oó]n|Naama amonita|41 a[ñn]os|sube al trono/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Jeroboam — el líder del norte
  { match: /Jeroboam|hijo de Nabat|Efrateo|vuelve .{0,8}Egipto|Ahias? de Silo/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Asamblea de Siquem — la negociación
  { match: /asamblea de Siquem|aliviar las cargas|consejo de los ancianos|consejo .{0,12}j[oó]venes/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6c66a' } },

  // Respuesta dura — tormenta sobre el reino
  { match: /escorpiones|yugo pesado|mi dedo me[ñn]ique|castigar[eé] con|mi padre os carg[oó]/i,
    cueId: 'fx:lightning-strike', data: { from: [582, 355], to: [582, 363] } },

  // La ruptura — terremoto social
  { match: /Israel.{0,8}a tus tiendas|qu[eé] parte tenemos|no tenemos heredad|hijo de Isa[ií]/i,
    cueId: 'fx:earthquake-shake', data: { intensity: 0.6 } },

  // Guerras continuas — norte vs sur
  { match: /guerra .{0,12}(Roboam|Jeroboam)|hubo guerra .{0,8}siempre|conflicto entre los reinos/i,
    cueId: 'fx:sword-strike', data: { from: [580, 358], to: [584, 363] } },

  // Profecía de Ahías — rollo profético
  { match: /Ah[ií]as .{0,12}profeta|profeta de Silo|rasga .{0,8}manto|diez tribus .{0,8}te doy/i,
    cueId: 'fx:scroll-unfurl', data: { position: [582, 358] } },

  // ── Pasada 3: cinematográficos ───────────────────────────────────────────

  // Tronos separados — dos coronas
  { match: /Jud[áa] e Israel|reino del norte|reino del sur|dividido en dos/i,
    cueId: 'fx:silhouette-horizon' },

  // Rutas de migración tribal
  { match: /sacerdotes y levitas .{0,12}Roboam|migraci[oó]n .{0,8}sur|jeroboam expulsa sacerdotes/i,
    cueId: 'fx:journey-trace', data: { from: [584, 358], to: [582, 363], color: '#c4a4a4' } },

  // Vignette del momento de la ruptura
  { match: /the kingdom was torn|reino fue desgajado|se torn[oó] en .{0,8}dos|reino dividido/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
