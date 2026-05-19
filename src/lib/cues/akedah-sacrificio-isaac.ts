import type { Cue } from '../narrationCues';

/**
 * Cues for "La Akedah: el sacrificio del hijo".
 * Pins: abraham(0), isaac(1), ismael(2).
 * Escenario: Monte Moriah [582, 360].
 * CUMBRE — densidad 20-30 cues.
 * Scene-objects declarados: 'altar-moriah', 'carnero-zarza', 'monte-moriah'.
 * REGLA #1: cues de esos scene-objects usan fx:animate-scene-object.
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'altar' → scene-object 'altar-moriah' (REGLA #1: no fx:fire-flicker)
  { match: /\baltar|altares?\b/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'altar-moriah', kind: 'glow' } },

  // 'carnero' / 'cordero' → scene-object 'carnero-zarza' (REGLA #1: no fx:ram)
  { match: /\bcarnero|v[íi]ctima preciosa|sustituto|gran ofrenda|trabado en el zarzal/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'carnero-zarza', kind: 'sway' } },

  // 'monte' → scene-object 'monte-moriah' (REGLA #1: no fx:mountain-glow)
  { match: /\bMoriah|monte.{0,16}(que yo te diré|holocausto|Dios)|sube al monte/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'monte-moriah', kind: 'glow' } },

  // leña sobre el altar — efímero (scene-object cubre el altar pero la leña es detalle extra)
  { match: /\ble[ñn]a\b|cargo la le[ñn]a|lleva la le[ñn]a a la espalda/i,
    cueId: 'fx:smoke-column',
    data: { position: [582, 360] } },

  // 'cuchillo' — espada/golpe simbólico hacia el altar
  { match: /\bcuchillo|extendi[oó] su mano|degollar|tom[oó] el cuchillo/i,
    cueId: 'fx:sword-strike',
    data: { from: [582, 348], to: [582, 360] } },

  // 'fuego' — lleva el fuego (efímero, no duplica altar)
  { match: /\bfuego\b|llamas\b/i,
    cueId: 'fx:fire-flicker',
    data: { position: [582, 358] } },

  // 'ángel' → descenso
  { match: /\b[áa]ngel(?:es)?\b|malaj|ángel del Se[ñn]or|ángel de Jehov[áa]|le llamamos/i,
    cueId: 'fx:angel-descent',
    data: { position: [582, 348] } },

  // 'humo' del sacrificio
  { match: /\bhumo\b|sacrificio quemado|holocausto/i,
    cueId: 'fx:smoke-rise',
    data: { position: [582, 360] } },

  // 'tres días' de camino — temporal
  { match: /\btres d[íi]as\b|al tercer d[íi]a divisa/i,
    cueId: 'fx:fade-from-black' },

  // 'amaneció' / 'de madrugada' — alba en el Moriah
  { match: /\bde madrugada|se levant[oó].{0,10}ma[ñn]ana|al alba/i,
    cueId: 'fx:dawn-break' },

  // 'noche' / visión nocturna → atmósfera
  { match: /\bnoche\b|visi[oó]n nocturna|sue[ñn]o.{0,12}orden divina/i,
    cueId: 'fx:night-fall' },

  // montaña / lugar lejano — viaje trazado
  { match: /partir.{0,18}(Moriah|monte)|viaje.{0,12}tres jornadas/i,
    cueId: 'fx:journey-trace',
    data: { from: [582, 372], to: [582, 360], style: 'walking' } },

  // Yahweh-Yireh — luz divina
  { match: /Yahveh-Yireh|Yahweh.Yireh|el Se[ñn]or proveer[áa]|Dios proveer[áa]/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [582, 360] } },

  // Eid al-Adha (fiesta del sacrificio)
  { match: /Eid al-Adha|fiesta del sacrificio|Dhab[īi]ḥ|peregrinaje a La Meca/i,
    cueId: 'fx:glow-pulse',
    data: { position: [582, 360], color: '#ffd866' } },

  // ── Pasada 2: narrativa (personajes, momentos cumbre) ────────────────

  // Abraham emerge al inicio del relato
  { match: /Abraham|Ibr[āa]h[īi]m/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Isaac, el hijo de la prueba
  { match: /Isaac|Yitzjak|Isḥ[āa]q|hijo.{0,8}(amado|[úu]nico)|tu hijo/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // Ismael (lectura islámica como el hijo ofrecido)
  { match: /Isma[ée]l|Ism[āa][ʿʾ`]?[īi]l/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 2 } },

  // Halo sobre Abraham — obediencia máxima
  { match: /prueba.{0,12}Abraham|probó Dios|Abraham obedeció|Heme aqu[íi]/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // El ángel DETIENE — flash blanco de revelación súbita
  { match: /no extiendas tu mano|no le hagas nada|detuvo la mano|¡Abraham.{0,8}Abraham/i,
    cueId: 'fx:flash-white' },

  // Cima del evento: pausa lenta (la prueba cumbre)
  { match: /no me has rehusado tu hijo|atadura|akedah/i,
    cueId: 'fx:slow-motion',
    data: { duration: 3 } },

  // Vignette para enfocar el clímax
  { match: /extendió Abraham su mano|tomó el cuchillo/i,
    cueId: 'fx:vignette-pulse' },

  // Zoom sobre el marker (Monte Moriah)
  { match: /Monte Moriah|montículo del templo|lugar del futuro templo/i,
    cueId: 'fx:zoom-pulse' },

  // Isaac como tipo de Cristo — radial bloom (lectura cristológica)
  { match: /tipo de Cristo|hijo amado.{0,12}cruz|no escatim[oó] ni a su propio Hijo|Hebreos 11/i,
    cueId: 'fx:radial-bloom',
    data: { position: [582, 360] } },

  // Gloria divina — shekiná presente
  { match: /gloria|shekin[áa]|voz del cielo|voz de Yahveh/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [582, 348] } },

  // ── Pasada 3: diálogos (disparados por fx:dialog vía dialogs/patriarcal.ts) ─

  // La pregunta de Isaac ("¿dónde está el cordero?") — ver dialogs/patriarcal.ts
  { match: /padre m[íi]o.{0,18}cordero|¿d[oó]nde est[áa] el cordero/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 1, color: '#ffd866' } },

  // Respuesta de Abraham ("Dios proveerá")
  { match: /Dios se proveer[áa]|Dios.{0,8}proveer[áa]|Dios.{0,8}ver[áa]/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#ffd866' } },

  // Consentimiento coránico ("haz lo que se te ordena")
  { match: /haz lo que se te ordena|falammā aslamā|se hab[íi]an sometido los dos/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 2 } },

  // Anuncio de Isaac posterior al sacrificio (Corán)
  { match: /le anunciamos la buena nueva de Isḥāq|anunciamos.{0,16}Isaac/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

];

export default CUES;
