import type { Cue } from '../narrationCues';

/**
 * Cues for "Juicios de Jesús".
 * Pins: jesus(0), caifas(1), pilato(2), herodes-antipas(3), pedro(4).
 */
const CUES: Cue[] = [
  // Llevan a Jesús a Anás y luego Caifás
  { match: /An[áa]s|Caif[áa]s|sumo sacerdote|Sanedr[ií]n|testigos falsos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Confesión mesiánica / blasfemia
  { match: /Hijo del Bendito|Hijo del Hombre.{0,20}diestra|viniendo en las nubes|blasfem|rasg[oó] sus vestiduras/i, cueId: 'fx:lightning-strike', data: { from: [582, 350], to: [582, 363] } },
  // Pedro niega tres veces — recede
  { match: /Pedro.{0,12}(niega|negaci[oó]n)|canto del gallo|cant[oó] el gallo|tres veces.{0,12}neg[oó]|llor[oó] amargamente/i, cueId: 'fx:character-recede', data: { pinIdx: 4 } },
  // Pilato — interrogatorio romano
  { match: /Pilato|prefecto romano|pretorio|rey de los jud[ií]os|qu[eé] es la verdad/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Envío a Herodes Antipas
  { match: /Herodes Antipas|tetrarca|t[uú]nica espl[eé]ndida|le envia.{0,12}Herodes|jurisdicci[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Barrabás liberado
  { match: /Barrab[áa]s|liberar|ladr[oó]n sedicioso|elegir entre/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Flagelación y corona de espinas — sangre
  { match: /flagel|corona de espinas|p[uú]rpura|ecce homo|azotar/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Pilato lava sus manos
  { match: /lavado de manos|lava las manos|inocente soy|sangre de este justo|crucificale|crucif[ií]cale/i, cueId: 'fx:glow-pulse', data: { pinIdx: 2, color: '#7a4040' } },
];

export default CUES;
