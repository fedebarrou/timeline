import type { Cue } from '../narrationCues';

/**
 * Cues for "Expulsión del Edén".
 * Pins: adan(0), eva(1), lilith(2).
 */
const CUES: Cue[] = [
  // Serpiente tienta — destello rojizo sobre Eva
  { match: /serpiente|tentaci[oó]n|tentadora|tentadora de Eva/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#7a4040' } },
  // Fruto / árbol prohibido — pulso ambar sobre Adán
  { match: /fruto|[áa]rbol prohibido|[áa]rbol del conocimiento|[áa]rbol de la eternidad|shajarat al-khuld/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffb84d' } },
  // Espada flameante — relámpago entre Adán y Eva
  { match: /espada flame|espada encendida|querubin|querubines/i, cueId: 'fx:lightning-strike', data: { from: [610, 305], to: [630, 335] } },
  // NOTE: `fx:character-recede` permanently shrinks a pin to scale 0.35 /
  // opacity 0.15 — once fired it does NOT reset between choreography loops,
  // so the regex MUST match only the actual departure moment, never the
  // generic word "expulsión" that appears throughout the narration. The
  // choreography loop already handles the slow drift-and-return; cues
  // here are reserved for the once-per-scene punctuating moments.
  // (No character-recede on Adán/Eva — choreography does the exile drift.)
  // Lilith had ALREADY fled (per Zohar / Ben Sirá) — recede only on the
  // explicit "huyó" / "abandona" / "rebelión" verbs, NEVER on every
  // mention of her name (which appears repeatedly in the narration).
  { match: /huy[oó] del Ed[eé]n|abandona el Ed[eé]n|abandon[oó] el Ed[eé]n|Lilit.{0,30}rebeli[oó]n|rebeli[oó]n.{0,30}Lilit/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
];

export default CUES;
