import type { Cue } from '../narrationCues';

/**
 * Cues for "Crucifixión de Jesús".
 * Pins: jesus(0), maria(1), juan-apostol(2), maria-magdalena(3).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'cruz', 'corona-espinas'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Camino al Gólgota
  { match: /G[oó]lgota|Calvario|lugar de la calavera|Sim[oó]n de Cirene|cargando la cruz/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Cruz alzada — REGLA #1: anima la 'cruz' ya en escena
  { match: /levantaron la cruz|alzaron la cruz|elev[oó].{0,10}cruz|cruz en alto|crucifix|en la cruz/i, cueId: 'fx:animate-scene-object', data: { id: 'cruz', kind: 'rise', duration: 2.4 } },
  // Cruz — REGLA #1: también al mencionar simplemente la cruz
  { match: /\bcruz\b|madero.{0,10}cruz|cargando.{0,10}cruz/i, cueId: 'fx:animate-scene-object', data: { id: 'cruz', kind: 'glow', duration: 2.0 } },
  // Corona de espinas — REGLA #1: anima la corona-espinas ya en escena
  { match: /corona de espinas|corona.{0,12}espinas|tejieron.{0,12}corona|le coronaron/i, cueId: 'fx:animate-scene-object', data: { id: 'corona-espinas', kind: 'pulse', duration: 2.2 } },
  // Lo crucifican — sangre
  { match: /crucifican|crucificado|clav[oó]|le abre el costado|sangre y agua|lanza/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Sangre del costado
  { match: /\bsangre\b|agua y sangre|costado.{0,12}lanza|herida del costado/i, cueId: 'fx:blood-stain', data: { pinIdx: 0 } },
  // Tinieblas a la hora sexta — oscurece el cielo
  { match: /tinieblas|hora sexta|hora novena|el sol se oscurece|cielo .{0,12}oscurec/i, cueId: 'fx:eclipse-darken' },
  // Fade to black a la muerte
  { match: /expir[oó]|en tus manos encomiendo|consumado es|dio una gran voz|muri[oó]/i, cueId: 'fx:fade-to-black' },
  // Eloí, Eloí — clamor desde la oscuridad
  { match: /Elo[íi].{0,6}Elo[íi]|lema sabactani|Dios m[ií]o.{0,12}por qu[eé] me has abandonado|desamparado/i, cueId: 'fx:lightning-strike', data: { from: [582, 320], to: [582, 363] } },
  // Expira — recede
  { match: /expir[oó]|en tus manos encomiendo|consumado es|dio una gran voz|muri[oó]/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Velo del Templo se rasga / terremoto
  { match: /velo del Templo|velo se rasg[oó]|tierra tiembla|terremoto|rocas se parten/i, cueId: 'fx:earthquake-shake', data: { position: [582, 363] } },
  // Vinagre / hiel — la sed en la cruz
  { match: /vinagre|hiel.{0,12}beber|tengo sed|esponja.{0,12}vinagre|ysopo/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a4040' } },
  // Velo — el velo del templo es un rollo partido
  { match: /velo del Templo|velum|sancta sanctorum/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
  // Los que pasan blasfeman — multitud hostil
  { match: /se mofa|blasfeman|meneaban la cabeza|desciende de la cruz|s[áa]lvate a t[ií] mismo/i, cueId: 'fx:bowing-crowd', data: { position: [582, 363] } },
  // Ladrón arrepentido — luz
  { match: /ladr[oó]n arrepentido|acuérdate de m[ií]|hoy estar[áa]s conmigo|Paraíso|buen ladr[oó]n/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Luz divina en el momento de la muerte
  { match: /se rasg[oó] el velo|santos resucitaron|centurion.{0,20}Hijo de Dios|verdaderamente era Hijo/i, cueId: 'fx:divine-light-beam', data: { position: [582, 360] } },
  // Radial bloom — el Gólgota
  { match: /\bG[oó]lgota\b|en el Calvario|en el madero|en la cima|colina de la calavera/i, cueId: 'fx:radial-bloom', data: { position: [582, 363] } },
  // Descenso de la cruz — halo sobre María
  { match: /descenso de la cruz|bajaron.{0,10}su cuerpo|lo envolvieron|Jos[eé] de Arimat/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // María al pie de la cruz
  { match: /Mar[ií]a.{0,20}(pie de la cruz|cruz|madre doliente)|he ah[ií] a tu madre/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Juan el discípulo amado / María Magdalena
  { match: /disc[ií]pulo amado|he ah[ií] a tu hijo|Magdalena|Mar[ií]a Magdalena/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Vignette en las siete palabras
  { match: /consumado es|todo est[áa] cumplido|en tus manos|tengo sed|mujer.{0,10}tu hijo/i, cueId: 'fx:vignette-pulse' },
  // Zoom en el Ecce Homo / INRI
  { match: /Ecce Homo|he aqu[ií] al hombre|INRI|pon sobre la cruz|r[eé]y de los jud[ií]os/i, cueId: 'fx:zoom-pulse' },

  // ── Pasada 3: versión coránica y cierre ──────────────────────────────

  // Negación coránica
  { match: /no le mataron|no le crucificaron|les pareci[oó] as[ií]|elev[oó] a S[ií]|sustituci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
  // Noche del entierro
  { match: /los sepultaron|Jos[eé] de Arimat|tumba nueva|losa de la tumba|al anochecer/i, cueId: 'fx:night-fall' },
];

export default CUES;
