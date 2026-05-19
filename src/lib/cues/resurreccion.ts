import type { Cue } from '../narrationCues';

/**
 * Cues for "Resurrección de Jesús".
 * Pins: jesus(0), maria-magdalena(1), pedro(2), juan-apostol(3).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'sepulcro'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Tumba vacía — piedra removida
  { match: /sepulcro vac[ií]o|tumba vac[ií]a|piedra removida|piedra .{0,6}corrida|no est[áa] aqu[ií]/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
  // Sepulcro — REGLA #1: anima el sepulcro ya en escena
  { match: /\bsepulcro\b|la tumba|sepultura|en la cueva|tumba nueva/i, cueId: 'fx:animate-scene-object', data: { id: 'sepulcro', kind: 'pulse', duration: 2.2 } },
  // Piedra rodada — rolling stone
  { match: /piedra .{0,8}rodad|la piedra corre|removida la piedra|piedra .{0,8}separad/i, cueId: 'fx:rolling-stone', data: { position: [582, 363] } },
  // Ángel anuncia "ha resucitado"
  { match: /[áa]ngel.{0,30}(anuncia|dice)|ha resucitado|resucit[oó]|tercer d[ií]a/i, cueId: 'fx:angel-descent', data: { position: [582, 360] } },
  // Luz de resurrección
  { match: /resucit[oó]|cuerpo glorioso|vive para siempre|la vida venció/i, cueId: 'fx:resurrection-light', data: { position: [582, 363] } },
  // Flash blanco al amanecer
  { match: /primer d[ií]a de la semana|al amanecer|temprano.{0,20}alba|amaneciendo/i, cueId: 'fx:flash-white' },
  // Radial bloom — la gloria de la resurrección
  { match: /gloria de la resurrecci[oó]n|triunfo sobre la muerte|venci[oó] a la muerte|aleluya/i, cueId: 'fx:radial-bloom', data: { position: [582, 363] } },
  // Halo divino sobre el Resucitado
  { match: /Jes[uú]s.{0,12}(aparece|se aparece)|apariciones|cuerpo glorioso|Kyrios/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Lienzos en la tumba — luz
  { match: /lienzos|s[áa]bana|sudario|enrollado|doblado/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fffde8' } },
  // Terremoto — ángel que rueda la piedra
  { match: /terremoto|se sacudi[oó] la tierra|ángel .{0,12}descendi[oó]|guard.{0,12}tiemblan/i, cueId: 'fx:earthquake-shake', data: { position: [582, 363] } },
  // Peces — desayuno con el Resucitado en la orilla
  { match: /peces a la brasa|pez.{0,20}orilla|comed.{0,10}peces|comed.{0,10}pan/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Amanecer de la nueva creación
  { match: /primer d[ií]a|nuevo[s]? comienzo|nueva creaci[oó]n|nueva semana/i, cueId: 'fx:dawn-break' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // María Magdalena — primera testigo
  { match: /Magdalena|Rabun[ií]|le llama por su nombre|primera testigo|hortelano/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Jesús vuelve — emerge
  { match: /resucitado|cuerpo glorioso|Pascua|primer d[ií]a de la semana/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pedro corre al sepulcro
  { match: /Pedro y .{0,8}Juan corren|corren al sepulcro|entr[oó] en el sepulcro|lienzos/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Juan también emerge
  { match: /Juan.{0,20}(entr[oó]|lleg[oó])|el otro disc[ií]pulo|crey[oó]/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Emaús — al partir el pan
  { match: /Ema[uú]s|al partir el pan|dos disc[ií]pulos|camino de Ema[uú]s|reconocen/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Tomás — toca las llagas
  { match: /Tom[áa]s|toca las llagas|no seas incr[eé]dulo|Se[ñn]or m[ií]o y Dios m[ií]o/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Zoom en la primera aparición
  { match: /Mar[ií]a|Rabb[uū]n[íi]|no me toques|noli me tangere/i, cueId: 'fx:zoom-pulse' },
  // Vignette — el sepulcro vacío
  { match: /tumba vac[ií]a|sepulcro vac[ií]o|no est[áa] aqu[ií]|ha resucitado|ha sido resucitado/i, cueId: 'fx:vignette-pulse' },

  // ── Pasada 3: cierre ──────────────────────────────────────────────────

  // Mandato apostólico — id y predicad
  { match: /id y anunciad|decid a sus disc[ií]pulos|id a Galilea|all[ií] le ver[eé]is/i, cueId: 'fx:divine-light-beam', data: { position: [582, 360] } },
  // Paz — saludo del Resucitado
  { match: /la paz.{0,12}con vosotros|shalom|paz sea con vosotros/i, cueId: 'fx:radial-bloom', data: { position: [582, 360] } },
];

export default CUES;
