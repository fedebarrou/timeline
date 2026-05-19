import type { Cue } from '../narrationCues';

/**
 * Cues for "La zarza ardiente".
 * Pins: moises(0), yhwh(1), aaron(2).
 * CUMBRE — objetivo 20-30 cues.
 * Scene-objects declarados: 'zarza'
 *
 * REGLA #1: 'zarza' ya es scene-object → NO disparamos fx:burning-bush;
 * animamos con fx:animate-scene-object {id:'zarza'}.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // La zarza ardiente — anima 'zarza' ya en escena (REGLA #1)
  { match: /zarza|arbusto que ard|zarza ardiente|fuego.{0,15}(zarza|arbusto)/i,
    cueId: 'fx:animate-scene-object', data: { id: 'zarza', kind: 'burn', duration: 2.4 } },

  // No se consume — fuego que no destruye
  { match: /no se consum|arde sin consumir|fuego divino.{0,15}no destruye/i,
    cueId: 'fx:fire-flicker', data: { position: [550, 425] } },

  // Monte Horeb / Sinaí — gloria sobre la montaña
  { match: /Horeb|monte santo|Sina[íi]|monte de Dios/i,
    cueId: 'fx:mountain-glow', data: { position: [550, 420] } },

  // Tierra santa — destello divino
  { match: /tierra santa|terreno sagrado|al-w[áa]d al-muqaddas/i,
    cueId: 'fx:divine-light-beam', data: { position: [550, 425] } },

  // Sandalias / calzado quitado
  { match: /quita.{0,15}sandalias|cal[zs]ado|descalzarte|san[dg]alias/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },

  // Ovejas de Jetro — rebaño
  { match: /ovejas|reba[ñn]o|Jetr[oó]|pastoreaba|su suegro|Yetro/i,
    cueId: 'fx:goat-herd', data: { position: [548, 428] } },

  // Moisés se acerca / curiosidad
  { match: /Mois[ée]s|Moshe|M[ūu]s[āa]|pastoreaba|se acer/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // YHWH / Yo soy el que soy
  { match: /YHWH|Yahveh|Tetragrama|Yo soy el que soy|EHY[ÉE]|ehy[ée] asher|All[āa]h/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 1 } },

  // Encuentro divino — lámpara divina
  { match: /presencia divina|tierra santa|gloria divina|voz.{0,10}zarza/i,
    cueId: 'fx:lamp-glow', data: { position: [550, 425] } },

  // Dios se presenta — ángel en la llama (Ex 3:2)
  { match: /[áa]ngel de Yahveh|[áa]ngel.{0,15}llama|angel.{0,15}fuego/i,
    cueId: 'fx:angel-descent', data: { position: [550, 420] } },

  // Revelación del Nombre — rayo de luz
  { match: /mi nombre|Soy el que soy|EHYEH|ʾanā All[āa]h/i,
    cueId: 'fx:divine-light-beam', data: { position: [550, 422] } },

  // Signos — vara → serpiente, mano blanca
  { match: /vara.{0,15}serpiente|mano.{0,15}leprosa|mano blanca|signos/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },

  // Vara como signo — serpiente
  { match: /vara.{0,15}(serpiente|tierra|suelo)|echó la vara/i,
    cueId: 'fx:serpent', data: { position: [548, 425] } },

  // Promesa: tierra de leche y miel
  { match: /leche y miel|tierra buena|tierra prometida|sacar.{0,10}Egipto|canaanea/i,
    cueId: 'fx:journey-trace', data: { from: [550, 425], to: [580, 415] } },

  // Llanto del pueblo hebreo — misión encargada
  { match: /clamor.{0,10}Israel|opresi[óo]n.{0,15}Egipto|he visto.{0,10}afflicción|he o[íi]do su clamor/i,
    cueId: 'fx:character-recede', data: { position: [548, 425] } },

  // Aarón designado portavoz
  { match: /Aar[óo]n|H[āa]r[ūu]n|portavoz|boca ante Fara[óo]n|elocuen/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Dios de los padres — Abraham, Isaac, Jacob
  { match: /Dios de Abraham|Dios de Isaac|Dios de Jacob|Dios de tus padres/i,
    cueId: 'fx:halo-divine', data: { position: [550, 420] } },

  // Humildad de Moisés — temor reverencial
  { match: /Mois[ée]s escond[íi]a|tem[íi]a mirar|escondi[óo] el rostro|ocult[óo] la cara/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Fuego del Señor — viento o brisa (Corán: Taha 20:10)
  { match: /taha|Tah[áa]|desde lejos|luz.{0,15}fuego|tiz[óo]n|brasa/i,
    cueId: 'fx:fire-flicker', data: { position: [548, 425] } },

  // ── Pasada 3 — cinematográficos de cumbre ───────────────────────────────

  // Flash blanco — revelación del Nombre
  { match: /Yo soy el que soy|EHYEH ASHER EHYEH|ʾanā All[āa]h l[āa] il[āa]ha/i,
    cueId: 'fx:flash-white' },

  // Radial bloom — comisión profética
  { match: /te env[íi]o|te mando|ir[áa]s a Fara[óo]n|ir[éa]s ante Fara/i,
    cueId: 'fx:radial-bloom', data: { position: [550, 425] } },

  // Vignette — el encuentro sagrado
  { match: /se apareció|fue visto|se manifest[óo]|la aparición|theofan[íi]a/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
