import type { Cue } from '../narrationCues';

/**
 * Cues for "El llamado de Abraham".
 * Pins: abraham(0), sara(1), lot(2). Origen Harán [600, 245], destino Siquem [580, 350], luego Betel [581, 358].
 */
const CUES: Cue[] = [
  // Abraham obedece y emerge
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sara/Sarai acompañando
  { match: /Sara|Saray|Sarah|esposa.{0,8}Abraham/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Lot sobrino
  { match: /Lot.{0,18}(sobrino|acompa[ñn]a|única pariente)|sobrino que/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Llamado divino — halo
  { match: /lej.lej[áa]|vete de tu tierra|sal de tu tierra|sal de tu parentela|llamado divino|orden divina/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Migración Harán → Siquem
  { match: /de Har[áa]n a Siquem|parte de Har[áa]n|migraci[oó]n|caravana|ruta del Levante/i, cueId: 'fx:journey-trace', data: { from: [600, 245], to: [580, 350], style: 'caravan' } },
  // Avance Siquem → Betel
  { match: /Betel|edifica.{0,16}altar|construye un altar|encina de Mor[ée]|hacia el sur del pa[íi]s/i, cueId: 'fx:journey-trace', data: { from: [580, 350], to: [581, 358], style: 'walking' } },
  // Promesa de descendencia
  { match: /naci[oó]n grande|engrandeceré tu nombre|bendecir[ée]|todas las familias de la tierra|descendencia/i, cueId: 'fx:glow-pulse', data: { position: [580, 350], color: '#fff1c0' } },
];

export default CUES;
