import type { Cue } from '../narrationCues';

/**
 * Cues for "Viaje nocturno y Ascensión (Isrāʾ y Miʿrāj)".
 * Pins: mahoma(0), gabriel(1), buraq(2), profetas-anteriores(3). Meca [625, 460] → Al-Aqsa [582, 363] → Siete cielos [500, 80].
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
  { match: /Sura 17:1|Sura Al-Isr[āa]|Sura An-Najm 53|versic[uu]lo coránico|signo divino/i, cueId: 'fx:scroll-unfurl', data: { position: [500, 80] } },
  // Resplandor sobre al-Burāq y el viaje cósmico
  { match: /noche del 27 de Rajab|consuelo divino|signos|al-amparo divin|gloria a Quien/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfd7ff' } },
];

export default CUES;
