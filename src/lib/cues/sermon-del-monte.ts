import type { Cue } from '../narrationCues';

/**
 * Cues for "Sermón del Monte".
 * Pins: jesus(0), pedro(1), juan-apostol(2).
 */
const CUES: Cue[] = [
  // Jesús sube al monte
  { match: /sube al monte|subiendo el monte|monte de las Bienaventuranzas|nuevo Mois[eé]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Bienaventuranzas — pulsos dorados
  { match: /bienaventurados|dichosos|pobres en esp[ií]ritu|los que lloran|misericordiosos|pacificadores/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Sal y luz del mundo
  { match: /sal de la tierra|luz del mundo|ciudad asentada/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Habéis oído... pero yo os digo — autoridad
  { match: /hab[eé]is o[ií]do|pero yo os digo|nueva interpretaci[oó]n|nueva Ley|radicaliza/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Padrenuestro — oración modelo
  { match: /Padrenuestro|Padre nuestro|santificado sea|venga tu reino|hagase tu voluntad/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Regla de oro / no os angustiéis
  { match: /regla de oro|no os angusti[eé]is|no os afan[eé]is|todo cuanto quer[eé]is/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
  // Casa edificada sobre roca
  { match: /casa edificada sobre la roca|sobre la arena|dos casas|edificar/i, cueId: 'fx:dust-burst', data: { position: [580, 350] } },
  // Discípulos escuchan — emerge Pedro/Juan
  { match: /multitud .{0,12}(escucha|admir|se asombra)|ense[ñn]aba con autoridad/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
];

export default CUES;
