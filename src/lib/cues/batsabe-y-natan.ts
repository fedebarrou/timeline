import type { Cue } from '../narrationCues';

/**
 * Cues for "David, Betsabé y la parábola de Natán".
 * Pins: david(0), batsabe(1), urias(2), natan(3).
 */
const CUES: Cue[] = [
  // David se queda en Jerusalén — preludio ominoso
  { match: /David se qued[oó]|David envi[oó] a Joab|tiempo que salen los reyes|azotea/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Betsabé bañándose — vista desde la azotea
  { match: /Betsab[eé]|mujer ba[ñn][áa]ndose|hija de Eliam|mujer de Ur[ií]as/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Urías rehúsa dormir en casa — su muerte planeada
  { match: /Ur[ií]as .{0,16}(heteo|rehu|no baja|borracho|carta sellada)|Treinta valientes|Arca .{0,8}tiendas/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Carta sellada — la muerte se firma
  { match: /carta sellada|al frente.{0,8}batalla|lo m[áa]s recio|pondr[eé]is a Ur[ií]as/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
  // Urías muere — herido bajo los muros
  { match: /Ur[ií]as muere|bajo los muros|muri[oó] Ur[ií]as|sangre de Ur[ií]as/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Natán entra con la parábola
  { match: /Nat[áa]n.{0,16}(profeta|par[áa]bola|llega)|dos hombres|rico .{0,12}pobre|corderita/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // "Tú eres ese hombre" — acusación
  { match: /t[uú] eres ese hombre|at[áa] ha-ish|peq[uú]e contra Yahveh|haciendo lo malo/i, cueId: 'fx:lightning-strike', data: { from: [582, 358], to: [582, 363] } },
  // Sangre en la casa de David — espada no se aparta
  { match: /espada no se apartar[áa]|mal sobre ti|de tu misma casa|tomar[eé] tus mujeres/i, cueId: 'fx:blood-stain', data: { position: [582, 363] } },
  // Salmo 51 / Miserere — arrepentimiento
  { match: /Salmo 51|Miserere|crea en m[ií] un coraz[oó]n limpio|ten piedad de m[ií]|borra mis rebeliones/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
