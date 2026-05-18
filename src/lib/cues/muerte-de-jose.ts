import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de José".
 * Pins: jose(0). Escenario: Egipto / Delta del Nilo [510, 410].
 */
const CUES: Cue[] = [
  // José anciano
  { match: /Jos[ée]|Y[ūu]suf/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // 110 años — edad ideal egipcia
  { match: /ciento diez a[ñn]os|110 a[ñn]os|edad ideal/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6d4a0' } },
  // Juramento de los huesos — promesa abierta
  { match: /juramento.{0,12}huesos|llevar de aqu[íi] mis huesos|Dios.{0,16}visitar[áa]|promesa de los huesos/i, cueId: 'fx:scroll-unfurl', data: { position: [510, 410] } },
  // Embalsamamiento y sarcófago (aron)
  { match: /embalsamaron|sarc[oó]fago|aron|atatud|ata[úu]d en Egipto/i, cueId: 'fx:smoke-rise', data: { position: [510, 410] } },
  // José muere — recede
  { match: /muri[oó] Jos[ée]|peñecer|pereci[oó]|cierra el ciclo|último patriarca/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Cumplimiento futuro: Moisés lleva los huesos / Siquem
  { match: /Mois[ée]s.{0,16}huesos|enterraron en Siquem|cuarta generaci[oó]n|Maquir/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
];

export default CUES;
