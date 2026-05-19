import type { Cue } from '../narrationCues';

/**
 * Cues for "Sermón del Monte".
 * Pins: jesus(0), pedro(1), juan-apostol(2).
 * CUMBRE — 20-30 cues.
 * Scene-objects: 'monte-bienaventuranzas'
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Monte — glow de la montaña
  { match: /monte|sube al monte|monte de las Bienaventuranzas|subiendo el monte/i, cueId: 'fx:mountain-glow', data: { position: [580, 350] } },
  // Monte scene-object — animarlo
  { match: /sube al monte|subiendo el monte|monte de las Bienaventuranzas|nuevo Mois[eé]s/i, cueId: 'fx:animate-scene-object', data: { id: 'monte-bienaventuranzas', kind: 'glow', duration: 2 } },
  // Halo sobre Jesús — nueva Ley
  { match: /bienaventurados|dichosos|pobres en esp[ií]ritu|los que lloran|misericordiosos|pacificadores/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Luz del maestro
  { match: /sal de la tierra|luz del mundo|ciudad asentada/i, cueId: 'fx:divine-light-beam', data: { position: [580, 350] } },
  // Lámpara — glow lamp
  { match: /l[áa]mpara|bajo el celemín|dar luz.{0,10}casa|alumbrar/i, cueId: 'fx:lamp-glow', data: { position: [580, 352] } },
  // Pan de cada día — bread
  { match: /pan nuestro de cada d[ií]a|pan cotidiano|nuestro pan/i, cueId: 'fx:bread-multiply', data: { position: [580, 354] } },
  // Aves del cielo — eagle soar
  { match: /aves del cielo|p[áa]jaros|no siembran ni cosechan/i, cueId: 'fx:eagle-soar', data: { position: [582, 345] } },
  // Lirios del campo — glow pulse
  { match: /lirios del campo|hierba del campo|flores del campo|Salom[oó]n en toda su gloria/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Lobo — metáfora del falso profeta
  { match: /lobos con piel de oveja|falsos profetas|¡Guardaos de/i, cueId: 'fx:wolf-prowl', data: { position: [580, 358] } },
  // Espada — no vine a traer paz sino espada
  { match: /no vine a traer paz sino espada|espada a la mano|dividir/i, cueId: 'fx:sword-strike', data: { from: [580, 350], to: [580, 362] } },
  // Casa sobre roca vs arena
  { match: /casa edificada sobre la roca|sobre la arena|dos casas|edificar/i, cueId: 'fx:dust-burst', data: { position: [580, 360] } },
  // Trueno / tormenta al final — casa cae
  { match: /llovió|vinieron ríos|soplaron vientos|gran ca[ií]da|ruina de la casa/i, cueId: 'fx:thunder-flash' },
  // Lluvia sobre la casa
  { match: /llovió|vinieron lluvias/i, cueId: 'fx:rain' },
  // Noche de oración en el monte antes
  { match: /pas[oó] la noche.{0,20}oraci[oó]n|noche de oraci[oó]n/i, cueId: 'fx:night-fall' },
  // Amanecer del sermón
  { match: /al amanecer|cuando lleg[oó] el d[ií]a|al d[ií]a siguiente/i, cueId: 'fx:dawn-break' },
  // Rollo / pergamino — nueva Ley
  { match: /la Ley y los Profetas|no vine a abolir sino a cumplir|cumplimiento de la Ley/i, cueId: 'fx:scroll-unfurl', data: { position: [580, 352] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Jesús sube al monte — emerge
  { match: /sube al monte|subiendo el monte|nuevo Mois[eé]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Multitud sigue — emerge Pedro
  { match: /multitud .{0,12}(escucha|admir|se asombra)|ense[ñn]aba con autoridad/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Juan también emerge
  { match: /disc[ií]pulos suyos|sus disc[ií]pulos|los disc[ií]pulos se le acercaron/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Padrenuestro — zoom en el momento
  { match: /Padrenuestro|Padre nuestro|santificado sea|venga tu reino|hágase tu voluntad/i, cueId: 'fx:zoom-pulse' },
  // Vignette al pronunciar las bienaventuranzas
  { match: /bienaventurados|dichosos.{0,12}los que/i, cueId: 'fx:vignette-pulse' },
  // Glow en el habéis oído / pero yo os digo
  { match: /hab[eé]is o[ií]do|pero yo os digo|nueva interpretaci[oó]n|nueva Ley|radicaliza/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Regla de oro
  { match: /regla de oro|no os angusti[eé]is|no os afan[eé]is|todo cuanto quer[eé]is/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Radial bloom al cerrar el discurso
  { match: /ense[ñn]aba con autoridad|as[ií] termin[oó]|gran asombro|la gente qued[oó] admirada/i, cueId: 'fx:radial-bloom', data: { position: [580, 350] } },
];

export default CUES;
