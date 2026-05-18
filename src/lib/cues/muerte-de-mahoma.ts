import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Mahoma".
 * Pins: mahoma(0), aisha(1), abu-bakr(2), ali(3), fatima(4). Escenario: Medina [620, 440].
 */
const CUES: Cue[] = [
  // Mahoma muere
  { match: /Mahoma.{0,20}(muere|fallec|muri[oó])|el Profeta muere|fin de la revelaci[oó]n|en los brazos de [ʿ']?[ĀA][ʾ']?isha|reposando sobre su pecho/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // ʿĀʾisha lo cuida
  { match: /[ʿ']?[ĀA][ʾ']?isha|esposa.{0,15}cuida|cámara de [ʿ']?[ĀA][ʾ']?isha|enterrado en su cámara/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Abū Bakr primer califa, discurso
  { match: /Ab[ūu] Bakr|primer califa|quien adoraba a Mu[ḥh]ammad|Dios est[áa] vivo y nunca muere|Sura 3:144|Mu[ḥh]ammad no es sino un Mensajero/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // ʿAlī lava el cuerpo
  { match: /[ʿ']?Al[ií].{0,30}(lava|cuerpo|funeral|junto al cuerpo)/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Fāṭima — hija
  { match: /F[āa][ṭt]ima|única hija sobreviviente|hija del Profeta|muere seis meses después/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Halo divino — final de la revelación
  { match: /fin de la revelaci[oó]n|Sura Az-Zumar 39:30|t[úu] morir[áa]s|partida del Profeta|alma del Profeta|trono divino/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Resplandor apagado — duelo
  { match: /duelo|consternaci[oó]n|tristeza de la umma|llanto de Medina|Saq[īi]fa|sucesi[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a7a90' } },
];

export default CUES;
