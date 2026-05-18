import type { Cue } from '../narrationCues';

/**
 * Cues for "Conquista pacífica de La Meca".
 * Pins: mahoma(0), ali(1), abu-sufyan(2). Origen: Medina [620, 440] → Destino: La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Marcha del ejército Medina → Meca
  { match: /marcha.{0,20}(Meca|ej[eé]rcito)|salida de Medina|diez mil musulmanes|hacia La Meca|Ramad[āa]n del a[ñn]o 8|cuatro columnas/i, cueId: 'fx:journey-trace', data: { from: [620, 440], to: [625, 460] } },
  // Polvo de las columnas marchando
  { match: /columnas|ej[eé]rcito.{0,20}avanz|hogueras|Marr al-[ẒZ]ahr[āa]n|al frente de diez mil/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
  // Mahoma entra como vencedor
  { match: /Mahoma|Profeta|Muḥammad|comandante|cabeza inclinada|humildad/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Ruptura de los 360 ídolos de la Kaaba — corazón del episodio
  { match: /[íi]dolos?|360 [íi]dolos|trescientos sesenta|Hubal|romper.{0,15}[íi]dolo|limpieza de la Kaaba|ha llegado la verdad/i, cueId: 'fx:idol-shatter', data: { position: [625, 460], count: 8 } },
  // ʿAlī rompe el ídolo mayor (Hubal)
  { match: /[ʿ']?Al[ií].{0,20}(hombros|Hubal|derrib|romp)|hombros del Profeta/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Abū Sufyān se convierte la víspera
  { match: /Ab[ūu] Sufy[āa]n.{0,30}(shah[āa]da|Islam|conver|abraz)|líder Quraysh conver/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Halo divino — Kaaba purificada, victoria de la Apertura
  { match: /Sura An-Na[ṣs]r|al-fat[ḥh]|la apertura|santuario consagrado|amnist[íi]a general|sois libres|Bil[āa]l.{0,15}adh[āa]n/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Resplandor sobre la Kaaba
  { match: /Kaaba|santuario|circunvalaci[oó]n|[ṭt]aw[āa]f|Piedra Negra/i, cueId: 'fx:glow-pulse', data: { position: [625, 460], color: '#ffd27a' } },
];

export default CUES;
