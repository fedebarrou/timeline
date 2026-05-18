import type { Cue } from '../narrationCues';

/**
 * Cues for "Viajes misioneros de Pablo".
 * Pins: pablo(0), bernabe(1), silas(2), lucas(3).
 */
const CUES: Cue[] = [
  // Primer viaje: Antioquía -> Chipre -> Galacia
  { match: /primer viaje|Antioqu[ií]a|Chipre|Bernab[eé]|Galacia|Antioqu[ií]a de Pisidia/i, cueId: 'fx:journey-trace', data: { from: [594, 335], to: [510, 320] } },
  // Bernabé acompaña
  { match: /Bernab[eé]|levita de Chipre|Juan Marcos|disputa.{0,12}Marcos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Lapidación en Listra
  { match: /Listra|lapidado|apedrear.{0,30}Pablo|dado por muerto/i, cueId: 'fx:blood-stain', data: { position: [495, 320] } },
  // Concilio de Jerusalén
  { match: /concilio de Jerusal[eé]n|no imponer la circuncisi[oó]n|conversos gentiles|Hch 15/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
  // Segundo viaje: Silas, visión del macedonio
  { match: /segundo viaje|Silas|visi[oó]n del macedonio|pasa a Macedonia|ay[uú]danos/i, cueId: 'fx:journey-trace', data: { from: [490, 305], to: [460, 290] } },
  // Silas emerge
  { match: /Silas|profeta de Jerusal[eé]n|c[áa]rcel en Filipos/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Areópago de Atenas
  { match: /Are[oó]pago|Atenas|Dios no conocido|predica.{0,12}filos[oó]fos/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Corinto / Tesalónica — funda comunidades
  { match: /Corinto|Tesal[oó]nica|Filipos|1 Tesalonicenses|funda comunidades/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Tercer viaje: Éfeso, motín de los plateros
  { match: /tercer viaje|[ÉéEe]feso|Artemisa|mot[ií]n de los plateros|plateros/i, cueId: 'fx:journey-trace', data: { from: [490, 305], to: [500, 310] } },
  // Lucas cronista
  { match: /Lucas|m[eé]dico|cronista|tramos en primera persona|nosotros/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Regreso a Jerusalén con la colecta — arresto
  { match: /colecta|regresa a Jerusal[eé]n|arrestado|alboroto en el Templo/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
