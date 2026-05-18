import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Mahoma".
 * Pins: mahoma(0), abdullah-padre(1), amina-madre(2), abdulmuttalib(3). Escenario: La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Mahoma nace — emerge el protagonista
  { match: /nace|nacimiento|reci[eé]n nacido|niño|lunes 12 de Rab[īi][ʿ']?|huérfano/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Halo divino sobre el recién nacido
  { match: /se[ñn]ales celestiales|sue[ñn]os.{0,15}anunciador|voces.{0,15}anunc|signos|al[áa]bado|Muḥammad significa/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Āmina la madre
  { match: /[ĀaA]mina|joven viuda|madre|Ban[ūu] Zuhra/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // ʿAbd Allāh — padre fallecido antes del parto
  { match: /[ʿ']?Abd All[āa]h|padre.{0,20}(muerto|fallec|hab[íi]a muerto)|viaje comercial a Yathrib/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // ʿAbd al-Muṭṭalib el abuelo lleva al niño a la Kaaba
  { match: /[ʿ']?Abd al-Mu[ṭt][ṭt]alib|abuelo paterno|jefe del clan|custodio de la Kaaba|recibe al ni[ñn]o/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Año del Elefante — expedición de Abraha (fracaso milagroso)
  { match: /A[ñn]o del Elefante|[ʿ']?[āa]m al-f[ií]l|Abraha|expedici[oó]n abisinia|elefante de guerra|Sura 105|Sura Al-F[īi]l/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
  // Resplandor sobre la Kaaba
  { match: /Kaaba|santuario|nombra.{0,15}Muḥammad|Mu[ḥh]ammad/i, cueId: 'fx:glow-pulse', data: { position: [625, 460], color: '#ffe6a0' } },
];

export default CUES;
