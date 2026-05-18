import type { Cue } from '../narrationCues';

/**
 * Cues for "Matrimonio con Khadīja".
 * Pins: mahoma(0), khadija(1). Escenario: La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Khadīja, la viuda rica e influyente — emerge
  { match: /Khad[īi]ja|viuda.{0,15}rica|mercader|propone el matrimonio|primera musulmana/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Mahoma joven comerciante
  { match: /Mahoma|joven comerciante|al-Am[īi]n|veinticinco a[ñn]os|caravanas a Siria|trabaja para Khad/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Resplandor de bendición — matrimonio
  { match: /matrimonio|se casa|nupcias|dote|bod[ao]s|veinticinco a[ñn]os de matrimonio|mon[óo]gamo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffd27a' } },
  // Halo divino — riqueza venida con Khadīja (Sura 93:8)
  { match: /Sura 93:8|encontró pobre y te enriqueci[oó]|enriqueci[oó]|Ad-Du[ḥh][āa]|fortuna|prosperidad/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Caravana a Siria (oficio)
  { match: /caravana|comercio a Siria|caravan[áa] hacia el norte|ruta caravanera/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [592, 358] } },
  // Vínculo conyugal — confidente y sost[éé]n
  { match: /confidente|sostén|amor|fiel|sost[ée]n econ[óo]mico|veinticinco a[ñn]os juntos/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffe6a0' } },
];

export default CUES;
