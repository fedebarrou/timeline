import type { Cue } from '../narrationCues';

/**
 * Cues for "Jacob obtiene la primogenitura y la bendición".
 * Pins: jacob(0), esau(1), isaac(2), rebeca(3). Escenario: Bersabé [578, 372].
 */
const CUES: Cue[] = [
  // Jacob, el suplantador
  { match: /Jacob|Yaʿakov|suplantador/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Esaú vuelve hambriento del campo
  { match: /Esa[úu]|Edom|el rojo|del campo agotado|hambriento/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Isaac anciano y ciego
  { match: /Isaac.{0,20}(ciego|anciano)|le bendiga|palpa.{0,12}brazos/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Rebeca instigadora
  { match: /Rebeca|planea con Jacob|madre.{0,12}engaño/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // El guiso de lentejas rojas — destello rojizo sobre Esaú
  { match: /lentejas|guiso rojo|ese rojo|plato de lentejas|guisado/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#a04040' } },
  // Venta de la primogenitura
  { match: /vendi[oó].{0,18}primogenitura|primogenitura|menospreci[oó]|bekhorah/i, cueId: 'fx:idol-shatter', data: { position: [578, 372], count: 2 } },
  // Pieles de cabrito y disfraz
  { match: /pieles de cabrito|disfraz|ropas perfumadas|velludo|la voz es la voz/i, cueId: 'fx:dust-burst', data: { pinIdx: 0 } },
  // Bendición robada — halo sobre Jacob, no sobre Esaú
  { match: /bendici[oó]n paterna|le bendijo|berakhah|recibe la bendici[oó]n/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Esaú llora — recede
  { match: /Esa[úu].{0,20}(llor[oó]|grito desgarrado)|¿no te queda bendici[oó]n/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
];

export default CUES;
