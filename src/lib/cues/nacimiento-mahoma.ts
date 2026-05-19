import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Mahoma".
 * Pins: mahoma(0), abdullah-padre(1), amina-madre(2), abdulmuttalib(3). Escenario: La Meca [625, 460].
 *
 * CUMBRE: star-bethlehem, tradition-badge islámica, halo-divine sobre el recién nacido.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Estrella anunciante del nacimiento — significado islámico
  { match: /estrella.{0,20}(anunci|apare|brillo)|A[ñn]o del Elefante|luz celestial.{0,15}naci/i,
    cueId: 'fx:star-bethlehem', data: { position: [625, 450] } },

  // Kaaba — el abuelo lleva al niño
  { match: /Kaaba|santuario.{0,20}(nomb|llev)|custodio de la Kaaba|recibe al ni[ñn]o/i,
    cueId: 'fx:animate-scene-object', data: { id: 'kaaba', kind: 'pulse' } },

  // Camello / caravana — Abdullah murió en viaje comercial
  { match: /viaje comercial a Yathrib|regresaba.{0,20}(Yathrib|Medina)|caravana.{0,20}padre/i,
    cueId: 'fx:camel-train', data: { position: [625, 445] } },

  // Noche del nacimiento — luna creciente y estrellas
  { match: /noci[oó]n de noche|noci[oó]n de d[ií]a|noche.{0,15}nac|en la noche/i,
    cueId: 'fx:starfield-shimmer' },

  // Elefante de Abraha — polvo de batalla
  { match: /elefante de guerra|Abraha|expedici[oó]n abisinia|Sura Al-F[īi]l|Sura 105|[ʿ']?[āa]m al-f[ií]l/i,
    cueId: 'fx:dust-burst', data: { position: [625, 460] } },

  // Ovejas del desierto (Arabia del siglo VI)
  { match: /ovejas|rebaño|ganado|pastores beduinos|camella/i,
    cueId: 'fx:goat-herd', data: { position: [625, 462] } },

  // Nombre "Muhammad" = el muy alabado — halo
  { match: /Mu[ḥh]ammad significa|muy alabado|nombre que le dio|nombra.{0,15}Mu[ḥh]ammad/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Señales celestiales en el relato islámico — amanecer
  { match: /se[ñn]ales celestiales|sue[ñn]os.{0,15}anunciador|voces.{0,15}anunc|signos|al-amparo/i,
    cueId: 'fx:dawn-break' },

  // Lunes 12 de Rabīʿ — día de la semana sagrado
  { match: /lunes 12 de Rab[īi][ʿ']?|lunes.{0,10}naci|doce de Rab/i,
    cueId: 'fx:glow-pulse', data: { position: [625, 460] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // Mahoma nace — emerge el protagonista
  { match: /nace|nacimiento|reci[eé]n nacido|ni[ñn]o|huérfano antes de nacer/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Āmina la madre
  { match: /[ĀaA]mina|joven viuda|madre|Ban[ūu] Zuhra/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // ʿAbd Allāh — padre fallecido antes del parto (recede = muerto)
  { match: /[ʿ']?Abd All[āa]h|padre.{0,20}(muerto|fallec|hab[íi]a muerto)/i,
    cueId: 'fx:character-recede', data: { pinIdx: 1 } },

  // ʿAbd al-Muṭṭalib recibe al niño
  { match: /[ʿ']?Abd al-Mu[ṭt][ṭt]alib|abuelo paterno|jefe del clan|recibe al ni[ñn]o/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 3 } },

  // Insignia islámica — tradition-badge
  { match: /Ban[ūu] H[āa]shim|Hāshim[ī]|clan hāshimī|linaje profético/i,
    cueId: 'fx:tradition-badge', data: { tradition: 'islam' } },

  // ── Pasada 3: cinematográficos ───────────────────────────────────────

  // Nacimiento como punto de quiebre — fade-from-black (del vientre al mundo)
  { match: /primer llanto|primer gr[íi]to|sale al mundo|naci[óo].{0,10}prot/i,
    cueId: 'fx:fade-from-black' },

  // Radial bloom — la luz del Profeta al mundo islámico
  { match: /el Sello de los Profetas|Kh[āa]tam an-Nabiyy[īi]n|luz profética|la humani/i,
    cueId: 'fx:radial-bloom', data: { position: [625, 460] } },
];

export default CUES;
