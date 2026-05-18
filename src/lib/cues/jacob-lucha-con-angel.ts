import type { Cue } from '../narrationCues';

/**
 * Cues for "Jacob lucha con el ángel en Peniel".
 * Pins: jacob(0). Escenario: vado del Jaboc / Peniel [589, 357].
 */
const CUES: Cue[] = [
  // Jacob solo en la oscuridad
  { match: /Jacob|Yaʿq[ūu]b/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // El vado del Jaboc / cruce de la familia
  { match: /vado del Jaboc|Jaboc|hace pasar.{0,16}vado|Peniel/i, cueId: 'fx:water-wave', data: { position: [589, 357] } },
  // El "varón" / ángel desciende
  { match: /var[oó]n|[áa]ngel.{0,20}(lucha|combat)|adversario|malaj|ish/i, cueId: 'fx:angel-descent', data: { position: [589, 357] } },
  // La lucha hasta el alba — sacudida
  { match: /luch[oó] con [eé]l|lucha nocturna|hasta el alba|hasta que rayaba|combate/i, cueId: 'fx:earthquake-shake', data: { pinIdx: 0, intensity: 3 } },
  // Toca la cuenca del muslo — Jacob queda cojo
  { match: /encaje del muslo|descoyunt[oó]|tend[oó]n|cojeando|cojo al amanecer/i, cueId: 'fx:lightning-strike', data: { from: [589, 320], to: [589, 357] } },
  // Bendición — "no te dejaré si no me bendices"
  { match: /no te dejar[ée] si no me bendices|bend[íi]ceme|le bendijo all[íi]/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Cambio de nombre Jacob → Israel
  { match: /Israel|no se dirá más tu nombre|nuevo nombre|Yisra.?el/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Peniel — "rostro de Dios"
  { match: /Peniel|rostro de Dios|vi a Dios cara a cara/i, cueId: 'fx:glow-pulse', data: { position: [589, 357], color: '#e6d4a0' } },
];

export default CUES;
