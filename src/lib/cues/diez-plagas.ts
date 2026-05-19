import type { Cue } from '../narrationCues';

/**
 * Cues for "Las diez plagas de Egipto".
 * Pins: moises(0), aaron(1), faraon-opresor(2).
 * CUMBRE — objetivo 30 cues.
 * Scene-objects declarados: 'nilo-sangre' (en diez-plagas).
 *
 * REGLA #1: 'nilo-sangre' ya es scene-object → NO disparamos fx:blood-stain
 * para el Nilo; animamos con fx:animate-scene-object {id:'nilo-sangre'}.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // Plaga 1: sangre — el Nilo ya tiene scene-object 'nilo-sangre'
  { match: /aguas.{0,15}sangre|Nilo.{0,15}sangre|r[íi]o.{0,15}sangre|primera plaga/i,
    cueId: 'fx:animate-scene-object', data: { id: 'nilo-sangre', kind: 'pulse' } },
  // refuerzo: sangre visible (tierra)
  { match: /peces muertos|r[íi]o.{0,10}hed[íi]a|hap[íi]/i,
    cueId: 'fx:blood-stain', data: { position: [516, 412] } },

  // Plaga 2: ranas — figurativa
  { match: /ranas|batracios|Heqet|cubren la tierra.{0,15}ranas/i,
    cueId: 'fx:plague-frogs', data: { position: [515, 408] } },
  { match: /ranas.{0,15}(entrar|lecho|palacios|amasar)|montones de ranas/i,
    cueId: 'fx:frog-rain', data: { position: [515, 406] } },

  // Plaga 3: piojos / mosquitos
  { match: /piojos|kinnim|mosquitos|polvo.{0,15}piojos|tercera plaga/i,
    cueId: 'fx:plague-locust', data: { position: [515, 410] } },
  { match: /mosquitos.{0,15}(hombres|bestias)|polvo.{0,10}se convirti/i,
    cueId: 'fx:dust-burst', data: { position: [514, 409] } },

  // Plaga 4: moscas / tábanos
  { match: /moscas|t[áa]banos|cuarta plaga|enjambre|erov|mezcla de fieras/i,
    cueId: 'fx:plague-locust', data: { position: [516, 412] } },
  { match: /separaci[óo]n.{0,15}G[oo]shen|tierra de Gosen|no.{0,10}moscas.{0,10}Gosen/i,
    cueId: 'fx:divine-light-beam', data: { position: [516, 408] } },

  // Plaga 5: peste en el ganado
  { match: /peste.{0,15}ganado|murieron.{0,10}ganado|quinta plaga|Apis|Hathor/i,
    cueId: 'fx:goat-herd', data: { position: [510, 415] } },
  { match: /ganado.{0,15}(muerto|muri)|murieron.{0,15}bueyes/i,
    cueId: 'fx:character-recede', data: { position: [510, 415] } },

  // Plaga 6: úlceras / sarna
  { match: /sarna|[úu]lceras|llagas|sexta plaga|Imhotep|tizn[ee].{0,10}hornos/i,
    cueId: 'fx:dust-burst', data: { position: [515, 405] } },
  { match: /horno|tizne|Aaron.{0,15}(tizne|arroja)|soot/i,
    cueId: 'fx:smoke-column', data: { position: [515, 408] } },

  // Plaga 7: granizo con fuego
  { match: /granizo|s[ée]ptima plaga|Nut|tormenta.{0,15}fuego/i,
    cueId: 'fx:hailstorm' },
  { match: /fuego.{0,15}granizo|relámpago.{0,15}granizo|granizo.{0,15}fuego/i,
    cueId: 'fx:lightning-storm' },
  { match: /trueno.{0,15}granizo|tembl[óo].{0,10}tierra.{0,10}granizo/i,
    cueId: 'fx:thunder-flash' },

  // Plaga 8: langostas — cumbre figurativa
  { match: /langostas|devoran.{0,10}cosech|octava plaga|Min|arbi/i,
    cueId: 'fx:plague-locust' },
  { match: /nube de langostas|cubrieron.{0,15}tierra|no se pudo ver la tierra/i,
    cueId: 'fx:locust-cloud' },
  { match: /viento.{0,15}(ocidental|este).{0,15}langostas|viento.{0,15}llevó/i,
    cueId: 'fx:wind-streaks' },

  // Plaga 9: tinieblas — figurativa
  { match: /tinieblas|oscuridad|tres d[íi]as.{0,15}oscur|novena plaga|Re.{0,10}eclipsa/i,
    cueId: 'fx:plague-darkness' },
  { match: /sol.{0,15}cubierto|no se ve[íi]an|nadie.{0,10}movi[óo]/i,
    cueId: 'fx:eclipse-darken' },
  { match: /luz.{0,15}habitaciones|luz para Israel|Gosen.{0,15}(luz|iluminado)/i,
    cueId: 'fx:divine-light-beam', data: { position: [516, 409] } },

  // Plaga 10: primogénitos — la noche definitiva
  { match: /primog[ée]nitos|d[ée]cima plaga|muerte.{0,15}primog|destructor|ha-mashjit/i,
    cueId: 'fx:night-fall' },
  { match: /llanto.{0,15}Egipto|clamor grande|no hab[íi]a.{0,10}casa/i,
    cueId: 'fx:fade-to-black' },

  // ── Pasada 2 — narrativa ─────────────────────────────────────────────────

  // Moisés emerge, confronta
  { match: /Mois[ée]s.{0,15}vara extendida|extendi[óo] la vara|extiende su vara/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  { match: /Mois[ée]s.{0,15}(sube|ve) ante Fara[óo]n|se present[óo]|fue a Fara[óo]n/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Faraón — endurecimiento y colapso
  { match: /endureci[óo].{0,15}coraz[óo]n|cede.{0,10}retracta|negocia.{0,10}rechaza/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  { match: /coraz[óo]n.{0,15}Fara[óo]n.{0,15}duro|volvió a endurecer/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },
  { match: /Fara[óo]n.{0,15}(llam[óo]|convoc|llam[óa]).{0,10}(Mois[ée]s|Aar[óo]n)|llam[óo].{0,15}noche/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // ── Pasada 3 — diálogos / cinematográficos ───────────────────────────────
  { match: /en esto conocer[áa]s|pour que su[ee]pas|por esto.{0,10}envío/i,
    cueId: 'fx:divine-light-beam', data: { position: [515, 410] } },
  { match: /vignette.{0,5}cumbre|coronaci[óo]n de Mois[ée]s/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
  // Cinematográfico cumbre: la noche de los primogénitos
  { match: /llanto.{0,15}Egipto|clamor.{0,10}grande.{0,15}Egipto/i,
    cueId: 'fx:vignette-pulse' },
  { match: /medianoche.{0,15}Yahveh|a medianoche|en la mitad de la noche/i,
    cueId: 'fx:flash-white' },
];

export default CUES;
