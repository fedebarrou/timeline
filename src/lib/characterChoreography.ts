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

const CHOREOGRAPHIES: Record<string, Choreography> = {
  // Cain drifts toward Abel, Abel falls, reset
  'cain-mata-abel': {
    steps: [
      // Initial: cain (idx 0) and abel (idx 1) at base positions — handled by reset
      // Cain (idx 0) drifts right toward abel
      { pinIdx: 0, offset: [12, 0], duration: 2.4, ease: 'sine.inOut' },
      // Abel (idx 1) falls down + fades
      { pinIdx: 1, offset: [0, 8], opacity: 0.3, duration: 1.2, ease: 'power2.in' },
      // Hold a moment, then reset everyone
      { pinIdx: 0, offset: [0, 0], duration: 2.0, ease: 'power2.out' },
      { pinIdx: 1, offset: [0, 0], opacity: 1.0, duration: 2.0, ease: 'power2.out' },
    ],
  },
  // Adan + Eva drift outward (expulsion)
  'expulsion-eden': {
    steps: [
      { pinIdx: 0, offset: [-10, 6], opacity: 0.5, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [10, 6],  opacity: 0.5, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], opacity: 1.0, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], opacity: 1.0, duration: 2.0, ease: 'sine.inOut' },
    ],
  },
  // Noé and sons rock together (waters)
  'diluvio': {
    steps: [
      { pinIdx: 0, offset: [0, -2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, -2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, -2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, -2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 2], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 3, offset: [0, 2], duration: 1.5, ease: 'sine.inOut' },
    ],
  },
  // Enoc rises up and fades, then resets
  'asuncion-enoc': {
    steps: [
      { pinIdx: 0, offset: [0, -14], opacity: 0.2, scale: 0.8, duration: 3.0, ease: 'power2.in' },
      { pinIdx: 0, offset: [0, 0], opacity: 1.0, scale: 1.0, duration: 1.5, ease: 'power2.out' },
    ],
  },
  // Noé hammers — small back/forth motion
  'orden-construir-arca': {
    steps: [
      { pinIdx: 0, offset: [3, 0], duration: 0.6, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.6, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [3, 0], duration: 0.6, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.6, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.6, ease: 'power2.out' },
    ],
  },
  // Alianza arcoiris — pins stand in a row breathing
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
    // Default: subtle float (sin/cos) — keep agent H's existing motion
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
