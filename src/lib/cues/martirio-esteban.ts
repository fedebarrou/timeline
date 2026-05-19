import type { Cue } from '../narrationCues';

/**
 * Cues for "Martirio de Esteban".
 * Pins: esteban(0), pablo(1).
 */
const CUES: Cue[] = [
  // Esteban elegido — diácono lleno del Espíritu
  { match: /Esteban|di[áa]cono|siete varones|helenista|lleno de fe|lleno del Esp[ií]ritu/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Rostro como un ángel — halo
  { match: /rostro.{0,12}[áa]ngel|gracia y poder|grandes prodigios|llen[oó] de gracia/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Discurso ante el Sanedrín — historia de Israel
  { match: /Sanedr[ií]n|discurso|recorre la historia|Abraham.{0,12}Mois[eé]s|sinagoga de los Libertos/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
  // Visión de los cielos abiertos — flash blanco
  { match: /cielos abiertos|veo los cielos|mira al cielo/i, cueId: 'fx:flash-white' },
  // Hijo del Hombre a la diestra — halo + luz
  { match: /Hijo del Hombre.{0,20}diestra|de pie a la diestra de Dios/i, cueId: 'fx:divine-light-beam', data: { position: [582, 355] } },
  // Visión — halo de gloria
  { match: /cielos abiertos|Hijo del Hombre.{0,20}diestra|veo los cielos|mira al cielo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Lo apedrean — sangre
  { match: /apedrear|lapidaci[oó]n|lapidad|lo arrastran fuera|piedras/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Saulo custodia los mantos — emerge Pablo
  { match: /Saulo|joven llamado Saulo|consent[ií]a en su muerte|mantos.{0,12}pies/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Esteban muere — perdón final
  { match: /Se[ñn]or Jes[uú]s.{0,12}recibe mi esp[ií]ritu|no les tomes en cuenta|durmi[oó]|primer m[áa]rtir/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Fade to black — martirio
  { match: /durmi[oó]|primer m[áa]rtir|entreg[oó] el esp[ií]ritu|muri[oó] apedreado/i, cueId: 'fx:fade-to-black' },
];

export default CUES;
