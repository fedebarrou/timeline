import type { ChoreographySet } from './types';

/**
 * Choreographies for the Revelación era (life of Muhammad).
 *
 * Pin order is taken from the `characters:` array in each event's MDX file:
 *
 *   nacimiento-mahoma            : [mahoma(0), abdullah-padre(1), amina-madre(2), abdulmuttalib(3)]
 *   infancia-amina-y-halima      : [mahoma(0), halima(1), amina-madre(2)]
 *   muerte-de-amina              : [mahoma(0), amina-madre(1)]
 *   muerte-de-abdulmuttalib      : [mahoma(0), abdulmuttalib(1), abu-talib(2)]
 *   viaje-con-abu-talib-bahira   : [mahoma(0), abu-talib(1), bahira(2)]
 *   matrimonio-con-khadija       : [mahoma(0), khadija(1)]
 *   revelacion-en-hira           : [mahoma(0), gabriel(1), khadija(2), waraqa(3)]
 *   predicacion-secreta          : [mahoma(0), khadija(1), ali(2), abu-bakr(3), zayd(4), bilal(5)]
 *   predicacion-publica          : [mahoma(0), abu-jahl(1), abu-lahab(2), abu-talib(3)]
 *   migracion-a-abisinia         : [mahoma(0), jafar-ibn-abi-talib(1), negus(2)]
 *   boicot-de-quraysh            : [mahoma(0), abu-talib(1)]
 *   ano-de-tristeza              : [mahoma(0), khadija(1), abu-talib(2)]
 *   viaje-nocturno-mi-raj        : [mahoma(0), gabriel(1), buraq(2), profetas-anteriores(3)]
 *   conversion-de-medina-ansar   : [mahoma(0), ansar-medinenses(1)]
 *   hegira-migracion-a-medina    : [mahoma(0), abu-bakr(1), ali(2)]
 *   fundacion-comunidad-medina   : [mahoma(0), ansar-medinenses(1)]
 *   batalla-de-badr              : [mahoma(0), abu-bakr(1), ali(2), omar(3), abu-jahl(4), abu-sufyan(5)]
 *   batalla-de-uhud              : [mahoma(0), hamza-tio(1), wahsi(2), ali(3), abu-sufyan(4)]
 *   batalla-del-foso             : [mahoma(0), salman-el-persa(1), abu-sufyan(2)]
 *   tratado-de-hudaibiya         : [mahoma(0), abu-sufyan(1)]
 *   conquista-de-meca            : [mahoma(0), ali(1), abu-sufyan(2)]
 *   peregrinacion-de-despedida   : [mahoma(0)]
 *   muerte-de-mahoma             : [mahoma(0), aisha(1), abu-bakr(2), ali(3), fatima(4)]
 */
