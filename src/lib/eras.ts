import { getEntry, type CollectionEntry } from 'astro:content';

export type Era = CollectionEntry<'eras'>;

export async function getEra(id: string): Promise<Era> {
  const era = await getEntry('eras', id);
  if (!era) throw new Error(`Era not found: ${id}`);
  return era;
}

export function eraToCssVars(era: Era['data']): string {
  const p = era.palette;
  const t = era.typography;
  return [
    `--era-bg: ${p.bg};`,
    `--era-bg-gradient: ${p.bgGradient};`,
    `--era-surface: ${p.surface};`,
    `--era-primary: ${p.primary};`,
    `--era-secondary: ${p.secondary};`,
    `--era-accent: ${p.accent};`,
    `--era-text: ${p.text};`,
    `--era-muted: ${p.muted};`,
    `--era-border: ${p.border};`,
    `--era-display: ${t.display};`,
    `--era-body: ${t.body};`,
    `--era-ui: ${t.ui};`,
    `--era-letter-spacing: ${t.letterSpacing};`,
    `--era-texture-url: url('${era.texture.url}');`,
    `--era-texture-opacity: ${era.texture.opacity};`,
  ].join('\n  ');
}
