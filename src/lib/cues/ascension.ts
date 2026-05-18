import type { Cue } from '../narrationCues';

/**
 * Cues for "Ascensión de Jesús".
 * Pins: jesus(0), pedro(1), maria(2).
 */
const CUES: Cue[] = [
  // Monte de los Olivos — escenario
  { match: /Monte de los Olivos|Betania|falda oriental|cuarenta d[ií]as despu[eé]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Mandato misionero
  { match: /haced disc[ií]pulos|toda potestad|todas las naciones|id por todo el mundo|misionero/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Bendice levantando las manos — halo
  { match: /bendec[ií]rlos|levanta las manos|gesto sacerdotal|bendiciendo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Es elevado — sube al cielo
  { match: /fue alzado|llevado arriba|asciende|sube al cielo|tomado.{0,12}al cielo|elevado/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Nube lo oculta — Shekiná
  { match: /nube.{0,12}oculta|le recibi[oó] una nube|Sheki[nñ][áa]|presencia gloriosa/i, cueId: 'fx:smoke-rise', data: { position: [583, 350] } },
  // Dos varones / ángeles con vestiduras blancas
  { match: /dos varones|vestiduras blancas|varones galileos|mensajeros blancos|este mismo Jes[uú]s/i, cueId: 'fx:angel-descent', data: { position: [583, 358] } },
  // Discípulos vuelven con gozo
  { match: /vuelven a Jerusal[eé]n|con gran gozo|perseverantes en oraci[oó]n|discipulos.{0,20}adoraron/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Elevación coránica
  { match: /elev[oó] a S[ií]|voy a elevarte|recogida directa|nuz[uū]l|segunda venida/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
];

export default CUES;
