import type { Cue } from '../narrationCues';

/**
 * Cues for "Gedeón y los trescientos".
 * Pins: gedeon(0).
 */
const CUES: Cue[] = [
  // Gedeón llamado — trillando trigo en el lagar
  { match: /Gede[oó]n|trillaba .{0,8}trigo|var[oó]n esforzado|lagar|[áa]ngel.{0,12}(Yahveh|aparece)/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Sacrificio consumido — primera señal
  { match: /sacrificio consumido|fuego que sale de la roca|consumi[oó] su ofrenda/i, cueId: 'fx:fire-flicker', data: { position: [582, 355] } },
  // Altar de Baal derribado — Jerubaal
  { match: /altar de Baal|derrib[oó] .{0,8}altar|Jerubaal|Baal contienda/i, cueId: 'fx:idol-shatter', data: { position: [582, 355] } },
  // Doble vellón — señal pedida dos veces
  { match: /doble vell[oó]n|vell[oó]n .{0,12}(roc[ií]o|mojado|seco)|tierra .{0,8}(seca|mojada)/i, cueId: 'fx:glow-pulse', data: { pinIdx: 0, color: '#fff1c0' } },
  // Reducción del ejército — de 32k a 300
  { match: /trescientos|300|reducci[oó]n del ej[eé]rcito|los que beban|temerosos a casa|manantial de Harod/i, cueId: 'fx:character-recede', data: { pinIdx: 0 } },
  // Cántaros rotos, antorchas, trompetas — ataque nocturno
  { match: /c[áa]ntaros|antorchas|trompeta de cuerno|por Yahveh y por Gede[oó]n|ataque nocturno|medianoche/i, cueId: 'fx:lightning-strike', data: { from: [580, 350], to: [582, 355] } },
  // Madianitas se atacan entre sí — confusión
  { match: /madianitas|se atacan entre s[ií]|confundid|huyen|persecuci[oó]n/i, cueId: 'fx:earthquake-shake', data: { intensity: 0.5 } },
  // Efod idolátrico al final — caída ambigua
  { match: /efod .{0,8}(Ofra|idol[áa]trico|trampa)|tropiezo|treinta kilos de oro/i, cueId: 'fx:blood-stain', data: { position: [582, 357] } },
];

export default CUES;
