import type { Cue } from '../narrationCues';

/**
 * Cues for "Boicot de los Quraysh contra Banū Hāshim".
 * Pins: mahoma(0), abu-talib(1). Escenario: Shiʿb Abī Ṭālib, La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Familia aislada en el valle — retroceso clánico
  { match: /aislamiento|exilio en el valle|shi[ʿ']?b Ab[īi] [ṬT][āa]lib|Ban[ūu] H[āa]shim.{0,30}refugi|aislados|qued[oó] confinad/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Mahoma sufre el boicot
  { match: /Mahoma|el Profeta|protagonista del boicot|sufre.{0,15}boicot|hambre/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Humo de la hambruna / hostilidad
  { match: /boicot|hambruna|hambre|tres a[ñn]os|prohibido comerciar|sin alimentos|gritos de hambre/i, cueId: 'fx:smoke-rise', data: { position: [625, 460] } },
  // Decreto colgado en la Kaaba — pergamino
  { match: /decreto|pergamino|texto del boicot|colgado en la Kaaba|escrito en pergamino/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 460] } },
  // Termitas comen el pergamino — fin del boicot, halo divino
  { match: /termitas|carcomid|nombre de Dios|fin del boicot|deja solo el nombre de All[āa]h/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Polvo del valle / desolación
  { match: /valle|shi[ʿ']?b|adyacente a La Meca|desolaci[oó]n|tres a[ñn]os de exilio/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
  // Hambre asoladora — bowing crowd como gesto de súplica
  { match: /llantos.{0,15}ni[ñn]os|comer.{0,15}hojas|hojas de [áa]rbol|miseria extrema/i, cueId: 'fx:bowing-crowd', data: { position: [625, 460] } },
  // Halo de victoria al romperse el pacto — divine light
  { match: /se rompe el pacto|fin del boicot|invalidado.{0,10}pacto|aboliciones unilaterales/i, cueId: 'fx:divine-light-beam', data: { position: [625, 460] } },
];

export default CUES;
