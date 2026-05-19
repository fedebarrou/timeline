/**
 * Noun → FX dictionary.
 *
 * Single source of truth that every era agent uses when writing
 * cues/{event}.ts. For each Spanish noun that appears in the narration,
 * we map it to a primitive cueId. Some nouns have era-specific overrides
 * because the iconography differs sharply (e.g. paloma → dove-spirit
 * during the baptism vs. dove-flight in the Flood).
 *
 * IMPORTANT: this dictionary is the DEFAULT. Per the four hard rules
 * (see STYLE_GUIDE_ANIMACIONES.md):
 *  - REGLA #1: if an event has a scene-object with id 'X', the cue must
 *    NOT dispatch the parallel primitive; it must dispatch
 *    `fx:animate-scene-object` with id='X' and an appropriate `kind`.
 *  - The verify-no-duplicate-fx.ts script enforces this at build time.
 *
 * Coverage target: 110-130 entries, organised by the six categories
 * documented in the spec Section 3.D plus Temporales + Cinematográficos.
 */

import type { EraId } from './_eraIds';

export type NounEntry = {
  /** Regex that detects the noun in narration text (case insensitive). */
  match: RegExp;
  /** Default cueId for this noun. */
  default: string;
  /** Optional extra data merged into the dispatched cue. */
  data?: Record<string, unknown>;
  /** Optional era-specific overrides (only the era key replaces default). */
  era?: Partial<Record<EraId, string>>;
};

