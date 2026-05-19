import type { Cue } from '../narrationCues';

/**
 * Cues for "Peregrinación de Despedida y Sermón de Arafat".
 * Pins: mahoma(0). Meca [625, 460] → Monte Arafat [625, 461].
 * NOTA: 'kaaba' es scene-object en este evento → usar fx:animate-scene-object en vez de fx:kaaba-pulse.
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
  { match: /serm[oó]n.{0,15}despedida|testamento moral|testamento jur[ií]dico|[ḤH]ajjat al-Wad[āa][ʿ']?|discurso de [ʿ']?Araf[āa]t/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 461] } },
  // Resplandor sobre Arafat
  { match: /D[ūu] al-[ḤH]ijja|d[ií]a nueve|el d[ií]a del wuq[ūu]f|perfecci[oó]n.{0,15}religi[oó]n|Hoy he perfeccionado/i, cueId: 'fx:glow-pulse', data: { position: [625, 461], color: '#ffd27a' } },
  // Kaaba animada — escena-objeto en este evento
  { match: /Kaaba|santuario.{0,20}(Meca|sagrado)|circunvalaci[oó]n|[ṭt]aw[āa]f|Piedra Negra|al-[ḤH]ajar al-Aswad/i, cueId: 'fx:animate-scene-object', data: { id: 'kaaba', kind: 'pulse' } },
  // Sacrificio del cordero — Eid al-Adha, rito del Hajj
  { match: /sacrificio.{0,15}(animal|Eid|cordero|oveja)|Eid al-A[dḍ][ḍd]h[āa]|inmolaci[oó]n ritual|nahr/i, cueId: 'fx:ram', data: { position: [625, 461] } },
  // Adhan — llamada a la oración sobre los peregrinos
  { match: /adh[āa]n|ll[áa]mada a la oraci[oó]n|Bil[āa]l recita|"All[āa]hu Akbar"|takb[íi]r/i, cueId: 'fx:trumpet-blast', data: { position: [625, 461] } },
  // Luz de Arafat al atardecer — wuqūf al caer el sol
  { match: /puesta de sol.{0,15}[ʿ']?Araf[āa]t|wuq[ūu]f al atardecer|sol se pone|crepúsculo.{0,15}[ʿ']?Araf[āa]t/i, cueId: 'fx:dusk-fall', data: {} },
  // Caravana de Hajj regresa — cierre del ciclo
  { match: /caravana.{0,15}(regres|vuelv)|retorno a Medina|vuelta.{0,15}Medina|fin del [ḤH]ajj/i, cueId: 'fx:caravan', data: { from: [625, 461], to: [620, 440] } },
  // Luz divina — la religión completa brilla sobre la umma
  { match: /religi[oó]n completa|Islam completo|gracia.{0,15}perfeccionada|Dios ha completado/i, cueId: 'fx:divine-light-beam', data: {} },
  // Estrellas del firmamento — noche en Muzdalifa
  { match: /Muzdalifa|noche.{0,15}[ḤH]ajj|cielo estrellado.{0,15}peregrinos|pernoctar.{0,15}Muzdalifa|recolecci[oó]n de piedras/i, cueId: 'fx:starfield-rotate', data: {} },
];

export default CUES;
