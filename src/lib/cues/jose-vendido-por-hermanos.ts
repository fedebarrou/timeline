import type { Cue } from '../narrationCues';

/**
 * Cues for "José es vendido por sus hermanos".
 * Pins: jose(0), jacob(1), raquel(2). Origen Siquem/Dotán [580, 350], destino Egipto [510, 410].
 */
const CUES: Cue[] = [
  // José, el preferido
  { match: /Jos[ée]|Y[ūu]suf/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Jacob, padre doliente
  { match: /Jacob|Yaʿq[ūu]b|padre.{0,18}(luto|inconsolable|desgarra)/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Sueño de las gavillas / once estrellas
  { match: /once.{0,8}(gavillas|estrellas)|sol.{0,8}luna.{0,16}estrellas|sue[ñn]o.{0,16}primac[íi]a/i, cueId: 'fx:scroll-unfurl', data: { position: [580, 350] } },
  // Túnica de colores — destello dorado
  { match: /t[úu]nica.{0,16}colores|ketonet passim|mangas largas|t[úu]nica especial/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#ffb84d' } },
  // El pozo / cisterna / aljibe
  { match: /pozo|cisterna|aljibe|profundo del aljibe|lo profundo de un pozo/i, cueId: 'fx:earthquake-shake', data: { pinIdx: 0, intensity: 3 } },
  // Venta a la caravana
  { match: /vendi[eé]ron|ismaelitas|madianitas|caravana|mercaderes|veinte piezas de plata|d[íi]rhem/i, cueId: 'fx:journey-trace', data: { from: [580, 350], to: [510, 410], style: 'caravan' } },
  // Túnica ensangrentada
  { match: /sangre de cabrito|t[úu]nica.{0,16}(sangre|manchada|ensangrentada)/i, cueId: 'fx:blood-stain', data: { position: [580, 350] } },
  // Jacob se enluta — recede
  { match: /se enlut[oó]|inconsolable|desgarr[oó] las vestiduras|hermosa paciencia|ṣabr jam[īi]l/i, cueId: 'fx:character-recede', data: { pinIdx: 1 } },
];

export default CUES;
