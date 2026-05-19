import type { Cue } from '../narrationCues';

/**
 * Cues for "Esclavitud en Egipto".
 * Pins: faraon-opresor(0), sifra(1), fuva(2).
 * Scene-objects declarados: 'piramide', 'latigo', 'ladrillo'
 *
 * REGLA #1: 'piramide', 'latigo', 'ladrillo' son scene-objects —
 * los animamos con fx:animate-scene-object al mencionarlos.
 */
const CUES: Cue[] = [
  // Nuevo Faraón opresor entra en escena
  { match: /nuevo rey|no conoc[ií]a a Jos[ée]|Fir.?awn|Fara[óo]n.{0,20}(opres|temor|teme)/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Pirámide / ciudad almacén — anima scene-object (REGLA #1)
  { match: /Pit[óo]n|Rames[ée]s|ciudad.{0,15}(almac[ée]n|construcci[óo]n)|pir[áa]mide/i,
    cueId: 'fx:animate-scene-object', data: { id: 'piramide', kind: 'pulse', duration: 2.0 } },

  // Látigo del capataz — anima scene-object (REGLA #1)
  { match: /cap[aá]taces|trabajos? forzados?|látigo|azote|golpe.{0,10}hebreo|oprimir/i,
    cueId: 'fx:animate-scene-object', data: { id: 'latigo', kind: 'shake', duration: 1.0 } },

  // Ladrillo de adobe / barro — anima scene-object (REGLA #1)
  { match: /ladrillos|barro|adobe|construcción.{0,10}ladrillos|sin paja/i,
    cueId: 'fx:animate-scene-object', data: { id: 'ladrillo', kind: 'wobble', duration: 1.2 } },

  // Polvo del trabajo forzado
  { match: /trabajos? forzados?|cargas pesadas|polvo.{0,15}(obra|constr)/i,
    cueId: 'fx:dust-burst', data: { position: [515, 405] } },

  // Decreto de infanticidio en el Nilo — sangre
  { match: /echad al r[íi]o|degollaba.{0,20}hijos|infanticidio|matar.{0,20}var[óo]n|exterminadora/i,
    cueId: 'fx:blood-stain', data: { position: [515, 410] } },

  // Comadronas Sifrá y Fuvá
  { match: /Sifr[áa]|comadronas? hebrea|partera/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  { match: /Fuv[áa]|brillante/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },

  // Resistencia / Dios protege — pulso
  { match: /desobedec|temieron a Dios|hizo bien a las parteras|objetoras de conciencia/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#cfe6c8' } },

  // Multiplicación del pueblo a pesar de la opresión
  { match: /se multiplicaban|cuanto m[áa]s.{0,20}oprim|llenar la tierra/i,
    cueId: 'fx:glow-pulse', data: { position: [515, 400], color: '#e6d4a0' } },

  // El Nilo como instrumento de muerte
  { match: /Nilo.{0,15}(matar|ahog|echar)|r[íi]o.{0,15}var[óo]n/i,
    cueId: 'fx:water-wave', data: { position: [515, 412] } },
];

export default CUES;
