import type { Cue } from '../narrationCues';

/**
 * Cues for "La primera revelación en la cueva de Hira".
 * Pins: mahoma(0), gabriel(1), khadija(2), waraqa(3). Escenario: Jabal an-Nūr / Hira [625, 459].
 */
const CUES: Cue[] = [
  // Aparición del ángel Gabriel/Yibril — descenso angélico sobre la cueva
  { match: /Gabriel|Yibr[ií]l|figura luminosa|[áa]ngel.{0,18}(aparec|irrumpi|abraz)|N[āa]m[ūu]s/i, cueId: 'fx:angel-descent', data: { position: [625, 459] } },
  // Mahoma en la cueva — protagonista emerge
  { match: /Mahoma|Muhammad|Muḥammad|el Profeta|Profeta/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Primer "Iqraʾ" — versículos del Corán se despliegan como pergamino
  { match: /Iqra|recita|primer.{0,12}vers[ií]culo|Sura 96|Al-[ʿʾ]?Alaq|co[áa]gulo|primera revelaci[óo]n/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 459] } },
  // Halo divino — la revelación desciende
  { match: /revelaci[oó]n|wa[ḥh]y|Laylat al-Qadr|Noche del Destino|fatra|luz divina/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Khadīja lo cubre con el manto
  { match: /Khad[īi]ja|c[úu]breme|envolvi[oó].{0,20}manto|primera confidente|lo calm/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Waraqa el primo cristiano — confirma la profecía
  { match: /Waraqa|primo cristiano|reconoci[oó].{0,18}profeta|confirmador|este es el N[āa]m[ūu]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Resplandor sobre Mahoma — vocación profética
  { match: /vocaci[oó]n prof[eé]tica|Mensajero de Dios|Mensajero de All[āa]h|profeta de Dios/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffe6a0' } },
  // Segundo descenso angélico — Sura Al-Muddaththir tras la fatra
  { match: /Al-Muddaththir|cubierto con manto|segunda revelaci[oó]n|fatra al-wa[ḥh]y/i, cueId: 'fx:angel-descent', data: { position: [625, 459] } },
];

export default CUES;
