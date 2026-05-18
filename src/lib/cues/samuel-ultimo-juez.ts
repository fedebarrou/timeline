import type { Cue } from '../narrationCues';

/**
 * Cues for "Samuel, el último juez".
 * Pins: samuel(0), ana(1).
 */
const CUES: Cue[] = [
  // Ana orando silenciosamente — la madre estéril
  { match: /Ana|est[eé]ril|ora silenciosamente|mueve los labios|derramad[oa] mi alma|voto/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Cántico de Ana — Magnificat anticipado
  { match: /c[áa]ntico de Ana|humilla a los soberbios|exalta a los humildes|Magn[ií]ficat|hambrientos/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Samuel niño en Silo — llamado nocturno
  { match: /Samuel.{0,16}(ni[ñn]o|crece|llamad|nocturno)|habla.{0,8}Yahveh|que tu siervo escucha|tabern[áa]culo/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Casa de Elí condenada — Ofni y Finees
  { match: /casa de El[ií]|Ofni|Finees|corrupci[oó]n sacerdotal|Icabod|no hay gloria/i, cueId: 'fx:blood-stain', data: { position: [582, 360] } },
  // Arca capturada por los filisteos — peste sobre ellos
  { match: /Arca .{0,16}(capturad|filisteos|Asdod|Gat|Ecr[oó]n)|peste sobre los ratones|hemorroides/i, cueId: 'fx:plague-swarm', data: { position: [580, 360] } },
  // Asamblea de Mizpá — Eben-ezer
  { match: /Mizp[áa]|Eben-ezer|piedra de la ayuda|asamblea|truena contra/i, cueId: 'fx:lightning-strike', data: { from: [582, 355], to: [582, 360] } },
  // Petición del rey — el pueblo rechaza a Yahveh
  { match: /danos un rey|piden un rey|no te han desechado a ti|costo del rey|tomar[áa] hijos para .{0,8}carros/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 360] } },
  // Samuel unge a Saúl y luego a David
  { match: /Samuel unge|primer ungidor|ungidor de reyes|profeta modelo|[uú]ltimo juez/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfa14c' } },
];

export default CUES;
