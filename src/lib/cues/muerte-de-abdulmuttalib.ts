import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de ʿAbd al-Muṭṭalib".
 * Pins: mahoma(0), abdulmuttalib(1), abu-talib(2). Escenario: La Meca [625, 460].
 */
const CUES: Cue[] = [
  // ʿAbd al-Muṭṭalib muere
  { match: /[ʿ']?Abd al-Mu[ṭt][ṭt]alib|abuelo.{0,15}(muere|fallec)|jefe de Ban[ūu] H[āa]shim muri|custodio de la Kaaba.{0,15}muere/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Mahoma niño de ocho años huérfano de abuelo
  { match: /ni[ñn]o de.{0,12}ocho a[ñn]os|huérfano|pierde a su abuelo|qued[oó] sin protector/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abū Ṭālib asume la tutela
  { match: /Ab[ūu] [ṬT][āa]lib|nuevo tutor|tutela.{0,15}pasa|jiw[āa]r|protecci[oó]n cl[áa]nica|tío paterno asume/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Halo divino sobre el huérfano (Sura 93)
  { match: /Sura 93|encontró huérfano|amparo divino|providencia/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Duelo familiar — resplandor apagado
  { match: /duelo|tristeza|pérdida del abuelo|consternaci[oó]n|afecto/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a7a90' } },
  // Polvo de La Meca / funeral
  { match: /funeral|entierro|sepelio|La Meca|Ban[ūu] H[āa]shim/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
];

export default CUES;
