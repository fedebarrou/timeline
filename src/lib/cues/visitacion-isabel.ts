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
  // Juan salta en el vientre
  { match: /salt[oó].{0,12}vientre|ni[ñn]o.{0,12}salt[oó]|salt[oó] de gozo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#ffd27a' } },
  // Isabel llena del Espíritu Santo
  { match: /Isabel|llen[áa].{0,6}del Esp[ií]ritu|bendita t[uú]|fruto de tu vientre/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Magnificat — gran cántico
  { match: /Magn[ií]ficat|engrandece mi alma|esp[ií]ritu se alegra|cantico de Ana/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Tres meses con Isabel y regreso
  { match: /tres meses|permaneci[oó]|regres[oó] a su casa|volvi[oó] a Nazaret/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
