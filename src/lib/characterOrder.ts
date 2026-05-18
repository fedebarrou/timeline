/**
 * Canonical browsing order for characters.
 *
 * Mirrors the section order in `src/pages/personajes/index.astro` so the
 * "Siguiente" arrow on a detail page walks the SAME sequence the reader
 * sees on the listing — Patriarcas pre-diluvio → Línea de Set → … →
 * Revelación. Within each group, characters are sorted by `birthYear`
 * ascending (the same rule the index uses).
 *
 * NOTE: this list intentionally duplicates the group ids from
 * `personajes/index.astro` — the index keeps richer metadata (labels,
 * descriptions) per group, so DRY'ing it here would require importing
 * that page-scoped const, which is awkward in Astro. Keeping the two in
 * sync is cheap (group ids change rarely) and the cost of drift is
 * minor (out-of-order navigation, not a render failure).
 */
export const CHARACTER_GROUP_ORDER: ReadonlyArray<string> = [
  // Era Primordial
  'patriarcas',
  'linaje-set',
  'descendientes-cain',
  'vigilantes',
  // Era Patriarcal
  'patriarcas-padres-fundadores',
  'patriarcas-madres-fundadoras',
  'patriarcas-hijos-tribus',
  'patriarcas-vinculados',
  'patriarcal',
  // Era Éxodo
  'exodo-liberadores',
  'exodo-faraones-y-egipcios',
  'exodo-generacion-desierto',
  'exodo-conquista-canaan',
  'exodo',
  // Era Reinos y Exilio
  'reinos-jueces',
  'reinos-reyes',
  'reinos-profetas',
  'reinos-exilio-y-retorno',
  'reinos-y-exilio',
  // Era Evangelio
  'evangelio-familia',
  'evangelio-magos',
  'evangelio-apostoles',
  'evangelio-primeros-cristianos',
  // Era Revelación
  'revelacion-familia-mahoma',
  'revelacion-companeros',
  'revelacion-opresores-meca',
  'revelacion-ansar-medina',
  'revelacion-otros',
  'revelacion',
];

/** Era id each group belongs to. Used to colour the sidebar item with the
 *  right era palette so the reader sees the era chunking at a glance. */
export const GROUP_TO_ERA: Record<string, string> = {
  patriarcas: 'primordial',
  'linaje-set': 'primordial',
  'descendientes-cain': 'primordial',
  vigilantes: 'primordial',
  patriarcal: 'patriarcal',
  'patriarcas-padres-fundadores': 'patriarcal',
  'patriarcas-madres-fundadoras': 'patriarcal',
  'patriarcas-hijos-tribus': 'patriarcal',
  'patriarcas-vinculados': 'patriarcal',
  exodo: 'exodo',
  'exodo-liberadores': 'exodo',
  'exodo-faraones-y-egipcios': 'exodo',
  'exodo-generacion-desierto': 'exodo',
  'exodo-conquista-canaan': 'exodo',
  'reinos-y-exilio': 'reinos-y-exilio',
  'reinos-jueces': 'reinos-y-exilio',
  'reinos-reyes': 'reinos-y-exilio',
  'reinos-profetas': 'reinos-y-exilio',
  'reinos-exilio-y-retorno': 'reinos-y-exilio',
  'evangelio-familia': 'evangelio',
  'evangelio-magos': 'evangelio',
  'evangelio-apostoles': 'evangelio',
  'evangelio-primeros-cristianos': 'evangelio',
  revelacion: 'revelacion',
  'revelacion-familia-mahoma': 'revelacion',
  'revelacion-companeros': 'revelacion',
  'revelacion-opresores-meca': 'revelacion',
  'revelacion-ansar-medina': 'revelacion',
  'revelacion-otros': 'revelacion',
};

type OrderableCharacter = {
  data: {
    id: string;
    name: string;
    group?: string;
    birthYear?: number;
  };
};

const groupIdx = (g: string | undefined): number => {
  if (!g) return CHARACTER_GROUP_ORDER.length; // ungrouped sinks to the tail
  const i = CHARACTER_GROUP_ORDER.indexOf(g);
  return i === -1 ? CHARACTER_GROUP_ORDER.length : i;
};

/**
 * Return a new array sorted by group order then by `birthYear` ascending.
 * Characters without a birth year sink to the end of their group.
 */
export function orderCharacters<T extends OrderableCharacter>(chars: T[]): T[] {
  return [...chars].sort((a, b) => {
    const dg = groupIdx(a.data.group) - groupIdx(b.data.group);
    if (dg !== 0) return dg;
    return (a.data.birthYear ?? 99999) - (b.data.birthYear ?? 99999);
  });
}
