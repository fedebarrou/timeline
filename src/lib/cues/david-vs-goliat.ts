import type { Cue } from '../narrationCues';

/**
 * Cues for "David contra Goliat" — EVENTO CUMBRE (≥20 cues).
 * Pins: david(0), goliat(1), saul(2).
 * Scene-objects: honda-david, armadura-goliat, lanza-goliat.
 *
 * REGLA #1: 'honda-david' → animate-scene-object (no fx:sword-strike para la honda).
 * REGLA #1: 'armadura-goliat' → animate-scene-object.
 * REGLA #1: 'lanza-goliat' → animate-scene-object (no fx:sword-strike paralelo).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ────────────────────────────────────────────────

  // Honda de David — animate scene-object (REGLA #1: no fx:sword-strike)
  { match: /\bhonda\b|piedras lisas|cinco piedras|zur[rÓó]n|del arroyo/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'honda-david', kind: 'sway', duration: 1.2 } },

  // Lanza de Goliat — animate scene-object (REGLA #1: no fx:sword-strike)
  { match: /\blanza\b|varal .{0,8}tejedor|seiscientos siclos de hierro|asta de su lanza/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'lanza-goliat', kind: 'sway', duration: 1.0 } },

  // Armadura de Goliat — animate scene-object (REGLA #1)
  { match: /armadura|cota de mallas|coraza|escudo|escudero .{0,10}Goliat|casco de bronce/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'armadura-goliat', kind: 'pulse', duration: 0.8 } },

  // Espada de Goliat — efectúa solo al ser tomada por David (efímero)
  { match: /espada de Goliat|tom[oó].{0,10}espada|cort[oó] la cabeza|sin espada/i,
    cueId: 'fx:sword-strike',
    data: { from: [575, 360], to: [582, 365] } },

  // El duelo — David se lanza, Goliat cae (motion-meaning sobre los pins)
  { match: /se acerc[oó].{0,15}filisteo|David corri[oó]|enfrent[oó].{0,10}Goliat|encuentro de los dos/i,
    cueId: 'fx:char-clash', data: { fromPinIdx: 0, toPinIdx: 1, loserPinIdx: 1 } },

  // Sangre y cuerpos — efímero
  { match: /sangre|cuerpos de los filisteos|aves del cielo/i,
    cueId: 'fx:blood-stain',
    data: { position: [578, 365] } },

  // Viento en el valle — atmosférico
  { match: /valle de Ela|Oco|viento .{0,12}valle|arroyo\b/i,
    cueId: 'fx:wind-streaks' },

  // Ejércitos filisteos — caballos y carros
  { match: /ej[eé]rcito filisteo|batalla|linea de combate|escuadr[oó]n|filisteos se alinea/i,
    cueId: 'fx:horse-gallop',
    data: { position: [578, 365] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────────

  // Goliat emerge gigante
  { match: /Goliat|J[āa]l[uū]t|gigante filisteo|campe[oó]n filisteo|seis codos|cuatro codos/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // David, joven pastor
  { match: /David .{0,20}(pastor|joven|menor|adolescente)|hijo menor de Isa[ií]|D[āa]w[uū]d/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Saúl ofrece su armadura — pulso de la corte real
  { match: /Sa[uú]l .{0,20}armadura|armadura .{0,12}real|no estaba probado/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 2 } },

  // Trueno de guerra — Goliat ruge
  { match: /desafi[oó]|maldiciendo .{0,8}dioses|am[áa]s el desafio|desaf[ií]a a Israel/i,
    cueId: 'fx:thunder-flash' },

  // En el nombre de Yahveh — destello divino sobre David
  { match: /en el nombre de Yahveh|Yahveh de los ej[eé]rcitos|Dios de los escuadrones/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // David se acerca — vignette de tensión
  { match: /David .{0,16}(corr[ií]|avanz|se acercaba|fue al encuentro)/i,
    cueId: 'fx:vignette-pulse' },

  // Choque — la honda suena
  { match: /hundi[oó] la piedra|acert[oó] en la frente|cay[oó] de bruces|frente .{0,10}piedra/i,
    cueId: 'fx:sword-clash',
    data: { from: [575, 360], to: [582, 365] } },

  // Flash del impacto
  { match: /piedra .{0,12}frente|le acert[oó]|frente .{0,10}le hundi[oó]/i,
    cueId: 'fx:flash-white' },

  // Goliat cae — retrocede y baja
  { match: /cay[oó] .{0,8}Goliat|cay[oó] de bruces|rostro en tierra/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 1 } },

  // Trueno al caer el gigante
  { match: /cay[oó] de bruces|cuerpo .{0,8}tierra|Goliat .{0,8}muerto/i,
    cueId: 'fx:thunder-flash' },

  // Fuga de los filisteos
  { match: /filisteos huyeron|los israelitas persiguieron|desbandada|persecuci[oó]n/i,
    cueId: 'fx:silhouette-horizon' },

  // David crece — triunfo
  { match: /David .{0,16}(triunf|venci|celebr|victorios)|el m[áa]s grande/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // ── Pasada 3: cinematográficos / cumbre ──────────────────────────────────

  // Zoom sobre el momento decisivo
  { match: /hundi[oó] la piedra|en el nombre de Yahveh .{0,20}acert/i,
    cueId: 'fx:zoom-pulse' },

  // Halo de victoria de David
  { match: /venci[oó] al filisteo|y as[ií] lo mat[oó]|vencer al gigante/i,
    cueId: 'fx:radial-bloom',
    data: { pinIdx: 0 } },
];

export default CUES;
