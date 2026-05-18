import type { Cue } from '../narrationCues';

/**
 * Cues for "Destrucción de Sodoma y Gomorra".
 * Pins: lot(0), abraham(1). Escenario: Sodoma [583, 372].
 */
const CUES: Cue[] = [
  // Lot hospeda a los ángeles
  { match: /Lot|L[ūu]t/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abraham intercede por los justos
  { match: /Abraham|Ibr[āa]h[īi]m.{0,18}(intercede|negocia|regate)|cincuenta justos|diez justos/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Llegan ángeles a Sodoma
  { match: /dos [áa]ngeles|mensajeros|ángeles llegan|nuestros mensajeros/i, cueId: 'fx:angel-descent', data: { position: [583, 372] } },
  // Lluvia de azufre y fuego — el golpe celeste
  { match: /azufre y fuego|fuego del cielo|llovió.{0,16}(fuego|azufre)|piedras de barro cocido|hizo llover/i, cueId: 'fx:lightning-strike', data: { from: [583, 310], to: [583, 372] } },
  // Las ciudades arden
  { match: /destruy[oó] las ciudades|destruidas|ciudades de la llanura|calamidad del cielo/i, cueId: 'fx:fire-flicker', data: { position: [583, 372] } },
  // Humareda / Abraham ve el humo subir
  { match: /humo .{0,8}(subía|sube|del valle|del horno)|columna de humo|humeaba la tierra/i, cueId: 'fx:smoke-rise', data: { position: [583, 372] } },
  // Mujer de Lot — estatua de sal
  { match: /mujer de Lot|estatua de sal|mir[oó] atr[áa]s|esposa de L[ūu]t/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Mar Muerto — geología real
  { match: /Mar Muerto|Bab edh-Dhra|Tall el-Hammam|bet[uú]n/i, cueId: 'fx:glow-pulse', data: { position: [583, 372], color: '#a04040' } },
];

export default CUES;
