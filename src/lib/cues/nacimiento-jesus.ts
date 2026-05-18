import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Jesús".
 * Pins: jesus(0), maria(1), jose-de-nazaret(2), melchor(3), gaspar(4), baltasar(5).
 */
const CUES: Cue[] = [
  // Viaje Nazaret -> Belén (empadronamiento)
  { match: /empadronamiento|censo|C[eé]sar Augusto|sube de Nazaret|de Nazaret a Bel[eé]n/i, cueId: 'fx:journey-trace', data: { from: [579, 353], to: [581, 364] } },
  // Niño nace — emerge en pesebre, polvo del establo
  { match: /pesebre|dio a luz|primog[eé]nito|envolvi[oó] en pa[ñn]ales|naci[oó] en Bel[eé]n/i, cueId: 'fx:dust-burst', data: { pinIdx: 0 } },
  // María — emerge
  { match: /Mar[ií]a.{0,30}(madre|recost[oó]|dio a luz)|virgen Mar[ií]a/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // José emerge
  { match: /Jos[eé].{0,30}(padre|acompa[ñn]a|empadronamiento)|carpintero|casa de David/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Jesús resplandeciente — halo
  { match: /Salvador|Cristo el Se[ñn]or|Verbo encarnado|Verbo hecho carne|Hijo de Dios/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Pastores y coro angélico — ángel desciende
  { match: /pastores|coro celest[ií]al|coro ang[eé]lico|gloria a Dios en las alturas|[áa]ngel del Se[ñn]or/i, cueId: 'fx:angel-descent', data: { position: [581, 350] } },
  // Estrella y magos llegan
  { match: /estrella|magos de Oriente|oro.{0,6}incienso.{0,6}mirra|Melchor|Gaspar|Baltasar/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Estrella de Belén figurativa
  { match: /estrella|estrella de Bel[eé]n|estrella de Oriente|astro|guiaba.{0,10}estrella/i, cueId: 'fx:star-bethlehem', data: { position: [581, 354] } },
  // Versión coránica — palmera datilera
  { match: /palmera|d[áa]tiles|arroyuelo|sacudir|lugar apartado|habla desde la cuna/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
];

export default CUES;
