import type { Cue } from '../narrationCues';

/**
 * Cues for "Peregrinación de Despedida y Sermón de Arafat".
 * Pins: mahoma(0). Meca [625, 460] → Monte Arafat [625, 461].
 */
const CUES: Cue[] = [
  // Mahoma predicador, encabeza el Hajj
  { match: /Mahoma|el Profeta|predicador|encabeza.{0,15}peregrinaci[oó]n|encabeza el [ḤH]ajj|sermón de la despedida/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Traza Meca → Arafat
  { match: /hacia [ʿ']?Araf[āa]t|peregrinaci[oó]n a [ʿ']?Araf[āa]t|monte de la Misericordia|Jabal [ʿ']?Araf[āa]t|llanura de [ʿ']?Araf[āa]t/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [625, 461] } },
  // Polvo de los peregrinos
  { match: /cien mil musulmanes|m[áa]s de cien mil|multitud de peregrinos|peregrinos|[ḤH]ajj mayor/i, cueId: 'fx:dust-burst', data: { position: [625, 461] } },
  // Halo divino — perfeccionamiento de la religión (Sura 5:3)
  { match: /Sura 5:3|al-yawma akmaltu|he perfeccionado.{0,15}religi[oó]n|completado Mi gracia|os he aprobado el Islam/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Sermón pronunciado — pergamino testamentario
  { match: /sermón.{0,15}despedida|testamento moral|testamento jur[ií]dico|[ḤH]ajjat al-Wad[āa][ʿ']?|discurso de [ʿ']?Araf[āa]t/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 461] } },
  // Resplandor sobre Arafat
  { match: /D[ūu] al-[ḤH]ijja|d[ií]a nueve|el d[ií]a del wuq[ūu]f|perfecci[oó]n.{0,15}religi[oó]n|Hoy he perfeccionado/i, cueId: 'fx:glow-pulse', data: { position: [625, 461], color: '#ffd27a' } },
];

export default CUES;
