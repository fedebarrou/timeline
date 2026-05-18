import type { Cue } from '../narrationCues';

/**
 * Cues for "La Hégira: migración a Medina".
 * Pins: mahoma(0), abu-bakr(1), ali(2). Meca [625, 460] → Medina [620, 440].
 */
const CUES: Cue[] = [
  // Traza Meca → Medina (la Hégira)
  { match: /H[ée]gira|fuga.{0,15}Yathrib|migraci[oó]n a Medina|hacia Medina|de La Meca a Medina|huy[óo].{0,15}Yathrib/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [620, 440] } },
  // Polvo del camino
  { match: /camello|caravana|noche.{0,15}fuga|escapar|salir de noche|camino del norte|gu[íi]a beduino/i, cueId: 'fx:dust-burst', data: { position: [620, 450] } },
  // Mahoma emerge — fugitivo profeta
  { match: /Mahoma|el Profeta|Muḥammad|protagonista de la H[ée]gira/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abū Bakr compañero de la cueva (Sura 9:40)
  { match: /Ab[ūu] Bakr|compañero.{0,15}fuga|cueva de Thawr|segundo de los dos en la cueva|Sura 9:40/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // ʿAlī decoy — duerme en el lecho del Profeta
  { match: /[ʿ']?Al[ií].{0,30}(lecho|cama|decoy|engañar|durmi[oó])|duerme en el lecho/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Halo divino — providencia, Sura 9:40 "no te entristezcas, Dios está con nosotros"
  { match: /Sura 9:40|no te entristezcas|Dios est[áa] con nosotros|sak[īi]na|providencia divina|protecci[oó]n divina/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Cueva de Thawr — telaraña milagrosa
  { match: /cueva de Thawr|telara[ñn]a|paloma anida|milagro de la cueva|tres d[íi]as.{0,15}cueva/i, cueId: 'fx:glow-pulse', data: { position: [625, 458], color: '#ffe6a0' } },
  // Año cero del calendario islámico
  { match: /año cero|calendario isl[áa]mico|hijri|A[ñn]o de la H[ée]gira/i, cueId: 'fx:glow-pulse', data: { position: [620, 440], color: '#ffd27a' } },
];

export default CUES;
