import type { Cue } from '../narrationCues';

/**
 * Cues for "Orden de construir el arca".
 * Pins: noe(0), nephilim(1), vigilantes(2).
 *
 * scene-objects: 'arca-en-construccion' (id) ya declarado.
 * REGLA #1: toda mención al arca → fx:animate-scene-object con id='arca-en-construccion'.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // Arca en construcción — scene-object 'arca-en-construccion' ya existe; REGLA #1
  { match: /\barca\b|construir el arca|hazte un arca|Hazte un arca|madera de gofer/i,
    cueId: 'fx:animate-scene-object', data: { id: 'arca-en-construccion', kind: 'glow' } },

  // 'brea' / 'calafate' — impermeabilización (polvo de construcción)
  { match: /brea|calafate|revestimiento|impermeabiliz/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // 'madera' — chips de madera al trabajar
  { match: /madera de gofer|madera resinosa|tablones|planchas/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // 'gigantes' / Nephilim — corrupción que motiva el Diluvio
  { match: /Nephilim|gigantes|corrupci[oó]n radical|maldad de los hombres|todo designio.{0,20}mal/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // 'Vigilantes' — las enseñanzas prohibidas
  { match: /Vigilantes|artes prohibidas|ense[ñn]anzas prohibidas|descarrilado/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // '120 años' — plazo de gracia / lluvia simbólica que se anuncia
  { match: /120 a[ñn]os|ciento veinte a[ñn]os|plazo de gracia/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'noche' / oscuridad moral — la tierra en tinieblas morales
  { match: /tinieblas morales|oscuridad de la humanidad|perversidad/i,
    cueId: 'fx:vignette-pulse' },

  // 'tormenta' inminente — nubes amenazantes antes del diluvio
  { match: /inminente|juicio inminente|destrucci[oó]n.{0,15}inminente/i,
    cueId: 'fx:storm-clouds' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Revelación divina a Noé — pulso de gloria
  { match: /Dios .{0,16}(advierte|revela|le ordena|ordena a No[eé])|orden de construir|advertido por Dios/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Voz divina que da las instrucciones
  { match: /dijo Dios|Dios dijo a No[eé]|voz de Dios|mandato divino/i,
    cueId: 'fx:divine-light-beam', data: { position: [618, 310] } },

  // Construcción del arca — sonido de martillazos (polvo)
  { match: /construy[oó]|preparó el arca|trabaj[oó].{0,10}arca/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // Corrupción / maldad humana — destello oscuro sobre Nephilim
  { match: /vio Dios.{0,20}maldad|maldad.{0,15}mucha/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Noé era justo — halo de distinción
  { match: /var[oó]n justo|perfecto en sus generaciones|con Dios camin[oó] No[eé]/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Burla del pueblo — pulso melancólico (el Corán — Sura Hud 11:38)
  { match: /se burlaban|pueblo burl[oó]n|no creer[áa]|pasaba.{0,20}se burl/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Noé como predicador de justicia — halo de misión
  { match: /predicador de justicia|predicaba mientras|por la fe No[eé]/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Martillazo triple — Noé persevera
  { match: /persevera|sin descanso|cien a[ñn]os trabajando|sigue construyendo/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // Dios habla a Noé: "Hazte un arca de madera de gofer"
  { match: /hazte un arca|construye la nave bajo nuestros ojos/i,
    cueId: 'fx:dialog', data: { eventId: 'orden-construir-arca' } },

  // Noé al pueblo: "Soy para vosotros un advertidor explícito"
  { match: /advertidor expl[íi]cito|soy para vosotros un advertidor/i,
    cueId: 'fx:dialog', data: { eventId: 'orden-construir-arca' } },
];

export default CUES;
