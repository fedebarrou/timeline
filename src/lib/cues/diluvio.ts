import type { Cue } from '../narrationCues';

/**
 * Cues for "El Gran Diluvio".
 * Pins: noe(0), sem(1), cam(2), jafet(3), matusalen(4), nephilim(5), vigilantes(6).
 *
 * scene-objects: 'arca' (id), 'lluvia-cuarenta-dias' (id).
 * REGLA #1: menciones al arca → fx:animate-scene-object con id='arca'.
 *           Lluvia efímera → fx:rain + fx:rain-sheet (primitivas) son válidas además del scene-object lluvia.
 *
 * Evento CUMBRE → densidad 20-30 cues.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // Arca sobre las aguas — scene-object 'arca' existe; REGLA #1
  { match: /\barca\b|embarc[oó]|entr[oó] en el arca|flota.{0,10}aguas|sobre las aguas/i,
    cueId: 'fx:animate-scene-object', data: { id: 'arca', kind: 'rock', duration: 1.6 } },

  // 'lluvia' / 40 días — primitiva de lluvia (REGLA #3: efímera = primitiva)
  { match: /cuarenta d[ií]as|40 d[ií]as|lluvia sobre la tierra/i,
    cueId: 'fx:rain-sheet' },

  // 'aguas' / 'cataratas' — oleaje cosmic
  { match: /cataratas de los cielos|fuentes del .{0,6}abismo|abri[óo] las cataratas|tehom|aguas sin forma/i,
    cueId: 'fx:water-wave', data: { position: [620, 320] } },

  // 'aguas sin forma' (tehom) — inversión cósmica
  { match: /aguas cubrieron|aguas de arriba|aguas de abajo|tehom|caos primigenio/i,
    cueId: 'fx:parted-waters', data: { position: [620, 325] } },

  // 'montes' de Ararat / Yudi — montaña que recibe el arca
  { match: /montes de Ararat|monte Ararat|Ararat|monte Yudi|Yudi/i,
    cueId: 'fx:mountain-glow', data: { position: [555, 195] } },

  // 'cuervo' — primer ave enviada (nounDictionary → raven-flight)
  { match: /\bcuervo\b|env[ií]a.{0,10}cuervo|cuervo.{0,15}env[ií]/i,
    cueId: 'fx:raven-flight', data: { from: [555, 195], to: [580, 240] } },

  // 'paloma' / 'rama de olivo' — señal del descenso de las aguas
  { match: /\bpaloma\b|rama de olivo|paloma.{0,20}volvi[oó]|paloma.{0,20}no volvi[oó]/i,
    cueId: 'fx:dove-flight', data: { from: [555, 195], to: [575, 220] } },

  // 'sangre' — la tierra manchada de sangre de los Nephilim
  { match: /espíritus de los Nephilim|sangre de los.{0,10}gigantes/i,
    cueId: 'fx:blood-stain', data: { position: [610, 330] } },

  // 'altar' — Noé construye altar al salir
  { match: /construy[oó].{0,10}altar|ofrece.{0,15}holocaustos|sacrific/i,
    cueId: 'fx:fire-flicker', data: { position: [555, 195] } },

  // 'humo' del sacrificio
  { match: /olor grato|olor suave|holocausto.{0,10}humo/i,
    cueId: 'fx:smoke-column', data: { position: [555, 195] } },

  // 'terremoto' / agitación de las aguas
  { match: /tierra tembl[oó]|temblores|aguas sacudieron/i,
    cueId: 'fx:earthquake-major' },

  // 'ángeles' — los cuatro arcángeles ejecutan sentencia
  { match: /Miguel.{0,30}Gabriel|Rafael.{0,20}Uriel|cuatro arc[áa]ngeles|arcángeles ordenan/i,
    cueId: 'fx:angel-formation', data: { position: [620, 305] } },

  // 'horno' (tannur) — señal coránica del inicio (Sura Hud 11:40)
  { match: /tannur|horno.{0,15}brota|horno.{0,15}agua/i,
    cueId: 'fx:water-wave', data: { position: [622, 322] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Matusalén muere antes del Diluvio — recede profético
  { match: /Matusal[eé]n|muere .{0,12}antes del Diluvio|siete d[ií]as antes/i,
    cueId: 'fx:character-recede', data: { pinIdx: 4 } },

  // Embarcan en el arca — Noé y familia
  { match: /embarc[oó]|entr[oó] en el arca|familia se salv|pares de animales/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Halo divino sobre Noé — el elegido
  { match: /var[oó]n justo|s[áa]lvate.{0,10}arca|el elegido de Dios/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Sem emerge — el antepasado semita
  { match: /\bSem\b|antepasado de los semitas/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Cam emerge
  { match: /\bCam\b|padre de Cus|Mizraim|Cana[áa]n/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Jafet emerge
  { match: /\bJafet\b|pueblos indoeuropeos|expandido/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 3 } },

  // Nephilim hundidos — se hunden en las aguas
  { match: /Nephilim.{0,40}(destruid|hundid|matarse entre|ahogad)|hundidos por las aguas/i,
    cueId: 'fx:character-recede', data: { pinIdx: 5 } },

  // Vigilantes encadenados al abismo
  { match: /Vigilantes.{0,40}(encarcelad|atados|juzgad)|abismo|fondo del mar/i,
    cueId: 'fx:character-recede', data: { pinIdx: 6 } },

  // El hijo incrédulo de Noé — drama coránico (se ahoga)
  { match: /hijo.{0,20}no cree|hijo.{0,20}se ahog|hijo.{0,20}se qued[oó] fuera|monta[ñn]a que me proteg/i,
    cueId: 'fx:vignette-pulse' },

  // Olas se interponen — olas trágicas entre padre e hijo
  { match: /olas se interpusieron|olas.{0,15}separa|fue de los que se ahog/i,
    cueId: 'fx:water-wave', data: { position: [618, 318] } },

  // El arca reposa — sobre Ararat / Yudi (momento de calma)
  { match: /reposa en|repos[oó] en|montes de Ararat|monte Yudi|arca.{0,15}descans/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // "¡Tierra, traga tus aguas!" — voz divina coránica
  { match: /tierra.{0,10}traga.{0,10}aguas|cielo.{0,10}cont[eé]nte|¡Tierra|retírate/i,
    cueId: 'fx:divine-light-beam', data: { position: [620, 310] } },

  // Fade a negro para el pico del Diluvio — toda carne perece
  { match: /toda carne.{0,20}pereci[oó]|toda carne muri[oó]|destrucci[oó]n.{0,15}universal/i,
    cueId: 'fx:fade-to-black' },

  // Fade from black — las aguas descienden, nuevo mundo
  { match: /aguas descend[íi]an|se retiraron las aguas|un a[ñn]o.{0,10}arca|sali[oó].{0,10}arca/i,
    cueId: 'fx:fade-from-black' },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // Noé suplica a su hijo: "¡Hijo mío! ¡Embarca con nosotros!"
  { match: /hijo m[íi]o.{0,30}embarca|¡Hijo m[íi]o!.{0,30}embarca/i,
    cueId: 'fx:dialog', data: { eventId: 'diluvio' } },

  // El hijo responde: "Me refugiaré en una montaña"
  { match: /me refugiar[eé] en una monta[ñn]a|monta[ñn]a que me proteger[áa]/i,
    cueId: 'fx:dialog', data: { eventId: 'diluvio' } },

  // Dios habla al comenzar — Embarcad en ella
  { match: /embarcad en ella|en el nombre de Dios sea su rumbo/i,
    cueId: 'fx:dialog', data: { eventId: 'diluvio' } },
];

export default CUES;
