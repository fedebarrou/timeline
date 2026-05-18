import type { Cue } from '../narrationCues';

/**
 * Cues for "Moisés mata al egipcio y huye a Madián".
 * Pins: moises(0), sefora(1), yetro(2).
 */
const CUES: Cue[] = [
  // Moisés adulto sale a ver a sus hermanos
  { match: /Mois[ée]s.{0,15}(adulto|cuarenta|40 años)|visitar a sus hermanos|sali[óo] a ver/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Mata al egipcio — sangre
  { match: /mat[óo] al egipcio|golpe[óo].{0,15}hebreo|puñetazo|le peg[óo]|escondi[óo].{0,10}arena/i, cueId: 'fx:blood-stain', data: { position: [515, 405] } },
  // Huida al desierto — caravana / trazo
  { match: /huy[óo].{0,15}Madi[áa]n|huida|huir|escap[óo]|exilio/i, cueId: 'fx:journey-trace', data: { from: [515, 405], to: [565, 422] } },
  // Pozo de Madián
  { match: /pozo|abrevar|defendi[óo].{0,15}(hijas|pastoras)|rebaño/i, cueId: 'fx:water-wave', data: { position: [565, 422] } },
  // Séfora y suegro
  { match: /S[ée]fora|hija de Reuel|hijas del sacerdote/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  { match: /Jetr[oó]|Yetro|Reuel|Shu.?ayb|suegro|sacerdote de Madi[áa]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Arrepentimiento coránico
  { match: /arrepent|obra de Sat[áa]n|perd[óo]name|injusto conmigo mismo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Pastoreo 40 años — pulso lento
  { match: /pastor|cuarenta años.{0,20}pastor|Gers[óo]n|forastero/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6d4a0' } },
];

export default CUES;
