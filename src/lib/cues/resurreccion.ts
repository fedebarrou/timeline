import type { Cue } from '../narrationCues';

/**
 * Cues for "Resurrección de Jesús".
 * Pins: jesus(0), maria-magdalena(1), pedro(2), juan-apostol(3).
 */
const CUES: Cue[] = [
  // Tumba vacía — piedra removida
  { match: /sepulcro vac[ií]o|tumba vac[ií]a|piedra removida|piedra .{0,6}corrida|no est[áa] aqu[ií]/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
  // Ángel anuncia "ha resucitado"
  { match: /[áa]ngel.{0,30}(anuncia|dice)|ha resucitado|resucit[oó]|tercer d[ií]a/i, cueId: 'fx:angel-descent', data: { position: [582, 360] } },
  // María Magdalena — primera testigo
  { match: /Magdalena|Rabun[ií]|le llama por su nombre|primera testigo|hortelano/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Cristo aparece — gran luz / halo
  { match: /Jes[uú]s.{0,12}(aparece|se aparece)|apariciones|se hace encontradizo|cristo vuelve/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Jesús vuelve — emerge
  { match: /resucitado|cuerpo glorioso|Pascua|primer d[ií]a de la semana/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pedro corre al sepulcro
  { match: /Pedro y .{0,8}Juan corren|corren al sepulcro|entr[oó] en el sepulcro|lienzos/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Emaús — al partir el pan
  { match: /Ema[uú]s|al partir el pan|dos disc[ií]pulos|camino de Ema[uú]s|reconocen/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Tomás — toca las llagas
  { match: /Tom[áa]s|toca las llagas|no seas incr[eé]dulo|Se[ñn]or m[ií]o y Dios m[ií]o/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
];

export default CUES;
