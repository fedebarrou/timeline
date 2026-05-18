import type { Cue } from '../narrationCues';

/**
 * Cues for "Presentación de Jesús en el Templo".
 * Pins: jesus(0), maria(1), jose-de-nazaret(2), simeon(3), ana-profetisa(4).
 */
const CUES: Cue[] = [
  // Viaje Belén -> Jerusalén
  { match: /suben.{0,12}Jerusal[eé]n|llevan al ni[ñn]o|cuarenta d[ií]as despu[eé]s|cumplidos los d[ií]as/i, cueId: 'fx:journey-trace', data: { from: [581, 364], to: [582, 363] } },
  // Sacrificio de tórtolas — polvo en el atrio
  { match: /t[oó]rtolas|dos palominos|dos pichones|ofrenda de los pobres|sacrificio prescrito|purificaci[oó]n/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
  // Simeón emerge — toma al niño
  { match: /Sime[oó]n|hombre justo|esperaba la consolaci[oó]n|toma al ni[ñn]o/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Nunc dimittis — halo
  { match: /Nunc dimittis|ahora.{0,6}despides|han visto mis ojos|luz para revelaci[oó]n|salvaci[oó]n/i, cueId: 'fx:halo-divine', data: { pinIdx: 3 } },
  // Profecía de la espada — destello rojizo sobre María
  { match: /espada traspasar[áa]|se[ñn]al de contradicci[oó]n|profec[ií]a.{0,20}Mar[ií]a/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#a04040' } },
  // Ana profetisa emerge
  { match: /Ana|profetisa|ochenta y cuatro|tribu de Aser|redenci[oó]n de Jerusal[eé]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Jesús reconocido como Mesías — halo sobre el niño
  { match: /Ungido del Se[ñn]or|Mes[ií]as|gloria de tu pueblo Israel|reconoce al ni[ñn]o/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
