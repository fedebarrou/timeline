import type { Cue } from '../narrationCues';

/**
 * Cues for "La Akedah: el sacrificio del hijo".
 * Pins: abraham(0), isaac(1), ismael(2). Escenario: Monte Moriah [582, 360].
 */
const CUES: Cue[] = [
  // Abraham obedece — emerge
  { match: /Abraham|Ibr[āa]h[īi]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Isaac, el hijo de la prueba (lectura mayoritaria judeocristiana)
  { match: /Isaac|Yitzjak|Isḥ[āa]q/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Ismael (lectura mayoritaria islámica)
  { match: /Isma[ée]l|Ism[āa][ʿʾ`]?[īi]l/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Subida al monte Moriah — destello en el altar
  { match: /Moriah|monte.{0,16}(que yo te diré|holocausto)|sube al monte|altar/i, cueId: 'fx:glow-pulse', data: { position: [582, 360], color: '#e6d4a0' } },
  // El cuchillo y la atadura — ángel detiene
  { match: /cuchillo|extendi[oó] su mano|akedah|atadura|degollar/i, cueId: 'fx:lightning-strike', data: { from: [582, 320], to: [582, 360] } },
  // Ángel del Señor desciende
  { match: /[áa]ngel del Se[ñn]or|ángel de Jehov[áa]|le llamamos|no extiendas tu mano/i, cueId: 'fx:angel-descent', data: { position: [582, 358] } },
  // Carnero/víctima preciosa sustituye al hijo
  { match: /carnero|trabado en el zarzal|v[íi]ctima preciosa|sustituto|gran ofrenda/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Carnero figurativo — el sustituto
  { match: /carnero|trabado en el zarzal|v[íi]ctima preciosa|sustituto|kabsh|ram\b/i, cueId: 'fx:ram', data: { position: [582, 360] } },
  // Eid al-Adha / fiesta del sacrificio
  { match: /Eid al-Adha|fiesta del sacrificio|Dhab[īi]ḥ|peregrinaje a La Meca/i, cueId: 'fx:glow-pulse', data: { position: [582, 360], color: '#fff1c0' } },
];

export default CUES;
