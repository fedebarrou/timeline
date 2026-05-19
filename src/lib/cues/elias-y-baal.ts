import type { Cue } from '../narrationCues';

/**
 * Cues for "Elías contra los profetas de Baal" — EVENTO CUMBRE (≥15 cues).
 * Pins: elias(0), ajab(1), jezabel(2).
 * Scene-objects: altar-yahve, altar-baal-carmelo.
 *
 * REGLA #1: 'altar-yahve' → animate-scene-object (no fx:fire-flicker duplicado sobre él).
 * REGLA #1: 'altar-baal-carmelo' → animate-scene-object.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Sequía anunciada — polvo y calor
  { match: /sequ[ií]a|no habr[áa] lluvia|tres a[ñn]os|cuervos lo alimenta|arroyo Querit/i,
    cueId: 'fx:dust-burst', data: { position: [578, 350] } },

  // Calor del desierto — shimmer durante la sequía
  { match: /sequ[ií]a|calor abrasador|tierra seca|sin rocío|sin lluvia .{0,12}a[ñn]os/i,
    cueId: 'fx:heat-shimmer' },

  // Cuervos alimentan a Elías — vuelo de cuervo
  { match: /cuervos? .{0,12}(alimentan|traen|le tra[ií]an|le trajo|pan y carne)/i,
    cueId: 'fx:raven-flight', data: { from: [570, 340], to: [578, 350] } },

  // Altar de Baal — animar escena-objeto frío (sin fuego)
  { match: /altar de Baal|profetas de Baal invoca|imploran a Baal|Baal no respond/i,
    cueId: 'fx:animate-scene-object', data: { id: 'altar-baal-carmelo', kind: 'shake', duration: 0.8 } },

  // Empapamiento con agua — doce cántaros
  { match: /doce c[áa]ntaros|cuatro c[áa]ntaros|empap[oó]|agua corre por .{0,8}zanja/i,
    cueId: 'fx:water-wave', data: { position: [578, 350] } },

  // Fuego del cielo cae — altar de Yahveh en llamas (REGLA #1)
  { match: /fuego .{0,8}(cay[oó]|del cielo|de Yahveh|consumi[oó])|holocausto.{0,16}le[ñn]a.{0,16}piedras|lami[oó] el agua/i,
    cueId: 'fx:animate-scene-object', data: { id: 'altar-yahve', kind: 'burn', duration: 3.0 } },

  // Fuego del cielo — primitiva propia (el destello desde arriba)
  { match: /fuego .{0,8}del cielo|bajó fuego|fuego de Yahveh.{0,12}cay/i,
    cueId: 'fx:fire-from-heaven', data: { position: [578, 345] } },

  // Sangre de los profetas de Baal
  { match: /450 profetas|profetas de Baal|danza|hieren con cuchillos|chorrear la sangre|quiz[áa] est[áa] dormido/i,
    cueId: 'fx:idol-shatter', data: { position: [582, 352] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Elías emerge — el profeta tisbita
  { match: /El[ií]as .{0,20}(tisbita|profeta|reta)|Ily[āa]s|hasta cu[áa]ndo claudicar/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Ajab aparece — el rey impío
  { match: /Ajab|rey .{0,8}Israel .{0,16}(impío|mal[ií]simo)|Acab .{0,8}llam[oó]/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Jezabel — amenaza de muerte sobre Elías
  { match: /Jezabel|amenaza .{0,12}de muerte|que te haga como .{0,8}profetas|mañana a estas horas/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Elías huye al Sinaí — tormento del profeta
  { match: /El[ií]as .{0,16}(huye|desierto|Sinaí|Berseba|angel.{0,8}despert|suficiente)|basta ya/i,
    cueId: 'fx:journey-trace', data: { from: [578, 350], to: [565, 380], color: '#8a6a3a' } },

  // Pueblo se postra — Yahveh es Dios
  { match: /pueblo se postr|Yahveh es el Dios|adonai hu ha-elohim/i,
    cueId: 'fx:halo-divine', data: { position: [578, 350] } },

  // Torrente Cisón — degollamiento
  { match: /torrente Cis[oó]n|Cis[oó]n|los mat[oó] [eé]l mismo|degolla|matanza/i,
    cueId: 'fx:blood-stain', data: { position: [580, 352] } },

  // ── Pasada 3: atmosféricos y cinematográficos ────────────────────────────

  // Nubes de tormenta — la lluvia llega al fin
  { match: /pequeña nube|nube como .{0,8}mano|el cielo se oscurec|nubes y viento/i,
    cueId: 'fx:storm-clouds' },

  // Gran lluvia final
  { match: /cay[oó] gran lluvia|llov[ií]a|lluvia abundante|agua a cántaros/i,
    cueId: 'fx:rain', data: { position: [578, 348] } },

  // Monte Carmelo — resplandor del monte
  { match: /monte Carmelo|Carmelo|cumbre del Carmelo|el monte/i,
    cueId: 'fx:mountain-glow', data: { position: [578, 345] } },

  // Flash del fuego divino — momento cumbre
  { match: /lami[oó] el agua|consumi[oó] el holocausto|el fuego de Yahveh cay/i,
    cueId: 'fx:flash-white' },

  // Vignette del duelo entre altares
  { match: /a cu[áa]nto tiempo|dos opiniones|a Yahveh o a Baal|si Yahveh es Dios/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
