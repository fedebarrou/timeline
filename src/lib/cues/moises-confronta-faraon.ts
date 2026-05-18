import type { Cue } from '../narrationCues';

/**
 * Cues for "Moisés confronta a Faraón".
 * Pins: moises(0), aaron(1), faraon-opresor(2), jannes-jambres(3).
 */
const CUES: Cue[] = [
  // Moisés y Aarón entran ante Faraón
  { match: /se presentaron|entraron ante Fara[óo]n|Mois[ée]s y Aar[óo]n.{0,15}(present|antes de Fara)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Aarón habla
  { match: /Aar[óo]n.{0,15}(habla|boca|portavoz)|H[āa]r[ūu]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Demanda: deja ir a mi pueblo
  { match: /deja ir.{0,15}pueblo|salir.{0,15}desierto|sirva en el desierto|liberaci[óo]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
  // Faraón endurece corazón
  { match: /endureci[óo] su coraz[óo]n|corazón.{0,10}endurec|¿qui[ée]n es Yahveh|no conozco a Yahveh|aument[óo].{0,15}opresi[óo]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Vara se convierte en serpiente
  { match: /vara.{0,15}serpiente|serpiente.{0,15}devor|tanin|cocodrilo/i, cueId: 'fx:glow-pulse', data: { position: [515, 405], color: '#ffd27a' } },
  // Hechiceros imitan
  { match: /hechiceros|encantamientos|magos|Jan[ée]s.{0,5}Jambres|encantador/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Conversión de hechiceros (Corán)
  { match: /cayeron prosternados|creemos en el Señor|conversi[óo]n.{0,15}hechiceros|martiriz/i, cueId: 'fx:halo-divine', data: { pinIdx: 3 } },
  // Más paja, más opresión — polvo
  { match: /recoger.{0,10}paja|ladrillos|cuota|opresi[óo]n.{0,15}aument/i, cueId: 'fx:dust-burst', data: { position: [515, 410] } },
];

export default CUES;
