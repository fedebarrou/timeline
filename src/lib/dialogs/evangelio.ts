import type { DialogCue } from '../dialogTypes';

/** Char-to-char dialogs for the EVANGELIO era. */
const DIALOGS: Record<string, DialogCue[]> = {
  // ───────────────────────────────────────────────────────────────────────
  // ANUNCIACIÓN — Gabriel saluda a María
  // ───────────────────────────────────────────────────────────────────────
  'anunciacion': [
    {
      match: /salve.{0,10}llena de gracia|el Se[ñn]or es contigo|bendita t[úu]/i,
      speaker: 'angel-anonimo',
      addressee: 'maria',
      text: '¡Salve, llena de gracia! El Señor es contigo; bendita tú entre las mujeres.',
      holdMs: 5500,
    },
    {
      match: /no temas Mar[íi]a|has hallado gracia|concebir[áa]s.{0,15}hijo/i,
      speaker: 'angel-anonimo',
      addressee: 'maria',
      text: 'No temas, María, porque has hallado gracia delante de Dios. Concebirás en tu seno, y darás a luz un hijo, y llamarás su nombre Jesús.',
      holdMs: 7000,
    },
    {
      match: /¿c[óo]mo ser[áa] esto|no conozco var[óo]n|c[óo]mo puede ser/i,
      speaker: 'maria',
      addressee: 'angel-anonimo',
      text: '¿Cómo será esto, si no conozco varón?',
      holdMs: 3800,
    },
    {
      match: /h[áa]gase en m[íi]|sierva del Se[ñn]or|seg[úu]n tu palabra/i,
      speaker: 'maria',
      addressee: 'angel-anonimo',
      text: 'He aquí la sierva del Señor; hágase en mí según tu palabra.',
      holdMs: 5000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // BAUTISMO DE JESÚS — la voz del Padre
  // ───────────────────────────────────────────────────────────────────────
  'bautismo-de-jesus': [
    {
      match: /yo necesito ser bautizado|yo tengo necesidad/i,
      speaker: 'juan-bautista',
      addressee: 'jesus',
      text: 'Yo necesito ser bautizado por ti, ¿y tú vienes a mí?',
      holdMs: 4500,
    },
    {
      match: /deja ahora|cumplir toda justicia|conviene/i,
      speaker: 'jesus',
      addressee: 'juan-bautista',
      text: 'Deja ahora, porque así conviene que cumplamos toda justicia.',
      holdMs: 4800,
    },
    {
      match: /este es mi hijo amado|en quien tengo complacencia/i,
      speaker: 'dios-padre',
      addressee: null,
      text: 'Este es mi Hijo amado, en quien tengo complacencia.',
      holdMs: 5000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // SERMÓN DEL MONTE — las bienaventuranzas
  // ───────────────────────────────────────────────────────────────────────
  'sermon-del-monte': [
    {
      match: /bienaventurados.{0,15}pobres|reino de los cielos/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.',
      holdMs: 5500,
    },
    {
      match: /bienaventurados.{0,15}misericordiosos|alcanzar[áa]n misericordia/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.',
      holdMs: 5000,
    },
    {
      match: /amad a vuestros enemigos|orad por los que/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'Amad a vuestros enemigos, bendecid a los que os maldicen, y orad por los que os ultrajan.',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // TRANSFIGURACIÓN — el monte de la gloria
  // ───────────────────────────────────────────────────────────────────────
  'transfiguracion': [
    {
      match: /bueno.{0,10}estar aqu[íi]|tres enramadas|tabern[áa]culos/i,
      speaker: 'pedro',
      addressee: 'jesus',
      text: 'Señor, bueno es estarnos aquí. Si quieres, haremos aquí tres enramadas: una para ti, otra para Moisés y otra para Elías.',
      holdMs: 6500,
    },
    {
      match: /este es mi hijo amado.{0,10}escuchadle|en quien tengo complacencia.{0,15}o[íi]dle/i,
      speaker: 'dios-padre',
      addressee: 'voz-multitud',
      text: 'Este es mi Hijo amado, en quien tengo complacencia; a él oíd.',
      holdMs: 5200,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // ÚLTIMA CENA — la institución de la eucaristía
  // ───────────────────────────────────────────────────────────────────────
  'ultima-cena': [
    {
      match: /tomad y comed|este es mi cuerpo|partido por vosotros/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'Tomad, comed; esto es mi cuerpo, que por vosotros es partido. Haced esto en memoria de mí.',
      holdMs: 5800,
    },
    {
      match: /sangre.{0,15}alianza|nuevo pacto|c[áa]liz.{0,10}derramad/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama.',
      holdMs: 5500,
    },
    {
      match: /uno de vosotros me entregar[áa]|el que mete.{0,15}plato|conmigo mete la mano/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'De cierto os digo que uno de vosotros me va a entregar.',
      holdMs: 5000,
    },
    {
      match: /antes que.{0,10}gallo|tres veces me negar[áa]s/i,
      speaker: 'jesus',
      addressee: 'pedro',
      text: 'De cierto te digo que esta noche, antes que el gallo cante, me negarás tres veces.',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // GETSEMANÍ — la oración del cáliz
  // ───────────────────────────────────────────────────────────────────────
  'getsemani': [
    {
      match: /padre.{0,10}aparta de m[íi]|que pase de m[íi]|este c[áa]liz/i,
      speaker: 'jesus',
      addressee: 'dios-padre',
      text: 'Padre mío, si es posible, pase de mí esta copa; pero no se haga mi voluntad, sino la tuya.',
      holdMs: 6500,
    },
    {
      match: /no pudisteis velar|esp[íi]ritu.{0,15}dispuesto|carne d[ée]bil/i,
      speaker: 'jesus',
      addressee: 'pedro',
      text: '¿No habéis podido velar conmigo una hora? El espíritu a la verdad está dispuesto, pero la carne es débil.',
      holdMs: 6000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // JUICIOS DE JESÚS — Pilato
  // ───────────────────────────────────────────────────────────────────────
  'juicios-jesus': [
    {
      match: /¿eres t[úu] el rey|¿rey de los jud[íi]os/i,
      speaker: 'pilato',
      addressee: 'jesus',
      text: '¿Eres tú el rey de los judíos?',
      holdMs: 3800,
    },
    {
      match: /mi reino no es de este mundo|reino no fuera|pelear[íi]an mis servidores/i,
      speaker: 'jesus',
      addressee: 'pilato',
      text: 'Mi reino no es de este mundo. Si mi reino fuera de este mundo, mis servidores pelearían para que yo no fuera entregado a los judíos.',
      holdMs: 6500,
    },
    {
      match: /¿qu[ée] es la verdad|qu[ée] es verdad/i,
      speaker: 'pilato',
      addressee: 'jesus',
      text: '¿Qué es la verdad?',
      holdMs: 3200,
    },
    {
      match: /crucif[íi]calo|crucif[íi]quenlo|¡muera!|cruc[íi]fica/i,
      speaker: 'voz-multitud',
      addressee: 'pilato',
      text: '¡Crucifícalo, crucifícalo!',
      holdMs: 3500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // CRUCIFIXIÓN — las siete palabras
  // ───────────────────────────────────────────────────────────────────────
  'crucifixion': [
    {
      match: /padre, perd[óo]nalos|no saben lo que hacen/i,
      speaker: 'jesus',
      addressee: 'dios-padre',
      text: 'Padre, perdónalos, porque no saben lo que hacen.',
      holdMs: 4800,
    },
    {
      match: /hoy estar[áa]s conmigo|en el para[íi]so/i,
      speaker: 'jesus',
      addressee: 'ladron-bueno',
      text: 'De cierto te digo que hoy estarás conmigo en el paraíso.',
      holdMs: 4800,
    },
    {
      match: /mujer.{0,10}he ah[íi].{0,5}hijo|he ah[íi].{0,5}madre/i,
      speaker: 'jesus',
      addressee: 'maria',
      text: 'Mujer, he ahí tu hijo. (Y al discípulo:) He ahí tu madre.',
      holdMs: 5000,
    },
    {
      match: /Dios m[íi]o.{0,10}Dios m[íi]o|¿por qu[ée] me has abandonado|Eli.{0,10}Eli/i,
      speaker: 'jesus',
      addressee: 'dios-padre',
      text: 'Eli, Eli, lama sabactani: Dios mío, Dios mío, ¿por qué me has abandonado?',
      holdMs: 6000,
    },
    {
      match: /consumado es|todo se ha cumplido|tetelestai/i,
      speaker: 'jesus',
      addressee: null,
      text: 'Consumado es.',
      holdMs: 3500,
    },
    {
      match: /en tus manos|encomiendo mi esp[íi]ritu/i,
      speaker: 'jesus',
      addressee: 'dios-padre',
      text: 'Padre, en tus manos encomiendo mi espíritu.',
      holdMs: 4500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // RESURRECCIÓN — encuentros del Resucitado
  // ───────────────────────────────────────────────────────────────────────
  'resurreccion': [
    {
      match: /¿por qu[ée] busc[áa]is.{0,10}vivo.{0,10}muertos|no est[áa] aqu[ií]|ha resucitado/i,
      speaker: 'angel-anonimo',
      addressee: 'voz-multitud',
      text: '¿Por qué buscáis entre los muertos al que vive? No está aquí, sino que ha resucitado.',
      holdMs: 5800,
    },
    {
      match: /Mar[íi]a|maestro|raboni/i,
      speaker: 'jesus',
      addressee: 'maria-magdalena',
      text: '¡María!',
      holdMs: 2800,
    },
    {
      match: /paz a vosotros|recibid el esp[íi]ritu santo/i,
      speaker: 'jesus',
      addressee: 'voz-multitud',
      text: 'Paz a vosotros. Como me envió el Padre, así también yo os envío.',
      holdMs: 5000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // CONVERSIÓN DE PABLO — la luz en el camino a Damasco
  // ───────────────────────────────────────────────────────────────────────
  'conversion-de-pablo': [
    {
      match: /Saulo.{0,5}Saulo|¿por qu[ée] me persigues/i,
      speaker: 'jesus',
      addressee: 'pablo',
      text: 'Saulo, Saulo, ¿por qué me persigues?',
      holdMs: 4200,
    },
    {
      match: /¿qui[ée]n eres.{0,10}Se[ñn]or|¿qui[ée]n eres t[úu]/i,
      speaker: 'pablo',
      addressee: 'jesus',
      text: '¿Quién eres, Señor?',
      holdMs: 3200,
    },
    {
      match: /yo soy Jes[úu]s|a quien t[úu] persigues|dura cosa.{0,10}aguij[óo]n/i,
      speaker: 'jesus',
      addressee: 'pablo',
      text: 'Yo soy Jesús, a quien tú persigues. Dura cosa te es dar coces contra el aguijón.',
      holdMs: 6000,
    },
  ],
};

export default DIALOGS;
