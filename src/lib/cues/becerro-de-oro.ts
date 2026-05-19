import type { Cue } from '../narrationCues';

/**
 * Cues for "El becerro de oro".
 * Pins: moises(0), aaron(1), samiri(2).
 * CUMBRE — objetivo 20-30 cues.
 * Scene-objects declarados: 'becerro'
 *
 * REGLA #1: 'becerro' ya es scene-object → NO disparamos fx:golden-calf;
 * animamos con fx:animate-scene-object {id:'becerro'}.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // Pueblo se reúne ante Aarón — impaciencia
  { match: /Mois[ée]s tarda|tardaba en descender|haznos dioses|levántate.{0,10}haznos/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Samirí / el instigador
  { match: /al-Samir[íi]|Samir[íi]|quien tom[óo] el oro|molde[óo]|tir[óo] el polvo/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Pendientes de oro / fundir
  { match: /pendientes de oro|fundieron|fundi[óo]|oro.{0,15}fuego|reuni[óo] el oro|aretes/i,
    cueId: 'fx:dust-burst', data: { position: [550, 428] } },

  // El becerro fabricado (ídolo aparece) — anima scene-object (REGLA #1)
  { match: /becerro|egel|estos son tus dioses|mug[íi]a/i,
    cueId: 'fx:animate-scene-object', data: { id: 'becerro', kind: 'sway', duration: 1.8 } },

  // Altar ante el ídolo
  { match: /altar.{0,15}becerro|hizo un altar|altar delante del becerro|erigieron altar/i,
    cueId: 'fx:fire-flicker', data: { position: [550, 428] } },

  // Fiesta y danza — orgía
  { match: /fiesta|sacrificio|danza|regocij|sentaron a comer.{0,10}beber/i,
    cueId: 'fx:fire-flicker', data: { position: [551, 429] } },

  // Música idolátrica — trompeta y cántico
  { match: /canto|sonido.{0,15}fiesta|m[úu]sica.{0,15}(idolatría|danza)|v[óo]z.{0,15}canto.{0,15}pueblo/i,
    cueId: 'fx:trumpet-blast', data: { position: [550, 428] } },

  // Fuego del fundidor / horno de fusión
  { match: /horno|fuego.{0,15}fund|fund[íi]an.{0,15}oro|fundir en el fuego/i,
    cueId: 'fx:smoke-column', data: { position: [550, 430] } },

  // Polvo / cenizas del becerro destruido
  { match: /quem[óo] el becerro|moli[óo] el becerro|polvo.{0,15}becerro|desecho en polvo/i,
    cueId: 'fx:dust-burst', data: { position: [551, 428] } },

  // Ira de YHWH — teofanía de juicio
  { match: /ira de Yahveh|furor de Dios|indignaci[óo]n divina|cólera de All[āa]h/i,
    cueId: 'fx:divine-light-beam', data: { position: [550, 420] } },

  // Moisés baja del monte iracundo
  { match: /Mois[ée]s.{0,15}(bajó|descendió|ira|furor|encolerizado)|al bajar/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Moisés rompe las tablas — tablets-shatter (tabletas NO son scene-object en este evento)
  { match: /rompi[óo] las tablas|rompe las tablas|tablas.{0,15}(pie del monte|rotas)|destroza.{0,15}tablas/i,
    cueId: 'fx:tablets-shatter', data: { position: [550, 428] } },

  // Becerro destruido — ídolo roto
  { match: /destroza.{0,10}becerro|destruy[óo].{0,10}[íi]dolo|rompi[óo].{0,10}becerro/i,
    cueId: 'fx:idol-shatter', data: { position: [550, 428] } },

  // Levitas ejecutan a 3.000
  { match: /levitas|3\.?000|tres mil|matad cada uno|espada sobre el muslo/i,
    cueId: 'fx:character-recede', data: { position: [555, 430] } },

  // Sangre del juicio
  { match: /espada.{0,15}(levitas|hermano)|matad.{0,10}hombre|cay[óo].{0,10}3\.?000/i,
    cueId: 'fx:blood-stain', data: { position: [555, 430] } },

  // Intercesión de Moisés / perdón
  { match: /Mois[ée]s intercede|intercesi[óo]n|ráeme.{0,10}libro|perdona ahora su pecado/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Plaga como consecuencia
  { match: /envi[óo].{0,15}plaga|Yahveh.{0,15}plaga|plaga.{0,15}pueblo|castigo por el becerro/i,
    cueId: 'fx:plague-swarm', data: { position: [553, 428] } },

  // Moisés regresa al monte — segunda intercesión
  { match: /volvi[óo] a subir|segunda vez al monte|segunda intercesi[óo]n/i,
    cueId: 'fx:mountain-glow', data: { position: [549, 420] } },

  // Samirí exilado — maldición
  { match: /Samir[íi].{0,15}(exil|desterra|la[—-]lá)|no te toques|andarás solo/i,
    cueId: 'fx:character-recede', data: { pinIdx: 2 } },

  // ── Pasada 3 — cinematográficos de cumbre ───────────────────────────────

  // Flash blanco — ruptura de las tablas
  { match: /rompi[óo].{0,10}tablas.{0,10}monte|lanz[óo].{0,10}tablas|pedazos.{0,10}pie del monte/i,
    cueId: 'fx:flash-white' },

  // Shockwave — la destrucción del ídolo
  { match: /estrell[óo].{0,10}tablas|ech[óo].{0,10}polvo.{0,10}agua|moli[óo].{0,10}polvo/i,
    cueId: 'fx:shockwave', data: { position: [550, 428] } },

  // Vignette — el pueblo ante el becerro
  { match: /pueblo.{0,15}(aclamaba|ador[óo]|postró).{0,15}becerro|¡Israel, éste es tu dios/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
