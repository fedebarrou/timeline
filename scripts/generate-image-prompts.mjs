#!/usr/bin/env node
/**
 * Generate CONTENIDO_PROMPTS.md — a narrative-faithful prompt per character
 * and per location, ready to paste into Midjourney / Flux / DALL·E 3.
 *
 * Each prompt blends:
 *  - The entity's name + meaning + key narrative detail from its own MDX/JSON.
 *  - A per-era visual STYLE anchor so the resulting library feels cohesive.
 *  - Composition + lighting + technical specs (aspect ratio, --v 6, etc.).
 */
import { readFileSync, writeFileSync } from 'node:fs';

const chars = JSON.parse(readFileSync('.agent-data/chars-full.json', 'utf8'));
const locs  = JSON.parse(readFileSync('.agent-data/locs-full.json',  'utf8'));

// ─── PER-ERA VISUAL STYLE ANCHORS ──────────────────────────────────────────
// Calibrated so each era reads visually distinct yet "biblical".
const STYLE = {
  'patriarcas':         { era: 'Era Primordial', style: 'ancient Mesopotamian fresco painting, weathered ochre and clay tones, primal humanity, early Bronze Age aesthetic, atmospheric dust, candle-lit chiaroscuro, painterly brush strokes, archaic dignity' },
  'linaje-set':         { era: 'Era Primordial · Línea de Set', style: 'archaic genealogical lineage, sepia tones, scribal manuscript illumination, dim oil-lamp light, stone-relief atmosphere' },
  'descendientes-cain': { era: 'Era Primordial · Descendientes de Caín', style: 'iron-age workshop in firelight, sooty hammered bronze, Mesopotamian artisanal scene, chiaroscuro forge glow, archaic ornaments' },
  'vigilantes':         { era: 'Era Primordial · Vigilantes y apócrifos', style: 'apocryphal Book of Enoch iconography, dark sublime, midnight indigo skies, fallen-angel atmosphere, smoke and ash, towering Nephilim silhouettes, Romanesque manuscript margin imagery' },
  'patriarcal':         { era: 'Era Patriarcal', style: 'Caravaggesque oil painting, golden-hour Levantine desert, bronze and amber palette, nomadic Bronze Age garb, tents and flocks, deep chiaroscuro, devout solemnity' },
  'exodo':              { era: 'Era Éxodo', style: 'epic biblical cinema, Cecil B. DeMille atmosphere, Egyptian and Sinai desert vistas, sandstorm light, robes whipped by wind, dramatic backlight, fresco-like high contrast' },
  'reinos-y-exilio':    { era: 'Era Reinos y Exilio', style: 'late Renaissance oil painting, Florentine and Venetian palette, royal regalia, cedar of Lebanon and palms, golden crowns and harps, deep velvet shadows, prophetic intensity' },
  'evangelio-familia':            { era: 'Era Evangelio · Familia', style: 'Italian Renaissance fresco, soft devotional light, golden halo subtle, Galilean village setting, linen robes, Madonna-and-child humility, Botticelli serenity' },
  'evangelio-magos':              { era: 'Era Evangelio · Magos y Herodes', style: 'Persian-influenced nativity painting, ornate eastern robes, frankincense smoke, star-lit caravan, gold leaf accents, Byzantine icon undertones' },
  'evangelio-apostoles':          { era: 'Era Evangelio · Apóstoles', style: 'Caravaggio chiaroscuro, fisherman simplicity, Mediterranean linen and rope sandals, halo as gentle light, devotional gravitas, dark olive background' },
  'evangelio-primeros-cristianos':{ era: 'Era Evangelio · Primeros cristianos', style: 'early Roman-era catacomb fresco aesthetic, faded ochre and cyan, communal devotion, Greco-Roman robes, oil-lamp glow, martyrial calm' },
  'revelacion':         { era: 'Era Revelación', style: 'Persian miniature painting, intricate gold-leaf frame, Safavid palette of azure-cobalt-saffron, Arabian desert and Mecca-Medina architectural background, calligraphic accents, no facial features for the Prophet (per Sunni tradition — flame halo instead)' },
};

