import { gsap } from './scrollytelling';
import type { ChoreoStep, Choreography } from './choreography/types';
import PRIMORDIAL from './choreography/primordial';
import PATRIARCAL from './choreography/patriarcal';
import EXODO from './choreography/exodo';
import REINOS_Y_EXILIO from './choreography/reinos-y-exilio';
import EVANGELIO from './choreography/evangelio';
import REVELACION from './choreography/revelacion';

// Pin index order per event (matches MDX frontmatter characters array order):
// nacimiento-adan-eva: [adan(0), eva(1), lilith(2)]
// expulsion-eden:      [adan(0), eva(1), lilith(2)]
// cain-mata-abel:      [cain(0), abel(1)]
// nacimiento-cain:     [adan(0), eva(1), cain(2)]
// nacimiento-abel:     [adan(0), eva(1), abel(2)]
// nacimiento-set:      [adan(0), eva(1), set(2)]
// nacimiento-enoc:     [enoc(0), jared(1), mahalalel(2), vigilantes(3), semjaza(4), azazel(5), nephilim(6)]
// asuncion-enoc:       [enoc(0), jared(1), vigilantes(2), semjaza(3)]
// nacimiento-noe:      [noe(0), lamec(1), matusalen(2), jared(3)]
// orden-construir-arca:[noe(0), nephilim(1), vigilantes(2)]
// diluvio:             [noe(0), sem(1), cam(2), jafet(3), matusalen(4), nephilim(5), vigilantes(6)]

/**
 * Legacy inline definitions. NEW choreographies live in per-era files under
 * `./choreography/{era}.ts` and are spread on top of these, so anything an
 * era module declares OVERRIDES the inline default. Keeping both lets the
 * site keep working while per-era animations get richened incrementally.
 */
