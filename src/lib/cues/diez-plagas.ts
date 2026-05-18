import type { Cue } from '../narrationCues';

/**
 * Cues for "Las diez plagas de Egipto".
 * Pins: moises(0), aaron(1), faraon-opresor(2).
 * One cue per plague (10) plus framing cues.
 */
const CUES: Cue[] = [
  // 1. Sangre en el Nilo
  { match: /aguas.{0,15}sangre|Nilo.{0,15}sangre|r[íi]o.{0,15}sangre|primera plaga|Hapi/i, cueId: 'fx:blood-stain', data: { position: [515, 410] } },
  // 2. Ranas
  { match: /ranas|batracios|Heqet|cubren la tierra.{0,15}ranas/i, cueId: 'fx:plague-swarm', data: { position: [515, 408], type: 'frogs' } },
  // 3. Piojos / mosquitos
  { match: /piojos|mosquitos|polvo.{0,15}piojos|tercera plaga/i, cueId: 'fx:plague-swarm', data: { position: [515, 410], type: 'lice' } },
  // 4. Moscas / tábanos
  { match: /moscas|t[áa]banos|cuarta plaga|enjambre/i, cueId: 'fx:plague-swarm', data: { position: [515, 412], type: 'flies' } },
  // 5. Peste sobre el ganado
  { match: /peste.{0,15}ganado|murieron.{0,10}ganado|quinta plaga|Apis|Hathor/i, cueId: 'fx:character-recede', data: { position: [510, 415] } },
  // 6. Sarna / úlceras
  { match: /sarna|[úu]lceras|llagas|sexta plaga|Imhotep/i, cueId: 'fx:dust-burst', data: { position: [515, 405] } },
  // 7. Granizo con fuego
  { match: /granizo|tormenta.{0,15}fuego|s[ée]ptima plaga|Nut/i, cueId: 'fx:lightning-strike', data: { from: [515, 350], to: [515, 405] } },
  // 8. Langostas
  { match: /langostas|devoran.{0,10}cosech|octava plaga|Min/i, cueId: 'fx:plague-swarm', data: { position: [515, 408], type: 'locusts' } },
  // 9. Tinieblas
  { match: /tinieblas|oscuridad|tres d[íi]as.{0,15}oscur|novena plaga|Re.{0,10}eclipsa|sol.{0,15}cubierto/i, cueId: 'fx:smoke-rise', data: { position: [515, 405] } },
  // 10. Muerte de los primogénitos
  { match: /primog[ée]nitos|d[ée]cima plaga|muerte.{0,15}primog|destructor|ha-mashjit/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Moisés ejecuta los signos
  { match: /Mois[ée]s.{0,15}vara extendida|extendi[óo] la vara|extiende su vara/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Faraón endurece su corazón una y otra vez
  { match: /endureci[óo].{0,15}coraz[óo]n|cede.{0,10}retracta|negocia.{0,10}rechaza/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
];

export default CUES;
