import type { Cue } from '../narrationCues';

/**
 * Cues for "Infancia con Āmina y Ḥalīma".
 * Pins: mahoma(0), halima(1), amina-madre(2). Escenario: La Meca [625, 460] y desierto de Banū Saʿd.
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // Ovejas y ganado — prosperidad de Ḥalīma (familia prospera con el niño)
  { match: /ovejas gordas|leche abundante|familia prosper|ganado|animales.{0,15}multiplic/i,
    cueId: 'fx:goat-herd', data: { position: [626, 462] } },

  // Camello — beduinos del desierto, transporte de la nodriza
  { match: /Ban[ūu] Sa[ʿ']?d|camellos.{0,15}(nodriza|beduina)|jum[ae]nta|monta.{0,15}beduina/i,
    cueId: 'fx:camel-train', data: { position: [625, 460] } },

  // Desierto — calor del Hiyaz
  { match: /desierto|aire puro|estepa|estepa del Hiyaz|calor.{0,15}desierto/i,
    cueId: 'fx:heat-shimmer' },

  // Agua — lluvia que multiplica (bendición agrícola)
  { match: /lluvia|irrigaci[oó]n|pastos verdes|pozos|agua.{0,15}abund/i,
    cueId: 'fx:rain', data: { position: [625, 460] } },

  // Apertura del pecho — ángel angélico
  { match: /apertura del pecho|shaqq a[ṣs]-[ṣs]adr|purificaci[oó]n angélica|coraz[oó]n.{0,20}purific|abrieron.{0,15}pecho|[áa]ngeles?.{0,20}(abren|extra)/i,
    cueId: 'fx:angel-descent', data: { position: [625, 460] } },

  // Viento del desierto
  { match: /viento.{0,15}desierto|brisa.{0,10}arena|simún/i,
    cueId: 'fx:wind-streaks' },

  // Polvo del Hiyaz — vida nómada
  { match: /desierto|caravana familiar|vivir en el desierto/i,
    cueId: 'fx:dust-burst', data: { position: [625, 460] } },

  // ── Pasada 2: narrativa ──────────────────────────────────────────────

  // Mahoma niño
  { match: /ni[ñn]o|infancia|huérfano|pocos meses|cuatro o cinco a[ñn]os/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Ḥalīma la nodriza beduina
  { match: /[ḤH]al[īi]ma|nodriza|beduina|crianza/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Āmina recupera al niño
  { match: /[ĀaA]mina|madre|recibe al ni[ñn]o de vuelta|reuni[oó]n con la madre/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Halo divino sobre el niño
  { match: /milagrosamente|prosper[oó]|bendici[oó]n|signos divinos|Sura Al-Inshir[āa][ḥh]/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Luz divina de prosperidad sobre Ḥalīma
  { match: /familia prosper|leche abundante|ovejas gordas|bendici[oó]n sobre Ḥal[īi]ma/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Amanecer — infancia plácida, comienzos del día
  { match: /al amanecer|alba|amaneci[oó]|mañana.{0,15}desierto/i,
    cueId: 'fx:dawn-break' },

  // Campo estelar — noches en el desierto beduino
  { match: /noche.{0,15}desierto|bajo las estrellas|cielo estrellado|noche beduina/i,
    cueId: 'fx:starfield-shimmer' },
];

export default CUES;