const INLINE_CHOREOGRAPHIES: Record<string, Choreography> = {
  // --- NACIMIENTO DE ADÁN Y EVA ---
  // Adan + Eva slowly emerge (creation glow), then Lilith appears ghostly at the side
  'nacimiento-adan-eva': {
    steps: [
      // Adan + Eva start small/faint (born from dust)
      { pinIdx: 0, scale: 0.6, opacity: 0.3, duration: 0.01 },
      { pinIdx: 1, scale: 0.6, opacity: 0.3, duration: 0.01 },
      // Rise into existence
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' },
      // Brief togetherness — lean slightly apart (two distinct beings)
      { pinIdx: 0, offset: [-3, 0], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [3, 0], duration: 1.0, ease: 'sine.inOut' },
      // Lilith appears at the far side, ghostly (rabbinical tradition, not yet expelled)
      { pinIdx: 2, opacity: 0.4, offset: [25, -5], duration: 1.5, ease: 'sine.out' },
      // Reset for loop
      { pinIdx: 0, offset: [0, 0], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.4, offset: [25, -5], duration: 0.5 },
    ],
  },

  // --- EXPULSIÓN DEL EDÉN ---
  // Adan + Eva drift outward (forced, sad exit), Lilith drifts FAR (rebellious exile)
  'expulsion-eden': {
    steps: [
      // Adan drifts left + down (expelled, grief)
      { pinIdx: 0, offset: [-12, 8], opacity: 0.5, duration: 3.0, ease: 'sine.inOut' },
      // Eva drifts right + down
      { pinIdx: 1, offset: [12, 8], opacity: 0.5, duration: 3.0, ease: 'sine.inOut' },
      // Lilith drifts FAR right (rebellious flight, longer arc, near-vanishing)
      { pinIdx: 2, offset: [40, -3], opacity: 0.25, scale: 0.85, duration: 4.0, ease: 'power2.in' },
      // Brief hold
      { pinIdx: 0, duration: 1.2 },
      // Reset — all return
      { pinIdx: 0, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 0.6, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- CAÍN MATA A ABEL ---
  // Cain approaches Abel, attacks; Abel falls/fades; Cain exiles far to Nod
  'cain-mata-abel': {
    steps: [
      // Cain drifts toward Abel (jealous approach)
      { pinIdx: 0, offset: [16, 0], duration: 2.4, ease: 'sine.inOut' },
      // Abel struck — falls + fades (violent, quick)
      { pinIdx: 1, offset: [2, 12], opacity: 0.2, scale: 0.85, duration: 0.8, ease: 'power3.in' },
      // Cain recoils briefly
      { pinIdx: 0, offset: [10, -3], duration: 0.8, ease: 'power2.out' },
      // Cain exiles far to Nod (east, far away, cursed wandering)
      { pinIdx: 0, offset: [45, -8], opacity: 0.4, duration: 3.5, ease: 'power2.in' },
      // Reset
      { pinIdx: 0, offset: [0, 0], opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE CAÍN ---
  // Cain (idx 2) emerges small; parents (adan/eva) swell with pride
  'nacimiento-cain': {
    steps: [
      { pinIdx: 2, scale: 0.3, opacity: 0.2, duration: 0.01 },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 2.0, ease: 'power2.out' },
      // Proud parents swell slightly
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      // Settle back
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.0 },
    ],
  },

  // --- NACIMIENTO DE ABEL ---
  // Abel (idx 2) emerges; same pattern as nacimiento-cain
  'nacimiento-abel': {
    steps: [
      { pinIdx: 2, scale: 0.3, opacity: 0.2, duration: 0.01 },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 2.0, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.0 },
    ],
  },

  // --- NACIMIENTO DE SET ---
  // Set (idx 2) replaces Abel; parents relieved/joyful
  'nacimiento-set': {
    steps: [
      { pinIdx: 2, scale: 0.3, opacity: 0.2, duration: 0.01 },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 2.0, ease: 'power2.out' },
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.0 },
    ],
  },

  // --- NACIMIENTO DE ENOC ---
  // Enoc gentle entrance; Vigilantes DESCEND from above (drop into the world)
  // [enoc(0), jared(1), mahalalel(2), vigilantes(3), semjaza(4), azazel(5), nephilim(6)]
  'nacimiento-enoc': {
    steps: [
      // Enoc gentle entrance (born into the world)
      { pinIdx: 0, scale: 0.5, opacity: 0.3, duration: 0.01 },
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.0, ease: 'power2.out' },
      // Jared (father) bows slightly in reverence
      { pinIdx: 1, offset: [0, 3], scale: 0.95, duration: 1.5, ease: 'sine.inOut' },
      // Vigilantes group drops in from above (descend from heaven, ominous arrival)
      { pinIdx: 3, offset: [10, -25], opacity: 0.2, duration: 0.01 },
      { pinIdx: 3, offset: [10, 0], opacity: 0.75, duration: 3.0, ease: 'power2.in' },
      // Semjaza descends slightly later — their leader
      { pinIdx: 4, offset: [20, -28], opacity: 0.2, duration: 0.01 },
      { pinIdx: 4, offset: [20, 5], opacity: 0.7, duration: 3.2, ease: 'power2.in' },
      // Azazel descends from the other side
      { pinIdx: 5, offset: [-18, -28], opacity: 0.2, duration: 0.01 },
      { pinIdx: 5, offset: [-18, 5], opacity: 0.7, duration: 3.4, ease: 'power2.in' },
      // Nephilim appear at the bottom (giants, earthbound)
      { pinIdx: 6, offset: [0, 15], scale: 1.3, opacity: 0.55, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 0.5, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, offset: [0, 0], opacity: 0.5, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 5, offset: [0, 0], opacity: 0.5, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 6, offset: [0, 0], scale: 1, opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- ASUNCIÓN DE ENOC ---
  // Enoc rises and fades (taken by God); Vigilantes + Semjaza pulled DOWN (bound, judged)
  // [enoc(0), jared(1), vigilantes(2), semjaza(3)]
  'asuncion-enoc': {
    steps: [
      // Enoc rises and fades (taken by God — ascension, no death)
      { pinIdx: 0, offset: [0, -20], opacity: 0.1, scale: 0.7, duration: 3.5, ease: 'power2.in' },
      // Vigilantes pulled DOWN (chained underground per Book of Enoch)
      { pinIdx: 2, offset: [10, 18], opacity: 0.3, duration: 2.5, ease: 'power2.in' },
      // Semjaza pulled down even deeper (their leader bears more guilt)
      { pinIdx: 3, offset: [15, 22], opacity: 0.25, duration: 2.7, ease: 'power2.in' },
      // Reset
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE NOÉ ---
  // Noé (idx 0) gentle entrance; ancestors (lamec/matusalen/jared) gather around
  // [noe(0), lamec(1), matusalen(2), jared(3)]
  'nacimiento-noe': {
    steps: [
      { pinIdx: 0, scale: 0.4, opacity: 0.2, duration: 0.01 },
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' },
      // Lamec (father) swells — prophetic pride ("this one shall comfort us")
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      // Matusalen (grandfather) acknowledges
      { pinIdx: 2, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Settle back
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- ORDEN DE CONSTRUIR EL ARCA ---
  // Noé hammers (rapid back-and-forth); Nephilim + Vigilantes loom corrupted in the background
  // [noe(0), nephilim(1), vigilantes(2)]
  'orden-construir-arca': {
    steps: [
      // Noé hammers (rhythmic motion)
      { pinIdx: 0, offset: [3, 0], duration: 0.5, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.5, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [3, 0], duration: 0.5, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.5, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'power2.out' },
      // Nephilim lurk — swell ominously in the background
      { pinIdx: 1, opacity: 0.6, scale: 1.15, duration: 2.0, ease: 'sine.inOut' },
      // Vigilantes loom
      { pinIdx: 2, opacity: 0.55, duration: 2.0, ease: 'sine.inOut' },
      // Subside
      { pinIdx: 1, opacity: 0.45, scale: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.4, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- EL GRAN DILUVIO ---
  // Family rocks on the ark (boat motion); Nephilim sink+fade; Vigilantes dragged underground
  // [noe(0), sem(1), cam(2), jafet(3), matusalen(4), nephilim(5), vigilantes(6)]
  'diluvio': {
    steps: [
      // Boat rising — all family lifts up
      { pinIdx: 0, offset: [0, -3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, -3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, -3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, -3], duration: 1.5, ease: 'sine.inOut' },
      // Nephilim sink and fade (destroyed by the waters)
      { pinIdx: 5, offset: [-5, 25], opacity: 0.1, scale: 0.6, duration: 3.0, ease: 'power3.in' },
      // Vigilantes pulled underground (bound, judged per Book of Enoch)
      { pinIdx: 6, offset: [10, 30], opacity: 0.1, duration: 3.0, ease: 'power3.in' },
      // Boat falling — family drops back down
      { pinIdx: 0, offset: [0, 3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 3], duration: 1.5, ease: 'sine.inOut' },
      // Reset fallen + bound
      { pinIdx: 5, offset: [0, 0], opacity: 0.5, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 6, offset: [0, 0], opacity: 0.5, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- ALIANZA DEL ARCOÍRIS ---
  // Noé and sons stand together breathing in celebration
  // [noe(0), sem(1), cam(2), jafet(3)]
  'alianza-arcoiris': {
    steps: [
      { pinIdx: 0, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ═════════════════ ERA PATRIARCAL ═════════════════

  // --- LLAMADO DE ABRAHAM ---
  // [abraham(0), sara(1), lot(2)] — caravan moves NW (toward Canaán)
  'llamado-de-abraham': {
    steps: [
      { pinIdx: 0, offset: [-18, -8], duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-15, -5], duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-12, -2], duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
    ],
  },

  // --- AKEDAH (sacrificio de Isaac) ---
  // [abraham(0), isaac(1), ismael(2)] — Abraham raises knife, Isaac trembles, Ismael ausente lejos
  'akedah-sacrificio-isaac': {
    steps: [
      // Abraham lifts knife arm (offset up, slight zoom)
      { pinIdx: 0, offset: [0, -6], scale: 1.1, duration: 2.0, ease: 'power2.in' },
      // Isaac trembles in place (back-and-forth shake)
      { pinIdx: 1, offset: [1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.4 },
      // Ismael fades faintly far away (the other son, distant)
      { pinIdx: 2, offset: [35, 0], opacity: 0.3, duration: 2.0, ease: 'sine.inOut' },
      // Hand stayed — Abraham lowers, Isaac relaxes
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      // Reset Ismael
      { pinIdx: 2, offset: [0, 0], opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- TORRE DE BABEL ---
  // [nimrod(0), sem(1), cam(2), jafet(3)] — all rise together building, then scatter in 4 directions
  'torre-de-babel': {
    steps: [
      // Rise (building the tower)
      { pinIdx: 0, offset: [0, -8], duration: 2.5, ease: 'power2.out' },
      { pinIdx: 1, offset: [0, -6], duration: 2.5, ease: 'power2.out' },
      { pinIdx: 2, offset: [0, -6], duration: 2.5, ease: 'power2.out' },
      { pinIdx: 3, offset: [0, -6], duration: 2.5, ease: 'power2.out' },
      // Pause at apex
      { pinIdx: 0, duration: 0.8 },
      // Confusion → scatter in 4 directions
      { pinIdx: 0, offset: [0, 12], scale: 0.9, opacity: 0.6, duration: 2.5, ease: 'power3.in' },
      { pinIdx: 1, offset: [-20, 5], opacity: 0.7, duration: 3.0, ease: 'power2.in' },
      { pinIdx: 2, offset: [20, 5], opacity: 0.7, duration: 3.0, ease: 'power2.in' },
      { pinIdx: 3, offset: [0, 18], opacity: 0.7, duration: 3.0, ease: 'power2.in' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- DESTRUCCIÓN DE SODOMA Y GOMORRA ---
  // [lot(0), abraham(1)] — lot flees NW, abraham watches from Hebron
  'destruccion-sodoma-gomorra': {
    steps: [
      // Lot flees NW (offset left+up, looking back)
      { pinIdx: 0, offset: [-22, -10], duration: 3.5, ease: 'power2.in' },
      // Abraham steady (witness from distance), gentle nod
      { pinIdx: 1, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Lot pauses (Lot's wife turns back — she becomes salt — Lot keeps going)
      { pinIdx: 0, opacity: 0.7, duration: 0.6 },
      // Reset
      { pinIdx: 0, offset: [0, 0], opacity: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // --- JACOB LUCHA CON EL ÁNGEL ---
  // [jacob(0)] — wrestling motion (rotate-like via offsets)
  'jacob-lucha-con-angel': {
    steps: [
      { pinIdx: 0, offset: [4, -2], duration: 0.35, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-4, 2], duration: 0.35, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [3, 3], duration: 0.35, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, -3], duration: 0.35, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [5, 0], duration: 0.4, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-5, 0], duration: 0.4, ease: 'power2.inOut' },
      // Jacob limps (offset slightly down, scale 0.97 - injured hip)
      { pinIdx: 0, offset: [0, 2], scale: 0.97, duration: 2.0, ease: 'sine.out' },
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- JOSÉ VENDIDO POR SUS HERMANOS ---
  // [jose(0), jacob(1), raquel(2)] — jose drops + fades (sold), parents grieve
  'jose-vendido-por-hermanos': {
    steps: [
      // José sinks into pit, then carried away (fades, drifts right toward Egypt)
      { pinIdx: 0, offset: [0, 8], opacity: 0.5, duration: 2.0, ease: 'power2.in' },
      { pinIdx: 0, offset: [30, 8], opacity: 0.3, duration: 3.0, ease: 'power2.in' },
      // Parents grieve (slight scale down + dim)
      { pinIdx: 1, opacity: 0.6, scale: 0.95, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.6, scale: 0.95, duration: 2.0, ease: 'sine.inOut' },
      // Reset (José in Egypt, parents mourning continues)
      { pinIdx: 0, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ═════════════════ ERA ÉXODO ═════════════════

  // --- ZARZA ARDIENTE ---
  // [moises(0), yhwh(1), aaron(2)] — moises kneels (small scale), YHWH flickers like fire
  'zarza-ardiente': {
    steps: [
      // Moisés se inclina (bow + slight shrink, removing sandals)
      { pinIdx: 0, offset: [0, 4], scale: 0.92, duration: 2.0, ease: 'sine.inOut' },
      // YHWH flickers (fire — pulse opacity)
      { pinIdx: 1, opacity: 1.0, scale: 1.15, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.6, scale: 0.95, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1.0, scale: 1.15, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.7, scale: 1.0, duration: 0.6, ease: 'sine.inOut' },
      // Aaron lejos al otro lado
      { pinIdx: 2, offset: [25, 0], opacity: 0.4, duration: 1.5, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.8, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- CRUCE DEL MAR ROJO ---
  // [moises(0), faraon(1), israelitas(2), miriam(3), angel(4)]
  // Moisés raises staff, Israelitas+Miriam cross (move right), Faraón drowns (drops + fades)
  'cruce-del-mar-rojo': {
    steps: [
      // Moisés alza el cayado (offset up, scale up)
      { pinIdx: 0, offset: [0, -5], scale: 1.1, duration: 1.5, ease: 'power2.out' },
      // Israelitas cruzan
      { pinIdx: 2, offset: [25, 0], duration: 3.5, ease: 'sine.inOut' },
      // Miriam acompaña
      { pinIdx: 3, offset: [22, 2], duration: 3.5, ease: 'sine.inOut' },
      // Ángel custodia (offset up, retaguardia)
      { pinIdx: 4, offset: [-5, -8], opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Faraón se ahoga (drop down + fade out)
      { pinIdx: 1, offset: [-3, 20], opacity: 0.1, scale: 0.7, duration: 3.0, ease: 'power3.in' },
      // Moisés baja el cayado
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 1.5, ease: 'sine.inOut' },
      // Reset all
      { pinIdx: 1, offset: [0, 0], opacity: 0.5, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, offset: [0, 0], opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- DIEZ MANDAMIENTOS ---
  // [moises(0), aaron(1), israelitas(2), dios(3)] — moisés sube (up), dios pulsa, baja con tablas
  'diez-mandamientos': {
    steps: [
      // Moisés sube al monte (up + fade slightly)
      { pinIdx: 0, offset: [0, -18], opacity: 0.6, duration: 3.0, ease: 'power2.in' },
      // Dios pulsa en la cima (presencia)
      { pinIdx: 3, scale: 1.25, opacity: 1.0, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.0, opacity: 0.8, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.25, opacity: 1.0, duration: 1.0, ease: 'sine.inOut' },
      // Aaron y pueblo esperan abajo
      { pinIdx: 1, scale: 0.95, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.95, opacity: 0.7, duration: 1.5, ease: 'sine.inOut' },
      // Moisés baja con tablas
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1.1, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, opacity: 0.7, duration: 1.0, ease: 'sine.inOut' },
    ],
  },

  // --- BECERRO DE ORO ---
  // [moises(0), aaron(1), israelitas(2), samirí(3), levitas(4)]
  // Israelitas orbitan (idolatría), moisés llega, ellos dispersan, levitas castigan
  'becerro-de-oro': {
    steps: [
      // Israelitas orbitan alrededor (idolatría — left then right)
      { pinIdx: 2, offset: [8, -3], duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-8, -3], duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [8, 3], duration: 1.2, ease: 'sine.inOut' },
      // Aarón y Samirí pulsan (orquestadores)
      { pinIdx: 1, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      // Moisés irrumpe (entra desde la izquierda)
      { pinIdx: 0, offset: [-15, 0], opacity: 0.3, duration: 0.01 },
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1.15, duration: 1.5, ease: 'power3.out' },
      // Israelitas dispersan (caos)
      { pinIdx: 2, offset: [25, 8], opacity: 0.4, duration: 1.5, ease: 'power2.in' },
      { pinIdx: 1, opacity: 0.5, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [20, -5], opacity: 0.4, duration: 1.5, ease: 'power2.in' },
      // Levitas ejecutan
      { pinIdx: 4, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 4, scale: 1, duration: 1.0, ease: 'sine.inOut' },
    ],
  },

  // ═════════════════ ERA REINOS Y EXILIO ═════════════════

  // --- DAVID VS GOLIAT ---
  // [david(0), goliat(1), saul(2)] — goliat grande, david chico avanza, goliat cae, saul retrocede
  'david-vs-goliat': {
    steps: [
      // Goliat aparece enorme
      { pinIdx: 1, scale: 1.35, duration: 1.5, ease: 'sine.inOut' },
      // David avanza (chico, decidido)
      { pinIdx: 0, scale: 0.85, opacity: 0.9, duration: 0.5 },
      { pinIdx: 0, offset: [12, 0], duration: 2.5, ease: 'sine.inOut' },
      // Saúl observa nervioso (slight backward jitter)
      { pinIdx: 2, offset: [-2, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [2, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 0.5 },
      // Goliat cae (drop + scale shrink + fade)
      { pinIdx: 1, offset: [0, 18], scale: 0.6, opacity: 0.2, duration: 1.5, ease: 'power3.in' },
      // David crece (victoria)
      { pinIdx: 0, scale: 1.15, duration: 1.5, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- ASCENSO DE ELÍAS ---
  // [elias(0), eliseo(1)] — elias sube al cielo (carro de fuego), eliseo recibe el manto
  'ascenso-elias': {
    steps: [
      // Elías rises (chariot of fire)
      { pinIdx: 0, offset: [0, -25], scale: 0.7, opacity: 0.0, duration: 4.0, ease: 'power2.in' },
      // Eliseo crece (recibe el espíritu doble)
      { pinIdx: 1, scale: 1.18, duration: 2.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- DANIEL EN BABILONIA / FOSO DE LOS LEONES ---
  // [daniel(0), sadrac-mesac-abednego(1), nabucodonosor(2), dario(3)]
  // Daniel centro, oran (pulse), otros orbitan
  'daniel-en-babilonia': {
    steps: [
      // Daniel ora — leve respiración
      { pinIdx: 0, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Sadrac/Mesac/Abednego pulse en el horno (resisten)
      { pinIdx: 1, scale: 1.1, opacity: 0.95, duration: 1.0, ease: 'sine.inOut' },
      // Reyes (Nabu/Dario) palidecen
      { pinIdx: 2, opacity: 0.6, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, opacity: 0.6, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- SANSÓN ---
  // [sanson(0), dalila(1)] — Sansón pierde fuerza (encoge), Dalila se acerca
  'sanson': {
    steps: [
      // Sansón fuerte (zoom)
      { pinIdx: 0, scale: 1.2, duration: 1.5, ease: 'sine.inOut' },
      // Dalila se acerca (offset toward Sansón)
      { pinIdx: 1, offset: [-8, 0], scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      // Sansón debilita (pierde pelo, encoge)
      { pinIdx: 0, scale: 0.85, opacity: 0.7, duration: 2.5, ease: 'power2.in' },
      // Dalila triunfa
      { pinIdx: 1, scale: 1.15, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- EXILIO BABILÓNICO ---
  // All move east + dim (carried away to Babylon)
  'exilio-babilonico': {
    steps: [
      { pinIdx: 0, offset: [25, 5], opacity: 0.5, scale: 0.9, duration: 4.0, ease: 'power2.in' },
      { pinIdx: 1, offset: [22, 8], opacity: 0.5, scale: 0.9, duration: 4.0, ease: 'power2.in' },
      { pinIdx: 2, offset: [28, 3], opacity: 0.5, scale: 0.9, duration: 4.0, ease: 'power2.in' },
      // Reset (return from exile)
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1, scale: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1, scale: 1, duration: 3.0, ease: 'sine.inOut' },
    ],
  },

  // ═════════════════ ERA EVANGELIO ═════════════════

  // --- ANUNCIACIÓN ---
  // [maria(0), gabriel(1), jesus(2)] — Gabriel desciende, María quieta, Jesús emerge pequeño
  'anunciacion': {
    steps: [
      // Gabriel descends from above
      { pinIdx: 1, offset: [0, -20], opacity: 0.0, duration: 0.01 },
      { pinIdx: 1, offset: [0, 0], opacity: 1, duration: 2.5, ease: 'power2.out' },
      // María inclina (sí, soy la sierva del Señor)
      { pinIdx: 0, scale: 0.97, duration: 1.5, ease: 'sine.inOut' },
      // Jesús aparece (concepción — entra pequeño)
      { pinIdx: 2, scale: 0.3, opacity: 0.0, duration: 0.01 },
      { pinIdx: 2, scale: 0.8, opacity: 0.7, duration: 2.5, ease: 'power2.out' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- NACIMIENTO DE JESÚS ---
  // [jesus(0), maria(1), jose-de-nazaret(2)] — jesús aparece tiny, padres glow
  'nacimiento-jesus': {
    steps: [
      { pinIdx: 0, scale: 0.4, opacity: 0.3, duration: 0.01 },
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- BAUTISMO DE JESÚS ---
  // [jesus(0), juan-bautista(1)] — jesús desciende al agua, espíritu como paloma (juan custodia)
  'bautismo-de-jesus': {
    steps: [
      // Jesús desciende al agua
      { pinIdx: 0, offset: [0, 5], duration: 2.0, ease: 'sine.inOut' },
      // Juan inclina la cabeza
      { pinIdx: 1, scale: 0.97, duration: 1.5, ease: 'sine.inOut' },
      // Pulso de luz sobre Jesús (paloma desciende)
      { pinIdx: 0, scale: 1.15, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      // Jesús emerge
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- TENTACIONES EN EL DESIERTO ---
  // [jesus(0), satan(1)] — satan se acerca y se aleja (rechazado 3 veces)
  'tentaciones-desierto': {
    steps: [
      // Satán se acerca (1ª tentación)
      { pinIdx: 1, offset: [-8, -2], opacity: 0.9, duration: 1.2, ease: 'power2.in' },
      // Jesús firme
      { pinIdx: 0, scale: 1.04, duration: 1.0, ease: 'sine.inOut' },
      // Satán retrocede
      { pinIdx: 1, offset: [4, -2], opacity: 0.5, duration: 1.0, ease: 'power2.out' },
      // 2ª aproximación
      { pinIdx: 1, offset: [-6, 4], opacity: 0.85, duration: 1.2, ease: 'power2.in' },
      { pinIdx: 1, offset: [6, 4], opacity: 0.4, duration: 1.0, ease: 'power2.out' },
      // 3ª aproximación
      { pinIdx: 1, offset: [-8, 0], opacity: 0.9, duration: 1.2, ease: 'power2.in' },
      // Definitivamente rechazado — se aleja lejos
      { pinIdx: 1, offset: [25, 0], opacity: 0.15, duration: 2.5, ease: 'power3.in' },
      // Jesús reposa
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 1, offset: [0, 0], opacity: 0.6, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- SERMÓN DEL MONTE ---
  // [jesus(0), pedro(1), juan(2)] — Jesús centro irradia, discípulos orbitan escuchando
  'sermon-del-monte': {
    steps: [
      // Jesús pulsa (irradia palabras)
      { pinIdx: 0, scale: 1.12, duration: 2.0, ease: 'sine.inOut' },
      // Discípulos respiran al unísono (sutil)
      { pinIdx: 1, offset: [0, -2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, -2], duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- TRANSFIGURACIÓN ---
  // [jesus(0), pedro(1), juan(2)] — Jesús glow + scale up, discípulos retroceden asombrados
  'transfiguracion': {
    steps: [
      // Jesús se transfigura (glow + scale up dramatically)
      { pinIdx: 0, scale: 1.35, opacity: 1.0, duration: 2.5, ease: 'power2.inOut' },
      // Discípulos retroceden (offset down, slight fade — asombrados, casi cayendo)
      { pinIdx: 1, offset: [-3, 6], scale: 0.9, opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [3, 6], scale: 0.9, opacity: 0.7, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- ÚLTIMA CENA ---
  // [jesus(0), pedro(1), juan(2), judas(3)] — Judas se aparta del círculo (traición)
  'ultima-cena': {
    steps: [
      // Jesús bendice (slight pulse)
      { pinIdx: 0, scale: 1.06, duration: 2.0, ease: 'sine.inOut' },
      // Judas se aparta lentamente (drift away from center)
      { pinIdx: 3, offset: [12, -4], opacity: 0.6, duration: 3.0, ease: 'power2.in' },
      // Pedro y Juan permanecen cerca
      { pinIdx: 1, offset: [-2, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [2, 0], duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- GETSEMANÍ ---
  // [jesus(0), pedro(1), judas(2)] — Jesús ora (encoge), Pedro duerme, Judas se acerca con beso
  'getsemani': {
    steps: [
      // Jesús ora postrado (offset down, opacity dim)
      { pinIdx: 0, offset: [0, 6], scale: 0.92, opacity: 0.8, duration: 2.5, ease: 'sine.inOut' },
      // Pedro duerme (fade, slight scale down)
      { pinIdx: 1, opacity: 0.5, scale: 0.95, duration: 2.0, ease: 'sine.inOut' },
      // Judas se acerca traidor
      { pinIdx: 2, offset: [-10, 0], opacity: 0.9, duration: 2.5, ease: 'power2.in' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- CRUCIFIXIÓN ---
  // [jesus(0), maria(1), juan-apostol(2), maria-magdalena(3)] — Jesús se apaga, los demás duelo
  'crucifixion': {
    steps: [
      // Jesús eleva (crucificado, sufre, finalmente expira)
      { pinIdx: 0, offset: [0, -3], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Apaga lentamente (muere — "consumado es")
      { pinIdx: 0, opacity: 0.15, duration: 3.0, ease: 'power2.in' },
      // Los demás dolientes (encoge, fade)
      { pinIdx: 1, scale: 0.9, opacity: 0.6, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.9, opacity: 0.6, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 0.9, opacity: 0.6, duration: 2.5, ease: 'sine.inOut' },
      // Reset (todavía solemne)
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- RESURRECCIÓN ---
  // [jesus(0), magdalena(1), pedro(2), juan(3)] — Jesús emerge glowing, otros asombro
  'resurreccion': {
    steps: [
      // Jesús resucitado — emerge brillante (scale + glow)
      { pinIdx: 0, scale: 0.5, opacity: 0.3, duration: 0.01 },
      { pinIdx: 0, scale: 1.25, opacity: 1.0, duration: 3.0, ease: 'power2.out' },
      // Los demás se asombran (scale down + slight back)
      { pinIdx: 1, scale: 0.92, offset: [0, 3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.92, offset: [-2, 3], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 0.92, offset: [2, 3], duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, scale: 1, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- PENTECOSTÉS ---
  // [pedro(0), juan(1), maria(2)] — lenguas de fuego descienden (pulse desde arriba), apóstoles brillan
  'pentecostes': {
    steps: [
      // Fuego desciende — apóstoles pulsan (recepción del Espíritu)
      { pinIdx: 0, scale: 1.15, opacity: 1.0, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.15, opacity: 1.0, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.15, opacity: 1.0, duration: 1.0, ease: 'sine.inOut' },
      // Pedro se eleva (líder — predica)
      { pinIdx: 0, offset: [0, -4], scale: 1.2, duration: 1.5, ease: 'sine.out' },
      // Reset pulse
      { pinIdx: 0, scale: 1, offset: [0, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ═════════════════ ERA REVELACIÓN ═════════════════

  // --- REVELACIÓN EN HIRA ---
  // [mahoma(0), gabriel(1), khadija(2), waraqa(3)]
  // Gabriel desciende, Mahoma tiembla, Khadija lo conforta, Waraqa confirma
  'revelacion-en-hira': {
    steps: [
      // Gabriel desciende
      { pinIdx: 1, offset: [0, -22], opacity: 0.0, duration: 0.01 },
      { pinIdx: 1, offset: [0, 0], opacity: 1, scale: 1.15, duration: 2.5, ease: 'power2.out' },
      // Mahoma tiembla (vibra)
      { pinIdx: 0, offset: [1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1.5, 0], duration: 0.2, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5 },
      // Khadija aparece (después — lo cubre con manto)
      { pinIdx: 2, opacity: 0.4, duration: 0.01 },
      { pinIdx: 2, opacity: 1, scale: 1.08, duration: 2.0, ease: 'sine.out' },
      // Waraqa lejos (confirma desde lejos)
      { pinIdx: 3, opacity: 0.7, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 1, opacity: 0.7, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, opacity: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // --- HÉGIRA (migración a Medina) ---
  // [mahoma(0), abu-bakr(1), ali(2)] — todos migran (NE, desde Meca a Medina)
  'hegira-migracion-a-medina': {
    steps: [
      // Migran hacia el NE (offset right + slightly up — Medina está al norte de Meca)
      { pinIdx: 0, offset: [12, -8], duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [10, -6], duration: 4.0, ease: 'sine.inOut' },
      // Ali se queda en Meca (decoy en la cama de Mahoma — opacity dim)
      { pinIdx: 2, opacity: 0.5, scale: 0.9, duration: 3.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- BATALLA DE BADR ---
  // [mahoma(0), abu-bakr(1), ali(2), omar(3), abu-jahl(4), abu-sufyan(5)]
  // Musulmanes avanzan unidos, enemigos retroceden (Abu Jahl muere)
  'batalla-de-badr': {
    steps: [
      // Musulmanes avanzan (cuatro primeros)
      { pinIdx: 0, offset: [6, 0], scale: 1.08, duration: 2.0, ease: 'power2.out' },
      { pinIdx: 1, offset: [4, -2], duration: 2.0, ease: 'power2.out' },
      { pinIdx: 2, offset: [4, 2], duration: 2.0, ease: 'power2.out' },
      { pinIdx: 3, offset: [4, 0], duration: 2.0, ease: 'power2.out' },
      // Abu Jahl cae (muere)
      { pinIdx: 4, offset: [3, 12], opacity: 0.1, scale: 0.7, duration: 2.0, ease: 'power3.in' },
      // Abu Sufyan retrocede (huye)
      { pinIdx: 5, offset: [-15, -3], opacity: 0.5, duration: 2.5, ease: 'power2.in' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 0], duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 4, offset: [0, 0], opacity: 0.6, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 5, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // --- CONQUISTA DE LA MECA ---
  // [mahoma(0), ali(1), abu-sufyan(2)] — entrada triunfal, Abu Sufyan se somete (encoge)
  'conquista-de-meca': {
    steps: [
      // Mahoma + Ali entran (offset hacia centro, scale up)
      { pinIdx: 0, scale: 1.15, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.08, duration: 2.5, ease: 'sine.inOut' },
      // Abu Sufyan se somete (se inclina — encoge + offset down)
      { pinIdx: 2, scale: 0.85, offset: [0, 6], opacity: 0.7, duration: 3.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, offset: [0, 0], opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },
};

/**
 * Merged choreography set. Per-era modules override the inline legacy entries
 * so an era team can fully rewrite a single event without touching this file.
 */
const CHOREOGRAPHIES: Record<string, Choreography> = {
  ...INLINE_CHOREOGRAPHIES,
  ...PRIMORDIAL,
  ...PATRIARCAL,
  ...EXODO,
  ...REINOS_Y_EXILIO,
  ...EVANGELIO,
  ...REVELACION,
};

let activeTimelines: gsap.core.Timeline[] = [];

export function runChoreography(svgRoot: SVGSVGElement, eventId: string) {
  // Always stop previous first
  stopChoreography();

  const target = svgRoot.querySelector<SVGGElement>(`[data-marker="${eventId}"]`);
  if (!target) return;
  const pins = Array.from(target.querySelectorAll<SVGGElement>('[data-char-pin-wrap]'));
  if (pins.length === 0) return;

  const choreo = CHOREOGRAPHIES[eventId];

  if (!choreo) {
    // Default: subtle float (sin/cos) for events without explicit choreography
    pins.forEach((pin, idx) => {
      const baseTransform = pin.getAttribute('data-base-transform') ?? pin.getAttribute('transform') ?? 'translate(0,0)';
      pin.setAttribute('data-base-transform', baseTransform);
      const tl = gsap.timeline({ repeat: -1 });
      const obj = { t: idx * 0.7 };
      tl.to(obj, {
        t: '+=10', duration: 10, ease: 'none',
        onUpdate: () => {
          const dx = Math.sin(obj.t * 0.8) * 1.2;
          const dy = Math.cos(obj.t * 1.1) * 1.0;
          pin.setAttribute('transform', `${baseTransform} translate(${dx}, ${dy})`);
        },
      });
      activeTimelines.push(tl);
    });
    return;
  }

  // Choreographed motion — run a sequenced timeline per pin
  // Group steps by pin index
  const stepsByPin = new Map<number, ChoreoStep[]>();
  choreo.steps.forEach((s) => {
    if (!stepsByPin.has(s.pinIdx)) stepsByPin.set(s.pinIdx, []);
    stepsByPin.get(s.pinIdx)!.push(s);
  });

  stepsByPin.forEach((steps, pinIdx) => {
    if (pinIdx >= pins.length) return;
    const pin = pins[pinIdx];
    const baseTransform = pin.getAttribute('data-base-transform') ?? pin.getAttribute('transform') ?? 'translate(0,0)';
    pin.setAttribute('data-base-transform', baseTransform);
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } });
    steps.forEach((step) => {
      const proxy = { x: 0, y: 0, op: 1, sc: 1 };
      tl.to(proxy, {
        x: step.offset?.[0] ?? 0,
        y: step.offset?.[1] ?? 0,
        op: step.opacity ?? 1,
        sc: step.scale ?? 1,
        duration: step.duration,
        ease: step.ease,
        onUpdate: () => {
          pin.setAttribute('transform', `${baseTransform} translate(${proxy.x}, ${proxy.y}) scale(${proxy.sc})`);
          pin.style.opacity = `${proxy.op}`;
        },
      });
    });
    activeTimelines.push(tl);
  });
}

export function stopChoreography() {
  activeTimelines.forEach((tl) => tl.kill());
  activeTimelines = [];
  // Also reset pin transforms via attribute. We also clear any inline
  // styles the FX layer (narrationFx.ts) may have written onto the inner
  // foreignObject — e.g. `fx:character-recede` permanently shrinks the
  // figure to scale(0.35) / opacity 0.15 by writing to fo.style. Without
  // this reset, once a "recede" fires for an event, the pin stays small
  // across scene changes AND across choreography loops, even when the
  // narration was just briefly mentioning the character.
  document.querySelectorAll<SVGGElement>('[data-char-pin-wrap]').forEach((pin) => {
    const base = pin.getAttribute('data-base-transform');
    if (base) pin.setAttribute('transform', base);
    pin.style.opacity = '';
    const fo = pin.querySelector<SVGForeignObjectElement>('foreignObject');
    if (fo) {
      const hEl = fo as unknown as HTMLElement;
      hEl.style.transform = '';
      hEl.style.opacity = '';
      hEl.style.transformOrigin = '';
      hEl.style.transformBox = '';
      fo.removeAttribute('opacity');
    }
  });
}
