import type { Cue } from '../narrationCues';

/**
 * Cues for "Destrucción de Sodoma y Gomorra".
 * Pins: lot(0), abraham(1).
 * Escenario: Sodoma [583, 372].
 * CUMBRE — densidad 20-30 cues.
 * Scene-objects: 'ciudad-sodoma', 'columna-sal', 'lluvia-azufre'.
 * REGLA #1: 'ciudad-sodoma' ↔ no fx:walls-fall (usa fx:animate-scene-object).
 *           'lluvia-azufre' cubre el fuego del cielo (usa fx:animate-scene-object).
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // 'ciudad amurallada' → scene-object 'ciudad-sodoma' (REGLA #1: no fx:walls-fall)
  { match: /\bciudad.{0,12}(llanura|Sodoma|Gomorra)|ciudades de la llanura|murallas\b/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'ciudad-sodoma', kind: 'burn' } },

  // 'lluvia de azufre' → scene-object 'lluvia-azufre' (REGLA #1: no fx:fire-from-heaven)
  { match: /azufre y fuego|fuego del cielo|llovió.{0,16}(fuego|azufre)|piedras de barro cocido|hizo llover/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'lluvia-azufre', kind: 'shake' } },

  // 'columna de sal' → scene-object 'columna-sal'
  { match: /estatua de sal|mujer de Lot.{0,12}sal|mir[oó] atr[áa]s|esposa de L[ūu]t|pilar de sal/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'columna-sal', kind: 'rise' } },

  // 'ángeles' visitan Sodoma — descenso
  { match: /\bdos [áa]ngeles?|mensajeros.{0,12}(Sodoma|lot)|nuestros mensajeros/i,
    cueId: 'fx:angel-descent',
    data: { position: [583, 372] } },

  // ángeles ciegan a la turba — flash blanco
  { match: /cegar|ceg[oó] a la multitud|ceguera|golpe de luz/i,
    cueId: 'fx:flash-white' },

  // 'fuego' general / llamas que permanecen
  { match: /\bfuego\b|llamas\b|arden\b/i,
    cueId: 'fx:fire-flicker',
    data: { position: [583, 372] } },

  // 'humo' subiendo tras la destrucción
  { match: /\bhumo.{0,12}(sub[íi]|sube|del horno|horno humeante|toda la llanura)/i,
    cueId: 'fx:smoke-column',
    data: { position: [583, 372] } },

  // 'humo' genérico
  { match: /\bhumo\b/i,
    cueId: 'fx:smoke-rise',
    data: { position: [583, 372] } },

  // 'rayo' del cielo
  { match: /\brayo|rayos\b|relámpago|desde los cielos/i,
    cueId: 'fx:lightning-strike',
    data: { from: [583, 310], to: [583, 372] } },

  // terremoto / sismo en la llanura
  { match: /\bterremoto|sismo|temblor|sacudi[oó]|toda aquella llanura/i,
    cueId: 'fx:earthquake-major' },

  // 'sangre' / violencia de la turba
  { match: /\bsangre\b|violencia.{0,12}turba|abus/i,
    cueId: 'fx:blood-stain',
    data: { position: [583, 372] } },

  // Mar Muerto — geología de azufre/sal
  { match: /\bMar Muerto|betún|dep[oó]sitos.{0,12}sal|azufre geol[oó]gico|Bab edh-Dhra/i,
    cueId: 'fx:water-wave',
    data: { position: [583, 380] } },

  // oscuridad total tras la destrucción
  { match: /\boscuridad|tinieblas\b|apocal[íi]ptico/i,
    cueId: 'fx:plague-darkness' },

  // relámpago divino (doble intensidad)
  { match: /truenos\b|trueno divino/i,
    cueId: 'fx:thunder-flash' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Lot emerge al inicio — hospeda a los ángeles
  { match: /\bLot|L[ūu]t/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Abraham, el intercesor
  { match: /Abraham|Ibr[āa]h[īi]m|interces/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // El regateo teológico — halo sobre Abraham (valor moral)
  { match: /cincuenta justos|cuarenta.{0,8}justos|treinta justos|veinte justos|diez justos|¿destruir[áa]s.{0,16}justo/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 1 } },

  // Lot huye — journey trace hacia el norte
  { match: /Lot.{0,16}(huye|huy[oó]|sali[oó])|los sacaron|a Soar|refugio.{0,12}cueva/i,
    cueId: 'fx:journey-trace',
    data: { from: [583, 372], to: [583, 355], style: 'walking' } },

  // La mujer de Lot — recede (se petrifíca)
  { match: /mujer de Lot|esposa de L[ūu]t.{0,12}(mira|infiel|pereci[oó])/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 0 } },

  // Vignette para el clímax de la destrucción
  { match: /destruy[oó].{0,12}ciudades|destrucci[oó]n de Sodoma|cataclismo/i,
    cueId: 'fx:vignette-pulse' },

  // Shockwave de la destrucción
  { match: /tremenda.{0,12}destrucci[oó]n|toda la llanura destruida|tierra arrasada/i,
    cueId: 'fx:shockwave',
    data: { position: [583, 372] } },

  // Abraham observa desde Hebrón — zoom pulse sobre el marker lejos
  { match: /Abraham.{0,20}(observ|vio|mir[oó]).{0,20}(humo|destrucci[oó]n|llanura)/i,
    cueId: 'fx:zoom-pulse' },

  // Advertencia escatológica de Jesús (lecturas NT)
  { match: /acord[áa]os de la mujer de Lot|Lucas 17|d[íi]a.{0,8}Lot|Hijo del Hombre/i,
    cueId: 'fx:glow-pulse',
    data: { position: [583, 372], color: '#ffd866' } },

  // ── Pasada 3: diálogos (disparados por dialogs/patriarcal.ts) ─────────

  // Regateo de Abraham con Yahvé — glow sobre abraham
  { match: /¿destruir[áa]s.{0,18}justo|¿el juez de toda la tierra/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 1, color: '#ffd866' } },

  // Lot habla a los ángeles ("Hermanos míos, os ruego")
  { match: /Hermanos m[íi]os.{0,10}os ruego|no hag[aá]is tal maldad/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#ffd866' } },

  // Ángeles revelan su naturaleza / anuncian la salvación
  { match: /no temas.{0,12}(salvar|Lot)|te vamos a salvar|vamos a descender/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [583, 372] } },

];

export default CUES;
