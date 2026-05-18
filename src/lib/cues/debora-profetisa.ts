import type { Cue } from '../narrationCues';

/**
 * Cues for "Débora, Barac y Yael".
 * Pins: debora(0), barac(1), sisara(2), jael(3).
 */
const CUES: Cue[] = [
  // Débora profetisa bajo la palmera
  { match: /D[eé]bora|profetisa|palmera|juzga al pueblo|madre en Israel/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Or[áa]culo profético — destello sobre Débora
  { match: /or[áa]culo|Yahveh atraer[áa]|entregar[áa] en tus manos|monte Tabor.{0,16}reunir/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Barac acepta solo si Débora va
  { match: /Barac|si t[uú] fueres conmigo|hijo de Abinoam|Cedes de Neftal[ií]/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Sísara con sus 900 carros de hierro
  { match: /S[ií]sara|novecientos carros|carros de hierro|general .{0,8}Jab[ií]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Torrente Cisón se desborda — los carros se empantanan
  { match: /Cis[oó]n .{0,8}(desborda|se desbord)|torrente Cis[oó]n|carros .{0,8}empantana|lluvias torrencial/i, cueId: 'fx:water-wave', data: { position: [580, 350] } },
  // Sísara huye derrotado
  { match: /S[ií]sara .{0,16}(huye|escapa|fuga|derrota)|derrota cananea/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Jael lo recibe y le da leche
  { match: /Jael|Heber el ceneo|le dio leche|cubre con .{0,8}manta|tienda/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Estaca de tienda en la sien — la ejecución
  { match: /estaca de tienda|le clav[oó]|atraves[oó] sus sienes|mazo|bendita .{0,8}entre las mujeres/i, cueId: 'fx:blood-stain', data: { position: [579, 348] } },
];

export default CUES;
