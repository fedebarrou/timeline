import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Juan el Bautista".
 * Pins: juan-bautista(0), zacarias(1), isabel(2).
 */
const CUES: Cue[] = [
  // Isabel da a luz — emerge
  { match: /Isabel.{0,30}(da a luz|dio a luz|alumbr[oó])|naci[oó] un hijo|cumpli[oó] el tiempo/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Niño Juan nace — emerge
  { match: /Juan.{0,20}(naci[oó]|recibe el nombre|recien nacido)|circuncid|se llamar[áa] Juan/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Zacarías recobra la voz
  { match: /Zacar[ií]as|recobr[oó].{0,12}voz|recobr[oó].{0,12}habla|tablilla|escrib[ií]a/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Benedictus — Espíritu Santo profecía
  { match: /Benedictus|bendito el Se[ñn]or|profet[ií]a|profeta del Alt[ií]simo|preparar sus caminos/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Niño crece, lleno del Espíritu
  { match: /lleno del Esp[ií]ritu|crec[ií]a y se fortalec[ií]a|temeroso de Dios|sabidur[ií]a/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Va al desierto — recede
  { match: /desierto|estuvo en el desierto|manifestaci[oó]n a Israel/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
