import type { DialogCue } from '../dialogTypes';

/**
 * Char-to-char dialogs for the PRIMORDIAL era.
 *
 * Speakers virtuales:
 *   'yahve'         → top-center, halo dorado, cursiva
 *   'angel-anonimo' → lateral superior, halo blanco
 *   'voz-multitud'  → bottom-center, smallcaps, sin tail
 */

const DIALOGS: Record<string, DialogCue[]> = {
  // ───────────────────────────────────────────────────────────────────────
  // NACIMIENTO DE ADÁN Y EVA — reconocimiento del primer hombre
  // ───────────────────────────────────────────────────────────────────────
  'nacimiento-adan-eva': [
    {
      match: /no es bueno.{0,15}solo|le har[ée] ayuda|ayuda id[óo]nea/i,
      speaker: 'yahve',
      addressee: null,
      text: 'No es bueno que el hombre esté solo; le haré ayuda idónea para él.',
      holdMs: 5200,
    },
    {
      match: /hueso de mis huesos|carne de mi carne|var[oó]n.{0,10}var[oó]n|llamada var[oó]na/i,
      speaker: 'adan',
      addressee: 'eva',
      text: '¡Esta sí es hueso de mis huesos y carne de mi carne! Será llamada varona, porque del varón fue tomada.',
      holdMs: 6000,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // EXPULSIÓN DEL EDÉN — el interrogatorio divino
  // ───────────────────────────────────────────────────────────────────────
  'expulsion-eden': [
    {
      match: /¿d[óo]nde est[áa]s|llam[óo].{0,10}Ad[áa]n|escondi[óo].{0,10}entre.{0,10}árbol/i,
      speaker: 'yahve',
      addressee: 'adan',
      text: '¿Dónde estás?',
      holdMs: 3500,
    },
    {
      match: /o[íi]te.{0,10}voz|tuve miedo|porque estaba desnudo/i,
      speaker: 'adan',
      addressee: 'yahve',
      text: 'Oí tu voz en el jardín y tuve miedo, porque estaba desnudo; y me escondí.',
      holdMs: 5000,
    },
    {
      match: /comiste del [áa]rbol|¿qui[ée]n te dijo.{0,15}desnudo|comiste.{0,15}prohibido/i,
      speaker: 'yahve',
      addressee: 'adan',
      text: '¿Quién te enseñó que estabas desnudo? ¿Has comido del árbol del que te mandé que no comieras?',
      holdMs: 5500,
    },
    {
      match: /serpiente.{0,15}enga[ñn]|el [áa]ngel.{0,10}me enga[ñn]/i,
      speaker: 'eva',
      addressee: 'yahve',
      text: 'La serpiente me engañó, y comí.',
      holdMs: 3800,
    },
    {
      match: /polvo eres.{0,10}polvo|sudor.{0,15}rostro|maldita.{0,10}tierra/i,
      speaker: 'yahve',
      addressee: 'adan',
      text: 'Con el sudor de tu rostro comerás el pan, hasta que vuelvas a la tierra: pues polvo eres, y al polvo volverás.',
      holdMs: 6500,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // CAÍN MATA A ABEL — el primer crimen y el primer prófugo
  // ───────────────────────────────────────────────────────────────────────
  'cain-mata-abel': [
    {
      match: /¿por qu[ée] te has enojado|¿por qu[ée] ha decaído tu rostro|hacer el bien/i,
      speaker: 'yahve',
      addressee: 'cain',
      text: '¿Por qué te has enojado, y por qué ha decaído tu rostro? Si hicieras lo bueno, ¿no serías enaltecido?',
      holdMs: 6200,
    },
    {
      match: /pecado.{0,15}puerta|domina tu|debes dominarlo|t[úu] debes/i,
      speaker: 'yahve',
      addressee: 'cain',
      text: 'El pecado está acechando a la puerta; con todo, tú debes dominarlo.',
      holdMs: 5000,
    },
    {
      match: /¿d[óo]nde est[áa].{0,5}hermano|¿d[óo]nde est[áa] Abel/i,
      speaker: 'yahve',
      addressee: 'cain',
      text: '¿Dónde está Abel, tu hermano?',
      holdMs: 3800,
    },
    {
      match: /no s[ée]|¿soy yo guardi[áa]n|guarda de mi hermano/i,
      speaker: 'cain',
      addressee: 'yahve',
      text: 'No sé. ¿Soy yo acaso guardián de mi hermano?',
      holdMs: 4500,
    },
    {
      match: /voz.{0,15}sangre|sangre.{0,15}clama|clamando.{0,10}tierra/i,
      speaker: 'yahve',
      addressee: 'cain',
      text: '¿Qué has hecho? La voz de la sangre de tu hermano clama a mí desde la tierra.',
      holdMs: 5800,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // ORDEN DE CONSTRUIR EL ARCA — la primera advertencia
  // ───────────────────────────────────────────────────────────────────────
  'orden-construir-arca': [
    {
      match: /fin de toda carne|llena.{0,10}violencia|destruir[ée].{0,15}tierra/i,
      speaker: 'yahve',
      addressee: 'noe',
      text: 'He decidido el fin de toda carne, porque la tierra está llena de violencia por su causa.',
      holdMs: 5800,
    },
    {
      match: /hazte un arca|gofer|trescientos codos|tres pisos|tres cubiertas/i,
      speaker: 'yahve',
      addressee: 'noe',
      text: 'Hazte un arca de madera de gofer. La harás de trescientos codos de largo, cincuenta de ancho y treinta de alto.',
      holdMs: 6200,
    },
    {
      match: /pacto contigo|alianza contigo|entrar[áa]s.{0,15}arca|t[úu].{0,15}hijos.{0,15}mujer/i,
      speaker: 'yahve',
      addressee: 'noe',
      text: 'Pero contigo estableceré mi pacto, y entrarás en el arca tú y tus hijos, tu mujer y las mujeres de tus hijos.',
      holdMs: 5800,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // ALIANZA DEL ARCOÍRIS — la primera promesa
  // ───────────────────────────────────────────────────────────────────────
  'alianza-arcoiris': [
    {
      match: /no volver[ée] a maldecir|nunca m[áa]s.{0,15}diluvio|jam[áa]s ser[áa] destruida/i,
      speaker: 'yahve',
      addressee: 'noe',
      text: 'No volveré a maldecir la tierra por causa del hombre. Mientras la tierra dure, no cesarán la sementera y la siega, el frío y el calor.',
      holdMs: 6500,
    },
    {
      match: /arco.{0,10}nubes|mi arco.{0,15}señal|pondr[ée] mi arco/i,
      speaker: 'yahve',
      addressee: null,
      text: 'Pongo mi arco en las nubes, y será por señal del pacto entre mí y la tierra.',
      holdMs: 5200,
    },
  ],

  // ───────────────────────────────────────────────────────────────────────
  // TORRE DE BABEL — el descenso de la confusión
  // ───────────────────────────────────────────────────────────────────────
  'torre-de-babel': [
    {
      match: /un solo pueblo|misma lengua|nada los detendr[áa]|comienzo de sus obras/i,
      speaker: 'yahve',
      addressee: null,
      text: 'He aquí que el pueblo es uno, y todos tienen un mismo lenguaje. Y han comenzado a obrar, y nada les detendrá de cuanto se han propuesto.',
      holdMs: 6500,
    },
    {
      match: /descendamos|confundamos|confundi[óo].{0,15}lenguas|ya no se entiendan/i,
      speaker: 'yahve',
      addressee: null,
      text: 'Bajemos y confundamos allí su lengua, para que ninguno entienda la palabra de su compañero.',
      holdMs: 5500,
    },
  ],
};

export default DIALOGS;
