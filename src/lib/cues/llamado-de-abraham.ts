import type { Cue } from '../narrationCues';

/**
 * Cues for "El llamado de Abraham".
 * Pins: abraham(0), sara(1), lot(2).
 * Origen Harán [600, 245], destino Siquem [580, 350], luego Betel [581, 358].
 * CUMBRE — densidad 20-25 cues.
 * Scene-objects: 'caravana-abraham', 'altar-siquem'.
 * REGLA #1: 'caravana-abraham' → no fx:caravan/camel-train. 'altar-siquem' → no fx:fire-flicker.
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // 'caravana' → scene-object 'caravana-abraham' (REGLA #1)
  { match: /caravana|ruta del Levante|emprendieron el camino|part[iíe]ron de Har[aá]n/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'caravana-abraham', kind: 'march' } },

  // 'camello' → scene-object 'caravana-abraham' (REGLA #1: no fx:camel-train)
  { match: /\bcamello|dromedario\b/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'caravana-abraham', kind: 'drift' } },

  // 'altar' → scene-object 'altar-siquem' (REGLA #1: no fx:fire-flicker)
  { match: /\baltar|construye un altar|edifica.{0,16}altar|primer altar/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'altar-siquem', kind: 'burn' } },

  // 'tienda' — patriarca vive en tiendas (efímero, no scene-object en este evento)
  { match: /\btiendas?\b|carpa\b|mora.{0,8}tiendas?/i,
    cueId: 'fx:glow-pulse',
    data: { position: [580, 350], color: '#ffd866' } },

  // 'montaña' / 'monte' — región de Canaán
  { match: /\bmonta[ñn]a.{0,12}canaán|tierra montañosa|colinas de Can[aá]n/i,
    cueId: 'fx:mountain-glow',
    data: { position: [580, 350] } },

  // 'estrella' — promesa de descendencia "como las estrellas"
  { match: /\bestrellas?\b|cuenta las estrellas/i,
    cueId: 'fx:starfield-shimmer' },

  // 'nación grande' / promesa inicial — scroll
  { match: /naci[oó]n grande|engrandeceré tu nombre|bendición a las naciones|todas las familias/i,
    cueId: 'fx:scroll-unfurl',
    data: { position: [580, 350] } },

  // 'viento' del desierto en la marcha
  { match: /\bviento\b|brisa.{0,8}desierto|calor.{0,8}camino/i,
    cueId: 'fx:wind-streaks' },

  // 'polvo' de la caravana
  { match: /\bpolvo\b|polvareda|huella/i,
    cueId: 'fx:dust-burst',
    data: { position: [590, 295] } },

  // Migración Harán → Siquem — journey trace principal
  { match: /de Har[aá]n a Siquem|parte de Har[aá]n|migraci[oó]n|ruta del Levante|mil kilómetros/i,
    cueId: 'fx:journey-trace',
    data: { from: [600, 245], to: [580, 350], style: 'caravan' } },

  // Avance Siquem → Betel — segundo tramo
  { match: /Betel|avanza hacia el sur|de Siquem.{0,20}Betel|segunda etapa/i,
    cueId: 'fx:journey-trace',
    data: { from: [580, 350], to: [581, 358], style: 'walking' } },

  // 'humo' del altar de Siquem
  { match: /\bhumo\b|sacrificio.{0,12}altar|ofrenda/i,
    cueId: 'fx:smoke-rise',
    data: { position: [580, 350] } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // Abraham emerge — el protagonista
  { match: /Abraham|Abram|Ibr[āa]h[īi]m/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Sara acompaña
  { match: /Sara|Saray|Sarah|esposa.{0,8}Abraham/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // Lot, el sobrino
  { match: /Lot.{0,18}(sobrino|acompa[ñn]a|única pariente)|sobrino que/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 2 } },

  // El llamado divino — luz del cielo
  { match: /lej.lej[áa]|vete de tu tierra|sal de tu tierra|orden divina|llamado divino/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [600, 245] } },

  // Halo de obediencia sobre Abraham
  { match: /Abraham obedeció|se fue.{0,12}como Yahveh le dijo|sin saber.{0,8}adónde iba/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // Promesa de la tierra: radial bloom en Siquem (la tierra prometida)
  { match: /a tu descendencia daré esta tierra|tierra que te mostraré|tierra prometida/i,
    cueId: 'fx:radial-bloom',
    data: { position: [580, 350] } },

  // Encina de Moré — árbol sagrado de Siquem
  { match: /encina de Mor[ée]|terebinto|árbol sagrado/i,
    cueId: 'fx:glow-pulse',
    data: { position: [580, 350], color: '#ffd866' } },

  // Fe sin certeza — silhouette en horizonte (Hebreos 11)
  { match: /Hebreos 11|sin saber adónde iba|obediencia de Abraham|ciudad.{0,8}fundamentos/i,
    cueId: 'fx:silhouette-horizon' },

  // Ruptura con el pueblo idólatra (Corán: emigración teológica)
  { match: /me aparto de vosotros|ruptura.{0,12}idolatría|se apart[oó].{0,12}pueblo|Sura 19/i,
    cueId: 'fx:idol-shatter',
    data: { position: [600, 245], count: 3 } },

  // Lej-lejá — zoom pulse (la fórmula fundacional)
  { match: /lej.lej[áa]|fórmula fundacional|nombre de la parashá/i,
    cueId: 'fx:zoom-pulse' },

  // ── Pasada 3: diálogos (ver dialogs/patriarcal.ts) ───────────────────

  // Voz de Yahvé hablando a Abraham
  { match: /Yahveh.{0,10}dijo.{0,10}(Abraham|Abram)|le dijo.{0,8}Jehov[áa]|voz del Se[ñn]or/i,
    cueId: 'fx:divine-light-beam',
    data: { position: [600, 245] } },

  // La promesa universal (Pablo en Gálatas 3:8)
  { match: /Gálatas 3|justificaci[oó]n por la fe|Pablo.{0,16}promesa|Rom 4/i,
    cueId: 'fx:glow-pulse',
    data: { position: [580, 350], color: '#ffd866' } },

  // Ibrāhīm como emigrante (muhājir) coránico
  { match: /muh[āa]jir|emigrante.{0,12}Abraham|Sura 29/i,
    cueId: 'fx:journey-trace',
    data: { from: [600, 245], to: [580, 350], style: 'caravan' } },

];

export default CUES;
