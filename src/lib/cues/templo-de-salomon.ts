import type { Cue } from '../narrationCues';

/**
 * Cues for "El Templo de Salomón" — EVENTO CUMBRE (≥20 cues).
 * Pins: salomon(0), hiram-rey-de-tiro(1).
 * Scene-objects: templo-salomon, menora-templo.
 *
 * REGLA #1: 'templo-salomon' → animate-scene-object (no fx:glow-pulse duplicado).
 * REGLA #1: 'menora-templo' → animate-scene-object (no fx:lamp-glow paralelo).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Templo ya en escena — animar el scene-object (REGLA #1)
  { match: /templo|casa de Yahveh|casa del Se[ñn]or|santuario central|casa santa/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'templo-salomon', kind: 'glow', duration: 2.0 } },

  // Menorá del templo — animate (REGLA #1: no fx:lamp-glow)
  { match: /menor[áa]|candelabro de oro|siete brazos|l[áa]mpara del santuario/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'menora-templo', kind: 'pulse', duration: 1.4 } },

  // Cedros del Líbano — aroma del bosque, trazado del viaje
  { match: /cedros del L[ií]bano|maderas del L[ií]bano|[áa]rboles de cedro/i,
    cueId: 'fx:journey-trace',
    data: { from: [572, 342], to: [583, 360], color: '#8a6a2a' } },

  // Arca entronizada — querubines sobre el sanctasanctórum
  { match: /Arca .{0,12}(Lugar Sant[ií]simo|entron|trasladad|hombros)|querubines/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [583, 360] } },

  // Incienso — espiral litúrgica
  { match: /\bincienso\b|ofrendas de incienso|altar del incienso/i,
    cueId: 'fx:incense-spiral',
    data: { position: [583, 360] } },

  // Columna de humo del sacrificio inaugural
  { match: /holocaustos|sacrificios de paz|ofrendas|22 000 bueyes|120 000 ovejas/i,
    cueId: 'fx:smoke-column',
    data: { position: [583, 356] } },

  // Columnas Jaquín y Boaz — pulso arquitectónico (efímero)
  { match: /columnas .{0,8}(Jaqu[ií]n|Boaz)|Jaqu[ií]n|Boaz|columna de bronce/i,
    cueId: 'fx:glow-pulse',
    data: { position: [583, 360] } },

  // Oro — brillo dorado
  { match: /cubri[oó] de oro|oro purísimo|tres kilos de oro|laminas de oro|dorado|chapado/i,
    cueId: 'fx:glow-pulse',
    data: { position: [583, 358] } },

  // Piedras sin ruido de herramienta
  { match: /sin ruido de hierro|ni martillos ni hachas|shamir|jinns .{0,8}construy/i,
    cueId: 'fx:glow-pulse',
    data: { position: [583, 360] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Planos del templo revelados
  { match: /planta tripartita|p[óo]rtico|hejal|debir|sesenta codos|medidas/i,
    cueId: 'fx:scroll-unfurl',
    data: { position: [583, 360] } },

  // Alianza con Hiram
  { match: /Hiram .{0,8}Tiro|alianza .{0,8}fenicia|tratado con Hiram/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // Construcción — polvo de canteras
  { match: /construcci[oó]n|canteros|labradas en la cantera|siete a[ñn]os|edificar la casa|mano de obra/i,
    cueId: 'fx:dust-burst',
    data: { position: [583, 363] } },

  // Monte Sión resplandece
  { match: /Si[oó]n|monte santo|monte del templo|Moriah|monte de Yahveh/i,
    cueId: 'fx:mountain-glow',
    data: { position: [583, 360] } },

  // Salomón ora en la dedicación
  { match: /Salom[oó]n|Sulaym[āa]n|oraci[oó]n de dedicaci[oó]n|ungid.{0,8}en Gih[oó]n/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Gloria de Yahveh llena la casa — kavod
  { match: /kavod|gloria .{0,8}(Yahveh|llen)|nube de la gloria|llen[oó] la casa|sacerdotes no pod[ií]an/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [583, 360] } },

  // Halo divino sobre el templo — kavod shekiná
  { match: /shekin[áa]|presencia de Yahveh|fu[eé] de cielo|presencia divina .{0,8}templo/i,
    cueId: 'fx:halo-divine',
    data: { position: [583, 357] } },

  // Jinns / sello de Salomón — tradición coránica
  { match: /jinns|sello de Sulaym[āa]n|mihrabs|controlados por el sello|demonios .{0,8}construy/i,
    cueId: 'fx:smoke-rise',
    data: { position: [585, 362] } },

  // ── Pasada 3: cinematográficos / cumbre ──────────────────────────────────

  // Momento de dedicación — destello radial
  { match: /es verdad que Dios morar[áa]|cielos de los cielos|atender[áa]s.{0,12}oraci[oó]n/i,
    cueId: 'fx:radial-bloom',
    data: { position: [583, 360] } },

  // Resplandor de la inauguración — flash divino
  { match: /fuego baj[oó] del cielo|fuego .{0,8}cay[oó]|gloria .{0,8}llen[oó]/i,
    cueId: 'fx:flash-white' },

  // El templo como símbolo permanente — zoom
  { match: /maravilla del mundo|gloria de Salomón|no hab[ií]a otro igual/i,
    cueId: 'fx:zoom-pulse' },
];

export default CUES;