const REVELACION: ChoreographySet = {
  // --- NACIMIENTO DE MAHOMA ---
  // Mahoma tiny → grows (born); Amina maternal pulse; Abdulmuttalib lifts him to the Kaaba;
  // Abdullah (padre fallecido) stays faint (already dead).
  'nacimiento-mahoma': {
    steps: [
      // Mahoma emerge tiny (recién nacido)
      { pinIdx: 0, scale: 0.4, opacity: 0.3, duration: 0.01 },
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' },
      // Abdullah (padre fallecido) — apenas presente
      { pinIdx: 1, opacity: 0.25, scale: 0.9, duration: 1.5, ease: 'sine.inOut' },
      // Amina (madre) pulso maternal
      { pinIdx: 2, scale: 1.1, duration: 1.5, ease: 'sine.inOut' },
      // Abdulmuttalib lo recibe en brazos (scale up, leve offset hacia el niño)
      { pinIdx: 3, offset: [-4, 0], scale: 1.12, duration: 1.8, ease: 'sine.inOut' },
      // Settle
      { pinIdx: 2, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.25, duration: 1.0 },
    ],
  },

  // --- INFANCIA CON ÁMINA Y ḤALĪMA ---
  // Mahoma niño con nodriza beduina — paz, prosperidad; Halima pulsa prosperidad,
  // Amina espera de lejos (lo recuperará después).
  'infancia-amina-y-halima': {
    steps: [
      // Mahoma niño — leve scale (más pequeño que adulto)
      { pinIdx: 0, scale: 0.9, duration: 1.2, ease: 'sine.inOut' },
      // Halima (nodriza) pulsa prosperidad (la familia prospera con el niño)
      { pinIdx: 1, scale: 1.12, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      // Mahoma "abre el pecho" — leve pulso espiritual
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Halima sostiene la prosperidad
      { pinIdx: 1, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Amina espera (presencia tenue desde Meca)
      { pinIdx: 2, opacity: 0.6, scale: 0.95, duration: 1.5, ease: 'sine.inOut' },
      // Amina recupera al niño — se acerca
      { pinIdx: 2, opacity: 1, scale: 1.05, duration: 2.0, ease: 'sine.out' },
      // Halima retrocede (lo devuelve)
      { pinIdx: 1, scale: 1.0, opacity: 0.8, duration: 1.8, ease: 'sine.inOut' },
      // Settle
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, duration: 1.0 },
      { pinIdx: 2, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- MUERTE DE ÁMINA ---
  // Madre se apaga en al-Abwāʾ; Mahoma niño (6 años) queda huérfano (encoge).
  'muerte-de-amina': {
    steps: [
      // Amina enferma — palidece (slight scale down)
      { pinIdx: 1, scale: 0.95, opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Madre fallece (fade muy bajo, encoge)
      { pinIdx: 1, opacity: 0.1, scale: 0.8, duration: 3.0, ease: 'power2.in' },
      // Mahoma niño se queda solo — encoge (huérfano)
      { pinIdx: 0, scale: 0.85, opacity: 0.85, duration: 2.5, ease: 'sine.inOut' },
      // Pequeño temblor — pena
      { pinIdx: 0, offset: [1, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.4 },
      // Reset (loop)
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, scale: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- MUERTE DE ʿABD AL-MUṬṬALIB ---
  // Abuelo se apaga; tutela pasa a Abū Ṭālib (entra, pulsa, recibe al niño);
  // Mahoma queda aún más pequeño/solo.
  'muerte-de-abdulmuttalib': {
    steps: [
      // Abdulmuttalib anciano — palidece
      { pinIdx: 1, scale: 0.95, opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Muere (fade bajo)
      { pinIdx: 1, opacity: 0.1, scale: 0.8, duration: 3.0, ease: 'power2.in' },
      // Mahoma encoge — segunda gran pérdida
      { pinIdx: 0, scale: 0.82, opacity: 0.85, duration: 2.0, ease: 'sine.inOut' },
      // Abu Talib entra (nuevo tutor) — se acerca al niño
      { pinIdx: 2, offset: [-6, 0], scale: 1.1, duration: 2.2, ease: 'sine.out' },
      // Mahoma se recupera levemente bajo nueva protección
      { pinIdx: 0, scale: 0.95, opacity: 1, duration: 1.8, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, scale: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- VIAJE CON ABŪ ṬĀLIB Y BAḤĪRĀ ---
  // Caravana sale de Meca rumbo a Bostra (NW): Mahoma + Abu Talib drift up/left.
  // El monje Baḥīrā reconoce las señales (pulsa profético desde Siria).
  'viaje-con-abu-talib-bahira': {
    steps: [
      // Caravana drift NW (offset -x, -y) — hacia Siria
      { pinIdx: 0, offset: [-14, -10], duration: 3.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-12, -8], duration: 3.5, ease: 'sine.inOut' },
      // Baḥīrā ve las señales — pulso profético
      { pinIdx: 2, scale: 1.18, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      // Mahoma pulsa en respuesta (es reconocido)
      { pinIdx: 0, scale: 1.1, duration: 1.2, ease: 'sine.inOut' },
      // Baḥīrā se calma (testimonio dado)
      { pinIdx: 2, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Caravana regresa (vuelve a Meca)
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- MATRIMONIO CON KHADĪJA ---
  // Encuentro de los dos: ambos pulsan al unísono, se acercan en sincronía.
  'matrimonio-con-khadija': {
    steps: [
      // Acercamiento (se mueven el uno hacia el otro)
      { pinIdx: 0, offset: [3, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-3, 0], duration: 2.0, ease: 'sine.inOut' },
      // Pulso de unión sincronizado (matrimonio)
      { pinIdx: 0, scale: 1.1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.1, duration: 1.5, ease: 'sine.inOut' },
      // Mantienen el pulso (25 años de matrimonio)
      { pinIdx: 0, scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- REVELACIÓN EN HIRA ---
  // Gabriel desciende del cielo, Mahoma tiembla, Khadija lo conforta, Waraqa confirma.
  'revelacion-en-hira': {
    steps: [
      // Gabriel desciende (entra desde arriba, fade in)
      { pinIdx: 1, offset: [0, -25], opacity: 0, duration: 0.01 },
      { pinIdx: 1, offset: [0, 0], opacity: 1, scale: 1.18, duration: 2.5, ease: 'power2.out' },
      // Mahoma tiembla (shake)
      { pinIdx: 0, offset: [1.5, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1.5, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [1.5, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1.5, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.4 },
      // Khadija aparece (lo cubre con el manto)
      { pinIdx: 2, opacity: 0.4, duration: 0.01 },
      { pinIdx: 2, opacity: 1, scale: 1.08, duration: 2.0, ease: 'sine.out' },
      // Waraqa confirma desde lejos (pulso tenue)
      { pinIdx: 3, opacity: 0.75, scale: 1.05, duration: 1.8, ease: 'sine.inOut' },
      // Gabriel se retira (sube y se atenúa)
      { pinIdx: 1, offset: [0, -8], opacity: 0.6, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 1, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- PREDICACIÓN SECRETA ---
  // Mahoma pulso contenido en el centro; conversos cercanos crecen uno a uno.
  // [mahoma(0), khadija(1), ali(2), abu-bakr(3), zayd(4), bilal(5)]
  'predicacion-secreta': {
    steps: [
      // Mahoma pulso contenido (privado)
      { pinIdx: 0, scale: 1.06, duration: 1.8, ease: 'sine.inOut' },
      // Khadija — primera musulmana (primera en convertirse)
      { pinIdx: 1, scale: 0.6, opacity: 0.4, duration: 0.01 },
      { pinIdx: 1, scale: 1.08, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Ali (niño)
      { pinIdx: 2, scale: 0.6, opacity: 0.4, duration: 0.01 },
      { pinIdx: 2, scale: 1.05, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Abu Bakr
      { pinIdx: 3, scale: 0.6, opacity: 0.4, duration: 0.01 },
      { pinIdx: 3, scale: 1.08, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Zayd
      { pinIdx: 4, scale: 0.6, opacity: 0.4, duration: 0.01 },
      { pinIdx: 4, scale: 1.05, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Bilal
      { pinIdx: 5, scale: 0.6, opacity: 0.4, duration: 0.01 },
      { pinIdx: 5, scale: 1.05, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Reset (siguen siendo pocos — vuelven a su escala normal)
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 4, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 5, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- PREDICACIÓN PÚBLICA ---
  // Mahoma sube al Ṣafā (scale up grande); Abu Jahl + Abu Lahab pulsan hostiles;
  // Abu Talib (tio-protector) escudo.
  // [mahoma(0), abu-jahl(1), abu-lahab(2), abu-talib(3)]
  'predicacion-publica': {
    steps: [
      // Mahoma sube al monte (predicación abierta) — scale up + offset up
      { pinIdx: 0, offset: [0, -6], scale: 1.18, duration: 2.5, ease: 'power2.out' },
      // Abu Jahl hostil — pulsa con agresión
      { pinIdx: 1, offset: [3, 0], scale: 1.1, duration: 0.8, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-3, 0], duration: 0.8, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.5 },
      // Abu Lahab grita rechazo (jitter)
      { pinIdx: 2, offset: [-2, 0], scale: 1.08, duration: 0.6, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [2, 0], duration: 0.6, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 0.5 },
      // Abu Talib escudo (no se convierte pero protege — scale up calmado)
      { pinIdx: 3, scale: 1.08, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      // Mahoma baja del monte
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      // Reset hostiles
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- MIGRACIÓN A ABISINIA (1ª Hégira) ---
  // Refugiados drifting hacia África (SW), Jafar habla ante el Negus (pulso solemne).
  // [mahoma(0), jafar-ibn-abi-talib(1), negus(2)]
  'migracion-a-abisinia': {
    steps: [
      // Mahoma se queda en Meca — envía (pulso de despedida)
      { pinIdx: 0, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Jafar emigra (drift SW + hacia abajo — cruzar el Mar Rojo a Aksum)
      { pinIdx: 1, offset: [-12, 18], opacity: 0.7, duration: 4.0, ease: 'sine.inOut' },
      // Negus (rey cristiano) pulsa acogedor
      { pinIdx: 2, scale: 1.12, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      // Jafar recita ante el Negus — pulso (Sura Maryam emociona al rey)
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.05, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      // Mahoma reposa
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- BOICOT DE QURAYSH ---
  // Mahoma + Abu Talib aislados en el shi'b: dim + scale shrink (hambre, aislamiento).
  // [mahoma(0), abu-talib(1)]
  'boicot-de-quraysh': {
    steps: [
      // Se retiran al valle (offset down + slight right — shi'b Abi Talib)
      { pinIdx: 0, offset: [4, 8], duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [4, 8], duration: 2.5, ease: 'sine.inOut' },
      // Tres años de hambre — encogen y dim
      { pinIdx: 0, scale: 0.88, opacity: 0.65, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.85, opacity: 0.6, duration: 3.0, ease: 'sine.inOut' },
      // Resisten (pequeño pulso de fe)
      { pinIdx: 0, scale: 0.92, duration: 1.0, ease: 'sine.inOut' },
      // Pergamino comido por termitas — boicot termina (vuelven a brillar)
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.out' },
      { pinIdx: 1, scale: 0.95, opacity: 0.85, duration: 2.0, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- AÑO DE LA TRISTEZA ---
  // Khadija + Abu Talib mueren en pocos meses — ambos fade; Mahoma encoge solo.
  // [mahoma(0), khadija(1), abu-talib(2)]
  'ano-de-tristeza': {
    steps: [
      // Khadija enferma primero (fade lento)
      { pinIdx: 1, scale: 0.95, opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Khadija muere (fade muy bajo)
      { pinIdx: 1, opacity: 0.1, scale: 0.8, duration: 2.5, ease: 'power2.in' },
      // Mahoma encoge (primera gran pérdida)
      { pinIdx: 0, scale: 0.9, opacity: 0.85, duration: 1.5, ease: 'sine.inOut' },
      // Abu Talib enferma (poco después)
      { pinIdx: 2, scale: 0.95, opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Abu Talib muere
      { pinIdx: 2, opacity: 0.1, scale: 0.8, duration: 2.5, ease: 'power2.in' },
      // Mahoma encoge aún más — sin esposa, sin protector clánico
      { pinIdx: 0, scale: 0.82, duration: 1.5, ease: 'sine.inOut' },
      // Pequeño temblor — pena
      { pinIdx: 0, offset: [1, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.4 },
      // Reset
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- VIAJE NOCTURNO Y MIʿRĀJ ---
  // Ascensión: Mahoma sube y se vuelve translúcido (ethereal), Gabriel guía,
  // Buraq lo lleva, encuentro con profetas (pulso). Luego regreso.
  // [mahoma(0), gabriel(1), buraq(2), profetas-anteriores(3)]
  'viaje-nocturno-mi-raj': {
    steps: [
      // Gabriel aparece (entrada desde arriba)
      { pinIdx: 1, offset: [0, -15], opacity: 0.3, duration: 0.01 },
      { pinIdx: 1, offset: [0, -3], opacity: 1, scale: 1.1, duration: 1.5, ease: 'power2.out' },
      // Buraq aparece (montura celestial)
      { pinIdx: 2, scale: 0.6, opacity: 0.4, duration: 0.01 },
      { pinIdx: 2, scale: 1.1, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Isrāʾ — Mahoma viaja (drift up + ligero offset hacia Jerusalén)
      { pinIdx: 0, offset: [0, -10], scale: 0.95, opacity: 0.85, duration: 2.5, ease: 'sine.inOut' },
      // Miʿrāj — asciende por los siete cielos (sube más, se vuelve etéreo)
      { pinIdx: 0, offset: [0, -25], scale: 0.85, opacity: 0.5, duration: 3.0, ease: 'power2.in' },
      // Profetas aparecen (encuentros en los cielos — pulso)
      { pinIdx: 3, opacity: 1, scale: 1.12, duration: 2.0, ease: 'sine.inOut' },
      // Gabriel sigue al Profeta hacia arriba
      { pinIdx: 1, offset: [0, -18], opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Regreso — Mahoma desciende
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 0.7, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, opacity: 0.8, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- CONVERSIÓN DE MEDINA (ANSAR) ---
  // Los Ansari de Yatrib pulsan acogida; Mahoma asiente (leve pulso afirmativo).
  // [mahoma(0), ansar-medinenses(1)]
  'conversion-de-medina-ansar': {
    steps: [
      // Ansar aparecen (delegación que viene desde Yathrib)
      { pinIdx: 1, offset: [10, -6], opacity: 0.5, duration: 0.01 },
      { pinIdx: 1, offset: [3, -2], opacity: 1, scale: 1.1, duration: 2.0, ease: 'sine.out' },
      // Mahoma los recibe (pulso)
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      // Pacto de ʿAqaba — pulso conjunto (juramento de protección)
      { pinIdx: 1, scale: 1.15, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.12, duration: 1.2, ease: 'sine.inOut' },
      // Sostenido (compromiso firmado)
      { pinIdx: 0, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- HÉGIRA (migración a Medina) ---
  // Mahoma + Abu Bakr migran NE; Ali se queda en Meca como decoy en la cama.
  // [mahoma(0), abu-bakr(1), ali(2)]
  'hegira-migracion-a-medina': {
    steps: [
      // Mahoma y Abu Bakr se ocultan primero (3 días en la cueva de Thawr — encogen)
      { pinIdx: 0, scale: 0.9, opacity: 0.7, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.9, opacity: 0.7, duration: 1.5, ease: 'sine.inOut' },
      // Ali se queda en Meca (decoy — duerme en cama de Mahoma, dim)
      { pinIdx: 2, opacity: 0.45, scale: 0.88, duration: 2.0, ease: 'sine.inOut' },
      // Salen de la cueva y migran NE (hacia Medina)
      { pinIdx: 0, offset: [14, -10], opacity: 1, scale: 1, duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [11, -8], opacity: 1, scale: 1, duration: 4.0, ease: 'sine.inOut' },
      // Llegan a Medina (pulso de fundación)
      { pinIdx: 0, scale: 1.1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- FUNDACIÓN COMUNIDAD MEDINA ---
  // Mahoma funda la umma — pulso central; los Ansar abrazan a los emigrantes
  // (offset hacia Mahoma — hermandad mu'akhah).
  // [mahoma(0), ansar-medinenses(1)]
  'fundacion-comunidad-medina': {
    steps: [
      // Mahoma pulsa fundador (mezquita simbólica + constitución)
      { pinIdx: 0, scale: 1.15, duration: 2.0, ease: 'sine.inOut' },
      // Ansar se acercan (hermandad — offset hacia el centro)
      { pinIdx: 1, offset: [-4, 0], scale: 1.08, duration: 2.0, ease: 'sine.out' },
      // Pulso conjunto (umma unida)
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      // Construcción de la mezquita — sostenido
      { pinIdx: 0, scale: 1.1, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.8, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- BATALLA DE BADR ---
  // Musulmanes avanzan unidos, Abu Jahl muere, Abu Sufyan huye.
  // [mahoma(0), abu-bakr(1), ali(2), omar(3), abu-jahl(4), abu-sufyan(5)]
  'batalla-de-badr': {
    steps: [
      // Mahoma en la tienda — pulso de oración
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      // Musulmanes avanzan en cuña
      { pinIdx: 0, offset: [6, 0], scale: 1.12, duration: 2.0, ease: 'power2.out' },
      { pinIdx: 1, offset: [4, -3], scale: 1.05, duration: 2.0, ease: 'power2.out' },
      { pinIdx: 2, offset: [4, 3], scale: 1.05, duration: 2.0, ease: 'power2.out' },
      { pinIdx: 3, offset: [4, 0], scale: 1.05, duration: 2.0, ease: 'power2.out' },
      // Abu Jahl cae (muere — fade muy bajo, encoge — "Faraón de esta umma")
      { pinIdx: 4, offset: [3, 14], opacity: 0.05, scale: 0.6, duration: 2.0, ease: 'power3.in' },
      // Abu Sufyan huye por la costa (drift left + dim)
      { pinIdx: 5, offset: [-18, -3], opacity: 0.4, duration: 2.5, ease: 'power2.in' },
      // Victoria — pulso conjunto
      { pinIdx: 0, scale: 1.18, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, offset: [0, 0], scale: 1, opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 5, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- BATALLA DE UḤUD ---
  // Choque; Mahoma herido (scale shrink temp + jitter); Hamza martirio (Wahsi lo mata);
  // Ali defiende; Abu Sufyan ataca y luego declara victoria parcial.
  // [mahoma(0), hamza-tio(1), wahsi(2), ali(3), abu-sufyan(4)]
  'batalla-de-uhud': {
    steps: [
      // Choque inicial — todos avanzan
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'power2.out' },
      { pinIdx: 1, offset: [3, 0], scale: 1.12, duration: 1.5, ease: 'power2.out' },
      { pinIdx: 3, offset: [3, 0], scale: 1.08, duration: 1.5, ease: 'power2.out' },
      { pinIdx: 4, offset: [-3, 0], scale: 1.1, duration: 1.5, ease: 'power2.out' },
      // Wahsi (asesino) avanza hacia Hamza (oculto, espera)
      { pinIdx: 2, offset: [-5, 0], opacity: 0.9, duration: 1.5, ease: 'power2.in' },
      // Hamza cae mártir (Asad Allah — drop + fade)
      { pinIdx: 1, offset: [3, 14], opacity: 0.1, scale: 0.65, duration: 2.0, ease: 'power3.in' },
      // Wahsi se retira tras matarlo
      { pinIdx: 2, offset: [10, -3], opacity: 0.5, duration: 1.8, ease: 'sine.inOut' },
      // Mahoma herido — jitter + scale shrink temporal
      { pinIdx: 0, offset: [1, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 4], scale: 0.88, opacity: 0.75, duration: 1.5, ease: 'power2.in' },
      // Ali protege al Profeta (se acerca, pulsa)
      { pinIdx: 3, offset: [0, 2], scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      // Abu Sufyan declara victoria parcial
      { pinIdx: 4, scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      // Mahoma se recupera (sobrevive)
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- BATALLA DEL FOSO (Khandaq) ---
  // Defensa: todos bajan a la trinchera (offset down); Salmán estratega pulsa;
  // Abu Sufyan asedia y se retira tras la tormenta.
  // [mahoma(0), salman-el-persa(1), abu-sufyan(2)]
  'batalla-del-foso': {
    steps: [
      // Salmán propone la idea (pulso de inspiración)
      { pinIdx: 1, scale: 1.18, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Defensores cavan la trinchera (offset down)
      { pinIdx: 0, offset: [0, 6], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 6], scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      // Mahoma cava personalmente — pulso de trabajo (jitter rítmico)
      { pinIdx: 0, offset: [2, 6], duration: 0.4, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-2, 6], duration: 0.4, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 6], duration: 0.4 },
      // Abu Sufyan asedia desde fuera (avanza pero no entra)
      { pinIdx: 2, offset: [-6, -3], scale: 1.1, opacity: 1, duration: 2.0, ease: 'power2.in' },
      // Asedio largo — sostenido (defensores firmes)
      { pinIdx: 0, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Tormenta — Abu Sufyan se retira (drift left, opacity dim)
      { pinIdx: 2, offset: [-20, -5], opacity: 0.3, duration: 3.0, ease: 'power3.in' },
      // Defensores suben de la trinchera (victoria defensiva)
      { pinIdx: 0, offset: [0, 0], scale: 1.1, duration: 2.0, ease: 'sine.out' },
      { pinIdx: 1, offset: [0, 0], scale: 1.05, duration: 2.0, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- TRATADO DE ḤUDAYBIYYA ---
  // Mahoma firme y calmado (pulso pacífico); Abu Sufyan/Quraysh aceptan (encoge sumisión).
  // [mahoma(0), abu-sufyan(1)]
  'tratado-de-hudaibiya': {
    steps: [
      // Mahoma firme — pulso calmado, expansivo (1.400 peregrinos en ihram)
      { pinIdx: 0, scale: 1.12, duration: 2.5, ease: 'sine.inOut' },
      // Abu Sufyan negocia desde una posición defensiva (jitter dubitativo)
      { pinIdx: 1, offset: [1, 0], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-1, 0], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.3 },
      // Mahoma mantiene la calma (tregua de 10 años)
      { pinIdx: 0, scale: 1.08, duration: 2.0, ease: 'sine.inOut' },
      // Quraysh aceptan — Abu Sufyan baja la guardia (encoge ligeramente)
      { pinIdx: 1, scale: 0.92, opacity: 0.85, duration: 2.5, ease: 'sine.inOut' },
      // Apertura (fath) — Mahoma scale up sutil pero firme
      { pinIdx: 0, scale: 1.15, duration: 2.0, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- CONQUISTA DE LA MECA ---
  // Mahoma + Ali entran triunfales (scale up); Abu Sufyan se somete (encoge + offset down).
  // [mahoma(0), ali(1), abu-sufyan(2)]
  'conquista-de-meca': {
    steps: [
      // Abu Sufyan llega al campamento musulmán la víspera (drift hacia ellos)
      { pinIdx: 2, offset: [-5, 0], scale: 0.95, duration: 2.0, ease: 'sine.inOut' },
      // Abu Sufyan abraza el Islam (encoge en sumisión)
      { pinIdx: 2, scale: 0.85, offset: [0, 6], opacity: 0.8, duration: 2.5, ease: 'sine.inOut' },
      // Mahoma entra triunfal (scale up grande)
      { pinIdx: 0, scale: 1.2, duration: 2.5, ease: 'power2.out' },
      // Ali acompaña (rompe ídolos — pulsa fuerte)
      { pinIdx: 1, scale: 1.12, duration: 2.0, ease: 'sine.inOut' },
      // Pulso de purificación de la Kaaba (los dos brillan)
      { pinIdx: 0, scale: 1.15, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.1, duration: 1.5, ease: 'sine.inOut' },
      // Amnistía general — Abu Sufyan ilumina (su casa, refugio)
      { pinIdx: 2, opacity: 1, scale: 0.95, duration: 1.8, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- PEREGRINACIÓN DE DESPEDIDA ---
  // Mahoma solo (único pin); pulso final majestuoso, después suave fade premonitorio.
  // [mahoma(0)]
  'peregrinacion-de-despedida': {
    steps: [
      // Pulso de gran momento (Sermón en Arafat — 100.000 peregrinos)
      { pinIdx: 0, scale: 1.25, duration: 3.0, ease: 'power2.out' },
      // Sostenido (testamento moral)
      { pinIdx: 0, scale: 1.18, duration: 2.0, ease: 'sine.inOut' },
      // Segundo pulso ("Hoy he perfeccionado vuestra religión")
      { pinIdx: 0, scale: 1.28, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.15, duration: 1.5, ease: 'sine.inOut' },
      // Suave fade premonitorio (la muerte se acerca — pocos meses después)
      { pinIdx: 0, scale: 1, opacity: 0.85, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- MUERTE DE MAHOMA ---
  // Mahoma asciende espiritualmente (offset up + fade + scale shrink etéreo);
  // Aisha lo sostiene; Abu Bakr asume liderazgo; Ali lava el cuerpo; Fatima duelo.
  // [mahoma(0), aisha(1), abu-bakr(2), ali(3), fatima(4)]
  'muerte-de-mahoma': {
    steps: [
      // Mahoma enferma (palidece, encoge ligeramente)
      { pinIdx: 0, scale: 0.95, opacity: 0.8, duration: 2.0, ease: 'sine.inOut' },
      // Aisha lo cuida (se acerca, sostiene)
      { pinIdx: 1, offset: [-3, 0], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Mahoma reposa en el pecho de Aisha — ascensión espiritual (offset up + fade)
      { pinIdx: 0, offset: [0, -10], scale: 0.85, opacity: 0.3, duration: 3.5, ease: 'power2.in' },
      // Aisha aguanta el cuerpo (pulso de dolor contenido)
      { pinIdx: 1, scale: 1.08, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      // Mahoma final (apenas visible — partió)
      { pinIdx: 0, offset: [0, -15], opacity: 0.1, scale: 0.82, duration: 2.0, ease: 'power2.in' },
      // Abu Bakr toma el discurso ("quien adoraba a Muhammad...") — pulso de liderazgo
      { pinIdx: 2, scale: 1.15, opacity: 1, duration: 2.0, ease: 'sine.out' },
      // Ali lava el cuerpo (se acerca al Profeta, pulso solemne)
      { pinIdx: 3, offset: [3, -3], scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      // Fatima duelo (encoge, fade — única hija sobreviviente, morirá meses después)
      { pinIdx: 4, scale: 0.9, opacity: 0.6, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },
};

export default REVELACION;
