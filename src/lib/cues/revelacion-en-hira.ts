import type { Cue } from '../narrationCues';

/**
 * Cues for "La primera revelación en la cueva de Hira".
 * Pins: mahoma(0), gabriel(1), khadija(2), waraqa(3). Escenario: Jabal an-Nūr / Hira [625, 459].
 * CUMBRE — 20-30 cues.
 * NOTA: 'cueva-hira' es scene-object → usar fx:animate-scene-object para la cueva/monte.
 */
const CUES: Cue[] = [
  // Apertura cinematográfica — negro antes del alba (Mahoma lleva meses meditando)
  { match: /meses.{0,20}(meditaci[oó]n|retiro|contempla)|retiros anuales en Hira|noche del 17 de Ramad[āa]n|antes del amanecer/i, cueId: 'fx:fade-from-black', data: {} },
  // Campo de estrellas — noche de Ramadán, 610 d.C.
  { match: /noche.{0,20}Ramad[āa]n|a[ñn]o 610|Laylat al-Qadr|noche estrellada|cielo nocturno|catorce de Ramad[āa]n/i, cueId: 'fx:starfield-rotate', data: {} },
  // Cueva de Hira animada — scene-object
  { match: /cueva.{0,15}(Hira|[ḤH]ir[āa']?)|Jabal an-N[ūu]r|Jabal al-N[ūu]r|monte de la Luz|monte sagrado|gruta de la luz/i, cueId: 'fx:animate-scene-object', data: { id: 'cueva-hira', kind: 'pulse' } },
  // Aparición del ángel Gabriel/Yibril — descenso angélico sobre la cueva
  { match: /Gabriel|Yibr[ií]l|figura luminosa|[áa]ngel.{0,18}(aparec|irrumpi|abraz)|N[āa]m[ūu]s/i, cueId: 'fx:angel-descent', data: { position: [625, 459] } },
  // Formación angélica — luz que llena la cueva
  { match: /luz.{0,20}(llen[oó]|inund[oó]|ceg[oó]|brillant)|resplandor.{0,20}cueva|claridad cegadora|luz cegadora/i, cueId: 'fx:angel-formation', data: {} },
  // Mahoma en la cueva — protagonista emerge
  { match: /Mahoma|Muhammad|Muḥammad|el Profeta|Profeta/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Gabriel aprieta fuerte — abrazo sobrenatural (3 veces)
  { match: /abraz[oó]|oprim[ií][oó]|presion[oó] fuerte|apretar|tres veces|comprimi[oó]/i, cueId: 'fx:earthquake-shake', data: { pinIdx: 0, intensity: 0.4 } },
  // Primer "Iqraʾ" — versículos del Corán se despliegan como pergamino
  { match: /Iqra[ʾ']?|recita|primer.{0,12}vers[ií]culo|Sura 96|Al-[ʿʾ]?Alaq|co[áa]gulo|primera revelaci[óo]n/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 459] } },
  // Halo divino — la revelación desciende
  { match: /revelaci[oó]n|wa[ḥh]y|Laylat al-Qadr|Noche del Destino|fatra|luz divina/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Rayo de luz divina — primera palabra de Dios al Profeta
  { match: /primera palabra|Dios habl[oó]|primer mandato divino|voz de Dios|al-wahyu|primer mensaje/i, cueId: 'fx:divine-light-beam', data: {} },
  // Khadīja lo cubre con el manto
  { match: /Khad[īi]ja|c[úu]breme|envolvi[oó].{0,20}manto|primera confidente|lo calm/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Waraqa el primo cristiano — confirma la profecía
  { match: /Waraqa|primo cristiano|reconoci[oó].{0,18}profeta|confirmador|este es el N[āa]m[ūu]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Resplandor sobre Mahoma — vocación profética
  { match: /vocaci[oó]n prof[eé]tica|Mensajero de Dios|Mensajero de All[āa]h|profeta de Dios/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffe6a0' } },
  // Segundo descenso angélico — Sura Al-Muddaththir tras la fatra
  { match: /Al-Muddaththir|cubierto con manto|segunda revelaci[oó]n|fatra al-wa[ḥh]y/i, cueId: 'fx:angel-descent', data: { position: [625, 459] } },
  // Temblor del Profeta — escalofríos, terror sagrado
  { match: /tembland[ao]|escalofr[íi]os|temor sagrado|zammilun[íi]|cubridme|tiritaba/i, cueId: 'fx:earthquake-shake', data: { pinIdx: 0, intensity: 0.3 } },
  // Pergamino del Corán — comienza la revelación completa
  { match: /Cor[áa]n.{0,20}(comienza|inicia|empieza|primeras palabras)|al-kit[āa]b|el Libro revelado/i, cueId: 'fx:scroll-unfurl', data: { position: [620, 450] } },
  // El camino de regreso — Mahoma desciende del monte
  { match: /descend[ií][oó].{0,20}monte|baj[oó].{0,20}Hira|regresar.{0,15}Meca|ruta de bajada/i, cueId: 'fx:journey-trace', data: { from: [625, 459], to: [625, 460] } },
  // Radial bloom — apertura del mundo islámico desde este instante
  { match: /se revel[oó]|momento fundacional|instante de la revelaci[oó]n|origen del Islam|610 dC/i, cueId: 'fx:radial-bloom', data: {} },
  // Noche concluye — amanecer sobre La Meca
  { match: /amanecer.{0,20}La Meca|alba.{0,15}Meca|amaneci[oó].{0,20}(Meca|ciudad)|nuevas luces del d[íi]a/i, cueId: 'fx:dawn-break', data: {} },
  // Gabriel emerge como figura — pinIdx 1
  { match: /Gabriel.{0,30}(visible|aparece|si se vio|forma humana|revestido)|[áa]ngel visible/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Humo de incienso — ambiente de santuario nocturno
  { match: /incienso|perfume.{0,15}cueva|aroma sacro|s[áa]ndalos|noche de santidad/i, cueId: 'fx:incense-spiral', data: {} },
];

export default CUES;
