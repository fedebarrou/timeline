import type { Cue } from '../narrationCues';

/**
 * Cues for "Cruce del Mar Rojo".
 * Pins: moises(0), faraon-opresor(1), miriam(2).
 * CUMBRE — objetivo 30 cues.
 * Scene-objects declarados: 'aguas-partidas'
 *
 * REGLA #1: 'aguas-partidas' ya es scene-object → NO disparamos fx:parted-waters
 * directamente; animamos con fx:animate-scene-object {id:'aguas-partidas'}.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // El ejército de Faraón — carros de guerra
  { match: /Fara[óo]n.{0,15}persigui[óo]|seiscientos carros|carros escogidos|persecuci[óo]n/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  { match: /carros.{0,15}(Egipto|Fara[óo]n)|caballos.{0,15}Fara[óo]n|jinetes/i,
    cueId: 'fx:horse-gallop', data: { position: [525, 415] } },
  { match: /polvo.{0,10}ejército|polvareda.{0,10}carros|la tierra tembl[óo]/i,
    cueId: 'fx:dust-pillar', data: { position: [520, 415] } },

  // El pueblo Israel aterrorizado
  { match: /Israel.{0,15}(temor|llor|clam[óo])|israelitas.{0,15}miedo|exclamaron/i,
    cueId: 'fx:voz-multitud', data: { position: [525, 420] } },
  { match: /¿no hab[íi]a sepulcros|tumbas.{0,10}Egipto|nos sacast.{0,10}morir/i,
    cueId: 'fx:glow-pulse', data: { position: [528, 418] } },

  // Vara / mano de Moisés
  { match: /extendi[óo].{0,15}(mano|vara).{0,15}mar|golpea el mar|cetro.{0,10}mar/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  { match: /vara.{0,10}(extiende|extendida)|mano.{0,10}extendi/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // Columna de fuego y de nube
  { match: /columna de nube.{0,15}(se mov|detr[áa]s|entre)|nube.{0,15}(entre|detr[áa]s)/i,
    cueId: 'fx:cloud-pillar', data: { position: [526, 412] } },
  { match: /columna de fuego|nube.{0,15}oscureci[óo]|luz.{0,15}Israel|iluminó.{0,15}noche/i,
    cueId: 'fx:pillar-of-fire', data: { position: [526, 410] } },
  { match: /ángel de Dios.{0,15}(march|se mov|detr[áa]s)|Ángel.{0,15}movió/i,
    cueId: 'fx:angel-descent', data: { position: [526, 410] } },

  // Viento — ruaj qadim
  { match: /viento.{0,15}(este|oriental|fuerte|toda.{0,5}noche)|ruaj qadim/i,
    cueId: 'fx:wind-streaks' },

  // Las aguas se parten — scene-object animado (REGLA #1)
  { match: /aguas.{0,15}(abren|dividi|retira)|mar.{0,15}(abri[óo]|parti[óo]|seco)/i,
    cueId: 'fx:animate-scene-object', data: { id: 'aguas-partidas', kind: 'rise' } },
  { match: /Yam Suph|muros.{0,15}aguas|monta[ñn]as.{0,15}aguas|tierra seca/i,
    cueId: 'fx:animate-scene-object', data: { id: 'aguas-partidas', kind: 'pulse', duration: 2.0 } },
  { match: /a pie seco|tierra seca en el fondo|como el desierto/i,
    cueId: 'fx:journey-trace', data: { from: [525, 415], to: [560, 423] } },

  // El ejército egipcio entra al mar
  { match: /egipcios.{0,15}(persegu|entraron|segu[íi]an).{0,15}mar|entraron.{0,15}medio/i,
    cueId: 'fx:horse-gallop', data: { position: [535, 420] } },
  { match: /ruedas.{0,15}carros|trabó.{0,15}ruedas|atascados|Yahveh.{0,15}mi[óo]|Yahveh.{0,15}desconcertó/i,
    cueId: 'fx:earthquake-shake', data: { position: [540, 420] } },

  // Las aguas se cierran
  { match: /aguas.{0,15}cerraron|cubrieron los carros|ej[ée]rcito.{0,15}ahog/i,
    cueId: 'fx:earthquake-major' },
  { match: /olas.{0,15}cubrieron|mar.{0,15}volvi[óo]|cubrieron.{0,15}carros.{0,15}jinetes/i,
    cueId: 'fx:water-wave', data: { position: [545, 420] } },
  { match: /Fira.?wn.{0,20}(ahog|declar[óo] fe)|ahogamos a los otros|cuerpo.{0,15}signo/i,
    cueId: 'fx:character-recede', data: { pinIdx: 1 } },

  // ── Pasada 2 — narrativa ─────────────────────────────────────────────────

  // Miriam y el cántico de victoria
  { match: /c[áa]ntico del Mar|pandero|Miriam.{0,15}(cantó|tom[óo])|mujeres.{0,15}cantando/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  { match: /cantad a Yahveh|cantaré a Yahveh|mi fortaleza y mi canto/i,
    cueId: 'fx:trumpet-blast', data: { position: [560, 420] } },
  { match: /hombre de guerra|Yahveh es su nombre|glori[óo]samente/i,
    cueId: 'fx:divine-light-beam', data: { position: [560, 420] } },

  // ── Pasada 3 — cinematográficos de cumbre ───────────────────────────────
  { match: /Mois[ée]s extiende|extendi[óo] la mano.{0,15}noche/i,
    cueId: 'fx:flash-white' },
  { match: /Yahveh.{0,15}(salvación|salv[óo])|mano poderosa de Yahveh|temieron a Yahveh/i,
    cueId: 'fx:radial-bloom', data: { position: [543, 420] } },
  { match: /Israel.{0,15}vio.{0,15}Egipcios.{0,15}muertos|vio.{0,15}gran hecho/i,
    cueId: 'fx:vignette-pulse' },
  { match: /ni uno.{0,5}qued[óo]|no qued[óo] uno|ninguno.{0,5}escap/i,
    cueId: 'fx:shockwave', data: { position: [545, 420] } },
];

export default CUES;
