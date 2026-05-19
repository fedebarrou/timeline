import type { Cue } from '../narrationCues';

/**
 * Cues for "El pacto de Abraham".
 * Pins: abraham(0), sara(1). Escenario: Hebrón / Mamre [582, 365].
 * CUMBRE — densidad 15-20 cues.
 * Scene-objects: 'antorcha-pacto', 'estrellas-promesa'.
 * REGLA #1: 'antorcha-pacto' cubre fuego/antorcha → fx:animate-scene-object.
 *           'estrellas-promesa' cubre estrellas → fx:animate-scene-object.
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ────────────────────────────────────────────

  // 'antorcha' / 'horno humeante' → scene-object 'antorcha-pacto' (REGLA #1: no fx:fire-flicker)
  { match: /antorcha de fuego|horno humeante|pasaba entre las piezas|tizón ardiente/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'antorcha-pacto', kind: 'burn' } },

  // 'estrellas' → scene-object 'estrellas-promesa' (REGLA #1: no fx:starfield-shimmer)
  { match: /como las estrellas|cuenta las estrellas|estrellas del cielo/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'estrellas-promesa', kind: 'shimmer' } },

  // 'piezas / animales partidos' — humo del ritual (scene-object cubre antorcha; el humo es detalle extra)
  { match: /piezas|animales partidos|animales divididos|los partió por la mitad/i,
    cueId: 'fx:smoke-rise',
    data: { position: [582, 365] } },

  // 'humo' del horno
  { match: /humo.{0,8}horno|humeante.{0,12}pasaba/i,
    cueId: 'fx:smoke-column',
    data: { position: [582, 365] } },

  // 'sueño profundo' — atmósfera nocturna
  { match: /sue[ñn]o profundo|tard[ead]ecer|cuando se puso el sol|noche sobre Abram/i,
    cueId: 'fx:night-fall' },

  // 'circuncisión' — señal corporal del pacto
  { match: /circuncisi[oó]n|circuncidad|brit milah|se[ñn]al del pacto|octavo d[íi]a/i,
    cueId: 'fx:blood-stain',
    data: { position: [582, 365] } },

  // 'descendencia' / promesa de tierra
  { match: /tu descendencia|a tu descendencia|le fue contado por justicia|descendencia como la arena/i,
    cueId: 'fx:scroll-unfurl',
    data: { position: [582, 365] } },

  // 'paloma' / 'tórtola' — animales del ritual
  { match: /t[oó]rtola|pichones|paloma del sacrificio/i,
    cueId: 'fx:dove-flight',
    data: { from: [582, 365], to: [582, 355] } },

  // ── Pasada 2: narrativa ─────────────────────────────────────────────

  // Abraham/Abram emerge
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Sara/Saray emerge
  { match: /Sara|Saray|Sarah|princesa de los pueblos/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // Cambio de nombre — halo divino sobre Abraham
  { match: /padre de multitudes|cambio de nombre|Abram.{0,12}Abraham|Saray.{0,12}Sara/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // Halo sobre Sara — el nombre "princesa"
  { match: /Sara.{0,12}nombre|Sara.{0,12}princesa|tendr[áa] un hijo|Sara tambi[ée]n recibi[rr]/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 1 } },

  // Ḥanīf — Abraham anterior al judaísmo y cristianismo
  { match: /ḥan[īi]f|hanif|ni jud[íi]o ni cristiano|monote[íi]sta puro|im[áa]m de los pueblos/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#e6d4a0' } },

  // Voz divina / Yahveh habla
  { match: /Yahveh.{0,10}dij|dijo.{0,10}Jehov[áa]|le habl[oó] Dios|voz de Dios/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [582, 365] } },

  // Pacto unilateral — solo Dios pasa
  { match: /pacto unilateral|solo Dios pasa|tratado|b[ée]rit|berith|alianza/i,
    cueId: 'fx:radial-bloom',
    data: { position: [582, 365] } },

  // Lecturas paulinas (Romanos 4, Gálatas 3)
  { match: /Romanos 4|Gálatas 3|justificaci[oó]n por la fe|Pablo.{0,16}Abraham|fe precede/i,
    cueId: 'fx:glow-pulse',
    data: { position: [582, 365], color: '#ffd866' } },

  // 400 años de opresión — visión de la esclavitud futura
  { match: /cuatrocientos a[ñn]os|esclavizad|en tierra ajena|oprimi[dD]os/i,
    cueId: 'fx:vignette-pulse' },

  // Misterio del pacto — zoom sobre Hebrón
  { match: /Mambr[ée]|Mamre|Hebr[oó]n|encinas de Mamre|debajo del roble/i,
    cueId: 'fx:zoom-pulse' },

  // Prueba superada / obediencia (Sura 2:124)
  { match: /probado por su Se[ñn]or|ciertas [oó]rdenes|gu[íi]a de los hombres|im[áa]n para los pueblos/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

];

export default CUES;
