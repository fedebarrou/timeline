import type { Cue } from '../narrationCues';

/**
 * Cues for "El ascenso de Elías".
 * Pins: elias(0), eliseo(1).
 */
const CUES: Cue[] = [
  // Cruzan el Jordán a pie seco
  { match: /Jord[áa]n|aguas se divid|cruzan a pie seco|golpea .{0,8}agua|manto/i, cueId: 'fx:water-wave', data: { position: [585, 360] } },
  // Doble porción del espíritu — petición testamentaria
  { match: /doble porci[oó]n|pide lo que quieras|si me vieres/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#cfa14c' } },
  // Carro de fuego y caballos de fuego — momento icónico
  { match: /carro de fuego|caballos de fuego|torbellino|sa[ʿʼ´']ar[áa]/i, cueId: 'fx:fire-flicker', data: { position: [585, 350] } },
  // Cielo abierto — descenso del cortejo angélico
  { match: /subi[oó] al cielo|arrebatad|cielo abierto|asunci[oó]n/i, cueId: 'fx:angel-descent', data: { position: [585, 340] } },
  // Elías sube y desaparece
  { match: /El[ií]as .{0,16}(subi[oó]|arrebatad|quitad|desapare)|no muere f[ií]sicamente/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // El manto cae — herencia de Eliseo
  { match: /manto .{0,8}(cae|cay[oó]|recoge)|esp[ií]ritu de El[ií]as repos[oó]/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Eliseo divide las aguas — confirmación
  { match: /Eliseo .{0,20}(divid|golpe|cruz|aguas)|d[oó]nde est[áa] Yahveh/i, cueId: 'fx:water-wave', data: { position: [585, 362] } },
  // Retorno escatológico — copa de Elías, Transfiguración
  { match: /copa de El[ií]as|Transfiguraci[oó]n|Malaqu[ií]as|antes del Mes[ií]as|dos testigos/i, cueId: 'fx:halo-divine', data: { position: [585, 345] } },
];

export default CUES;
