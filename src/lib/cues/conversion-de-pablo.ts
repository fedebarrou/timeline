import type { Cue } from '../narrationCues';

/**
 * Cues for "Conversión de Pablo".
 * Pins: pablo(0), ananias(1).
 */
const CUES: Cue[] = [
  // Saulo va a Damasco persiguiendo
  { match: /Saulo|respirando amenazas|persecutor|persegu[ií]a|cartas para las sinagogas|hacia Damasco/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Luz del cielo — relámpago derribando
  { match: /luz del cielo|resplandor.{0,12}luz|repentinamente|le rode[oó]|gran resplandor/i, cueId: 'fx:lightning-strike', data: { from: [590, 320], to: [590, 345] } },
  // Cae en tierra
  { match: /cay[oó] en tierra|cay[oó] al suelo|derribado|cay[oó] del caballo/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Voz: Saulo, ¿por qué me persigues?
  { match: /por qu[eé] me persigues|Yo soy Jes[uú]s|quien eres.{0,6}Se[ñn]or|voz que le dec[ií]a/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Tres días ciego
  { match: /ciego.{0,12}tres d[ií]as|sin ver|sin comer ni beber|qued[oó] ciego/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a5a3a' } },
  // Ananías en visión
  { match: /Anan[ií]as|calle Recta|en visi[oó]n|vaso escogido|le impone las manos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Recobra la vista — escamas caen
  { match: /escamas|recobra la vista|recobr[oó] la vista|fue bautizado/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
