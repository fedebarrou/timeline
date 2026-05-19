import type { Cue } from '../narrationCues';

/**
 * Cues for "La conquista de Jericó".
 * Pins: josue(0), rahab(1).
 */
const CUES: Cue[] = [
  // Procesión ritual con el Arca — trazado del recorrido
  { match: /siete d[ií]as|rodear[áa]n? la ciudad|procesi[oó]n|asedio ritual|Arca .{0,12}en medio/i, cueId: 'fx:journey-trace', data: { from: [583, 360], to: [583, 360], color: '#e6c66a' } },
  // Sacerdotes con trompetas / shofar — temblor anticipatorio
  { match: /trompetas|shofar|cuerno de carnero|toque prolongado|grito|gritar[áa]/i, cueId: 'fx:earthquake-shake', data: { intensity: 0.6 } },
  // Los muros caen — el momento icónico
  { match: /muros .{0,12}derrumba|muro se derrumb|cayeron los muros|murallas? .{0,12}ca[ií]|debajo de s[ií]/i, cueId: 'fx:walls-fall', data: { position: [583, 360] } },
  // Polvo de la caída
  { match: /derrumb|destrucci[oó]n|herem|anatema|exterminad/i, cueId: 'fx:dust-burst', data: { position: [583, 360] } },
  // Rahab — cordón rojo, la espía protegida
  { match: /Rahab|prostituta cananea|cord[oó]n .{0,8}(rojo|grana)|hilo grana|escondid[oa] .{0,12}esp[ií]as/i, cueId: 'fx:glow-pulse', data: { pinIdx: 1, color: '#c44848' } },
  // Josué dirige el asedio
  { match: /Josu[eé]|sucesor de Mois[eé]s|dirige el asedio|al frente del pueblo/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Maldición sobre quien reconstruya
  { match: /maldici[oó]n|Hiel de Betel|reconstruya .{0,10}Jeric[oó]/i, cueId: 'fx:blood-stain', data: { position: [583, 365] } },

  // Tesoros consagrados — el oro y el bronce para el arca de Yahveh
  { match: /tesoro.{0,12}(Yahveh|consagra)|oro .{0,8}bronce .{0,8}arca|metales .{0,8}consagra/i,
    cueId: 'fx:glow-pulse', data: { position: [583, 360] } },
];

export default CUES;
