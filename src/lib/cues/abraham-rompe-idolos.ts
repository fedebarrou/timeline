import type { Cue } from '../narrationCues';

/**
 * Cues for "Abraham rompe los ídolos".
 * Pins: abraham(0), tare(1), nimrod(2). Escenario: Ur de los Caldeos [665, 365].
 */
const CUES: Cue[] = [
  // Ídolos rotos — el gesto que da nombre al episodio
  { match: /[íi]dolos?|[áa]rbol.{0,4}sagrad|peda[zc]os|hacha/i, cueId: 'fx:idol-shatter', data: { position: [665, 365], count: 6 } },
  // Abraham/Ibrāhīm emerge
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // El padre Taré/Āzar
  { match: /Tar[ée]|[ĀaA]zar|taller.{0,12}padre|fabricante de [íi]dolos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Nimrod el rey
  { match: /Nimrod|rey idólatra|rey de Babilonia|tirano/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Horno de Nimrod — fuego que envuelve a Abraham
  { match: /horno|fuego|arrojarlo al fuego|frialdad y paz|llamas/i, cueId: 'fx:fire-flicker', data: { position: [665, 365] } },
  // Monoteísmo declarado — halo divino
  { match: /Dios [úu]nico|monote[ií]sm|un solo Dios|ḥan[īi]f|hanif/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Templo familiar incendiado
  { match: /incendia|incendi[oó] el templo|templo familiar|Har[áa]n.{0,16}muere/i, cueId: 'fx:smoke-rise', data: { position: [665, 365] } },
];

export default CUES;
