import type { Cue } from '../narrationCues';

/**
 * Cues for "Reencuentro de José con sus hermanos".
 * Pins: jose(0), jacob(1), benjamin(2). Escenario Egipto [510, 410], origen Canaán [582, 365].
 * CUMBRE — densidad 15-20 cues.
 * Scene-objects: 'copa-plata-jose'.
 * REGLA #1: 'copa-plata-jose' → no fx:chalice (usa fx:animate-scene-object).
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ────────────────────────────────────────────

  // 'copa de plata' → scene-object 'copa-plata-jose' (REGLA #1: no fx:chalice)
  { match: /copa de plata|copa escondida|saco de Benjam[íi]n|prueba de la copa/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'copa-plata-jose', kind: 'pulse' } },

  // 'caravana' / viaje Canaán → Egipto — journey trace
  { match: /hambruna.{0,12}(alcanza|llega|Cana[áa]n)|viajan a comprar grano|caravana de hermanos/i,
    cueId: 'fx:journey-trace',
    data: { from: [582, 365], to: [510, 410], style: 'caravan' } },

  // 'dinero en el saco' — regreso del dinero del trigo
  { match: /dinero.{0,12}saco|saco de trigo|precio del grano|devuelto el dinero/i,
    cueId: 'fx:glow-pulse',
    data: { position: [510, 410], color: '#a04040' } },

  // 'grano / trigo' — la razón del viaje
  { match: /comprar grano|grano.{0,8}Egipto|alimentos|provisiones/i,
    cueId: 'fx:dust-burst',
    data: { position: [510, 410] } },

  // 'camisa de Yūsuf' — el prodigio coránico
  { match: /camisa.{0,16}(Y[ūu]suf|rostro)|olor de Y[ūu]suf|camisa.{0,16}vista/i,
    cueId: 'fx:dove-flight',
    data: { from: [510, 410], to: [582, 365] } },

  // Providencia — "Dios lo encaminó a bien"
  { match: /no me enviasteis ac[áa] vosotros sino Dios|Dios lo encamin[oó] a bien|preservar la vida/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [510, 410] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // José visir emerge
  { match: /Jos[ée]|Y[ūu]suf.{0,12}(visir|reconoce|hermano)/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Jacob anciano
  { match: /Jacob|Yaʿq[ūu]b.{0,16}(ciego|llora|perdi[oó] la vista|anciano)/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // Benjamín — clave de la prueba
  { match: /Benjam[íi]n|hermano menor|hijo de Raquel/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 2 } },

  // Acusación de espías — Simeón retenido
  { match: /acusa de esp[íi]as|esp[íi]as|encarcela tres d[íi]as|retiene a Sime[oó]n|reh[eé]n/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 2 } },

  // Discurso de Judá — halo sobre José (la bondad que desencadena el perdón)
  { match: /Jud[áa].{0,16}(ofrec|fiador|sustituto)|discurso de Jud[áa]|en lugar de Benjam[íi]n|Gn 44/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // Revelación — "Yo soy José"
  { match: /Yo soy Jos[ée]|se da a conocer|dio a conocer|lloraba a gritos/i,
    cueId: 'fx:flash-white' },

  // Perdón explícito — reconciliación
  { match: /hoy no os reprocho nada|encamin[oó] a bien|os perdono|reconciliaci[oó]n/i,
    cueId: 'fx:radial-bloom',
    data: { position: [510, 410] } },

  // Abrazos y llanto — clímax emocional
  { match: /se ech[oó] sobre.{0,12}cuello|abraz[oó].{0,12}llor|lloraron juntos|abraz[oó] a Benjam[íi]n/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#fff1c0' } },

  // Jacob recupera la vista (Corán) — glow especial sobre Jacob
  { match: /recobr[oó] la vista|recobra.{0,8}vista|Yaʿq[ūu]b.{0,12}(vista|ciego)|olor de Y[ūu]suf/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 1, color: '#ffd866' } },

  // Yūsuf "huele" a su padre desde lejos (Corán — sufismo)
  { match: /noto el olor|huele.{0,12}Y[ūu]suf|caravana emprendi[oó] la marcha|percibe el olor/i,
    cueId: 'fx:journey-trace',
    data: { from: [510, 410], to: [582, 365], style: 'walking' } },

  // Lectura tipológica — José como figura de Cristo que perdona
  { match: /prefigurac[ióo]n.{0,12}Cristo|tipo de Cristo.{0,12}perd[oó]n|Hechos 7:13/i,
    cueId: 'fx:glow-pulse',
    data: { position: [510, 410], color: '#ffd866' } },

  // Carros enviados a buscar a Jacob — invitation al éxodo anticipado
  { match: /carros.{0,16}Jacob|enviar carros|traer.{0,8}familia|bajar a Egipto|Gos[ée]n/i,
    cueId: 'fx:zoom-pulse' },

];

export default CUES;
