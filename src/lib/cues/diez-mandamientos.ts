import type { Cue } from '../narrationCues';

/**
 * Cues for "Los Diez Mandamientos".
 * Pins: moises(0), aaron(1), dios(2).
 * CUMBRE — objetivo 20-30 cues.
 * Scene-objects declarados: 'tabletas'
 *
 * REGLA #1: 'tabletas' ya es scene-object → NO disparamos fx:stone-tablets;
 * animamos con fx:animate-scene-object {id:'tabletas'}.
 */
const CUES: Cue[] = [
  // ── Pasada 1 — sustantivos del nounDictionary ────────────────────────────

  // Israel llega al Sinaí
  { match: /llegaron.{0,15}Sina[íi]|monte santo|tres meses despu[ée]s|Sinaí/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Nube espesa / Shekina sobre el monte
  { match: /nube espesa|nube de gloria|Shekin[áa]|kabod Yahveh|Yahveh.{0,15}descend.{0,15}nube/i,
    cueId: 'fx:cloud-pillar', data: { position: [550, 420] } },

  // Humo / fuego en el monte — teofanía
  { match: /humo|humeaba|fuego sobre el monte|Yahveh.{0,15}descend.{0,15}fuego|monte.{0,15}ardía/i,
    cueId: 'fx:smoke-rise', data: { position: [550, 420] } },

  // Truenos — kol — voz divina
  { match: /truenos|kol|voces del cielo|trueno.{0,15}Sina[íi]/i,
    cueId: 'fx:thunder-flash' },

  // Relámpagos — tormenta sobre el monte
  { match: /rel[áa]mpagos|trompeta.{0,10}fuerte|sonido de trompeta|shofar.{0,10}Sinaí/i,
    cueId: 'fx:lightning-strike', data: { from: [550, 370], to: [550, 425] } },

  // Tormenta eléctrica completa
  { match: /tormenta.{0,15}(Sina[íi]|monte)|gran tormenta|tormenta divina/i,
    cueId: 'fx:lightning-storm' },

  // El monte tiembla — terremoto sagrado
  { match: /monte tiembla|tembl[óo] el monte|se estremec|temblaba|monte.{0,10}desintegr|reducido a polvo/i,
    cueId: 'fx:earthquake-shake', data: { position: [550, 425] } },

  // Terremoto mayor
  { match: /toda la tierra tembl[óo]|gran temblor.{0,10}Sina[íi]|sacudi[óo].{0,15}monte/i,
    cueId: 'fx:earthquake-major' },

  // Fuego de Dios — columna
  { match: /columna de fuego|fuego.{0,15}desde el cielo|Yahveh.{0,15}descendi[óo].{0,15}fuego/i,
    cueId: 'fx:pillar-of-fire', data: { position: [550, 420] } },

  // Las tablas de piedra — anima 'tabletas' ya en escena (REGLA #1)
  { match: /tablas de piedra|aseret ha-dibrot|diez palabras|alwah|tablas.{0,10}(ley|decalogo)/i,
    cueId: 'fx:animate-scene-object', data: { id: 'tabletas', kind: 'glow', duration: 2.4 } },

  // Escritura de Dios — escritura divina en las tablas
  { match: /escritura de Dios|escrito con el dedo|el dedo de Dios escribi[óo]|khataba All[āa]h/i,
    cueId: 'fx:divine-hand', data: { position: [550, 422] } },

  // Yahveh / teofanía / halo divino
  { match: /gloria de Yahveh|teofan[íi]a|presencia divina|Dios.{0,15}desciende|Yo soy Yahveh tu Dios/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 2 } },

  // Moisés sube al monte — ascensión
  { match: /Mois[ée]s sube|subir al monte|ascendi[óo]|subi[óo].{0,15}Sina[íi]|adentro de la nube/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Moisés en la cima — cuarenta días
  { match: /cuarenta d[íi]as|40 d[íi]as.{0,15}monte|cuarenta noches|en la cima/i,
    cueId: 'fx:fog-roll' },

  // Decálogo — los mandamientos
  { match: /no tendr[áa]s otros dioses|no har[áa]s imagen|no matar[áa]s|honra a tu padre|sabbath|santifica el s[áa]bado/i,
    cueId: 'fx:scroll-unfurl', data: { position: [550, 425] } },

  // Más mandamientos
  { match: /no robar[áa]s|no dar[áa]s falso testimonio|no codiciar[áa]s|no cometer[áa]s adulterio/i,
    cueId: 'fx:scroll-unfurl', data: { position: [551, 426] } },

  // Pueblo aterrorizado pide mediador
  { match: /pueblo.{0,15}(aterroriz|temer|aleja)|habla t[úu] con nosotros|no hable Dios.{0,15}nosotros/i,
    cueId: 'fx:character-recede', data: { position: [555, 430] } },

  // Aarón y ancianos esperan abajo
  { match: /Aar[óo]n.{0,15}(espera|abajo)|ancianos.{0,15}abajo|setenta ancianos|Nadab|Abih[úu]/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // Voz del ángel / mensajero divino
  { match: /[áa]ngel.{0,15}(Sina[íi]|monte|nube)|mensajero divino.{0,15}ley/i,
    cueId: 'fx:angel-descent', data: { position: [550, 418] } },

  // Shofar — trompeta de Dios
  { match: /sonido de trompeta|shofar.{0,15}fuerte|trompeta.{0,15}muy fuerte|voz del shofar/i,
    cueId: 'fx:trumpet-blast', data: { position: [550, 418] } },

  // ── Pasada 3 — cinematográficos de cumbre ───────────────────────────────

  // Flash blanco — revelación directa
  { match: /Yo soy Yahveh|Yo soy tu Dios|An[āa] All[āa]h|no hay otro dios fuera de M[íi]/i,
    cueId: 'fx:flash-white' },

  // Radial bloom — recepción de la Torá
  { match: /Mois[ée]s baj[óo]|descendi[óo].{0,15}tablas|con las tablas en sus manos|rostro.{0,15}brillaba/i,
    cueId: 'fx:radial-bloom', data: { position: [550, 425] } },

  // Vignette — la cumbre del Sinaí
  { match: /cima del monte|Mois[ée]s.{0,15}cima|Sina[íi].{0,15}nube|gloria visible/i,
    cueId: 'fx:vignette-pulse' },
];

export default CUES;
