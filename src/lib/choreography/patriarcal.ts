import type { ChoreographySet } from './types';

/**
 * Choreographies for the PATRIARCAL era (19 events).
 *
 * Pin indices follow the `characters:` order from each event's MDX frontmatter.
 * These overrides REPLACE any inline legacy entries with richer narrative motion.
 *
 * Pin order per event:
 *   abraham-rompe-idolos       : [abraham(0), tare(1), nimrod(2)]
 *   akedah-sacrificio-isaac    : [abraham(0), isaac(1), ismael(2)]
 *   destruccion-sodoma-gomorra : [lot(0), abraham(1)]
 *   escalera-de-jacob          : [jacob(0)]
 *   jacob-lucha-con-angel      : [jacob(0)]
 *   jacob-roba-primogenitura   : [jacob(0), esau(1), isaac(2), rebeca(3)]
 *   jose-en-egipto             : [jose(0)]
 *   jose-vendido-por-hermanos  : [jose(0), jacob(1), raquel(2)]
 *   llamado-de-abraham         : [abraham(0), sara(1), lot(2)]
 *   muerte-de-jacob            : [jacob(0), jose(1), benjamin(2)]
 *   muerte-de-jose             : [jose(0)]
 *   muerte-sara                : [sara(0), abraham(1), isaac(2)]
 *   nacimiento-abraham         : [abraham(0), tare(1)]
 *   nacimiento-isaac           : [abraham(0), sara(1), isaac(2), ismael(3)]
 *   nacimiento-ismael          : [abraham(0), agar(1), ismael(2), sara(3)]
 *   nacimiento-jacob-esau      : [isaac(0), rebeca(1), esau(2), jacob(3)]
 *   pacto-de-abraham           : [abraham(0), sara(1)]
 *   reencuentro-jose-hermanos  : [jose(0), jacob(1), benjamin(2)]
 *   torre-de-babel             : [nimrod(0), sem(1), cam(2), jafet(3)]
 */
