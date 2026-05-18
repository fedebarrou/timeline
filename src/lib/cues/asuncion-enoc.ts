import type { Cue } from '../narrationCues';

/**
 * Cues for "Asunción de Enoc".
 * Pins: enoc(0), jared(1), vigilantes(2), semjaza(3).
 */
const CUES: Cue[] = [
  // "Caminó con Dios" — pulso de gloria sobre Enoc
  { match: /camin[oó] con Dios|365 a[ñn]os|agrad[oó] a Dios|por la fe Enoc/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Asunción — Enoc desaparece
  { match: /desapareci[oó]|le llev[oó] Dios|traspuesto|para no ver muerte|elevamos a un lugar|elevado al cuarto cielo/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Jared queda solo — pulso reverente
  { match: /Jared|padre/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },
  // Identificación con Idris (Corán)
  { match: /Idris|ver[áa]z|profeta|Mi['']?raj/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#f6e6a8' } },
  // Sentencia a los Vigilantes — encadenados al abismo
  { match: /Vigilantes|encarcelad|atados|bajo las monta[ñn]as|bajo las colinas/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Semjaza atado 70 generaciones
  { match: /Semjaza|70 generaciones|setenta generaciones/i, cueId: 'fx:character-recede', data: { pinIdx: 3 } },
];

export default CUES;
