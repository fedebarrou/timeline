import type { Cue } from '../narrationCues';

/**
 * Cues for "Elección de los Doce Apóstoles".
 * Pins: jesus(0), pedro(1), andres(2), juan-apostol(3), mateo-apostol(4), judas-iscariote(5).
 */
const CUES: Cue[] = [
  // Jesús sube al monte a orar
  { match: /sube al monte|pas[oó] la noche.{0,20}oraci[oó]n|orando a Dios|al amanecer/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Pedro — Simón Kefá
  { match: /Sim[oó]n.{0,30}Pedro|Kef[áa]|Pedro.{0,12}roca|hijo de Jon[áa]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Andrés — hermano de Pedro
  { match: /Andr[eé]s|hermano de Pedro|pescador.{0,20}Andr[eé]s/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Juan — hijo del trueno
  { match: /Juan.{0,20}(Zebedeo|hijo del trueno|Boanerges)|Santiago.{0,20}Juan/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Mateo el publicano
  { match: /Mateo.{0,30}(publicano|Cafarna[uú]m|llamado)|publicano de Cafarna[uú]m/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Judas Iscariote — ya marcado como traidor
  { match: /Judas Iscariote|el traidor|Queriot|el que tambi[eé]n .{0,6}entreg[oó]/i, cueId: 'fx:character-emerge', data: { pinIdx: 5 } },
  // Doce columnas / doce tribus — pulso colectivo
  { match: /doce ap[oó]stoles|doce tribus|nuevo Israel|pueblo de Dios renovado|al-Hawariyy[uū]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
];

export default CUES;
