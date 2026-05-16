import { promises as fs } from 'node:fs';
import fg from 'fast-glob';
import matter from 'gray-matter';

const BIBLE_BOOKS = new Set([
  'Génesis','Éxodo','Levítico','Números','Deuteronomio',
  'Josué','Jueces','Rut','1 Samuel','2 Samuel','1 Reyes','2 Reyes',
  'Salmos','Isaías','Jeremías','Ezequiel','Daniel',
  'Mateo','Marcos','Lucas','Juan','Hechos','Romanos',
  '1 Corintios','2 Corintios','Hebreos','1 Pedro','2 Pedro','1 Timoteo',
  '1 Juan','2 Juan','3 Juan','Judas','Apocalipsis',
  'Gálatas','Efesios','Filipenses','Colosenses','1 Tesalonicenses','2 Tesalonicenses',
  '2 Timoteo','Tito','Filemón','Santiago',
  '1 Crónicas','2 Crónicas','Esdras','Nehemías','Ester','Job','Proverbios',
  'Eclesiastés','Cantares','Lamentaciones','Oseas','Joel','Amós','Abdías',
  'Jonás','Miqueas','Nahúm','Habacuc','Sofonías','Hageo','Zacarías','Malaquías',
]);

async function main() {
  const issues: string[] = [];

  const events = await fg('src/content/events/**/*.mdx');
  for (const file of events) {
    const src = await fs.readFile(file, 'utf-8');
    const { data } = matter(src);

    for (const s of (data.sources ?? [])) {
      if (!s.type) issues.push(`${file}: source without type`);
      if (!s.title) issues.push(`${file}: source without title`);
    }

    for (const loc of (data.locations ?? [])) {
      if (!loc.svgPosition || loc.svgPosition.length !== 2) {
        issues.push(`${file}: location ${loc.id} missing svgPosition`);
      }
    }

    if (data.comparative?.divergent && !(data.comparative.tora || data.comparative.biblia || data.comparative.coran)) {
      issues.push(`${file}: marked divergent but no tradition details provided`);
    }
  }

  const characters = await fg('src/content/characters/**/*.mdx');
  for (const file of characters) {
    const src = await fs.readFile(file, 'utf-8');
    const { data } = matter(src);
    const m = data.mentions ?? {};
    for (const ref of (m.biblia ?? [])) {
      if (ref.book && !BIBLE_BOOKS.has(ref.book)) {
        issues.push(`${file}: unknown Bible book "${ref.book}"`);
      }
    }
  }

  if (issues.length > 0) {
    console.error('Verification failed:\n' + issues.map((i) => '  - ' + i).join('\n'));
    process.exit(1);
  }
  console.log('All citations and references verified ✓');
}

main();
