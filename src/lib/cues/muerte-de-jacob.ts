import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Jacob y bendiciones tribales".
 * Pins: jacob(0), jose(1), benjamin(2). Origen Gosén/Egipto [510, 410], destino Hebrón/Macpela [582, 365].
 */
const CUES: Cue[] = [
  // Jacob anciano
  { match: /Jacob|Yaʿq[ūu]b|patriarca.{0,12}Jacob/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // José hijo mayor
  { match: /Jos[ée].{0,12}(visir|hijo)|Efra[íi]n.{0,8}Manas[ée]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Benjamín "lobo arrebatador"
  { match: /Benjam[íi]n|lobo arrebatador/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Bendiciones tribales — poema de Gn 49
  { match: /bendiciones tribales|doce.{0,12}tribus|poema tribal|Sil[oó]h|cetro de Jud[áa]|cachorro de le[oó]n/i, cueId: 'fx:scroll-unfurl', data: { position: [510, 410] } },
  // Testamento del monoteísmo (Sura 2:132)
  { match: /¿A qui[ée]n servir[éé]is|serviremos a tu Dios|Dios [ÚuU]nico|nos sometemos a [ÉeE]l/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Jacob expira — recede
  { match: /expir[oó]|encogi[oó] sus pies|muere a los 147|fue reunido con sus padres/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Embalsamamiento egipcio
  { match: /embalsamamiento|cuarenta d[ií]as|llorado setenta d[ií]as|rito egipcio/i, cueId: 'fx:smoke-rise', data: { position: [510, 410] } },
  // Cortejo fúnebre Egipto → Macpela
  { match: /cortejo f[úu]nebre|traslado.{0,12}Macpela|sepultado en Macpela|Abel-mizraim/i, cueId: 'fx:journey-trace', data: { from: [510, 410], to: [582, 365], style: 'caravan' } },
];

export default CUES;
