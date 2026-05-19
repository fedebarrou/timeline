import type { Cue } from '../narrationCues';

/**
 * Cues for "Pesaj: la primera Pascua".
 * Pins: moises(0), aaron(1).
 * CUMBRE — objetivo 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // Cordero pascual — selección
  { match: /cordero.{0,15}(macho|sin defecto|pascual)|sacrifica.{0,10}cordero|escoger.{0,15}cordero/i,
    cueId: 'fx:ram', data: { position: [515, 408] } },

  // Cordero — resplandor pascual
  { match: /cordero de Dios|cordero sin mancha|seh tamim|haSheh/i,
    cueId: 'fx:glow-pulse', data: { position: [515, 408], color: '#fff1c0' } },

  // Sangre en dinteles — hisopo
  { match: /sangre.{0,15}(postes|dinteles|puerta)|untar.{0,15}sangre|hisopo/i,
    cueId: 'fx:blood-stain', data: { position: [515, 405] } },

  // Las casas marcadas — lámpara protectora
  { match: /dinteles|postes de la puerta|puertas marcadas|hogar marcado|familias israelitas|cada casa/i,
    cueId: 'fx:lamp-glow', data: { position: [515, 405] } },

  // Noche de la Pascua — cae la noche
  { match: /esa noche|noche.{0,15}(pascua|pesaj)|comi[óo].{0,15}noche|toda la noche/i,
    cueId: 'fx:night-fall' },

  // Pesaj / pasar por encima — halo divino
  { match: /pesaj|pas[óo] por encima|pasajti|pas[ée] por encima|pascua de Yahveh/i,
    cueId: 'fx:halo-divine', data: { position: [515, 405] } },

  // El ángel destructor — paso de la muerte
  { match: /destructor|ha-mashjit|[áa]ngel.{0,15}(muerte|mortandad)|malak el-mawt/i,
    cueId: 'fx:angel-descent', data: { position: [515, 408] } },

  // El ángel pasa de largo — sobre las casas marcadas
  { match: /pas[óo] por encima|pas[ée].{0,10}de largo|salt[óo].{0,10}casas/i,
    cueId: 'fx:divine-light-beam', data: { position: [515, 408] } },

  // Décima plaga / primogénitos egipcios
  { match: /primog[ée]nitos egipcios|noche.{0,15}mortandad|muerte.{0,15}primog/i,
    cueId: 'fx:character-recede', data: { position: [510, 415] } },

  // Clamor de Egipto — llanto general
  { match: /clamor.{0,15}Egipto|llanto.{0,15}grande|no hab[íi]a casa|todos los primog[ée]nitos/i,
    cueId: 'fx:fade-to-black' },

  // Matzá / panes ácimos
  { match: /matz[áa]|panes [áa]cimos|sin levadura|sin leudar|maror|hierbas amargas/i,
    cueId: 'fx:glow-pulse', data: { position: [515, 410], color: '#e6d4a0' } },

  // Pan — multiplicación / fruto de la noche
  { match: /pan[es]?.{0,15}(comieron|ceni|comida)|pan.{0,15}apresuradamente/i,
    cueId: 'fx:bread-multiply', data: { position: [515, 410] } },

  // Calendario nuevo / Nisán — scroll
  { match: /Nis[áa]n|Aviv|principio de los meses|calendario nuevo/i,
    cueId: 'fx:scroll-unfurl', data: { position: [515, 405] } },

  // Moisés transmite el rito — carácter sacerdotal
  { match: /Mois[ée]s.{0,15}(transmite|instrucciones|ancianos)|primera fiesta nacional/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Aarón unge las puertas — movimiento ritual
  { match: /Aar[óo]n.{0,15}(untar|sangre|puerta)|hisopo.{0,15}Aar[óo]n/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Copa de la Pascua — kos / cáliz
  { match: /kos|copa de la pascua|cuatro copas|copa de bendici[oó]n|vino del seder|copa.{0,15}pascu/i,
    cueId: 'fx:chalice', data: { position: [515, 408] } },

  // Seder / haggadah — relato ritual
  { match: /seder|haggadah|narrar.{0,15}hijos|cuando te pregunten.{0,15}hijos|historia de la salida/i,
    cueId: 'fx:scroll-unfurl', data: { position: [516, 406] } },

  // Fiesta perpetua — memorial anual
  { match: /esta noche.{0,15}memorial|guardar[áa]s.{0,15}fiesta|generaciones perpetuas|[zz]ikaron/i,
    cueId: 'fx:glow-pulse', data: { position: [515, 407], color: '#fff1c0' } },

  // Cristo cordero pascual / cumplimiento
  { match: /Cordero de Dios|nuestra pascua.{0,15}Cristo|cristol[óo]gicamente|prefigura/i,
    cueId: 'fx:halo-divine', data: { position: [515, 405] } },

  // ── Pasada 3 — cinematográficos de cumbre ───────────────────────────────

  // Medianoche — flash blanco (la muerte cae)
  { match: /medianoche.{0,15}Yahveh|a medianoche|en la mitad de la noche/i,
    cueId: 'fx:flash-white' },

  // Radial bloom — la sangre del cordero protege
  { match: /cuando.{0,15}sangre.{0,10}y pas[ée]|ver[ée].{0,10}sangre.{0,10}pasar[ée]/i,
    cueId: 'fx:radial-bloom', data: { position: [515, 408] } },

  // Vignette — noche del Pesaj
  { match: /noche de guardia|noche de vigilia|leil shimurim|noche memorable/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
