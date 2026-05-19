import type { Cue } from '../narrationCues';

/**
 * Cues for "Fundación de la comunidad de Medina".
 * Pins: mahoma(0), ansar-medinenses(1). Escenario: Medina [620, 440].
 */
const CUES: Cue[] = [
  // Mahoma funda la primera comunidad
  { match: /Mahoma|el Profeta|fundador|funda la primera comunidad|umma/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Anṣār hermanados con Muhājirūn
  { match: /An[ṣs][āa]r|auxiliadores|Muh[āa]jir[ūu]n|hermandad|mu[ʾ']?[āa]kh[āa][āa]?h|hermanos jurados/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Constitución de Medina — pergamino desplegado
  { match: /Constituci[oó]n de Medina|documento de Medina|[ṣs]a[ḥh][īi]fat al-Mad[īi]na|pacto/i, cueId: 'fx:scroll-unfurl', data: { position: [620, 440] } },
  // Halo divino sobre la umma naciente (Sura 3:110)
  { match: /Sura 3:110|mejor comunidad sacada|umma sacada para la gente|primera umma|umma incipiente/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Polvo de la construcción de la Mezquita del Profeta
  { match: /Mezquita del Profeta|construye.{0,15}mezquita|primera mezquita|levantar la mezquita|adobes/i, cueId: 'fx:dust-burst', data: { position: [620, 440] } },
  // Resplandor de la fundación
  { match: /Yathrib pasa a llamarse Medina|fundaci[oó]n|comunidad pol[ií]tica|comunidad religiosa|convivencia con jud[íi]os/i, cueId: 'fx:glow-pulse', data: { position: [620, 440], color: '#ffd27a' } },
  // Adhán — primera llamada a la oración (trumpet/shofar como proxy)
  { match: /adh[āa]n|primera llamada a la oraci[oó]n|Bil[āa]l|Allahu Akbar|llamado al rezo/i, cueId: 'fx:trumpet-blast', data: { position: [620, 440] } },
  // Aposento del Profeta — palmera de Medina (ambient)
  { match: /palmas datileras|hojas de palma|oasis de Medina|jard[ií]n del Profeta/i, cueId: 'fx:dawn-break' },
];

export default CUES;
