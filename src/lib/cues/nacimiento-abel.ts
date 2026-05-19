import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Abel".
 * Pins: adan(0), eva(1), abel(2).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // Eva da a luz por segunda vez
  { match: /dio a luz|hermano de Ca[ií]n|segundo hijo/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // 'ovejas' / 'rebaño' — Abel es pastor (nounDictionary: oveja → fx:goat-herd)
  { match: /pastor de ovejas|pastorea|reba[ñn]o|rebaño/i,
    cueId: 'fx:goat-herd', data: { position: [625, 325] } },

  // 'primogénitos del rebaño' — ofrenda que anticipa el conflicto
  { match: /primog[eé]nitos del reba[ñn]o|de su reba[ñn]o/i,
    cueId: 'fx:ram', data: { position: [623, 323] } },

  // 'nombre significa vapor / aliento' — premonición (nounDictionary: ninguno exacto)
  { match: /vapor|aliento|vanidad|vida breve|brevedad|H[eé]vel|efímero/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // 'dualismo del trabajo' — agricultor vs pastor, primer conflicto simbólico
  { match: /agricultor|labra la tierra|dualismo del trabajo/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 2 } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Abel emerge — entrada delicada
  { match: /Abel|H[eé]vel|H[áa]b[ií]l/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Adán como padre presente — pulso tranquilo
  { match: /padre del segundo|familia humana se expande|acoger con calma/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Premonición del nombre — leve flash
  { match: /premonición|existencia fugaz|recordado.{0,20}brevedad/i,
    cueId: 'fx:vignette-pulse' },

  // Nacimiento tranquilo en el campo pastoral — amanecer suave
  { match: /alma sencilla|vida quieta del pastor|habitar la tierra/i,
    cueId: 'fx:dawn-break' },

  // 'el justo Abel' (NT) — halo divino anticipado
  { match: /el justo Abel|por la fe Abel|sacrificio más excelente/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 2 } },

  // Hermana gemela Azura — tradición rabínica
  { match: /Azura|hermana gemela de Abel/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 2 } },

  // 'tierra maldecida' — el terreno que labra Caín vs el pasto de Abel
  { match: /tierra maldecida|maldici[oó]n.{0,10}tierra|tierra.{0,10}maldij/i,
    cueId: 'fx:dust-burst', data: { position: [622, 325] } },

  // 'Hābīl' — nombre islámico de Abel (modelo del creyente no violento)
  { match: /H[áa]b[ií]l|creyente que prefiere morir|no atacar.{0,15}suyos/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 2 } },

  // 'hermano' — la relación fraterna que define su trágico destino
  { match: /hermano de Ca[ií]n|primer hermano|relaci[oó]n fraterna/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // 'fe' — "por la fe Abel ofreció sacrificio más excelente" (Heb 11:4)
  { match: /por la fe Abel|sacrificio m[áa]s excelente|Hebreos 11/i,
    cueId: 'fx:divine-light-beam', data: { position: [620, 308] } },
];

export default CUES;
