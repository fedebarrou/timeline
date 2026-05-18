import type { Cue } from '../narrationCues';

/**
 * Cues for "Martirio de Pedro y Pablo en Roma".
 * Pins: pedro(0), pablo(1).
 */
const CUES: Cue[] = [
  // Incendio de Roma 64 d.C.
  { match: /incendio|gran incendio|julio del a[ñn]o 64|devasta diez|Roma.{0,12}fuego/i, cueId: 'fx:fire-flicker', data: { position: [430, 290] } },
  // Persecución de Nerón — humo
  { match: /Ner[oó]n|persecuci[oó]n|cristianos|antorchas para iluminar|T[áa]cito/i, cueId: 'fx:smoke-rise', data: { position: [430, 290] } },
  // Pedro emerge — luego crucificado
  { match: /Pedro.{0,30}(crucificado|cabeza abajo|colina vaticana|no creerse digno)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pedro martirio — sangre
  { match: /crucificado cabeza abajo|circo de Ner[oó]n|colina vaticana|San Pedro/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Pablo emerge — luego decapitado
  { match: /Pablo.{0,30}(decapitado|ciudadano romano|v[ií]a Ostiense|Tre Fontane)/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Pablo martirio
  { match: /decapitaci[oó]n|Aguas Salvias|pena noble|San Pablo Extramuros/i, cueId: 'fx:blood-stain', data: { pinIdx: 1 } },
  // Ambos receden — era apostólica cierra
  { match: /cierra la era apost[oó]lica|veneraci[oó]n conjunta|29 de junio|martirio de ambos/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
