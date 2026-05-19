import type { Cue } from '../narrationCues';

/**
 * Cues for "Transfiguración".
 * Pins: jesus(0), pedro(1), juan-apostol(2).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'monte-tabor'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Sube al monte alto a orar
  { match: /monte alto|Tabor|sube .{0,12}orar|seis d[ií]as despu[eé]s|aparte/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Monte resplandeciente — REGLA #1: anima el monte-tabor ya en escena
  { match: /monte alto|Tabor|Hermón|cima del monte|en el monte|monte santo/i, cueId: 'fx:animate-scene-object', data: { id: 'monte-tabor', kind: 'glow', duration: 2.8 } },
  // Monte — REGLA #1: segunda mención con pulse
  { match: /\bmonte\b|la cima|ladera del monte|subir el monte/i, cueId: 'fx:animate-scene-object', data: { id: 'monte-tabor', kind: 'pulse', duration: 2.2 } },
  // Rostro resplandece como el sol — halo
  { match: /se transfigur[oó]|resplandeci[oó] su rostro|como el sol|vestiduras|blancas como la luz/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Flash blanco al transfigurarse
  { match: /se transfigur[oó]|resplandeci[oó]|blancas como la nieve|blancas como la luz/i, cueId: 'fx:flash-white' },
  // Radial bloom de la gloria
  { match: /se transfigur[oó]|su gloria|gloria divina|luminosidad divina/i, cueId: 'fx:radial-bloom', data: { position: [581, 350] } },
  // Luz divina — haz de luz
  { match: /luz.{0,12}del rostro|resplandor|deslumbrantemente blancas|como el sol su cara/i, cueId: 'fx:divine-light-beam', data: { position: [581, 350] } },
  // Moisés y Elías aparecen
  { match: /Mois[eé]s.{0,12}El[ií]as|aparecen.{0,12}(Mois[eé]s|El[ií]as)|Ley y .{0,6}Profetas|hablando con [eé]l/i, cueId: 'fx:character-emerge', data: { position: [581, 350] } },
  // Pedro propone tres tiendas
  { match: /tres tiendas|hacer.{0,12}tiendas|no sab[ií]a lo que dec[ií]a|Pedro.{0,30}propon/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Juan emerge
  { match: /Santiago y Juan|Juan .{0,12}(testigo|subi[oó]|fue)/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Nube luminosa los cubre — Shekiná
  { match: /nube luminosa|nube los cubr[ií][oó]|nube .{0,12}cubre|Sheki[nñ][áa]/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Voz del Padre — luz + halo
  { match: /[eé]ste es mi Hijo amado|voz desde la nube|escuchadle|en quien tengo complacencia/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Voz del Padre — luz divina
  { match: /[eé]ste es mi Hijo amado|voz desde la nube|escuchadle/i, cueId: 'fx:divine-light-beam', data: { position: [581, 348] } },
  // Discípulos caen sobre sus rostros
  { match: /caen.{0,12}rostros|gran temor|levantaos.{0,12}no tem[áa]is/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Discípulos — gran pavor
  { match: /gran temor|aterrados|cayeron rostro en tierra|tuvieron gran miedo/i, cueId: 'fx:earthquake-shake', data: { position: [581, 355] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Zoom al momento del resplandor
  { match: /se transfigur[oó]|resplandeci[oó]|su rostro brillaba/i, cueId: 'fx:zoom-pulse' },
  // Vignette en la voz del Padre
  { match: /[eé]ste es mi Hijo amado|voz desde la nube|escuchadle/i, cueId: 'fx:vignette-pulse' },
  // Silencio del descenso — bajar al llano
  { match: /no cont[eé]is la visi[oó]n|hasta que el Hijo del Hombre resucite|bajaron del monte|descendiendo/i, cueId: 'fx:fade-from-black' },
  // Amanecer tras la noche de oración
  { match: /al d[ií]a siguiente|amanecer.{0,20}monte|despert[oó]|a la ma[ñn]ana/i, cueId: 'fx:dawn-break' },

  // ── Pasada 3: cierre ──────────────────────────────────────────────────

  // El secreto de la transfiguración
  { match: /no cont[eé]is|no lo digan a nadie|guardad el secreto|visi[oó]n.{0,12}secreta/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
];

export default CUES;
