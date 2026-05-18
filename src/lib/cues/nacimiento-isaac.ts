import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Isaac".
 * Pins: abraham(0), sara(1), isaac(2), ismael(3). Escenario: Bersabé / Gerar [578, 372].
 */
const CUES: Cue[] = [
  // Abraham
  { match: /Abraham|Ibr[āa]h[īi]m.{0,12}(cien|100 a[ñn]os|padre)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sara y su risa
  { match: /Sara.{0,12}(noventa|90 a[ñn]os|estéril)|Sarah|risa de Sara|se r[íi][oó]|tzajak/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Isaac nace — hijo de la promesa
  { match: /Isaac|Yitzjak|Isḥ[āa]q|hijo de la promesa|reci[ée]n nacido/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Ismael el hijo mayor
  { match: /Ismael|Ism[āa][ʿʾ`]?[īi]l|hermano mayor|catorce a[ñn]os/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Anuncio milagroso de los mensajeros divinos
  { match: /buena nueva|anuncio.{0,12}nacimiento|misericordia y bendiciones|gente de la casa|mensajeros vinieron/i, cueId: 'fx:angel-descent', data: { position: [578, 372] } },
  // Promesa cumplida — halo divino
  { match: /promesa cumplida|cumplimiento de la promesa|Dios me ha hecho re[íi]r|contra toda esperanza/i, cueId: 'fx:halo-divine', data: { pinIdx: 2 } },
  // Circuncisión al octavo día — primer signo del pacto
  { match: /circuncidad[oó]|octavo d[ií]a|brit milah|señal del pacto/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#fff1c0' } },
  // Fiesta del destete y burla de Ismael — recede
  { match: /fiesta del destete|burla.{0,12}Ismael|expulsi[oó]n de Agar/i, cueId: 'fx:character-recede', data: { pinIdx: 3 } },
];

export default CUES;
