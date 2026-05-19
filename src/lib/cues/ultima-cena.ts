import type { Cue } from '../narrationCues';

/**
 * Cues for "Última Cena".
 * Pins: jesus(0), pedro(1), juan-apostol(2), judas-iscariote(3).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'caliz', 'pan-consagrado'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Preparan la Pascua en sala alta
  { match: /preparar la Pascua|sala alta|panes [áa]cimos|cen[áa]culo|aposento alto/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pan — animate scene-object (existe 'pan-consagrado')
  { match: /tom[oó] el pan|bendijo|parti[oó].{0,12}pan|esto es mi cuerpo|haced esto en memoria|\bpan\b/i, cueId: 'fx:animate-scene-object', data: { id: 'pan-consagrado', kind: 'glow', duration: 2 } },
  // Cáliz — animate scene-object (existe 'caliz')
  { match: /la copa|esta copa|nuevo pacto|sangre.{0,20}derrama|copa de bendici[oó]n|\bcaliz\b|\bc[áa]liz\b/i, cueId: 'fx:animate-scene-object', data: { id: 'caliz', kind: 'glow', duration: 2.5 } },
  // Glow en la consagración
  { match: /tom[oó] el pan|bendijo|parti[oó].{0,12}pan|esto es mi cuerpo|haced esto en memoria/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Copa / vino — sangre del nuevo pacto
  { match: /la copa|esta copa|nuevo pacto|sangre.{0,20}derrama|cordero pascual/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Vino — chalice (fallback si no tiene scene-object 'caliz' con ese id exacto)
  { match: /\bvino\b|copa de la bendici[oó]n|beberlo todos/i, cueId: 'fx:chalice', data: { position: [584, 363] } },
  // Cordero pascual en la mesa
  { match: /cordero pascual|Pascua jud[ií]a|cordero sin mancha|comer el cordero/i, cueId: 'fx:ram', data: { position: [582, 362] } },
  // Panes ácimos — bread
  { match: /panes [áa]cimos|pan [áa]cimo|sin levadura/i, cueId: 'fx:bread-multiply', data: { position: [582, 362] } },
  // Copa de vino del nuevo pacto — incienso
  { match: /nueva alianza|nuevo pacto|alianza nueva|en mi sangre/i, cueId: 'fx:incense-spiral', data: { position: [582, 360] } },
  // Traición anunciada — glow sombrío
  { match: /uno de vosotros me entregar[áa]|anuncio de la traici[oó]n|el traidor|bocado mojado/i, cueId: 'fx:glow-pulse', data: { pinIdx: 3 } },
  // Judas sale — noche oscura
  { match: /Judas.{0,30}(sale|salio|era de noche)|lo que has de hacer hazlo pronto/i, cueId: 'fx:night-fall' },
  // Judas recede
  { match: /Judas.{0,30}(sale|salio|era de noche)|lo que has de hacer hazlo pronto/i, cueId: 'fx:character-recede', data: { pinIdx: 3 } },
  // Lavatorio de pies — agua
  { match: /lavatorio|lav[oó] los pies|se ci[ñn][oó] una toalla|ejemplo|mandamiento nuevo/i, cueId: 'fx:water-wave', data: { position: [582, 362] } },
  // Ejemplo de servicio — halo
  { match: /mandamiento nuevo|como yo os he amado|amaos los unos a los otros/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Anuncio negaciones de Pedro — gallo
  { match: /negar[áa]s tres veces|anuncio.{0,12}negaciones|antes que el gallo/i, cueId: 'fx:eagle-soar', data: { position: [582, 358] } },
  // Mesa coránica
  { match: /mesa servida|Al-Ma'ida|mesa del cielo|manjares del cielo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Halo sobre Jesús al instituir la eucaristía
  { match: /esto es mi cuerpo|este es mi sangre|eucarist|instituci[oó]n/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Flash de revelación eucarística
  { match: /esto es mi cuerpo|tom[oó] el pan.{0,20}bendijo/i, cueId: 'fx:flash-white' },
  // Zoom en el momento de la consagración
  { match: /esto es mi cuerpo|esto es mi sangre|esto es el c[áa]liz/i, cueId: 'fx:zoom-pulse' },
  // Rollo de la Ley — alusión a la Torá como referencia
  { match: /Ley de Mois[eé]s|como est[áa] escrito|seg[uú]n las Escrituras/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 360] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Pedro emerge — anuncio de negaciones
  { match: /negar[áa]s tres veces|anuncio.{0,12}negaciones|antes que el gallo/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Juan emerge — lavatorio
  { match: /lavatorio|lav[oó] los pies|se ci[ñn][oó] una toalla|ejemplo|mandamiento nuevo/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Vignette en la institución eucarística
  { match: /esto es mi cuerpo|esto es mi sangre|haced esto en memoria|eucarist/i, cueId: 'fx:vignette-pulse' },
  // Radial bloom al consagrar
  { match: /eucarist[ií]a|consagraci[oó]n|instituci[oó]n de la misa/i, cueId: 'fx:radial-bloom', data: { position: [582, 362] } },
];

export default CUES;
