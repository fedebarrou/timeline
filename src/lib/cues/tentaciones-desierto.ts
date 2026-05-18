import type { Cue } from '../narrationCues';

/**
 * Cues for "Tentaciones en el desierto".
 * Pins: jesus(0), satan(1).
 */
const CUES: Cue[] = [
  // Conducido al desierto por el Espíritu
  { match: /desierto|llevado por el Esp[ií]ritu|cuarenta d[ií]as|40 d[ií]as|ayuna/i, cueId: 'fx:fire-flicker', data: { position: [583, 365] } },
  // Jesús en ayuno — emerge solitario
  { match: /Jes[uú]s.{0,30}(ayuna|tuvo hambre|conducido al desierto)|ayuno y prueba/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Tentador aparece
  { match: /diablo|Satan[áa]s|tentador|Iblis|adversario/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Tentación del pan
  { match: /piedras .{0,6}pan|conviertan en pan|no s[oó]lo de pan vive|toda palabra/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#7a5a3a' } },
  // Piedras se vuelven pan — panes figurativos
  { match: /piedras .{0,6}pan|conviertan en pan|piedras se conviertan|pan vive/i, cueId: 'fx:bread-multiply', data: { position: [583, 365] } },
  // Pináculo del Templo / prodigio
  { match: /pin[áa]culo|tirate abajo|t[ií]rate|no tentar[áa]s al Se[ñn]or/i, cueId: 'fx:lightning-strike', data: { from: [582, 340], to: [583, 365] } },
  // Reinos del mundo / poder
  { match: /reinos del mundo|monte muy alto|postrado me adorares|vete.{0,6}Satan[áa]s/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#a04040' } },
  // Satanás vencido — recede
  { match: /lo deja|vencido|hasta el tiempo oportuno|diablo lo deja/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Ángeles sirven
  { match: /[áa]ngeles.{0,12}(servirle|sirven|vienen)|le confortaba/i, cueId: 'fx:angel-descent', data: { pinIdx: 0 } },
];

export default CUES;
