import type { Cue } from '../narrationCues';

/**
 * Cues for "Conquista pacífica de La Meca".
 * Pins: mahoma(0), ali(1), abu-sufyan(2). Origen: Medina [620, 440] → Destino: La Meca [625, 460].
 * CUMBRE — 20-30 cues.
 * NOTA: 'kaaba' es scene-object → usar fx:animate-scene-object, NO fx:kaaba-pulse.
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
  // Kaaba animada — scene-object (NO fx:kaaba-pulse)
  { match: /Kaaba|santuario.{0,20}(Meca|sagrado)|circunvalaci[oó]n|[ṭt]aw[āa]f|Piedra Negra|al-[ḤH]ajar al-Aswad/i, cueId: 'fx:animate-scene-object', data: { id: 'kaaba', kind: 'pulse' } },
  // Bilāl llama desde lo alto de la Kaaba — el adhan
  { match: /Bil[āa]l.{0,30}(adh[āa]n|alto|Kaaba|proclam|llama)|adh[āa]n.{0,20}Bil[āa]l|primer adh[āa]n/i, cueId: 'fx:trumpet-blast', data: { position: [625, 460] } },
  // Caravana del ejército entrando
  { match: /caravana.{0,15}(ej[eé]rcito|muslim|entr[oó])|marcha.{0,15}victorios|procesión de entrada/i, cueId: 'fx:caravan', data: { from: [622, 455], to: [625, 460] } },
  // Luz del amanecer sobre La Meca — apertura gloriosa
  { match: /amanecer.{0,20}La Meca|alba.{0,15}(Meca|fat[ḥh])|luz del nuevo d[íi]a|al romper el alba|rayos del sol/i, cueId: 'fx:dawn-break', data: {} },
  // Bloom radial — momento de la apertura (Fath)
  { match: /momento del Fat[ḥh]|instant[eé].{0,15}(apertura|victoria)|victoria definitiva|gran apertura/i, cueId: 'fx:radial-bloom', data: {} },
  // Relámpago del pergamino — amnistía general proclamada
  { match: /amnist[íi]a.{0,20}(general|proclama)|proclamaci[oó]n.{0,15}perd[oó]n|sois todos libres|perdono a todos/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 460] } },
  // Luz divina — el santuario liberado del politeísmo
  { match: /monote[íi]smo restaurado|Allah.{0,20}(ún|único).{0,20}(Meca|santuario)|dios único sobre la Kaaba|politeísmo erradicado/i, cueId: 'fx:divine-light-beam', data: {} },
  // Espadas vainadas — conquista sin sangre
  { match: /sin sangre|conquista pac[íi]fica|espadas vainadas|no hubo batalla|rendici[oó]n.{0,15}pac[íi]fica/i, cueId: 'fx:glow-pulse', data: { position: [625, 460], color: '#c0ffb0' } },
  // Humo de los ídolos destruidos — politeísmo que se extingue
  { match: /destrucci[oó]n.{0,15}[íi]dolos|[íi]dolos quemados|estatuas rotas|dioses de barro|ídolos hechos polvo/i, cueId: 'fx:smoke-rise', data: { position: [625, 460] } },
  // Flash blanco — apertura triunfal
  { match: /el Profeta entró victoriosa|entrada triunfal.{0,15}(Profeta|Mahoma)|Fat[ḥh] Makkah/i, cueId: 'fx:flash-white', data: {} },
  // Resplandor sobre la Kaaba purificada
  { match: /Kaaba purificada|limpia de [íi]dolos|santuario puro|al servicio.{0,15}Allah/i, cueId: 'fx:glow-pulse', data: { position: [625, 460], color: '#ffd27a' } },
  // Resplandor sobre Mahoma — victoria humilde
  { match: /cabeza.{0,15}(inclina|agacha|baja)|humildad.{0,15}victoria|sin soberbia|entró humilde/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffe6a0' } },
  // Polvo de la rendición de Quraysh
  { match: /Quraysh.{0,15}(rinden|capitula|deponen|se entregan)|rendici[oó]n Quraysh|Meca capitula/i, cueId: 'fx:dust-burst', data: { position: [623, 460] } },
];

export default CUES;
