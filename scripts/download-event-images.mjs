#!/usr/bin/env node
// Downloads hero images from Wikimedia Commons for timeline biblical events.
// Strategy:
//   1. EXPLICIT_FILE map for entries with a known-good File: title (curated).
//   2. Otherwise, search Commons + score candidates by token overlap.
//   3. Validate mime; HTML/non-image bytes are discarded with logging.
//
// Run: node scripts/download-event-images.mjs           (skip existing valid)
// Run: node scripts/download-event-images.mjs --force   (re-download all)

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'public/images/events');
const USER_AGENT = 'TimelineBiblicalApp/1.0 (https://github.com/fedeb-utn)';
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const MAX_BYTES = 5 * 1024 * 1024;
const MIN_WIDTH = 600;
const THUMB_WIDTH = 1280;
const MIN_SCORE = 2;

// HERO mirror — only concrete artwork entries (excludes TODO-revelation generics).
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

  // ===== REVELACION =====
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
};

// Curated, known-good File: titles from manual verification on Wikimedia Commons.
// Used in priority order; first that resolves with valid imageinfo + image bytes wins.
const EXPLICIT_FILE = {
  // EXODO
  // "Making Bricks Without Straw" by Tissot is NOT on Commons; substitute with
  // a closely related Tissot Egypt-slavery work from the same series.
  'esclavitud-en-egipto': [
    'File:Tissot Pharaoh and the Midwives.jpg',
    'File:Tissot Pharaoh\'s Daughter Receives the Mother of Moses.jpg',
  ],
  'nacimiento-moises':    ['File:1904 Lawrence Alma-Tadema - The Finding of Moses.jpg'],
  'moises-mata-egipcio':  ['File:Tissot Moses Slays an Egyptian.jpg'],
  'zarza-ardiente':       ['File:Domenico Fetti - Moses before the burning bush - M.Ob.769 MNW - National Museum in Warsaw.jpg'],
  'moises-confronta-faraon': [
    'File:Benjamin West - Moses Shown the Promised Land - 2009.49 - Yale University Art Gallery.jpg',
    'File:Moses Speaks to Pharaoh, by James Tissot.jpg',
    'File:Moses and Aaron before Pharaoh.jpg',
  ],
  'diez-plagas':          ['File:034.The Ninth Plague. Darkness.jpg'],
  'pesaj-primera-pascua': ['File:Tissot The Signs on the Door.jpg'],
  'salida-de-egipto':     ['File:David Roberts-IsraelitesLeavingEgypt 1828.jpg', 'File:David Roberts 001.jpg'],
  'cruce-del-mar-rojo':   ['File:Cosimo Rosselli Attraversamento del Mar Rosso.jpg'],
  'mana-y-codornices':    ['File:Jacopo Tintoretto - The Jews in the Desert - WGA22646.jpg', 'File:MilagroDelMana.jpg'],
  'agua-de-la-roca':      ['File:Tintoretto, Jacopo - Moses Striking Water from the Rock - 1577.jpg'],
  'diez-mandamientos':    ['File:Rembrandt - Moses Smashing the Tablets of the Law - WGA19132.jpg'],
  'becerro-de-oro':       ['File:Nicolas Poussin - The Adoration of the Golden Calf - WGA18293.jpg'],
  'tabernaculo':          ['File:Figures The erection of the Tabernacle and the Sacred vessels.jpg'],
  'doce-espias':          ['File:Tissot Moses and Joshua in the Tabernacle.jpg'],
  'rebelion-core':        ['File:Botticcelli, Sandro - The Punishment of Korah and the Stoning of Moses and Aaron - 1481-82.jpg'],
  'moises-golpea-roca-segunda-vez': ['File:Dore Moses Striking the Rock in Horeb.jpg'],
  'serpiente-de-bronce':  ['File:Anthony van Dyck - The Brazen Serpent.jpg'],
  // "Death of Aaron" by Doré is not under that exact title; use Tissot's version.
  'muerte-de-aaron':      ['File:Tissot The Death of Aaron.jpg'],
  'muerte-de-moises':     ['File:Signorelli, Luca - Moses\'s Testament and Death - 1481-82.jpg'],

  // REINOS Y EXILIO
  'conquista-jerico':   ['File:Antonio Tempesta, The Taking of the City of Jericho, 1613, NGA 54502.jpg'],
  'conquista-canaan':   ['File:Joshua Commanding the Sun to Stand Still upon Gibeon (1816) John Martin - NGA 2004.64.1.jpg'],
  'periodo-jueces':     ['File:058.Jephthah\'s Daughter Comes to Meet Her Father.jpg'],
  'debora-profetisa':   ['File:Deborah-judge.png'], // Charles Landelle "Deborah" is not findable; keep Deborah-judge
  'gedeon':             ['File:Antonio Tempesta, Gideon Chooses His Soldiers, 1613, NGA 54505.jpg'],
  'samuel-ultimo-juez': ['File:Samuel reproving Saul.jpg'],
  'reinado-saul':       ['File:Rembrandt van Rijn - Saul and David - 621 - Mauritshuis.jpg'],
  'elias-y-baal':       ['File:Dresden, Gemäldegalerie Alte Meister, Lucas Cranach d.J., Elias und die Baalspriester.jpg'],
  'ascenso-elias':      ['File:Giuseppe Angeli, Elijah Taken Up in a Chariot of Fire, c. 1740-1755, NGA 41685.jpg'],
  'profetas-mayores':   ["File:'Isaiah Sistine Chapel ceiling' by Michelangelo JBU36FXD.jpg"],
  'exilio-babilonico':  ['File:Tissot The Flight of the Prisoners.jpg'],
  'regreso-del-exilio': ['File:104.Cyrus Restores the Vessels of the Temple.jpg'],

  // EVANGELIO
  'visitacion-isabel':         ['File:Pontormo-visitation-after-restorationRGB.jpg'],
  'nacimiento-juan-bautista':  ['File:Cappella Tornabuoni, Birth of Birth of Saint John the Baptist 03.jpg'],
  'nacimiento-jesus':          ['File:Gerard van Honthorst - Adoration of the Shepherds (1622).jpg'],
  'presentacion-en-el-templo': ['File:Het loflied van Simeon, Rembrandt van Rijn, 1631, Mauritshuis, The Hague.jpg'],
  // Hofmann's "Christ in the Temple" (1881) is post-public-domain in some
  // jurisdictions; use the closest engraving available on Commons.
  'jesus-en-el-templo-12-anos': [
    'File:Jesus at the age of twelve, discoursing with the learned doctors - Luke II, 46 - painted by J.M.H. Hofmann ; engraved by Illman Brothers. LCCN2006678629.jpg',
  ],
  'bautismo-de-jesus':         ['File:The Baptism of Christ (Verrocchio & Leonardo).jpg'],
  'tentaciones-desierto':      ['File:Sandro Botticelli - Three Temptations of Christ - WGA2755.jpg'],
  'eleccion-doce-apostoles':   ['File:Ghirlandaio, Domenico - Calling of the Apostles - 1481.jpg'],
  'milagros-de-jesus':         ['File:Rembrandt Harmensz. van Rijn - Christ with the Sick around Him, Receiving Little Children (The \'Hundred Guilder Print\') - Google Art Project.jpg'],
  'entrada-triunfal-jerusalen':['File:Giotto di Bondone - No. 26 Scenes from the Life of Christ - 10. Entry into Jerusalem - WGA09206.jpg'],
  // Hofmann's "Christ in Gethsemane" not on Commons in modern form; use Bloch's
  // similarly-titled 1880 painting as historical PD substitute.
  'getsemani':                 ["File:'Christ in Gethsemane' by Carl Heinrich Bloch, 1880.jpg"],
  'juicios-jesus':             ['File:Antonio Ciseri - Ecce Homo.jpg'],
  'crucifixion':               ['File:Cristo crucificado.jpg', 'File:Diego Velázquez - Christ on the Cross - WGA24389.jpg'],
  'ascension':                 ['File:Rembrandt The Ascension 1636 Oil on canvas Alte Pinakothek Munich Germany.jpg'],
  'martirio-esteban':          ['File:Rembrandt-Lapidation-Saint-Étienne-MBA-Lyon.jpg', 'File:La Lapidation de Saint Etienne - Rembrandt (A 2735).jpg'],
  'viajes-misioneros-pablo':   ['File:V&A - Raphael, St Paul Preaching in Athens (1515).jpg'],
  'muerte-pedro-pablo':        ['File:Crucifixion of Saint Peter-Caravaggio (c.1600).jpg'],

  // REVELACION
  'nacimiento-mahoma':          ['File:Birth of Muhammad from folio 44a of the Jami‘ al-tawarikh.jpg'],
  'infancia-amina-y-halima':    ['File:Siyer-i Nebi - Muhammad bei seiner Amme Halima Sadia bint Dhuaib.jpg'],
  'matrimonio-con-khadija':     ['File:Siyer-i nebi Muhammad marries Khadija.jpg'],
  'revelacion-en-hira':         [
    'File:Hafiz-i Abru - "Muhammad\'s Call to Prophecy and the First Revelation", Folio from a Majma\' al-Tavarikh (Compendium of Histories) - c. 1425.png',
    'File:Rashid al-Din Tabib - Jami al-Tawarikh, f.45v detail - c. 1306-15.png',
  ],
  // No clean "Muhammad preaching in Mecca" Siyer-i Nebi file; use al-Tawarikh portrait
  'predicacion-publica':        ['File:Rashid al-Din Tabib - Jami al-Tawarikh, f.45v detail - c. 1306-15.png'],
  'viaje-nocturno-mi-raj':      ['File:Miraj by Sultan Muhammad.jpg'],
  'hegira-migracion-a-medina':  ['File:Umar Farrukh\'s Prophet Arrives to Medina.png'],
  // No specific Siyer-i Nebi "founding of mosque of Medina"; use closely related Siyer-i Nebi miniature
  'fundacion-comunidad-medina': ['File:Siyer-i Nebi 158b.jpg', 'File:Siyer-i Nebi - Muhammad beim Ritualgebet vor der Kaaba.jpg'],
  'batalla-de-badr':            ['File:Siyer-i Nebi - Imam Ali und Hamza bei dem vorgezogenen Einzelkampf in Badr gegen die Götzendiener.jpg'],
  'batalla-de-uhud':            ['File:The Prophet Muhammad and the Muslim Army at the Battle of Uhud, from the Siyer-i Nebi, 1595.jpg'],
  // No specific "conquest of Mecca" Siyer-i Nebi file; use BNF "Muhammad destroying idols"
  'conquista-de-meca':          [
    'File:Muhammad destroying idols - L\'Histoire Merveilleuse en Vers de Mahomet BNF.jpg',
    'File:Siyer-i Nebi - Muhammad bei der Befreiung Mekkas.jpg',
  ],
  // No specific farewell-pilgrimage file; reuse al-Tawarikh portrait
  'peregrinacion-de-despedida': ['File:Petrograd, № 923-Dorn 312, fol 313 The Last Sermon of the Prophet Muhammad.jpg'],
  'muerte-de-mahoma':           ['File:Siyer-i Nebi 158b.jpg'],
};

