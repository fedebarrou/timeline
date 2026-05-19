import type { Cue } from '../narrationCues';

/**
 * Cues for "El exilio babilónico" — EVENTO CUMBRE (≥15 cues).
 * Pins: jeremias(0), nabucodonosor(1).
 * Scene-objects: templo-ruinas, arpa-colgada.
 *
 * REGLA #1: 'templo-ruinas' → animate-scene-object.
 * REGLA #1: 'arpa-colgada' → animate-scene-object.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Templo en ruinas — animar scene-object (REGLA #1)
  { match: /templo .{0,16}(destruid|incendiad|ruinas|demoli)|destrucci[oó]n del Templo|9 de Av/i,
    cueId: 'fx:animate-scene-object', data: { id: 'templo-ruinas', kind: 'shake', duration: 1.4 } },

  // Arpas colgadas en los sauces — animar scene-object (REGLA #1)
  { match: /colgamos .{0,12}arpas|arpas .{0,12}sauces|sauces.{0,16}colg|junto a los r[ií]os .{0,8}Babilonia/i,
    cueId: 'fx:animate-scene-object', data: { id: 'arpa-colgada', kind: 'sway', duration: 2.0 } },

  // Columna de humo sobre las ruinas
  { match: /incendio|en llamas|Nabuzarad[áa]n|quem[óo].{0,8}casas|muros.{0,8}demolid/i,
    cueId: 'fx:smoke-column', data: { position: [582, 355] } },

  // Fuego devorador — Templo arde
  { match: /Templo es incendiado|incendiad|quemad|columnas Yaqu[ií]n y Boaz/i,
    cueId: 'fx:fire-flicker', data: { position: [582, 363] } },

  // Sangre — Sedequías cegado
  { match: /Sedequ[ií]as.{0,20}(cegad|ojos|hijos)|matan a sus hijos|sacan los ojos|sangre/i,
    cueId: 'fx:blood-stain', data: { position: [582, 363] } },

  // Humo de la ciudad quemada
  { match: /destrucci[oó]n del Templo|columnas Yaqu[ií]n|humo .{0,12}ciudad|ciudad en ruinas/i,
    cueId: 'fx:smoke-rise', data: { position: [582, 363] } },

  // Lluvia de lamentos — Salmo 137
  { match: /Lamentaciones|llor[áa]bamos|d[ií]a de luto|llanto de Sion/i,
    cueId: 'fx:rain', data: { position: [582, 363] } },

  // Deportación — larga marcha al exilio
  { match: /deportaci[oó]n|deportad[oa]s|llevados? a Babilonia|cautiverio|setenta a[ñn]os/i,
    cueId: 'fx:journey-trace', data: { from: [582, 363], to: [635, 320], color: '#7a4444' } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Nabucodonosor — el rey conquistador
  { match: /Nabucodonosor|Bukhtna[ṣs]{1,2}ar|tres campa[ñn]as|605.{0,12}597.{0,12}587|sitio dura/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Jeremías profetiza la caída — el profeta llorón
  { match: /Jerem[ií]as.{0,16}(profetiza|aconseja|cisterna|encarcel)|nueva alianza/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Estandartes y tropas babilónicas — caballería
  { match: /ej[eé]rcito babilonio|tropas de Nabucodonosor|si[ét]io .{0,12}Jerusal[eé]n|babilonios.{0,8}rodean/i,
    cueId: 'fx:horse-gallop', data: { position: [600, 350] } },

  // Murallas demolidas — derrumbe
  { match: /murallas? .{0,12}(demoli|derrumb|destruid)|muro de Jerusal[eé]n .{0,8}cay/i,
    cueId: 'fx:walls-fall', data: { position: [582, 363] } },

  // Ezequiel — kavod abandona el Templo
  { match: /kavod abandon|gloria.{0,12}abandon|Ezequiel.{0,16}visi[oó]n|merkav[áa]|salir del Templo/i,
    cueId: 'fx:halo-divine', data: { position: [582, 360] } },

  // Profecía de restauración — nueva alianza
  { match: /nueva alianza|Jer 31|escrita en los corazones|los perdonar[eé]|ser[eé] su Dios/i,
    cueId: 'fx:scroll-unfurl', data: { position: [582, 358] } },

  // ── Pasada 3: cinematográficos ───────────────────────────────────────────

  // El templo en llamas — fade dramático
  { match: /Templo .{0,8}ard[ií]a|incendio del Templo|glorias de Sion .{0,8}cenizas/i,
    cueId: 'fx:fade-to-black' },

  // Nubes de tormenta sobre Jerusalén
  { match: /sitio.{0,12}apret[oó]|hambre en la ciudad|oscur[ií]a el cielo|noche del asalto/i,
    cueId: 'fx:storm-clouds' },

  // Silhouette al final — pueblo en marcha hacia el exilio
  { match: /exilio|en marcha a Babilonia|desfilan cautivos|sin tierra|pueblo sin rey/i,
    cueId: 'fx:silhouette-horizon' },
];

export default CUES;
