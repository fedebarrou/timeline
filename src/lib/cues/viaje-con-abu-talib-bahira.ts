import type { Cue } from '../narrationCues';

/**
 * Cues for "Viaje con Abū Ṭālib y encuentro con Baḥīrā".
 * Pins: mahoma(0), abu-talib(1), bahira(2). Meca [625, 460] → Bostra [592, 358].
 */
const CUES: Cue[] = [
  // Caravana comercial Meca → Bostra (Siria)
  { match: /caravana|viaje a Siria|Bostra|Bu[ṣs]r[āa]|hacia Siria|primer viaje fuera/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [592, 358] } },
  // Polvo del camino caravanero
  { match: /caravana comercial|camellos|polvo del desierto|Hiyaz|ruta caravanera/i, cueId: 'fx:dust-burst', data: { position: [600, 410] } },
  // Mahoma niño de doce años
  { match: /Mahoma|ni[ñn]o de.{0,10}doce|joven Mahoma|protagonista del viaje/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abū Ṭālib lleva al sobrino
  { match: /Ab[ūu] [ṬT][āa]lib|tío|tutor|cabeza de la caravana|jefe de Ban[ūu] H[āa]shim/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Baḥīrā reconoce las señales
  { match: /Ba[ḥh][īi]r[āa]|monje cristiano|celda|reconoci[oó].{0,15}profeta|señal entre los hombros|sello de la profec[íi]a/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Halo divino — señales celestiales sobre el niño
  { match: /se[ñn]ales celestiales|nube.{0,15}(sombra|cobij)|sombra prof[eé]tica|signos sobre el ni[ñn]o|futuro profeta/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Resplandor sobre Bostra
  { match: /Bostra|Bu[ṣs]r[āa]|sur de Siria|reconocimiento cristiano/i, cueId: 'fx:glow-pulse', data: { position: [592, 358], color: '#ffe6a0' } },
];

export default CUES;
