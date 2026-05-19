import type { Cue } from '../narrationCues';

/**
 * Cues for "Jesús a los doce años en el Templo".
 * Pins: jesus(0), maria(1), jose-de-nazaret(2).
 */
const CUES: Cue[] = [
  // Subida anual a Jerusalén por la Pascua
  { match: /pascua|sub[ií]an cada a[ñn]o|peregrinaci[oó]n|caravana de peregrinos/i, cueId: 'fx:journey-trace', data: { from: [579, 353], to: [582, 363] } },
  // El niño se queda — María y José regresan a buscar (recede)
  { match: /se qued[oó] en Jerusal[eé]n|sin saberlo|buscan durante tres d[ií]as|angustiados/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Padres regresan ansiosos — emerge María
  { match: /Mar[ií]a le reprocha|tu padre y yo|hijo.{0,12}por qu[eé] nos has hecho/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // José emerge también
  { match: /Jos[eé].{0,20}(angustiado|busca|te buscaba)|tu padre y yo te buscábamos/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Jesús en el Templo entre doctores — emerge
  { match: /entre los doctores|doctores de la Ley|maestros|sentado.{0,12}Templo|asuntos de mi Padre/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Asombro / sabiduría — halo
  { match: /maravillados|asombrados de su inteligencia|sabidur[ií]a|inteligencia y .{0,6}respuestas/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Luz divina en el Templo
  { match: /templo de mi Padre|casa de mi Padre|asuntos de mi Padre/i, cueId: 'fx:divine-light-beam', data: { position: [582, 363] } },
  // Rollo de la Ley — los doctores leen
  { match: /doctores de la Ley|ense[ñn]ando en el Templo|preguntas y respuestas/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
  // Bajan a Nazaret
  { match: /baj[oó] con ellos|Nazaret y les estaba sujeto|crec[ií]a en sabidur[ií]a/i, cueId: 'fx:journey-trace', data: { from: [582, 363], to: [579, 353] } },
];

export default CUES;