// --- helpers --------------------------------------------------------------

const STOPWORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'y', 'a', 'al', 'en',
  'con', 'por', 'para', 'su', 'sus', 'the', 'an', 'of', 'on', 'in',
  'and', 'to', 'for', 'with', 'before', 'over', 'into', 'by', 'le', 'les',
  'di', 'da', 'der', 'die', 'das', 'und', 'van', 'von', 'ca', 'sxviii',
  'sxvi', 'sxvii', 'ago', 'fig', 'cap',
]);

function tokenize(s) {
  if (!s) return [];
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s\-_]+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

function parseCredit(credit) {
  const titleMatch = credit.match(/"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  const author = credit.split(',')[0].trim();
  const cleanTitle = title.split(' / ')[0].trim();
  return { author, title: cleanTitle, full: credit };
}

async function apiFetch(params, retries = 3) {
  const url = new URL(COMMONS_API);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (res.status === 429) {
        await sleep(2000 * (i + 1));
        continue;
      }
      if (!res.ok) throw new Error(`API ${res.status}`);
      const text = await res.text();
      if (text.startsWith('You are making')) {
        await sleep(2500 * (i + 1));
        continue;
      }
      return JSON.parse(text);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1500);
    }
  }
  throw new Error('apiFetch failed');
}