const REGION_STYLE = {
  mesopotamia: 'ancient Mesopotamian river plain, ziggurat silhouettes, date palms, Tigris-Euphrates wetlands, dusty amber sky',
  anatolia: 'rolling Anatolian highlands, weathered limestone cliffs, sparse cedars, blue-grey mountain mist',
  levante: 'Levantine hills and olive groves, terraced stone walls, white limestone villages, warm golden Mediterranean light',
  arabia: 'red-orange Arabian desert dunes, basalt outcrops, oasis date palms, low golden sun',
  egipto: 'Nile delta floodplain, papyrus reeds and lotus, pyramids and obelisks distant, Old Kingdom aesthetic, ochre light',
  persia: 'high Iranian plateau, ruined Persepolis columns, snow-capped Zagros mountains, cobalt sky',
  africa: 'East African highlands, Aksumite stelae, acacia trees, terracotta soil, brilliant equatorial light',
  mediterraneo: 'Mediterranean coastline, marble ruins, cypress trees, classical antiquity light',
  asia_menor: 'Asia Minor coast, Greco-Roman ruins, pine and olive, soft Aegean haze',
  cosmico: 'celestial heavens, layered firmament, golden seraphic light, surreal infinite perspective',
};

// ─── HELPERS ───────────────────────────────────────────────────────────────
function clean(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}
function truncate(s, n = 240) {
  s = clean(s);
  if (s.length <= n) return s;
  return s.slice(0, n).replace(/\s+\S*$/, '') + '…';
}

/** Pull a single descriptive sentence from a longer significance text. */
function leadSentence(s) {
  if (!s) return '';
  const sentences = clean(s).split(/(?<=[.!?])\s+/);
  return sentences[0] || '';
}

// ─── CHARACTER PROMPTS ─────────────────────────────────────────────────────
function buildCharacterPrompt(c) {
  const era = STYLE[c.group] ?? { era: 'Era desconocida', style: 'biblical oil painting, museum quality' };
  const meaning = c.meaning ? `meaning "${c.meaning}"` : '';
  const lead = leadSentence(c.significance);
  const narrative = lead || '';
  const isFemale = /^(eva|sara|raquel|lia|lea|agar|raab|debora|ester|rut|noemi|miriam|maria|maría|elisabet|isabel|ana|marta|magdalena|fatima|khadija|aisha|amina|halima|zila|ada|hagar|saraí|sara)/i.test(c.name);
  const subjectKind = c.group === 'revelacion' && /mahoma/i.test(c.name)
    ? 'Reverent depiction of a robed figure with face replaced by a soft flame-halo (per Sunni iconographic tradition)'
    : isFemale
      ? `Portrait of a woman, ${c.name}`
      : `Portrait of a man, ${c.name}`;

  return [
    subjectKind,
    meaning,
    narrative ? `— ${narrative}` : '',
    `Style: ${era.style}.`,
    'Composition: head-and-shoulders, slight three-quarter view, eyes catching the light.',
    'Highly detailed face, museum-grade brushwork, no text, no watermark.',
    '--ar 2:3 --style raw --v 6 --quality 2',
  ].filter(Boolean).join(' ');
}

// ─── LOCATION PROMPTS ──────────────────────────────────────────────────────
function buildLocationPrompt(l) {
  const region = REGION_STYLE[l.region] || 'arid Near-Eastern landscape, warm tones';
  const lead = leadSentence(l.description);
  return [
    `Wide cinematic landscape of ${l.ancient}${l.modern ? ` (modern: ${l.modern})` : ''}.`,
    lead || '',
    `Setting: ${region}.`,
    'Style: hyper-detailed cinematic matte painting, golden-hour light, atmospheric haze, deep depth-of-field, oil-painting brushwork, no text or labels.',
    'No people in foreground; the place itself is the subject.',
    '--ar 16:9 --style raw --v 6 --quality 2',
  ].filter(Boolean).join(' ');
}

// ─── ASSEMBLY ──────────────────────────────────────────────────────────────
const GROUP_ORDER = [
  'patriarcas','linaje-set','descendientes-cain','vigilantes',
  'patriarcal','exodo','reinos-y-exilio',
  'evangelio-familia','evangelio-magos','evangelio-apostoles','evangelio-primeros-cristianos',
  'revelacion',
];
const GROUP_LABEL = {
  'patriarcas':'Era 1 · Primordial — Patriarcas pre-diluvio',
  'linaje-set':'Era 1 · Primordial — Línea de Set',
  'descendientes-cain':'Era 1 · Primordial — Descendientes de Caín',
  'vigilantes':'Era 1 · Primordial — Vigilantes y apócrifos',
  'patriarcal':'Era 2 · Patriarcal',
  'exodo':'Era 3 · Éxodo',
  'reinos-y-exilio':'Era 4 · Reinos y Exilio',
  'evangelio-familia':'Era 5 · Evangelio — Familia y niñez de Jesús',
  'evangelio-magos':'Era 5 · Evangelio — Reyes Magos y Herodes',
  'evangelio-apostoles':'Era 5 · Evangelio — Doce apóstoles y Pablo',
  'evangelio-primeros-cristianos':'Era 5 · Evangelio — Primeros cristianos',
  'revelacion':'Era 6 · Revelación',
};

