import type { Cue } from '../narrationCues';

/**
 * Cues for "La rebelión de Coré".
 * Pins: moises(0), aaron(1), core(2), datan(3), abiram(4).
 */
const CUES: Cue[] = [
  // Coré encabeza la rebelión
  { match: /Cor[ée]|Q[óo]rach|Q[āa]r[ūu]n|levita coatita|primo hermano de Mois[ée]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Datán
  { match: /Dat[áa]n|rubenita|hermano de Abir[áa]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Abirám
  { match: /Abir[áa]m|delataron a Mois[ée]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Argumento democrático / cuestionamiento sacerdocio
  { match: /todos.{0,15}santos|basta ya de vosotros|¿por qu[ée].{0,15}vosotros|monopolio sacerdotal/i, cueId: 'fx:dust-burst', data: { position: [565, 408] } },
  // Prueba de los incensarios — fuego
  { match: /incensarios|incienso|250 pr[íi]ncipes|fuego.{0,15}consum|sali[óo] fuego de Yahveh/i, cueId: 'fx:fire-flicker', data: { position: [565, 408] } },
  // La tierra se abre y los traga
  { match: /tierra.{0,15}(abri[óo]|trag[óo]|tragara)|descendieron vivos al Seol|tragados por la tierra/i, cueId: 'fx:earthquake-shake', data: { position: [565, 408] } },
  // Coré y rebeldes desaparecen
  { match: /Cor[ée].{0,15}(muri[óo]|hundi|trag)|rebeldes.{0,15}(murieron|hundi)|hizo que la tierra/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Plaga / Aarón interpone incensario
  { match: /plaga.{0,15}(estall|14)|Aar[óo]n.{0,15}incensario|detuvo la mortandad|14\.?700/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Vara de Aarón florecida
  { match: /vara.{0,15}(florec|reverdec|almendras|renuevos)|vara florecida|signo confirmatorio/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#cfe6c8' } },
];

export default CUES;