const NOUN_DICTIONARY: NounEntry[] = [
  // ── ANIMALES ────────────────────────────────────────────────────────
  { match: /\bserpiente|serpientes?\b|culebra|v[íi]bora/i, default: 'fx:serpent' },
  { match: /\bcordero|corderos?\b/i, default: 'fx:ram' },
  { match: /\boveja[s]?\b|reba[ñn]o|ovino/i, default: 'fx:goat-herd' },
  { match: /\bcabras?\b|cabrito/i, default: 'fx:goat-herd' },
  { match: /\bvaca[s]?\b|toro[s]?\b/i, default: 'fx:golden-calf' },
  { match: /\bbecerro|ternero|novillo/i, default: 'fx:golden-calf' },
  { match: /\ble[óo]n|leones|leonas?\b/i, default: 'fx:lion-roar' },
  { match: /\bleopardo|leopardos?\b/i, default: 'fx:wolf-prowl' },
  { match: /\blobo|lobos?\b/i, default: 'fx:wolf-prowl' },
  { match: /\bperro|perros?\b/i, default: 'fx:wolf-prowl' },
  { match: /\bburro|burros?\b|asno|asna|asnos?\b/i, default: 'fx:donkey-walk' },
  { match: /\bmula|mulas?\b/i, default: 'fx:donkey-walk' },
  { match: /\bcamello|camellos?\b|dromedario/i, default: 'fx:camel-train' },
  { match: /\bcaballo|caballos?\b|corcel|yegua/i, default: 'fx:horse-gallop' },
  {
    match: /\bpaloma|palomas?\b/i,
    default: 'fx:dove-flight',
    era: { evangelio: 'fx:dove-flight' /* sub-cue at baptism reuses with halo color */ },
  },
  { match: /\bcuervo|cuervos?\b/i, default: 'fx:raven-flight' },
  { match: /\b[áa]guila|[áa]guilas?\b/i, default: 'fx:eagle-soar' },
  { match: /\bhalc[óo]n|halcones?\b/i, default: 'fx:eagle-soar' },
  { match: /\bgallo|gallos?\b/i, default: 'fx:eagle-soar' },
  { match: /\bcodorniz|codornices/i, default: 'fx:fish-school' },
  { match: /\bpez|peces|pescado/i, default: 'fx:fish-school' },
  { match: /\bballena|balenas|gran pez/i, default: 'fx:whale-breach' },
  { match: /\blangosta|langostas/i, default: 'fx:plague-locust' },
  { match: /\brana|ranas/i, default: 'fx:plague-frogs' },
  { match: /\bmosca|moscas/i, default: 'fx:plague-locust' },
  { match: /\bpiojo|piojos/i, default: 'fx:plague-locust' },
  { match: /\bmosquito|mosquitos/i, default: 'fx:plague-locust' },
  { match: /\bescorpi[óo]n|escorpiones/i, default: 'fx:scorpion-skitter' },
  { match: /\bcarnero|carneros?\b/i, default: 'fx:ram' },
  { match: /\bciervo|ciervos|gacela/i, default: 'fx:goat-herd' },

  // ── OBJETOS BÍBLICOS ────────────────────────────────────────────────
  { match: /\bespada|espadas?\b|cuchillo/i, default: 'fx:sword-strike' },
  { match: /\bescudo|escudos?\b/i, default: 'fx:glow-pulse' },
  { match: /\blanza|lanzas?\b|jabalina/i, default: 'fx:sword-strike' },
  { match: /\barco|arcos?\b/i, default: 'fx:glow-pulse' },
  { match: /\bflecha|flechas?\b/i, default: 'fx:sword-strike' },
  { match: /\bhonda|hondas?\b|piedra de la honda/i, default: 'fx:sword-strike' },
  { match: /\bvara|báculo|cayado/i, default: 'fx:glow-pulse' },
  { match: /\bcetro|cetros?\b/i, default: 'fx:throne' },
  { match: /\bcorona|coronas?\b/i, default: 'fx:crown-descent' },
  { match: /\btrono|tronos?\b/i, default: 'fx:throne' },
  { match: /\bmanto|manto sagrado/i, default: 'fx:glow-pulse' },
  { match: /\bt[úu]nica|t[úu]nicas/i, default: 'fx:glow-pulse' },
  { match: /\bsandalia|sandalias/i, default: 'fx:glow-pulse' },
  { match: /\bcopa|c[áa]liz|c[áa]lices/i, default: 'fx:chalice' },
  { match: /\bpan|panes\b|hogaza/i, default: 'fx:bread-multiply' },
  { match: /\buva|uvas|vino|vid|vi[ñn]a/i, default: 'fx:chalice' },
  { match: /\bolivo|olivos|aceite/i, default: 'fx:glow-pulse' },
  { match: /\bhigo|higuera/i, default: 'fx:glow-pulse' },
  { match: /\bgranada|granadas\b/i, default: 'fx:glow-pulse' },
  { match: /\bmiel\b/i, default: 'fx:glow-pulse' },
  { match: /\bmirra\b/i, default: 'fx:incense-spiral' },
  { match: /\bincienso\b/i, default: 'fx:incense-spiral' },
  { match: /\bjarra|jarras|c[áa]ntaro|c[áa]ntaros/i, default: 'fx:glow-pulse' },
  { match: /\bcanasta|canastas|cesto|cestos|cesta/i, default: 'fx:glow-pulse' },
  { match: /\burna|urnas/i, default: 'fx:glow-pulse' },
  { match: /\btabletas?\b|tablas? de piedra|tablas? de la ley/i, default: 'fx:stone-tablets' },
  { match: /\brollo|pergamino|pergaminos/i, default: 'fx:scroll-unfurl' },
  { match: /\bcandelabro|menor[áa]/i, default: 'fx:lamp-glow' },
  { match: /\barpa|arpas/i, default: 'fx:trumpet-blast' },
  { match: /\btrompeta|trompetas|shofar|cuerno/i, default: 'fx:trumpet-blast' },
  { match: /\bc[íi]mbalo|címbalos/i, default: 'fx:trumpet-blast' },
  { match: /\banillo|anillos/i, default: 'fx:glow-pulse' },
  { match: /\bsello|sellos/i, default: 'fx:glow-pulse' },
  { match: /\bescala|escalera de Jacob/i, default: 'fx:ladder' },
  { match: /\bvelo|velos/i, default: 'fx:glow-pulse' },
  { match: /\bcilicio|cilicios?\b/i, default: 'fx:glow-pulse' },
  { match: /\bceniza|cenizas\b/i, default: 'fx:dust-burst' },
  { match: /\bllave|llaves\b/i, default: 'fx:glow-pulse' },
  { match: /\bl[áa]mpara|l[áa]mparas/i, default: 'fx:lamp-glow' },

  // ── LUGARES / CONSTRUCCIONES (suelen ser scene-object) ──────────────
  { match: /\btienda|tiendas\b|carpa\b/i, default: 'fx:glow-pulse' },
  { match: /\bpozo|pozos\b/i, default: 'fx:well' },
  { match: /\baltar|altares\b/i, default: 'fx:fire-flicker' },
  { match: /\bcolumna|columnas\b/i, default: 'fx:glow-pulse' },
  { match: /\btemplo|templos\b/i, default: 'fx:glow-pulse' },
  { match: /\bsinagoga\b/i, default: 'fx:glow-pulse' },
  { match: /\bpalacio|palacios\b/i, default: 'fx:throne' },
  { match: /\btorre|torres\b/i, default: 'fx:tower-babel' },
  { match: /\barca de No[ée]|arca\b/i, default: 'fx:ark-boat' },
  { match: /\barca de la Alianza|arca del Pacto|arca de la Ley/i, default: 'fx:glow-pulse' },
  { match: /\btabern[áa]culo/i, default: 'fx:glow-pulse' },
  { match: /\bmonta[ñn]a|montes? de\b|monte\b/i, default: 'fx:mountain-glow' },
  { match: /\br[íi]o|r[íi]os\b/i, default: 'fx:water-wave' },
  { match: /\bmar\b|oc[ée]ano|mar Rojo|mar Muerto/i, default: 'fx:water-wave' },
  { match: /\boasis\b/i, default: 'fx:well' },
  { match: /\bciudad amurallada|murallas?\b/i, default: 'fx:walls-fall' },
  { match: /\bpalmera|palmeras\b/i, default: 'fx:glow-pulse' },
  { match: /\bcedro|cedros\b/i, default: 'fx:glow-pulse' },
  { match: /\bzarza|zarza ardiente/i, default: 'fx:burning-bush' },

  // ── NATURALES / METEOROLÓGICOS ──────────────────────────────────────
  { match: /\blluvia|llovi[óo]|llovi[óo]/i, default: 'fx:rain' },
  { match: /\bgranizo\b/i, default: 'fx:hailstorm' },
  { match: /\bnieve\b|nev[óo]/i, default: 'fx:hailstorm' },
  { match: /\bniebla\b/i, default: 'fx:fog-roll' },
  { match: /\beclipse\b/i, default: 'fx:eclipse-darken' },
  { match: /\bluna\b/i, default: 'fx:moon-bloodred' },
  { match: /\bsol\b/i, default: 'fx:dawn-break' },
  { match: /\bestrella|estrellas\b/i, default: 'fx:starfield-shimmer' },
  { match: /\bestrella fugaz|cometa|cometas\b/i, default: 'fx:meteor-strike' },
  { match: /\bmeteoro|meteoros\b/i, default: 'fx:meteor-strike' },
  { match: /\brayo|rayos\b|relámpago/i, default: 'fx:lightning-strike' },
  { match: /\btrueno|truenos\b/i, default: 'fx:thunder-flash' },
  { match: /\bterremoto|sismo|temblor/i, default: 'fx:earthquake-major' },
  { match: /\bviento\b|brisa fuerte/i, default: 'fx:wind-streaks' },
  { match: /\btormenta de arena|tornado de arena|simún/i, default: 'fx:sandstorm-major' },
  { match: /\bfuego\b|llamas\b/i, default: 'fx:fire-flicker' },
  { match: /\bhumo\b/i, default: 'fx:smoke-rise' },
  { match: /\bagua\b|aguas\b/i, default: 'fx:water-wave' },
  { match: /\bola[s]?\b|marejada/i, default: 'fx:water-wave' },
  { match: /\bsangre\b/i, default: 'fx:blood-stain' },
  { match: /\bmarea roja|aguas se volvieron sangre/i, default: 'fx:blood-stain' },
  { match: /\boscuridad total|tinieblas\b/i, default: 'fx:plague-darkness' },
  { match: /\barco[\- ]?iris|arcoiris\b/i, default: 'fx:glow-pulse' },

  // ── DIVINOS ─────────────────────────────────────────────────────────
  { match: /\b[áa]ngel(?:es)?\b/i, default: 'fx:angel-descent' },
  { match: /\bquerub[íi]n|querubines/i, default: 'fx:angel-formation' },
  { match: /\bserafines?\b/i, default: 'fx:angel-formation' },
  { match: /\bhalo\b|aureola/i, default: 'fx:halo-divine' },
  { match: /\bgloria|Shekin[áa]|shekin[áa]/i, default: 'fx:divine-light-beam' },
  { match: /\bmano divina|mano de Dios|mano del Se[ñn]or/i, default: 'fx:divine-hand' },
  { match: /\bvoz del cielo|voz del Se[ñn]or|voz de Dios/i, default: 'fx:divine-light-beam' },
  { match: /\bcolumna de fuego/i, default: 'fx:pillar-of-fire' },
  { match: /\bcolumna de nube/i, default: 'fx:cloud-pillar' },

  // ── TEMPORALES (atmosféricos C.2) ───────────────────────────────────
  { match: /\bamaneci[oó]\b|al alba|al amanecer\b/i, default: 'fx:dawn-break' },
  { match: /\banocheci[oó]\b|al anochecer|cay[oó] la noche/i, default: 'fx:dusk-fall' },
  { match: /\bnoche\b/i, default: 'fx:night-fall' },
  { match: /\bcrepúsculo\b/i, default: 'fx:dusk-fall' },
  { match: /\btres d[íi]as\b/i, default: 'fx:fade-from-black' },
  { match: /\bcuarenta d[íi]as\b|40 d[íi]as/i, default: 'fx:rain-sheet' },
  { match: /\bcuarenta noches\b|40 noches/i, default: 'fx:night-fall' },
  { match: /\bs[ée]ptimo d[íi]a\b/i, default: 'fx:dawn-break' },
  { match: /\bs[áa]bado\b|Shabat\b/i, default: 'fx:dawn-break' },

  // ── CINEMATOGRÁFICOS (solo en cumbres) ──────────────────────────────
  { match: /\bexpir[óo]\b|entreg[óo] el esp[íi]ritu/i, default: 'fx:fade-to-black' },
  { match: /\bmuri[óo]\b/i, default: 'fx:fade-to-black' },
  { match: /\bresucit[óo]\b/i, default: 'fx:resurrection-light' },
  { match: /\bascendi[óo] al cielo\b|fue elevado al cielo/i, default: 'fx:divine-light-beam' },
  { match: /\bdescendi[óo] del cielo\b/i, default: 'fx:divine-light-beam' },
  { match: /\bse revel[óo]\b/i, default: 'fx:radial-bloom' },
  { match: /\bfue arrebatado\b/i, default: 'fx:divine-light-beam' },
  { match: /\bse transfigur[óo]\b|transfiguraci[óo]n/i, default: 'fx:radial-bloom' },
];

export default NOUN_DICTIONARY;
