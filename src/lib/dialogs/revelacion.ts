import type { DialogCue } from '../dialogTypes';

/** Char-to-char dialogs for the REVELACIÓN era (vida del Profeta).
 *  Speaker 'allah' renderiza igual que 'yahve'/'dios-padre' (top-center,
 *  halo dorado, cursiva). */
const DIALOGS: Record<string, DialogCue[]> = {
  // ───────────────────────────────────────────────────────────────────────
  // VIAJE CON ABU TALIB Y EL MONJE BAHIRA — reconocimiento profético
  // ───────────────────────────────────────────────────────────────────────
  'viaje-con-abu-talib-bahira': [
    {
      match: /sello de la profec[íi]a|hombros del muchacho|últimos profetas|señal entre/i,
      speaker: 'bahira',
      addressee: 'abu-talib',
      text: 'Lleva a tu sobrino de vuelta al país, y guárdate de los judíos. Si lo ven y conocen como yo, le harán daño. Este muchacho llegará a ser un gran asunto.',
      holdMs: 7000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // REVELACIÓN EN HIRA — el primer encuentro con Gabriel
  // ───────────────────────────────────────────────────────────────────────
  'revelacion-en-hira': [
    {
      match: /¡recita|¡lee|iqra'?|recita en el nombre/i,
      speaker: 'angel-anonimo',
      addressee: 'mahoma',
      text: '¡Recita!',
      holdMs: 3000,
    },
    {
      match: /no soy lector|no s[ée] leer|no soy de los que recitan/i,
      speaker: 'mahoma',
      addressee: 'angel-anonimo',
      text: 'No sé leer.',
      holdMs: 2800,
    },
    {
      match: /en nombre de tu Se[ñn]or|cre[óo] al hombre|hombre.{0,15}coágulo|el m[áa]s generoso/i,
      speaker: 'allah',
      addressee: 'mahoma',
      text: 'Recita en el nombre de tu Señor, que ha creado. Ha creado al hombre de un coágulo. Recita, que tu Señor es el más generoso.',
      holdMs: 7500,
    },
    {
      match: /cubridme.{0,15}cubridme|zammil[uū]n[iī]|envuelvanme|tengo miedo/i,
      speaker: 'mahoma',
      addressee: 'khadija',
      text: '¡Cubridme! ¡Cubridme!',
      holdMs: 3200,
    },
    {
      match: /Allah.{0,15}nunca te abandonar[áa]|t[úu] guardas.{0,10}lazos|hospitalario.{0,10}d[ée]biles/i,
      speaker: 'khadija',
      addressee: 'mahoma',
      text: 'Allah nunca te abandonará. Tú guardas los lazos de sangre, hablas con verdad, ayudas al necesitado, y eres hospitalario con los huéspedes.',
      holdMs: 7500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // PREDICACIÓN PÚBLICA — primer rechazo de los Quraysh
  // ───────────────────────────────────────────────────────────────────────
  'predicacion-publica': [
    {
      match: /no hay dios sino Allah|abandonad.{0,15}ídolos|culto.{0,10}lat/i,
      speaker: 'mahoma',
      addressee: 'voz-multitud',
      text: 'No hay más dios que Allah. Abandonad la adoración de Al-Lat, Al-Uzza y Manat.',
      holdMs: 5500,
    },
    {
      match: /enloquec.{0,10}poeta|brujo|posedo|m[áa]gico/i,
      speaker: 'voz-multitud',
      addressee: 'mahoma',
      text: '¡Este hombre se ha vuelto loco! Es un poeta poseído, un mago, un mentiroso.',
      holdMs: 5000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // VIAJE NOCTURNO Y MI'RAJ — el ascenso celestial
  // ───────────────────────────────────────────────────────────────────────
  'viaje-nocturno-mi-raj': [
    {
      match: /cincuenta oraciones|cinco oraciones|reduce.{0,10}oraciones/i,
      speaker: 'allah',
      addressee: 'mahoma',
      text: 'Esto es mi prescripción, y la he reducido para mis siervos. Quien las cumpla recibirá la recompensa de cincuenta.',
      holdMs: 6500,
    },
    {
      match: /vuelve.{0,15}Se[ñn]or|pide.{0,10}rebaje|oraciones.{0,15}pesadas/i,
      speaker: 'moises',
      addressee: 'mahoma',
      text: 'Vuelve a tu Señor y pídele que las reduzca, pues tu comunidad no lo soportará.',
      holdMs: 6000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // HÉGIRA — la salida con Abu Bakr
  // ───────────────────────────────────────────────────────────────────────
  'hegira-migracion-a-medina': [
    {
      match: /no te entristezcas|no temas|Allah est[áa] con nosotros|cueva de Thawr/i,
      speaker: 'mahoma',
      addressee: 'abu-bakr',
      text: 'No te entristezcas, ciertamente Allah está con nosotros.',
      holdMs: 5000,
    },
    {
      match: /si miran.{0,15}pies.{0,15}veremos|tres.{0,10}con nosotros|nos ver[áa]n|nos descubrir[áa]n/i,
      speaker: 'abu-bakr',
      addressee: 'mahoma',
      text: 'Si alguno de ellos mirara bajo sus pies, nos vería.',
      holdMs: 5200,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // CONQUISTA DE LA MECA — la amnistía
  // ───────────────────────────────────────────────────────────────────────
  'conquista-de-meca': [
    {
      match: /¿qu[ée] esper[áa]is que haga|¿qu[ée] pens[áa]is|hermano generoso/i,
      speaker: 'mahoma',
      addressee: 'voz-multitud',
      text: '¿Qué esperáis que haga con vosotros?',
      holdMs: 4200,
    },
    {
      match: /idos.{0,5}sois libres|no os reproche|hoy.{0,15}misericordia|sois libres/i,
      speaker: 'mahoma',
      addressee: 'voz-multitud',
      text: 'Idos, sois libres. Hoy no hay reproche para vosotros. Que Allah os perdone, pues Él es el más misericordioso de los misericordiosos.',
      holdMs: 7000,
    },
    {
      match: /vino la verdad|desapareci[óo].{0,10}falsedad|jā'a-l-haqq|huy[óo].{0,10}vana/i,
      speaker: 'mahoma',
      addressee: null,
      text: '¡Ha venido la verdad y se ha desvanecido la falsedad! Ciertamente la falsedad está condenada a desaparecer.',
      holdMs: 6000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // PEREGRINACIÓN DE DESPEDIDA — el sermón final
  // ───────────────────────────────────────────────────────────────────────
  'peregrinacion-de-despedida': [
    {
      match: /quiz[áa] no os encuentre|quiz[áa] no os vea|hoy he perfeccionado/i,
      speaker: 'mahoma',
      addressee: 'voz-multitud',
      text: 'Oh gente, escuchad mis palabras con atención, pues no sé si después de este año os encontraré aquí de nuevo.',
      holdMs: 6500,
    },
    {
      match: /[áa]rabe.{0,10}no [áa]rabe|negro.{0,10}blanco|piedad|todos sois de Ad[áa]n/i,
      speaker: 'mahoma',
      addressee: 'voz-multitud',
      text: 'Toda la humanidad desciende de Adán y Eva. Un árabe no tiene superioridad sobre un no árabe, ni un blanco sobre un negro, salvo por la piedad.',
      holdMs: 7500,
    },
    {
      match: /he perfeccionado vuestra religi[óo]n|he completado mi favor|comple.{0,10}religi[óo]n/i,
      speaker: 'allah',
      addressee: 'voz-multitud',
      text: 'Hoy he perfeccionado para vosotros vuestra religión, he completado mi gracia sobre vosotros, y elegí el Islam como vuestra religión.',
      holdMs: 7500,
    },
  ],
};

export default DIALOGS;
