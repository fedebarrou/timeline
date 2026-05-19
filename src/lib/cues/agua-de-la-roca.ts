import type { Cue } from '../narrationCues';

/**
 * Cues for "Agua de la roca en Refidim".
 * Pins: moises(0), aaron(1).
 */
const CUES: Cue[] = [
  // Pueblo sin agua — murmuración
  { match: /no hab[íi]a agua|sed|murmur|riñ[óe].{0,15}Mois[ée]s|apedrear/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Calor del desierto — shimmer
  { match: /desierto.{0,15}(calor|sed|caluroso)|calor abrasador|sol del desierto/i,
    cueId: 'fx:heat-shimmer' },

  // Vara de Moisés — glow
  { match: /vara|bastón|cetro.{0,10}(Mois[ée]s|golpe)|cayado/i,
    cueId: 'fx:glow-pulse', data: { position: [552, 423], color: '#ffd27a' } },

  // Moisés golpea la roca con la vara
  { match: /golpea.{0,15}(roca|peña)|golpe[óo] la roca|cetro.{0,15}roca|vara.{0,15}peña/i,
    cueId: 'fx:earthquake-shake', data: { position: [552, 423] } },

  // Agua brota de la roca
  { match: /agua.{0,15}brot|brot[óo].{0,15}agua|sali[óo].{0,15}(agua|de ella aguas)|manantial/i,
    cueId: 'fx:water-wave', data: { position: [552, 423] } },

  // Doce manantiales (Corán + tradición rabínica)
  { match: /doce manantiales|doce arroyos|doce fuentes|una por tribu/i,
    cueId: 'fx:water-wave', data: { position: [552, 425] } },

  // Massá y Meribá — temblor / querella
  { match: /Mass[áa]|Merib[áa]|prueba|contienda|tentaron a Yahveh/i,
    cueId: 'fx:earthquake-shake', data: { position: [552, 423] } },

  // Pozo de Miriam / la roca era Cristo
  { match: /pozo de Miriam|roca era Cristo|roca espiritual|roca.{0,15}los segu[íi]a/i,
    cueId: 'fx:halo-divine', data: { position: [552, 423] } },

  // Voz de YHWH — la orden de hablar (no golpear)
  { match: /habla a la roca|[óo]yeme.{0,10}roca|manda.{0,10}roca|di a la pe[ñn]a/i,
    cueId: 'fx:divine-light-beam', data: { position: [552, 420] } },

  // Sed satisfecha / el pueblo bebe
  { match: /beb[íi]an|beber[áa]n|saci[óo].{0,10}sed|ab[re]v[áa]n|su ganado/i,
    cueId: 'fx:glow-pulse', data: { position: [552, 424], color: '#cfe6c8' } },
];

export default CUES;
