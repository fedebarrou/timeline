import type { Cue } from '../narrationCues';

/**
 * Cues for "José en Egipto: de esclavo a visir".
 * Pins: jose(0). Escenario: Egipto faraónico [510, 410].
 * CUMBRE — densidad 15-20 cues.
 * Scene-objects: 'trono-visir', 'granero-egipcio'.
 * REGLA #1: 'trono-visir' → no fx:throne. 'granero-egipcio' → no fx:pyramid-glow.
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ────────────────────────────────────────────

  // 'trono' / 'trono del visir' → scene-object 'trono-visir' (REGLA #1: no fx:throne)
  { match: /trono.{0,12}(visir|fara[oó]n)|sello.{0,8}fara[oó]n|anillo.{0,8}fara[oó]n|sortija del fara[oó]n/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'trono-visir', kind: 'glow' } },

  // 'granero' / 'graneros del país' → scene-object 'granero-egipcio'
  { match: /graneros? del pa[íi]s|almacenar.{0,12}grano|ga[vb]illas.{0,12}almacena|silo|quinto de la producci[oó]n/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'granero-egipcio', kind: 'pulse' } },

  // 'vacas y espigas' del sueño — scroll de visión profética
  { match: /vacas.{0,16}espigas|siete vacas|siete espigas|sue[ñn]o del fara[oó]n|magos egipcios/i,
    cueId: 'fx:scroll-unfurl',
    data: { position: [510, 410] } },

  // 'copero y panadero' — sueños en la cárcel
  { match: /copero|panadero|tres sarmientos|tres canastillos|ser[áa] ahorcado/i,
    cueId: 'fx:scroll-unfurl',
    data: { position: [510, 410] } },

  // 'cárcel / prisión' — recede
  { match: /c[áa]rcel|prisi[oó]n|encarcelad|falsamente acusad|acusaci[oó]n falsa/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 0 } },

  // 'cuchillo' / banquete de las damas (Corán)
  { match: /banquete.{0,16}damas|se cortaron las manos|cuchillo.{0,12}fruta|[áa]ngel maravilloso/i,
    cueId: 'fx:blood-stain',
    data: { position: [510, 410] } },

  // 'hambruna' / siete años de hambre
  { match: /siete a[ñn]os.{0,12}hambr|hambruna|a[ñn]os de hambre|escasez/i,
    cueId: 'fx:dust-burst',
    data: { position: [510, 410] } },

  // 'túnica de lino' / 'carro de mando' — investidura de visir
  { match: /t[úu]nica de lino|collar de oro|carro.{0,8}mando|Zafenat-paneaj|nombre egipcio/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#ffd866' } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // José/Yusuf emerge
  { match: /Jos[ée]|Y[ūu]suf/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Casa de Potifar / al-ʿAzīz — destello al inicio del ascenso
  { match: /Putifar|Potifar|al-[ʿ`ʾ]?Az[īi]z|capit[áa]n de la guardia|el Poderoso/i,
    cueId: 'fx:glow-pulse',
    data: { position: [510, 410], color: '#e6d4a0' } },

  // Tentación de la esposa / Zulayja — tensión moral
  { match: /Zulayja|esposa de Putifar|requiri[oó] de amores|mujer de su amo|seduci[rr]/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#7a4040' } },

  // José interpreta — re-emerge y halo
  { match: /interpret[oó] los sue[ñn]os|nombrad[oó] visir|gobernador sobre Egipto/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // Yahveh estaba con José — presencia divina
  { match: /Yahveh estaba con Jos[ée]|Dios estaba con [ée]l|prosperaba.{0,12}Jos[ée]|prospera en la c[áa]rcel/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [510, 410] } },

  // Asenat — esposa en Heliópolis (matrimonio)
  { match: /Asenat|Potifera.{0,12}On|Heliópolis|sacerdote de On|se cas[oó] con/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#e6d4a0' } },

  // Lectura tipológica (José en la prisión = Cristo descendido)
  { match: /prefiguraci[oó]n del Cristo|tipo de Cristo en la prisi[oó]n|Hechos 7:9/i,
    cueId: 'fx:radial-bloom',
    data: { position: [510, 410] } },

  // Mística sufí — belleza de Yusuf
  { match: /Rumi|Yām[īi]|alegor[íi]a.{0,12}belleza divina|éxtasis.{0,12}belleza|mística isl[áa]mica/i,
    cueId: 'fx:glow-pulse',
    data: { position: [510, 410], color: '#ffd866' } },

  // Exoneración antes del ascenso (versión coránica)
  { match: /exigi[oó]|rehabilitaci[oó]n moral|las mujeres confiesan|exonerado antes de salir/i,
    cueId: 'fx:flash-white' },

  // 30 años al servicio del faraón
  { match: /treinta a[ñn]os|30 a[ñn]os.{0,16}fara[oó]n|comenz[oó] a servir/i,
    cueId: 'fx:zoom-pulse' },

];

export default CUES;
