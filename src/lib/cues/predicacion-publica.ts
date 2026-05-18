import type { Cue } from '../narrationCues';

/**
 * Cues for "Predicación pública y persecución de los Quraysh".
 * Pins: mahoma(0), abu-jahl(1), abu-lahab(2), abu-talib(3). Escenario: La Meca / Monte Ṣafā [625, 460].
 */
const CUES: Cue[] = [
  // Mahoma sube al monte Ṣafā y predica
  { match: /Mahoma|el Profeta|Muḥammad|sube al monte [ṢS]af[āa]|predicaci[oó]n pública|convoca a los Quraysh/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Halo divino — revelación pública
  { match: /Sura 26:214|advierte a tus parientes|Sura 111|Al-Masad|tawh[īi]d|monote[íi]smo|denuncia.{0,15}politeísmo/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Abū Jahl antagonista — orquesta la persecución
  { match: /Ab[ūu] Jahl|antagonista|líder Quraysh hostil|instigador de torturas|persecuci[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Abū Lahab opositor virulento (Sura 111)
  { match: /Ab[ūu] Lahab|maldito seas|para esto nos has reunido|opositor virulento|Sura 111/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Abū Ṭālib protector
  { match: /Ab[ūu] [ṬT][āa]lib|tío protector|jiw[āa]r|brinda protecci[oó]n|soporta la presi[oó]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Humo de la persecución / torturas a los esclavos conversos
  { match: /persecuci[oó]n|tortura|maltrat|esclavos conversos|hostilidad|insultos/i, cueId: 'fx:smoke-rise', data: { position: [625, 460] } },
  // Resplandor del mensaje público
  { match: /mensaje p[úu]blico|llamada al Islam|clan por clan|exhortaci[oó]n|advertencia/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
];

export default CUES;
