import type { Cue } from '../narrationCues';

/**
 * Cues for "Anunciación a María".
 * Pins: maria(0), gabriel(1), jesus(2).
 */
const CUES: Cue[] = [
  // Gabriel desciende
  { match: /Gabriel|arc[áa]ngel|[áa]ngel.{0,12}enviado|Jibr[ií]l|el [aá]ngel/i, cueId: 'fx:angel-descent', data: { pinIdx: 1 } },
  // María recibe el saludo — emerge
  { match: /Mar[ií]a|joven .{0,10}prometida|sierva del Se[ñn]or|llena de gracia/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Saludo angélico / halo divino
  { match: /alegrate|al[eé]grate|sa[lv]ve|bendita t[uú]|Esp[ií]ritu Santo vendr[áa]/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Concepción / sombra del Altísimo — pulso glorioso
  { match: /concebir[áa]s|conciba|sombra del Alt[ií]simo|Hijo del Alt[ií]simo|por obra del Esp[ií]ritu/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Nombre Jesús anunciado
  { match: /llamar[áa]s.{0,6}Jes[uú]s|su nombre.{0,6}Jes[uú]s|Ungido|Mes[ií]as/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#ffd27a' } },
  // María consiente — hágase
  { match: /h[áa]gase en m[ií]|seg[uú]n tu palabra|consentimiento/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Versión coránica — Espíritu como hombre perfecto
  { match: /hombre perfecto|mortal de complexi[oó]n|sura.{0,6}Maryam|se refugia en el Misericordioso/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
];

export default CUES;
