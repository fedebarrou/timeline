#!/usr/bin/env node
// One-shot script: inject `media.hero` block into event MDX frontmatter
// for events in eras: exodo, reinos-y-exilio, evangelio, revelacion.
//
// IMPORTANT (mime validation): Wikimedia downloads sometimes return 40KB
// HTML pages instead of images on miss — verify mime when downloading.
//
// This script only edits MDX; image files must be downloaded separately
// into /public/images/events/{era}/{id}.jpg (MediaHero shows a graceful
// placeholder if the file is missing).

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'src/content/events');

// Map: event-id -> { era, credit }
// `src` is always /images/events/{era}/{id}.jpg
// `license` is always "public-domain"
// `source` is always "Wikimedia Commons"
const HERO = {
  // ===== EXODO =====
  'esclavitud-en-egipto':           { era: 'exodo', credit: 'James Tissot, "Making Bricks Without Straw" (ca. 1900)' },
  'nacimiento-moises':              { era: 'exodo', credit: 'Lawrence Alma-Tadema, "The Finding of Moses" (1904)' },
  'moises-mata-egipcio':            { era: 'exodo', credit: 'James Tissot, "Moses Slays an Egyptian" (ca. 1900)' },
  'zarza-ardiente':                 { era: 'exodo', credit: 'Domenico Fetti, "Moses Before the Burning Bush" (ca. 1613-14)' },
  'moises-confronta-faraon':        { era: 'exodo', credit: 'Benjamin West, "Moses and Aaron Before Pharaoh" (s. XVIII)' },
  'diez-plagas':                    { era: 'exodo', credit: 'Gustave Doré, "The Plague of Darkness" (grabado, 1866)' },
  'pesaj-primera-pascua':           { era: 'exodo', credit: 'James Tissot, "The Signs on the Door" (ca. 1896-1902)' },
  'salida-de-egipto':               { era: 'exodo', credit: 'David Roberts, "The Israelites Leaving Egypt" (1828)' },
  'cruce-del-mar-rojo':             { era: 'exodo', credit: 'Cosimo Rosselli, "Crossing of the Red Sea" (Capilla Sixtina, 1481-82)' },
  'mana-y-codornices':              { era: 'exodo', credit: 'Jacopo Tintoretto, "The Gathering of the Manna" (1591-94)' },
  'agua-de-la-roca':                { era: 'exodo', credit: 'Jacopo Tintoretto, "Moses Striking Water from the Rock" (1577)' },
  'diez-mandamientos':              { era: 'exodo', credit: 'Rembrandt van Rijn, "Moisés con las Tablas de la Ley" (1659)' },
  'becerro-de-oro':                 { era: 'exodo', credit: 'Nicolas Poussin, "The Adoration of the Golden Calf" (1633-34)' },
  'tabernaculo':                    { era: 'exodo', credit: 'Gerard Hoet, "El Tabernáculo" (grabado, 1728)' },
  'doce-espias':                    { era: 'exodo', credit: 'James Tissot, "Moses and Joshua in the Tabernacle / The Grapes of Canaan" (ca. 1896-1902)' },
  'rebelion-core':                  { era: 'exodo', credit: 'Sandro Botticelli, "Castigo de los rebeldes / Punishment of Korah" (Capilla Sixtina, 1481-82)' },
  'moises-golpea-roca-segunda-vez': { era: 'exodo', credit: 'Gustave Doré, "Moses Striking the Rock" (grabado, 1866)' },
  'serpiente-de-bronce':            { era: 'exodo', credit: 'Anton van Dyck, "The Brazen Serpent" (ca. 1618-20)' },
  'muerte-de-aaron':                { era: 'exodo', credit: 'Gustave Doré, "The Death of Aaron" (grabado, 1866)' },
  'muerte-de-moises':               { era: 'exodo', credit: 'Luca Signorelli, "Testament and Death of Moses" (Capilla Sixtina, 1481-82)' },

  // ===== REINOS Y EXILIO =====
  'conquista-jerico':    { era: 'reinos-y-exilio', credit: 'Jean Fouquet, "Taking of Jericho" (Antiquités Judaïques, ca. 1470-75)' },
  'conquista-canaan':    { era: 'reinos-y-exilio', credit: 'John Martin, "Joshua Commanding the Sun to Stand Still upon Gibeon" (1816)' },
  'periodo-jueces':      { era: 'reinos-y-exilio', credit: 'Gustave Doré, "Jephthah\'s Daughter" (grabado, 1866)' },
  'debora-profetisa':    { era: 'reinos-y-exilio', credit: 'Charles Landelle, "Deborah" (1901)' },
  'gedeon':              { era: 'reinos-y-exilio', credit: 'Gustave Doré, "Gideon Chooses His Soldiers" (grabado, 1866)' },
  'samuel-ultimo-juez':  { era: 'reinos-y-exilio', credit: 'John Singleton Copley, "Samuel Reproving Saul" (1798)' },
  'reinado-saul':        { era: 'reinos-y-exilio', credit: 'Rembrandt van Rijn, "Saul y David" (ca. 1655-60)' },
  'elias-y-baal':        { era: 'reinos-y-exilio', credit: 'Lucas Cranach el Viejo, "Elías y los profetas de Baal" (s. XVI)' },
  'ascenso-elias':       { era: 'reinos-y-exilio', credit: 'Giuseppe Angeli, "Elías subiendo al cielo en un carro de fuego" (s. XVIII)' },
  'profetas-mayores':    { era: 'reinos-y-exilio', credit: 'Miguel Ángel, "El profeta Isaías" (Capilla Sixtina, 1509)' },
  'exilio-babilonico':   { era: 'reinos-y-exilio', credit: 'James Tissot, "The Flight of the Prisoners" (ca. 1896-1902)' },
  'regreso-del-exilio':  { era: 'reinos-y-exilio', credit: 'Gustave Doré, "Cyrus Restoring the Vessels of the Temple" (grabado, 1866)' },

  // ===== EVANGELIO =====
  'visitacion-isabel':         { era: 'evangelio', credit: 'Jacopo Pontormo, "La Visitación" (1528-29)' },
  'nacimiento-juan-bautista':  { era: 'evangelio', credit: 'Domenico Ghirlandaio, "Nacimiento de Juan Bautista" (Capilla Tornabuoni, 1486-90)' },
  'nacimiento-jesus':          { era: 'evangelio', credit: 'Gerard van Honthorst, "Adoración de los pastores" (1622)' },
  'presentacion-en-el-templo': { era: 'evangelio', credit: 'Rembrandt van Rijn, "El cántico de Simeón" (1631)' },
  'jesus-en-el-templo-12-anos':{ era: 'evangelio', credit: 'Heinrich Hofmann, "Cristo en el Templo" (1881)' },
  'bautismo-de-jesus':         { era: 'evangelio', credit: 'Andrea del Verrocchio y Leonardo da Vinci, "Bautismo de Cristo" (1472-75)' },
  'tentaciones-desierto':      { era: 'evangelio', credit: 'Sandro Botticelli, "Tentaciones de Cristo" (Capilla Sixtina, 1481-82)' },
  'eleccion-doce-apostoles':   { era: 'evangelio', credit: 'Domenico Ghirlandaio, "Vocación de los primeros apóstoles" (Capilla Sixtina, 1481-82)' },
  'milagros-de-jesus':         { era: 'evangelio', credit: 'Rembrandt van Rijn, "Cristo curando a los enfermos / Estampa de los Cien Florines" (ca. 1647-49)' },
  'entrada-triunfal-jerusalen':{ era: 'evangelio', credit: 'Giotto di Bondone, "Entrada de Cristo en Jerusalén" (Capilla Scrovegni, ca. 1305)' },
  'getsemani':                 { era: 'evangelio', credit: 'Heinrich Hofmann, "Cristo en Getsemaní" (1890)' },
  'juicios-jesus':             { era: 'evangelio', credit: 'Antonio Ciseri, "Ecce Homo" (1871)' },
  'crucifixion':               { era: 'evangelio', credit: 'Diego Velázquez, "Cristo crucificado" (1632)' },
  'ascension':                 { era: 'evangelio', credit: 'Rembrandt van Rijn, "La ascensión de Cristo" (1636)' },
  'martirio-esteban':          { era: 'evangelio', credit: 'Rembrandt van Rijn, "La lapidación de san Esteban" (1625)' },
  'viajes-misioneros-pablo':   { era: 'evangelio', credit: 'Rafael Sanzio, "San Pablo predicando en Atenas" (cartón, 1515-16)' },
  'muerte-pedro-pablo':        { era: 'evangelio', credit: 'Caravaggio, "Crucifixión de san Pedro" (1601)' },

  // ===== REVELACION (Islam — manuscritos sin rostro / con rostro velado) =====
  // Climácticos con obra concreta:
  'nacimiento-mahoma':          { era: 'revelacion', credit: 'Rashīd al-Dīn, Jāmiʿ al-tawārīkh ("Nacimiento de Mahoma"), manuscrito ilkhánida (Tabriz, 1314-15) — Edinburgh University Library' },
  'infancia-amina-y-halima':    { era: 'revelacion', credit: 'Siyer-i Nebi, "Mahoma entregado a Halima" — manuscrito otomano iluminado (Estambul, 1595)' },
  'matrimonio-con-khadija':     { era: 'revelacion', credit: 'Siyer-i Nebi, "Matrimonio de Mahoma con Khadīja" — manuscrito otomano (Estambul, 1595)' },
  'revelacion-en-hira':         { era: 'revelacion', credit: 'Rashīd al-Dīn, Jāmiʿ al-tawārīkh, "Mahoma recibe la primera revelación en la cueva de Hira" — manuscrito ilkhánida (Tabriz, 1307)' },
  'predicacion-publica':        { era: 'revelacion', credit: 'Siyer-i Nebi, "Mahoma predica en Meca" — manuscrito otomano iluminado (Estambul, 1595)' },
  'viaje-nocturno-mi-raj':      { era: 'revelacion', credit: 'Sultan Muhammad, "Miʿrāj de Mahoma" — Khamsa de Niẓāmī, manuscrito safávida (Tabriz, 1539-43), British Library' },
  'hegira-migracion-a-medina':  { era: 'revelacion', credit: 'Siyer-i Nebi, "La Hégira: Mahoma y Abū Bakr llegan a Medina" — manuscrito otomano (Estambul, 1595)' },
  'fundacion-comunidad-medina': { era: 'revelacion', credit: 'Siyer-i Nebi, "Mahoma funda la mezquita de Medina" — manuscrito otomano (Estambul, 1595)' },
  'batalla-de-badr':            { era: 'revelacion', credit: 'Siyer-i Nebi, "Batalla de Badr" — manuscrito otomano iluminado (Estambul, 1595)' },
  'batalla-de-uhud':            { era: 'revelacion', credit: 'Siyer-i Nebi, "Batalla de Uḥud" — manuscrito otomano iluminado (Estambul, 1595)' },
  'conquista-de-meca':          { era: 'revelacion', credit: 'Siyer-i Nebi, "Mahoma destruye los ídolos de la Kaaba tras la conquista de Meca" — manuscrito otomano (Estambul, 1595)' },
  'peregrinacion-de-despedida': { era: 'revelacion', credit: 'Rashīd al-Dīn, Jāmiʿ al-tawārīkh, "Mahoma en la peregrinación de despedida" — manuscrito ilkhánida (Tabriz, 1314-15)' },
  'muerte-de-mahoma':           { era: 'revelacion', credit: 'Siyer-i Nebi, "Muerte del profeta Mahoma" — manuscrito otomano iluminado (Estambul, 1595)' },

  // Menores (TODO — placeholders con manuscrito genérico):
  'muerte-de-amina':             { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'muerte-de-abdulmuttalib':     { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'viaje-con-abu-talib-bahira':  { era: 'revelacion', credit: 'Jāmiʿ al-tawārīkh, "Encuentro del joven Mahoma con el monje Baḥīrā" — manuscrito ilkhánida (Tabriz, ca. 1314)', todo: true },
  'predicacion-secreta':         { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'migracion-a-abisinia':        { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'boicot-de-quraysh':           { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'ano-de-tristeza':             { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'conversion-de-medina-ansar':  { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
  'batalla-del-foso':            { era: 'revelacion', credit: 'Siyer-i Nebi, "Batalla del Foso (al-Khandaq)" — manuscrito otomano (Estambul, 1595)', todo: true },
  'tratado-de-hudaibiya':        { era: 'revelacion', credit: 'Miniatura otomana del ciclo de la Sira (manuscrito ilustrado de los siglos XVI-XVII)', todo: true },
};

function buildBlock(id, info) {
  const src = `/images/events/${info.era}/${id}.jpg`;
  const lines = [];
  if (info.todo) {
    lines.push('# TODO: imagen pendiente — usar miniatura/manuscrito histórico con licencia public-domain de Wikimedia Commons');
  }
  lines.push('media:');
  lines.push('  hero:');
  lines.push(`    src: "${src}"`);
  lines.push(`    credit: ${JSON.stringify(info.credit)}`);
  lines.push('    license: "public-domain"');
  lines.push('    source: "Wikimedia Commons"');
  return lines.join('\n');
}

let modified = 0;
let skipped = 0;
for (const [id, info] of Object.entries(HERO)) {
  const file = path.join(root, id + '.mdx');
  if (!fs.existsSync(file)) {
    console.warn('MISSING FILE:', file);
    skipped++;
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  if (/^media:/m.test(content.split('\n').slice(0, 200).join('\n'))) {
    console.warn('ALREADY HAS media:', id);
    skipped++;
    continue;
  }
  // find the second '---' line (closing of frontmatter)
  const lines = content.split('\n');
  let closing = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { closing = i; break; }
  }
  if (closing < 0) {
    console.error('NO closing frontmatter:', id);
    skipped++;
    continue;
  }
  const block = buildBlock(id, info);
  const newLines = [...lines.slice(0, closing), block, ...lines.slice(closing)];
  fs.writeFileSync(file, newLines.join('\n'), 'utf8');
  modified++;
  console.log('OK', id);
}
console.log(`\nDone. modified=${modified} skipped=${skipped}`);
