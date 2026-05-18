import type { Cue } from '../narrationCues';

/**
 * Cues for "El regreso del exilio".
 * Pins: ciro(0), zorobabel(1), esdras(2).
 */
const CUES: Cue[] = [
  // Ciro emite el decreto — rey persa
  { match: /Ciro|Cyrus|rey persa|conquista Babilonia|539|edicto de Ciro|Du'?l-Qarnayn/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Cilindro de Ciro / decreto — pergamino oficial
  { match: /Cilindro de Ciro|edicto|decreto.{0,12}regreso|escritura.{0,8}cuneiforme|archivo de Ecbatana/i, cueId: 'fx:scroll-unfurl', data: { position: [635, 320] } },
  // Mashíaj / ungido — destello sobre Ciro
  { match: /mash[ií]aj|ungido de Yahveh|Isa[ií]as 45|nombrado por nombre|tolerancia religiosa/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Caravana de retornados — viaje desde Babilonia
  { match: /retornad[oa]s|primer regreso|538|caravana|primer grupo|cuarenta y dos mil/i, cueId: 'fx:journey-trace', data: { from: [635, 320], to: [582, 363], color: '#cfa14c' } },
  // Zorobabel — príncipe davídico
  { match: /Zorobabel|pr[ií]ncipe dav[ií]dico|nieto del rey Joaqu[ií]n|gobernador|Sealtiel/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Cimientos / construcción del segundo Templo
  { match: /cimientos del Templo|reconstrucci[oó]n|construir|segundo Templo|altar de los holocaustos|Hageo.{0,8}Zacar[ií]as/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
  // Esdras — el sacerdote-escriba
  { match: /Esdras|sacerdote-escriba|Torah?|lectura p[uú]blica|segundo Mois[eé]s|repudio.{0,12}matrimonios/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Templo dedicado — la gloria vuelve
  { match: /Templo se dedica|515 a\.?C|setenta a[ñn]os|gozo de Yahveh|fiesta de la dedicaci[oó]n/i, cueId: 'fx:halo-divine', data: { position: [582, 363] } },
];

export default CUES;
