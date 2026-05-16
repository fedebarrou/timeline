// Mock for astro:content virtual module used in vitest
export async function getEntry(_collection: string, _id: string) {
  return undefined;
}

export type CollectionEntry<_T extends string> = {
  id: string;
  data: Record<string, unknown>;
};