async function searchCommons(query) {
  const data = await apiFetch({
    action: 'query',
    list: 'search',
    srsearch: query,
    srnamespace: '6',
    format: 'json',
    srlimit: '10',
  });
  const hits = data?.query?.search ?? [];
  return hits
    .map((h) => h.title)
    .filter((t) => /\.(jpe?g|png)$/i.test(t));
}

async function getImageInfo(fileTitle) {
  const data = await apiFetch({
    action: 'query',
    titles: fileTitle,
    prop: 'imageinfo',
    iiprop: 'url|size|mime',
    iiurlwidth: String(THUMB_WIDTH),
    format: 'json',
  });
  const pages = data?.query?.pages ?? {};
  const first = Object.values(pages)[0];
  // missing page → no info
  if (first?.missing !== undefined) return null;
  const info = first?.imageinfo?.[0];
  if (!info) return null;
  return {
    title: fileTitle,
    thumburl: info.thumburl || info.url,
    width: info.thumbwidth || info.width,
    height: info.thumbheight || info.height,
    mime: info.mime,
    size: info.size,
  };
}

function isImageBytes(buf) {
  if (buf.length < 4) return false;
  const b0 = buf[0], b1 = buf[1], b2 = buf[2], b3 = buf[3];
  if (b0 === 0xff && b1 === 0xd8) return true;
  if (b0 === 0x89 && b1 === 0x50 && b2 === 0x4e && b3 === 0x47) return true;
  return false;
}

