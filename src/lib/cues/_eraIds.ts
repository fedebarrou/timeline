/**
 * Canonical era ids. Mirrors the `eras` content collection
 * (src/content/eras/*.json) — keep in sync if a new era is added.
 */
export type EraId =
  | 'primordial'
  | 'patriarcal'
  | 'exodo'
  | 'reinos-y-exilio'
  | 'evangelio'
  | 'revelacion';

export const ERA_IDS: readonly EraId[] = [
  'primordial',
  'patriarcal',
  'exodo',
  'reinos-y-exilio',
  'evangelio',
  'revelacion',
] as const;
