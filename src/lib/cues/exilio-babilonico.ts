import type { Cue } from '../narrationCues';

/**
 * Cues for "El exilio babilónico".
 * Pins: jeremias(0), nabucodonosor(1).
 */
const CUES: Cue[] = [
  // Nabucodonosor — tres campañas contra Jerusalén
  { match: /Nabucodonosor|Bukhtna[ṣs]{1,2}ar|tres campa[ñn]as|605.{0,12}597.{0,12}587|sitio dura/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Destrucción del Templo — incendio
  { match: /destrucci[oó]n del Templo|Templo es incendiado|9 de Av|incendiad|quemad|columnas Yaqu[ií]n y Boaz/i, cueId: 'fx:smoke-rise', data: { position: [582, 363] } },
  // Llamas devorando Jerusalén
  { match: /incendio|en llamas|fuego|Nabuzarad[áa]n|quem[óo].{0,8}casas|muros.{0,8}demolid/i, cueId: 'fx:fire-flicker', data: { position: [582, 363] } },
  // Sedequías cegado — sangre y crueldad
  { match: /Sedequ[ií]as.{0,20}(cegad|ojos|hijos)|matan a sus hijos|sacan los ojos|sangre/i, cueId: 'fx:blood-stain', data: { position: [582, 363] } },
  // Deportación masiva — trazado del camino al exilio
  { match: /deportaci[oó]n|deportad[oa]s|llevados? a Babilonia|cautiverio|exilio|setenta a[ñn]os/i, cueId: 'fx:journey-trace', data: { from: [582, 363], to: [635, 320], color: '#7a4444' } },
  // Lamentaciones — el llanto del Salmo 137
  { match: /Lamentaciones|junto a los r[ií]os de Babilonia|llor[áa]bamos|colgamos nuestras arpas|d[ií]a de luto/i, cueId: 'fx:rain', data: { position: [582, 363] } },
  // Jeremías profetiza la caída
  { match: /Jerem[ií]as.{0,16}(profetiza|aconseja|cisterna|encarcel)|nueva alianza|setenta a[ñn]os/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Ezequiel ve la kavod salir del Templo
  { match: /kavod abandon|gloria.{0,12}abandon|Ezequiel.{0,16}visi[oó]n|merkav[áa]|salir del Templo/i, cueId: 'fx:halo-divine', data: { position: [582, 360] } },
];

export default CUES;
