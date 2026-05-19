import type { Cue } from '../narrationCues';

/**
 * Cues for "Expulsión del Edén".
 * Pins: adan(0), eva(1), lilith(2).
 *
 * scene-objects presentes: 'arbol-del-conocimiento', 'espada-flameante'.
 * REGLA #1: animar esos SVGs con fx:animate-scene-object en vez de primitivas paralelas.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'serpiente' — tentadora principal (Gn 3)
  { match: /\bserpiente\b|tentaci[oó]n|culebra/i,
    cueId: 'fx:serpent', data: { position: [622, 322] } },

  // 'árbol del conocimiento' — scene-object 'arbol-del-conocimiento' existe; REGLA #1
  { match: /[áa]rbol (del conocimiento|prohibido|de la eternidad)|shajarat al-khuld/i,
    cueId: 'fx:animate-scene-object', data: { id: 'arbol-del-conocimiento', kind: 'sway' } },

  // 'fruto' — menciona el fruto comido
  { match: /\bfruto\b|comi[oó] del [áa]rbol|prob[oó] el [áa]rbol|tom[oó] de su fruto/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // 'espada flameante' — scene-object 'espada-flameante' existe; REGLA #1
  { match: /espada (flame|encendida)|espada giratoria/i,
    cueId: 'fx:animate-scene-object', data: { id: 'espada-flameante', kind: 'burn' } },

  // 'querubines' — guardianes con espada flameante (Gn 3:24)
  { match: /querub[íi]n|querubines/i,
    cueId: 'fx:angel-formation', data: { position: [620, 315] } },

  // 'polvo' — "polvo eres y al polvo volverás" (sentencia)
  { match: /polvo eres|al polvo volver[áa]s/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // 'dolor de parto' — sentencia sobre Eva
  { match: /dolor de parto|parir[áa]s con dolor|multiplicar[áa] tus dolores/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // 'sudor de su frente' — sentencia sobre Adán (trabajo)
  { match: /sudor de su frente|trabajar[áa]s con sudor|tierra maldita/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'noche' / 'oscuridad' — atmósfera del juicio
  { match: /\bnoche\b/i,
    cueId: 'fx:night-fall' },

  // ── Pasada 2: narrativa (personajes, momentos cumbre) ─────────────────

  // Tentación de Eva por la serpiente — destello oscuro
  { match: /tentadora|Eva.{0,20}serpiente|serpiente.{0,20}engañ/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Dios interroga — voz divina retumbando
  { match: /¿D[oó]nde est[áa]s\?|¿Qui[eé]n te ense[ñn][oó]|Dios llam[oó]/i,
    cueId: 'fx:divine-light-beam', data: { position: [618, 310] } },

  // La expulsión — flash cinematográfico (es el evento cumbre de la era)
  { match: /expuls[oó]|ech[oó] fuera|sacaron.{0,15}del.{0,10}jard[ií]n|los sac[oó]/i,
    cueId: 'fx:flash-white' },

  // Adán y Eva huyen — exilio visible
  { match: /labrase la tierra|labrara la tierra|fuera.{0,20}Ed[eé]n/i,
    cueId: 'fx:character-recede', data: { pinIdx: 0 } },

  // Lilith — ya había abandonado; solo en el verbo explícito
  { match: /huy[oó] del Ed[eé]n|abandon[oó] el Ed[eé]n|Lilit.{0,30}rebeli[oó]n/i,
    cueId: 'fx:character-recede', data: { pinIdx: 2 } },

  // Pecado original — halo oscuro / vignette
  { match: /pecado original|pecado entr[oó] al mundo|primer pecado/i,
    cueId: 'fx:vignette-pulse' },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // "Oí tu voz en el huerto" — Adán a Dios
  { match: /o[ií] tu voz en el huerto|estaba desnudo y me escond[ií]/i,
    cueId: 'fx:dialog', data: { eventId: 'expulsion-eden' } },

  // Iblis tienta a ambos — escena coránica
  { match: /les jur[oó].{0,20}soy de los que os aconsejan|les enga[ñn][oó] con falacia/i,
    cueId: 'fx:dialog', data: { eventId: 'expulsion-eden' } },
];

export default CUES;
