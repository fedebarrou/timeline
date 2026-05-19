import type { DialogCue } from '../dialogTypes';

/** Char-to-char dialogs for the PATRIARCAL era. */
const DIALOGS: Record<string, DialogCue[]> = {
  // ───────────────────────────────────────────────────────────────────────
  // LLAMADO DE ABRAHAM — el primer llamado
  // ───────────────────────────────────────────────────────────────────────
  'llamado-de-abraham': [
    {
      match: /sal de tu tierra|deja tu parentela|vete.{0,15}casa.{0,15}padre|lekh lekh/i,
      speaker: 'yahve',
      addressee: 'abraham',
      text: 'Vete de tu tierra y de tu parentela y de la casa de tu padre, a la tierra que te mostraré.',
      holdMs: 5800,
    },
    {
      match: /har[ée] gran naci[óo]n|te bendecir[ée]|engrandecer[ée] tu nombre|ser[áa]s bendici[óo]n/i,
      speaker: 'yahve',
      addressee: 'abraham',
      text: 'Haré de ti una gran nación, te bendeciré y engrandeceré tu nombre, y serás bendición.',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // PACTO DE ABRAHAM — la alianza eterna
  // ───────────────────────────────────────────────────────────────────────
  'pacto-de-abraham': [
    {
      match: /no temas Abraham|escudo.{0,10}galard[óo]n|gran galard[óo]n/i,
      speaker: 'yahve',
      addressee: 'abraham',
      text: 'No temas, Abraham. Yo soy tu escudo, y tu galardón será sobremanera grande.',
      holdMs: 5200,
    },
    {
      match: /mira al cielo|cuenta las estrellas|as[íi] ser[áa] tu descendencia/i,
      speaker: 'yahve',
      addressee: 'abraham',
      text: 'Mira ahora al cielo y cuenta las estrellas, si las puedes contar. Así será tu descendencia.',
      holdMs: 5500,
    },
    {
      match: /se[ñn]or Yahveh.{0,15}qu[ée] me dar[áa]s|sin hijo|heredero.{0,15}casa/i,
      speaker: 'abraham',
      addressee: 'yahve',
      text: 'Señor Yahvé, ¿qué me darás, siendo así que ando sin hijo y el heredero de mi casa es Eliezer?',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // AKEDÁH — el sacrificio de Isaac
  // ───────────────────────────────────────────────────────────────────────
  'akedah-sacrificio-isaac': [
    {
      match: /toma a tu hijo|hijo [úu]nico|hijo.{0,10}amas|holocausto.{0,15}monte/i,
      speaker: 'yahve',
      addressee: 'abraham',
      text: 'Toma a tu hijo, tu único, a quien amas, a Isaac, y vete a la tierra de Moria, y ofrécelo allí en holocausto.',
      holdMs: 6500,
    },
    {
      match: /padre m[íi]o|aqu[ií] estoy.{0,10}hijo|leño y el fuego/i,
      speaker: 'isaac',
      addressee: 'abraham',
      text: 'Padre mío, aquí está el fuego y la leña. ¿Pero dónde está el cordero para el holocausto?',
      holdMs: 5500,
    },
    {
      match: /Dios se proveer[áa]|Dios proveer[áa].{0,15}cordero|el Se[ñn]or proveer[áa]/i,
      speaker: 'abraham',
      addressee: 'isaac',
      text: 'Dios se proveerá el cordero para el holocausto, hijo mío.',
      holdMs: 5000,
    },
    {
      match: /Abraham.{0,5}Abraham|no extiendas tu mano|no le hagas nada/i,
      speaker: 'angel-anonimo',
      addressee: 'abraham',
      text: '¡Abraham, Abraham! No extiendas tu mano sobre el muchacho ni le hagas nada. Ya sé que temes a Dios.',
      holdMs: 6000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // ESCALERA DE JACOB — la visión en Betel
  // ───────────────────────────────────────────────────────────────────────
  'escalera-de-jacob': [
    {
      match: /Yo soy Yahveh|Dios de Abraham|tierra.{0,15}duermes.{0,15}dar[ée]/i,
      speaker: 'yahve',
      addressee: 'jacob',
      text: 'Yo soy Yahvé, el Dios de Abraham tu padre, y el Dios de Isaac. La tierra en que estás acostado te la daré a ti y a tu descendencia.',
      holdMs: 6500,
    },
    {
      match: /he aqu[íi].{0,10}contigo|te guardar[ée]|volver[ée] a traerte/i,
      speaker: 'yahve',
      addressee: 'jacob',
      text: 'He aquí, yo estoy contigo, y te guardaré por dondequiera que fueres, y volveré a traerte a esta tierra.',
      holdMs: 5800,
    },
    {
      match: /verdaderamente.{0,15}Yahveh|casa de Dios|puerta del cielo|Bet-?[ée]l/i,
      speaker: 'jacob',
      addressee: null,
      text: '¡Ciertamente Yahvé está en este lugar, y yo no lo sabía! Esta es casa de Dios, y puerta del cielo.',
      holdMs: 5800,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // JACOB LUCHA CON EL ÁNGEL — el cambio de nombre
  // ───────────────────────────────────────────────────────────────────────
  'jacob-lucha-con-angel': [
    {
      match: /no te dejar[ée] ir|hasta que me bendigas/i,
      speaker: 'jacob',
      addressee: 'angel-anonimo',
      text: 'No te dejaré ir si no me bendices.',
      holdMs: 4200,
    },
    {
      match: /¿cu[áa]l es tu nombre|¿c[óo]mo te llamas/i,
      speaker: 'angel-anonimo',
      addressee: 'jacob',
      text: '¿Cuál es tu nombre?',
      holdMs: 3500,
    },
    {
      match: /no se dir[áa] m[áa]s.{0,10}Jacob|ser[áa] Israel|luchaste con Dios/i,
      speaker: 'angel-anonimo',
      addressee: 'jacob',
      text: 'No se dirá más tu nombre Jacob, sino Israel; porque has luchado con Dios y con los hombres, y has vencido.',
      holdMs: 6500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // JOSÉ VENDIDO POR SUS HERMANOS
  // ───────────────────────────────────────────────────────────────────────
  'jose-vendido-por-hermanos': [
    {
      match: /viene el so[ñn]ador|matemos.{0,15}so[ñn]os|veamos.{0,15}sue[ñn]os/i,
      speaker: 'voz-multitud',
      addressee: null,
      text: '¡He aquí viene el soñador! Ahora pues, venid y matémoslo, y veremos qué será de sus sueños.',
      holdMs: 5800,
    },
    {
      match: /no derramemos sangre|no pong[áa]is mano|vend[áa]moslo|ismaelitas/i,
      speaker: 'ruben',
      addressee: null,
      text: 'No derramemos sangre. Echadlo en esta cisterna que está en el desierto, y no pongáis mano en él.',
      holdMs: 5500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // REENCUENTRO DE JOSÉ CON SUS HERMANOS
  // ───────────────────────────────────────────────────────────────────────
  'reencuentro-jose-hermanos': [
    {
      match: /yo soy Jos[ée]|hermano vuestro|vendisteis a Egipto/i,
      speaker: 'jose',
      addressee: null,
      text: 'Yo soy José, vuestro hermano, el que vendisteis a Egipto. Ahora, pues, no os entristezcáis ni os pese.',
      holdMs: 6000,
    },
    {
      match: /Dios.{0,15}envi[óo]|para preservar vida|gran liberaci[óo]n/i,
      speaker: 'jose',
      addressee: null,
      text: 'Dios me envió delante de vosotros, para preservaros posteridad sobre la tierra, y para daros vida por medio de gran liberación.',
      holdMs: 6500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // DESTRUCCIÓN DE SODOMA Y GOMORRA — el regateo
  // ───────────────────────────────────────────────────────────────────────
  'destruccion-sodoma-gomorra': [
    {
      match: /¿destruir[áa]s.{0,15}justo.{0,15}imp[íi]o|si hubiera cincuenta justos/i,
      speaker: 'abraham',
      addressee: 'yahve',
      text: '¿Destruirás también al justo con el impío? Quizá haya cincuenta justos dentro de la ciudad.',
      holdMs: 5500,
    },
    {
      match: /no destruir[ée].{0,15}por amor a|hablar[ée].{0,15}aún una vez|treinta.{0,5}veinte.{0,5}diez/i,
      speaker: 'yahve',
      addressee: 'abraham',
      text: 'No la destruiré por amor a los diez.',
      holdMs: 4200,
    },
    {
      match: /huye.{0,10}vida|no mires atr[áa]s|escapa al monte|al[íi] te conviertes/i,
      speaker: 'angel-anonimo',
      addressee: 'lot',
      text: '¡Escapa por tu vida! No mires atrás, ni te detengas en la llanura. Escapa al monte, no sea que perezcas.',
      holdMs: 5800,
    },
  ],
};

export default DIALOGS;
