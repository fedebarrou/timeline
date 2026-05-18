import type { Cue } from '../narrationCues';

/**
 * Cues for "Maná y codornices".
 * Pins: moises(0), aaron(1).
 */
const CUES: Cue[] = [
  // Pueblo murmura por hambre
  { match: /murmur|hambre|quej[óa]|añoraban|ollas de Egipto/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Maná desciende del cielo — caída
  { match: /man[áa]|man hu|pan del cielo|cosa menuda|escarcha|al-manna/i, cueId: 'fx:dust-burst', data: { position: [555, 415] } },
  // Maná figurativo — copos blancos que caen del cielo
  { match: /man[áa]|man hu|pan del cielo|cosa menuda|escarcha|al-manna/i, cueId: 'fx:manna-fall', data: {} },
  // Codornices — aves
  { match: /codornices|al-salwa|aves|p[áa]jaros|cubren el campamento/i, cueId: 'fx:dove-flight', data: { position: [555, 412] } },
  // Sabbath — doble porción
  { match: /S[áa]bado|sabbath|s[ée]ptimo d[íi]a|doble.{0,15}sexto d[íi]a|descanso/i, cueId: 'fx:halo-divine', data: { position: [555, 418] } },
  // Nube protectora (Corán)
  { match: /cubrimos con la nube|nube protectora|cubierta de nube/i, cueId: 'fx:halo-divine', data: { position: [555, 410] } },
  // 40 años de maná
  { match: /cuarenta años|40 años.{0,10}man[áa]|hasta Cana[áa]n|cesa.{0,10}man[áa]/i, cueId: 'fx:glow-pulse', data: { position: [555, 418], color: '#fff1c0' } },
  // Pan vivo / Cristo (lectura cristiana)
  { match: /pan vivo|verdadero pan|yo soy el pan|Jes[úu]s.{0,15}pan del cielo/i, cueId: 'fx:halo-divine', data: { position: [555, 415] } },
];

export default CUES;
