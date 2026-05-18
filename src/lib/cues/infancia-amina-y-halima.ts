import type { Cue } from '../narrationCues';

/**
 * Cues for "Infancia con Āmina y Ḥalīma".
 * Pins: mahoma(0), halima(1), amina-madre(2). Escenario: La Meca [625, 460] y desierto de Banū Saʿd.
 */
const CUES: Cue[] = [
  // Mahoma niño
  { match: /ni[ñn]o|infancia|huérfano|pocos meses|cuatro o cinco a[ñn]os/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Ḥalīma la nodriza beduina
  { match: /[ḤH]al[īi]ma|nodriza|Ban[ūu] Sa[ʿ']?d|beduina|crianza/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Āmina recibe al niño de vuelta
  { match: /[ĀaA]mina|madre|recibe al ni[ñn]o de vuelta|reuni[oó]n con la madre/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // El desierto — polvo del Hiyaz
  { match: /desierto|caravana familiar|vivir en el desierto|aire puro|estepa/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
  // Apertura del pecho — shaqq aṣ-ṣadr, milagro angélico
  { match: /apertura del pecho|shaqq a[ṣs]-[ṣs]adr|purificaci[oó]n angélica|coraz[oó]n.{0,20}purific|abrieron.{0,15}pecho|[áa]ngeles?.{0,20}(abren|extra)/i, cueId: 'fx:angel-descent', data: { position: [625, 460] } },
  // Halo divino sobre el niño
  { match: /milagrosamente|prosper[oó]|bendici[oó]n|signos divinos|Sura Al-Inshir[āa][ḥh]/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Resplandor sobre la nodriza
  { match: /familia prosper|leche abundante|ovejas gordas|bendici[oó]n sobre Ḥal[īi]ma/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#ffe6a0' } },
];

export default CUES;
