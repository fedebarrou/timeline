import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Ismael".
 * Pins: abraham(0), agar(1), ismael(2), sara(3). Origen Bersabé [578, 372], destino Meca [625, 460].
 */
const CUES: Cue[] = [
  // Abraham 86 años — primer hijo
  { match: /Abraham.{0,16}(ochenta y seis|86 a[ñn]os|primer hijo)|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Agar / Hājar la egipcia
  { match: /Agar|Hagar|Hājar|sierva egipcia|concubina/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Ismael — "Dios escucha"
  { match: /Ismael|Ism[āa][ʿʾ`]?[īi]l|Dios escucha|plegaria atendida/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Sara estéril, entrega a Agar
  { match: /Sara.{0,16}est[ée]ril|Saray|entreg[oó] a Agar|tablillas de Nuzi/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Ángel del Señor en el desierto / "El Roí"
  { match: /[áa]ngel del Se[ñn]or|fuente.{0,12}(Shur|desierto)|El Ro[íi]|Dios que me ve|teofan[íi]a/i, cueId: 'fx:angel-descent', data: { position: [578, 372] } },
  // Tradición islámica: Abraham lleva a Agar e Ismael a Bakkah/Meca
  { match: /Bakkah|La Meca|valle sin sembrar|Casa sagrada|llevarlos a La Meca/i, cueId: 'fx:journey-trace', data: { from: [578, 372], to: [625, 460], style: 'caravan' } },
  // Pozo de Zamzam — milagro del manantial
  { match: /Zamzam|pozo .{0,12}milagros|manantial.{0,12}santuario|Saʿi|Safa y Marwa/i, cueId: 'fx:water-wave', data: { position: [625, 460] } },
  // Halo divino sobre Ismael — antepasado profético
  { match: /padre de doce pr[íi]ncipes|antepasado de los [áa]rabes|profeta Ism[āa][ʿʾ`]?[īi]l/i, cueId: 'fx:halo-divine', data: { pinIdx: 2 } },
];

export default CUES;
