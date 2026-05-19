import type { Cue } from '../narrationCues';

/**
 * Cues for "Tratado de al-Ḥudaybiyya".
 * Pins: mahoma(0), abu-sufyan(1). Escenario: al-Ḥudaybiyya / La Meca [625, 460].
 */
const CUES: Cue[] = [
  // Mahoma encabeza la peregrinación
  { match: /Mahoma|el Profeta|encabeza.{0,15}peregrinaci[oó]n|1\.?400 musulmanes|i[ḥh]r[āa]m|peregrinaci[oó]n pacífica/i, cueId: 'fx:character-emerge', data: { pinIdx: 0 } },
  // Firma del tratado — pergamino desplegado
  { match: /tratado|firma del tratado|Suhayl ibn [ʿ']?Amr|condiciones|cláusulas|paz de diez a[ñn]os|negociaci[oó]n/i, cueId: 'fx:scroll-unfurl', data: { position: [625, 460] } },
  // Halo divino — la Apertura (Sura Al-Fatḥ 48:1)
  { match: /Sura Al-Fat[ḥh]|Sura 48|Apertura manifiesta|fat[ḥh]an mub[īi]nan|victoria manifiesta|t[ée] hemos concedido una victoria/i, cueId: 'fx:halo-divine', data: { pinIdx: 0 } },
  // Bayʿat ar-Riḍwān — juramento del beneplácito bajo el árbol
  { match: /bay[ʿ']?at ar-Ri[ḍd]w[āa]n|juramento del benepl[áa]cito|bajo el [áa]rbol|riḍwan|juran fidelidad bajo el [áa]rbol/i, cueId: 'fx:glow-pulse', data: { position: [625, 460], color: '#ffd27a' } },
  // Abū Sufyān — líder Quraysh
  { match: /Ab[ūu] Sufy[āa]n|líder Quraysh|responsable.{0,15}tratado.{0,15}meccana/i, cueId: 'fx:character-emerge', data: { pinIdx: 1 } },
  // Polvo del campamento en al-Ḥudaybiyya
  { match: /al-[ḤH]udaybiyya|Hudaibiya|campamento|borde del territorio sagrado|territorio sagrado/i, cueId: 'fx:dust-burst', data: { position: [625, 460] } },
  // ʿUthmān como emisario a La Meca — traza
  { match: /[ʿ']?Uthm[āa]n|emisario.{0,15}Meca|envía emisario|negociador/i, cueId: 'fx:journey-trace', data: { from: [625, 460], to: [625, 465] } },
  // Sacrificio de los animales — ram (cordero)
  { match: /sacrificio.{0,15}animales|degollar.{0,15}camellos|setenta camellos|hady|ofrenda|sacrificarse/i, cueId: 'fx:ram', data: { position: [625, 460] } },
];

export default CUES;
