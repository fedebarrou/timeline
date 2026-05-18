import type { Cue } from '../narrationCues';

/**
 * Cues for "Batalla de Badr".
 * Pins: mahoma(0), abu-bakr(1), ali(2), omar(3), abu-jahl(4), abu-sufyan(5). Escenario: Badr [618, 442].
 */
const CUES: Cue[] = [
  // Mahoma comandante, rezando en la tienda
  { match: /Mahoma|el Profeta|comandante|reza intensamente|tienda de ramas|manto.{0,15}cae de los hombros/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Halo divino — sakīna, ángeles enviados
  { match: /sak[īi]na|serenidad divina|tres mil [áa]ngeles|mil [áa]ngeles|[áa]ngeles enviados|Sura 3:123|Sura Al-Anf[āa]l|auxilio divino/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Lluvia que firma el suelo (Sura 8:11)
  { match: /Sura 8:11|lluvia ligera|os hizo descender agua|firmar.{0,15}pasos|firm[oó] el suelo arenoso/i, cueId: 'fx:rain', data: { position: [618, 442] } },
  // Polvo de la batalla
  { match: /campo de batalla|duelo individual|combate general|polvo del valle|valle de Badr|pozos de Badr/i, cueId: 'fx:dust-burst', data: { position: [618, 442] } },
  // Sangre — caídos
  { match: /catorce musulmanes murieron|setenta Quraysh|m[áa]rtires|catorce m[áa]rtires|sangre|matanza/i, cueId: 'fx:blood-stain', data: { position: [618, 442] } },
  // ʿAlī campeón
  { match: /[ʿ']?Al[ií].{0,30}(camp[eé]on|al-Wal[īi]d|duelo|mata)/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Abū Jahl cae (el "Faraón de esta umma")
  { match: /Ab[ūu] Jahl.{0,30}(muer|cae|caído|identificado)|Faraón de esta umma|cadáver de Ab[ūu] Jahl/i, cueId: 'fx:character-recede', data: { pinIdx: 4 } },
  // Lanzamiento divino (Sura 8:17) — relámpago simbólico
  { match: /Sura 8:17|no fuisteis vosotros quienes los matasteis|fue All[āa]h quien|Yawm al-Furq[āa]n|D[íi]a del Discernimiento/i, cueId: 'fx:lightning-strike', data: { from: [618, 400], to: [618, 442] } },
];

export default CUES;
