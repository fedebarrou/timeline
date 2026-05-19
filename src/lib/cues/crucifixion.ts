import type { Cue } from '../narrationCues';

/**
 * Cues for "Crucifixión de Jesús".
 * Pins: jesus(0), maria(1), juan-apostol(2), maria-magdalena(3).
 */
const CUES: Cue[] = [
  // Camino al Gólgota
  { match: /G[oó]lgota|Calvario|lugar de la calavera|Sim[oó]n de Cirene|cargando la cruz/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Lo crucifican — sangre
  { match: /crucifican|crucificado|clav[oó]|le abre el costado|sangre y agua|lanza/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Cruz alzada — REGLA #1: anima la 'cruz' ya en escena
  { match: /levantaron la cruz|alzaron la cruz|elev[oó].{0,10}cruz|cruz en alto|crucifix|en la cruz/i, cueId: 'fx:animate-scene-object', data: { id: 'cruz', kind: 'rise', duration: 2.4 } },
  // María al pie de la cruz
  { match: /Mar[ií]a.{0,20}(pie de la cruz|cruz|madre doliente)|he ah[ií] a tu madre/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Juan el discípulo amado / María Magdalena
  { match: /disc[ií]pulo amado|he ah[ií] a tu hijo|Magdalena|Mar[ií]a Magdalena/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Tinieblas a la hora sexta — cielo oscurece
  { match: /tinieblas|hora sexta|hora novena|el sol se oscurece|cielo .{0,12}oscurec/i, cueId: 'fx:smoke-rise', data: { position: [582, 350] } },
  // Eloí, Eloí — abandonado
  { match: /Elo[íi].{0,6}Elo[íi]|lema sabactani|Dios m[ií]o.{0,12}por qu[eé] me has abandonado|desamparado/i, cueId: 'fx:lightning-strike', data: { from: [582, 320], to: [582, 363] } },
  // Expira — encomiendo el espíritu
  { match: /expir[oó]|en tus manos encomiendo|consumado es|dio una gran voz|muri[oó]/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Velo del Templo se rasga / terremoto
  { match: /velo del Templo|velo se rasg[oó]|tierra tiembla|terremoto|rocas se parten/i, cueId: 'fx:earthquake-shake', data: { position: [582, 363] } },
  // Negación coránica
  { match: /no le mataron|no le crucificaron|les pareci[oó] as[ií]|elev[oó] a S[ií]|sustituci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
];

export default CUES;
