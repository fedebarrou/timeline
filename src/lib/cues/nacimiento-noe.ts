import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Noé".
 * Pins: noe(0), lamec(1), matusalen(2), jared(3).
 */
const CUES: Cue[] = [
  // Lamec engendra — pulso paterno
  { match: /Lamec|engendr[oó] un hijo|a los 182|ciento ochenta y dos/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#e6d4a0' } },
  // Noé nace — luz cálida (descanso, consuelo)
  { match: /No[eé]|Noaj|descanso|consuelo|aliviar[áa]/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Profecía de Lamec — destello dorado sobre Noé
  { match: /nos consolar[áa]|alivio futuro|profec[ií]a paterna|tierra que .{0,8}maldijo|maldici[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Matusalén bendice — el más longevo
  { match: /Matusal[eé]n|m[áa]s longevo|cuando él muera|Metushelaj/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#d8c890' } },
  // Memoria de Jared (bisabuelo, ya muerto)
  { match: /Jared|bisabuelo|antepasado/i, cueId: 'fx:glow-pulse', data: { pinIdx: 3, color: '#9a8a6a' } },
  // Nacimiento sobrenatural según 1 Enoc — cuerpo radiante
  { match: /cuerpo radiante|blanco como la nieve|cabellos rojos|ilumina toda la casa|hijo de los Vigilantes/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffffff' } },
];

export default CUES;
