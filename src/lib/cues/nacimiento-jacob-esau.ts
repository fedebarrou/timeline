import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Jacob y Esaú".
 * Pins: isaac(0), rebeca(1), esau(2), jacob(3). Escenario: Bersabé [578, 372].
 * Scene-objects: 'tienda-parto'.
 * REGLA #1: 'tienda-parto' → no fx:glow-pulse con tienda como match principal.
 */
const CUES: Cue[] = [
  // Isaac ora por Rebeca
  { match: /Isaac.{0,18}(or[oó]|oraci[oó]n|sesenta a[ñn]os)|rog[oó] a Jehov[áa]/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Rebeca, la matriarca con oráculo directo
  { match: /Rebeca|est[ée]ril durante veinte a[ñn]os|consulta a Yahveh/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Esaú, el rojo y velludo
  { match: /Esa[úu]|Edom.{0,12}rojo|rubio y velludo|primog[ée]nito.{0,12}nace/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Jacob agarra el talón
  { match: /Jacob|Yaʿakov|agarr[oó].{0,8}tal[oó]n|akev|suplantador/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Oráculo prenatal — dos naciones en el seno
  { match: /dos naciones|dos pueblos.{0,12}dividid|el mayor servir[áa] al menor|or[áa]culo prenatal/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Lucha intrauterina
  { match: /lucha.{0,12}seno|los hijos luchaban|gestaci[oó]n turbulenta|chocan.{0,8}seno/i,
    cueId: 'fx:earthquake-shake', data: { pinIdx: 1, intensity: 2 } },
  // Lectura paulina: predestinación (Romanos 9)
  { match: /a Jacob am[ée], mas a Esa[úu] aborrec[íi]|predestinaci[oó]n|elecci[oó]n divina|Romanos 9/i,
    cueId: 'fx:glow-pulse', data: { position: [578, 372], color: '#fff1c0' } },
  // Esaú = Edom — relación etiológica
  { match: /Edom|Edom[íi]ta|tierra de Edom|Esa[úu].{0,8}Edom/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#a04040' } },
  // Bersabé — lugar del nacimiento
  { match: /Bersab[ée]|Gerar|Isaac.{0,8}Filisteos|valle.{0,8}Gerar/i,
    cueId: 'fx:zoom-pulse' },
  // Tienda del parto → scene-object (REGLA #1: no primitiva duplicada)
  { match: /tienda.{0,12}parto|tienda familiar|la tienda de Rebeca/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'tienda-parto', kind: 'glow' } },
];

export default CUES;
