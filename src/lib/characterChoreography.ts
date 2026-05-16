import { gsap } from './scrollytelling';

type ChoreoStep = {
  /** Character pin index (order in the pin array, 0-based) */
  pinIdx: number;
  /** Relative offset from the pin's base position */
  offset?: [number, number];
  /** Opacity multiplier */
  opacity?: number;
  /** Scale */
  scale?: number;
  /** Duration in seconds */
  duration: number;
  ease?: string;
};

type Choreography = {
  /** Cycle of steps; each pin can have multiple steps interleaved */
  steps: ChoreoStep[];
  /** Total loop duration; if not set, sum of all steps */
  total?: number;
};

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

const CHOREOGRAPHIES: Record<string, Choreography> = {
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
  // Also reset pin transforms via attribute
  document.querySelectorAll<SVGGElement>('[data-char-pin-wrap]').forEach((pin) => {
    const base = pin.getAttribute('data-base-transform');
    if (base) pin.setAttribute('transform', base);
    pin.style.opacity = '';
  });
}
