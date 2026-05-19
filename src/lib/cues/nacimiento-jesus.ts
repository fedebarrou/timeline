import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Jesús".
 * Pins: jesus(0), maria(1), jose-de-nazaret(2), melchor(3), gaspar(4), baltasar(5).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'pesebre', 'estrella-belen'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Viaje Nazaret -> Belén (empadronamiento)
  { match: /empadronamiento|censo|C[eé]sar Augusto|sube de Nazaret|de Nazaret a Bel[eé]n/i, cueId: 'fx:journey-trace', data: { from: [579, 353], to: [581, 364] } },
  // Pesebre (scene-object) — animarlo con sway
  { match: /pesebre|dio a luz|primog[eé]nito|envolvi[oó] en pa[ñn]ales|naci[oó] en Bel[eé]n/i, cueId: 'fx:animate-scene-object', data: { id: 'pesebre', kind: 'sway', duration: 2 } },
  // Polvo del establo
  { match: /pesebre|establo|portal|hospedaje|posada/i, cueId: 'fx:dust-burst', data: { pinIdx: 0 } },
  // Estrella de Belén (scene-object) — animarla con pulse
  { match: /estrella|estrella de Bel[eé]n|estrella de Oriente|astro|guiaba.{0,10}estrella/i, cueId: 'fx:animate-scene-object', data: { id: 'estrella-belen', kind: 'pulse', duration: 2.5 } },
  // Halo divino sobre Jesús
  { match: /Salvador|Cristo el Se[ñn]or|Verbo encarnado|Verbo hecho carne|Hijo de Dios/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Pastores — ángel desciende sobre ellos
  { match: /pastores|coro celest[ií]al|coro ang[eé]lico|gloria a Dios en las alturas|[áa]ngel del Se[ñn]or/i, cueId: 'fx:angel-descent', data: { position: [581, 350] } },
  // Ángel-formación — ejército celestial
  { match: /muchedumbre del ej[eé]rcito celestial|multitud de [áa]ngeles|h[oó]ste celestial/i, cueId: 'fx:angel-formation', data: { position: [581, 348] } },
  // Estrella — REGLA #1: anima la estrella-belen ya en escena
  { match: /estrella|estrellas|campo estrellado|noche estrellada/i, cueId: 'fx:animate-scene-object', data: { id: 'estrella-belen', kind: 'pulse', duration: 2.4 } },
  // Noche del nacimiento
  { match: /noche|de noche|en la oscuridad|en aquel tiempo/i, cueId: 'fx:night-fall' },
  // Luz del ángel
  { match: /resplandor del Se[ñn]or|gloria del Se[ñn]or.{0,20}(brill|rodea)|llena de luz/i, cueId: 'fx:divine-light-beam', data: { position: [581, 350] } },
  // Flash blanco al nacer
  { match: /naci[oó]|dio a luz|moment[oó] del nacimiento/i, cueId: 'fx:flash-white' },
  // Bloom de epifanía — nacimiento
  { match: /Cristo.{0,12}naci[oó]|el ni[ñn]o.{0,6}naci[oó]|vino al mundo|encarnación/i, cueId: 'fx:radial-bloom', data: { position: [581, 364] } },
  // Oro — glow dorado de los magos
  { match: /oro|ofrendas|tesoros abiertos/i, cueId: 'fx:glow-pulse', data: { pinIdx: 3 } },
  // Incienso
  { match: /incienso|mirra|regalos|presentes/i, cueId: 'fx:incense-spiral', data: { position: [581, 362] } },
  // Cordero — el Cordero de Dios nace
  { match: /cordero de Dios|Cordero Pascual/i, cueId: 'fx:ram', data: { position: [581, 360] } },
  // Voz del cielo — gloria
  { match: /gloria a Dios en las alturas|paz en la tierra|buena voluntad/i, cueId: 'fx:divine-light-beam', data: { position: [581, 348] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // María emerge
  { match: /Mar[ií]a.{0,30}(madre|recost[oó]|dio a luz)|virgen Mar[ií]a/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // José emerge
  { match: /Jos[eé].{0,30}(padre|acompa[ñn]a|empadronamiento)|carpintero|casa de David/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Magos llegan — emerge Melchor
  { match: /magos de Oriente|Melchor|Gaspar|Baltasar|Reyes Magos/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Magos: camel-train desde Oriente
  { match: /magos.{0,20}Oriente|desde el Este|viaje de los magos|tres hombres sabios/i, cueId: 'fx:camel-train', data: { position: [620, 350] } },
  // Donkeys / asno de María
  { match: /asno|pollino|cabalgadura|burra/i, cueId: 'fx:donkey-walk', data: { position: [580, 356] } },
  // Pastores con rebaños
  { match: /pastores.{0,20}rebaño|pastores guardaban|ovejas|rebaño en el campo/i, cueId: 'fx:goat-herd', data: { position: [581, 358] } },
  // Zoom en el pesebre
  { match: /vi[oó].{0,10}ni[ñn]o envuelto|encontraron.{0,12}ni[ñn]o|encontraron al ni[ñn]o|pec[uú]lio/i, cueId: 'fx:zoom-pulse' },
  // Tradición cristiana badge
  { match: /Navidad|Noel|Christmas|natividad|nacimiento del Se[ñn]or/i, cueId: 'fx:tradition-badge', data: { tradition: 'christian' } },
  // Halo sobre María — Madre de Dios
  { match: /Madre de Dios|Theot[oó]kos|Madre de Dios|Virgen|bendita entre las mujeres/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },

  // ── Pasada 3: versión coránica ────────────────────────────────────────
  { match: /palmera|d[áa]tiles|arroyuelo|sacudir|lugar apartado|habla desde la cuna/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Amanecer de un mundo nuevo
  { match: /amaneci[oó]|al alba|primer d[ií]a|cuando amaneci[oó]/i, cueId: 'fx:dawn-break' },
];

export default CUES;
