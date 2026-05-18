import type { Cue } from '../narrationCues';

/**
 * Cues for "El becerro de oro".
 * Pins: moises(0), aaron(1), samiri(2).
 */
const CUES: Cue[] = [
  // Pueblo se reúne ante Aarón
  { match: /Mois[ée]s tarda|tardaba en descender|haznos dioses|levántate.{0,10}haznos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Pendientes de oro / fundir
  { match: /pendientes de oro|fundieron|fundi[óo]|oro.{0,15}fuego|reuni[óo] el oro/i, cueId: 'fx:dust-burst', data: { position: [550, 428] } },
  // El becerro fabricado (ídolo aparece)
  { match: /becerro|[íi]dolo|estos son tus dioses|mug[íi]a|al-Samir[íi]|Samir[íi]/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Becerro dorado figurativo — silueta del ídolo
  { match: /becerro|egel|estos son tus dioses|mug[íi]a/i, cueId: 'fx:golden-calf', data: { position: [550, 428] } },
  // Sacrificios y orgía
  { match: /fiesta|sacrificio|danza|regocij|sentaron a comer.{0,10}beber|altar/i, cueId: 'fx:fire-flicker', data: { position: [550, 428] } },
  // Moisés baja del monte iracundo
  { match: /Mois[ée]s.{0,15}(bajó|descendió|ira|furor|encolerizado)|al bajar/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Moisés rompe las tablas / destruye el becerro
  { match: /rompi[óo] las tablas|rompe las tablas|tablas.{0,15}(pie del monte|rotas)|quem[óo] el becerro|moli[óo] el becerro|destroza/i, cueId: 'fx:idol-shatter', data: { position: [550, 428] } },
  // Levitas ejecutan a 3.000
  { match: /levitas|3\.?000|tres mil|matad cada uno|espada sobre el muslo/i, cueId: 'fx:character-recede', data: { position: [555, 430] } },
  // Intercesión de Moisés / perdón
  { match: /Mois[ée]s intercede|intercesi[óo]n|ráeme.{0,10}libro|perdona ahora su pecado/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
