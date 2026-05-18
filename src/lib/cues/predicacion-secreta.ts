import type { Cue } from '../narrationCues';

/**
 * Cues for "Predicación secreta".
 * Pins: mahoma(0), khadija(1), ali(2), abu-bakr(3), zayd(4), bilal(5). Escenario: La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Mahoma predica en círculos cercanos
  { match: /Mahoma|el Profeta|Muḥammad|predica privadamente|invitaci[oó]n privada|círculos cercanos/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Khadīja, primera musulmana
  { match: /Khad[īi]ja.{0,15}primera|primera musulmana|primera persona en aceptar/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // ʿAlī, primer joven musulmán
  { match: /[ʿ']?Al[ií].{0,20}(joven|niño|diez a[ñn]os|primer var[óo]n joven)/i, cueId: 'fx:character-emerge', data: { pinIdx: 2 } },
  // Abū Bakr, primer converso adulto
  { match: /Ab[ūu] Bakr|amigo íntimo|primer var[óo]n adulto|comerciante respetado/i, cueId: 'fx:character-emerge', data: { pinIdx: 3 } },
  // Zayd, hijo adoptivo
  { match: /Zayd|hijo adoptivo|liberto|primer hombre adulto/i, cueId: 'fx:character-emerge', data: { pinIdx: 4 } },
  // Bilāl, esclavo torturado
  { match: /Bil[āa]l|esclavo etíope|torturado por su fe|primer mueć[ií]n|liberado por Ab[ūu] Bakr/i, cueId: 'fx:character-emerge', data: { pinIdx: 5 } },
  // Halo divino sobre el Profeta — primeras revelaciones
  { match: /revelaciones tempranas|suras meccanas|escatol[óo]gic|exhortativ|as-s[āa]biqun al-awwal[ūu]n|primeros precursores/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Resplandor secreto de la comunidad naciente
  { match: /predicaci[oó]n secreta|secreto|en privado|reuniones privadas|umma incipiente/i, cueId: 'fx:glow-pulse', data: { position: [625, 460], color: '#ffe6a0' } },
];

export default CUES;
