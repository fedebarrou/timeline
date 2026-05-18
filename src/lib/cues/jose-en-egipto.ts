import type { Cue } from '../narrationCues';

/**
 * Cues for "José en Egipto: de esclavo a visir".
 * Pins: jose(0). Escenario: Egipto faraónico [510, 410].
 */
const CUES: Cue[] = [
  // José/Yusuf
  { match: /Jos[ée]|Y[ūu]suf/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Casa de Putifar / al-ʿAzīz — destello al inicio del ascenso
  { match: /Putifar|Potifar|al-[ʿ`ʾ]?Az[īi]z|capit[áa]n de la guardia|el Poderoso/i, cueId: 'fx:glow-pulse', data: { position: [510, 410], color: '#e6d4a0' } },
  // Tentación de la esposa / Zulayja
  { match: /Zulayja|esposa de Putifar|requiri[oó] de amores|mujer de su amo|seducir/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a4040' } },
  // Prisión / acusación falsa — recede temporalmente
  { match: /c[áa]rcel|prisi[oó]n|encarcelad|falsamente acusad|acusación falsa/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Banquete de las damas y los dedos cortados (exclusivo del Corán)
  { match: /banquete.{0,16}damas|se cortaron las manos|cuchillo.{0,12}fruta|ángel maravilloso/i, cueId: 'fx:blood-stain', data: { position: [510, 410] } },
  // Sueños del faraón — vacas y espigas
  { match: /vacas.{0,16}espigas|siete vacas|siete espigas|sueños del fara[oó]n|sue[ñn]o del fara[oó]n/i, cueId: 'fx:scroll-unfurl', data: { position: [510, 410] } },
  // José interpreta y se eleva como visir — re-emerge
  { match: /interpret[oó] los sue[ñn]os|nombrad[oó] visir|Zafenat-paneaj|graneros del pa[íi]s|gobernador sobre Egipto/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Hambruna anunciada / siete años de hambre
  { match: /siete a[ñn]os.{0,12}hambr|hambruna|a[ñn]os de hambre/i, cueId: 'fx:dust-burst', data: { position: [510, 410] } },
];

export default CUES;
