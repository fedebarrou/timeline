import type { Cue } from '../narrationCues';

/**
 * Cues for "Pesaj: la primera Pascua".
 * Pins: moises(0), aaron(1).
 */
const CUES: Cue[] = [
  // Cordero pascual
  { match: /cordero.{0,15}(macho|sin defecto|pascual)|sacrifica.{0,10}cordero|cordero de Dios/i, cueId: 'fx:glow-pulse', data: { position: [515, 408], color: '#fff1c0' } },
  // Sangre en dinteles
  { match: /sangre.{0,15}(postes|dinteles|puerta)|untar.{0,15}sangre|hisopo/i, cueId: 'fx:blood-stain', data: { position: [515, 405] } },
  // Lámparas en las puertas marcadas — resplandor protector
  { match: /dinteles|postes de la puerta|puertas marcadas|hogar marcado|familias israelitas|cada casa/i, cueId: 'fx:lamp-glow', data: { position: [515, 405] } },
  // Pesaj / pasar por encima
  { match: /pesaj|pas[óo] por encima|pasajti|pas[ée] por encima|pascua de Yahveh/i, cueId: 'fx:halo-divine', data: { position: [515, 405] } },
  // Matzá / panes ácimos
  { match: /matz[áa]|panes [áa]cimos|sin levadura|sin leudar|maror|hierbas amargas/i, cueId: 'fx:glow-pulse', data: { position: [515, 410], color: '#e6d4a0' } },
  // Décima plaga / destructor
  { match: /destructor|ha-mashjit|primog[ée]nitos egipcios|noche.{0,15}mortandad/i, cueId: 'fx:character-recede', data: { position: [510, 415] } },
  // Calendario nuevo / Nisán
  { match: /Nis[áa]n|Aviv|principio de los meses|calendario nuevo/i, cueId: 'fx:scroll-unfurl', data: { position: [515, 405] } },
  // Moisés transmite el rito
  { match: /Mois[ée]s.{0,15}(transmite|instrucciones|ancianos)|primera fiesta nacional/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Cristo cordero pascual / cumplimiento
  { match: /Cordero de Dios|nuestra pascua.{0,15}Cristo|cristol[óo]gicamente|prefigura/i, cueId: 'fx:halo-divine', data: { position: [515, 405] } },
  // Copa de la Pascua — kos / cáliz
  { match: /kos|copa de la pascua|cuatro copas|copa de bendici[oó]n|vino del seder|copa.{0,15}pascu/i, cueId: 'fx:chalice', data: { position: [515, 408] } },
];

export default CUES;
