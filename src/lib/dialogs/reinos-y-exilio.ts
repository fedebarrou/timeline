import type { DialogCue } from '../dialogTypes';

/** Char-to-char dialogs for the REINOS-Y-EXILIO era. */
const DIALOGS: Record<string, DialogCue[]> = {
  // ───────────────────────────────────────────────────────────────────────
  // DAVID VS GOLIAT — el desafío y la fe del pastorcito
  // ───────────────────────────────────────────────────────────────────────
  'david-vs-goliat': [
    {
      match: /¿por qu[ée] hab[ée]is salido|escoged.{0,15}var[óo]n|venga a m[íi]/i,
      speaker: 'goliat',
      addressee: 'voz-multitud',
      text: '¿Por qué habéis salido a dar batalla? Escoged un varón que venga contra mí. Si me vence y me mata, seremos vuestros siervos.',
      holdMs: 6500,
    },
    {
      match: /vienes a m[íi].{0,15}espada|honda.{0,15}cinco piedras|en el nombre de Yahveh/i,
      speaker: 'david',
      addressee: 'goliat',
      text: 'Tú vienes a mí con espada, lanza y jabalina; pero yo voy a ti en el nombre de Yahvé de los ejércitos, el Dios de los escuadrones de Israel.',
      holdMs: 7000,
    },
    {
      match: /piedra.{0,10}frente|cay[óo].{0,10}sobre.{0,5}rostro|cort[óo].{0,15}cabeza/i,
      speaker: 'david',
      addressee: null,
      text: '¡Yahvé entregará al filisteo en mi mano! Y toda la tierra sabrá que hay Dios en Israel.',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // BATSABÉ Y NATÁN — la parábola del cordero
  // ───────────────────────────────────────────────────────────────────────
  'batsabe-y-natan': [
    {
      match: /hab[íi]a dos hombres|rico.{0,10}pobre|una sola corderita/i,
      speaker: 'natan',
      addressee: 'david',
      text: 'Había dos hombres en una ciudad: el uno rico, y el otro pobre. El pobre no tenía más que una sola corderita.',
      holdMs: 6000,
    },
    {
      match: /merece morir|tal hombre|cuatro veces|restituir[áa]/i,
      speaker: 'david',
      addressee: 'natan',
      text: '¡Vive Yahvé, que el que tal hizo es digno de muerte! Pagará por la cordera cuatro veces.',
      holdMs: 5500,
    },
    {
      match: /t[úu] eres ese hombre|tú eres aquel|yo te ung[íi]/i,
      speaker: 'natan',
      addressee: 'david',
      text: '¡Tú eres ese hombre! Así dice Yahvé: yo te ungí por rey, te di la casa de tu señor, ¿por qué has menospreciado mi palabra?',
      holdMs: 6500,
    },
    {
      match: /he pecado.{0,15}Yahveh|contra ti|contra ti solo/i,
      speaker: 'david',
      addressee: 'natan',
      text: 'He pecado contra Yahvé.',
      holdMs: 3500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // SALOMÓN REY — pide sabiduría
  // ───────────────────────────────────────────────────────────────────────
  'salomon-rey': [
    {
      match: /pide lo que quieras|p[íi]deme.{0,10}quieras|qu[ée] he de darte/i,
      speaker: 'yahve',
      addressee: 'salomon',
      text: 'Pide lo que quieras que yo te dé.',
      holdMs: 3800,
    },
    {
      match: /coraz[óo]n entendido|sabidur[íi]a.{0,15}gobernar|discernir entre el bien/i,
      speaker: 'salomon',
      addressee: 'yahve',
      text: 'Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo.',
      holdMs: 5800,
    },
    {
      match: /no pediste larga vida|no pediste riquezas|conforme a tus palabras/i,
      speaker: 'yahve',
      addressee: 'salomon',
      text: 'Porque pediste esto, y no pediste para ti muchos días, ni pediste riquezas, te doy también lo que no pediste: riquezas y gloria.',
      holdMs: 6500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // REINA DE SABA — la sabiduría reconocida
  // ───────────────────────────────────────────────────────────────────────
  'reina-de-saba': [
    {
      match: /no se me hab[íi]a dicho.{0,15}mitad|sobrepasas la fama|bienaventurados.{0,15}siervos/i,
      speaker: 'reina-de-saba',
      addressee: 'salomon',
      text: 'No se me había dicho ni la mitad. Tu sabiduría y tu bienestar sobrepasan la fama que yo había oído.',
      holdMs: 6000,
    },
    {
      match: /bendito sea Yahveh|amor eterno.{0,15}Israel|te puso por rey/i,
      speaker: 'reina-de-saba',
      addressee: null,
      text: 'Bendito sea Yahvé, que se ha agradado de ti para ponerte en el trono de Israel.',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // ELÍAS Y BAAL — el desafío en el Monte Carmelo
  // ───────────────────────────────────────────────────────────────────────
  'elias-y-baal': [
    {
      match: /cojear[ée]is.{0,15}dos pensamientos|¿hasta cu[áa]ndo|si Yahveh es Dios/i,
      speaker: 'elias',
      addressee: 'voz-multitud',
      text: '¿Hasta cuándo cojearéis entre dos pensamientos? Si Yahvé es Dios, seguidlo; y si Baal, id en pos de él.',
      holdMs: 6500,
    },
    {
      match: /gritad.{0,10}m[áa]s alto|est[áa] meditando|est[áa] de viaje|duerme y hay que despertarlo/i,
      speaker: 'elias',
      addressee: 'voz-multitud',
      text: 'Gritad más alto, porque dios es. Quizá está meditando, o tiene algún trabajo, o va de camino, o tal vez duerme y hay que despertarlo.',
      holdMs: 7000,
    },
    {
      match: /Yahveh es el Dios|Adonai hu ha-elohim|cayeron.{0,10}rostros/i,
      speaker: 'voz-multitud',
      addressee: null,
      text: '¡Yahvé es el Dios! ¡Yahvé es el Dios!',
      holdMs: 4500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // PROFETAS MAYORES — el llamado de Isaías
  // ───────────────────────────────────────────────────────────────────────
  'profetas-mayores': [
    {
      match: /aqu[ií] estoy|h[eé]me aqu[ií]|env[íi]ame a m[íi]/i,
      speaker: 'isaias',
      addressee: 'yahve',
      text: 'Heme aquí, envíame a mí.',
      holdMs: 3500,
    },
    {
      match: /¿a qui[ée]n enviar[ée]|¿qui[ée]n ir[áa] por nosotros/i,
      speaker: 'yahve',
      addressee: null,
      text: '¿A quién enviaré, y quién irá por nosotros?',
      holdMs: 4200,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // DANIEL EN BABILONIA — el foso de los leones
  // ───────────────────────────────────────────────────────────────────────
  'daniel-en-babilonia': [
    {
      match: /Daniel.{0,10}siervo del Dios viviente|¿te ha podido librar|sirves continuamente/i,
      speaker: 'dario',
      addressee: 'daniel',
      text: 'Daniel, siervo del Dios viviente, el Dios tuyo, a quien tú continuamente sirves, ¿te ha podido librar de los leones?',
      holdMs: 6500,
    },
    {
      match: /mi Dios envi[óo].{0,10}[áa]ngel|cerr[óo] la boca de los leones|hallado.{0,10}inocencia/i,
      speaker: 'daniel',
      addressee: 'dario',
      text: '¡Oh rey, vive para siempre! Mi Dios envió a su ángel, el cual cerró la boca de los leones, para que no me hiciesen daño.',
      holdMs: 6500,
    },
  ],
};

export default DIALOGS;
