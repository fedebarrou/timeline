import type { Cue } from '../narrationCues';

/**
 * Cues for "La Hégira: migración a Medina".
 * Pins: mahoma(0), abu-bakr(1), ali(2). Meca [625, 460] → Medina [620, 440].
 * CUMBRE — 20-30 cues.
 * NOTA: 'camello-hegira' es scene-object → usar fx:animate-scene-object, NO fx:camel-train.
 */
const CUES: Cue[] = [
  // Traza Meca → Medina (la Hégira)
  { match: /H[ée]gira|fuga.{0,15}Yathrib|migraci[oó]n a Medina|hacia Medina|de La Meca a Medina|huy[óo].{0,15}Yathrib/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [620, 440] } },
  // Camello de la Hégira animado — scene-object
  { match: /camello|dromedario|montura.{0,15}Profeta|la bestia elegida|animal de viaje/i, cueId: 'fx:animate-scene-object', data: { id: 'camello-hegira', kind: 'walk' } },
  // Polvo del camino
  { match: /noche.{0,15}fuga|escapar|salir de noche|camino del norte|gu[íi]a beduino|ruta costera/i, cueId: 'fx:dust-burst', data: { position: [620, 450] } },
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
  { match: /a[ñn]o cero|calendario isl[áa]mico|hijri|A[ñn]o de la H[ée]gira/i, cueId: 'fx:glow-pulse', data: { position: [620, 440], color: '#ffd27a' } },
  // Noche de la fuga — oscuridad protectora
  { match: /noche sin luna|noche oscura|al abrigo de la noche|oscuridad les cubrió|velada la luna/i, cueId: 'fx:night-fall', data: {} },
  // Los Quraysh rodean la casa del Profeta — tensión
  { match: /Quraysh.{0,20}(rodearon|vigilaban|acechaban|plan de asesinato)|conspiración.{0,15}Quraysh|asesinar al Profeta/i, cueId: 'fx:sword-strike', data: { from: [625, 460], to: [625, 462] } },
  // Polvo al salir por la ventana trasera
  { match: /salida discreta|escap[oó].{0,15}ventana|puerta trasera|sin ser visto|cruzó el umbral en silencio/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
  // Caravana beduina — tramo por la costa
  { match: /caravana.{0,15}(beduina|costa)|Ruta del Mar Rojo|camino costero|rodeo por el desierto/i, cueId: 'fx:caravan', data: { from: [625, 460], to: [620, 450] } },
  // Paloma anida en la cueva — milagro
  { match: /paloma.{0,15}(cueva|nido|anid)|paloma blanca anidó/i, cueId: 'fx:dove-flight', data: { from: [625, 460], to: [625, 458] } },
  // Estrellas guían el camino — orientación astronómica
  { match: /guiado por las estrellas|estrella guía|orientaci[oó]n en el desierto|firmamento como mapa/i, cueId: 'fx:starfield-rotate', data: {} },
  // Bienvenida en Yathrib / Medina — alegría
  { match: /bienvenida.{0,15}(Medina|Yathrib)|ansar.{0,15}(recib|aclam|recibieron)|talaa al-badru|"Ha salido la luna llena"/i, cueId: 'fx:radial-bloom', data: {} },
  // Luz del amanecer sobre Medina — llegada
  { match: /llegar.{0,15}Medina|llegada a Medina|entrar.{0,15}Medina|amanecer.{0,15}Medina|alba.{0,15}Yathrib/i, cueId: 'fx:dawn-break', data: {} },
  // Lanza hincada — el camello elige el lugar de la mezquita
  { match: /camello.{0,15}(se detuvo|se arrodill[oó]|elig[ií][oó])|primera mezquita|masjid al-taqwa|suelo de la mezquita/i, cueId: 'fx:glow-pulse', data: { position: [620, 440], color: '#ffd27a' } },
  // Hermandad muhajirun-ansar — nuevo lazo social islámico
  { match: /fraternidad|hermandad.{0,15}(muhajirun|ansar)|mu[ʾ'][āa]j[āa]t|nuevo v[íi]nculo/i, cueId: 'fx:divine-light-beam', data: {} },
  // Cierre cinematográfico — inicio de la era islámica
  { match: /a[ñn]o 1 de la H[ée]gira|primero de mu[ḥh]arram|nueva era|calendario lunar islámico inaugurado/i, cueId: 'fx:flash-white', data: {} },
];

export default CUES;
