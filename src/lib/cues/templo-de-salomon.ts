import type { Cue } from '../narrationCues';

/**
 * Cues for "El Templo de Salomón".
 * Pins: salomon(0), hiram-rey-de-tiro(1).
 */
const CUES: Cue[] = [
  // Planos del templo — planta tripartita revelada
  { match: /planta tripartita|planta de .{0,8}templos|p[óo]rtico|hejal|debir|sesenta codos|medidas/i, cueId: 'fx:scroll-unfurl', data: { position: [583, 360] } },
  // Cedros del Líbano — alianza con Hiram
  { match: /cedros del L[ií]bano|Hiram .{0,8}Tiro|alianza .{0,8}fenicia|tratado con Hiram/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Construcción — polvo de canteras
  { match: /construcci[oó]n|canteros|labradas en la cantera|siete a[ñn]os|edificar la casa|mano de obra/i, cueId: 'fx:dust-burst', data: { position: [583, 363] } },
  // Sin ruido de hierro — la regla litúrgica
  { match: /sin ruido de hierro|ni martillos ni hachas|shamir|jinns .{0,8}construy/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#cfd6dc' } },
  // Arca entronizada — querubines extendidos
  { match: /Arca .{0,12}(Lugar Sant[ií]simo|entron|trasladad|hombros)|querubines|olivo doradas/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Gloria de YHWH llena la casa — kavod
  { match: /kavod|gloria .{0,8}(Yahveh|llen)|nube de la gloria|llen[oó] la casa|sacerdotes no pod[ií]an/i, cueId: 'fx:halo-divine', data: { position: [583, 360] } },
  // Monte Sión resplandece — montaña con halo
  { match: /Si[oó]n|monte santo|monte del templo|Moriah|monte de Yahveh|monte de la casa/i, cueId: 'fx:mountain-glow', data: { position: [583, 360] } },
  // Oración de dedicación de Salomón
  { match: /oraci[oó]n de dedicaci[oó]n|es verdad que Dios morar[áa]|cielos de los cielos|atender[áa]s.{0,12}oraci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Jinns / sello de Salomón — tradición coránica
  { match: /jinns|sello de Sulaym[āa]n|mihrabs|controlados por el sello|demonios .{0,8}construy/i, cueId: 'fx:smoke-rise', data: { position: [585, 362] } },
];

export default CUES;
