#!/usr/bin/env node
/**
 * generate-narrations.mjs
 *
 * Pre-generates MP3 narrations for every event in `src/content/events/*.mdx`
 * using the Microsoft Edge Read Aloud TTS endpoint (free, no API key) via
 * the `msedge-tts` package. Output: `public/audio/{event-id}.mp3` plus a
 * `public/audio/manifest.json` cache that maps `eventId -> sha256(text)`.
 *
 * Usage:
 *   node scripts/generate-narrations.mjs            # generate everything (cached)
 *   node scripts/generate-narrations.mjs --force    # ignore cache, re-generate all
 *   node scripts/generate-narrations.mjs --only=abraham-rompe-idolos[,otro-id]
 *   node scripts/generate-narrations.mjs --voice=es-MX-DaliaNeural
 *
 * Voices (Spanish neural):
 *   es-ES-AlvaroNeural    (Spain, male, classical narration — default)
 *   es-ES-ElviraNeural    (Spain, female)
 *   es-MX-JorgeNeural     (Mexico, male)
 *   es-MX-DaliaNeural     (Mexico, female)
 *
 * No internet → script skips with a warning so build does not break.
 */
import { readFile, writeFile, mkdir, readdir, rename, rm, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EVENTS_DIR = path.join(ROOT, 'src', 'content', 'events');
const OUT_DIR = path.join(ROOT, 'public', 'audio');
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json');

// --- CLI args -------------------------------------------------------------
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const onlyArg = args.find((a) => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice('--only='.length).split(',').map((s) => s.trim()).filter(Boolean) : null;
const voiceArg = args.find((a) => a.startsWith('--voice='));
const VOICE = voiceArg ? voiceArg.slice('--voice='.length) : 'es-ES-AlvaroNeural';

// --- Text cleaning (mirror of EventScene.astro `cleanForTTS`) -------------
function cleanForTTS(s) {
  if (!s) return '';
  return s
    .replace(/[#*_`>]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\([^()]*\)/g, '')
    .replace(/\([^()]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\b(?:Gn|Génesis|Ex|Éxodo|Lv|Levítico|Nm|Números|Dt|Deuteronomio|Mt|Mateo|Mc|Marcos|Lc|Lucas|Jn|Juan|Hch|Hechos|Ro|Romanos|Heb|Hebreos|Sura)\s*\d+:\d+(?:-\d+)?\b/g, '')
    .replace(/[ \t]+([,.;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/[ \t]*([,.;:])[ \t]*\1+/g, '$1')
    .trim();
}

function buildNarration(frontmatter, body) {
  const parts = [
    frontmatter.title,
    frontmatter.subtitle ?? '',
    cleanForTTS(body),
    cleanForTTS(frontmatter.comparative?.unified ?? ''),
    frontmatter.comparative?.divergent && frontmatter.comparative?.tora
      ? `Según la Torá: ${cleanForTTS(frontmatter.comparative.tora.summary)}`
      : '',
    frontmatter.comparative?.divergent && frontmatter.comparative?.biblia
      ? `Según la Biblia: ${cleanForTTS(frontmatter.comparative.biblia.summary)}`
      : '',
    frontmatter.comparative?.divergent && frontmatter.comparative?.coran
      ? `Según el Corán: ${cleanForTTS(frontmatter.comparative.coran.summary)}`
      : '',
  ];
  return parts.filter(Boolean).join('. ').replace(/\s+/g, ' ').trim();
}

function sha256(s) {
  return createHash('sha256').update(s, 'utf8').digest('hex');
}

async function loadManifest() {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveManifest(m) {
  await writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + '\n', 'utf8');
}

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

// --- TTS synthesis --------------------------------------------------------
async function synthesizeToFile(tts, text, outPath) {
  // toFile writes to a directory using a generated filename; we capture the
  // returned path and rename to our deterministic name.
  const dir = path.dirname(outPath);
  const result = await tts.toFile(dir, text);
  if (!result?.audioFilePath) throw new Error('No audioFilePath in response');
  // Rename whatever filename msedge-tts produced to our id.mp3
  if (path.resolve(result.audioFilePath) !== path.resolve(outPath)) {
    if (existsSync(outPath)) await rm(outPath, { force: true });
    await rename(result.audioFilePath, outPath);
  }
  // Clean up any sibling metadata json file the lib may have produced
  if (result.metadataFilePath) {
    try { await rm(result.metadataFilePath, { force: true }); } catch {}
  }
}

// --- Main -----------------------------------------------------------------
async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest = await loadManifest();

  const files = (await readdir(EVENTS_DIR)).filter((f) => f.endsWith('.mdx'));
  if (files.length === 0) {
    console.error('No event .mdx files found in', EVENTS_DIR);
    process.exit(1);
  }

  // Parse all events first (fast, no network).
  const events = [];
  for (const f of files) {
    const fp = path.join(EVENTS_DIR, f);
    const raw = await readFile(fp, 'utf8');
    const { data, content } = matter(raw);
    const id = data.id || path.basename(f, '.mdx');
    if (ONLY && !ONLY.includes(id)) continue;
    const text = buildNarration(data, content);
    if (!text) continue;
    events.push({ id, text, hash: sha256(text + '|' + VOICE) });
  }

  console.log(`Found ${events.length} event(s) to consider (voice: ${VOICE})`);

  // Determine which need (re)generation.
  const todo = [];
  for (const ev of events) {
    const outPath = path.join(OUT_DIR, `${ev.id}.mp3`);
    const cached = manifest[ev.id];
    if (!FORCE && cached === ev.hash && (await fileExists(outPath))) {
      continue; // up to date
    }
    todo.push({ ...ev, outPath });
  }

  if (todo.length === 0) {
    console.log('All narrations are up to date. Nothing to do.');
    return;
  }

  console.log(`Generating ${todo.length} narration(s)...`);

  // Initialize TTS engine (one connection, reused across calls).
  const tts = new MsEdgeTTS();
  try {
    await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  } catch (err) {
    console.error('Failed to initialize Edge TTS:', err?.message || err);
    console.error('Aborting — check internet connection and voice name.');
    process.exit(2);
  }

  let ok = 0, fail = 0;
  for (const ev of todo) {
    const charCount = ev.text.length;
    process.stdout.write(`  ${ev.id} (${charCount} chars)... `);
    try {
      await synthesizeToFile(tts, ev.text, ev.outPath);
      manifest[ev.id] = ev.hash;
      // Persist manifest incrementally so partial runs don't lose progress.
      await saveManifest(manifest);
      ok++;
      console.log('ok');
    } catch (err) {
      fail++;
      console.log('FAIL —', err?.message || err);
    }
  }

  try { tts.close(); } catch {}

  console.log(`\nDone. ok=${ok} fail=${fail} skipped=${events.length - todo.length}`);
  if (fail > 0) process.exitCode = 3;
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
