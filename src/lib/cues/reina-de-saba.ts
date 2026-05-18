import type { Cue } from '../narrationCues';

/**
 * Cues for "La reina de Saba visita a Salomón".
 * Pins: salomon(0), reina-de-saba(1).
 */
const CUES: Cue[] = [
  // Caravana desde Saba — viaje desde el sur
  { match: /caravana|camellos|120 talentos|oro|especias|piedras preciosas|viaja a Jerusal[eé]n/i, cueId: 'fx:journey-trace', data: { from: [640, 480], to: [582, 363], color: '#cfa14c' } },
  // La reina aparece — Bilqis / Makeda
  { match: /reina de Saba|Bilq[īi]s|Makeda|reina del sur|reino sabeo|Yemen|Etiop[ií]a/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Salomón anfitrión — pulso real
  { match: /Salom[oó]n .{0,16}(recibe|respond|corte)|Sulaym[āa]n|sabidur[ií]a|enigmas|jidot|preguntas dif[ií]ciles/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Abubilla Hudhud trae la noticia (Corán)
  { match: /Hudhud|abubilla|trono magn[ií]fico|adoran al sol|carta a Bilqis/i, cueId: 'fx:dove-flight', data: { position: [610, 400] } },
  // Trono trasladado milagrosamente
  { match: /trono .{0,12}(trasladad|aparece|conocimiento del Libro|parpadeo)|ifrit|Asaf hijo de Berequ[ií]as/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Riquezas/regalos — lámpara dorada figurativa
  { match: /120 talentos|oro|especias|piedras preciosas|riquezas|tesoros|regalos m[áa]gn[ií]ficos|incienso/i, cueId: 'fx:lamp-glow', data: { position: [582, 363] } },
  // Suelo de cristal — el momento icónico del Corán
  { match: /suelo de cristal|palacio pavimentado|cristal pulido|levant[oó] el vestido|estanque de agua/i, cueId: 'fx:water-wave', data: { position: [582, 363] } },
  // Pozo / encuentro de las cortes — fuente del encuentro
  { match: /encuentro|recepci[oó]n|cort[eé]s|le ofreci[oó] hospedaje|recibida|le dio audiencia/i, cueId: 'fx:well', data: { position: [583, 363] } },
  // Conversión — me someto al Señor de los mundos
  { match: /me someto|Se[ñn]or de los mundos|bendito sea Yahveh|conversi[oó]n|injusta conmigo|profesi[oó]n .{0,8}fe/i, cueId: 'fx:halo-divine', data: { pinIdx: 1 } },
  // Vuelve a su tierra
  { match: /vuelve a su tierra|regresa a Saba|sin aliento|todo lo que ella deseaba/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
];

export default CUES;
