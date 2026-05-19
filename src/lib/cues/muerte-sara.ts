import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Sara y compra de Macpela".
 * Pins: sara(0), abraham(1), isaac(2). Escenario: Quiriat-Arbá / Hebrón [582, 365].
 * Scene-objects: 'cueva-macpela'.
 * REGLA #1: 'cueva-macpela' → no fx:mountain-glow (usa fx:animate-scene-object).
 */
const CUES: Cue[] = [
  // Sara — la primera matriarca
  { match: /Sara|Sarah|matriarca/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abraham hace duelo
  { match: /Abraham|Ibr[āa]h[īi]m.{0,18}(duelo|llora|hace duelo)/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Isaac presente en el duelo
  { match: /Isaac.{0,18}(duelo|llora|lament)|consolado.{0,8}Isaac/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Sara muere — recede
  { match: /muri[oó] Sara|muere a los 127|ciento veintisiete|muerte de Sara/i,
    cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Negociación con los hititas y compra de Macpela — contrato/rollo
  { match: /hijos de Het|hititas|cuatrocientos siclos|400 siclos|Efr[oó]n|compra.{0,12}sepulcro/i,
    cueId: 'fx:scroll-unfurl', data: { position: [582, 365] } },
  // Cueva de Macpela → scene-object (REGLA #1: no fx:mountain-glow)
  { match: /Macpela|cueva.{0,12}(heredad|sepulcro|Mamre)|Haram al-Khalil|Tumba de los Patriarcas/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'cueva-macpela', kind: 'glow' } },
  // Conexión con la Akedah (lectura midrásica)
  { match: /Akedah|noticia del sacrificio|conexi[oó]n.{0,12}sacrificio de Isaac|muere de la noticia/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Hebrón — primera propiedad de Abraham en Canaán
  { match: /Hebr[oó]n|Quiriat-Arb[áa]|primera propiedad|tierra comprada|primera tierra/i,
    cueId: 'fx:glow-pulse', data: { position: [582, 365], color: '#e6d4a0' } },
  // Luto de Abraham — 127 años de Sara
  { match: /127 a[ñn]os|ciento veintisiete|duelo de Abraham|llor[oó] a Sara/i,
    cueId: 'fx:vignette-pulse' },
  // Zoom sobre Hebrón — lugar eterno
  { match: /Mamre|Hebrón.{0,12}patriarca|sepultura.{0,12}patriarcal|enterrar.{0,12}muertos/i,
    cueId: 'fx:zoom-pulse' },
];

export default CUES;
