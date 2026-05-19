import type { Cue } from '../narrationCues';

/**
 * Cues for "Abraham rompe los ídolos".
 * Pins: abraham(0), tare(1), nimrod(2). Escenario: Ur de los Caldeos [665, 365].
 * Scene-objects: 'idolos-rotos'.
 * REGLA #1: 'idolos-rotos' → no fx:idol-shatter duplicado (usar animate-scene-object además del shatter).
 */
const CUES: Cue[] = [
  // Ídolos rotos → scene-object 'idolos-rotos' (REGLA #1 complementario)
  { match: /[íi]dolos?.{0,8}(roto|peda[zc]|destruy)|hacha.{0,8}Abraham|golpea.{0,8}[íi]dolos/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'idolos-rotos', kind: 'shake' } },
  // Ídolos rotos — la primitiva de fragmentación (no colisiona con scene-object)
  { match: /[íi]dolos?|[áa]rbol.{0,4}sagrad|peda[zc]os|hacha/i,
    cueId: 'fx:idol-shatter', data: { position: [665, 365], count: 6 } },
  // Abraham/Ibrāhīm emerge
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // El padre Taré/Āzar
  { match: /Tar[ée]|[ĀaA]zar|taller.{0,12}padre|fabricante de [íi]dolos/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Nimrod el rey
  { match: /Nimrod|rey id[oó]latra|rey de Babilonia|tirano/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Horno de Nimrod — fuego
  { match: /horno|fuego|arrojarlo al fuego|frialdad y paz|llamas/i,
    cueId: 'fx:fire-flicker', data: { position: [665, 365] } },
  // Humo del horno — Dios lo protege
  { match: /sal[ióe].{0,12}(sano|ileso)|Dios lo prot|enfri[oó] el horno|humo del horno/i,
    cueId: 'fx:smoke-column', data: { position: [665, 365] } },
  // Monoteísmo declarado — halo divino
  { match: /Dios [úu]nico|monote[íi]sm|un solo Dios|ḥan[īi]f|hanif/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Templo familiar incendiado
  { match: /incendia|incendi[oó] el templo|templo familiar|Har[áa]n.{0,16}muere/i,
    cueId: 'fx:smoke-rise', data: { position: [665, 365] } },
  // Argumento de Abraham — el ídolo mayor rompió a los otros
  { match: /el mayor lo hizo|preguntadles a ellos|el ídolo grande|Sura 21|los Anbiy[āa]/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd866' } },
];

export default CUES;
