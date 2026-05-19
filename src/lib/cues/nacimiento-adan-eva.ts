import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Adán y Eva".
 * Pins: adan(0), eva(1), lilith(2).
 *
 * scene-object 'aliento-de-vida' (id) ya está declarado.
 * REGLA #1: no disparar primitiva paralela para ese scene-object.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'polvo' / 'tierra' / 'arcilla' — Adán moldeado del polvo (Gn 2:7)
  { match: /\bpolvo de la tierra\b|polvo|barro|arcilla/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // 'aliento' / 'sopló' — aliento de vida; scene-object 'aliento-de-vida' ya cubre el sol,
  // animamos el SVG existente con glow (REGLA #1)
  { match: /aliento de vida|sopl[oó] en su nariz|insufl[oó]|alma viviente|ser viviente/i,
    cueId: 'fx:animate-scene-object', data: { id: 'aliento-de-vida', kind: 'pulse' } },

  // 'costilla' / 'sueño profundo' — Eva extraída del costado de Adán
  { match: /costilla|costado|sue[ñn]o profundo|tardem[áa]/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'jardín' / 'Edén' — lugar primordial
  { match: /\bEd[eé]n\b|jard[ií]n del Ed[eé]n/i,
    cueId: 'fx:mountain-glow', data: { position: [620, 320] } },

  // 'serpiente' mencionada como antecedente del relato
  { match: /\bserpiente\b/i,
    cueId: 'fx:serpent', data: { position: [625, 325] } },

  // 'ángeles' / Iblis — anuncio divino a los ángeles (tradición coránica)
  { match: /\b[áa]ngeles\b|se prosternen|prosternaci[oó]n/i,
    cueId: 'fx:angel-formation', data: { position: [620, 310] } },

  // ── Pasada 2: narrativa (personajes, momentos cumbre) ─────────────────

  // Adán formado — emerge el primer hombre
  { match: /primer hombre|form[oó].{0,12}Ad[áa]n|ser viviente/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Eva emerge — primera mujer
  { match: /primera mujer|form[oó].{0,10}Eva|dio el nombre de Eva|madre de los vivientes/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Halo divino sobre Adán al recibir el aliento
  { match: /imagen de Dios|semejanza|insufl[oó] de Mi esp[íi]ritu/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Lilith — primera esposa rabínica (tradición del Alfabeto de Ben Sirá)
  { match: /Lilit|primera esposa|Alfabeto de Ben Sir[áa]|Zohar/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Iblis rechaza — destello oscuro / recede con orgullo
  { match: /Iblis|rechazo de Iblis|se rehus[óa]|no me prostern/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // Luz del amanecer — primera aurora de la creación
  { match: /primer d[ií]a|En el principio|al principio de los tiempos/i,
    cueId: 'fx:dawn-break' },

  // Voz del cielo / anuncio a los ángeles
  { match: /voy a poner un sucesor|voz de Dios|dijo Dios/i,
    cueId: 'fx:divine-light-beam', data: { position: [620, 305] } },

  // Gloria / Shekhiná — punto de creación culmina
  { match: /\bgloria\b|Shekin[áa]|imagen conforme a/i,
    cueId: 'fx:radial-bloom', data: { position: [620, 320] } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // Diálogo: Adán nombra a Eva — "hueso de mis huesos"
  { match: /hueso de mis huesos|carne de mi carne/i,
    cueId: 'fx:dialog', data: { eventId: 'nacimiento-adan-eva' } },

  // Diálogo: Dios anuncia a los ángeles
  { match: /poner.{0,15}sucesor en la tierra|vas a poner en ella/i,
    cueId: 'fx:dialog', data: { eventId: 'nacimiento-adan-eva' } },
];

export default CUES;
