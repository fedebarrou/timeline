import type { Cue } from '../narrationCues';

/**
 * Cues for "Batalla de Uḥud".
 * Pins: mahoma(0), hamza-tio(1), wahsi(2), ali(3), abu-sufyan(4). Escenario: Monte Uḥud, Medina [620, 440].
 */
const CUES: Cue[] = [
  // Mahoma herido
  { match: /Mahoma|el Profeta|herido en el rostro|herido en la cabeza|pierde dos dientes|sangre.{0,15}rostro/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sangre de las heridas del Profeta y mártires
  { match: /sangre|herida|setenta musulmanes mártires|cad[áa]ver|mutilado|hígado.{0,15}devor/i, cueId: 'fx:blood-stain', data: { position: [620, 440] } },
  // Ḥamza muere (mártir)
  { match: /[ḤH]amza.{0,20}(muere|cae|cadáver|mutilad)|León de Dios|Asad All[āa]h|jabalina de Wa[ḥh]sh[īi]|tío del Profeta muere/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Waḥshī asesino
  { match: /Wa[ḥh]sh[īi]|esclavo etíope contratado|lanza.{0,15}[ḤH]amza|asesino de [ḤH]amza/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // ʿAlī protege al Profeta
  { match: /[ʿ']?Al[ií].{0,30}(protege|primera línea|reagrupa|escuda al Profeta)/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Abū Sufyān comandante Quraysh
  { match: /Ab[ūu] Sufy[āa]n|comandante Quraysh|hoy por Badr|hasta el a[ñn]o que viene|declara victoria/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Polvo del combate
  { match: /falda del Monte Uḥud|combate general|desobediencia.{0,15}arqueros|Kh[āa]lid ibn al-Wal[īi]d.{0,20}caballer[ií]a|Jabal ar-Rum[āa]t/i, cueId: 'fx:dust-burst', data: { position: [620, 440] } },
  // Halo divino — lección espiritual (Sura 3:165)
  { match: /Sura 3:165|de vosotros mismos|prueba|ibtil[āa][ʾ']?|fidelidad|lecci[oó]n espiritual|paciencia/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
