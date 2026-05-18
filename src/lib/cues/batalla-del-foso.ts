import type { Cue } from '../narrationCues';

/**
 * Cues for "Batalla del Foso (Ghazwat al-Khandaq)".
 * Pins: mahoma(0), salman-el-persa(1), abu-sufyan(2). Escenario: Medina [620, 440].
 */
const CUES: Cue[] = [
  // Mahoma cava la trinchera con los compañeros
  { match: /Mahoma|el Profeta|cava la trinchera|cubierto de polvo|cav[óo] personalmente|hambriento/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Salmān el persa, estratega
  { match: /Salm[āa]n al-F[āa]ris[īi]|Salm[āa]n el persa|persa converso|persa converso recientemente liberado|estratega persa|kh[ae]ndaq.{0,15}propone|propone cavar/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Polvo de la cava — trinchera
  { match: /khandaq|trinchera|cavar|seis d[íi]as|cuarenta codos|excavaci[oó]n|fortificaci[oó]n lineal/i, cueId: 'fx:dust-burst', data: { position: [620, 440] } },
  // Tormenta enviada por Dios — viento helado
  { match: /tormenta|viento.{0,15}fr[íi]o|noche de vientos|tiendas caen|hogueras se apagan|fue.{0,15}retirad|ej[ée]rcitos invisibles|Sura 33:9/i, cueId: 'fx:earthquake-shake', data: { position: [620, 440] } },
  // Halo divino — providencia (Sura Al-Aḥzāb 33:9-27)
  { match: /Sura Al-A[ḥh]z[āa]b|33:9-27|gracia de All[āa]h|ej[eé]rcitos invisibles|sak[īi]na/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Chispas y profecía — relámpago al golpear la roca
  { match: /chispas|palacios de Bizancio|castillos rojos|shah persa|profec[íi]a de las conquistas|roca dura|golpe del pico/i, cueId: 'fx:lightning-strike', data: { from: [620, 400], to: [620, 440] } },
  // Abū Sufyān retirada
  { match: /Ab[ūu] Sufy[āa]n.{0,30}(retir|abandon)|confederaci[oó]n se dispersa|retirada Quraysh/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Asedio infructuoso — humo de hogueras y desgaste
  { match: /asedio|veintisiete d[íi]as|asedio infructuoso|guerra de posiciones|hogueras del campamento/i, cueId: 'fx:smoke-rise', data: { position: [620, 440] } },
];

export default CUES;
