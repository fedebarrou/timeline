import type { ChoreographySet } from './types';

/**
 * Choreographies for events in the Reinos y Exilio era.
 *
 * Pin indices follow the order declared in each event's MDX `characters:` array.
 * Each step animates a single pin with offset/scale/opacity/duration/ease;
 * concurrent motion is achieved by interleaving steps for different pins.
 */
const REINOS_Y_EXILIO: ChoreographySet = {
  // -------------------------------------------------------------------------
  // david-vs-goliat: david(0), goliat(1), saul(2)
  // Goliat gigante intimida → David se acerca con la honda → Goliat cae → David crece.
  // -------------------------------------------------------------------------
  'david-vs-goliat': {
    steps: [
      // Set the stage: Goliat looms huge, Saul watches from behind, David tiny.
      { pinIdx: 1, scale: 1.4, opacity: 1, duration: 1.0, ease: 'power2.out' },
      { pinIdx: 0, scale: 0.85, offset: [-6, 4], opacity: 0.9, duration: 1.0, ease: 'power2.out' },
      { pinIdx: 2, scale: 0.95, offset: [0, -3], opacity: 0.7, duration: 1.0, ease: 'sine.inOut' },
      // Goliat taunts: a heavy pulse.
      { pinIdx: 1, scale: 1.5, duration: 0.6, ease: 'power3.out' },
      { pinIdx: 1, scale: 1.4, duration: 0.5, ease: 'sine.inOut' },
      // David steps forward into the field.
      { pinIdx: 0, offset: [4, 2], scale: 0.95, duration: 1.1, ease: 'power2.inOut' },
      // The sling whirls — micro jitter on David.
      { pinIdx: 0, offset: [5, 1], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [3, 3], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [4, 2], duration: 0.25, ease: 'sine.inOut' },
      // Stone hits — Goliat crumbles.
      { pinIdx: 1, offset: [0, 10], scale: 0.5, opacity: 0.2, duration: 1.4, ease: 'power3.in' },
      // Saul rises slightly, surprised.
      { pinIdx: 2, scale: 1.05, opacity: 1, duration: 0.8, ease: 'power2.out' },
      // David grows into his victory.
      { pinIdx: 0, scale: 1.2, offset: [4, 0], opacity: 1, duration: 1.1, ease: 'power2.out' },
      // Reset for loop.
      { pinIdx: 1, offset: [0, 0], scale: 1.4, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // ascenso-elias: elias(0), eliseo(1)
  // Carro de fuego sube → Eliseo recibe el manto.
  // -------------------------------------------------------------------------
  'ascenso-elias': {
    steps: [
      // Both prophets together.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      // Wind picks up: Elias trembles, Eliseo looks up.
      { pinIdx: 0, offset: [1, -1], duration: 0.3, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1, -1], duration: 0.3, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, -2], duration: 0.3, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 0.6, ease: 'power2.out' },
      // Chariot lifts Elias upward.
      { pinIdx: 0, offset: [0, -12], scale: 0.85, opacity: 0.6, duration: 1.2, ease: 'power2.in' },
      { pinIdx: 0, offset: [0, -22], scale: 0.7, opacity: 0.25, duration: 1.2, ease: 'power3.in' },
      { pinIdx: 0, offset: [0, -32], scale: 0.5, opacity: 0, duration: 1.0, ease: 'power3.in' },
      // Mantle falls — Eliseo grows in stature.
      { pinIdx: 1, scale: 1.25, opacity: 1, duration: 1.2, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.2, duration: 0.8, ease: 'sine.inOut' },
      // Reset.
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // daniel-en-babilonia: daniel(0), sadrac-mesac-abednego(1), nabucodonosor(2), dario(3)
  // Daniel sereno → reyes nerviosos a los costados (jitter) → Daniel intacto.
  // -------------------------------------------------------------------------
  'daniel-en-babilonia': {
    steps: [
      // Set: Daniel centered calm, companions nearby, kings flanking.
      { pinIdx: 0, scale: 1.08, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 0.95, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.05, opacity: 0.9, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.05, opacity: 0.9, duration: 1.0, ease: 'sine.inOut' },
      // Daniel breathes calm — subtle pulse.
      { pinIdx: 0, scale: 1.12, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.08, duration: 0.9, ease: 'sine.inOut' },
      // Kings tremble (jitter shake).
      { pinIdx: 2, offset: [1.2, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [-1.2, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-1.2, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [1.2, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], duration: 0.18, ease: 'sine.inOut' },
      // Companions hold fast (faint pulse — horno).
      { pinIdx: 1, scale: 1.08, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      // Daniel confirms intact.
      { pinIdx: 0, scale: 1.18, opacity: 1, duration: 1.0, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // sanson: sanson(0), dalila(1)
  // Fuerte → Dalila se acerca → pierde el pelo → Dalila triunfa.
  // -------------------------------------------------------------------------
  'sanson': {
    steps: [
      // Sansón powerful, Dalila distant.
      { pinIdx: 0, scale: 1.2, opacity: 1, duration: 1.0, ease: 'power2.out' },
      { pinIdx: 1, scale: 0.9, offset: [6, 0], opacity: 0.8, duration: 1.0, ease: 'sine.inOut' },
      // Strong pulse — Sansón flexes.
      { pinIdx: 0, scale: 1.25, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.2, duration: 0.6, ease: 'sine.inOut' },
      // Dalila approaches.
      { pinIdx: 1, offset: [3, 0], scale: 1, opacity: 1, duration: 1.4, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [1.5, 0], scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Sleep — and the cut.
      { pinIdx: 0, offset: [0, 2], duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 0.85, opacity: 0.6, duration: 1.4, ease: 'power3.in' },
      // Dalila triumphs over him.
      { pinIdx: 1, scale: 1.2, opacity: 1, duration: 1.0, ease: 'power2.out' },
      // Sansón fallen, faint.
      { pinIdx: 0, scale: 0.8, opacity: 0.45, duration: 0.8, ease: 'sine.inOut' },
      // Reset.
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // exilio-babilonico: jeremias(0), nabucodonosor(1)
  // Drift al este (deportacion) → Nabucodonosor grande → Jeremias lamenta.
  // -------------------------------------------------------------------------
  'exilio-babilonico': {
    steps: [
      // Initial: Jeremías present, Nabucodonosor looming.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.15, opacity: 1, duration: 1.0, ease: 'power2.out' },
      // Babilonia advances — Nabucodonosor pulses, grows.
      { pinIdx: 1, scale: 1.25, duration: 0.8, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.2, duration: 0.6, ease: 'sine.inOut' },
      // Deportation: Jeremías drifts east, fades.
      { pinIdx: 0, offset: [5, 1], opacity: 0.7, duration: 1.3, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [10, 2], opacity: 0.4, scale: 0.9, duration: 1.3, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [14, 3], opacity: 0.25, scale: 0.85, duration: 1.2, ease: 'power3.in' },
      // Lament held in the distance.
      { pinIdx: 0, offset: [14, 4], opacity: 0.3, duration: 0.8, ease: 'sine.inOut' },
      // Nabucodonosor retreats subtly — empire stretched thin.
      { pinIdx: 1, scale: 1.1, opacity: 0.9, duration: 0.9, ease: 'sine.inOut' },
      // Reverse drift — return motion preludes future hope.
      { pinIdx: 0, offset: [8, 2], opacity: 0.55, scale: 0.92, duration: 1.2, ease: 'power2.out' },
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' },
      // Reset Nabucodonosor.
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // regreso-del-exilio: ciro(0), zorobabel(1), esdras(2)
  // Ciro emite decreto → Zorobabel y Esdras vuelven (drift desde el este).
  // -------------------------------------------------------------------------
  'regreso-del-exilio': {
    steps: [
      // Ciro decrees from the east.
      { pinIdx: 0, scale: 1.15, opacity: 1, duration: 1.0, ease: 'power2.out' },
      { pinIdx: 1, offset: [10, 0], scale: 0.85, opacity: 0.5, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [12, 0], scale: 0.85, opacity: 0.5, duration: 0.9, ease: 'sine.inOut' },
      // Ciro pulses authority.
      { pinIdx: 0, scale: 1.22, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.15, duration: 0.6, ease: 'sine.inOut' },
      // Zorobabel returns — leading the first caravan.
      { pinIdx: 1, offset: [5, 0], scale: 0.95, opacity: 0.8, duration: 1.3, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.1, opacity: 1, duration: 1.3, ease: 'power2.out' },
      // Esdras follows.
      { pinIdx: 2, offset: [6, 0], scale: 0.95, opacity: 0.85, duration: 1.2, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.1, opacity: 1, duration: 1.2, ease: 'power2.out' },
      // Reconstruction pulse — both pulse together.
      { pinIdx: 1, scale: 1.18, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 2, scale: 1.18, duration: 0.6, ease: 'power2.out' },
      // Settle.
      { pinIdx: 0, scale: 1, opacity: 0.9, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // reina-de-saba: salomon(0), reina-de-saba(1)
  // Visita real — pulse, encuentro entre los dos.
  // -------------------------------------------------------------------------
  'reina-de-saba': {
    steps: [
      // Salomón seated, the queen distant.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.9, offset: [8, 0], opacity: 0.7, duration: 1.0, ease: 'sine.inOut' },
      // Salomon's regal pulse.
      { pinIdx: 0, scale: 1.18, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.1, duration: 0.6, ease: 'sine.inOut' },
      // Queen approaches with her caravan.
      { pinIdx: 1, offset: [5, 0], scale: 0.95, opacity: 0.85, duration: 1.2, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [2.5, 0], scale: 1.05, opacity: 1, duration: 1.2, ease: 'power2.out' },
      // Mutual pulse — riddles exchanged.
      { pinIdx: 0, scale: 1.15, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.15, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.1, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.1, duration: 0.5, ease: 'sine.inOut' },
      // Queen returns home — drift back, softer.
      { pinIdx: 1, offset: [6, 0], scale: 0.95, opacity: 0.8, duration: 1.4, ease: 'power2.inOut' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // batsabe-y-natan: david(0), batsabe(1), urias(2), natan(3)
  // Batsabe baño → David la mira → Urias muere → Natan acusa → David arrepentido.
  // -------------------------------------------------------------------------
  'batsabe-y-natan': {
    steps: [
      // Initial scene.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.95, opacity: 0.85, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 0.9, opacity: 0.6, offset: [-4, 0], duration: 0.8, ease: 'sine.inOut' },
      // Batsabé bathes — subtle motion.
      { pinIdx: 1, scale: 1.05, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 0.7, ease: 'sine.inOut' },
      // David is drawn toward her.
      { pinIdx: 0, offset: [2, 1], scale: 1.12, duration: 1.0, ease: 'power2.inOut' },
      // Urias falls — sent to the front.
      { pinIdx: 2, offset: [4, 4], scale: 0.75, opacity: 0.15, duration: 1.3, ease: 'power3.in' },
      // Natán steps forward to accuse.
      { pinIdx: 3, offset: [0, 0], scale: 1.1, opacity: 1, duration: 1.0, ease: 'power2.out' },
      { pinIdx: 3, scale: 1.18, duration: 0.6, ease: 'power2.out' },
      // David falters — repentance.
      { pinIdx: 0, offset: [2, 4], scale: 0.92, opacity: 0.75, duration: 1.2, ease: 'power2.in' },
      // Batsabé softens.
      { pinIdx: 1, scale: 0.95, opacity: 0.85, duration: 1.0, ease: 'sine.inOut' },
      // Reset.
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [-4, 0], scale: 0.9, opacity: 0.6, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // gedeon: gedeon(0)
  // 300 simbolizados con scale + pulse, Gedeón pulsa al frente.
  // -------------------------------------------------------------------------
  'gedeon': {
    steps: [
      // Initial.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'sine.inOut' },
      // Vellón test — Gedeón shrinks (doubt).
      { pinIdx: 0, scale: 0.92, opacity: 0.85, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      // Recruitment pulses — 32k → 10k → 300, each smaller pulse but tighter.
      { pinIdx: 0, scale: 1.2, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.05, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.15, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.05, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.12, duration: 0.4, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.08, duration: 0.4, ease: 'sine.inOut' },
      // Night attack — jitter (cántaros y trompetas).
      { pinIdx: 0, offset: [1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.18, ease: 'sine.inOut' },
      // Victory pulse.
      { pinIdx: 0, scale: 1.25, opacity: 1, duration: 0.8, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // conquista-jerico: josue(0), rahab(1)
  // Vueltas — Josué orbita, Rahab espera → muros caen (shake) → reset.
  // -------------------------------------------------------------------------
  'conquista-jerico': {
    steps: [
      // Initial.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.95, opacity: 0.85, duration: 0.8, ease: 'sine.inOut' },
      // Seven laps — Josué orbits.
      { pinIdx: 0, offset: [3, -1], duration: 0.45, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, -3], duration: 0.45, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-3, -1], duration: 0.45, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-3, 2], duration: 0.45, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 3], duration: 0.45, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [3, 2], duration: 0.45, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.45, ease: 'sine.inOut' },
      // Final trumpet pulse on Josué.
      { pinIdx: 0, scale: 1.25, duration: 0.5, ease: 'power2.out' },
      // Walls collapse — everything shakes.
      { pinIdx: 0, offset: [1.5, 0], duration: 0.14, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-1.5, 0], duration: 0.14, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1.5, 0], duration: 0.14, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [1.5, 0], duration: 0.14, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.14, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.14, ease: 'sine.inOut' },
      // Rahab is preserved — grows.
      { pinIdx: 1, scale: 1.12, opacity: 1, duration: 1.0, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // profetas-mayores: isaias(0), jeremias(1), ezequiel(2)
  // Cada uno pulsa en secuencia.
  // -------------------------------------------------------------------------
  'profetas-mayores': {
    steps: [
      // Initial.
      { pinIdx: 0, scale: 1, opacity: 0.9, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 0.9, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 0.9, duration: 0.8, ease: 'sine.inOut' },
      // Isaías speaks first.
      { pinIdx: 0, scale: 1.15, opacity: 1, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1, opacity: 0.9, duration: 0.7, ease: 'sine.inOut' },
      // Jeremías follows.
      { pinIdx: 1, scale: 1.15, opacity: 1, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 1, scale: 1, opacity: 0.9, duration: 0.7, ease: 'sine.inOut' },
      // Ezequiel — visión de la merkavá.
      { pinIdx: 2, scale: 1.15, opacity: 1, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 2, scale: 1, opacity: 0.9, duration: 0.7, ease: 'sine.inOut' },
      // Chorus: the three together — convergent pulse.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 2, scale: 1.1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      // Settle.
      { pinIdx: 0, scale: 1, opacity: 0.9, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 0.9, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 0.9, duration: 1.2, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // rebelion-de-absalon: david(0), absalon(1), joab(2)
  // Absalón se aleja de David → batalla → cae.
  // -------------------------------------------------------------------------
  'rebelion-de-absalon': {
    steps: [
      // Family scene.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.95, opacity: 0.8, offset: [-3, 1], duration: 0.9, ease: 'sine.inOut' },
      // Absalón drifts away — conspiracy.
      { pinIdx: 1, offset: [4, -1], scale: 1.05, duration: 1.2, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [7, -2], scale: 1.1, duration: 1.0, ease: 'power2.inOut' },
      // David shrinks — heartbroken, fugitive.
      { pinIdx: 0, offset: [-2, 2], scale: 0.92, opacity: 0.8, duration: 1.2, ease: 'power2.inOut' },
      // Joab steps in — military.
      { pinIdx: 2, offset: [-1, 0], scale: 1.1, opacity: 1, duration: 0.9, ease: 'power2.out' },
      // Battle — Absalón shakes, caught.
      { pinIdx: 1, offset: [7, -3], duration: 0.16, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [7, -1], duration: 0.16, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [7, -3], duration: 0.16, ease: 'sine.inOut' },
      // Joab strikes.
      { pinIdx: 2, scale: 1.18, duration: 0.5, ease: 'power2.out' },
      // Absalón falls — hung by his hair.
      { pinIdx: 1, offset: [7, 8], scale: 0.6, opacity: 0, duration: 1.3, ease: 'power3.in' },
      // David grieves.
      { pinIdx: 0, offset: [-2, 3], scale: 0.88, opacity: 0.7, duration: 1.0, ease: 'sine.inOut' },
      // Reset.
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-3, 1], scale: 0.95, opacity: 0.8, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // reinado-saul: saul(0), samuel(1), jonatan(2)
  // Unidad → división (drift apart) → caída.
  // -------------------------------------------------------------------------
  'reinado-saul': {
    steps: [
      // Initial unity.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      // Samuel anoints — Saúl pulses.
      { pinIdx: 1, scale: 1.12, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.18, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.1, duration: 0.5, ease: 'sine.inOut' },
      // Disobedience: Samuel drifts away.
      { pinIdx: 1, offset: [-5, 0], opacity: 0.6, duration: 1.2, ease: 'power2.inOut' },
      // Jonatán remains loyal.
      { pinIdx: 2, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      // Saúl tormented — jitter.
      { pinIdx: 0, offset: [1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.18, ease: 'sine.inOut' },
      // Gilboa: Jonatán falls first.
      { pinIdx: 2, offset: [2, 5], scale: 0.7, opacity: 0.15, duration: 1.2, ease: 'power3.in' },
      // Saúl falls on his sword.
      { pinIdx: 0, offset: [0, 6], scale: 0.6, opacity: 0, duration: 1.4, ease: 'power3.in' },
      // Reset.
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // salomon-rey: salomon(0)
  // Pulso real → sabiduría (slow scale up) → estable.
  // -------------------------------------------------------------------------
  'salomon-rey': {
    steps: [
      // Royal entrance.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      // Royal pulse — coronation.
      { pinIdx: 0, scale: 1.18, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.1, duration: 0.6, ease: 'sine.inOut' },
      // The dream at Gabaón — quiet.
      { pinIdx: 0, scale: 1.05, opacity: 0.9, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 0, opacity: 0.7, duration: 0.8, ease: 'sine.inOut' },
      // Wisdom granted — slow swell.
      { pinIdx: 0, scale: 1.2, opacity: 1, duration: 1.6, ease: 'power2.out' },
      // Steady reign — gentle breathing.
      { pinIdx: 0, scale: 1.18, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.22, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.18, duration: 0.9, ease: 'sine.inOut' },
      // Judgment scene — sharp pulse.
      { pinIdx: 0, scale: 1.28, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.18, duration: 0.6, ease: 'sine.inOut' },
      // Settle.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // templo-de-salomon: salomon(0), hiram-rey-de-tiro(1)
  // Pulse central + pulses concéntricos de construcción.
  // -------------------------------------------------------------------------
  'templo-de-salomon': {
    steps: [
      // Initial alliance.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, offset: [4, 0], opacity: 0.9, duration: 1.0, ease: 'sine.inOut' },
      // Hiram sends cedars — pulse from Tiro.
      { pinIdx: 1, scale: 1.12, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 1, scale: 1, duration: 0.6, ease: 'sine.inOut' },
      // Salomón receives — central pulse.
      { pinIdx: 0, scale: 1.2, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.1, duration: 0.6, ease: 'sine.inOut' },
      // Construction — concentric pulses, alternating.
      { pinIdx: 0, scale: 1.16, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.2, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.12, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.24, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.16, duration: 0.5, ease: 'power2.out' },
      // Dedication — la nube de la gloria llena la casa.
      { pinIdx: 0, scale: 1.3, opacity: 1, duration: 1.0, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // division-del-reino: roboam(0), jeroboam(1)
  // Drift apart entre los dos pins.
  // -------------------------------------------------------------------------
  'division-del-reino': {
    steps: [
      // Initial together (Siquem assembly).
      { pinIdx: 0, scale: 1.05, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      // Tension pulse.
      { pinIdx: 0, scale: 1.12, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.12, duration: 0.5, ease: 'power2.out' },
      // Confrontation — small jitter, both.
      { pinIdx: 0, offset: [-1, 0], duration: 0.2, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [1, 0], duration: 0.2, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.2, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.2, ease: 'sine.inOut' },
      // Drift apart — north and south.
      { pinIdx: 0, offset: [-4, 1], scale: 1, duration: 1.3, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [4, -1], scale: 1, duration: 1.3, ease: 'power2.inOut' },
      // Further apart, with simultaneous independent pulses.
      { pinIdx: 0, offset: [-7, 1], duration: 1.0, ease: 'power2.out' },
      { pinIdx: 1, offset: [7, -1], duration: 1.0, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.1, opacity: 0.9, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.1, opacity: 0.9, duration: 0.7, ease: 'sine.inOut' },
      // Reset.
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 1.6, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // debora-profetisa: debora(0), barac(1), sisara(2), jael(3)
  // Pulse profético, Barak avanza, Sisara cae, Jael remata.
  // -------------------------------------------------------------------------
  'debora-profetisa': {
    steps: [
      // Initial.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 0.9, offset: [-3, 0], duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.05, opacity: 0.85, offset: [5, 0], duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 0.85, opacity: 0.55, offset: [8, 1], duration: 0.9, ease: 'sine.inOut' },
      // Prophetic pulse — Débora.
      { pinIdx: 0, scale: 1.2, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.1, duration: 0.5, ease: 'sine.inOut' },
      // Barak advances with her.
      { pinIdx: 1, offset: [0, 0], scale: 1.08, opacity: 1, duration: 1.0, ease: 'power2.inOut' },
      { pinIdx: 1, scale: 1.15, duration: 0.5, ease: 'power2.out' },
      // Sísara routed — jitter and shrink.
      { pinIdx: 2, offset: [6, 1], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [4, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [8, 2], scale: 0.85, opacity: 0.5, duration: 0.9, ease: 'power2.in' },
      // Sísara flees to Jael's tent.
      { pinIdx: 2, offset: [9, 1], scale: 0.8, duration: 1.0, ease: 'power2.inOut' },
      // Jael strikes — sharp pulse.
      { pinIdx: 3, scale: 1.15, opacity: 1, duration: 0.6, ease: 'power2.out' },
      // Sísara vanishes.
      { pinIdx: 2, scale: 0.55, opacity: 0, duration: 0.8, ease: 'power3.in' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-3, 0], scale: 1, opacity: 0.9, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [5, 0], scale: 1.05, opacity: 0.85, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [8, 1], scale: 0.85, opacity: 0.55, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // david-rey: david(0), joab(1)
  // David ungido → conquista Jerusalén con Joab → promesa dinástica.
  // -------------------------------------------------------------------------
  'david-rey': {
    steps: [
      // Initial.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.95, opacity: 0.85, offset: [-3, 0], duration: 1.0, ease: 'sine.inOut' },
      // Anointing pulse.
      { pinIdx: 0, scale: 1.2, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.12, duration: 0.5, ease: 'sine.inOut' },
      // Joab advances — strike on Jerusalén.
      { pinIdx: 1, offset: [-1, -1], scale: 1.08, opacity: 1, duration: 1.0, ease: 'power2.inOut' },
      { pinIdx: 1, scale: 1.15, duration: 0.5, ease: 'power2.out' },
      // Jerusalem conquered — David at center.
      { pinIdx: 0, scale: 1.22, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.14, duration: 0.5, ease: 'sine.inOut' },
      // Ark enters — dance pulse (offset y- subtle).
      { pinIdx: 0, offset: [0, -1], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 1], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.4, ease: 'sine.inOut' },
      // Davidic promise — slow swell.
      { pinIdx: 0, scale: 1.25, opacity: 1, duration: 1.4, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-3, 0], scale: 0.95, opacity: 0.85, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // elias-y-baal: elias(0), ajab(1), jezabel(2)
  // Carmelo: Elías reta — Baal calla — fuego del cielo cae.
  // -------------------------------------------------------------------------
  'elias-y-baal': {
    steps: [
      // Initial setup.
      { pinIdx: 0, scale: 1.1, opacity: 1, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 0.9, offset: [4, 0], duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.05, opacity: 1, offset: [6, -1], duration: 0.9, ease: 'sine.inOut' },
      // Baal's prophets cry out — Ajab and Jezabel pulse, fail.
      { pinIdx: 1, scale: 1.08, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 2, scale: 1.1, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 0.95, opacity: 0.7, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.95, opacity: 0.7, duration: 0.7, ease: 'sine.inOut' },
      // Elías prays — quiet, then fire from heaven.
      { pinIdx: 0, scale: 1.05, opacity: 0.85, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.3, opacity: 1, duration: 0.6, ease: 'power3.out' },
      // Fire sweep — sharp scale pulses on Elías.
      { pinIdx: 0, scale: 1.35, duration: 0.35, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.2, duration: 0.4, ease: 'sine.inOut' },
      // Ajab cowers, Jezabel rages — opposite reactions.
      { pinIdx: 1, scale: 0.85, opacity: 0.55, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [6, -2], scale: 1.1, opacity: 1, duration: 0.8, ease: 'power2.out' },
      { pinIdx: 2, offset: [8, -1], opacity: 0.7, duration: 1.0, ease: 'power2.inOut' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [4, 0], scale: 1, opacity: 0.9, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [6, -1], scale: 1.05, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // conquista-canaan: josue(0)
  // Tres campañas (centro, sur, norte) — pulse + offset triangular.
  // -------------------------------------------------------------------------
  'conquista-canaan': {
    steps: [
      // Initial.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.12, duration: 0.6, ease: 'power2.out' },
      // Campaign center — Hai.
      { pinIdx: 0, offset: [0, -3], scale: 1.18, duration: 0.9, ease: 'power2.out' },
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 0.7, ease: 'sine.inOut' },
      // Campaign south — sun stops.
      { pinIdx: 0, offset: [-4, 2], scale: 1.18, duration: 0.9, ease: 'power2.out' },
      { pinIdx: 0, offset: [-4, 2], scale: 1.25, duration: 0.5, ease: 'power3.out' },
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 0.7, ease: 'sine.inOut' },
      // Campaign north — Hazor.
      { pinIdx: 0, offset: [4, -2], scale: 1.18, duration: 0.9, ease: 'power2.out' },
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 0.7, ease: 'sine.inOut' },
      // Division by lot — gentle four-corner pulse.
      { pinIdx: 0, offset: [2, 2], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-2, 2], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-2, -2], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [2, -2], duration: 0.4, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.4, ease: 'sine.inOut' },
      // Rest — the land rested from war.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // periodo-jueces: jueces-multiples(0)
  // Ciclo: pecado → opresión → clamor → liberador → paz → recaída.
  // -------------------------------------------------------------------------
  'periodo-jueces': {
    steps: [
      // Initial paz.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'sine.inOut' },
      // Pecado: dim and shrink.
      { pinIdx: 0, scale: 0.9, opacity: 0.65, duration: 0.9, ease: 'sine.inOut' },
      // Opresión: jitter under invader.
      { pinIdx: 0, offset: [1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [1, 0], duration: 0.18, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.18, ease: 'sine.inOut' },
      // Clamor: faint upward stretch.
      { pinIdx: 0, offset: [0, -1], opacity: 0.8, duration: 0.7, ease: 'sine.inOut' },
      // Liberador — judge rises.
      { pinIdx: 0, offset: [0, 0], scale: 1.18, opacity: 1, duration: 0.7, ease: 'power2.out' },
      // Paz — settle.
      { pinIdx: 0, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Recaída again — slight dim.
      { pinIdx: 0, scale: 0.95, opacity: 0.75, duration: 0.9, ease: 'sine.inOut' },
      // Second cycle pulse.
      { pinIdx: 0, scale: 1.15, opacity: 1, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 0, scale: 0.95, opacity: 0.7, duration: 0.7, ease: 'sine.inOut' },
      // Third cycle pulse.
      { pinIdx: 0, scale: 1.15, opacity: 1, duration: 0.6, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },

  // -------------------------------------------------------------------------
  // samuel-ultimo-juez: samuel(0), ana(1)
  // Oración de Ana → nacimiento → llamado nocturno → unción.
  // -------------------------------------------------------------------------
  'samuel-ultimo-juez': {
    steps: [
      // Ana barren — quiet, small.
      { pinIdx: 1, scale: 0.9, opacity: 0.75, duration: 0.9, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 0.85, opacity: 0.4, duration: 0.9, ease: 'sine.inOut' },
      // Ana's prayer — pulse.
      { pinIdx: 1, scale: 1.05, opacity: 1, duration: 0.8, ease: 'power2.out' },
      // Samuel born / dedicated — emerges.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' },
      // Nocturnal call — subtle pulses on Samuel.
      { pinIdx: 0, scale: 1.08, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.08, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.12, duration: 0.5, ease: 'power2.out' },
      // Samuel grows into prophet.
      { pinIdx: 0, scale: 1.2, opacity: 1, duration: 1.2, ease: 'power2.out' },
      // Ana — Magnificat pulse.
      { pinIdx: 1, scale: 1.1, duration: 0.7, ease: 'power2.out' },
      { pinIdx: 1, scale: 1, duration: 0.7, ease: 'sine.inOut' },
      // Samuel anoints kings — final regal pulse.
      { pinIdx: 0, scale: 1.22, duration: 0.7, ease: 'power2.out' },
      // Reset.
      { pinIdx: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.4, ease: 'sine.inOut' },
    ],
  },
};

export default REINOS_Y_EXILIO;
