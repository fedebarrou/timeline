import type { Cue } from '../narrationCues';

/**
 * Cues for "Nacimiento de Noé".
 * Pins: noe(0), lamec(1), matusalen(2), jared(3).
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (nounDictionary) ────────────────────────────

  // 'tierra maldita' — la maldición sobre la que profetiza Lamec
  { match: /tierra.{0,10}maldij[oó]|maldici[oó]n.{0,15}tierra|tierra maldita/i,
    cueId: 'fx:dust-burst', data: { pinIdx: 0 } },

  // 'luz' / 'cuerpo radiante' — 1 Enoc 106: Noé nace radiante
  { match: /cuerpo radiante|blanco como la nieve|cabellos rojos|ilumina toda la casa/i,
    cueId: 'fx:flash-white' },

  // 'nieve' / 'blanco' — el cuerpo nevado de Noé (1 Enoc)
  { match: /blanco como la nieve|nieve|radiante/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'Vigilantes' — el miedo de Lamec (¿hijo de los Vigilantes?)
  { match: /hijo de los Vigilantes|teme que sea.{0,15}Vigilantes|Lamec.{0,20}asusta/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },

  // 'Enoc en el cielo' — Matusalén consulta a Enoc ya ascendido
  { match: /Enoc.{0,20}cielo|consulta.{0,10}Enoc|Enoc confirma/i,
    cueId: 'fx:divine-light-beam', data: { position: [620, 305] } },

  // 'descanso' / 'consuelo' — significado del nombre Noé
  { match: /descanso|consuelo|nos consolar[áa]|alivio futuro/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'amanecer' — profecía de luz, nuevo ciclo
  { match: /profec[ií]a paterna|nuevo amanecer|esperanza.{0,15}nacimiento/i,
    cueId: 'fx:dawn-break' },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Lamec se inclina expectante — pulso paterno
  { match: /Lamec|engendr[oó] un hijo|a los 182|ciento ochenta y dos/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 1 } },

  // Noé nace — emerge con luz cálida
  { match: /No[eé]|Noaj|descanso|consuelo|aliviar[áa]/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // Halo sobre Noé — destinado a lo sobrenatural
  { match: /hijo leg[íi]timo|sobrevivir[áa] al Diluvio|intervenido divina/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // Matusalén bendice — el más longevo
  { match: /Matusal[eé]n|m[áa]s longevo|cuando [eé]l muera|Metushelaj/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 2 } },

  // Memoria de Jared — eco ancestral
  { match: /Jared|bisabuelo|antepasado/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 3 } },

  // Profecía cumplida — Noé destinado a salvar la creación
  { match: /bisagra de la humanidad|cierra la genealog[ií]a|intervenci[oó]n divina anticipatoria/i,
    cueId: 'fx:radial-bloom', data: { position: [620, 320] } },

  // 'cabellos rojos' — detalle sobrenatural de 1 Enoc 106
  { match: /cabellos rojos|cabellos.{0,10}rosa|cabellos.{0,15}resplandecientes/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0 } },

  // 'ojos que iluminan la casa' — Noé abre los ojos y la habitación resplandece
  { match: /ilumina.{0,10}casa|ojos que iluminan|abri[oó] los ojos.{0,15}luz/i,
    cueId: 'fx:flash-white' },

  // 'Nuh' / predicador — Sura Nuh 71: enviado a advertir a su pueblo
  { match: /Nuh|enviado a su pueblo|advert[íi]r.{0,15}pueblo|profeta.{0,10}Noé/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },

  // ── Pasada 3: diálogos ────────────────────────────────────────────────

  // "Este nos consolará de nuestros trabajos" — Lamec profetiza al nacer Noé
  { match: /nos consolar[áa] de.{0,30}(trabajos|obras)|nos alivia|nos aliviar[áa]/i,
    cueId: 'fx:dialog', data: { eventId: 'nacimiento-noe' } },
];

export default CUES;
