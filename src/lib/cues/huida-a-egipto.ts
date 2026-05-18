import type { Cue } from '../narrationCues';

/**
 * Cues for "Huida a Egipto".
 * Pins: jesus(0), maria(1), jose-de-nazaret(2), herodes(3), melchor(4), gaspar(5), baltasar(6).
 */
const CUES: Cue[] = [
  // Ángel aparece a José en sueños
  { match: /[áa]ngel del Se[ñn]or|aparece en sue[ñn]os|avisado en sue[ñn]os|advertencia angelical/i, cueId: 'fx:angel-descent', data: { pinIdx: 2 } },
  // Huida nocturna a Egipto — journey trace
  { match: /huye a Egipto|huida.{0,12}Egipto|se va a Egipto|de noche.{0,30}Egipto/i, cueId: 'fx:journey-trace', data: { from: [581, 364], to: [535, 410] } },
  // Herodes furioso
  { match: /Herodes.{0,30}(c[oó]lera|burlado|orden[oó])|matanza de los inocentes|menores de dos a[ñn]os/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Matanza — sangre en Belén
  { match: /matar a todos|sangre derramada|Raquel.{0,20}(llora|llorando)|llanto en Ram[áa]/i, cueId: 'fx:blood-stain', data: { position: [581, 364] } },
  // Magos partidos por otro camino
  { match: /magos.{0,30}(otro camino|advertidos|no regresar)|partir por otro camino/i, cueId: 'fx:character-recede', data: { pinIdx: 4 } },
  // Muerte de Herodes — recede
  { match: /muri[oó] Herodes|muerto Herodes|muerte de Herodes|Arquelao/i, cueId: 'fx:character-recede', data: { pinIdx: 3 } },
  // Regreso a Nazaret
  { match: /regresar|vuelve a Nazaret|se establece en Nazaret|Galilea/i, cueId: 'fx:journey-trace', data: { from: [535, 410], to: [579, 353] } },
  // Refugio coránico — colina con agua
  { match: /colina|asilo|signo|refugio|agua corriente/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfe6c8' } },
];

export default CUES;
