import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Enoc".
 * Pins: enoc(0), jared(1), mahalalel(2), vigilantes(3), semjaza(4), azazel(5), nephilim(6).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'ángeles' / Vigilantes descendiendo — angel-descent + angel-formation
  { match: /200 [áa]ngeles|descienden los.{0,15}[áa]ngeles|Vigilantes descienden/i,
    cueId: 'fx:angel-descent', data: { position: [628, 308] } },

  // 'monte Hermón' — lugar de descenso de los Vigilantes
  { match: /monte Herm[oó]n|Herm[oó]n/i,
    cueId: 'fx:mountain-glow', data: { position: [615, 310] } },

  // 'metalurgia' / 'armas' / 'espada' — Azazel enseña forja (nounDictionary: espada)
  { match: /metalurgia|forja|armamento|artes de forja/i,
    cueId: 'fx:sword-strike', data: { from: [614, 318], to: [625, 315] } },

  // 'cosméticos' / 'brujería' — artes prohibidas de Azazel
  { match: /cosm[eé]ticos|brujería|artes prohibidas|astronom[ií]a prohibida/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 5 } },

  // 'gigantes' / Nephilim — raza híbrida
  { match: /Nephilim|gigantes|raza h[ií]brida|hijos de los Vigilantes/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 6 } },

  // 'noche' — el descenso ocurre en la oscuridad del cielo
  { match: /\bnoche\b|oscuridad/i,
    cueId: 'fx:night-fall' },

  // 'estrellas' — Vigilantes eran astros caídos según 1 Enoc
  { match: /estrellas|astros|astron[oó]m[ia]/i,
    cueId: 'fx:starfield-shimmer' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Jared engendra — pulso paterno
  { match: /Jared|engendr[oó] a Enoc|durante su vida/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Enoc emerge — séptimo desde Adán, luz consagrada
  { match: /Enoc|Janoj|consagrado|s[eé]ptimo desde Ad[áa]n|s[eé]ptimo eslab[oó]n/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Halo sobre Enoc — figura liminal, casi sobrehumana
  { match: /figura liminal|humano.{0,10}casi sobrehumano|perfección|consagraci[oó]n/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Mahalalel — alabanza a Dios
  { match: /Mahalalel|alabanza a Dios|abuelo de Enoc/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // Vigilantes — formación ominosa
  { match: /Vigilantes|Grigori|Watchers/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 3 } },

  // Semjaza — líder emerge
  { match: /Semjaza|l[ií]der de los Vigilantes/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 4 } },

  // Azazel — segundo líder
  { match: /Azazel/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 5 } },

  // Pulso ominoso — la presencia del mal coexiste con el santo
  { match: /corrupci[oó]n|descarrilado|tierra corrompida/i,
    cueId: 'fx:vignette-pulse' },

  // Flash de descenso — los Vigilantes caen del cielo
  { match: /bajaron al monte|cayeron del cielo|juramento.{0,15}Hermón/i,
    cueId: 'fx:flash-white' },
];

export default CUES;
