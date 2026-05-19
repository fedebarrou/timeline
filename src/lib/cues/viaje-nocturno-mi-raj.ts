import type { Cue } from '../narrationCues';

/**
 * Cues for "Viaje nocturno y Ascensión (Isrāʾ y Miʿrāj)".
 * Pins: mahoma(0), gabriel(1), buraq(2), profetas-anteriores(3). Meca [625, 460] → Al-Aqsa [582, 363] → Siete cielos [500, 80].
 * CUMBRE — 20-30 cues.
 * NOTA: 'media-luna-creciente' es scene-object → usar fx:animate-scene-object, NO fx:moon-bloodred ni fx:starfield-shimmer.
 */
const CUES: Cue[] = [
  // Gabriel y al-Burāq descienden a la Mezquita Sagrada
  { match: /Gabriel.{0,30}Bur[āa]q|al-Bur[āa]q|bestia celestial|bestia blanca|veloz como el rel[áa]mpago/i, cueId: 'fx:angel-descent', data: { position: [625, 460] } },
  // Viaje Meca → Jerusalén — traza del Isrāʾ
  { match: /Isr[āa][ʾʿ]?|viaje nocturno|de La Meca a Jerus[áa]l[eé]n|Masjid al-[ḤH]ar[āa]m.{0,30}Aq[ṣs][āa]|mezquita lejana/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [582, 363] } },
  // Ascensión Miʿrāj — traza hacia los siete cielos
  { match: /Mi[ʿ']?r[āa]j|ascensi[oó]n|siete cielos|sidrat al-muntah[āa]|loto del l[íi]mite|trono divino/i, cueId: 'fx:journey-trace', data: { from: [582, 363], to: [500, 80] } },
  // Halo divino — proximidad al trono y revelación del salat
  { match: /trono divino|cerca del trono|cinco oraciones|cincuenta.{0,15}cinco|institu[íi]d[ao].{0,15}oracion/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Mahoma protagonista
  { match: /Mahoma|Muhammad|Muḥammad|el Profeta/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Encuentro con los profetas anteriores
  { match: /profetas anteriores|Ad[áa]n.{0,30}Mois[eé]s|Abraham.{0,20}cielo|Idr[īi]s|Jes[úu]s.{0,15}cielo|im[āa]mat al-anbiy[āa][ʾ]?/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Revelaciones desplegadas — versículos
  { match: /Sura 17:1|Sura Al-Isr[āa]|Sura An-Najm 53|versic[uu]lo cor[áa]nico|signo divino/i, cueId: 'fx:scroll-unfurl', data: { position: [500, 80] } },
  // Resplandor sobre al-Burāq y el viaje cósmico
  { match: /noche del 27 de Rajab|consuelo divino|signos|al-amparo divin|gloria a Quien/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfd7ff' } },
  // Media luna creciente animada — scene-object
  { match: /luna creciente|media luna|l[úu]nula|creciente is[ls][áa]mica|símbolo lunar/i, cueId: 'fx:animate-scene-object', data: { id: 'media-luna-creciente', kind: 'pulse' } },
  // Gabriel emerge como guía — pinIdx 1
  { match: /Gabriel.{0,30}(guía|acompañ|conduc|l[íi]der)|gu[íi]a celestial.{0,15}Gabriel/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // al-Burāq emerge — montura celestial
  { match: /Bur[āa]q.{0,20}(emerge|aparec)|montura.{0,15}celestial|anima.{0,10}celestial|caballo alado/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Rotación del campo estelar — viaje a través de los cielos
  { match: /campos de estrellas|firmamento girand|cielos.{0,15}(girand|pasan|se abr)|galaxias|cosmos|cruzar el firmamento/i, cueId: 'fx:starfield-rotate', data: {} },
  // Luz divina que baña los siete cielos
  { match: /siete cielos.{0,20}(luz|brillan|resplan)|luz del más alto cielo|séptimo cielo|luz celestial/i, cueId: 'fx:divine-light-beam', data: {} },
  // Formación angélica — custodios de cada cielo
  { match: /[áa]ngeles custodios|guardianes del cielo|[áa]ngeles.{0,20}(porteros|puertas|cielo)|[áa]ngeles de cada cielo/i, cueId: 'fx:angel-formation', data: {} },
  // Campo de estrellas al iniciar el Miʿrāj
  { match: /ascenso.{0,15}cielo|elevación.{0,15}espiritual|subió al primer cielo|puerta del primer cielo/i, cueId: 'fx:starfield-shimmer', data: {} },
  // Incienso del Templo de Jerusalén — Mahoma lidera la oración
  { match: /Masjid al-Aq[ṣs][āa]|al-Aqsa|Templo de Jerusal[eé]n|l[íi]der la oraci[oó]n|im[āa]m de los profetas/i, cueId: 'fx:incense-spiral', data: {} },
  // Radial bloom — contacto con lo divino en la cumbre celestial
  { match: /se revel[oó]|momento del Miʿr[āa]j|apogeo de la ascensi[oó]n|instante de cercan[íi]a|qab qawsayn/i, cueId: 'fx:radial-bloom', data: {} },
  // Apertura cinematográfica — noche del viaje
  { match: /noche.{0,20}(Rajab|viaje|isr[āa]|mi'r[āa]j)|oscuridad.{0,15}sagrada|inicia el viaje nocturno/i, cueId: 'fx:fade-from-black', data: {} },
  // Regreso al amanecer — el Profeta de vuelta en La Meca
  { match: /regres[oó].{0,20}La Meca|retorno.{0,15}amanecer|La Meca al amanecer|regres[oó] antes del alba/i, cueId: 'fx:dawn-break', data: {} },
  // Incredulidad de los Quraysh — tormenta de reacciones
  { match: /incredulidad.{0,15}Quraysh|Quraysh.{0,15}(burlan|ríen|niegan)|negaci[oó]n.{0,15}viaje|se burlaron/i, cueId: 'fx:storm-clouds', data: {} },
  // Pergamino con el mandato del salat — cinco oraciones
  { match: /cinco oraciones diarias|s[áa]lat.{0,15}(cinco|5)|sal[āa]t obligat|impuesto el sal[āa]t/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 460] } },
];

export default CUES;
