import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Moisés".
 * Pins: moises(0), jocabed(1), miriam(2), aaron(3), hija-del-faraon(4), amram(5).
 */
const CUES: Cue[] = [
  // Nace Moisés
  { match: /naci[óo].{0,15}Mois[ée]s|reci[ée]n nacido|niño hermoso|bueno.{0,10}tov|m[ūu]s[āa]/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Madre Jocabed lo esconde
  { match: /Jocabed|madre.{0,20}(escond|levita)|escondi[óo].{0,15}tres meses/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Arquilla en el Nilo — agua
  { match: /arquilla|canasta|tebá|junco|asfalto y brea|calafate[óo]|Nilo|r[íi]o/i, cueId: 'fx:water-wave', data: { position: [515, 410] } },
  // Miriam vigila
  { match: /Miriam|hermana.{0,15}(vigila|lejos|propuso)|nodriza hebrea/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Hija de Faraón / Asiya rescata
  { match: /hija de Fara[óo]n|princesa|Asiya|esposa de Fir.?awn|adopt[óo]|compadeci[óo]/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Aarón mencionado
  { match: /Aar[óo]n|H[āa]r[ūu]n|hermano mayor/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Revelación a la madre (wahy) — pulso divino
  { match: /wahy|awhayna|inspiramos.{0,15}madre|revelaci[óo]n directa/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // "Salvado de las aguas" — pulso final
  { match: /sacado de las aguas|salvado.{0,15}aguas|mashah|de las aguas lo saqu[ée]/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
];

export default CUES;
