import type { Cue } from '../narrationCues';

/**
 * Cues for "El Tabernáculo (Mishkán)".
 * Pins: moises(0), aaron(1), bezaleel(2), oholiab(3).
 * CUMBRE — objetivo 20-30 cues.
 * Scene-objects declarados: 'tabernaculo', 'menora'
 *
 * REGLA #1: 'tabernaculo' y 'menora' son scene-objects → animamos con
 * fx:animate-scene-object; no duplicamos sus equivalentes primitivos.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // Moisés recibe el plano / modelo celestial
  { match: /modelo celestial|tavnit|plano del tabern[áa]culo|instrucciones detalladas|en el monte/i,
    cueId: 'fx:scroll-unfurl', data: { position: [550, 425] } },

  // Mishkán — anima el scene-object 'tabernaculo' ya en escena (REGLA #1)
  { match: /mishk[áa]n|tabern[áa]culo|santuario.{0,15}(erigido|levantado|construido)|morada de Dios/i,
    cueId: 'fx:animate-scene-object', data: { id: 'tabernaculo', kind: 'glow', duration: 2.0 } },

  // Menorá / candelabro — anima scene-object 'menora' (REGLA #1)
  { match: /menor[áa]|candelabro|siete brazos|oro batido|siete l[áa]mparas/i,
    cueId: 'fx:animate-scene-object', data: { id: 'menora', kind: 'pulse', duration: 1.8 } },

  // Bezaleel "lleno del Espíritu de Dios"
  { match: /Bezaleel|lleno del Esp[íi]ritu|tribu de Jud[áa].{0,15}arte/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Oholiab — co-arquitecto
  { match: /Oholiab|tribu de Dan|bordador|grabador/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 3 } },

  // Donaciones del pueblo / construcción
  { match: /donaciones?|ofrendas voluntarias|pueblo dona|construcci[óo]n|edificar el santuario|cesen las donaciones/i,
    cueId: 'fx:dust-burst', data: { position: [550, 425] } },

  // Aarón consagrado sumo sacerdote
  { match: /Aar[óo]n.{0,15}consagra|vestiduras sagradas|efod|pectoral|sumo sacerdote|cohen gadol/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Arca de la alianza / querubines — pulso dorado
  { match: /arca de la alianza|propiciatorio|kaporet|querubines|Tabut/i,
    cueId: 'fx:glow-pulse', data: { position: [550, 425], color: '#ffd27a' } },

  // Querubines — ángeles guardianes del arca
  { match: /querubines|alas de los querubines|kerubim|dos querubines/i,
    cueId: 'fx:angel-formation', data: { position: [550, 422] } },

  // Incienso en el altar — aroma sagrado
  { match: /incienso|altar del incienso|quemar incienso|incensar|perfume sagrado/i,
    cueId: 'fx:incense-spiral', data: { position: [550, 425] } },

  // Altar de los holocaustos — fuego perpetuo
  { match: /altar.{0,15}(holocausto|bronce|quemado)|fuego perpetuo|fuego.{0,15}altar/i,
    cueId: 'fx:fire-flicker', data: { position: [549, 428] } },

  // Velo — separación entre el Santo y el Santísimo
  { match: /velo.{0,15}(templo|altar|santuario|separaci[óo]n)|par[ooó]khet|el velo del tabernáculo/i,
    cueId: 'fx:glow-pulse', data: { position: [550, 423], color: '#cfe6c8' } },

  // Palangana de bronce / agua de purificación
  { match: /palangana de bronce|fuente de bronce|aguas de purificaci[óo]n|lavatorio/i,
    cueId: 'fx:water-wave', data: { position: [549, 428] } },

  // Mesa de los panes — pan de la Presencia
  { match: /panes de la Presencia|pan de la proposici[óo]n|mesa sagrada|doce panes/i,
    cueId: 'fx:bread-multiply', data: { position: [550, 425] } },

  // Gloria de Yahveh llena el tabernáculo — Shekiná / Sakina
  { match: /gloria de Yahveh.{0,15}llen|Shekin[áa]|Sakina|nube cubri[óo].{0,15}tabern|presencia divina habit/i,
    cueId: 'fx:halo-divine', data: { position: [550, 425] } },

  // Nube que guía — columna de nube sobre el tabernáculo
  { match: /nube.{0,15}(tabern[áa]culo|tienda|sobre el tabern)|la nube descendi[óo]/i,
    cueId: 'fx:cloud-pillar', data: { position: [550, 415] } },

  // Columna de fuego de noche
  { match: /columna de fuego.{0,15}noche|fuego.{0,15}noche.{0,15}tabern|de noche hab[íi]a fuego/i,
    cueId: 'fx:pillar-of-fire', data: { position: [550, 415] } },

  // Aceite de la unción — Moisés unge el tabernáculo
  { match: /aceite.{0,15}unci[óo]n|unci[óo]n.{0,15}tabern[áa]culo|Mois[ée]s.{0,15}unci[óo]n|ungi[óo].{0,15}todo/i,
    cueId: 'fx:glow-pulse', data: { position: [550, 424], color: '#ffd27a' } },

  // Cortinas de lino — riqueza material
  { match: /cortinas|li[éi]nzo|p[úu]rpura|esc[áa]rlata|hilo de oro/i,
    cueId: 'fx:glow-pulse', data: { position: [550, 426], color: '#e6d4a0' } },

  // ── Pasada 3 — cinematográficos de cumbre ───────────────────────────────

  // Flash blanco — la gloria llena el santuario
  { match: /gloria llen[óo]|glori[óo]sa nube.{0,15}llen|llen[óo].{0,15}gloria|Mois[ée]s no pod[íi]a entrar/i,
    cueId: 'fx:flash-white' },

  // Radial bloom — inauguración del Mishkán
  { match: /primer d[íi]a.{0,15}primer mes|inauguraci[óo]n.{0,15}tabern[áa]culo|se erigi[óo].{0,15}mishk/i,
    cueId: 'fx:radial-bloom', data: { position: [550, 425] } },

  // Vignette — el tabernáculo resplandeciente en el desierto
  { match: /toda.{0,15}congregaci[óo]n.{0,15}gloria|vi[óo] todo el pueblo.{0,15}gloria/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
