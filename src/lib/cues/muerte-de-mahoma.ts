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
  // Fundido a negro — partida definitiva (cumbre cinematográfica)
  { match: /expir[oó]|entreg[oó] el esp[íi]ritu|exhaló su último aliento|último suspiro|parti[oó] al encuentro de Dios/i, cueId: 'fx:fade-to-black', data: {} },
  // Pergamino del Islam sellado — fin de la revelación
  { match: /fin de la profec[íi]a|último profeta|sello de los profetas|j[āa]tam al-anbiy[āa]|J[āa]tam al-Naby[īi]n|mensaje sellado/i, cueId: 'fx:scroll-unfurl', data: { position: [620, 440] } },
  // Noche cae sobre Medina — simbolismo de pérdida
  { match: /noche de duelo|oscureci[oó].{0,15}Medina|ciudad de luto|oscuridad.{0,15}umma|Medina lloró/i, cueId: 'fx:night-fall', data: {} },
  // Fiebre y dolor final — calor de la habitación
  { match: /fiebre alta|dolor de cabeza|fue[rg]te fiebre|sufrimiento final|agon[íi]a.{0,15}Profeta/i, cueId: 'fx:heat-shimmer', data: {} },
  // Ángel de la muerte — llamada al alma
  { match: /[áa]ngel de la muerte|Izrail|Izr[āa][ʾ']?[íi]l|malak al-mawt|llamada del [áa]ngel/i, cueId: 'fx:angel-descent', data: { position: [620, 440] } },
  // Luz divina de su alma ascendiendo
  { match: /alma ascendi[oó]|regresar[áa] al Se[ñn]or|regresar.{0,10}Señor|volver.{0,10}Señor|en las alturas/i, cueId: 'fx:divine-light-beam', data: {} },
  // Resplandor de la masjid en duelo — lámpara apagada
  { match: /mezquita de Medina|masjid al-nab[āa]wi|masjid nabaw[íi]|l[áa]mpara de la mezquita|l[úu]cida mezquita/i, cueId: 'fx:lamp-glow', data: { position: [620, 440] } },
  // Viento de desconcierto — umma sin guía
  { match: /desconcierto|apostas[íi]a|ridda|tribu[s]?.{0,20}rebel|[áa]rabes.{0,15}aposta/i, cueId: 'fx:wind-streaks', data: {} },
];

export default CUES;
