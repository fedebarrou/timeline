/**
 * verify-no-duplicate-fx.ts
 *
 * Enforcement script for REGLA #1 (see
 * docs/superpowers/STYLE_GUIDE_ANIMACIONES.md).
 *
 *  - Walks every event MDX, extracts its `era`.
 *  - Reads `src/lib/cues/{eventId}.ts` and parses the `cueId` strings.
 *  - Reads `src/lib/sceneObjects/{era}.ts` and pulls scene-object `id`s
 *    declared for that event.
 *  - Uses the EQUIVALENCES table below to detect cases where a cue
 *    dispatches a primitive that would render an icon that is ALREADY
 *    present as a scene-object. Such a case is a REGLA #1 violation
 *    and the cue must instead dispatch `fx:animate-scene-object`.
 *
 * Exits 1 on any violation.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import matter from 'gray-matter';

const ROOT = path.resolve(process.cwd());

/** Map scene-object id (or id-fragment) → list of primitive cueIds
 *  that would render the SAME icon. Both directions of the lookup
 *  are used: if a scene-object id matches one of the keys (substring),
 *  and the event's cue list includes any of the mapped cueIds, that's
 *  a duplication. */
const EQUIVALENCES: Record<string, string[]> = {
  arca:           ['fx:ark-boat'],
  becerro:        ['fx:golden-calf'],
  serpiente:      ['fx:serpent'],
  tableta:        ['fx:stone-tablets'],
  tablas:         ['fx:stone-tablets'],
  zarza:          ['fx:burning-bush'],
  torre:          ['fx:tower-babel'],
  paloma:         ['fx:dove-flight'],
  espada:         ['fx:sword-strike'],
  carnero:        ['fx:ram'],
  cordero:        ['fx:ram'],
  estrella:       ['fx:star-bethlehem', 'fx:starfield-shimmer'],
  copa:           ['fx:chalice'],
  caliz:          ['fx:chalice'],
  altar:          ['fx:fire-flicker'],
  pez:            ['fx:fish-school', 'fx:fish-multiply'],
  pan:            ['fx:bread-multiply'],
  trono:          ['fx:throne'],
  corona:         ['fx:crown-descent', 'fx:crown-of-thorns'],
  pozo:           ['fx:well'],
  monte:          ['fx:mountain-glow'],
  montana:        ['fx:mountain-glow'],
  rollo:          ['fx:scroll-unfurl'],
  pergamino:      ['fx:scroll-unfurl'],
  trompeta:       ['fx:trumpet-blast'],
  shofar:         ['fx:trumpet-blast'],
  candelabro:     ['fx:lamp-glow'],
  lampara:        ['fx:lamp-glow'],
  escala:         ['fx:ladder'],
  escalera:       ['fx:ladder'],
  cruz:           ['fx:cross-rise'],
  caaba:          ['fx:kaaba-pulse'],
  kaaba:          ['fx:kaaba-pulse'],
  arcoiris:       [],   // rainbow has no equivalent primitive
};

async function readEvents(): Promise<{ id: string; era: string }[]> {
  const files = await fg('src/content/events/**/*.mdx', { cwd: ROOT });
  const events: { id: string; era: string }[] = [];
  for (const f of files) {
    const src = await fs.readFile(path.join(ROOT, f), 'utf-8');
    const { data } = matter(src);
    if (typeof data.id === 'string' && typeof data.era === 'string') {
      events.push({ id: data.id, era: data.era });
    }
  }
  return events;
}

async function readCueIds(eventId: string): Promise<string[]> {
  const file = path.join(ROOT, 'src', 'lib', 'cues', `${eventId}.ts`);
  try {
    const src = await fs.readFile(file, 'utf-8');
    const ids: string[] = [];
    const rx = /cueId\s*:\s*['"]([^'"]+)['"]/g;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(src)) !== null) ids.push(m[1]);
    return ids;
  } catch {
    return [];
  }
}

/** Roughly extract { eventId: [sceneObjectIds] } from an era shard by
 *  walking the source: split on top-level event keys, then collect
 *  `id: '...'` entries inside each event's block. The parser is
 *  intentionally simple — shards follow a predictable shape and we
 *  control the file format. */
async function readSceneObjects(era: string): Promise<Map<string, string[]>> {
  const file = path.join(ROOT, 'src', 'lib', 'sceneObjects', `${era}.ts`);
  const out = new Map<string, string[]>();
  try {
    const src = await fs.readFile(file, 'utf-8');
    // Each top-level key looks like:   'event-id': [\n ... \n ],
    const blockRx = /['"`]([a-z0-9-]+)['"`]\s*:\s*\[([\s\S]*?)^\s*\],?/gm;
    let m: RegExpExecArray | null;
    while ((m = blockRx.exec(src)) !== null) {
      const eventId = m[1];
      const body = m[2];
      const ids: string[] = [];
      const idRx = /\bid\s*:\s*['"]([^'"]+)['"]/g;
      let im: RegExpExecArray | null;
      while ((im = idRx.exec(body)) !== null) ids.push(im[1]);
      out.set(eventId, ids);
    }
  } catch {
    // shard missing — empty map
  }
  return out;
}

function isViolation(sceneId: string, cueId: string): boolean {
  const key = Object.keys(EQUIVALENCES).find((k) => sceneId.toLowerCase().includes(k));
  if (!key) return false;
  return EQUIVALENCES[key].includes(cueId);
}

async function main(): Promise<void> {
  const events = await readEvents();
  const sceneCache = new Map<string, Map<string, string[]>>();
  const violations: string[] = [];
  for (const ev of events) {
    if (!sceneCache.has(ev.era)) sceneCache.set(ev.era, await readSceneObjects(ev.era));
    const scenes = sceneCache.get(ev.era)!;
    const sceneIds = scenes.get(ev.id) ?? [];
    if (sceneIds.length === 0) continue;
    const cueIds = await readCueIds(ev.id);
    for (const sid of sceneIds) {
      for (const cid of cueIds) {
        if (isViolation(sid, cid)) {
          violations.push(
            `${ev.id} (${ev.era}): scene-object id="${sid}" collides with cue "${cid}" — use fx:animate-scene-object instead.`,
          );
        }
      }
    }
  }
  if (violations.length > 0) {
    console.error('verify-no-duplicate-fx — FAIL');
    violations.forEach((v) => console.error('  ✗', v));
    process.exit(1);
  }
  console.log(`verify-no-duplicate-fx — OK (${events.length} events checked)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
