import type { Cue } from '../narrationCues';

/**
 * Cues for "Reencuentro de José con sus hermanos".
 * Pins: jose(0), jacob(1), benjamin(2). Escenario Egipto [510, 410], origen Canaán [582, 365].
 */
const CUES: Cue[] = [
  // José visir
  { match: /Jos[ée]|Y[ūu]suf.{0,12}(visir|reconoce|hermano)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Jacob anciano que ha perdido la vista
  { match: /Jacob|Yaʿq[ūu]b.{0,16}(ciego|llora|perdi[oó] la vista)/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Benjamín — clave de la prueba
  { match: /Benjam[íi]n|hermano menor|hijo de Raquel/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Viaje de los hermanos por la hambruna
  { match: /hambruna.{0,12}(alcanza|llega)|viajan a comprar grano|caravana de hermanos/i, cueId: 'fx:journey-trace', data: { from: [582, 365], to: [510, 410], style: 'caravan' } },
  // Acusación de espías
  { match: /acusa de esp[íi]as|esp[íi]as|encarcela tres d[ií]as|retiene a Sime[oó]n/i, cueId: 'fx:character-recede', data: { pinIdx: 2 } },
  // Copa de plata escondida en saco de Benjamín
  { match: /copa de plata|copa escondida|saco de Benjam[íi]n|prueba de la copa/i, cueId: 'fx:glow-pulse', data: { position: [510, 410], color: '#a04040' } },
  // Discurso de Judá ofreciéndose como sustituto
  { match: /Jud[áa].{0,16}(ofrec|fiador|sustituto)|discurso de Jud[áa]|en lugar de Benjam[íi]n/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Revelación: "Yo soy José" — perdón y reconciliación
  { match: /Yo soy Jos[ée]|se da a conocer|hoy no os reprocho nada|encaminó a bien|reconciliaci[oó]n/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Camisa de Yūsuf devuelve la vista a Jacob (Corán)
  { match: /camisa.{0,16}(Yūsuf|Y[ūu]suf|rostro)|recobr[oó] la vista|olor de Y[ūu]suf/i, cueId: 'fx:dove-flight', data: { from: [510, 410], to: [582, 365] } },
];

export default CUES;
