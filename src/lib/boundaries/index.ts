import type { BoundarySet } from './types';
import { patriarcalBoundaries } from './patriarcal';
import { exodoBoundaries } from './exodo';
import { reinosYExilioBoundaries } from './reinos-y-exilio';
import { evangelioBoundaries } from './evangelio';
import { revelacionBoundaries } from './revelacion';

/**
 * Registry of all per-era boundary sets. Add a new era by:
 *   1. Creating `./${eraId}.ts` exporting a `BoundarySet`.
 *   2. Importing + registering it here.
 *
 * Eras without an entry simply hide the toggle button — no breakage.
 *
 * `primordial` queda intencionalmente sin entrada (no hay entidades
 * políticas en la prehistoria narrativa). Cada set actual es un único
 * snapshot representativo; sub-períodos por evento se podrán agregar
 * más adelante (ver nota en `types.ts`).
 */
export const BOUNDARY_SETS: Record<string, BoundarySet> = {
  patriarcal: patriarcalBoundaries,
  exodo: exodoBoundaries,
  'reinos-y-exilio': reinosYExilioBoundaries,
  evangelio: evangelioBoundaries,
  revelacion: revelacionBoundaries,
};

export function getBoundarySetFor(eraId: string): BoundarySet | null {
  return BOUNDARY_SETS[eraId] ?? null;
}

export type { BoundarySet, BoundaryPolygon } from './types';
