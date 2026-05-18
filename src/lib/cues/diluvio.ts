import type { Cue } from '../narrationCues';

/**
 * Cues for "El Gran Diluvio".
 * Pins: noe(0), sem(1), cam(2), jafet(3), matusalen(4), nephilim(5), vigilantes(6).
 */
const CUES: Cue[] = [
  // Las aguas se abren — fuentes del abismo y cataratas
  { match: /cataratas de los cielos|fuentes del .{0,6}abismo|abri[óo] las cataratas|tehom|aguas sin forma/i, cueId: 'fx:water-wave', data: { position: [620, 320] } },
  // Aguas dividen al mundo — efecto figurativo de muros de agua
  { match: /cataratas de los cielos|fuentes del .{0,6}abismo|aguas sin forma|inundaci[óo]n|aguas cubrieron/i, cueId: 'fx:parted-waters', data: { position: [620, 325] } },
  // Lluvia 40 días
  { match: /cuarenta d[ií]as|40 d[ií]as|lluvia sobre la tierra/i, cueId: 'fx:water-wave', data: { position: [620, 340] } },
  // Matusalén muere antes del Diluvio
  { match: /Matusal[eé]n|muere .{0,12}antes del Diluvio|siete d[ií]as antes/i, cueId: 'fx:character-recede', data: { pinIdx: 4 } },
  // Embarcan en el arca — Noé y los tres hijos
  { match: /embarc[oó]|entr[oó] en el arca|familia se salv|pares de animales/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Arca figurativa — casco flotante sobre las aguas
  { match: /\barca\b|embarc[oó]|entr[oó] en el arca|flota.{0,10}aguas|sobre las aguas/i, cueId: 'fx:ark-boat', data: { position: [620, 320] } },
  { match: /Sem|antepasado de los semitas/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  { match: /Cam|padre de Cus|Mizraim|Cana[áa]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  { match: /Jafet|pueblos indoeuropeos|expandido/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Nephilim destruidos — se hunden
  { match: /Nephilim.{0,40}(destruid|hundid|matarse entre|ahogad)|hundidos por las aguas/i, cueId: 'fx:character-recede', data: { pinIdx: 5 } },
  // Vigilantes encarcelados por los arcángeles
  { match: /Vigilantes.{0,40}(encarcelad|atados|juzgad)|Miguel.{0,30}Gabriel|Rafael.{0,20}Uriel|abismo/i, cueId: 'fx:character-recede', data: { pinIdx: 6 } },
  // Cuervo y palomas — relámpago simbólico
  { match: /cuervo|paloma|rama de olivo|env[ií]a/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
  // Reposo sobre Ararat / Yudi
  { match: /reposa en|reposó en|montes de Ararat|monte Yudi|Ararat/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6d4a0' } },
];

export default CUES;
