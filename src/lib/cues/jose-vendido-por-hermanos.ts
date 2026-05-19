import type { Cue } from '../narrationCues';

/**
 * Cues for "José es vendido por sus hermanos".
 * Pins: jose(0), jacob(1), raquel(2).
 * Origen Siquem/Dotán [580, 350], destino Egipto [510, 410].
 * CUMBRE — densidad 20-30 cues.
 * Scene-objects: 'pozo-dotan', 'caravana-ismaelita', 'tunica-jose'.
 * REGLA #1: 'pozo-dotan' → no fx:well. 'caravana-ismaelita' → no fx:caravan/camel-train. 'tunica-jose' → no fx:glow-pulse con color.
 */
const CUES: Cue[] = [

  // ── Pasada 1: sustantivos ─────────────────────────────────────────────

  // 'pozo' → scene-object 'pozo-dotan' (REGLA #1: no fx:well)
  { match: /\bpozo|cisterna|aljibe|profundo del aljibe|lo profundo de un pozo\b/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'pozo-dotan', kind: 'pulse' } },

  // 'caravana' / 'camello' → scene-object 'caravana-ismaelita' (REGLA #1)
  { match: /caravana|ismaelitas?|madianitas?|mercaderes.{0,12}pas|camellos.{0,12}traían/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'caravana-ismaelita', kind: 'march' } },

  // 'túnica' → scene-object 'tunica-jose' (animar, no primitiva color)
  { match: /t[úu]nica.{0,16}colores|ketonet passim|mangas largas|t[úu]nica especial/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'tunica-jose', kind: 'glow' } },

  // 'sangre' en la túnica
  { match: /sangre de cabrito|t[úu]nica.{0,16}(sangre|manchada|ensangrentada)/i,
    cueId: 'fx:blood-stain',
    data: { position: [580, 350] } },

  // 'mirra' y 'aromas' — carga de la caravana
  { match: /\bmirra\b|aromas\b|b[áa]lsamo\b/i,
    cueId: 'fx:incense-spiral',
    data: { position: [560, 370] } },

  // 'estrella' / once estrellas del sueño
  { match: /once.{0,8}estrellas?|sol.{0,8}luna.{0,16}estrellas?|estrellas se inclinaban/i,
    cueId: 'fx:starfield-shimmer' },

  // once gavillas / sueño — scroll de visión
  { match: /once.{0,8}gavillas?|sue[ñn]o.{0,16}primac[íi]a|gavillas se inclinaban/i,
    cueId: 'fx:scroll-unfurl',
    data: { position: [580, 350] } },

  // viaje de José hacia Egipto con la caravana
  { match: /vendi[eé]ron|lo llevan a Egipto|camino a Egipto|caravana.{0,12}Egipto/i,
    cueId: 'fx:journey-trace',
    data: { from: [580, 350], to: [510, 410], style: 'caravan' } },

  // 'túnica de Jacob' / manto que el padre le da — efímero
  { match: /manto.{0,8}Jacob|ropas? de su padre|vesti[oó] a Jos/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#ffd866' } },

  // 'noche' en el pozo
  { match: /\bnoche\b|pasaron la noche|comieron.{0,10}pan/i,
    cueId: 'fx:night-fall' },

  // 'veinte piezas de plata' — glow como omen negativo
  { match: /veinte piezas de plata|20 piezas|d[íi]rhem|precio.{0,8}esclavo/i,
    cueId: 'fx:glow-pulse',
    data: { position: [580, 350], color: '#a01010' } },

  // ── Pasada 2: narrativa ───────────────────────────────────────────────

  // José emerge radiante (favorito del padre)
  { match: /Jos[ée]|Y[ūu]suf|hijo favorito|hijo de la vejez/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 0 } },

  // Jacob el padre doliente
  { match: /Jacob|Yaʿq[ūu]b/i,
    cueId: 'fx:character-emerge',
    data: { pinIdx: 1 } },

  // Halo sobre José — la promesa divina que lo rodea
  { match: /Dios estaba con [ée]l|promesa.{0,12}Jos[ée]|elegido|providencia/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 0 } },

  // Hermanos conspiran — earthquake shake leve (tensión)
  { match: /conspiran|planean matarlo|odian|celos|envidia|aborrecían/i,
    cueId: 'fx:earthquake-shake',
    data: { pinIdx: 0, intensity: 2 } },

  // José cae al pozo — brusco (recede temporal)
  { match: /lo echaron|lo arrojaron|lo metieron|cayó al pozo|en la cisterna/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 0 } },

  // Rubén intercede — halo sobre Jacob (línea de misericordia)
  { match: /Rub[ée]n.{0,20}(intercede|propuso|pide|no matemos)|no vertamos sangre/i,
    cueId: 'fx:halo-divine',
    data: { pinIdx: 1 } },

  // Judá propone la venta — journey trace simbólico
  { match: /Jud[áa].{0,20}(propon|propone|vend|dijo a sus hermanos)/i,
    cueId: 'fx:glow-pulse',
    data: { position: [580, 350], color: '#a01010' } },

  // Jacob se enluta — recede profundo
  { match: /se enlut[oó]|inconsolable|desgarr[oó] las vestiduras|llor[oó] su hijo/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 1 } },

  // Yaʿqūb sospecha del engaño (Corán: ṣabr jamīl)
  { match: /hermosa paciencia|ṣabr jam[īi]l|vuestras almas.{0,10}adornado|sospecha del engaño/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 1, color: '#ffd866' } },

  // José como tipo de Cristo — radial bloom (lectura patrística)
  { match: /tipo de Cristo|traicionado.{0,12}hermanos|vendido.{0,12}plata|comparaci[oó]n.{0,12}30 piezas/i,
    cueId: 'fx:radial-bloom',
    data: { position: [580, 350] } },

  // Vignette — tensión del pozo
  { match: /en la cisterna.{0,12}silencio|pozo seco.{0,12}oscuro/i,
    cueId: 'fx:vignette-pulse' },

  // Hechos 7:9 — "los patriarcas, movidos por envidia"
  { match: /movidos por envidia|Hechos 7|discurso de Esteban/i,
    cueId: 'fx:glow-pulse',
    data: { position: [510, 410], color: '#ffd866' } },

  // ── Pasada 3: diálogos (ver dialogs/patriarcal.ts) ───────────────────

  // Sueño contado por José — glow emanante
  { match: /os contaré mi sue[ñn]o|¡Padre! He visto once estrellas/i,
    cueId: 'fx:glow-pulse',
    data: { pinIdx: 0, color: '#ffd866' } },

  // Hermanos entre sí ("Mirad, el soñador viene")
  { match: /soñador viene|mirad.{0,8}so[ñn]ador|he aquí el so[ñn]ador/i,
    cueId: 'fx:glow-pulse',
    data: { position: [580, 350], color: '#a01010' } },

  // Rubén descubre el pozo vacío — recede
  { match: /Rub[ée]n.{0,20}(pozo vac[íi]|no estaba|rasg[oó] sus vestiduras)/i,
    cueId: 'fx:character-recede',
    data: { pinIdx: 1 } },

];

export default CUES;
