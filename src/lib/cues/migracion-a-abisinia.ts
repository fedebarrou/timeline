import type { Cue } from '../narrationCues';

/**
 * Cues for "Migración a Abisinia (primera Hégira)".
 * Pins: mahoma(0), jafar-ibn-abi-talib(1), negus(2). Meca [625, 460] → Abisinia [600, 500].
 */
const CUES: Cue[] = [
  // Traza de la travesía Meca → Abisinia (Mar Rojo)
  { match: /Abisinia|Aksum|al-[ḤH]abasha|Etiop[íi]a|cruzar el Mar Rojo|exilio en Abisinia|travesía/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [600, 500] } },
  // Mar Rojo — agua
  { match: /Mar Rojo|barco|embarcaci[oó]n|navegar|travesía mar[ií]tima/i, cueId: 'fx:water-wave', data: { position: [610, 480] } },
  // Mahoma envía
  { match: /Mahoma|el Profeta|Muḥammad|envía a los musulmanes|envía a los m[áa]s vulnerables/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Jaʿfar ibn Abī Ṭālib portavoz ante el Negus
  { match: /Ja[ʿ']?far|primo del Profeta|portavoz|recita.{0,15}(Maryam|Sura)|encabeza el segundo grupo/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Negus, rey cristiano protector
  { match: /Negus|rey cristiano|Aksum|soberano|llora con sus obispos|asilo|rechaza la extradici[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Sura Maryam recitada — pergamino desplegado
  { match: /Sura Maryam|recitaci[oó]n.{0,15}Mar[ií]a|Jes[úu]s.{0,10}coránico|escucha la recitaci[óo]n/i, cueId: 'fx:scroll-unfurl', data: { position: [600, 500] } },
  // Halo divino — protección cristiana sobre los musulmanes perseguidos
  { match: /protecci[oó]n|asilo cristiano|signos|providencia|primera H[ée]gira/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Lágrimas del Negus al escuchar la sura — emotional glow
  { match: /Negus llora|lágrimas|Bar[áa]ja .{0,8}mismas fuentes|hu[íi]a la luz/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#cfe6c8' } },
];

export default CUES;
