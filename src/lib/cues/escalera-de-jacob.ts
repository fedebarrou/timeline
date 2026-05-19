import type { Cue } from '../narrationCues';

/**
 * Cues for "La escalera de Jacob".
 * Pins: jacob(0). Escenario: Betel [581, 358]. Origen Bersabé [578, 372], destino Harán [600, 245].
 */
const CUES: Cue[] = [
  // Jacob huye al norte — emerge en Bersabé y se traza el viaje
  { match: /Jacob|Yaʿq[ūu]b/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Trazado del viaje desde Bersabé a Harán pasando por Betel
  { match: /huye.{0,12}Esa[úu]|huida hacia el norte|hacia Padán-Aram|camino a Har[áa]n/i, cueId: 'fx:journey-trace', data: { from: [578, 372], to: [600, 245], style: 'walking' } },
  // Sueño nocturno — destello sobre Betel
  { match: /sue[ñn]o|so[ñn][oó]|duerme|piedra .{0,8}almohada|visi[oó]n nocturna/i, cueId: 'fx:glow-pulse', data: { position: [581, 358], color: '#e6d4a0' } },
  // La escalera/rampa que une cielo y tierra
  { match: /escalera|sullam|rampa|extremo tocaba en el cielo|une cielo y tierra/i, cueId: 'fx:lightning-strike', data: { from: [581, 300], to: [581, 358] } },
  // Escalera figurativa — anima 'escalera-betel' ya en escena (REGLA #1)
  { match: /escalera|sullam|rampa|extremo tocaba en el cielo|une cielo y tierra|subir.{0,10}cielo/i, cueId: 'fx:animate-scene-object', data: { id: 'escalera-betel', kind: 'glow', duration: 2.6 } },
  // Ángeles que suben y bajan
  { match: /[áa]ngeles.{0,16}(sub|descend|bajaban)|sub[íi]an y descend[íi]an|ángeles de Dios/i, cueId: 'fx:angel-descent', data: { position: [581, 358] } },
  // Yahveh en lo alto renueva la promesa — halo divino
  { match: /Yahveh estaba en lo alto|renueva la promesa|promesa abrah[áa]mica|Yo soy Jehov[áa]/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Casa de Dios / Betel / betilo ungido
  { match: /casa de Dios|Betel|puerta del cielo|betilo|unge .{0,6}piedra|derram[oó] aceite/i, cueId: 'fx:glow-pulse', data: { position: [581, 358], color: '#fff1c0' } },
];

export default CUES;
