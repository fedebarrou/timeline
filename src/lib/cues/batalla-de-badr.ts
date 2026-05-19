import type { Cue } from '../narrationCues';

/**
 * Cues for "Batalla de Badr".
 * Pins: mahoma(0), abu-bakr(1), ali(2), omar(3), abu-jahl(4), abu-sufyan(5). Escenario: Badr [618, 442].
 * CUMBRE — 20-30 cues.
 * NOTA: 'espadas-cruzadas' es scene-object → usar fx:animate-scene-object, NO fx:sword-strike.
 */
const CUES: Cue[] = [
  // Mahoma comandante, rezando en la tienda
  { match: /Mahoma|el Profeta|comandante|reza intensamente|tienda de ramas|manto.{0,15}cae de los hombros/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Halo divino — sakīna, ángeles enviados
  { match: /sak[īi]na|serenidad divina|tres mil [áa]ngeles|mil [áa]ngeles|[áa]ngeles enviados|Sura 3:123|Sura Al-Anf[āa]l|auxilio divino/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Lluvia que firma el suelo (Sura 8:11)
  { match: /Sura 8:11|lluvia ligera|os hizo descender agua|firmar.{0,15}pasos|firm[oó] el suelo arenoso/i, cueId: 'fx:rain', data: { position: [618, 442] } },
  // Polvo de la batalla
  { match: /campo de batalla|duelo individual|combate general|polvo del valle|valle de Badr|pozos de Badr/i, cueId: 'fx:dust-burst', data: { position: [618, 442] } },
  // Sangre — caídos
  { match: /catorce musulmanes murieron|setenta Quraysh|m[áa]rtires|catorce m[áa]rtires|sangre|matanza/i, cueId: 'fx:blood-stain', data: { position: [618, 442] } },
  // ʿAlī campeón
  { match: /[ʿ']?Al[ií].{0,30}(camp[eé]on|al-Wal[īi]d|duelo|mata)/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Abū Jahl cae (el "Faraón de esta umma")
  { match: /Ab[ūu] Jahl.{0,30}(muer|cae|caído|identificado)|Faraón de esta umma|cadáver de Ab[ūu] Jahl/i, cueId: 'fx:character-recede', data: { pinIdx: 4 } },
  // Lanzamiento divino (Sura 8:17) — relámpago simbólico
  { match: /Sura 8:17|no fuisteis vosotros quienes los matasteis|fue All[āa]h quien|Yawm al-Furq[āa]n|D[íi]a del Discernimiento/i, cueId: 'fx:lightning-strike', data: { from: [618, 400], to: [618, 442] } },
  // Espadas cruzadas animadas — scene-object
  { match: /espadas.{0,20}(cruzadas|chocan|brillan|relucen)|chocar.{0,15}espadas|cling de espadas|acero contra acero/i, cueId: 'fx:animate-scene-object', data: { id: 'espadas-cruzadas', kind: 'clash' } },
  // Formación angélica — ángeles combatiendo junto a los musulmanes
  { match: /[áa]ngeles.{0,20}(comba|lucha|pelean|filas)|ejército angélico|Sura 8:9|con m[íi]l [áa]ngeles/i, cueId: 'fx:angel-formation', data: {} },
  // Abū Bakr — compañero del Profeta en la tienda
  { match: /Ab[ūu] Bakr.{0,30}(tienda|junto al Profeta|lag|compa[ñn]ero)|compañero en la tienda de Badr/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // ʿUmar ibn al-Jaṭṭāb — combatiente
  { match: /[ʿ']?Umar|[ʿ']?Omar.{0,20}(Badr|lucha|combate|guerrero)|hijo de al-Kha[ṭt][ṭt][āa]b/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Abū Sufyān — la caravana que escapa (detonante de la batalla)
  { match: /Ab[ūu] Sufy[āa]n.{0,30}(caravana|escap|elud|desvi[oó])|caravana de Ab[ūu] Sufy[āa]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 5 } },
  // Traza de las tropas — Medina → Badr
  { match: /marcha.{0,15}Badr|desde Medina.{0,15}Badr|camino al pozo|Sura Al-Anf[āa]l.{0,15}312/i, cueId: 'fx:journey-trace', data: { from: [620, 440], to: [618, 442] } },
  // Amanecer sobre Badr — inicio del combate
  { match: /amanecer.{0,15}Badr|alba.{0,15}batalla|luz del d[íi]a|al despuntar el alba|d[íi]a 17 de Ramad[āa]n/i, cueId: 'fx:dawn-break', data: {} },
  // Tempestad de arena divina — confusión en las filas Quraysh
  { match: /arena.{0,15}(ciega|confunde|cae sobre)|polvo cegador|tormenta de tierra|la arena azot[oó]/i, cueId: 'fx:sandstorm-major', data: {} },
  // Cadáveres arrojados al pozo — victoria consolidada
  { match: /pozo de Badr|arrojaron los cad[áa]veres|pozo.{0,15}muertos|fosa del pozo/i, cueId: 'fx:blood-stain', data: { position: [618, 443] } },
  // Radial bloom — el Islam confirma su fuerza
  { match: /victoria de Badr|primera gran victoria|el Islam triunfó|D[íi]a del Furq[āa]n/i, cueId: 'fx:radial-bloom', data: {} },
  // Cielo tormenta — el día del gran combate
  { match: /cielo encapotado|nubes de tormenta|amenaza.{0,15}cielo|tiempo cerrado/i, cueId: 'fx:storm-clouds', data: {} },
  // Luz divina sobre el campamento musulmán
  { match: /campamento.{0,15}(luz|ilumina)|campamento.{0,15}Profeta|lado del Profeta|pequeño campamento/i, cueId: 'fx:divine-light-beam', data: {} },
];

export default CUES;
