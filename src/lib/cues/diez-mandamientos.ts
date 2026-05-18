import type { Cue } from '../narrationCues';

/**
 * Cues for "Los Diez Mandamientos".
 * Pins: moises(0), aaron(1), dios(2).
 */
const CUES: Cue[] = [
  // Israel llega al Sinaí
  { match: /llegaron.{0,15}Sina[íi]|monte santo|tres meses despu[ée]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Truenos, relámpagos, tormenta sobre el monte
  { match: /truenos|rel[áa]mpagos|trompeta.{0,10}fuerte|sonido de trompeta/i, cueId: 'fx:lightning-strike', data: { from: [550, 370], to: [550, 425] } },
  // Nube espesa, humo, fuego en el monte
  { match: /nube espesa|humo|humeaba|fuego sobre el monte|Yahveh.{0,15}descend.{0,15}fuego/i, cueId: 'fx:smoke-rise', data: { position: [550, 420] } },
  // El monte tiembla
  { match: /monte tiembla|tembl[óo] el monte|se estremec|temblaba|monte.{0,10}desintegr|reducido a polvo/i, cueId: 'fx:earthquake-shake', data: { position: [550, 425] } },
  // Las tablas de piedra
  { match: /tablas de piedra|aseret ha-dibrot|diez palabras|alwah|tablas.{0,10}(ley|decalogo)/i, cueId: 'fx:stone-tablets', data: { position: [550, 422] } },
  // Yahveh / teofanía / halo divino
  { match: /gloria de Yahveh|teofan[íi]a|presencia divina|Dios.{0,15}desciende|Yo soy Yahveh tu Dios/i, cueId: 'fx:halo-divine', data: { pinIdx: 2 } },
  // Decálogo / escritura de la ley
  { match: /no tendr[áa]s otros dioses|no har[áa]s imagen|no matar[áa]s|honra a tu padre|sabbath|santifica el s[áa]bado/i, cueId: 'fx:scroll-unfurl', data: { position: [550, 425] } },
  // Pueblo aterrorizado pide mediador
  { match: /pueblo.{0,15}(aterroriz|temer|aleja)|habla t[úu] con nosotros|no hable Dios.{0,15}nosotros/i, cueId: 'fx:character-recede', data: { position: [555, 430] } },
];

export default CUES;
