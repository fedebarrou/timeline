import type { Cue } from '../narrationCues';

/**
 * Cues for "Cruce del Mar Rojo".
 * Pins: moises(0), faraon-opresor(1), miriam(2).
 */
const CUES: Cue[] = [
  // Faraón persigue con sus carros
  { match: /Fara[óo]n.{0,15}persigui[óo]|seiscientos carros|carros escogidos|persecuci[óo]n/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Moisés extiende la vara / golpea el mar
  { match: /extendi[óo].{0,15}(mano|vara).{0,15}mar|golpea el mar|cetro.{0,10}mar/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffd27a' } },
  // Las aguas se abren — mar Rojo
  { match: /aguas.{0,15}(abren|dividi|retira)|mar.{0,15}(abri[óo]|parti[óo]|seco)|Yam Suph|muros.{0,15}aguas|montañas.{0,15}aguas/i, cueId: 'fx:water-wave', data: { position: [545, 420] } },
  // Mar partido figurativo — muros de agua a cada lado
  { match: /aguas.{0,15}(abren|dividi|retira)|mar.{0,15}(abri[óo]|parti[óo]|seco)|Yam Suph|muros.{0,15}aguas|monta[ñn]as.{0,15}aguas|mar se abre/i, cueId: 'fx:parted-waters', data: { position: [545, 420] } },
  // Viento del este
  { match: /viento.{0,15}(este|oriental)|ruaj qadim/i, cueId: 'fx:dust-burst', data: { position: [545, 415] } },
  // Israel cruza a pie seco
  { match: /cruz[óo].{0,15}(mar|pie seco)|tierra seca|por en medio del mar|pasaron el mar/i, cueId: 'fx:journey-trace', data: { from: [525, 415], to: [560, 423] } },
  // Aguas se cierran sobre los egipcios — temblor
  { match: /aguas.{0,15}cerraron|cubrieron los carros|ej[ée]rcito.{0,15}ahog|se ahog[óo].{0,15}ej[ée]rcito|ahogamos a los otros/i, cueId: 'fx:earthquake-shake', data: { position: [545, 420] } },
  // Faraón se ahoga / declara fe (Corán)
  { match: /Fir.?awn.{0,20}(ahog|declar[óo] fe)|cuerpo.{0,15}signo|preserva.{0,10}cuerpo|moment[oo] de ahog/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
  // Cántico del Mar / Miriam con pandero
  { match: /c[áa]ntico del Mar|pandero|Miriam|mujeres.{0,15}cantando|cantad a Yahveh/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
];

export default CUES;
