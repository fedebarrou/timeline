import type { Cue } from '../narrationCues';

/**
 * Cues for "Daniel en Babilonia".
 * Pins: daniel(0), sadrac-mesac-abednego(1), nabucodonosor(2), dario(3).
 */
const CUES: Cue[] = [
  // Daniel deportado, joven en la corte
  { match: /Daniel|D[āa]niy[āa]l|Beltsasar|deportad[oa]s .{0,8}605|j[oó]venes jud[ií]os/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sadrac, Mesac, Abed-nego — los tres compañeros
  { match: /Sadrac|Mesac|Abed-nego|tres compa[ñn]eros|Anan[ií]as.{0,12}Misael.{0,12}Azar[ií]as/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Sueño de Nabucodonosor — estatua compuesta
  { match: /estatua compuesta|cabeza de oro|piedra .{0,12}no cortada|cuatro imperios|sue[ñn]o de Nabucodonosor/i, cueId: 'fx:scroll-unfurl', data: { position: [635, 320] } },
  // Horno ardiente — fuego del que salen ilesos
  { match: /horno .{0,8}(ardiente|fuego|encendid)|siete veces m[áa]s|cuatro hombres .{0,8}llamas|hijo de los dioses/i, cueId: 'fx:fire-flicker', data: { position: [633, 322] } },
  // Estatua dorada de 60 codos — su caída posterior
  { match: /estatua dorada|sesenta codos|llanura de Dura|postrarse|adorar.{0,12}estatua/i, cueId: 'fx:idol-shatter', data: { position: [636, 320] } },
  // Foso de los leones — Daniel intacto
  { match: /foso de .{0,8}leones|leones|cerr[oó] la boca|[áa]ngel.{0,16}leones/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6c878' } },
  // Mene mene tekel — escritura en la pared
  { match: /mene.{0,8}mene|tekel|uparsin|peres|escritura en la pared|mano sobrenatural/i, cueId: 'fx:lightning-strike', data: { from: [635, 305], to: [635, 320] } },
  // Acusadores devorados — la justicia se invierte
  { match: /conspiradores|s[áa]trapas|los leones los devor|familias .{0,12}devorad/i, cueId: 'fx:blood-stain', data: { position: [635, 322] } },
  // Hijo del Hombre / visiones apocalípticas
  { match: /Hijo del Hombre|nubes del cielo|Anciano de d[ií]as|cuatro bestias|apocalipsis/i, cueId: 'fx:halo-divine', data: { position: [635, 310] } },
];

export default CUES;
