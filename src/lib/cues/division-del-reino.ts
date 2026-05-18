import type { Cue } from '../narrationCues';

/**
 * Cues for "La división del reino".
 * Pins: roboam(0), jeroboam(1).
 */
const CUES: Cue[] = [
  // Roboam — el hijo de Salomón
  { match: /Roboam|hijo de Salom[oó]n|Naama amonita|41 a[ñn]os|sube al trono/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Jeroboam — vuelve del exilio egipcio
  { match: /Jeroboam|hijo de Nabat|Efrateo|vuelve .{0,8}Egipto|Sisac|Ahias? de Silo/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Manto rasgado en doce pedazos — anuncio profético
  { match: /capa nueva|rasga en doce|doce pedazos|diez tribus|Ah[ií]as|profeta de Silo/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 360] } },
  // Asamblea de Siquem — la negociación
  { match: /asamblea de Siquem|aliviar las cargas|consejo de los ancianos|consejo .{0,12}j[oó]venes/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6c66a' } },
  // Respuesta dura — los escorpiones
  { match: /escorpiones|yugo pesado|mi dedo me[ñn]ique|castigar[eé] con|mi padre os carg[oó]/i, cueId: 'fx:lightning-strike', data: { from: [582, 355], to: [582, 363] } },
  // Israel a tus tiendas — la ruptura
  { match: /Israel.{0,8}a tus tiendas|qu[eé] parte tenemos|no tenemos heredad|hijo de Isa[ií]/i, cueId: 'fx:earthquake-shake', data: { intensity: 0.6 } },
  // Becerros de oro en Betel y Dan
  { match: /becerros de oro|Betel.{0,12}Dan|he aqu[ií] tus dioses|culto irregular/i, cueId: 'fx:idol-shatter', data: { position: [582, 355] } },
  // Campaña de Sisac contra Roboam
  { match: /Sisac|Sheshonq|Karnak|escudos de oro|escudos de bronce|campa[ñn]a .{0,12}fara[oó]n/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
];

export default CUES;
