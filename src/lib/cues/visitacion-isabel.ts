import type { Cue } from '../narrationCues';

/**
 * Cues for "Visitación a Isabel".
 * Pins: maria(0), isabel(1), juan-bautista(2).
 */
const CUES: Cue[] = [
  // María sale presurosa — viaje a Judea
  { match: /presurosa|se levant[oó]|regi[oó]n monta[ñn]osa|montes de Jud[áa]|se fue a/i, cueId: 'fx:journey-trace', data: { from: [579, 353], to: [581, 363] } },
  // Llega y entra en casa de Zacarías
  { match: /casa de Zacar[ií]as|salud[oó] a Isabel|al o[ií]r .{0,6}saludo/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Paloma — el Espíritu que hace saltar a Juan
  { match: /Esp[ií]ritu Santo.{0,20}Isabel|por obra del Esp[ií]ritu|llen[áa].{0,6}del Esp[ií]ritu/i, cueId: 'fx:dove-flight', data: { from: [581, 352], to: [581, 363] } },
  // Juan salta en el vientre
  { match: /salt[oó].{0,12}vientre|ni[ñn]o.{0,12}salt[oó]|salt[oó] de gozo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#ffd27a' } },
  // Isabel llena del Espíritu Santo — halo
  { match: /Isabel|llen[áa].{0,6}del Esp[ií]ritu|bendita t[uú]|fruto de tu vientre/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Halo sobre María — bienaventurada
  { match: /bendita t[uú]|bienaventurada|por qu[eé] me viene|madre de mi Se[ñn]or/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Magnificat — radial bloom
  { match: /Magn[ií]ficat|engrandece mi alma|esp[ií]ritu se alegra|cantico de Ana/i, cueId: 'fx:radial-bloom', data: { position: [581, 363] } },
  // Magnificat — glow
  { match: /Magn[ií]ficat|engrandece mi alma|cántico de Mar[ií]a/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Tres meses con Isabel y regreso
  { match: /tres meses|permaneci[oó]|regres[oó] a su casa|volvi[oó] a Nazaret/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Amanecer de la esperanza mesiánica
  { match: /al que espera Israel|misericordia prometida|d[ií]a grande|grande ante el Se[ñn]or/i, cueId: 'fx:dawn-break' },
];

export default CUES;
