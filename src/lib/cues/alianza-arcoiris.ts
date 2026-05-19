import type { Cue } from '../narrationCues';

/**
 * Cues for "La alianza del arcoíris".
 * Pins: noe(0), sem(1), cam(2), jafet(3).
 *
 * scene-objects: 'arcoiris' (id) declarado en este evento.
 * REGLA #1: menciones al arcoíris → fx:animate-scene-object con id='arcoiris'.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'arcoíris' — scene-object 'arcoiris' ya existe; REGLA #1
  { match: /arco[\- ]?iris|arcoiris|mi arco.{0,20}nubes|arco.{0,10}se[ñn]al/i,
    cueId: 'fx:animate-scene-object', data: { id: 'arcoiris', kind: 'pulse' } },

  // 'altar' — Noé construye altar y ofrece holocaustos
  { match: /construy[oó].{0,10}altar|ofreci[oó].{0,15}holocausto|sacrific.{0,15}No[eé]/i,
    cueId: 'fx:fire-flicker', data: { position: [555, 195] } },

  // 'humo' del sacrificio — olor grato
  { match: /olor grato|humo.{0,10}sacrificio|olor suave/i,
    cueId: 'fx:smoke-rise', data: { position: [555, 192] } },

  // 'nubes' — las nubes donde aparece el arcoíris
  { match: /\bnubes\b|en las nubes|entre las nubes/i,
    cueId: 'fx:cloud-pillar', data: { position: [555, 180] } },

  // 'tierra' / 'tierra viva' — alianza con toda la tierra
  { match: /toda la tierra|con toda carne|alianza.{0,10}tierra/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'paloma' — símbolo de paz post-diluvio
  { match: /\bpaloma\b/i,
    cueId: 'fx:dove-flight', data: { from: [555, 195], to: [575, 185] } },

  // 'estrellas' — el arcoíris aparece a plena luz del sol
  // (el apocalipsis lo muestra alrededor del trono — Ap 4:3)
  { match: /trono.{0,15}arco iris|alrededor del trono|Apocalipsis/i,
    cueId: 'fx:starfield-shimmer' },

  // 'promesa' / 'alianza' — luz de pacto
  { match: /pacto|alianza|berit|primera alianza universal|alianza no[áa]quica/i,
    cueId: 'fx:divine-light-beam', data: { position: [555, 190] } },

  // 'agua' / 'nunca más con agua' — promesa de no-inundación
  { match: /no volver[eé].{0,20}maldecir|nunca m[áa]s.{0,15}agua|diluvio.{0,15}nunca/i,
    cueId: 'fx:water-wave', data: { position: [555, 200] } },

  // 'montaña' de Ararat — el escenario de la alianza
  { match: /Ararat|monte Ararat/i,
    cueId: 'fx:mountain-glow', data: { position: [555, 195] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Noé alza brazos — gesto ritual de acción de gracias
  { match: /No[eé].{0,20}alza|sale del arca|desembarca/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Halo divino sobre Noé — el elegido recibe la alianza
  { match: /alianza con No[eé]|establece.{0,15}pacto|Dios establece/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Sem — antepasado semita, futuro del linaje sagrado
  { match: /\bSem\b|Bendito sea.{0,10}Dios de Sem/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Cam — los descendientes pueblan África y Asia
  { match: /\bCam\b|descendientes.{0,15}Cam/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // Jafet — "engrandezca Dios a Jafet"
  { match: /\bJafet\b|engrandezca Dios a Jafet|se expanda/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 3 } },

  // Hijos se abren hacia las naciones — journey-trace tri-direccional
  { match: /hijos se abren|fundar las naciones|tres ramas|repoblar/i,
    cueId: 'fx:journey-trace', data: { from: [555, 195], to: [580, 220], style: 'dashed' } },

  // El arma desarmada — leve flash de revelación
  { match: /arma.{0,15}desarmada|literalmente desarmada|colgada en las nubes/i,
    cueId: 'fx:flash-white' },

  // Preceptos noáquicos — 7 leyes universales
  { match: /preceptos no[áa]quicos|siete preceptos|Sheva Mitzvot|ley natural m[íi]nima/i,
    cueId: 'fx:scroll-unfurl', data: { position: [558, 198] } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // "Mi arco he puesto en las nubes" — Yahvé a Noé
  { match: /mi arco he puesto en las nubes|arco.{0,20}se[ñn]al del pacto/i,
    cueId: 'fx:dialog', data: { eventId: 'alianza-arcoiris' } },

  // "¡Desembarca con nuestra paz!" — Allah (Sura Hud 11:48)
  { match: /desembarca con nuestra paz|nuestra paz.{0,20}bendiciones/i,
    cueId: 'fx:dialog', data: { eventId: 'alianza-arcoiris' } },

  // "Bendito sea Yahveh el Dios de Sem" — Noé bendice a sus hijos
  { match: /Bendito sea (Yahveh|Jehov[áa]).{0,10}Dios de Sem/i,
    cueId: 'fx:dialog', data: { eventId: 'alianza-arcoiris' } },
];

export default CUES;
