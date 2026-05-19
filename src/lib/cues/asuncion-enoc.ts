import type { Cue } from '../narrationCues';

/**
 * Cues for "Asunción de Enoc".
 * Pins: enoc(0), jared(1), vigilantes(2), semjaza(3).
 *
 * scene-object 'asuncion-enoc-luz' (id) declarado en este evento.
 * REGLA #1: usar fx:animate-scene-object para ese SVG.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'cielo' / 'ascenso' — Enoc asciende
  { match: /ascendi[oó]|fue llevado al cielo|elevado a un lugar/i,
    cueId: 'fx:divine-light-beam', data: { position: [620, 310] } },

  // 'luz' del ascenso — scene-object 'asuncion-enoc-luz' ya existe; REGLA #1
  { match: /columna de luz|luz del cielo|haz de luz|luz.{0,15}ascenso/i,
    cueId: 'fx:animate-scene-object', data: { id: 'asuncion-enoc-luz', kind: 'rise' } },

  // 'nubes' — la ascensión a través de las nubes
  { match: /nubes|entre las nubes|por las nubes/i,
    cueId: 'fx:cloud-pillar', data: { position: [620, 305] } },

  // 'estrellas' / 'siete cielos' — viaje cósmico de 2 Enoc
  { match: /siete cielos|viaj[oó] por los cielos|secretos del cielo/i,
    cueId: 'fx:starfield-shimmer' },

  // 'ángeles' — Enoc visita el trono con los ángeles
  { match: /\b[áa]ngeles\b|trono divino|arcángeles/i,
    cueId: 'fx:angel-descent', data: { position: [620, 305] } },

  // 'gloria' / 'Shekhiná' — la gloria de Dios
  { match: /gloria.{0,15}Dios|Shekin[áa]|trono de Dios|frente del Alt[íi]simo/i,
    cueId: 'fx:radial-bloom', data: { position: [620, 310] } },

  // 'monta montañas' — Semjaza atado bajo las montañas
  { match: /bajo las monta[ñn]as|bajo las colinas|atado.{0,15}tierra/i,
    cueId: 'fx:mountain-glow', data: { position: [615, 310] } },

  // 'pergamino' / 'escritura' — Idris inventa la escritura (tradición islámica)
  { match: /invenci[oó]n de la escritura|primer escriba|primer astr[oó]nomo|sastrería/i,
    cueId: 'fx:scroll-unfurl', data: { position: [623, 318] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // "Caminó con Dios" — pulso de gloria sobre Enoc
  { match: /camin[oó] con Dios|365 a[ñn]os|agrad[oó] a Dios|por la fe Enoc/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Asunción — Enoc desaparece (recede)
  { match: /desapareci[oó]|le llev[oó] Dios|traspuesto|para no ver muerte|elevado al cuarto cielo/i,
    cueId: 'fx:character-recede', data: { pinIdx: 0 } },

  // Flash de epifanía — el cielo se abre
  { match: /desapareci[oó]|fue traspuesto|le llev[oó] Dios/i,
    cueId: 'fx:flash-white' },

  // Jared queda solo — pulso reverente
  { match: /Jared|padre.{0,20}Enoc|queda solo/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Idris — identificación coránica
  { match: /Idris|ver[áa]z|profeta|lugar elevado/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Sentencia a los Vigilantes — arrastrados al abismo
  { match: /Vigilantes|encarcelad|atados|70 generaciones|setenta generaciones/i,
    cueId: 'fx:character-recede', data: { pinIdx: 2 } },

  // Semjaza encadenado
  { match: /Semjaza|atado.{0,15}generaciones/i,
    cueId: 'fx:character-recede', data: { pinIdx: 3 } },

  // Primer humano que no muere — vignette épico
  { match: /primer humano que no muere|no pas[oó] por la muerte|sin morir/i,
    cueId: 'fx:vignette-pulse' },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // "He visto los secretos del cielo" — Enoc
  { match: /secretos del cielo|nada queda oculto al rostro/i,
    cueId: 'fx:dialog', data: { eventId: 'asuncion-enoc' } },

  // "Lo elevamos a un lugar elevado" — Allah (Corán, Sura Maryam 19:56-57)
  { match: /le elevamos|elevamos a un lugar|lo elevamos/i,
    cueId: 'fx:dialog', data: { eventId: 'asuncion-enoc' } },
];

export default CUES;
