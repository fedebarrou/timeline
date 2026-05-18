import type { Cue } from '../narrationCues';

/**
 * Cues for "Agua de la roca en Refidim".
 * Pins: moises(0), aaron(1).
 */
const CUES: Cue[] = [
  // Pueblo sin agua — murmuración
  { match: /no hab[íi]a agua|sed|murmur|riñ[óe].{0,15}Mois[ée]s|apedrear/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Moisés golpea la roca con la vara
  { match: /golpea.{0,15}(roca|peña)|golpe[óo] la roca|cetro.{0,15}roca|vara.{0,15}peña/i, cueId: 'fx:glow-pulse', data: { position: [552, 423], color: '#ffd27a' } },
  // Agua brota de la roca
  { match: /agua.{0,15}brot|brot[óo].{0,15}agua|sali[óo].{0,15}(agua|de ella aguas)|manantial/i, cueId: 'fx:water-wave', data: { position: [552, 423] } },
  // Doce manantiales (Corán + tradición rabínica)
  { match: /doce manantiales|doce arroyos|doce fuentes|una por tribu/i, cueId: 'fx:water-wave', data: { position: [552, 425] } },
  // Massá y Meribá
  { match: /Mass[áa]|Merib[áa]|prueba|contienda|tentaron a Yahveh/i, cueId: 'fx:earthquake-shake', data: { position: [552, 423] } },
  // Pozo de Miriam / la roca era Cristo
  { match: /pozo de Miriam|roca era Cristo|roca espiritual|roca.{0,15}los segu[íi]a/i, cueId: 'fx:halo-divine', data: { position: [552, 423] } },
];

export default CUES;