const REGION_LABEL = {
  mesopotamia:'Mesopotamia (Irak)',
  anatolia:'Anatolia (Turquía)',
  levante:'Levante (Israel · Palestina · Líbano · Jordania · Siria)',
  arabia:'Arabia',
  egipto:'Egipto',
  persia:'Persia (Irán)',
  africa:'África (Etiopía · Eritrea)',
  asia_menor:'Asia Menor',
  mediterraneo:'Mediterráneo (Grecia · Italia)',
  cosmico:'Cósmico',
};

let md = '';
md += '# Image-generation prompts — Personajes y Lugares\n\n';
md += '> Prompts narrativos pensados para **Midjourney v6 / Flux / DALL·E 3**. Cada uno mezcla la información del MDX/JSON del proyecto con un anclaje de estilo coherente por era.\n\n';
md += `**Totales**: ${chars.length} personajes · ${locs.length} lugares\n\n`;
md += '**Cómo usarlos**\n\n';
md += '1. Copiá el prompt completo (incluyendo `--ar 2:3 --style raw --v 6 --quality 2`).\n';
md += '2. Para DALL·E 3 / Flux quitá los flags `--*` (son syntax de Midjourney) y pasale el texto puro.\n';
md += '3. Si querés variantes, agregá al final: ` --chaos 15 --weird 50` (Midjourney).\n';
md += '4. Para retratos, generá 4 variantes y elegí la cara con mejor coherencia.\n';
md += '5. Guardá el archivo según la convención: `public/images/characters/{group}/{id}.{png|jpg}` ó `public/images/locations/{id}.jpg`.\n\n';
md += '---\n\n';

md += '## 🧑 Personajes\n\n';

const byGroup = new Map();
for (const c of chars) {
  const g = c.group || 'sin-grupo';
  (byGroup.get(g) ?? byGroup.set(g, []).get(g)).push(c);
}
byGroup.forEach((arr) => arr.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es')));

for (const g of GROUP_ORDER) {
  const list = byGroup.get(g);
  if (!list?.length) continue;
  md += `### ${GROUP_LABEL[g]} (${list.length})\n\n`;
  for (const c of list) {
    md += `#### ${c.name} (\`${c.id}\`)\n\n`;
    if (c.meaning) md += `*Significado:* ${c.meaning}\n\n`;
    if (c.significance) md += `*Resumen:* ${truncate(c.significance, 280)}\n\n`;
    md += '**Prompt**:\n\n```\n' + buildCharacterPrompt(c) + '\n```\n\n';
  }
}

if (byGroup.get('sin-grupo')) {
  md += `### Sin grupo asignado (${byGroup.get('sin-grupo').length})\n\n`;
  for (const c of byGroup.get('sin-grupo')) {
    md += `#### ${c.name} (\`${c.id}\`)\n\n`;
    if (c.meaning) md += `*Significado:* ${c.meaning}\n\n`;
    md += '**Prompt**:\n\n```\n' + buildCharacterPrompt(c) + '\n```\n\n';
  }
}

md += '---\n\n## 📍 Lugares\n\n';

const byRegion = new Map();
for (const l of locs) {
  const r = l.region || 'sin-region';
  (byRegion.get(r) ?? byRegion.set(r, []).get(r)).push(l);
}
byRegion.forEach((arr) => arr.sort((a, b) => (a.ancient || '').localeCompare(b.ancient || '', 'es')));

const regionOrder = Object.keys(REGION_LABEL).filter((r) => byRegion.has(r)).concat(
  Array.from(byRegion.keys()).filter((r) => !REGION_LABEL[r]),
);
for (const r of regionOrder) {
  const list = byRegion.get(r);
  if (!list?.length) continue;
  md += `### ${REGION_LABEL[r] || r} (${list.length})\n\n`;
  for (const l of list) {
    md += `#### ${l.ancient} (\`${l.id}\`)\n\n`;
    if (l.modern) md += `*Hoy:* ${l.modern}\n\n`;
    if (l.description) md += `*Resumen:* ${truncate(l.description, 280)}\n\n`;
    md += '**Prompt**:\n\n```\n' + buildLocationPrompt(l) + '\n```\n\n';
  }
}

writeFileSync('CONTENIDO_PROMPTS.md', md);
console.log('CONTENIDO_PROMPTS.md written, length:', md.length, 'chars');
