import type { Cue } from '../narrationCues';

/**
 * Cues for "La Torre de Babel".
 * NOTE: this event currently has no pins associated with map animations
 * (its `characters:` frontmatter lists Nimrod, Sem, Cam, Jafet, but the
 * choreography set does not define pins for it yet). We author minimal
 * positional cues so the language/dispersion lines still get fx.
 */
const CUES: Cue[] = [
  // Una sola lengua — destello inicial sobre la torre
  { match: /una sola lengua|mismas palabras|hablaban una sola lengua/i, cueId: 'fx:glow-pulse', data: { position: [635, 315], color: '#e6d4a0' } },
  // Construcción de la torre — polvo de ladrillos
  { match: /torre|cima al cielo|cúspide llegue al cielo|ladrillos|zigurat|Etemenanki/i, cueId: 'fx:dust-burst', data: { position: [635, 315] } },
  // Torre figurativa — anima 'torre-babel' ya en escena (REGLA #1)
  { match: /\btorre\b|cima al cielo|c[úu]spide.{0,10}cielo|zigurat|Etemenanki/i, cueId: 'fx:animate-scene-object', data: { id: 'torre-babel', kind: 'wobble', duration: 1.8 } },
  // Yahveh desciende — relámpago desde lo alto
  { match: /descendi[oó] Jehov[áa]|descendi[oó] el Se[ñn]or|intervenci[oó]n divina|confundamos|confundi[oó] sus lenguas/i, cueId: 'fx:lightning-strike', data: { from: [635, 250], to: [635, 315] } },
  // Confusión de las lenguas — pulso disperso
  { match: /confusi[oó]n de las lenguas|b[āa]lal|confundir|Babel/i, cueId: 'fx:glow-pulse', data: { position: [635, 315], color: '#a04040' } },
  // Dispersión de los pueblos — polvo amplio
  { match: /dispers[oó]|esparc|dispersi[oó]n|esparcidos por toda la tierra|tabla de las naciones/i, cueId: 'fx:dust-burst', data: { position: [620, 320] } },
  // La torre se desploma — temblor cuando cae
  { match: /derrib[oó]|desplom[oó]|cay[oó].{0,12}torre|destruy[oó].{0,12}torre|abandonaron la construcci[oó]n/i, cueId: 'fx:earthquake-shake', data: { position: [635, 315] } },
  // Pentecostés — inversión salvífica (lectura cristiana)
  { match: /Pentecost[eé]s|reverso teol[oó]gico|don de lenguas|comprensi[oó]n mutua/i, cueId: 'fx:glow-pulse', data: { position: [635, 315], color: '#fff1c0' } },
];

export default CUES;
