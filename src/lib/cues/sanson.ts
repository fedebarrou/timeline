import type { Cue } from '../narrationCues';

/**
 * Cues for "Sansón el nazareo".
 * Pins: sanson(0), dalila(1).
 */
const CUES: Cue[] = [
  // Anuncio angélico del nacimiento — voto nazareo
  { match: /[áa]ngel .{0,16}(anuncio|aparece|mensajero)|nazareo .{0,8}desde el vientre|Manoa|estrella/i, cueId: 'fx:angel-descent', data: { position: [575, 368] } },
  // Sansón aparece — fuerza sobrenatural
  { match: /Sans[oó]n|Esp[ií]ritu de Yahveh .{0,8}manifest|fuerza sobrenatural|mata.{0,8}le[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Dalila aparece — la traición
  { match: /Dalila|valle de Sorec|mil cien siclos|le presionaba|princes filisteos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Trescientas zorras / fuego en los campos
  { match: /trescientas zorras|teas encendidas|campos filisteos|quem[oó].{0,12}mies/i, cueId: 'fx:fire-flicker', data: { position: [573, 370] } },
  // Cabello cortado — el secreto revelado
  { match: /cabello .{0,12}(cortad|rapa|sin cortar)|siete mechones|secreto de su fuerza|Yahveh se hab[ií]a apartado/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Ojos arrancados, cárcel de Gaza
  { match: /ojos|sacan los ojos|c[áa]rcel de Gaza|moler trigo|cegad/i, cueId: 'fx:blood-stain', data: { position: [573, 370] } },
  // Derriba el templo de Dagón — colapso
  { match: /Dag[oó]n|dos columnas|empuja|cay[oó] la casa|muera yo con los filisteos|tres mil/i, cueId: 'fx:earthquake-shake', data: { intensity: 0.9 } },
  // Polvo y escombros tras el colapso
  { match: /derrib[oó]|cay[oó] sobre|m[áa]s al morir|muchos m[áa]s que .{0,8}vida/i, cueId: 'fx:dust-burst', data: { position: [573, 370] } },
];

export default CUES;
