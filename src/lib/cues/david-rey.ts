import type { Cue } from '../narrationCues';

/**
 * Cues for "David, rey de Israel".
 * Pins: david(0), joab(1).
 */
const CUES: Cue[] = [
  // David ungido en Hebrón
  { match: /David .{0,12}(ungid|rey de Jud[áa]|Hebr[oó]n)|ungido por todas las tribus/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Conquista de Jerusalén — Joab entra por el túnel
  { match: /conquista .{0,8}Jerusal[eé]n|jebuseos|canal de agua|tzinnor|t[uú]nel de Warren|Ciudad de David/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Polvo de la conquista militar
  { match: /Joab .{0,8}(conquist|penetr|toma)|guarnici[oó]n jebusea|por sorpresa/i, cueId: 'fx:dust-burst', data: { position: [582, 363] } },
  // Uza muere por tocar el Arca
  { match: /Uza|muere en el acto|tocar .{0,8}Arca|carreta nueva|bueyes tropiezan/i, cueId: 'fx:blood-stain', data: { position: [582, 363] } },
  // Traslado del Arca — danza de David
  { match: /traslado del Arca|David danzando|efod de lino|seis pasos|sube el Arca/i, cueId: 'fx:halo-divine', data: { position: [582, 363] } },
  // Oráculo de Natán — promesa dinástica eterna
  { match: /or[áa]culo de Nat[áa]n|promesa din[áa]stica|tu casa y tu reino|firmes para siempre|le ser[eé] padre/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#e6c66a' } },
  // Casa de David — atestación arqueológica
  { match: /casa de David|byt dwd|estela de Tel Dan|dinast[ií]a davídica|D[āa]w[uū]d/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 363] } },
];

export default CUES;
