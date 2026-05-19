import type { Cue } from '../narrationCues';

/**
 * Cues for "Daniel en Babilonia" — EVENTO CUMBRE (≥15 cues).
 * Pins: daniel(0), sadrac-mesac-abednego(1), nabucodonosor(2), dario(3).
 * Scene-objects: foso-leones, horno-ardiente.
 *
 * REGLA #1: 'foso-leones' → animate-scene-object (no fx:lion-roar dentro de escena).
 * REGLA #1: 'horno-ardiente' → animate-scene-object (no fx:fire-flicker duplicado sobre él).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Foso de leones — animar scene-object (REGLA #1: no fx:lion-roar redundante)
  { match: /foso de .{0,8}leones?|foso .{0,8}(cerrad|cub)|[áa]ngel.{0,16}leones|boca .{0,8}leones/i,
    cueId: 'fx:animate-scene-object', data: { id: 'foso-leones', kind: 'pulse', duration: 1.2 } },

  // Horno ardiente — animar scene-object (REGLA #1)
  { match: /horno .{0,8}(ardiente|encendid|fuego)|siete veces m[áa]s .{0,8}encend|cuatro hombres .{0,8}llamas/i,
    cueId: 'fx:animate-scene-object', data: { id: 'horno-ardiente', kind: 'burn', duration: 2.0 } },

  // Leones rugen — antes de que el ángel cierre su boca (efímero, fuera del foso)
  { match: /rugid[oa]|leones .{0,8}rugiendo|sonido .{0,8}leonino|hambre .{0,8}leones/i,
    cueId: 'fx:lion-roar', data: { position: [640, 322] } },

  // Estatua dorada — ídolo que cae
  { match: /estatua dorada|sesenta codos|llanura de Dura|postrarse|adorar.{0,12}estatua/i,
    cueId: 'fx:idol-shatter', data: { position: [636, 320] } },

  // Sueño de Nabucodonosor — el rollo interpretado
  { match: /estatua compuesta|cabeza de oro|piedra .{0,12}no cortada|cuatro imperios|sue[ñn]o de Nabucodonosor/i,
    cueId: 'fx:scroll-unfurl', data: { position: [635, 320] } },

  // Escritura en la pared — mano divina
  { match: /mene.{0,8}mene|tekel|uparsin|peres|escritura en la pared/i,
    cueId: 'fx:divine-hand', data: { position: [635, 308] } },

  // Relámpago de la mano sobrenatural
  { match: /mano sobrenatural|mano que escrib[ií]a|los dedos de una mano/i,
    cueId: 'fx:lightning-strike', data: { from: [635, 305], to: [635, 320] } },

  // Cuarta figura en el horno — ángel protector
  { match: /hijo de los dioses|cuarta figura|[áa]ngel .{0,12}horno|brillante como/i,
    cueId: 'fx:angel-descent', data: { position: [633, 315] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Daniel deportado
  { match: /Daniel|D[āa]niy[āa]l|Beltsasar|deportad[oa]s .{0,8}605|j[oó]venes jud[ií]os/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Tres compañeros
  { match: /Sadrac|Mesac|Abed-nego|tres compa[ñn]eros|Anan[ií]as.{0,12}Misael.{0,12}Azar[ií]as/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Nabucodonosor — el gran rey
  { match: /Nabucodonosor .{0,12}(ordena|iracundo|clama|furioso|se arrodill[oó])|rey .{0,8}Nabucodonosor/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Darío el Medo — un rey diferente
  { match: /Dar[ií]o|el Medo|s[áa]trapas|conspiraci[oó]n .{0,8}Daniel|primer año de Darío/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 3 } },

  // Daniel ora tres veces al día — halo divino
  { match: /ora .{0,12}tres veces|ventana .{0,8}Jerusal[eé]n|ventana abierta|postraba y oraba/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Acusadores devorados
  { match: /conspiradores|s[áa]trapas|los leones los devor|familias .{0,12}devorad/i,
    cueId: 'fx:blood-stain', data: { position: [635, 322] } },

  // ── Pasada 3: cinematográficos ───────────────────────────────────────────

  // Visión apocalíptica — Hijo del Hombre
  { match: /Hijo del Hombre|nubes del cielo|Anciano de d[ií]as|cuatro bestias|apocalipsis/i,
    cueId: 'fx:halo-divine', data: { position: [635, 310] } },

  // Estrellas en la visión nocturna
  { match: /visi[oó]n nocturna|de noche.{0,12}ve[ií]a|sue[ñn]os e interpretaciones/i,
    cueId: 'fx:starfield-shimmer' },

  // Radial al momento del rescate del foso
  { match: /Daniel .{0,16}sali[oó]|il[eé]so|ning[uú]n da[ñn]o .{0,8}hall[áa]|por su Dios confiaba/i,
    cueId: 'fx:radial-bloom', data: { pinIdx: 0 } },
];

export default CUES;
