import type { Cue } from '../narrationCues';

/**
 * Cues for "Jacob lucha con el ángel en Peniel".
 * Pins: jacob(0). Escenario: vado del Jaboc / Peniel [589, 357].
 * CUMBRE — densidad 15-20 cues.
 * Scene-objects: 'vado-jaboc', 'silueta-angel-lucha'.
 * REGLA #1: 'vado-jaboc' → no fx:water-wave (usa fx:animate-scene-object).
 *           'silueta-angel-lucha' → no fx:angel-descent (usa fx:animate-scene-object).
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ────────────────────────────────────────────

  // 'vado' / 'río Jaboc' → scene-object 'vado-jaboc' (REGLA #1: no fx:water-wave)
  { match: /vado del Jaboc|r[íi]o Jaboc|Jaboc|hace pasar.{0,16}vado|cruce del r[íi]o/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'vado-jaboc', kind: 'ripple' } },

  // 'ángel' / 'varón' → scene-object 'silueta-angel-lucha' (REGLA #1: no fx:angel-descent)
  { match: /var[oó]n|[áa]ngel.{0,20}(lucha|combat|Peniel)|adversario|malaj|ish|ser misterioso/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'silueta-angel-lucha', kind: 'glow' } },

  // 'tendón' / 'muslo' — rayo al punto de impacto
  { match: /encaje del muslo|descoyunt[oó]|tend[oó]n.{0,12}muslo|cojeando|cojo al amanecer/i,
    cueId: 'fx:lightning-strike',
    data: { from: [589, 320], to: [589, 357] } },

  // 'noche' / 'oscuridad' — atmósfera nocturna
  { match: /se qued[oó] solo|oscuridad|noche cerrada|en la oscuridad/i,
    cueId: 'fx:night-fall' },

  // 'amanecer' — fin de la lucha
  { match: /rayaba el alba|amanec[ióe]|al alba|al amanecer|raya el alba/i,
    cueId: 'fx:dawn-break' },

  // 'regalo' / 'rebaños' enviados a Esaú — camello y rebaños precedentes
  { match: /present[ée]|manadas|rebaños.{0,12}Esa[úu]|caballos.{0,10}siervos|enviados como regalo/i,
    cueId: 'fx:camel-train',
    data: { position: [589, 357] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // Jacob solo en la oscuridad — emerge
  { match: /Jacob|Yaʿq[ūu]b/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // La lucha hasta el alba — sacudida intensa
  { match: /luch[oó] con [ée]l|lucha nocturna|hasta el alba|hasta que rayaba|combate|no pod[íi]a con [ée]l/i,
    cueId: 'fx:earthquake-shake',
    data: { pinIdx: 0, intensity: 3 } },

  // Agarre desesperado — "no te dejaré"
  { match: /no te dejar[ée] si no me bendices|bend[íi]ceme|se aferr/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // Pregunta del nombre — "¿cuál es tu nombre?"
  { match: /¿cu[aá]l es tu nombre|le pregunt[oó] el nombre|nombre.{0,10}Jacob/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#e6d4a0' } },

  // Cambio de nombre Jacob → Israel
  { match: /Israel|no se dir[áa] m[áa]s tu nombre|Yisra.?el|luchaste con Dios/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#fff1c0' } },

  // Peniel — "vi a Dios cara a cara"
  { match: /Peniel|rostro de Dios|vi a Dios cara a cara|Penu.?el/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [589, 357] } },

  // Lectura como oración perseverante (tradición cristiana)
  { match: /oración perseverante|insis[tT]encia en la oración|combate espiritual|Oseas 12/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#ffd866' } },

  // Lectura cristológica — el adversario como Verbo preencarnado
  { match: /Verbo preencarnado|cristol[oó]gic|Cristo preexistente|teofan[íi]a/i,
    cueId: 'fx:radial-bloom',
    data: { position: [589, 357] } },

  // Tabú alimenticio — no comer el tendón
  { match: /no comen.{0,16}tend[oó]n|tend[oó]n del muslo|costumbre.{0,12}vigente|Gn 32:32/i,
    cueId: 'fx:glow-pulse',
    data: { position: [589, 357], color: '#a04040' } },

  // Identidad del adversario — Samael / ángel guardián (midrash)
  { match: /Samael|[áa]ngel guardi[áa]n de Esa[úu]|Miguel|Bereshit Rabb[áa] 77|identidad ambigua/i,
    cueId: 'fx:angel-descent',
    data: { position: [589, 357] } },

  // Banū Isrāʾīl — nombre colectivo del pueblo
  { match: /Ban[ūu] Isr[āa][ʾʿʼ]?[īi]l|Bnei Israel|pueblo de Israel|hijos de Israel/i,
    cueId: 'fx:zoom-pulse' },

  // Flash de revelación — la lucha llega a su clímax
  { match: /venci[oó]|has vencido|has luchado con Dios|p[rR]eval[eeé]|le bendijo/i,
    cueId: 'fx:flash-white' },

];

export default CUES;
