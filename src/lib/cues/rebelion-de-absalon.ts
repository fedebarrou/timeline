import type { Cue } from '../narrationCues';

/**
 * Cues for "La rebelión de Absalón".
 * Pins: david(0), absalon(1), joab(2).
 */
const CUES: Cue[] = [
  // Absalón aparece — tercer hijo de David
  { match: /Absal[oó]n|tercer hijo|hermoso|hijo de David|Gesur/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Sangre de Tamar / Amnón — la cadena de venganza
  { match: /Tamar|Amn[oó]n|viol[oó]|venganza|criados lo matan|banquete de esquila/i, cueId: 'fx:blood-stain', data: { position: [582, 363] } },
  // Conspiración — Absalón roba el corazón del pueblo
  { match: /robaba el coraz[oó]n|puerta de Jerusal[eé]n|cuatro a[ñn]os|conspiraci[oó]n|carro y cincuenta corredores/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Proclamación en Hebrón — trompetas
  { match: /se hace proclamar rey|Hebr[oó]n.{0,16}rey|trompetas|Ahitofel/i, cueId: 'fx:lightning-strike', data: { from: [580, 360], to: [582, 363] } },
  // David huye descalzo — el éxodo del rey
  { match: /David .{0,12}(huye|descalzo|llorando|fugitivo)|Monte de los Olivos|cubierta la cabeza|Cedr[oó]n/i, cueId: 'fx:journey-trace', data: { from: [582, 363], to: [580, 365], color: '#7a5a3a' } },
  // Batalla en el bosque de Efraín
  { match: /bosque de Efra[ií]n|veinte mil hombres|terreno boscoso|el bosque consumi[oó]/i, cueId: 'fx:earthquake-shake', data: { intensity: 0.6 } },
  // Cabellera enredada en la encina
  { match: /cabellera|encina|colgado por el cabello|mulo sigui[oó]|tres dardos/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Joab desobedece y mata
  { match: /Joab .{0,16}(mata|tres dardos|escuderos|orden expresa)|guardadme al joven/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Lamento de David
  { match: /hijo m[ií]o Absal[oó]n|qui[eé]n me diera|llora.{0,8}David|sala sobre la puerta/i, cueId: 'fx:rain', data: { position: [582, 363] } },
];

export default CUES;
