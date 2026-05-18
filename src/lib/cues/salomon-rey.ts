import type { Cue } from '../narrationCues';

/**
 * Cues for "Salomón, el rey sabio".
 * Pins: salomon(0).
 */
const CUES: Cue[] = [
  // Salomón ungido en Gihón mientras Adonías celebraba
  { match: /Salom[oó]n|Sulaym[āa]n|Gih[oó]n|ungid|sucede a David|Adon[ií]as/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sueño en Gabaón — pide lo que quieras
  { match: /sue[ñn]o en Gaba[oó]n|pide lo que quieras|aparece en sue[ñn]os|mil holocaustos|lugar alto/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Corazón que escucha / sabiduría
  { match: /coraz[oó]n entendido|coraz[oó]n que escucha|lev shom[eé]a|sabidur[ií]a|corazón sabio/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Juicio de las dos madres
  { match: /dos madres|partir.{0,8}ni[ñn]o|verdadera madre|entra[ñn]as se conmovieron|prostitutas|espada/i, cueId: 'fx:lightning-strike', data: { from: [582, 358], to: [582, 363] } },
  // Lenguaje de las aves y las hormigas (Corán)
  { match: /lenguaje de las aves|hormigas|abubilla|Hudhud|favor manifiesto|Sulaymān heredó/i, cueId: 'fx:dove-flight', data: { position: [585, 360] } },
  // Jinns / demonios construyen — vientos sometidos
  { match: /jinns|shay[āa][ṭt][īi]n|demonios|vientos|sello de Sulaym[āa]n|le es sometido|mihrabs/i, cueId: 'fx:smoke-rise', data: { position: [582, 363] } },
  // Muerte: termita carcome el bastón (Corán)
  { match: /termita|bast[oó]n|apoyado en su bast[óo]n|los jinns siguen trabajando|no conoc[ií]an lo oculto/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Edad de oro: 3000 proverbios, 1005 cantares
  { match: /3000 proverbios|1005 cantares|reyes vienen a o[ií]rlo|edad de oro|riquezas|comercio|Ofir/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
];

export default CUES;