const PATRIARCAL: ChoreographySet = {
  // --- LLAMADO DE ABRAHAM ---
  // [abraham(0), sara(1), lot(2)]
  // Caravana migrante hacia el NW (Ur → Harán → Canaán). Abraham al frente, Sara y Lot lo siguen
  // con leve retraso y dispersión lateral; al final, todos respiran (llegada) y se restablecen.
  'llamado-de-abraham': {
    steps: [
      // Abraham se yergue, mira al horizonte (preludio)
      { pinIdx: 0, scale: 1.08, duration: 1.2, ease: 'sine.inOut' },
      // Inicia la marcha al NW — Abraham primero
      { pinIdx: 0, offset: [-10, -5], duration: 2.4, ease: 'sine.inOut' },
      // Sara se suma con retraso, ligeramente detrás
      { pinIdx: 1, offset: [-7, -3], duration: 2.6, ease: 'sine.inOut' },
      // Lot cierra la caravana (sobrino, más rezagado)
      { pinIdx: 2, offset: [-4, -1], duration: 2.8, ease: 'sine.inOut' },
      // Segunda etapa — la caravana avanza más lejos hacia Canaán
      { pinIdx: 0, offset: [-22, -11], duration: 3.5, ease: 'power1.inOut' },
      { pinIdx: 1, offset: [-18, -9], duration: 3.5, ease: 'power1.inOut' },
      { pinIdx: 2, offset: [-14, -7], duration: 3.5, ease: 'power1.inOut' },
      // Llegada — Abraham respira (revelación de la tierra prometida)
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Reset (loop fluido — la caravana se reposiciona)
      { pinIdx: 0, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE ABRAHAM ---
  // [abraham(0), tare(1)] — bebé Abraham emerge en Ur de los Caldeos; Taré (padre) lo recibe
  'nacimiento-abraham': {
    steps: [
      // Abraham nace — escala ínfima, casi invisible
      { pinIdx: 0, scale: 0.3, opacity: 0.15, duration: 0.01 },
      // Taré (padre) inclina la cabeza hacia el recién nacido
      { pinIdx: 1, offset: [0, 2], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Abraham crece (entrada al mundo, suave y radiante)
      { pinIdx: 0, scale: 1.0, opacity: 1.0, duration: 2.8, ease: 'power2.out' },
      // Taré exulta — pulso de orgullo paterno
      { pinIdx: 1, scale: 1.12, duration: 1.0, ease: 'sine.inOut' },
      // Padre vuelve a su tamaño normal
      { pinIdx: 1, scale: 1.0, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      // Abraham pulsa una vez (promesa futura — destino)
      { pinIdx: 0, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
    ],
  },

  // --- ABRAHAM ROMPE LOS ÍDOLOS ---
  // [abraham(0), tare(1), nimrod(2)]
  // Abraham irrumpe en el taller, golpea/rompe (vibración), Taré retrocede consternado,
  // Nimrod se aproxima (rey furioso, amenaza del horno).
  'abraham-rompe-idolos': {
    steps: [
      // Abraham se yergue, decidido — pulso de convicción
      { pinIdx: 0, scale: 1.12, duration: 1.0, ease: 'sine.inOut' },
      // Golpe rápido (rompe ídolos) — vibración corta
      { pinIdx: 0, offset: [3, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [3, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.3, ease: 'power2.out' },
      // Taré retrocede, conmocionado (padre fabricante de ídolos)
      { pinIdx: 1, offset: [6, 2], opacity: 0.55, scale: 0.92, duration: 1.5, ease: 'power2.in' },
      // Nimrod aparece (rey amenazante — entra desde lejos)
      { pinIdx: 2, offset: [12, -3], opacity: 0.3, duration: 0.01 },
      { pinIdx: 2, offset: [4, -1], opacity: 1.0, scale: 1.18, duration: 2.2, ease: 'power3.out' },
      // Abraham firme frente al rey
      { pinIdx: 0, scale: 1.15, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1, scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
    ],
  },

  // --- PACTO DE ABRAHAM ---
  // [abraham(0), sara(1)]
  // Abraham y Sara pulsan al unísono (promesa), una "respiración" cósmica que se expande,
  // luego un pulso simultáneo (sello del pacto) y se asientan iluminados.
  'pacto-de-abraham': {
    steps: [
      // Abraham mira al cielo — leve elevación
      { pinIdx: 0, offset: [0, -3], scale: 1.05, duration: 1.8, ease: 'sine.inOut' },
      // Sara responde con un pequeño avance hacia Abraham (unidad de la pareja)
      { pinIdx: 1, offset: [-2, 0], scale: 1.03, duration: 1.8, ease: 'sine.inOut' },
      // Promesa se expande — círculo simbólico (ambos crecen al unísono)
      { pinIdx: 0, scale: 1.18, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.15, duration: 1.6, ease: 'sine.inOut' },
      // Pulso de sello (latido del pacto)
      { pinIdx: 0, scale: 1.25, opacity: 1.0, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.22, opacity: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // Latido se calma — el pacto queda grabado
      { pinIdx: 0, scale: 1.1, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.2, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE ISMAEL ---
  // [abraham(0), agar(1), ismael(2), sara(3)]
  // Abraham junto a Agar (la esclava egipcia); Ismael emerge como bebé; Sara se aparta dolida.
  'nacimiento-ismael': {
    steps: [
      // Ismael aparece pequeñísimo (nace)
      { pinIdx: 2, scale: 0.25, opacity: 0.1, duration: 0.01 },
      // Agar se inclina sobre su hijo
      { pinIdx: 1, offset: [0, 2], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Abraham se acerca a Agar e Ismael
      { pinIdx: 0, offset: [-3, 1], duration: 2.0, ease: 'sine.inOut' },
      // Ismael crece (entrada al mundo)
      { pinIdx: 2, scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'power2.out' },
      // Sara se aparta — celos, dolor (deriva lejos, opacidad cae)
      { pinIdx: 3, offset: [12, -2], opacity: 0.45, scale: 0.92, duration: 3.0, ease: 'power2.in' },
      // Abraham pulsa entre alegría y conflicto
      { pinIdx: 0, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE ISAAC ---
  // [abraham(0), sara(1), isaac(2), ismael(3)]
  // Sara (anciana) ríe (escala pulsante), Isaac emerge entre risa y promesa cumplida,
  // Abraham irradia, Ismael en el borde (presencia que será desplazada).
  'nacimiento-isaac': {
    steps: [
      // Isaac nace pequeñísimo (el "hijo de la risa")
      { pinIdx: 2, scale: 0.25, opacity: 0.1, duration: 0.01 },
      // Sara "ríe" — pulso doble de júbilo incrédulo
      { pinIdx: 1, scale: 1.12, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.98, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.12, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 0.5, ease: 'sine.inOut' },
      // Isaac crece (promesa cumplida — luz)
      { pinIdx: 2, scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'power2.out' },
      // Abraham irradia orgullo
      { pinIdx: 0, scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      // Ismael se desplaza ligeramente al margen (tensión con el "hijo prometido")
      { pinIdx: 3, offset: [8, 1], opacity: 0.55, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- AKEDAH (SACRIFICIO DE ISAAC) ---
  // [abraham(0), isaac(1), ismael(2)]
  // Abraham asciende a Moriah, levanta el cuchillo, Isaac tiembla, el ángel detiene
  // (Abraham retrocede súbitamente), Ismael lejos como contrapunto silencioso.
  'akedah-sacrificio-isaac': {
    steps: [
      // Subida al Moriah — Abraham e Isaac ascienden juntos
      { pinIdx: 0, offset: [0, -4], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, -4], duration: 2.0, ease: 'sine.inOut' },
      // Ismael lejos, casi ausente (fue desterrado antes)
      { pinIdx: 2, offset: [30, 4], opacity: 0.3, scale: 0.9, duration: 2.0, ease: 'sine.out' },
      // Abraham levanta el cuchillo — escala+sube
      { pinIdx: 0, offset: [0, -8], scale: 1.18, duration: 1.5, ease: 'power2.in' },
      // Isaac tiembla violento (atado, aterrado)
      { pinIdx: 1, offset: [2, -4], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-2, -4], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [2, -4], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-2, -4], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [0, -4], duration: 0.3, ease: 'power2.out' },
      // ¡El ángel detiene! — Abraham retrocede de golpe (mano paralizada)
      { pinIdx: 0, offset: [-2, -6], scale: 1.0, duration: 0.4, ease: 'power3.out' },
      // Pausa de revelación — Abraham e Isaac quedan suspendidos
      { pinIdx: 0, duration: 0.8 },
      // Isaac respira aliviado (suspiro — leve descenso)
      { pinIdx: 1, offset: [0, -2], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Reset — bajan del monte
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- DESTRUCCIÓN DE SODOMA Y GOMORRA ---
  // [lot(0), abraham(1)]
  // Lot huye al NW (con su familia, esposa que mira atrás y se transforma en sal — sobreentendido),
  // Abraham observa el cataclismo desde lejos (en Hebrón), inmóvil, atónito.
  'destruccion-sodoma-gomorra': {
    steps: [
      // Pre-cataclismo — leve calma tensa
      { pinIdx: 0, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Lot empieza a huir hacia el NW (mirando hacia atrás, dudoso)
      { pinIdx: 0, offset: [-8, -3], duration: 1.5, ease: 'power2.in' },
      // Pausa breve — la mujer de Lot mira atrás (no hay pin, sobreentendido)
      { pinIdx: 0, opacity: 0.7, duration: 0.6, ease: 'sine.inOut' },
      // Lot continúa la fuga, más rápido, más lejos (escapa de la lluvia de azufre)
      { pinIdx: 0, offset: [-22, -10], opacity: 1.0, duration: 3.0, ease: 'power3.in' },
      // Abraham observa desde Hebrón — pulso de horror contenido
      { pinIdx: 1, scale: 1.12, opacity: 1.0, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.96, opacity: 0.85, duration: 1.2, ease: 'sine.inOut' },
      // Abraham se asienta (resignación frente a la justicia divina)
      { pinIdx: 1, scale: 1.0, opacity: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Reset — Lot vuelve al campo visual
      { pinIdx: 0, offset: [0, 0], duration: 2.8, ease: 'sine.inOut' },
    ],
  },

  // --- MUERTE DE SARA ---
  // [sara(0), abraham(1), isaac(2)]
  // Sara se apaga (encoge + se desvanece), Abraham y Isaac inclinan la cabeza en duelo,
  // Abraham hace un gesto de despedida (mano hacia Sara) — luto.
  'muerte-sara': {
    steps: [
      // Sara respira por última vez — leve pulso
      { pinIdx: 0, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Abraham se acerca a su lecho
      { pinIdx: 1, offset: [-3, 0], scale: 1.02, duration: 2.0, ease: 'sine.inOut' },
      // Isaac también se acerca, en silencio
      { pinIdx: 2, offset: [3, 0], scale: 0.98, duration: 2.0, ease: 'sine.inOut' },
      // Sara se va — encoge, baja, desvanece
      { pinIdx: 0, offset: [0, 4], scale: 0.7, opacity: 0.0, duration: 3.5, ease: 'power2.in' },
      // Abraham inclina profundamente (duelo) — escala baja, offset abajo
      { pinIdx: 1, offset: [-3, 4], scale: 0.92, opacity: 0.7, duration: 2.5, ease: 'sine.inOut' },
      // Isaac también se inclina, dolido
      { pinIdx: 2, offset: [3, 5], scale: 0.9, opacity: 0.6, duration: 2.5, ease: 'sine.inOut' },
      // Pausa de luto
      { pinIdx: 1, duration: 1.0 },
      // Reset (memoria — Sara regresa tenue al ciclo)
      { pinIdx: 0, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE JACOB Y ESAÚ ---
  // [isaac(0), rebeca(1), esau(2), jacob(3)]
  // Mellizos en lucha desde el vientre. Esaú sale primero (rojo, peludo) — entrada brusca.
  // Jacob lo sigue, agarrándole el talón — entrada más sigilosa pero con tensión.
  'nacimiento-jacob-esau': {
    steps: [
      // Rebeca pulsa (parto en curso) — Isaac la acompaña tenso
      { pinIdx: 1, scale: 1.1, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.97, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.12, duration: 0.6, ease: 'sine.inOut' },
      // Esaú nace primero — entrada brusca, color sanguíneo (escala rápida)
      { pinIdx: 2, scale: 0.3, opacity: 0.1, duration: 0.01 },
      { pinIdx: 2, scale: 1.1, opacity: 1.0, duration: 1.4, ease: 'power3.out' },
      // Jacob asoma justo después, agarrando el talón (entra desde abajo)
      { pinIdx: 3, scale: 0.3, opacity: 0.1, offset: [0, 4], duration: 0.01 },
      { pinIdx: 3, scale: 1.0, opacity: 1.0, offset: [0, 1], duration: 1.8, ease: 'power2.out' },
      // Lucha sutil de mellizos — Esaú se ladea, Jacob lo "sigue"
      { pinIdx: 2, offset: [3, 0], duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [2, 1], duration: 0.8, ease: 'sine.inOut' },
      // Padres respiran aliviados
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 2, offset: [0, 0], scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1.0, duration: 1.8, ease: 'sine.inOut' },
    ],
  },

  // --- JACOB ROBA LA PRIMOGENITURA ---
  // [jacob(0), esau(1), isaac(2), rebeca(3)]
  // Rebeca conspira (acerca a Jacob), Jacob se acerca a Isaac (engaño), Isaac (ciego) lo "toca"
  // y bendice, Esaú llega tarde, descubre el robo, retrocede furioso.
  'jacob-roba-primogenitura': {
    steps: [
      // Rebeca empuja a Jacob hacia Isaac (conspiración)
      { pinIdx: 3, offset: [-2, 0], scale: 1.05, duration: 1.2, ease: 'sine.inOut' },
      // Jacob avanza, sigiloso, hacia su padre
      { pinIdx: 0, offset: [-6, 0], scale: 0.98, opacity: 0.85, duration: 2.5, ease: 'sine.inOut' },
      // Isaac (ciego) tantea — leve oscilación de cabeza
      { pinIdx: 2, offset: [1, 0], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-1, 0], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 0.4, ease: 'sine.inOut' },
      // Bendición — Isaac irradia (impone manos sobre Jacob); Jacob crece
      { pinIdx: 2, scale: 1.15, opacity: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.15, opacity: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Jacob se retira con la bendición robada — leve retroceso
      { pinIdx: 0, offset: [-2, 2], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Esaú llega tarde (entra desde la derecha — el cazador frustrado)
      { pinIdx: 1, offset: [10, 0], opacity: 0.4, duration: 0.01 },
      { pinIdx: 1, offset: [2, 0], opacity: 1.0, scale: 1.15, duration: 2.0, ease: 'power3.out' },
      // Esaú descubre — retrocede furioso (escala arriba, escudo de ira)
      { pinIdx: 1, offset: [8, -3], scale: 1.25, duration: 1.5, ease: 'power2.in' },
      // Jacob huye levemente más lejos (anticipa la huida a Harán)
      { pinIdx: 0, offset: [-10, 2], opacity: 0.85, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- ESCALERA DE JACOB ---
  // [jacob(0)]
  // Jacob duerme en Betel y sueña con la escalera al cielo — el pin sube/baja en pulsos suaves
  // (ángeles ascendiendo y descendiendo). Al final, despierta con sobresalto y se yergue.
  'escalera-de-jacob': {
    steps: [
      // Jacob se acuesta — escala baja levemente (durmiendo)
      { pinIdx: 0, scale: 0.92, opacity: 0.8, duration: 2.0, ease: 'sine.inOut' },
      // Sueño — primer ángel sube (pulso arriba)
      { pinIdx: 0, offset: [0, -4], scale: 1.0, duration: 1.2, ease: 'sine.inOut' },
      // Ángel desciende (vuelve abajo)
      { pinIdx: 0, offset: [0, 2], scale: 0.95, duration: 1.2, ease: 'sine.inOut' },
      // Segundo ascenso — más alto
      { pinIdx: 0, offset: [0, -7], scale: 1.08, opacity: 1.0, duration: 1.4, ease: 'sine.inOut' },
      // Tercer descenso
      { pinIdx: 0, offset: [0, 3], scale: 0.94, duration: 1.4, ease: 'sine.inOut' },
      // Ascensión final — visión cumbre (Dios al tope de la escalera)
      { pinIdx: 0, offset: [0, -10], scale: 1.15, opacity: 1.0, duration: 1.8, ease: 'power2.out' },
      // Pausa — la promesa resuena
      { pinIdx: 0, duration: 0.8 },
      // Despertar — sobresalto (vibración rápida)
      { pinIdx: 0, offset: [1.5, -8], duration: 0.15, ease: 'power3.out' },
      { pinIdx: 0, offset: [-1.5, -8], duration: 0.15, ease: 'power3.out' },
      // Jacob se yergue, conmovido (este es lugar santo)
      { pinIdx: 0, offset: [0, 0], scale: 1.1, opacity: 1.0, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- JACOB LUCHA CON EL ÁNGEL ---
  // [jacob(0)]
  // Vibración intensa de combate (varios ejes), pausa de bendición (escala arriba),
  // luego cojera permanente (offset abajo + scale 0.97 — herido en la cadera).
  'jacob-lucha-con-angel': {
    steps: [
      // Combate inicial — Jacob choca contra un adversario invisible
      { pinIdx: 0, offset: [4, -2], duration: 0.25, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-4, 2], duration: 0.25, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [3, 3], duration: 0.25, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, -3], duration: 0.25, ease: 'power2.inOut' },
      // Lucha se intensifica — desplazamientos más amplios
      { pinIdx: 0, offset: [6, 0], scale: 1.05, duration: 0.35, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-6, 0], scale: 0.97, duration: 0.35, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [5, -3], duration: 0.3, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-5, 3], duration: 0.3, ease: 'power2.inOut' },
      // Golpe en la cadera — Jacob se inclina (offset abajo súbito)
      { pinIdx: 0, offset: [-2, 5], scale: 0.93, duration: 0.5, ease: 'power3.in' },
      // Pausa de bendición — el ángel lo nombra "Israel" (escala arriba lenta)
      { pinIdx: 0, offset: [0, 2], scale: 1.12, opacity: 1.0, duration: 2.0, ease: 'expo.out' },
      // Amanecer — el ángel parte; Jacob queda solo
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Cojera — Jacob camina renqueando, levemente más bajo
      { pinIdx: 0, offset: [-1, 2], scale: 0.97, duration: 2.0, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- JOSÉ VENDIDO POR SUS HERMANOS ---
  // [jose(0), jacob(1), raquel(2)]
  // José cae al pozo (offset abajo + opacidad), después se aleja a Egipto (lejos a la derecha,
  // muy tenue). Padres entran en luto (escala abajo, opacidad caída).
  'jose-vendido-por-hermanos': {
    steps: [
      // José radiante (la túnica de colores) — pulso de orgullo
      { pinIdx: 0, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      // Cae al pozo — desciende bruscamente, se hunde, opacidad cae
      { pinIdx: 0, offset: [0, 10], opacity: 0.45, scale: 0.85, duration: 1.5, ease: 'power3.in' },
      // Pausa en el pozo — silencio
      { pinIdx: 0, duration: 0.8 },
      // Sacado del pozo — leve elevación (lo izan)
      { pinIdx: 0, offset: [4, 6], opacity: 0.6, duration: 1.2, ease: 'sine.inOut' },
      // Vendido — caravana ismaelita se lo lleva a Egipto (deriva muy lejos a la derecha)
      { pinIdx: 0, offset: [32, 4], opacity: 0.2, scale: 0.8, duration: 3.5, ease: 'power2.in' },
      // Jacob recibe la túnica ensangrentada — encoge, palidece (luto)
      { pinIdx: 1, scale: 0.9, opacity: 0.55, duration: 2.5, ease: 'sine.inOut' },
      // Raquel también enluta (en algunas tradiciones — madre simbólica)
      { pinIdx: 2, scale: 0.92, opacity: 0.55, duration: 2.5, ease: 'sine.inOut' },
      // Jacob se inclina más profundamente — duelo prolongado
      { pinIdx: 1, offset: [0, 4], scale: 0.88, duration: 2.0, ease: 'sine.inOut' },
      // Reset (José en Egipto sigue lejos durante un tiempo simbólico)
      { pinIdx: 0, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- JOSÉ EN EGIPTO ---
  // [jose(0)]
  // José prisionero (escala abajo), interpreta sueños (pulso), Faraón (sin pin) lo eleva —
  // José sube de rango (escala arriba), avanza al centro del poder.
  'jose-en-egipto': {
    steps: [
      // José cautivo — encoge, palidece (en la cárcel)
      { pinIdx: 0, scale: 0.85, opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
      // Interpreta sueños — pulso de sabiduría
      { pinIdx: 0, scale: 0.95, opacity: 0.85, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 0.85, opacity: 0.7, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 0.98, opacity: 0.9, duration: 1.2, ease: 'sine.inOut' },
      // Llamado al palacio — José se mueve al centro y crece (Faraón lo invita)
      { pinIdx: 0, offset: [4, -2], opacity: 1.0, scale: 1.1, duration: 2.0, ease: 'power3.out' },
      // Investidura — Faraón le da la sortija (gran pulso de elevación)
      { pinIdx: 0, scale: 1.25, opacity: 1.0, duration: 1.5, ease: 'expo.out' },
      // José gobierna — pulso estable y majestuoso
      { pinIdx: 0, scale: 1.15, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- REENCUENTRO DE JOSÉ CON SUS HERMANOS ---
  // [jose(0), jacob(1), benjamin(2)]
  // José se acerca (revela su identidad), Jacob (anciano) avanza hacia él lentamente,
  // Benjamín corre, abrazo culminante (pulso simultáneo de los tres).
  'reencuentro-jose-hermanos': {
    steps: [
      // Posiciones iniciales — José en Egipto (centro-derecha), familia en Canaán (izquierda)
      { pinIdx: 0, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      // José se descubre — pulso emocional (revela su identidad)
      { pinIdx: 0, scale: 1.2, opacity: 1.0, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.1, duration: 0.8, ease: 'sine.inOut' },
      // José avanza hacia los hermanos
      { pinIdx: 0, offset: [-6, 0], duration: 2.0, ease: 'sine.inOut' },
      // Jacob (anciano) emprende viaje — avanza desde Canaán hacia Egipto, lento pero firme
      { pinIdx: 1, offset: [8, 0], duration: 3.0, ease: 'sine.inOut' },
      // Benjamín corre — joven, ágil (offset mayor, más rápido)
      { pinIdx: 2, offset: [10, -1], scale: 1.05, duration: 2.0, ease: 'power3.out' },
      // Encuentro — pequeña pausa de tensión
      { pinIdx: 0, duration: 0.6 },
      // Abrazo — los tres pulsan al unísono (clímax emocional)
      { pinIdx: 0, scale: 1.25, opacity: 1.0, duration: 1.2, ease: 'expo.out' },
      { pinIdx: 1, scale: 1.2, opacity: 1.0, duration: 1.2, ease: 'expo.out' },
      { pinIdx: 2, scale: 1.2, opacity: 1.0, duration: 1.2, ease: 'expo.out' },
      // Permanecen unidos un instante
      { pinIdx: 0, scale: 1.12, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.1, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.1, duration: 1.2, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- MUERTE DE JACOB ---
  // [jacob(0), jose(1), benjamin(2)]
  // Jacob (anciano) bendice a sus hijos antes de morir, luego se apaga lentamente;
  // José y Benjamín se inclinan en duelo.
  'muerte-de-jacob': {
    steps: [
      // Jacob respira con esfuerzo — leve pulso
      { pinIdx: 0, scale: 0.98, opacity: 0.9, duration: 1.5, ease: 'sine.inOut' },
      // José se acerca al lecho de su padre
      { pinIdx: 1, offset: [-3, 0], scale: 1.02, duration: 2.0, ease: 'sine.inOut' },
      // Benjamín del otro lado
      { pinIdx: 2, offset: [3, 0], scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      // Jacob bendice — pulso de imposición de manos, irradia
      { pinIdx: 0, scale: 1.15, opacity: 1.0, duration: 1.8, ease: 'expo.out' },
      // La bendición pasa a los hijos
      { pinIdx: 1, scale: 1.1, opacity: 1.0, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.1, opacity: 1.0, duration: 1.2, ease: 'sine.inOut' },
      // Jacob se apaga lentamente — baja, encoge, se desvanece
      { pinIdx: 0, offset: [0, 4], scale: 0.7, opacity: 0.0, duration: 4.0, ease: 'power2.in' },
      // José se inclina en duelo profundo
      { pinIdx: 1, offset: [-3, 4], scale: 0.92, opacity: 0.65, duration: 2.5, ease: 'sine.inOut' },
      // Benjamín también enluta
      { pinIdx: 2, offset: [3, 4], scale: 0.92, opacity: 0.65, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- MUERTE DE JOSÉ ---
  // [jose(0)]
  // José envejece (escala leve abajo), pulsa un par de veces (últimas palabras profetizando
  // el éxodo: "Dios os visitará y subiréis mis huesos"), luego se desvanece lentamente.
  'muerte-de-jose': {
    steps: [
      // José anciano — leve encogimiento
      { pinIdx: 0, scale: 0.95, opacity: 0.9, duration: 2.0, ease: 'sine.inOut' },
      // Profecía — primer pulso ("Dios os visitará")
      { pinIdx: 0, scale: 1.08, opacity: 1.0, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 0.95, opacity: 0.85, duration: 1.0, ease: 'sine.inOut' },
      // Segundo pulso ("Subiréis mis huesos") — más débil
      { pinIdx: 0, scale: 1.05, opacity: 0.95, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 0.92, opacity: 0.75, duration: 1.0, ease: 'sine.inOut' },
      // Apagamiento gradual — baja, encoge, se desvanece
      { pinIdx: 0, offset: [0, 3], scale: 0.7, opacity: 0.0, duration: 4.0, ease: 'power3.in' },
      // Silencio — pausa larga (cierre de la era patriarcal)
      { pinIdx: 0, duration: 1.5 },
      // Reset (memoria — vuelve para el loop)
      { pinIdx: 0, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 3.5, ease: 'sine.inOut' },
    ],
  },

  // --- TORRE DE BABEL ---
  // [nimrod(0), sem(1), cam(2), jafet(3)]
  // Todos construyen juntos, suben en columna. Pausa en la cima (apogeo del orgullo).
  // Confusión de lenguas: vibración nerviosa. Dispersión final en 4 direcciones.
  'torre-de-babel': {
    steps: [
      // Construcción inicial — todos pulsan al ritmo del trabajo
      { pinIdx: 0, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      // Ascenso — la torre sube; Nimrod lidera (sube más alto)
      { pinIdx: 0, offset: [0, -10], scale: 1.12, duration: 2.5, ease: 'power2.out' },
      { pinIdx: 1, offset: [-2, -7], duration: 2.5, ease: 'power2.out' },
      { pinIdx: 2, offset: [2, -7], duration: 2.5, ease: 'power2.out' },
      { pinIdx: 3, offset: [0, -5], duration: 2.5, ease: 'power2.out' },
      // Pausa en la cima — apogeo del orgullo, silencio antes del juicio
      { pinIdx: 0, duration: 1.2 },
      // Confusión de lenguas — vibración nerviosa, todos tiemblan
      { pinIdx: 0, offset: [1, -10], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-3, -7], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [3, -7], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 3, offset: [-1, -5], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1, -10], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-1, -7], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [1, -7], duration: 0.15, ease: 'power2.inOut' },
      { pinIdx: 3, offset: [1, -5], duration: 0.15, ease: 'power2.inOut' },
      // ¡Dispersión! — cada uno huye en una dirección diferente (4 puntos cardinales)
      { pinIdx: 0, offset: [0, 18], scale: 0.85, opacity: 0.55, duration: 3.0, ease: 'power3.in' },     // S
      { pinIdx: 1, offset: [-25, 4], opacity: 0.6, scale: 0.9, duration: 3.0, ease: 'power3.in' },     // W
      { pinIdx: 2, offset: [25, 4], opacity: 0.6, scale: 0.9, duration: 3.0, ease: 'power3.in' },      // E
      { pinIdx: 3, offset: [0, -22], opacity: 0.5, scale: 0.85, duration: 3.0, ease: 'power3.in' },    // N
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], scale: 1.0, opacity: 1.0, duration: 2.5, ease: 'sine.inOut' },
    ],
  },
};

export default PATRIARCAL;
