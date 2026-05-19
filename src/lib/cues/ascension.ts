import type { Cue } from '../narrationCues';

/**
 * Cues for "Ascensión de Jesús".
 * Pins: jesus(0), pedro(1), maria(2).
 * CUMBRE — 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Monte de los Olivos — escenario
  { match: /Monte de los Olivos|Betania|falda oriental|cuarenta d[ií]as despu[eé]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Monte — mountain glow (no hay scene-object monte aquí)
  { match: /Monte de los Olivos|monte al este|desde el monte/i, cueId: 'fx:mountain-glow', data: { position: [583, 358] } },
  // Cuarenta días
  { match: /cuarenta d[ií]as|40 d[ií]as .{0,12}resucitado|apariciones durante cuarenta/i, cueId: 'fx:dawn-break' },
  // Mandato misionero — radial bloom
  { match: /haced disc[ií]pulos|toda potestad|todas las naciones|id por todo el mundo|misionero/i, cueId: 'fx:radial-bloom', data: { position: [583, 358] } },
  // Mandato — halo sobre Jesús
  { match: /haced disc[ií]pulos|toda potestad|ir y ense[ñn]ad|id y bautizad/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Bendice levantando las manos — halo divino
  { match: /bendec[ií]rlos|levanta las manos|gesto sacerdotal|bendiciendo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Es elevado — sube al cielo
  { match: /fue alzado|llevado arriba|asciende|sube al cielo|tomado.{0,12}al cielo|elevado/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Luz divina al subir
  { match: /fue alzado|sube al cielo|ascendi[oó]|nube le arrebat[oó]/i, cueId: 'fx:divine-light-beam', data: { position: [583, 350] } },
  // Nube lo oculta — Shekiná
  { match: /nube.{0,12}oculta|le recibi[oó] una nube|Sheki[nñ][áa]|presencia gloriosa/i, cueId: 'fx:smoke-rise', data: { position: [583, 350] } },
  // Flash blanco de la nube
  { match: /nube.{0,12}oculta|lo esconde|ya no lo vieron/i, cueId: 'fx:flash-white' },
  // Dos varones / ángeles con vestiduras blancas
  { match: /dos varones|vestiduras blancas|varones galileos|mensajeros blancos|este mismo Jes[uú]s/i, cueId: 'fx:angel-descent', data: { position: [583, 358] } },
  // Halo en la ascensión — gloria
  { match: /gloria del Padre|a la diestra|siéntate a mi diestra|mediador/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Discípulos vuelven con gozo
  { match: /vuelven a Jerusal[eé]n|con gran gozo|perseverantes en oraci[oó]n|discipulos.{0,20}adoraron/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // María en el Cenáculo
  { match: /Mar[ií]a.{0,20}(cen[áa]culo|oraci[oó]n|aposento)|madre.{0,12}orando|reunida con los ap[oó]stoles/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Nube — starfield al ascender
  { match: /hacia el cielo|se eleva|sus ojos|miraban al cielo|fijaron los ojos arriba/i, cueId: 'fx:starfield-shimmer' },
  // Zoom al momento de la ascensión
  { match: /fue alzado|sube al cielo|elevado|tomado.{0,12}al cielo/i, cueId: 'fx:zoom-pulse' },
  // Vignette al momento de desaparecer
  { match: /nube .{0,10}oculta|ya no le vieron|se perdió en la nube|desapareció/i, cueId: 'fx:vignette-pulse' },

  // ── Pasada 3: versión coránica y cierre ──────────────────────────────

  // Elevación coránica
  { match: /elev[oó] a S[ií]|voy a elevarte|recogida directa|nuz[uū]l|segunda venida/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
  // Espera del Espíritu
  { match: /aguardad.{0,12}Esp[ií]ritu|prometido por el Padre|revestidos de poder|quedaos en Jerusal[eé]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffe8a0' } },
  // Amanecer de la era misionera
  { match: /testigos.{0,12}tierra|hasta los confines|extremo de la tierra/i, cueId: 'fx:dawn-break' },
];

export default CUES;
