import type { Cue } from '../narrationCues';

/**
 * Cues for "Conversión de Medina: los pactos de al-ʿAqaba".
 * Pins: mahoma(0), ansar-medinenses(1). Escenario: Monte ʿAqaba, La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Mahoma recibe a las delegaciones
  { match: /Mahoma|el Profeta|recibe a las delegaciones|al-[ʿ']?Aqaba|temporada de peregrinaci[oó]n|recibir.{0,15}Yathrib/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Anṣār — habitantes de Yathrib
  { match: /An[ṣs][āa]r|auxiliadores|habitantes de Yathrib|al-Aws|al-Khazraj|delegaci[oó]n medinesa/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Pactos de al-ʿAqaba — juramento solemne
  { match: /pacto.{0,15}[ʿ']?Aqaba|primer pacto|segundo pacto|bay[ʿ']?a|juran fidelidad|compromiso de protecci[oó]n/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 460] } },
  // Halo divino sobre los Anṣār (Sura 9:100)
  { match: /Sura 9:100|At-Tawba|primeros precursores|Sura Al-[ḤH]ashr|elogio.{0,15}An[ṣs][āa]r/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Resplandor sobre la conversión
  { match: /conversi[oó]n masiva|abrazan el Islam|conversi[oó]n.{0,15}Yathrib|preparaci[oó]n.{0,15}H[ée]gira/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffd27a' } },
  // Polvo de los peregrinos en al-ʿAqaba
  { match: /Monte [ʿ']?Aqaba|peregrinaci[oó]n meccana|delegaci[oó]n nocturna|encuentro nocturno/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
];

export default CUES;
