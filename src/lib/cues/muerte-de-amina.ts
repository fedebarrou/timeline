import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Āmina".
 * Pins: mahoma(0), amina-madre(1). Escenario: al-Abwāʾ [620, 445].
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Camino de regreso — caravana
  { match: /viaje a Yathrib|regreso desde Medina|camino de regreso|caravana|viajar con Umm Ayman/i,
    cueId: 'fx:journey-trace', data: { from: [625, 460], to: [620, 445] } },

  // Polvo del camino — al-Abwāʾ
  { match: /Abw[āa][ʾ']?|al-Abw|cerca de Yathrib|en el camino/i,
    cueId: 'fx:dust-burst', data: { position: [620, 445] } },

  // Niebla — muerte, fin de la infancia
  { match: /niebla|oscuridad.{0,15}ni[ñn]o|luto|velo de tristeza/i,
    cueId: 'fx:fog-roll' },

  // Anochecer — muere en el camino
  { match: /anochec[ío]|cay[oó] la noche|tarde|en el camino.{0,15}noche/i,
    cueId: 'fx:dusk-fall' },

  // Incienso del duelo — costumbre árabe
  { match: /duelo|entierro.{0,20}Abw[āa][ʾ']?|sepelio|costumbre/i,
    cueId: 'fx:incense-spiral', data: { position: [620, 445] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // Āmina muere en al-Abwāʾ
  { match: /[ĀaA]mina|madre.{0,15}(muere|fallec|enferm)|al-Abw[āa][ʾ']?|tumba de su esposo/i,
    cueId: 'fx:character-recede', data: { pinIdx: 1 } },

  // Mahoma niño huérfano de seis años
  { match: /ni[ñn]o de seis a[ñn]os|huérfano|doblemente huérfano|qued[oó] sin madre/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Halo divino — providencia sobre el huérfano (Sura 93:6)
  { match: /Sura 93:6|encontró huérfano|amparo divino|providencia|Dios le ampar[oó]/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Duelo — resplandor apagado
  { match: /duelo|tristeza|p[eé]rdida|llora|consternaci[oó]n/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Fundido a negro — muerte de la madre
  { match: /muri[oó].{0,15}([ĀaA]mina|madre)|falleci[oó].{0,15}al-Abw/i,
    cueId: 'fx:fade-to-black' },
];

export default CUES;
