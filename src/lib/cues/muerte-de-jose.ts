import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de José".
 * Pins: jose(0). Escenario: Egipto / Delta del Nilo [510, 410].
 * Scene-objects: 'sarcofago-jose'.
 * REGLA #1: 'sarcofago-jose' → no fx:golden-calf ni fx:chalice (usa fx:animate-scene-object).
 */
const CUES: Cue[] = [
  // José anciano emerge
  { match: /Jos[ée]|Y[ūu]suf/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // 110 años — edad ideal egipcia
  { match: /ciento diez a[ñn]os|110 a[ñn]os|edad ideal.{0,12}Egipto/i,
    cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6d4a0' } },
  // Juramento de los huesos — promesa abierta
  { match: /juramento.{0,12}huesos|llevar de aqu[íi] mis huesos|Dios.{0,16}visitar[áa]|promesa de los huesos/i,
    cueId: 'fx:scroll-unfurl', data: { position: [510, 410] } },
  // Sarcófago → scene-object 'sarcofago-jose' (REGLA #1)
  { match: /embalsamaron|sarc[oó]fago|aron|ata[úu]d en Egipto|estilo egipcio|momificado/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'sarcofago-jose', kind: 'glow' } },
  // Humo del embalsamamiento
  { match: /embalsamaron|cuarenta d[íi]as.{0,12}embalsamar|rito funerario/i,
    cueId: 'fx:smoke-rise', data: { position: [510, 410] } },
  // José muere — recede
  { match: /muri[oó] Jos[ée]|pereci[oó]|cierra el ciclo|[úu]ltimo patriarca|fin del G[ée]nesis/i,
    cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Profecía del éxodo — "Dios os visitará"
  { match: /Dios.{0,16}visitar[áa]|Dios os visitar[áa]|subir[éé]is de aqu[íi]|salida de Egipto/i,
    cueId: 'fx:divine-light-beam', data: { position: [510, 410] } },
  // Cumplimiento futuro: Moisés lleva los huesos / Siquem
  { match: /Mois[ée]s.{0,16}huesos|enterraron en Siquem|cuarta generaci[oó]n|Maquir/i,
    cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Cierre de la era patriarcal — fade to black
  { match: /cierra la era patriarcal|[úu]ltimo de los patriarcas|fin.{0,8}G[ée]nesis/i,
    cueId: 'fx:fade-to-black' },
  // Legado de José — zoom sobre Egipto
  { match: /legado de Jos[ée]|herencia.{0,12}Jos[ée]|doce tribus prosperon|prosperaron en Egipto/i,
    cueId: 'fx:zoom-pulse' },
];

export default CUES;
