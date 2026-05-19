import type { ChoreographySet } from './types';

/**
 * Choreographies for events in the Primordial era.
 *
 * Each animation is a narrative micro-scene that reads on the SVG map:
 * pins (character avatars) move, scale and fade in time with the biblical
 * (and apocryphal — 1 Enoch, Jubilees, Talmud) account.
 *
 * All sequences end at the base state so the GSAP `repeat: -1` timeline
 * loops cleanly without snapping.
 */
const PRIMORDIAL: ChoreographySet = {
  // ─────────────────────────────────────────────────────────────────────────
  //  NACIMIENTO DE ADÁN Y EVA
  //  Adán moldeado del polvo, Eva tomada de su costado; Lilit aparece como
  //  sombra rabínica al margen (Génesis 2:7, 2:21-22).
  //  Pins: adan(0), eva(1), lilith(2)
  // ─────────────────────────────────────────────────────────────────────────
  'nacimiento-adan-eva': {
    steps: [
      // (0) ESTADO INICIAL — polvo casi invisible. Eva NO existe aún y
      //     la dejamos SUPERPUESTA sobre Adán (offset 0) para que
      //     pueda "brotar de su costado" sin teleportarse desde afuera
      //     de cuadro.
      { pinIdx: 0, scale: 0.3, opacity: 0.1, duration: 0.01 },
      { pinIdx: 1, scale: 0.0, opacity: 0.0, offset: [0, 0], duration: 0.01 },
      { pinIdx: 2, scale: 0.0, opacity: 0.0, duration: 0.01 },

      // (1) ALIENTO DE VIDA — Adán se eleva del polvo (Gn 2:7)
      { pinIdx: 0, scale: 1.0, opacity: 1.0, duration: 2.2, ease: 'power2.out' },

      // (2) RESPIRACIÓN — soliloquio del primer hombre
      { pinIdx: 0, scale: 1.06, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0,  duration: 1.0, ease: 'sine.inOut' },

      // (3) SUEÑO PROFUNDO — Adán cae en torpor; pulso + atenuación
      //     leve. Es el "tardemá" del Génesis (Gn 2:21).
      { pinIdx: 0, scale: 0.92, opacity: 0.65, duration: 1.4, ease: 'sine.inOut' },

      // (4) DE LA COSTILLA — Eva emerge DESDE Adán. Empieza encima de
      //     él (mismo offset 0,0) en escala 0; crece in situ con un
      //     pulso de "extracción" en Adán, y después se desliza hacia
      //     la derecha hasta su posición final. La superposición
      //     inicial + el delay hacen que se lea como "saliendo de él",
      //     no como "llegando volando".
      { pinIdx: 0, scale: 1.02, opacity: 0.75, duration: 0.6, ease: 'sine.inOut' }, // pulso de extracción
      { pinIdx: 1, scale: 0.45, opacity: 0.55, duration: 0.9, ease: 'power2.out' }, // brote inicial superpuesto
      { pinIdx: 1, offset: [10, -2], scale: 0.8, opacity: 0.85, duration: 1.0, ease: 'power2.out' },
      { pinIdx: 1, offset: [18, 0],  scale: 1.0, opacity: 1.0,  duration: 1.1, ease: 'power3.out' },

      // (5) ADÁN DESPIERTA — vuelve a escala/opacidad plenas
      { pinIdx: 0, scale: 1.0, opacity: 1.0, duration: 1.0, ease: 'power2.out' },

      // (6) RECONOCIMIENTO — leve gesto uno hacia el otro
      { pinIdx: 0, offset: [3, 0],  duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [15, 0], duration: 0.9, ease: 'sine.inOut' },

      // (7) LILIT — primera esposa de la tradición rabínica, fantasmal
      //     al margen
      { pinIdx: 2, offset: [34, -4], scale: 0.9, opacity: 0.35, duration: 1.8, ease: 'sine.out' },

      // (8) RESET — devuelve la pareja a su posición canónica para
      //     loopear sin saltos
      { pinIdx: 0, offset: [0, 0],  duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [18, 0], duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [34, -4], opacity: 0.35, duration: 0.6 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  EXPULSIÓN DEL EDÉN
  //  El querubín con espada flamígera echa fuera a Adán y Eva (Gn 3:23-24).
  //  Lilit ya había huido al desierto (tradición). Drift hacia afuera, sin
  //  retorno triunfal — el loop reset es lento, casi nostálgico.
  //  Pins: adan(0), eva(1), lilith(2)
  // ─────────────────────────────────────────────────────────────────────────
  'expulsion-eden': {
    steps: [
      // (0) Adán y Eva se miran un instante — saben que es el último
      { pinIdx: 0, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      // (1) Empujón inicial (espada flamígera) — sacudida rápida
      { pinIdx: 0, offset: [-3, 2], duration: 0.3, ease: 'power3.out' },
      { pinIdx: 1, offset: [3, 2], duration: 0.3, ease: 'power3.out' },
      // (2) Drift largo y triste hacia afuera del jardín
      { pinIdx: 0, offset: [-16, 10], opacity: 0.45, scale: 0.95, duration: 3.2, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [14, 10], opacity: 0.45, scale: 0.95, duration: 3.2, ease: 'sine.inOut' },
      // (3) Lilit ya estaba lejos — arco rebelde aún más extenso
      { pinIdx: 2, offset: [42, -5], opacity: 0.2, scale: 0.8, duration: 4.0, ease: 'power2.in' },
      // (4) Pausa exilio (los dos en silencio fuera del Edén)
      { pinIdx: 0, duration: 1.2 },
      // (5) Reset lento — el ciclo se reinicia con melancolía
      { pinIdx: 0, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 2.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 2.4, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 0.6, scale: 1.0, duration: 2.4, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  NACIMIENTO DE CAÍN
  //  "Por voluntad de YHWH he adquirido varón" (Gn 4:1). Primogénito —
  //  los padres lo presentan con orgullo, pero hay un matiz de presagio.
  //  Pins: adan(0), eva(1), cain(2)
  // ─────────────────────────────────────────────────────────────────────────
  'nacimiento-cain': {
    steps: [
      // (0) Caín no existe
      { pinIdx: 2, scale: 0.1, opacity: 0.0, duration: 0.01 },
      // (1) Eva se inclina (parto) — leve agachada
      { pinIdx: 1, offset: [0, 3], scale: 0.95, duration: 1.4, ease: 'sine.inOut' },
      // (2) Caín nace — emerge con vigor (primogénito)
      { pinIdx: 2, scale: 1.0, opacity: 1.0, duration: 1.8, ease: 'back.out(1.4)' },
      // (3) Adán hincha pecho — orgullo paterno
      { pinIdx: 0, scale: 1.12, duration: 1.0, ease: 'sine.inOut' },
      // (4) Eva se incorpora con el hijo
      { pinIdx: 1, offset: [0, 0], scale: 1.1, duration: 1.4, ease: 'power2.out' },
      // (5) Pulso de Caín — presagio sutil, brilla y se atenúa
      { pinIdx: 2, scale: 1.15, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // (6) Padres se relajan
      { pinIdx: 0, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      // (7) Hold final breve
      { pinIdx: 2, duration: 0.8 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  NACIMIENTO DE ABEL
  //  "Y dio a luz también a su hermano Abel" (Gn 4:2). Más callado que
  //  Caín — Abel es pastor, alma sencilla. Entrada delicada, padres con
  //  cariño compartido.
  //  Pins: adan(0), eva(1), abel(2)
  // ─────────────────────────────────────────────────────────────────────────
  'nacimiento-abel': {
    steps: [
      // (0) Abel inexistente
      { pinIdx: 2, scale: 0.1, opacity: 0.0, duration: 0.01 },
      // (1) Eva se inclina más profundo (segundo parto, más reposo)
      { pinIdx: 1, offset: [0, 3], scale: 0.93, duration: 1.6, ease: 'sine.inOut' },
      // (2) Abel emerge suave — sin "back", solo crecimiento gentil
      { pinIdx: 2, scale: 1.0, opacity: 1.0, duration: 2.2, ease: 'power2.out' },
      // (3) Adán acoge con calma (no es primogénito — menos drama)
      { pinIdx: 0, scale: 1.06, duration: 1.4, ease: 'sine.inOut' },
      // (4) Eva se reincorpora
      { pinIdx: 1, offset: [0, 0], scale: 1.06, duration: 1.4, ease: 'sine.inOut' },
      // (5) Abel respira (vida quieta del pastor)
      { pinIdx: 2, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
      // (6) Reset padres
      { pinIdx: 0, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      // (7) Hold breve
      { pinIdx: 2, duration: 0.6 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  CAÍN MATA A ABEL
  //  "Salieron al campo… Caín se levantó contra su hermano y lo mató"
  //  (Gn 4:8). Aproximación celosa, golpe rápido, recoil, exilio a Nod.
  //  Pins: cain(0), abel(1)
  // ─────────────────────────────────────────────────────────────────────────
  'cain-mata-abel': {
    steps: [
      // (0) Abel quieto (ofreciendo, ajeno)
      { pinIdx: 1, scale: 1.02, duration: 1.0, ease: 'sine.inOut' },
      // (1) Caín tenso — tic nervioso (celos por la ofrenda)
      { pinIdx: 0, scale: 1.08, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 0.4, ease: 'sine.inOut' },
      // (2) Aproximación lenta (acecho)
      { pinIdx: 0, offset: [14, -1], duration: 2.4, ease: 'sine.inOut' },
      // (3) Pausa amenazante — Abel aún sin sospechar
      { pinIdx: 0, duration: 0.4 },
      // (4) GOLPE — Caín salta sobre Abel
      { pinIdx: 0, offset: [18, 1], scale: 1.15, duration: 0.25, ease: 'power3.in' },
      // (5) Abel cae — derribado, opacidad casi nula
      { pinIdx: 1, offset: [2, 14], opacity: 0.15, scale: 0.8, duration: 0.5, ease: 'power3.in' },
      // (6) Caín retrocede horrorizado por su acto
      { pinIdx: 0, offset: [10, -4], scale: 1.0, duration: 0.9, ease: 'power2.out' },
      // (7) Maldición — Caín errante huye al este (tierra de Nod)
      { pinIdx: 0, offset: [48, -10], opacity: 0.35, scale: 0.92, duration: 3.6, ease: 'power2.in' },
      // (8) Pausa larga del cuerpo de Abel, solo
      { pinIdx: 1, duration: 1.0 },
      // (9) Reset para el loop
      { pinIdx: 0, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  NACIMIENTO DE SET
  //  "Me ha dado Dios otro hijo en lugar de Abel" (Gn 4:25). Sustitución
  //  redentora — los padres reciben con esperanza renovada.
  //  Pins: adan(0), eva(1), set(2)
  // ─────────────────────────────────────────────────────────────────────────
  'nacimiento-set': {
    steps: [
      // (0) Set inexistente
      { pinIdx: 2, scale: 0.1, opacity: 0.0, duration: 0.01 },
      // (1) Padres en duelo previo — tenues
      { pinIdx: 0, opacity: 0.65, scale: 0.96, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.65, scale: 0.96, duration: 1.0, ease: 'sine.inOut' },
      // (2) Eva se inclina (parto)
      { pinIdx: 1, offset: [0, 3], duration: 1.2, ease: 'sine.inOut' },
      // (3) Set nace — luz nueva, brillo de esperanza
      { pinIdx: 2, scale: 1.15, opacity: 1.0, duration: 2.0, ease: 'power3.out' },
      // (4) Set asienta su tamaño
      { pinIdx: 2, scale: 1.0, duration: 0.6, ease: 'sine.inOut' },
      // (5) Padres se reaniman — opacidad sube
      { pinIdx: 0, opacity: 1.0, scale: 1.08, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1.0, scale: 1.08, duration: 1.4, ease: 'sine.inOut' },
      // (6) Pulso conjunto — familia restaurada
      { pinIdx: 0, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      // (7) Hold final
      { pinIdx: 2, duration: 0.8 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  NACIMIENTO DE ENOC
  //  Enoc nace en la séptima generación; al mismo tiempo (1 Enoc 6-7),
  //  los Vigilantes descienden del cielo al Monte Hermón, Semjaza y Azazel
  //  los lideran, y de ellos nacen los Nephilim.
  //  Pins: enoc(0), jared(1), mahalalel(2), vigilantes(3), semjaza(4), azazel(5), nephilim(6)
  // ─────────────────────────────────────────────────────────────────────────
  'nacimiento-enoc': {
    steps: [
      // (0) Estados iniciales — Enoc pequeño, Vigilantes arriba (fuera del cuadro)
      { pinIdx: 0, scale: 0.4, opacity: 0.2, duration: 0.01 },
      { pinIdx: 3, offset: [12, -30], opacity: 0.0, duration: 0.01 },
      { pinIdx: 4, offset: [22, -32], opacity: 0.0, duration: 0.01 },
      { pinIdx: 5, offset: [-20, -32], opacity: 0.0, duration: 0.01 },
      { pinIdx: 6, offset: [0, 20], opacity: 0.0, scale: 0.6, duration: 0.01 },
      // (1) Enoc emerge — luz pacífica
      { pinIdx: 0, scale: 1.0, opacity: 1.0, duration: 2.2, ease: 'power2.out' },
      // (2) Jared (padre) y Mahalalel (abuelo) honran al recién nacido
      { pinIdx: 1, offset: [0, 2], scale: 0.97, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.04, duration: 1.4, ease: 'sine.inOut' },
      // (3) Los Vigilantes caen desde el cielo (Hermón) — invasión sigilosa
      { pinIdx: 3, offset: [12, 0], opacity: 0.75, duration: 2.8, ease: 'power2.in' },
      // (4) Semjaza desciende — el líder, más enérgico
      { pinIdx: 4, offset: [22, 4], opacity: 0.8, duration: 3.0, ease: 'power3.in' },
      // (5) Azazel cae al otro flanco
      { pinIdx: 5, offset: [-20, 4], opacity: 0.75, duration: 3.2, ease: 'power3.in' },
      // (6) De las uniones impuras emergen los Nephilim (gigantes)
      { pinIdx: 6, offset: [0, 16], scale: 1.35, opacity: 0.6, duration: 2.6, ease: 'sine.out' },
      // (7) Pulso ominoso conjunto — todo el mal coexiste con el santo Enoc
      { pinIdx: 4, scale: 1.1, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 5, scale: 1.1, duration: 0.6, ease: 'sine.inOut' },
      // (8) Reset
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 0.5, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, offset: [0, 0], opacity: 0.55, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 5, offset: [0, 0], opacity: 0.55, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 6, offset: [0, 0], scale: 1.0, opacity: 0.55, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  ASUNCIÓN DE ENOC
  //  "Caminó Enoc con Dios y desapareció, porque Dios se lo llevó" (Gn 5:24).
  //  Enoc asciende sin morir. En paralelo (1 Enoc), los Vigilantes son
  //  arrojados al abismo y Semjaza atado bajo las colinas.
  //  Pins: enoc(0), jared(1), vigilantes(2), semjaza(3)
  // ─────────────────────────────────────────────────────────────────────────
  'asuncion-enoc': {
    steps: [
      // (0) Enoc respira — última inhalación en la tierra
      { pinIdx: 0, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      // (1) Jared mira hacia arriba (pulsación reverente)
      { pinIdx: 1, offset: [0, -2], scale: 1.04, duration: 1.0, ease: 'sine.inOut' },
      // (2) Enoc inicia la ascensión — sube y se va desvaneciendo
      { pinIdx: 0, offset: [0, -10], opacity: 0.7, scale: 1.0, duration: 1.4, ease: 'sine.in' },
      // (3) Asunción plena — sube más alto y casi desaparece
      { pinIdx: 0, offset: [0, -26], opacity: 0.05, scale: 0.6, duration: 2.4, ease: 'power3.in' },
      // (4) En paralelo, los Vigilantes son arrastrados a la profundidad
      { pinIdx: 2, offset: [8, 16], opacity: 0.3, scale: 0.9, duration: 2.6, ease: 'power2.in' },
      // (5) Semjaza, el líder, hundido aún más profundo (más culpa)
      { pinIdx: 3, offset: [14, 24], opacity: 0.2, scale: 0.85, duration: 2.8, ease: 'power3.in' },
      // (6) Jared queda solo, en silencio reverente
      { pinIdx: 1, offset: [0, 0], scale: 0.98, duration: 1.2, ease: 'sine.inOut' },
      // (7) Pausa — el cielo se cerró
      { pinIdx: 0, duration: 0.8 },
      // (8) Reset suave para el loop
      { pinIdx: 0, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 0.55, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 0.55, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  NACIMIENTO DE NOÉ
  //  "Éste nos aliviará de nuestras obras" (Gn 5:29). Lamec profetiza,
  //  Matusalén (el más anciano) bendice, Jared ya falleció pero queda
  //  como recuerdo (presencia tenue).
  //  Pins: noe(0), lamec(1), matusalen(2), jared(3)
  // ─────────────────────────────────────────────────────────────────────────
  'nacimiento-noe': {
    steps: [
      // (0) Noé en gestación — invisible
      { pinIdx: 0, scale: 0.2, opacity: 0.0, duration: 0.01 },
      // (1) Jared, el bisabuelo (ya muerto / memoria) — presencia tenue
      { pinIdx: 3, opacity: 0.4, scale: 0.95, duration: 0.01 },
      // (2) Lamec se inclina expectante (esperando hijo prometido)
      { pinIdx: 1, offset: [0, 2], scale: 1.05, duration: 1.4, ease: 'sine.inOut' },
      // (3) Noé nace — luz cálida, emerge con vigor
      { pinIdx: 0, scale: 1.0, opacity: 1.0, duration: 2.4, ease: 'back.out(1.2)' },
      // (4) Lamec hincha pecho — profecía de consuelo
      { pinIdx: 1, offset: [0, 0], scale: 1.15, duration: 1.2, ease: 'power2.out' },
      // (5) Matusalén (el patriarca más viejo) bendice — pulso suave
      { pinIdx: 2, scale: 1.1, duration: 1.4, ease: 'sine.inOut' },
      // (6) Memoria de Jared pulsa (eco del antepasado)
      { pinIdx: 3, opacity: 0.55, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 3, opacity: 0.4, duration: 0.8, ease: 'sine.inOut' },
      // (7) Noé respira (futuro arca)
      { pinIdx: 0, scale: 1.06, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // (8) Reset
      { pinIdx: 1, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  ORDEN DE CONSTRUIR EL ARCA
  //  "Hazte un arca de madera de gofer" (Gn 6:14). Noé trabaja
  //  rítmicamente; alrededor, los Nephilim y Vigilantes — la corrupción
  //  que hace urgente el arca — se ciernen amenazantes.
  //  Pins: noe(0), nephilim(1), vigilantes(2)
  // ─────────────────────────────────────────────────────────────────────────
  'orden-construir-arca': {
    steps: [
      // (0) Estado inicial — Nephilim/Vigilantes ya presentes pero quietos
      { pinIdx: 1, opacity: 0.45, scale: 1.0, duration: 0.01 },
      { pinIdx: 2, opacity: 0.4, duration: 0.01 },
      // (1) Noé recibe la orden — pulso de revelación
      { pinIdx: 0, scale: 1.15, duration: 0.8, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.0, duration: 0.6, ease: 'sine.inOut' },
      // (2) Martillazo 1
      { pinIdx: 0, offset: [3, -1], duration: 0.25, ease: 'power3.in' },
      { pinIdx: 0, offset: [-3, 1], duration: 0.25, ease: 'power3.out' },
      // (3) Martillazo 2
      { pinIdx: 0, offset: [3, -1], duration: 0.25, ease: 'power3.in' },
      { pinIdx: 0, offset: [-3, 1], duration: 0.25, ease: 'power3.out' },
      // (4) Martillazo 3
      { pinIdx: 0, offset: [3, -1], duration: 0.25, ease: 'power3.in' },
      { pinIdx: 0, offset: [0, 0], duration: 0.3, ease: 'sine.out' },
      // (5) En paralelo, Nephilim crecen amenazantes (gigantes en la tierra)
      { pinIdx: 1, scale: 1.25, opacity: 0.65, duration: 2.0, ease: 'sine.inOut' },
      // (6) Vigilantes acechan (presencia oscura, pulsan)
      { pinIdx: 2, opacity: 0.7, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.4, duration: 1.4, ease: 'sine.inOut' },
      // (7) Noé persevera — un set más de martillazos
      { pinIdx: 0, offset: [2, -1], duration: 0.25, ease: 'power3.in' },
      { pinIdx: 0, offset: [-2, 1], duration: 0.25, ease: 'power3.out' },
      { pinIdx: 0, offset: [0, 0], duration: 0.3, ease: 'sine.out' },
      // (8) Reset Nephilim/Vigilantes (loop)
      { pinIdx: 1, scale: 1.0, opacity: 0.45, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.4, duration: 1.8, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  EL GRAN DILUVIO
  //  Las aguas suben 15 codos sobre los montes; toda carne fuera del arca
  //  perece (Gn 7:18-23). El arca cabecea sobre las aguas; Matusalén
  //  (que murió el año del diluvio) se desvanece; Nephilim y Vigilantes
  //  son arrasados (Vigilantes atados al abismo según 1 Enoc 10).
  //  Pins: noe(0), sem(1), cam(2), jafet(3), matusalen(4), nephilim(5), vigilantes(6)
  // ─────────────────────────────────────────────────────────────────────────
  'diluvio': {
    steps: [
      // (0) Matusalén se desvanece (murió antes del diluvio) — leve
      { pinIdx: 4, opacity: 0.5, scale: 0.92, duration: 1.2, ease: 'sine.inOut' },
      // (1) El arca empieza a flotar — la familia sube
      { pinIdx: 0, offset: [0, -4], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, -4], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, -4], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, -4], duration: 1.6, ease: 'sine.inOut' },
      // (2) Cabeceo (rolido derecha)
      { pinIdx: 0, offset: [3, -3], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [3, -3], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [3, -3], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [3, -3], duration: 1.0, ease: 'sine.inOut' },
      // (3) Matusalén se va del todo
      { pinIdx: 4, opacity: 0.1, scale: 0.7, duration: 1.6, ease: 'power2.in' },
      // (4) Cabeceo (rolido izquierda)
      { pinIdx: 0, offset: [-3, -5], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-3, -5], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-3, -5], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [-3, -5], duration: 1.0, ease: 'sine.inOut' },
      // (5) Los Nephilim se hunden (destruidos por las aguas)
      { pinIdx: 5, offset: [-4, 26], opacity: 0.08, scale: 0.55, duration: 2.8, ease: 'power3.in' },
      // (6) Los Vigilantes encadenados al abismo (1 Enoc 10:4-6)
      { pinIdx: 6, offset: [10, 32], opacity: 0.08, scale: 0.7, duration: 3.0, ease: 'power3.in' },
      // (7) El arca se asienta (sobre Ararat)
      { pinIdx: 0, offset: [0, -2], duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, -2], duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, -2], duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, -2], duration: 1.4, ease: 'sine.inOut' },
      // (8) Reset (las aguas bajan, todo a su sitio para el loop)
      { pinIdx: 0, offset: [0, 0], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 4, opacity: 1.0, scale: 1.0, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 5, offset: [0, 0], opacity: 0.5, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 6, offset: [0, 0], opacity: 0.5, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  ALIANZA DEL ARCOÍRIS
  //  Noé y sus hijos reciben la promesa: "No volveré más a maldecir la
  //  tierra" (Gn 9:11-13). Sacrificio de acción de gracias; los hijos se
  //  abren para fundar las naciones (Sem, Cam, Jafet).
  //  Pins: noe(0), sem(1), cam(2), jafet(3)
  // ─────────────────────────────────────────────────────────────────────────
  'alianza-arcoiris': {
    steps: [
      // (0) Noé alza brazos al cielo (sacrificio) — sube y crece
      { pinIdx: 0, offset: [0, -3], scale: 1.18, duration: 1.6, ease: 'power2.out' },
      // (1) Hijos miran al padre — pequeño pulso de presencia
      { pinIdx: 1, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      // (2) Hold — arcoíris aparece (Noé sostiene la pose)
      { pinIdx: 0, duration: 1.2 },
      // (3) Los hijos se abren hacia tres puntos (futura repoblación)
      { pinIdx: 1, offset: [-12, 2], duration: 2.4, ease: 'sine.inOut' },  // Sem — Asia/Medio Oriente
      { pinIdx: 2, offset: [6, 8], duration: 2.4, ease: 'sine.inOut' },     // Cam — África
      { pinIdx: 3, offset: [14, -4], duration: 2.4, ease: 'sine.inOut' },   // Jafet — Anatolia/Europa
      // (4) Noé baja brazos — alianza sellada
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 1.6, ease: 'sine.inOut' },
      // (5) Pulso final colectivo (familia bendita)
      { pinIdx: 1, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      // (6) Reset — hijos vuelven al padre
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },
};

export default PRIMORDIAL;
