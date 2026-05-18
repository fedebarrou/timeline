import type { Cue } from '../narrationCues';

/**
 * Cues for "La zarza ardiente".
 * Pins: moises(0), yhwh(1), aaron(2).
 */
const CUES: Cue[] = [
  // La zarza ardiente
  { match: /zarza|arbusto que ard|zarza ardiente|fuego.{0,15}(zarza|arbusto)/i, cueId: 'fx:burning-bush', data: { position: [550, 425] } },
  // No se consume — fuego que no destruye
  { match: /no se consum|arde sin consumir|fuego divino.{0,15}no destruye/i, cueId: 'fx:fire-flicker', data: { position: [550, 425] } },
  // Moisés se acerca
  { match: /Mois[ée]s|Moshe|M[ūu]s[āa]|pastoreaba|ovejas de Jetro/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Quita las sandalias / tierra santa
  { match: /quita.{0,15}sandalias|cal[zs]ado|tierra santa|valle.{0,10}Tuw[āa]|Horeb/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // YHWH / Yo soy el que soy
  { match: /YHWH|Yahveh|Tetragrama|Yo soy el que soy|EHY[ÉE]|ehy[ée] asher|Allah|All[āa]h/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Encuentro divino — resplandor de lámpara sobre la zarza
  { match: /Yo soy el que soy|encuentro con Dios|presencia divina|tierra santa|valle.{0,10}Tuw[āa]|gloria divina/i, cueId: 'fx:lamp-glow', data: { position: [550, 425] } },
  // Signos (vara, mano blanca)
  { match: /vara.{0,15}serpiente|mano.{0,15}leprosa|mano blanca|signos/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Aarón designado portavoz
  { match: /Aar[óo]n|H[āa]r[ūu]n|portavoz|boca ante Fara[óo]n|elocuen/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
];

export default CUES;
