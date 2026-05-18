import type { Cue } from '../narrationCues';

/**
 * Cues for "Esclavitud en Egipto".
 * Pins: faraon-opresor(0), sifra(1), fuva(2).
 */
const CUES: Cue[] = [
  // Nuevo Faraón opresor entra en escena
  { match: /nuevo rey|no conoc[ií]a a Jos[ée]|Fir.?awn|Fara[óo]n.{0,20}(opres|temor|teme)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Trabajo forzado: polvo de ladrillos
  { match: /trabajos? forzados?|ladrillos|barro|Pit[óo]n|Rames[ée]s|cargas pesadas|cap[aá]taces/i, cueId: 'fx:dust-burst', data: { position: [515, 405] } },
  // Decreto de infanticidio en el Nilo — sangre
  { match: /echad al r[íi]o|degollaba.{0,20}hijos|infanticidio|matar.{0,20}var[óo]n|exterminadora/i, cueId: 'fx:blood-stain', data: { position: [515, 410] } },
  // Comadronas Sifrá y Fuvá
  { match: /Sifr[áa]|comadronas? hebrea|partera/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  { match: /Fuv[áa]|brillante/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Resistencia / Dios protege — pulso
  { match: /desobedec|temieron a Dios|hizo bien a las parteras|objetoras de conciencia/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#cfe6c8' } },
  // Multiplicación del pueblo a pesar de la opresión
  { match: /se multiplicaban|cuanto m[áa]s.{0,20}oprim|llenar la tierra/i, cueId: 'fx:glow-pulse', data: { position: [515, 400], color: '#e6d4a0' } },
];

export default CUES;
