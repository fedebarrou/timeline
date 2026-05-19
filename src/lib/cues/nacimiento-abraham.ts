import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Abraham".
 * Pins: abraham(0), tare(1). Escenario: Ur de los Caldeos [665, 365].
 * Scene-objects: 'zigurat-ur'.
 * REGLA #1: 'zigurat-ur' → no fx:tower-babel ni fx:mountain-glow.
 */
const CUES: Cue[] = [
  // Abraham nace (Abram, padre exaltado)
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Taré padre
  { match: /Tar[ée]|setenta a[ñn]os|sacerdote.{0,12}[íi]dolos|fabricante de [íi]dolos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Ur de los Caldeos — zigurat de Nanna → scene-object (REGLA #1: no fx:tower-babel)
  { match: /Ur de los [Cc]aldeos|Tell el-Muqayyar|zigurat.{0,12}Nanna|templo de Nanna|luna sumeria/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'zigurat-ur', kind: 'glow' } },
  // Culto astral de Ur — luz nocturna
  { match: /culto astral|dios luna|luna.{0,8}Ur|Nanna|Sin.{0,8}dios/i,
    cueId: 'fx:starfield-shimmer' },
  // Ciudad sumeria
  { match: /sumeria|mesoopotamia|Caldea|ciudad.{0,12}Ur|Tell el-Muqayyar/i,
    cueId: 'fx:glow-pulse',
    data: { position: [665, 365], color: '#e6d4a0' } },
  // Tradición: fuga al desierto / cueva para escapar de Nimrod
  { match: /matanza de los reci[ée]n nacidos|fuga al desierto|cueva|Nimrod.{0,16}astr[oó]logos|esconde a Ibr[āa]h[īi]m/i,
    cueId: 'fx:smoke-rise',
    data: { position: [665, 365] } },
  // Halo divino al nacer — destino profético
  { match: /padre exaltado|padre de multitudes|cambio de nombre|Gn 17|pacto/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },
  // Nimrod — el rey que amenaza
  { match: /Nimrod|rey babilonio|tirano.{0,8}Ur/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },
  // Excavaciones de Woolley
  { match: /Woolley|excavaciones de Ur|1922|British Museum/i,
    cueId: 'fx:dust-burst',
    data: { position: [665, 365] } },
  // Profecía del destino — luz divina sobre la cuna
  { match: /Ibr[āa]h[īi]m.{0,12}nac[ióe]|el ni[ñn]o naci[oó]|primog[ée]nito de Tar[ée]/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [665, 365] } },
];

export default CUES;
