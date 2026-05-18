import type { Cue } from '../narrationCues';

/**
 * Cues for "El periodo de los Jueces".
 * Pins: jueces-multiples(0).
 */
const CUES: Cue[] = [
  // El ciclo del juez emerge
  { match: /shofet|juez|jueces|l[ií]der carism[áa]tico|levanta un juez/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pecado — idolatría con Baales y Astartés
  { match: /hace lo malo|adora .{0,8}Baales|Astart[eé]s|idolatr[ií]a|tras dioses ajenos/i, cueId: 'fx:idol-shatter', data: { position: [582, 358] } },
  // Opresión — pueblos enemigos invaden
  { match: /opresi[oó]n|opresor|Cusan-risataim|Egl[oó]n de Moab|Madi[áa]n|madianitas|amonitas|filisteos/i, cueId: 'fx:earthquake-shake', data: { intensity: 0.5 } },
  // Polvo — devastación recurrente
  { match: /devast|nubes de langostas|saquead|invaden la tierra/i, cueId: 'fx:dust-burst', data: { position: [582, 358] } },
  // Clamor — el pueblo grita
  { match: /clama .{0,8}Yahveh|el pueblo clama|gritan desde|liberaci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfa14c' } },
  // Liberador / paz — la tierra reposa
  { match: /libra|liberad|la tierra tuvo paz|cuarenta a[ñn]os/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Recaída — la espiral vuelve a empezar
  { match: /recae|peor que antes|espiral|generaci[oó]n .{0,8}no conoc[ií]a|fue tras dioses/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Cada uno hac[ií]a lo que bien le parec[ií]a
  { match: /no hab[ií]a rey en Israel|cada uno hac[ií]a lo|gabaa|concubina del levita/i, cueId: 'fx:blood-stain', data: { position: [582, 360] } },
];

export default CUES;
