import type { Cue } from '../narrationCues';

/**
 * Cues for "Los doce espías".
 * Pins: moises(0), josue(1), caleb(2).
 */
const CUES: Cue[] = [
  // Envío de los espías — viaje
  { match: /env[íi]a.{0,15}espías|doce.{0,10}reconocer|exploradores|reconocer.{0,15}Cana[áa]n|cuarenta d[íi]as/i, cueId: 'fx:journey-trace', data: { from: [565, 405], to: [580, 380] } },
  // Josué (Yehoshúa)
  { match: /Josu[ée]|Yehosh[úu]a|Hoshea|Y[ūu]sha|hijo de Nun/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Caleb / Kālib
  { match: /Caleb|K[āa]lib|hijo de Yefune|tomemos posesi[óo]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Racimo de uvas gigante / fruto de la tierra
  { match: /racimo de uvas|valle de Escol|granadas|leche y miel|fruto de la tierra/i, cueId: 'fx:glow-pulse', data: { position: [580, 380], color: '#cfe6c8' } },
  // Nephilim / gigantes — informe negativo
  { match: /Nephilim|gigantes|jabbarin|anaq|Anaquim|como langostas/i, cueId: 'fx:character-recede', data: { position: [580, 380] } },
  // Pueblo llora, murmura, propone volver
  { match: /llor[óo]|toda la noche|volver a Egipto|apedrear|murmur/i, cueId: 'fx:character-recede', data: { position: [565, 410] } },
  // Sentencia: 40 años en el desierto
  { match: /cuarenta años|40 años.{0,15}desierto|errantes por la tierra|vedada cuarenta/i, cueId: 'fx:earthquake-shake', data: { position: [565, 405] } },
  // Intercesión de Moisés
  { match: /Mois[ée]s intercede|honor del Nombre|oirán los egipcios|perdonado conforme a tu dicho/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
