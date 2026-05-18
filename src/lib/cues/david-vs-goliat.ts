import type { Cue } from '../narrationCues';

/**
 * Cues for "David contra Goliat".
 * Pins: david(0), goliat(1), saul(2).
 */
const CUES: Cue[] = [
  // Goliat aparece como gigante — entrada del antagonista
  { match: /Goliat|J[āa]l[uū]t|gigante filisteo|campe[oó]n filisteo|seis codos|cuatro codos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // David, joven pastor — entrada del protagonista
  { match: /David .{0,20}(pastor|joven|menor|adolescente)|hijo menor de Isa[ií]|D[āa]w[uū]d/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Saúl ofrece su armadura
  { match: /Sa[uú]l .{0,20}armadura|armadura .{0,12}real|no estaba probado/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#c0a04a' } },
  // Cinco piedras lisas, la honda
  { match: /cinco piedras|piedras lisas|honda|zur[rÓó]n|del arroyo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfd6dc' } },
  // En el nombre de Yahveh — destello divino
  { match: /en el nombre de Yahveh|Yahveh de los ej[eé]rcitos|Dios de los escuadrones/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // La piedra hunde la frente — golpe decisivo
  { match: /piedra .{0,12}(frente|hunde|acert)|le acert[oó]|cay[oó] de bruces/i, cueId: 'fx:lightning-strike', data: { from: [575, 360], to: [582, 365] } },
  // Goliat cae y es decapitado — espada figurativa
  { match: /le cort[oó] la cabeza|decapitaci[oó]n|cabeza .{0,8}Goliat|tom[oó].{0,10}espada|espada de Goliat/i, cueId: 'fx:sword-strike', data: { from: [575, 358], to: [582, 365] } },
  { match: /cay[oó] .{0,8}Goliat|le cort[oó] la cabeza|decapitaci[oó]n|cabeza .{0,8}Goliat/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Sangre de la victoria
  { match: /sangre|cuerpos de los filisteos|aves del cielo y .{0,12}bestias/i, cueId: 'fx:blood-stain', data: { position: [578, 365] } },
];

export default CUES;