async function downloadImage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const ab = await res.arrayBuffer();
  const buf = Buffer.from(ab);
  if (buf.length > MAX_BYTES) {
    throw new Error(`too large: ${(buf.length / 1024 / 1024).toFixed(1)} MB`);
  }
  if (!isImageBytes(buf)) {
    const head = buf.slice(0, 16).toString('utf8').replace(/[^\x20-\x7e]/g, '.');
    throw new Error(`non-image bytes (header="${head}", size=${buf.length})`);
  }
  return buf;
}

function fileTitleTokens(title) {
  const cleaned = title.replace(/^File:/, '').replace(/\.[a-z]+$/i, '');
  return tokenize(cleaned);
}

function scoreCandidate(refUnique, fileTitle) {
  const ft = new Set(fileTitleTokens(fileTitle));
  let s = 0;
  for (const q of refUnique) if (ft.has(q)) s++;
  return s;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- main -----------------------------------------------------------------

async function tryExplicit(id) {
  const titles = EXPLICIT_FILE[id];
  if (!titles?.length) return null;
  for (const t of titles) {
    try {
      const ii = await getImageInfo(t);
      await sleep(400);
      if (ii?.thumburl && (ii.width ?? 0) >= MIN_WIDTH) {
        return ii;
      }
    } catch (e) {
      // continue
    }
  }
  return null;
}

async function trySearch(id, info) {
  const parsed = parseCredit(info.credit);
  const queries = [];
  if (parsed.author && parsed.title) queries.push(`${parsed.author} ${parsed.title}`);
  if (parsed.title) queries.push(parsed.title);
  if (parsed.author) queries.push(parsed.author);

  const refUnique = [...new Set([...tokenize(parsed.author), ...tokenize(parsed.title)])];

  const allCandidates = new Map();
  for (const q of queries) {
    try {
      const titles = await searchCommons(q);
      await sleep(400);
      for (const t of titles) {
        if (!allCandidates.has(t)) {
          allCandidates.set(t, scoreCandidate(refUnique, t));
        }
      }
    } catch (e) {
      // continue
    }
  }
  if (!allCandidates.size) return { error: 'search returned 0 results' };
  const sorted = [...allCandidates.entries()].sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  if (topScore < MIN_SCORE) {
    return { error: `top score ${topScore} < ${MIN_SCORE}; best="${sorted[0][0]}"` };
  }
  // Resolve imageinfo for top tier.
  const topTier = sorted.filter(([, s]) => s === topScore).slice(0, 5);
  const resolved = [];
  for (const [title, s] of topTier) {
    try {
      const ii = await getImageInfo(title);
      await sleep(400);
      if (ii?.thumburl && (ii.width ?? 0) >= MIN_WIDTH) {
        resolved.push({ ...ii, _score: s });
      }
    } catch (e) {}
  }
  if (!resolved.length) return { error: `no usable imageinfo for top tier (best="${sorted[0][0]}")` };
  resolved.sort((a, b) => (b._score - a._score) || ((b.width || 0) - (a.width || 0)));
  return { candidate: resolved[0] };
}

async function processEntry(id, info, opts = {}) {
  const dir = path.join(ROOT, info.era);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${id}.jpg`);

  if (!opts.force && fs.existsSync(out)) {
    const sz = fs.statSync(out).size;
    if (sz > 0) {
      const fd = fs.openSync(out, 'r');
      const head = Buffer.alloc(4);
      fs.readSync(fd, head, 0, 4, 0);
      fs.closeSync(fd);
      if (isImageBytes(head)) {
        return { id, era: info.era, status: 'exists', bytes: sz };
      }
    }
  }

  // 1. Explicit File: titles
  let cand = await tryExplicit(id);
  let usedFallback = false;

  // 2. Generic search fallback
  if (!cand) {
    const r = await trySearch(id, info);
    if (r.error) {
      return { id, era: info.era, status: 'fail', error: r.error, credit: info.credit };
    }
    cand = r.candidate;
    usedFallback = true;
  }

  try {
    const buf = await downloadImage(cand.thumburl);
    fs.writeFileSync(out, buf);
    return { id, era: info.era, status: 'ok', bytes: buf.length, file: cand.title, fallback: usedFallback };
  } catch (e) {
    return { id, era: info.era, status: 'fail', error: `download "${cand.title}": ${e.message}`, credit: info.credit };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const forceAll = args.includes('--force');

  const entries = Object.entries(HERO);
  console.log(`Processing ${entries.length} entries (force=${forceAll})...\n`);
  const results = [];
  for (const [id, info] of entries) {
    try {
      const r = await processEntry(id, info, { force: forceAll });
      results.push(r);
      const kb = r.bytes ? `${(r.bytes / 1024).toFixed(0)} KB` : '';
      if (r.status === 'ok') {
        const tag = r.fallback ? 'OK-search' : 'OK-explicit';
        console.log(`${tag} ${info.era}/${id}.jpg   (${kb})  <- ${r.file}`);
      } else if (r.status === 'exists') {
        console.log(`SKIP       ${info.era}/${id}.jpg   (${kb}, already valid)`);
      } else {
        console.log(`FAIL       ${info.era}/${id}.jpg   — ${r.error}`);
      }
    } catch (e) {
      console.log(`ERR        ${info.era}/${id}: ${e.message}`);
      results.push({ id, era: info.era, status: 'fail', error: e.message, credit: info.credit });
    }
    await sleep(400);
  }

  const ok = results.filter((r) => r.status === 'ok');
  const exist = results.filter((r) => r.status === 'exists');
  const fail = results.filter((r) => r.status === 'fail');
  const totalBytes = results.reduce((s, r) => s + (r.bytes || 0), 0);
  console.log('\n--- SUMMARY ---');
  console.log(`Downloaded: ${ok.length}`);
  console.log(`Already present (skipped): ${exist.length}`);
  console.log(`Failed: ${fail.length}`);
  console.log(`Total resolved: ${ok.length + exist.length}/${results.length}`);
  console.log(`Total bytes downloaded: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  if (fail.length) {
    console.log('\nFailures (search manually on commons.wikimedia.org):');
    for (const f of fail) {
      console.log(`  - ${f.era}/${f.id}: ${f.error}`);
      console.log(`      credit: ${f.credit}`);
    }
  }
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
