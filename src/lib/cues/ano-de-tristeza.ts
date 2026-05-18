import type { Cue } from '../narrationCues';

/**
 * Cues for "El Año de la Tristeza".
 * Pins: mahoma(0), khadija(1), abu-talib(2). Escenario: La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Khadīja muere
  { match: /Khad[īi]ja.{0,20}(muere|fallec|muri[oó])|primera esposa.{0,15}muere|sesenta y cuatro a[ñn]os/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Abū Ṭālib muere
  { match: /Ab[ūu] [ṬT][āa]lib.{0,20}(muere|fallec|muri[oó]|lecho de muerte)|tío protector.{0,15}muere/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Mahoma queda solo
  { match: /Mahoma|el Profeta|qued[oó] sin apoyo|qued[oó] sin protector|qued[oó] solo/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Duelo profundo — resplandor apagado
  { match: /[ʿ']?[āa]m al-[ḥh]uzn|A[ñn]o de la Tristeza|duelo|tristeza|doble p[ée]rdida|consternaci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#7a7a90' } },
  // Halo divino — Sura 28:56 / consuelo divino
  { match: /Sura 28:56|t[úu] no gu[íi]as a quien quieres|providencia|consuelo divino/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Apedreado en Ṭāʾif — humillaciones
  { match: /[ṬT][āa][ʾ']?if|apedread|humillaciones|barro en la cara|piedras lanzadas/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
];

export default CUES;
