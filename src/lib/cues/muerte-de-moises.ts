import type { Cue } from '../narrationCues';

/**
 * Cues for "Muerte de Moisés en el monte Nebo".
 * Pins: moises(0), josue(1), yhwh(2).
 */
const CUES: Cue[] = [
  // Moisés sube al monte Nebo
  { match: /subi[óo].{0,15}(Nebo|Pisga)|monte Nebo|cumbre del Pisga|sube del campo de Moab/i, cueId: 'fx:journey-trace', data: { from: [592, 370], to: [592, 365] } },
  // Bendición a las tribus / cántico final
  { match: /bendijo.{0,15}tribus|c[áa]ntico final|impuesto las manos|imposición de manos/i, cueId: 'fx:scroll-unfurl', data: { position: [592, 365] } },
  // Yahveh le muestra toda la tierra
  { match: /muestra.{0,15}tierra|Galaad hasta Dan|vio.{0,15}tierra prometida|visi[óo]n panor[áa]mica/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // No entrar — verla con tus ojos pero no pasarás
  { match: /verla con tus ojos|no pasar[áa]s|sin entrar|mas no entrar[áa]s/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6d4a0' } },
  // Josué sucesor
  { match: /Josu[ée]|Yehosh[úu]a|sucesor|recibe el liderazgo|conducir.{0,15}pueblo/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Moisés muere a los 120 años
  { match: /Mois[ée]s.{0,15}muri[óo]|120 años|ciento veinte años|ojos.{0,15}no.{0,15}oscurec/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Dios mismo lo entierra — sepultura secreta
  { match: /enterr[óo] en el valle|nadie conoce.{0,15}sepultura|sepultura secreta|Dios.{0,15}entierra/i, cueId: 'fx:halo-divine', data: { pinIdx: 2 } },
  // Duelo nacional / asunción / Transfiguración
  { match: /llor[óo].{0,15}Israel|treinta d[íi]as|asunci[óo]n de Mois[ée]s|Transfiguraci[óo]n/i, cueId: 'fx:smoke-rise', data: { position: [592, 365] } },
];

export default CUES;
