import type { Cue } from '../narrationCues';

/**
 * Cues for "Anunciación a María".
 * Pins: maria(0), gabriel(1), jesus(2).
 * CUMBRE — 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Ángel / Gabriel desciende — figurativo
  { match: /Gabriel|arc[áa]ngel|[áa]ngel.{0,12}enviado|Jibr[ií]l|el [áa]ngel/i, cueId: 'fx:angel-descent', data: { pinIdx: 1 } },
  // Ángel-formación (variante de llegada gloriosa)
  { match: /descendido del cielo|enviado por Dios|presencia celestial|mensajero divino/i, cueId: 'fx:angel-formation', data: { position: [579, 349] } },
  // Paloma / Espíritu Santo — variante evangelio
  { match: /Esp[ií]ritu Santo.{0,20}(vendr[áa]|cubrir[áa]|descender)/i, cueId: 'fx:dove-flight', data: { from: [579, 340], to: [579, 353] } },
  // Nube / gloria / sombra del Altísimo — luz divina
  { match: /sombra del Alt[ií]simo|poder del Alt[ií]simo|gloria de Dios/i, cueId: 'fx:divine-light-beam', data: { position: [579, 353] } },
  // Luz radiante anunciación — bloom epifánico
  { match: /llena de gracia|Kech[áa]rit[oō]m[eé]ne|gracia.{0,12}plena/i, cueId: 'fx:radial-bloom', data: { position: [579, 353] } },
  // Halo sobre María
  { match: /Mar[ií]a|joven .{0,10}prometida|sierva del Se[ñn]or|llena de gracia/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Flash de revelación divina
  { match: /alegrate|al[eé]grate|sa[lv]ve|bendita t[uú]/i, cueId: 'fx:flash-white' },
  // Concepción — halo concepción
  { match: /concebir[áa]s|conciba|por obra del Esp[ií]ritu|Hijo del Alt[ií]simo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Luz dorada concepción — glow pulse sobre María
  { match: /concebir[áa]s|conciba|sombra del Alt[ií]simo|Hijo del Alt[ií]simo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Nombre Jesús — halo sobre el futuro niño
  { match: /llamar[áa]s.{0,6}Jes[uú]s|su nombre.{0,6}Jes[uú]s|Ungido|Mes[ií]as/i, cueId: 'fx:halo-divine', data: { pinIdx: 2 } },
  // Jesús como Hijo de David — glow
  { match: /trono de David|reinará.{0,12}siempre|su reino no tendr[áa] fin/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },
  // Isabel encinta — noticia
  { match: /Isabel.{0,30}(embarazada|encinta|concibió)|en el sexto mes|estéril|pariente tuya/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Voz del cielo / para Dios nada es imposible
  { match: /para Dios nada es imposible|ninguna cosa ser[áa] imposible|no hay nada imposible/i, cueId: 'fx:divine-light-beam', data: { position: [579, 348] } },

  // ── Pasada 2: narrativa (personajes, momentos cumbre) ─────────────────

  // Gabriel emerge
  { match: /Gabriel|arc[áa]ngel|[áa]ngel.{0,12}Dios/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // María emerge con asombro
  { match: /Mar[ií]a.{0,20}(turbada|perturbada|no entendía)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // María inclina
  { match: /h[áa]gase en m[ií]|seg[uú]n tu palabra|consentimiento|sierva del Se[ñn]or/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Zoom sobre María al momento del fiat
  { match: /h[áa]gase en m[ií]|seg[uú]n tu palabra/i, cueId: 'fx:zoom-pulse' },
  // Gabriel recede tras el mensaje
  { match: /el [áa]ngel se fue|se alej[oó] el [áa]ngel|partió el ángel|Gabriel.{0,20}abandon[oó]/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Vignette en el fiat — enfocar el momento
  { match: /h[áa]gase en m[ií]|consentimiento|sierva|seg[uú]n tu palabra/i, cueId: 'fx:vignette-pulse' },
  // Jesús concebido — emerge simbólico
  { match: /concebir[áa]s|conciba|en tu seno|fruto de tu vientre/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // ── Pasada 3: versión coránica y diálogo ──────────────────────────────

  // Versión coránica — Espíritu como hombre perfecto
  { match: /hombre perfecto|mortal de complexi[oó]n|sura.{0,6}Maryam|se refugia en el Misericordioso/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Final — bloom de resumen
  { match: /Mar[ií]a.{0,20}(concibi[oó]|qued[oó] encinta|fruto)/i, cueId: 'fx:radial-bloom', data: { position: [579, 353] } },
  // Noche de la anunciación
  { match: /noche|anochec[ií]a|oscurec[ií]a/i, cueId: 'fx:night-fall' },
  // Estrella en el horizonte — presagio
  { match: /estrella|presagio|se[ñn]al/i, cueId: 'fx:starfield-shimmer' },
];

export default CUES;
