import type { Cue } from '../narrationCues';

/**
 * Cues for "Caín mata a Abel".
 * Pins: cain(0), abel(1).
 *
 * scene-object 'altar-primera-ofrenda' (id) declarado en este evento.
 * REGLA #1: animar el SVG en vez de disparar fx:fire-flicker paralelo.
 * Evento cumbre → densidad 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'altar' — scene-object 'altar-primera-ofrenda'; REGLA #1: animar el SVG
  { match: /altar|construy[oó].{0,10}altar|sobre el altar/i,
    cueId: 'fx:animate-scene-object', data: { id: 'altar-primera-ofrenda', kind: 'burn' } },

  // 'fuego' / 'llamas' del sacrificio — el altar arde (animamos scene-object existente; efímero también)
  { match: /fuego.{0,15}sacrificio|llamas.{0,10}altar/i,
    cueId: 'fx:animate-scene-object', data: { id: 'altar-primera-ofrenda', kind: 'burn' } },

  // 'humo' — columna de humo del sacrificio de Abel (efímero → primitiva)
  { match: /\bhumo\b|columna de humo|subi[oó].{0,10}humo/i,
    cueId: 'fx:smoke-rise', data: { position: [638, 295] } },

  // 'cordero' / 'oveja' — primogénitos del rebaño de Abel
  { match: /primog[eé]nitos del reba[ñn]o|cordero|oveja/i,
    cueId: 'fx:ram', data: { position: [625, 325] } },

  // 'sangre' — la sangre de Abel clama
  { match: /sangre de Abel|sangre clama|blood|su sangre/i,
    cueId: 'fx:blood-stain', data: { position: [620, 325] } },

  // 'espada' — el arma del fratricidio (no hay cita exacta, pero símbolo del golpe)
  { match: /golpe|matar[áa]|lo mat[oó]|primer homicidio|primer fratricidio/i,
    cueId: 'fx:sword-strike', data: { from: [608, 315], to: [622, 322] } },

  // 'tierra' maldita — la tierra absorbió la sangre
  { match: /tierra bebe|tierra.{0,15}sangre|tierra absorbi[oó]/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 1 } },

  // 'cuervo' — el Corán envía el cuervo para enseñar a enterrar (nounDictionary)
  { match: /cuervo|escrab[oó] la tierra|enterrar|rito funerario|ent[ie]rra/i,
    cueId: 'fx:raven-flight', data: { from: [640, 290], to: [620, 328] } },

  // 'campo' / 'tierra de Nod' — exilio de Caín al este
  { match: /tierra de Nod|al oriente|tierra de Nod|exilio|errante/i,
    cueId: 'fx:journey-trace', data: { from: [620, 320], to: [600, 270], style: 'dashed' } },

  // 'noche' — atmósfera de envidia sombría
  { match: /\bnoche\b/i,
    cueId: 'fx:night-fall' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Ofrenda de Abel aceptada — destello dorado
  { match: /ofrenda de Abel|fue aceptada|ofrenda aceptada|sacrificio m[áa]s excelente/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Ofrenda de Caín rechazada — pulso oscuro
  { match: /ofrenda de Ca[ií]n|frutos del suelo|fue rechazada|no mir[oó] con agrado/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Envidia / ira — pulso rojizo sobre Caín
  { match: /envidia|celos|se ensa[ñn][oó]|ira|enfurecid|decay[oó] su semblante/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Dios advierte a Caín — voz divina antes del crimen
  { match: /pecado est[áa] a la puerta|¿Por qu[eé] te has ensa[ñn]ado|Dios le dijo a Ca[ií]n/i,
    cueId: 'fx:divine-light-beam', data: { position: [612, 313] } },

  // Caín se acerca — acecho siniestro
  { match: /acech|atrae al campo|sali[oó] al campo|atac[oó] a su hermano/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // EL GOLPE — relámpago entre los hermanos (evento pico)
  { match: /lo mat[oó]|asesinato|primer fratricidio|primer homicidio/i,
    cueId: 'fx:lightning-strike', data: { from: [600, 305], to: [620, 320] } },

  // Vignette — foco en el crimen (evento cumbre)
  { match: /lo mat[oó]|primer asesinato|primer homicidio/i,
    cueId: 'fx:vignette-pulse' },

  // Abel cae — recede
  { match: /Abel.{0,30}(muere|cae|clama)|cuerpo de Abel|el hermano muerto/i,
    cueId: 'fx:character-recede', data: { pinIdx: 1 } },

  // Caín interrogado — "¿Dónde está tu hermano?"
  { match: /¿D[oó]nde est[áa] Abel|¿D[oó]nde est[áa] tu hermano/i,
    cueId: 'fx:divine-light-beam', data: { position: [612, 310] } },

  // Marca de Caín — halo paradójico (protección)
  { match: /marca de Ca[ií]n|marca.{0,15}prot|le puso una marca/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Exilio a Nod — recede de la escena
  { match: /marca|errante|tierra de Nod|exilio|destierro|huye a/i,
    cueId: 'fx:character-recede', data: { pinIdx: 0 } },

  // Primera ciudad — Caín funda la ciudad de Enoc
  // TODO[primitive]: fx:city-rise — construcción de la primera ciudad
  { match: /funda.{0,15}ciudad|primera ciudad|ciudad.{0,10}Enoc/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // "quien mate un alma" — sentencia universal del Corán (Sura 5:32)
  { match: /quien mate.{0,10}alma|toda la humanidad|valor.{0,20}vida humana/i,
    cueId: 'fx:radial-bloom', data: { position: [620, 318] } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // "¿Acaso soy yo guardián de mi hermano?" — Caín a Yahvé
  { match: /guardián de mi hermano|acaso soy yo guardi[áa]n/i,
    cueId: 'fx:dialog', data: { eventId: 'cain-mata-abel' } },

  // Abel declara la no-violencia — voz de Abel al Corán
  { match: /no extender[eé] mi mano|temo a Dios|no extiendas tu mano/i,
    cueId: 'fx:dialog', data: { eventId: 'cain-mata-abel' } },

  // Yahvé pregunta — "¿Dónde está Abel tu hermano?"
  { match: /¿D[oó]nde est[áa].{0,10}hermano|dónde está Abel/i,
    cueId: 'fx:dialog', data: { eventId: 'cain-mata-abel' } },
];

export default CUES;
