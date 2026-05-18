import type { Cue } from '../narrationCues';

/**
 * Cues for "Orden de construir el arca".
 * Pins: noe(0), nephilim(1), vigilantes(2).
 */
const CUES: Cue[] = [
  // Revelación divina a Noé — pulso intenso
  { match: /Dios .{0,16}(advierte|revela|le ordena|ordena a No[eé])|orden de construir|Hazte un arca|advertido por Dios/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Construcción del arca — polvo de martillazos
  { match: /madera de gofer|construir el arca|construy[oó]|preparó el arca|brea|calafate/i, cueId: 'fx:dust-burst', data: { pinIdx: 0 } },
  // Arca figurativa — barco/casco que emerge
  { match: /\barca\b|construir el arca|hazte un arca|Hazte un arca/i, cueId: 'fx:ark-boat', data: { position: [620, 320] } },
  // Corrupción / maldad humana — destello oscuro sobre Nephilim
  { match: /Nephilim|gigantes|corrupci[oó]n radical|maldad de los hombres|todo designio.{0,20}mal/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Vigilantes detrás de la corrupción
  { match: /Vigilantes|artes prohibidas|ense[ñn]anzas prohibidas|descarrilado/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Burla del pueblo (Corán) — pulso melancólico sobre Noé
  { match: /se burlaban|pueblo burl[oó]n|no creer[áa]|predicador de justicia|predicaba mientras/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#8a7a5a' } },
  // 120 años de gracia — pulso lento sobre Noé
  { match: /120 a[ñn]os|ciento veinte a[ñn]os|plazo de gracia/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },
];

export default CUES;
