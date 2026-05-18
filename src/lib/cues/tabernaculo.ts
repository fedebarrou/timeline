import type { Cue } from '../narrationCues';

/**
 * Cues for "El Tabernáculo (Mishkán)".
 * Pins: moises(0), aaron(1), bezaleel(2), oholiab(3).
 */
const CUES: Cue[] = [
  // Moisés recibe el plano / modelo celestial
  { match: /modelo celestial|tavnit|plano del tabern[áa]culo|instrucciones detalladas|en el monte/i, cueId: 'fx:scroll-unfurl', data: { position: [550, 425] } },
  // Bezaleel "lleno del Espíritu de Dios"
  { match: /Bezaleel|lleno del Esp[íi]ritu|tribu de Jud[áa].{0,15}arte/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Oholiab — co-arquitecto
  { match: /Oholiab|tribu de Dan|bordador|grabador/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Donaciones del pueblo / construcción
  { match: /donaciones?|ofrendas|pueblo dona|construcci[óo]n|edificar el santuario|cesen las donaciones/i, cueId: 'fx:dust-burst', data: { position: [550, 425] } },
  // Aarón consagrado sumo sacerdote
  { match: /Aar[óo]n.{0,15}consagra|vestiduras sagradas|efod|pectoral|sumo sacerdote/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Arca de la alianza / querubines
  { match: /arca de la alianza|propiciatorio|kaporet|querubines|Tabut/i, cueId: 'fx:glow-pulse', data: { position: [550, 425], color: '#ffd27a' } },
  // Menorá / candelabro
  { match: /menor[áa]|candelabro|siete brazos|oro batido/i, cueId: 'fx:fire-flicker', data: { position: [550, 425] } },
  // Gloria de Yahveh llena el tabernáculo — Shekiná / Sakina
  { match: /gloria de Yahveh.{0,15}llen|Shekin[áa]|Sakina|nube cubri[óo].{0,15}tabern|presencia divina habit/i, cueId: 'fx:halo-divine', data: { position: [550, 425] } },
];

export default CUES;
