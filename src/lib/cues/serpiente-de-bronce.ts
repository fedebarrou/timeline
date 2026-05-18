import type { Cue } from '../narrationCues';

/**
 * Cues for "La serpiente de bronce".
 * Pins: moises(0).
 */
const CUES: Cue[] = [
  // Pueblo se desanima / desprecia el maná
  { match: /alma.{0,10}fastidio|pan tan liviano|murmur|desprecio.{0,15}man[áa]|desanim/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Serpientes ardientes (saraf) — plaga
  { match: /serpientes ardientes|nechashim|seraphim|saraf|serpientes.{0,15}mordían/i, cueId: 'fx:plague-swarm', data: { position: [568, 408], type: 'serpents' } },
  // Mucho pueblo muere
  { match: /muri[óo] mucho pueblo|murieron.{0,10}mordidos|mordieron al pueblo/i, cueId: 'fx:character-recede', data: { position: [568, 410] } },
  // Arrepentimiento del pueblo
  { match: /hemos pecado|arrepent|ora a Yahveh|quita.{0,15}serpientes/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Moisés fabrica la serpiente de bronce — efigie figurativa
  { match: /serpiente de bronce|nechash nechoshet|serpiente.{0,15}asta|fabric[óo].{0,15}serpiente|sobre un asta/i, cueId: 'fx:serpent', data: { position: [568, 408] } },
  // Pulso dorado adicional sobre el asta
  { match: /serpiente de bronce|nechash nechoshet|sobre un asta/i, cueId: 'fx:glow-pulse', data: { position: [568, 408], color: '#ffd27a' } },
  // Mirar y vivir
  { match: /mirare a ella|mirar[áa] a la serpiente|mira y vive|quien la mira|sanaci[óo]n.{0,15}mirada/i, cueId: 'fx:glow-pulse', data: { position: [568, 408], color: '#cfe6c8' } },
  // Prefiguración de la cruz / Hijo del Hombre levantado
  { match: /Hijo del Hombre.{0,15}levantado|prefigura.{0,15}cruz|como Mois[ée]s levant[óo]|cruz/i, cueId: 'fx:halo-divine', data: { position: [568, 408] } },
];

export default CUES;
