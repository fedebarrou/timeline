import type { DialogCue } from '../dialogTypes';

/**
 * Char-to-char dialogs for the ÉXODO era.
 *
 * Speakers virtuales soportados (sin pin físico):
 *   'yahve'       → top-center, halo dorado, cursiva
 *   'angel-anonimo' → lateral superior, halo blanco
 *   'voz-multitud'  → bottom-center, smallcaps, sin tail
 *
 * Eventos cubiertos:
 *   zarza-ardiente, moises-confronta-faraon, pesaj-primera-pascua,
 *   cruce-del-mar-rojo, mana-y-codornices, diez-mandamientos,
 *   becerro-de-oro, doce-espias, rebelion-core, serpiente-de-bronce,
 *   muerte-de-moises.
 */

const DIALOGS: Record<string, DialogCue[]> = {
  // ─────────────────────────────────────────────────────────────────────────
  // ZARZA ARDIENTE — Yahvé llama a Moisés, revela su nombre
  // ─────────────────────────────────────────────────────────────────────────
  'zarza-ardiente': [
    {
      match: /Mois[ée]s.{0,10}Mois[ée]s|llam[óo].{0,10}por su nombre/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: '¡Moisés, Moisés!',
      holdMs: 3800,
    },
    {
      match: /quita.{0,15}sandalias|cal[zs]ado.{0,15}pies|tierra santa/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Quítate las sandalias, porque el lugar donde estás es tierra santa.',
      holdMs: 5200,
    },
    {
      match: /Yo soy el que soy|EHY[ÉE]|ehy[ée] asher|soy el que soy/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Yo soy el que soy. Así dirás a los israelitas: "El que es me ha enviado a vosotros."',
      holdMs: 6000,
    },
    {
      match: /vi.{0,15}(aflicción|miseria).{0,15}pueblo|he bajado para librar/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'He visto la aflicción de mi pueblo en Egipto y he bajado para librarlos.',
      holdMs: 5500,
    },
    {
      match: /¿qui[ée]n soy yo.{0,15}Fara[óo]n|qui[ée]n soy yo para ir|no soy elocuente/i,
      speaker: 'moises',
      addressee: 'yahve',
      text: '¿Quién soy yo para ir ante Faraón y sacar a los israelitas de Egipto?',
      holdMs: 5000,
    },
    {
      match: /Aar[óo]n.{0,15}(boca|portavoz|hablar)|portavoz.{0,10}ante/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Aarón, tu hermano, hablará por ti al pueblo. Él será tu boca.',
      holdMs: 4800,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // MOISÉS CONFRONTA A FARAÓN — el gran duelo verbal
  // ─────────────────────────────────────────────────────────────────────────
  'moises-confronta-faraon': [
    {
      match: /deja ir.{0,15}pueblo|salir.{0,15}desierto|libera.{0,15}siervos/i,
      speaker: 'moises',
      addressee: 'faraon-opresor',
      text: 'Así dice Yahvé, Dios de Israel: Deja ir a mi pueblo para que me celebre una fiesta en el desierto.',
      holdMs: 5500,
    },
    {
      match: /¿qui[ée]n es Yahveh|no conozco a Yahveh|no obedecer[ée]/i,
      speaker: 'faraon-opresor',
      addressee: 'moises',
      text: '¿Quién es Yahvé para que yo obedezca su voz y deje ir a Israel? No conozco a Yahvé.',
      holdMs: 5800,
    },
    {
      match: /vara.{0,15}serpiente|serpiente.{0,15}(devor|vara)|tanin|se\s+convirti[óo]/i,
      speaker: 'aaron',
      addressee: 'faraon-opresor',
      text: '— Aaron arroja la vara. La vara se convierte en serpiente —',
      holdMs: 4000,
    },
    {
      match: /aument[óo].{0,15}opresi[óo]n|m[áa]s paja|tarea.{0,10}paja/i,
      speaker: 'faraon-opresor',
      addressee: null,
      text: 'No les daréis paja al pueblo. Que vayan ellos mismos a recogerla, pero entregad la misma cantidad de ladrillos.',
      holdMs: 5200,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // DIEZ PLAGAS — advertencias clave de Moisés
  // ─────────────────────────────────────────────────────────────────────────
  'diez-plagas': [
    {
      match: /aguas.{0,15}sangre|Nilo.{0,15}sangre|primera plaga/i,
      speaker: 'moises',
      addressee: 'faraon-opresor',
      text: 'En esto conocerás que yo soy Yahvé: voy a golpear con esta vara el agua del Nilo y se convertirá en sangre.',
      holdMs: 5500,
    },
    {
      match: /ped[íi]d a Yahveh.{0,20}ranas|ora.{0,15}Yahveh.{0,15}ranas/i,
      speaker: 'faraon-opresor',
      addressee: 'moises',
      text: 'Rogad a Yahvé que aleje las ranas de mí y de mi pueblo, y dejaré ir al pueblo.',
      holdMs: 5000,
    },
    {
      match: /tinieblas|tres d[íi]as.{0,15}oscur|novena plaga/i,
      speaker: 'faraon-opresor',
      addressee: 'moises',
      text: 'Id, servid a Yahvé; solamente vuestras ovejas y bueyes quedarán aquí.',
      holdMs: 4800,
    },
    {
      match: /primog[ée]nitos|d[ée]cima plaga|muerte.{0,15}primog|todos somos muertos/i,
      speaker: 'faraon-opresor',
      addressee: 'moises',
      text: '¡Marchaos de aquí, vosotros y los israelitas! Id a servir a Yahvé como habéis dicho. ¡Bendecidme también a mí!',
      holdMs: 6000,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // PESAJ — instrucciones de la noche de la liberación
  // ─────────────────────────────────────────────────────────────────────────
  'pesaj-primera-pascua': [
    {
      match: /sangre.{0,15}(postes|dinteles)|untar.{0,15}sangre|hisopo/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'La sangre os servirá de señal en las casas donde estéis: cuando yo vea la sangre, pasaré de largo ante vosotros.',
      holdMs: 5500,
    },
    {
      match: /pesaj|pas[óo] por encima|pascua de Yahveh|pas[ée] por encima/i,
      speaker: 'yahve',
      addressee: null,
      text: 'Este día será para vosotros un memorial, y lo celebraréis como fiesta de Yahvé. Es estatuto perpetuo.',
      holdMs: 5200,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // CRUCE DEL MAR ROJO — el momento culminante
  // ─────────────────────────────────────────────────────────────────────────
  'cruce-del-mar-rojo': [
    {
      match: /no tem[áa]is|estad firmes|Yahveh.{0,15}(pelear[áa]|combatir[áa])|quietos/i,
      speaker: 'moises',
      addressee: 'voz-multitud',
      text: '¡No temáis! Estad firmes y veréis la salvación que Yahvé obra hoy. Yahvé combatirá por vosotros; vosotros callad.',
      holdMs: 6000,
    },
    {
      match: /extende.{0,15}mano.{0,15}mar|extiende tu mano|haz que las aguas/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Extiende tu mano sobre el mar para que las aguas vuelvan sobre los egipcios.',
      holdMs: 5000,
    },
    {
      match: /c[áa]ntico del Mar|cantad a Yahveh|Miriam.{0,15}(pandero|canto)|CanteI a Yahveh/i,
      speaker: 'miriam',
      addressee: null,
      text: 'Cantad a Yahvé, porque se ha cubierto de gloria: arrojó al mar caballo y jinete.',
      holdMs: 5200,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // MANÁ Y CODORNICES — queja del pueblo, respuesta divina
  // ─────────────────────────────────────────────────────────────────────────
  'mana-y-codornices': [
    {
      match: /murmur|añoraban|ollas de Egipto|ojal[áa].{0,15}muerto/i,
      speaker: 'voz-multitud',
      addressee: null,
      text: 'Ojalá hubiéramos muerto en Egipto, cuando nos sentábamos junto a las ollas de carne y comíamos pan hasta hartarnos.',
      holdMs: 5500,
    },
    {
      match: /pan del cielo|man[áa]|he o[íi]do.{0,15}murmurar|al atardecer carne/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Yo haré llover pan del cielo para vosotros. Cada día el pueblo saldrá a recoger la ración de ese día.',
      holdMs: 5200,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // AGUA DE LA ROCA — sed en Refidim
  // ─────────────────────────────────────────────────────────────────────────
  'agua-de-la-roca': [
    {
      match: /¿por qu[ée] riñes conmigo|apedrear.{0,10}Mois[ée]s|¿por qu[ée] nos sacaste/i,
      speaker: 'voz-multitud',
      addressee: 'moises',
      text: '¿Por qué nos sacaste de Egipto para hacernos morir de sed a nosotros, a nuestros hijos y a nuestros ganados?',
      holdMs: 5500,
    },
    {
      match: /golpea.{0,15}(roca|peña)|golpe[óo] la roca|vara.{0,15}peña/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Golpea la roca, y saldrá agua de ella para que beba el pueblo.',
      holdMs: 4500,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // DIEZ MANDAMIENTOS — la gran alianza del Sinaí
  // ─────────────────────────────────────────────────────────────────────────
  'diez-mandamientos': [
    {
      match: /Yo soy Yahveh tu Dios|no tendr[áa]s otros dioses/i,
      speaker: 'yahve',
      addressee: null,
      text: 'Yo soy Yahvé, tu Dios, que te saqué de Egipto, de la casa de la servidumbre. No tendrás otros dioses delante de mí.',
      holdMs: 6500,
    },
    {
      match: /no matar[áa]s|no adultar[áa]s|no hurtarás|no levantar[áa]s|honra.{0,10}padre/i,
      speaker: 'yahve',
      addressee: null,
      text: 'No matarás. No cometerás adulterio. No robarás. No levantarás falso testimonio. Honra a tu padre y a tu madre.',
      holdMs: 6000,
    },
    {
      match: /habla t[úu] con nosotros|no hable Dios.{0,15}nosotros|muri.{0,5}si Dios/i,
      speaker: 'voz-multitud',
      addressee: 'moises',
      text: 'Habla tú con nosotros y escucharemos; pero que no hable Dios con nosotros, no sea que muramos.',
      holdMs: 5500,
    },
    {
      match: /subi[óo].{0,15}monte|Mois[ée]s.{0,15}(sube|nube|cuarenta)/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Sube a mí al monte y permanece allí; te daré las tablas de piedra, la ley y los mandamientos que he escrito para su instrucción.',
      holdMs: 5800,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // BECERRO DE ORO — idolatría, ira de Moisés y Yahvé
  // ─────────────────────────────────────────────────────────────────────────
  'becerro-de-oro': [
    {
      match: /haz.{0,15}(dioses|dios).{0,20}nos gu[íi]e|Mois[ée]s.{0,15}ignoramos qu[ée] le pas[óo]/i,
      speaker: 'voz-multitud',
      addressee: 'aaron',
      text: 'Haznos dioses que vayan delante de nosotros, porque a este Moisés que nos sacó de Egipto no sabemos qué le ha pasado.',
      holdMs: 5800,
    },
    {
      match: /ira de Yahveh|tu pueblo.{0,20}corrompido|apártate.{0,15}destruir/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Tu pueblo, que sacaste de Egipto, se ha corrompido. Han fundido un becerro y lo adoran. Deja que se encienda mi ira y los destruya.',
      holdMs: 6500,
    },
    {
      match: /intercede|acuérdate de Abraham|ap[áa]cate|ten piedad/i,
      speaker: 'moises',
      addressee: 'yahve',
      text: 'Ap[á]cate, Yahvé. ¿Por qué se encenderá tu ira contra tu pueblo? Acuérdate de Abraham, Isaac e Israel.',
      holdMs: 5800,
    },
    {
      match: /¿qu[ée] te hizo.{0,15}pueblo|¿qu[ée] te hicieron|Aar[óo]n.{0,15}¿qu[ée]/i,
      speaker: 'moises',
      addressee: 'aaron',
      text: '¿Qué te hizo este pueblo para que lo hayas traído a tan gran pecado?',
      holdMs: 5200,
    },
    {
      match: /no se enoje.{0,15}señor|t[úu] conoces.{0,10}pueblo|propenso al mal/i,
      speaker: 'aaron',
      addressee: 'moises',
      text: 'No se enoje mi señor. Tú conoces a este pueblo, que es propenso al mal. Arrojé el oro al fuego y salió este becerro.',
      holdMs: 5500,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // DOCE ESPÍAS — el informe y la fe de Caleb y Josué
  // ─────────────────────────────────────────────────────────────────────────
  'doce-espias': [
    {
      match: /subamos.{0,15}tomemos posesi[óo]n|podemos.{0,15}conquistar/i,
      speaker: 'caleb',
      addressee: null,
      text: '¡Subamos y tomemos posesión de ella, porque ciertamente podemos conquistarla!',
      holdMs: 4800,
    },
    {
      match: /Nephilim|gigantes|somos como langostas|fuimos como langostas/i,
      speaker: 'voz-multitud',
      addressee: 'moises',
      text: 'No podremos subir contra aquel pueblo, porque es más fuerte que nosotros. A sus ojos éramos como langostas.',
      holdMs: 5500,
    },
    {
      match: /no os rebel[ée]is.{0,15}Yahveh|no tem[áa]is.{0,15}gente|son.{0,10}pan nuestro/i,
      speaker: 'josue',
      addressee: 'voz-multitud',
      text: 'No os rebeléis contra Yahvé ni temáis a la gente de aquella tierra. ¡Son pan nuestro! No les temáis.',
      holdMs: 5500,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // REBELIÓN DE CORÉ — el desafío y la sentencia
  // ─────────────────────────────────────────────────────────────────────────
  'rebelion-core': [
    {
      match: /todos.{0,15}santos|basta ya.{0,15}vosotros|¿por qu[ée].{0,20}ponéis/i,
      speaker: 'core',
      addressee: 'moises',
      text: '¡Basta ya de vosotros! Toda la congregación, todos son santos, y Yahvé está en medio de ellos. ¿Por qué os ponéis sobre la asamblea de Yahvé?',
      holdMs: 6200,
    },
    {
      match: /Yahveh.{0,15}(conocer[áa]|mostrar[áa]).{0,15}quién es suyo|mañana.{0,15}mostrar/i,
      speaker: 'moises',
      addressee: 'core',
      text: 'Mañana dará a conocer Yahvé quién es suyo y quién es santo, y a quién hará acercarse a él.',
      holdMs: 5200,
    },
    {
      match: /tierra.{0,15}(abri[óo]|trag)|apartaos.{0,15}tiendas|apartaos de estos hombres/i,
      speaker: 'moises',
      addressee: 'voz-multitud',
      text: 'Apartaos de las tiendas de estos hombres impíos. No toquéis ninguna de sus cosas, no sea que perezcáis por todos sus pecados.',
      holdMs: 5500,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // SERPIENTE DE BRONCE — la crisis y el remedio
  // ─────────────────────────────────────────────────────────────────────────
  'serpiente-de-bronce': [
    {
      match: /hemos pecado.{0,20}hablar contra Yahveh|quita.{0,15}serpientes|arrepent/i,
      speaker: 'voz-multitud',
      addressee: 'moises',
      text: 'Hemos pecado hablando contra Yahvé y contra ti. Ruega a Yahvé que aleje de nosotros las serpientes.',
      holdMs: 5200,
    },
    {
      match: /fabric.{0,10}(serpiente|neshas)|ponla sobre un asta|mira y vive/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Hazte una serpiente ardiente y ponla sobre un asta. Todo el que sea mordido y la mire, vivirá.',
      holdMs: 5500,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // MOISÉS GOLPEA LA ROCA (SEGUNDA VEZ) — la desobediencia costosa
  // ─────────────────────────────────────────────────────────────────────────
  'moises-golpea-roca-segunda-vez': [
    {
      match: /hablad a la pe[ñn]a|hablar a la roca|orden.{0,15}hablar/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Reúne a la congregación. Habla a la roca a la vista de ellos y ella dará su agua.',
      holdMs: 5000,
    },
    {
      match: /o[íi]d.{0,5}rebeldes|¿hemos de hacer salir|rebeldes|agua de esta peña/i,
      speaker: 'moises',
      addressee: 'voz-multitud',
      text: '¡Escuchen, rebeldes! ¿Acaso hemos de hacer salir agua para vosotros de esta roca?',
      holdMs: 5200,
    },
    {
      match: /no.{0,10}entrar[áa]n|no meter[ée]is.{0,15}tierra|no creísteis en m[íi]/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Por cuanto no creísteis en mí para santificarme ante los israelitas, no conduciréis esta asamblea a la tierra que les he dado.',
      holdMs: 6000,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // MUERTE DE MOISÉS — el adiós en el monte Nebo
  // ─────────────────────────────────────────────────────────────────────────
  'muerte-de-moises': [
    {
      match: /verla con tus ojos|no pasar[áa]s|mas no entrar[áa]s|te muestro la tierra/i,
      speaker: 'yahve',
      addressee: 'moises',
      text: 'Esta es la tierra que juré a Abraham, Isaac y Jacob. Te la muestro con tus ojos, pero no pasarás allá.',
      holdMs: 5800,
    },
    {
      match: /Mois[ée]s.{0,15}muri[óo]|muri[óo] all[íi]|beso de Dios/i,
      speaker: 'yahve',
      addressee: null,
      text: 'Y Yahvé lo enterró en el valle de Moab, frente a Bet-Peor; nadie conoce su sepultura hasta hoy.',
      holdMs: 5500,
    },
    {
      match: /s[ée] fiel|no desmay[ee]s|yo estar[ée] contigo|no te dejar[ée]/i,
      speaker: 'yahve',
      addressee: 'josue',
      text: 'Sé fuerte y valiente. No temas ni desmayes, porque Yahvé tu Dios estará contigo adondequiera que vayas.',
      holdMs: 5500,
    },
  ],
};

export default DIALOGS;
