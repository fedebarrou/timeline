import type { Cue } from '../narrationCues';

/**
 * Cues for "La conquista de Canaán".
 * Pins: josue(0).
 */
const CUES: Cue[] = [
  // Josué dirige las campañas
  { match: /Josu[eé]|tres campa[ñn]as|comanda|dirige .{0,8}campa[ñn]a/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Pecado de Acán — derrota en Hai
  { match: /Ac[áa]n|pecado de Ac[áa]n|herem|derrota.{0,12}Hai|treinta y seis muertos/i, cueId: 'fx:blood-stain', data: { position: [583, 360] } },
  // Polvo de la batalla — Hai cae
  { match: /Hai|emboscada|toma .{0,8}Hai|ciudad .{0,8}peque[ñn]a/i, cueId: 'fx:dust-burst', data: { position: [581, 359] } },
  // Sol detenido en Gabaón — milagro célebre
  { match: /sol y la luna|sol detenido|sol y luna se detienen|Gaba[oó]n|prolongando el d[ií]a|casi un d[ií]a entero/i, cueId: 'fx:halo-divine', data: { position: [582, 358] } },
  // Coalición sur — cinco reyes en cueva
  { match: /coalici[oó]n .{0,8}sur|Adonisedec|cinco reyes|cueva|colgados en cinco maderos/i, cueId: 'fx:lightning-strike', data: { from: [582, 350], to: [582, 360] } },
  // Hazor cae — ciudad quemada
  { match: /Hazor|Jab[ií]n|coalici[oó]n .{0,8}norte|ciudad fortificada|quemada/i, cueId: 'fx:fire-flicker', data: { position: [580, 355] } },
  // División de la tierra por sorteo — el camino tribal
  { match: /divisi[oó]n .{0,8}tierra|por sorteo|doce tribus|Silo|presencia del Arca|cuarenta y ocho ciudades/i, cueId: 'fx:journey-trace', data: { from: [583, 360], to: [582, 358], color: '#a4c46a' } },
  // Asamblea en Siquem — la alianza renovada
  { match: /asamblea de Siquem|elegid hoy|yo y mi casa|piedra .{0,8}testigo|Siquem/i, cueId: 'fx:scroll-unfurl', data: { position: [582, 358] } },
];

export default CUES;
