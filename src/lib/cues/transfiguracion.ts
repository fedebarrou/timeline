import type { Cue } from '../narrationCues';

/**
 * Cues for "Transfiguración".
 * Pins: jesus(0), pedro(1), juan-apostol(2).
 */
const CUES: Cue[] = [
  // Sube al monte alto a orar
  { match: /monte alto|Tabor|sube .{0,12}orar|seis d[ií]as despu[eé]s|aparte/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Monte resplandeciente — REGLA #1: anima el monte-tabor ya en escena
  { match: /monte alto|Tabor|Hermón|cima del monte|en el monte|monte santo/i, cueId: 'fx:animate-scene-object', data: { id: 'monte-tabor', kind: 'glow', duration: 2.8 } },
  // Rostro resplandece como el sol — halo
  { match: /se transfigur[oó]|resplandeci[oó] su rostro|como el sol|vestiduras|blancas como la luz/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Moisés y Elías aparecen
  { match: /Mois[eé]s.{0,12}El[ií]as|aparecen.{0,12}(Mois[eé]s|El[ií]as)|Ley y .{0,6}Profetas|hablando con [eé]l/i, cueId: 'fx:character-emerge', data: { position: [581, 350] } },
  // Pedro propone tres tiendas
  { match: /tres tiendas|hacer.{0,12}tiendas|no sab[ií]a lo que dec[ií]a|Pedro.{0,30}propon/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Nube luminosa los cubre — Espíritu/Shekiná
  { match: /nube luminosa|nube los cubr[ií][oó]|nube .{0,12}cubre|Sheki[nñ][áa]/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Voz del Padre — escuchadle
  { match: /[eé]ste es mi Hijo amado|voz desde la nube|escuchadle|en quien tengo complacencia/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Discípulos caen sobre sus rostros
  { match: /caen.{0,12}rostros|gran temor|levantaos.{0,12}no tem[áa]is/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
];

export default CUES;
