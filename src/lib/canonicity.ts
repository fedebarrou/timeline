/**
 * Canonicity classification for biblical/traditional characters.
 *
 * A character's canonicity tier drives the colour of its map-pin border
 * and a small badge on its hover preview card. Values:
 *
 * - `canonical`   — appears in the Torah, the Christian Bible, or the Quran.
 * - `traditional` — absent from scripture but documented in mainstream
 *                   traditional / rabbinic / midrashic / folkloric sources
 *                   (Talmud, Midrash, Haggadah, leyenda, folclor...).
 * - `apocryphal`  — absent from scripture, present only in apocryphal /
 *                   sectarian / pseudepigraphical extra-biblical writings.
 * - `unknown`     — no references at all (placeholder entries).
 *
 * Authors can pin the value explicitly via the `canonicity` frontmatter
 * field; otherwise it is derived from `mentions` and `extraBiblical`.
 */
export type Canonicity = 'canonical' | 'apocryphal' | 'traditional' | 'unknown';

export const CANONICITY_COLORS: Record<Canonicity, string> = {
  canonical: '#7fb069',   // sage green
  traditional: '#c9a35a', // gold
  apocryphal: '#b8651e',  // amber / burnt orange
  unknown: '#7a7a7a',     // gray
};

export const CANONICITY_LABELS: Record<Canonicity, string> = {
  canonical: 'Canónico',
  traditional: 'Tradición',
  apocryphal: 'Apócrifo',
  unknown: 'Sin fuentes',
};

/** Matches "traditional" extra-biblical sources (Talmud, Midrash, etc.). */
const TRADITIONAL_SOURCE_RE = /talmud|midrash|hagad|tradici|leyenda|folclor/i;

type CharacterLike = {
  canonicity?: Canonicity;
  mentions?: {
    tora?: unknown[];
    biblia?: unknown[];
    coran?: unknown[];
  };
  extraBiblical?: { source: string; summary: string }[];
};

/**
 * Derive a character's canonicity tier. An explicit `canonicity` value on
 * the entry always wins; otherwise we walk the source arrays.
 */
export function deriveCanonicity(char: CharacterLike | null | undefined): Canonicity {
  if (!char) return 'unknown';
  if (char.canonicity) return char.canonicity;

  const m = char.mentions ?? {};
  const hasCanonical =
    (m.tora?.length ?? 0) > 0 ||
    (m.biblia?.length ?? 0) > 0 ||
    (m.coran?.length ?? 0) > 0;
  if (hasCanonical) return 'canonical';

  const extras = char.extraBiblical ?? [];
  if (extras.length > 0) {
    const anyTraditional = extras.some((e) => TRADITIONAL_SOURCE_RE.test(e.source));
    return anyTraditional ? 'traditional' : 'apocryphal';
  }

  return 'unknown';
}
