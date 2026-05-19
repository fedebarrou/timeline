import type { Cue } from '../narrationCues';

/**
 * Cues for "Viaje con Abū Ṭālib y encuentro con Baḥīrā".
 * Pins: mahoma(0), abu-talib(1), bahira(2). Meca [625, 460] → Bostra [592, 358].
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Caravana comercial Meca → Bostra (Siria)
  { match: /caravana|viaje a Siria|Bostra|Bu[ṣs]r[āa]|hacia Siria|primer viaje fuera/i,
    cueId: 'fx:journey-trace', data: { from: [625, 460], to: [592, 358] } },

  // Camellos — caravana
  { match: /camellos|caravana comercial|ruta caravanera|bestias de carga/i,
    cueId: 'fx:camel-train', data: { position: [600, 410] } },

  // Polvo del camino caravanero
  { match: /polvo del desierto|Hiyaz|polvo del camino/i,
    cueId: 'fx:dust-burst', data: { position: [600, 410] } },

  // Calor del desierto — ruta Hiyaz-Siria
  { match: /calor|mediod[ií]a|sol.{0,15}desierto|ardiente/i,
    cueId: 'fx:heat-shimmer' },

  // Nube que sombrea al niño — señal celestial
  { match: /nube.{0,15}(sombra|cobij)|sombra prof[eé]tica|nube.{0,15}Mahoma|nube.{0,15}ni[ñn]o/i,
    cueId: 'fx:divine-light-beam', data: { position: [592, 358] } },

  // Pergamino / escrituras del monje Baḥīrā — celda del monje
  { match: /rollo|escrituras|libro sagrado|celda.{0,15}Ba[ḥh][īi]r[āa]|monasterio|conocimiento/i,
    cueId: 'fx:scroll-unfurl', data: { position: [592, 358] } },

  // Viento del norte — ruta siria
  { match: /viento|brisa.{0,10}norte|camino.{0,15}Siria|ruta.{0,15}norte/i,
    cueId: 'fx:wind-streaks' },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // Mahoma niño de doce años
  { match: /Mahoma|ni[ñn]o de.{0,10}doce|joven Mahoma|protagonista del viaje/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Abū Ṭālib lleva al sobrino
  { match: /Ab[ūu] [ṬT][āa]lib|tío|tutor|cabeza de la caravana/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Baḥīrā reconoce las señales
  { match: /Ba[ḥh][īi]r[āa]|monje cristiano|reconoci[oó].{0,15}profeta|señal entre los hombros|sello de la profec[íi]a/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Halo divino — señales sobre el niño
  { match: /se[ñn]ales celestiales|signos sobre el ni[ñn]o|futuro profeta/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Resplandor sobre Bostra — reconocimiento
  { match: /Bostra|Bu[ṣs]r[āa]|sur de Siria|reconocimiento cristiano/i,
    cueId: 'fx:glow-pulse', data: { position: [592, 358] } },

  // ── Pasada 3: diálogo ────────────────────────────────────────────────

  // Diálogo Baḥīrā ↔ Abu Talib — reconocimiento
  { match: /Ba[ḥh][īi]r[āa].{0,30}(dice|pregunta|advierte|hab[óo])|monje.{0,20}(advirti[oó]|reconoci|dijo)/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },
];

export default CUES;
