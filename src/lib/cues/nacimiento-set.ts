import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Set".
 * Pins: adan(0), eva(1), set(2).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // Duelo previo — recuerdo de Abel muerto y Caín exiliado
  { match: /Abel muerto|Ca[ií]n exiliado|familia queda rota|duelo|familia rota/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'oración pública' — "comenzaron a invocar el nombre del Señor" (halo de culto)
  { match: /invocar el nombre|nombre del Se[ñn]or|culto|oraci[oó]n p[uú]blica|invocar/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 2 } },

  // 'pergamino' / 'hojas reveladas' — Shīth como segundo profeta islámico
  { match: /hojas reveladas|suhuf|sabiduría.{0,15}Ad[áa]n|escriba|hojas/i,
    cueId: 'fx:scroll-unfurl', data: { position: [623, 315] } },

  // 'pilares' / 'tablas de piedra' — Los setitas construyeron dos pilares con todo el saber
  { match: /pilares con.{0,15}conocimiento|tabletas del conocimiento|dos pilares/i,
    cueId: 'fx:stone-tablets', data: { position: [620, 320] } },

  // 'amanecer' — reinicio, nueva esperanza
  { match: /reinicio|nueva esperanza|luz nueva|comienza otra vez/i,
    cueId: 'fx:dawn-break' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Eva concibe a Set — esperanza renovada
  { match: /tercer hijo|otra simiente|en lugar de Abel|sustituido|me ha dado Dios/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Set emerge — luz de reinicio
  { match: /\bSet\b|Sh[eií]th|nace .{0,8}Set|reemplazo|reinicio/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Destello dorado sobre Set — designado por Dios
  { match: /designado|sustituto|designado por Dios|linaje justo/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // Padre de las naciones — linaje verdadero hacia Noé y Abraham
  { match: /padre verdadero|antepasado de la humanidad|todo desciende de Set/i,
    cueId: 'fx:radial-bloom', data: { position: [620, 318] } },

  // Padres se reaniman tras el duelo
  { match: /padres se reaniman|orgullo renovado|acoger.{0,10}Set|familia restaurada/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'Enós' — hijo de Set, en cuyos días comienza el culto
  { match: /En[oó]s|hijo de Set/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // 'imagen y semejanza' — Set nace "a semejanza de Adán, conforme a su imagen" (Gn 5:3)
  { match: /semejanza de Ad[áa]n|conforme a su imagen|a su semejanza/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 2 } },

  // 'reemplazo' / 'reinicio' — Set como sustituto sagrado del linaje roto
  { match: /reemplazo|reinicio del linaje|linaje roto|linaje justo retoma/i,
    cueId: 'fx:dawn-break' },

  // 'Noé' / 'Abraham' — la línea directa que vendrá de Set (Gn 5)
  { match: /de Set.{0,20}(No[eé]|Abraham)|hasta Abraham|linaje.{0,15}Set.{0,15}No[eé]/i,
    cueId: 'fx:journey-trace', data: { from: [620, 320], to: [630, 310], style: 'dashed' } },

  // 'evangelio de Lucas' — Set aparece en la genealogía de Jesús (Lc 3:38)
  { match: /hijo de Set.{0,20}Adán|Lucas 3|genealog[ií]a de Jesús.{0,20}Set/i,
    cueId: 'fx:divine-light-beam', data: { position: [618, 308] } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // "Dios me ha dado otra simiente en lugar de Abel" — Eva
  { match: /me ha dado Dios (otra simiente|otro hijo)|en lugar de Abel/i,
    cueId: 'fx:dialog', data: { eventId: 'nacimiento-set' } },
];

export default CUES;
