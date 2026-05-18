import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Āmina".
 * Pins: mahoma(0), amina-madre(1). Escenario: al-Abwāʾ [620, 445].
 */
const CUES: Cue[] = [
  // Āmina muere en al-Abwāʾ
  { match: /[ĀaA]mina|madre.{0,15}(muere|fallec|enferm)|al-Abw[āa][ʾ']?|tumba de su esposo|enferma en el camino/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Mahoma niño huérfano de seis años
  { match: /ni[ñn]o de seis a[ñn]os|huérfano|doblemente huérfano|qued[oó] sin madre/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Halo divino — providencia sobre el huérfano
  { match: /Sura 93:6|encontró huérfano|amparo divino|providencia|Dios le amparó/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Duelo — resplandor apagado
  { match: /duelo|tristeza|pérdida|llora|consternaci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a7a90' } },
  // El viaje a Yathrib desde Meca
  { match: /viaje a Yathrib|regreso desde Medina|camino de regreso|caravana|viajar con Umm Ayman/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [620, 445] } },
  // Polvo del camino
  { match: /Abw[āa][ʾ']?|al-Abw|cerca de Yathrib|en el camino/i, cueId: 'fx:dust-burst', data: { position: [620, 445] } },
];

export default CUES;
