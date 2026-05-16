import { promises as fs } from 'node:fs';
import fg from 'fast-glob';
import matter from 'gray-matter';

const VALID_LICENSES = new Set([
  'public-domain', 'cc0', 'cc-by', 'cc-by-sa',
  'open-access', 'fair-use', 'ai-generated',
]);

async function main() {
  const issues: string[] = [];
  const events = await fg('src/content/events/**/*.mdx');

  for (const file of events) {
    const src = await fs.readFile(file, 'utf-8');
    const { data } = matter(src);
    const media = data.media ?? {};

    function check(item: any, label: string) {
      if (!item) return;
      if (!item.credit) issues.push(`${file}: ${label} missing credit`);
      if (!item.license) issues.push(`${file}: ${label} missing license`);
      else if (!VALID_LICENSES.has(item.license)) {
        issues.push(`${file}: ${label} has invalid license "${item.license}"`);
      }
      if (item.license === 'fair-use') {
        console.warn(`WARN ${file}: ${label} uses fair-use, manual review needed`);
      }
    }

    check(media.hero, 'hero');
    (media.gallery ?? []).forEach((g: any, i: number) => check(g, `gallery[${i}]`));
  }

  if (issues.length > 0) {
    console.error('License verification failed:\n' + issues.map((i) => '  - ' + i).join('\n'));
    process.exit(1);
  }
  console.log('All licenses verified ✓');
}

main();
