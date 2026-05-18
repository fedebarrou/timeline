import type { Cue } from '../narrationCues';

/**
 * Cues for "Caín mata a Abel".
 * Pins: cain(0), abel(1).
 */
const CUES: Cue[] = [
  // Ofrendas — destellos diferenciados
  { match: /ofrenda de Abel|primog[eé]nitos del reba[ñn]o|ofrenda aceptada|sacrificio más excelente/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#f6e6a8' } },
  { match: /ofrenda de Ca[ií]n|frutos del suelo|fue rechazada/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a5a3a' } },
  // Envidia / ira — pulso rojizo sobre Caín
  { match: /envidia|celos|se ensa[ñn][oó]|ira|enfurecid|decay[oó] su semblante/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#a04040' } },
  // El golpe — relámpago entre los hermanos en el campo
  { match: /lo mat[oó]|asesinato|primer fratricidio|primer homicidio|golpe/i, cueId: 'fx:lightning-strike', data: { from: [600, 305], to: [620, 320] } },
  // Abel cae — recede
  { match: /Abel.{0,30}(muere|cae|sangre clama)|cuerpo de Abel|sangre de Abel/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Cuervo enseña a enterrar (Corán) — polvo sobre la tumba
  { match: /cuervo|escarbó la tierra|enterrar|rito funerario/i, cueId: 'fx:dust-burst', data: { pinIdx: 1 } },
  // Marca de Caín y exilio a Nod — destello sobre Caín antes de su huida
  { match: /marca|errante|tierra de Nod|exilio|destierro/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
];

export default CUES;
