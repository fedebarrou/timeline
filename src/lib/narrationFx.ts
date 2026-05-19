/**
 * narrationFx — text-driven animation PRIMITIVES that listen for
 * `timeline:cue` CustomEvents and render visual effects on the SVG map.
 *
 * A sibling agent dispatches:
 *    window.dispatchEvent(new CustomEvent('timeline:cue', {
 *      detail: { eventId, cueId, data }
 *    }))
 *
 * We route by `cueId`:
 *   - fx:dust-burst         (pinIdx? | position?, duration?)
 *   - fx:character-emerge   (pinIdx)
 *   - fx:character-recede   (pinIdx)
 *   - fx:glow-pulse         (pinIdx? | position?, color?)
 *   - fx:water-wave         (position)
 *   - fx:fire-flicker       (position)
 *   - fx:lightning-strike   (from, to)
 *   - fx:tradition-badge    (tradition)
 *   - fx:rain               (count?, durationS?)
 *   - fx:smoke-rise         (position)
 *   - fx:earthquake-shake   (pinIdx?, intensity?)
 *   - fx:blood-stain        (position)
 *   - fx:journey-trace      (from, to, style?)
 *   - fx:halo-divine        (pinIdx)
 *   - fx:dove-flight        (from, to)
 *   - fx:idol-shatter       (position, count?)
 *   - fx:plague-swarm       (position, type?)
 *   - fx:walls-fall         (position)
 *   - fx:burning-bush       (position)
 *   - fx:stone-tablets      (position)
 *   - fx:scroll-unfurl      (position)
 *   - fx:angel-descent      (position)
 *   - fx:serpent            (position)
 *   - fx:golden-calf        (position)
 *   - fx:ark-boat           (position)
 *   - fx:tower-babel        (position)
 *   - fx:sword-strike       (from, to)
 *   - fx:fish-multiply      (position)
 *   - fx:bread-multiply     (position)
 *   - fx:cross-rise         (position)
 *   - fx:lamp-glow          (position)
 *   - fx:well               (position)
 *   - fx:mountain-glow      (position)
 *   - fx:ladder             (from, to)
 *   - fx:ram                (position)
 *   - fx:star-bethlehem     (position)
 *   - fx:chalice            (position)
 *   - fx:manna-fall         ()
 *   - fx:pillar-of-fire     (position)
 *   - fx:parted-waters      (position)
 *
 * Extended catalog (see docs/superpowers/STYLE_GUIDE_ANIMACIONES.md):
 *   - fx:animate-scene-object (id, kind, duration?)
 *   - C.1 figurative:  fx:caravan, fx:throne, fx:crown-descent,
 *     fx:fire-from-heaven, fx:bowing-crowd, fx:trumpet-blast,
 *     fx:angel-formation, fx:tablets-shatter, fx:moon-split,
 *     fx:kaaba-pulse, fx:tongue-of-flame, fx:crown-of-thorns,
 *     fx:fish-school, fx:plague-locust, fx:plague-frogs,
 *     fx:plague-darkness, fx:rolling-stone, fx:tomb-empty,
 *     fx:resurrection-light, fx:divine-hand, fx:sword-clash,
 *     fx:lion-roar, fx:wolf-prowl, fx:eagle-soar, fx:raven-flight,
 *     fx:horse-gallop, fx:camel-train, fx:goat-herd, fx:donkey-walk,
 *     fx:locust-cloud, fx:frog-rain, fx:scorpion-skitter, fx:whale-breach.
 *   - C.2 atmospheric:  fx:dawn-break, fx:dusk-fall, fx:night-fall,
 *     fx:starfield-shimmer, fx:starfield-rotate, fx:eclipse-darken,
 *     fx:moon-bloodred, fx:storm-clouds, fx:hailstorm, fx:rain-sheet,
 *     fx:fog-roll, fx:mist-rise, fx:wind-streaks, fx:sandstorm-major,
 *     fx:heat-shimmer, fx:meteor-strike, fx:meteor-shower,
 *     fx:lightning-storm, fx:thunder-flash, fx:earthquake-major,
 *     fx:divine-light-beam, fx:incense-spiral, fx:smoke-column,
 *     fx:dust-pillar, fx:cloud-pillar.
 *   - C.4 cinematic:    fx:vignette-pulse, fx:flash-white,
 *     fx:fade-to-black, fx:fade-from-black, fx:zoom-pulse,
 *     fx:slow-motion, fx:silhouette-horizon, fx:radial-bloom,
 *     fx:shockwave.
 *
 * SVG primitives draw into a lazy `<g data-layer="narration-fx">` group
 * appended to the SVG root on first use; child nodes are removed after
 * each animation, but the group itself is retained for reuse.
 *
 * The tradition badge is the only primitive that lives outside the SVG —
 * it renders a fixed-position HTML overlay attached to `document.body`.
 */

import { gsap } from './scrollytelling';
import { triggerSandstorm } from './mapSandstorm';

const SVG_NS = 'http://www.w3.org/2000/svg';

// Active event id derived from the latest `timeline:scene-changed` event.
let currentEventId: string | null = null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get (and lazily create) the narration-fx SVG group. */
function getFxLayer(svg: SVGSVGElement): SVGGElement {
  let layer = svg.querySelector<SVGGElement>('[data-layer="narration-fx"]');
  if (!layer) {
    layer = document.createElementNS(SVG_NS, 'g') as SVGGElement;
    layer.setAttribute('data-layer', 'narration-fx');
    layer.setAttribute('pointer-events', 'none');
    svg.appendChild(layer);
  }
  return layer;
}

/** Parse a `translate(x, y)` string into [x, y]. */
function parseTranslate(t: string | null): [number, number] {
  if (!t) return [0, 0];
  const m = /translate\(\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)\s*\)/.exec(t);
  if (!m) return [0, 0];
  return [parseFloat(m[1]), parseFloat(m[2])];
}

/**
 * Resolve a target [x, y] from the cue payload. If `position` is provided
 * it wins; otherwise we look up the active marker and (optionally) index
 * into its character pins by `pinIdx`.
 */
function resolveTarget(
  svg: SVGSVGElement,
  data: { pinIdx?: number; position?: [number, number] } | undefined,
): [number, number] | null {
  if (data?.position && Array.isArray(data.position)) {
    return [data.position[0], data.position[1]];
  }
  if (!currentEventId) return null;
  const marker = svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`);
  if (!marker) return null;
  const [mx, my] = parseTranslate(marker.getAttribute('transform'));
  if (typeof data?.pinIdx === 'number') {
    const pins = marker.querySelectorAll<SVGGElement>('[data-char-pin-wrap]');
    const pin = pins[data.pinIdx];
    if (pin) {
      const [dx, dy] = parseTranslate(pin.getAttribute('transform'));
      return [mx + dx, my + dy];
    }
  }
  return [mx, my];
}

/** Find the character pin element at the given index inside the active marker. */
function getPinAt(svg: SVGSVGElement, pinIdx: number): SVGGElement | null {
  if (!currentEventId) return null;
  const marker = svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`);
  if (!marker) return null;
  const pins = marker.querySelectorAll<SVGGElement>('[data-char-pin-wrap]');
  return pins[pinIdx] ?? null;
}

/** Read CSS var from <body> (era theme). */
function eraVar(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback;
  const v = getComputedStyle(document.body).getPropertyValue(name).trim();
  return v || fallback;
}

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** 1. Dust burst — primary sandstorm gust + lingering secondary haze + faint outer ring. */
function fxDustBurst(
  svg: SVGSVGElement,
  data: { pinIdx?: number; position?: [number, number]; duration?: number } = {},
) {
  const target = resolveTarget(svg, data);
  if (!target) return;
  const primaryDur = data.duration ?? 3.4;
  // Primary gust
  triggerSandstorm(svg, [target], {
    count: 110,
    duration: primaryDur,
    windStrength: 22,
  });
  // Secondary, softer haze that arrives a beat later and lingers.
  setTimeout(() => {
    triggerSandstorm(svg, [target], {
      count: 55,
      duration: primaryDur * 0.9,
      windStrength: 10,
    });
  }, 450);

  // Faint outer ring that pulses outward to suggest displaced air.
  const layer = getFxLayer(svg);
  const ring = document.createElementNS(SVG_NS, 'circle');
  ring.setAttribute('cx', String(target[0]));
  ring.setAttribute('cy', String(target[1]));
  ring.setAttribute('r', '6');
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', '#c9b48a');
  ring.setAttribute('stroke-width', '1');
  ring.setAttribute('opacity', '0');
  layer.appendChild(ring);
  const tl = gsap.timeline({ onComplete: () => ring.remove() });
  tl.to(ring, {
    attr: { opacity: 0.5, r: 26, 'stroke-width': 0.6 },
    duration: 1.1,
    ease: 'expo.out',
  });
  tl.to(ring, {
    attr: { opacity: 0, r: 42, 'stroke-width': 0.2 },
    duration: 2.2,
    ease: 'sine.in',
  });
}

/** 2. Character emerge — slow reveal with overshoot settle and layered halos. */
function fxCharacterEmerge(svg: SVGSVGElement, data: { pinIdx: number }) {
  const pin = getPinAt(svg, data.pinIdx);
  if (!pin) return;
  const fo = pin.querySelector<SVGForeignObjectElement>('foreignObject');
  if (!fo) return;

  // Scale + fade the inner foreignObject with a soft overshoot for life.
  (fo as unknown as HTMLElement).style.transformOrigin = '50% 50%';
  (fo as unknown as HTMLElement).style.transformBox = 'fill-box';
  const styleTl = gsap.timeline();
  styleTl.fromTo(
    (fo as unknown as HTMLElement).style,
    { transform: 'scale(0.15)', opacity: 0 },
    { transform: 'scale(1.08)', opacity: 1, duration: 1.5, ease: 'expo.out' },
  );
  styleTl.to((fo as unknown as HTMLElement).style, {
    transform: 'scale(1)',
    duration: 0.9,
    ease: 'power2.inOut',
  });
  gsap.fromTo(
    fo,
    { attr: { opacity: 0 } },
    { attr: { opacity: 1 }, duration: 1.5, ease: 'expo.out' },
  );

  // Halo pulses behind the pin — primary (era accent) + lingering outer ring.
  const [px, py] = parseTranslate(pin.getAttribute('transform'));
  const layer = getFxLayer(svg);
  const marker = pin.closest('[data-marker]') as SVGGElement | null;
  const [mx, my] = parseTranslate(marker?.getAttribute('transform') ?? null);
  const cx = mx + px;
  const cy = my + py;
  const accent = eraVar('--era-accent', '#d9b35a');

  const halo = document.createElementNS(SVG_NS, 'circle');
  halo.setAttribute('cx', String(cx));
  halo.setAttribute('cy', String(cy));
  halo.setAttribute('r', '8');
  halo.setAttribute('fill', accent);
  halo.setAttribute('opacity', '0');
  layer.appendChild(halo);

  const ring = document.createElementNS(SVG_NS, 'circle');
  ring.setAttribute('cx', String(cx));
  ring.setAttribute('cy', String(cy));
  ring.setAttribute('r', '10');
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', accent);
  ring.setAttribute('stroke-width', '1.2');
  ring.setAttribute('opacity', '0');
  layer.appendChild(ring);

  const tlHalo = gsap.timeline({ onComplete: () => halo.remove() });
  tlHalo.to(halo, {
    attr: { opacity: 0.6, r: 22 },
    duration: 0.9,
    ease: 'power2.out',
  });
  tlHalo.to(halo, {
    attr: { opacity: 0, r: 36 },
    duration: 1.8,
    ease: 'sine.in',
  });

  const tlRing = gsap.timeline({ onComplete: () => ring.remove() });
  tlRing.to(ring, {
    attr: { opacity: 0.5, r: 26, 'stroke-width': 0.8 },
    duration: 1.2,
    ease: 'expo.out',
  });
  tlRing.to(ring, {
    attr: { opacity: 0, r: 44, 'stroke-width': 0.2 },
    duration: 2.0,
    ease: 'sine.in',
  });
}

/** 3. Character recede — long fade with a soft parting glow that lingers. */
function fxCharacterRecede(svg: SVGSVGElement, data: { pinIdx: number }) {
  const pin = getPinAt(svg, data.pinIdx);
  if (!pin) return;
  const fo = pin.querySelector<SVGForeignObjectElement>('foreignObject');
  if (!fo) return;
  (fo as unknown as HTMLElement).style.transformOrigin = '50% 50%';
  (fo as unknown as HTMLElement).style.transformBox = 'fill-box';

  // Quick small "bow" then long slow recede.
  const styleTl = gsap.timeline();
  styleTl.fromTo(
    (fo as unknown as HTMLElement).style,
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(1.05)', duration: 0.45, ease: 'sine.out' },
  );
  styleTl.to((fo as unknown as HTMLElement).style, {
    transform: 'scale(0.35)',
    opacity: 0.15,
    duration: 2.4,
    ease: 'power3.inOut',
  });
  gsap.fromTo(
    fo,
    { attr: { opacity: 1 } },
    { attr: { opacity: 0.15 }, duration: 2.85, ease: 'power3.inOut' },
  );

  // Parting halo behind the pin — softly fades after the figure shrinks.
  const [px, py] = parseTranslate(pin.getAttribute('transform'));
  const marker = pin.closest('[data-marker]') as SVGGElement | null;
  const [mx, my] = parseTranslate(marker?.getAttribute('transform') ?? null);
  const layer = getFxLayer(svg);
  const halo = document.createElementNS(SVG_NS, 'circle');
  halo.setAttribute('cx', String(mx + px));
  halo.setAttribute('cy', String(my + py));
  halo.setAttribute('r', '6');
  halo.setAttribute('fill', eraVar('--era-accent', '#d9b35a'));
  halo.setAttribute('opacity', '0');
  layer.appendChild(halo);
  const tl = gsap.timeline({ onComplete: () => halo.remove() });
  tl.to(halo, {
    attr: { opacity: 0.4, r: 16 },
    duration: 0.8,
    ease: 'sine.out',
  });
  tl.to(halo, {
    attr: { opacity: 0, r: 32 },
    duration: 2.4,
    ease: 'power2.in',
  });
}

/** 4. Glow pulse — three staggered era-tinted rings + soft fill puff. */
function fxGlowPulse(
  svg: SVGSVGElement,
  data: { pinIdx?: number; position?: [number, number]; color?: string } = {},
) {
  const target = resolveTarget(svg, data);
  if (!target) return;
  const color = data.color ?? eraVar('--era-accent', '#d9b35a');
  const layer = getFxLayer(svg);
  const [tx, ty] = target;

  // Inner soft puff (solid fill, fades).
  const puff = document.createElementNS(SVG_NS, 'circle');
  puff.setAttribute('cx', String(tx));
  puff.setAttribute('cy', String(ty));
  puff.setAttribute('r', '10');
  puff.setAttribute('fill', color);
  puff.setAttribute('opacity', '0');
  layer.appendChild(puff);
  const puffTl = gsap.timeline({ onComplete: () => puff.remove() });
  puffTl.to(puff, {
    attr: { opacity: 0.6, r: 22 },
    duration: 0.9,
    ease: 'expo.out',
  });
  puffTl.to(puff, {
    attr: { opacity: 0, r: 34 },
    duration: 2.4,
    ease: 'sine.in',
  });

  // Three expanding rings, staggered.
  const makeRing = (delay: number, startR: number, endR: number, widthStart: number) => {
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', String(tx));
    c.setAttribute('cy', String(ty));
    c.setAttribute('r', String(startR));
    c.setAttribute('fill', 'none');
    c.setAttribute('stroke', color);
    c.setAttribute('stroke-width', String(widthStart));
    c.setAttribute('opacity', '0');
    layer.appendChild(c);
    const tl = gsap.timeline({ delay, onComplete: () => c.remove() });
    tl.to(c, {
      attr: { opacity: 0.75, r: startR + (endR - startR) * 0.5 },
      duration: 0.7,
      ease: 'power3.out',
    });
    tl.to(c, {
      attr: { opacity: 0, r: endR, 'stroke-width': 0.2 },
      duration: 2.4,
      ease: 'sine.in',
    });
  };
  makeRing(0, 11, 32, 1.8);
  makeRing(0.35, 9, 40, 1.3);
  makeRing(0.7, 7, 48, 0.9);
}

/** 5. Water wave — four staggered ripples + central shimmer puff. */
function fxWaterWave(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const stroke = '#7ad0e0';

  // Central soft shimmer.
  const shimmer = document.createElementNS(SVG_NS, 'circle');
  shimmer.setAttribute('cx', String(x));
  shimmer.setAttribute('cy', String(y));
  shimmer.setAttribute('r', '3');
  shimmer.setAttribute('fill', '#bfe6ec');
  shimmer.setAttribute('opacity', '0');
  layer.appendChild(shimmer);
  const sTl = gsap.timeline({ onComplete: () => shimmer.remove() });
  sTl.to(shimmer, { attr: { opacity: 0.55, r: 6 }, duration: 0.55, ease: 'sine.out' });
  sTl.to(shimmer, { attr: { opacity: 0, r: 14 }, duration: 2.6, ease: 'sine.in' });

  const makeRipple = (delay: number, endR: number, w: number) => {
    const r = document.createElementNS(SVG_NS, 'circle');
    r.setAttribute('cx', String(x));
    r.setAttribute('cy', String(y));
    r.setAttribute('r', '3');
    r.setAttribute('fill', 'none');
    r.setAttribute('stroke', stroke);
    r.setAttribute('stroke-width', String(w));
    r.setAttribute('opacity', '0');
    layer.appendChild(r);
    const tl = gsap.timeline({ delay, onComplete: () => r.remove() });
    tl.to(r, {
      attr: { opacity: 0.75, r: endR * 0.45, 'stroke-width': w * 0.7 },
      duration: 0.5,
      ease: 'sine.out',
    });
    tl.to(r, {
      attr: { opacity: 0, r: endR, 'stroke-width': 0.2 },
      duration: 2.6,
      ease: 'sine.inOut',
    });
  };
  makeRipple(0, 30, 1.6);
  makeRipple(0.45, 36, 1.4);
  makeRipple(0.95, 42, 1.1);
  makeRipple(1.5, 48, 0.9);
}

/** 6. Fire flicker — cluster of flames with looping bob, rising embers, and warm glow. */
function fxFireFlicker(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const palette = ['#ff8b3a', '#ffa84a', '#ffd34f', '#ff6a20'];
  const n = 6 + Math.floor(Math.random() * 3); // 6..8
  const flames: { el: SVGEllipseElement; baseY: number; phase: number }[] = [];

  // Warm ambient glow that lingers under the flames.
  const glow = document.createElementNS(SVG_NS, 'circle');
  glow.setAttribute('cx', String(x));
  glow.setAttribute('cy', String(y));
  glow.setAttribute('r', '10');
  glow.setAttribute('fill', '#ff9a3a');
  glow.setAttribute('opacity', '0');
  glow.setAttribute('filter', 'blur(1.2px)');
  layer.appendChild(glow);
  gsap.to(glow, {
    attr: { opacity: 0.32, r: 16 },
    duration: 0.6,
    ease: 'sine.out',
  });

  for (let i = 0; i < n; i++) {
    const ox = (Math.random() - 0.5) * 9;
    const oy = (Math.random() - 0.5) * 4;
    const e = document.createElementNS(SVG_NS, 'ellipse');
    e.setAttribute('cx', String(x + ox));
    e.setAttribute('cy', String(y + oy));
    e.setAttribute('rx', String(1.6 + Math.random() * 1.4));
    e.setAttribute('ry', String(3 + Math.random() * 2.2));
    e.setAttribute('fill', palette[i % palette.length]);
    e.setAttribute('opacity', '0.6');
    e.setAttribute('filter', 'blur(0.4px)');
    layer.appendChild(e);
    flames.push({ el: e, baseY: y + oy, phase: Math.random() * Math.PI * 2 });
  }

  // Looping bob + opacity flicker, repeated for ~4s total.
  const TOTAL = 4.0;
  const PERIOD = 0.95;
  flames.forEach(({ el, baseY, phase }) => {
    const tl = gsap.timeline({ repeat: 1 });
    tl.to(el, {
      duration: PERIOD,
      ease: 'sine.inOut',
      attr: { cy: baseY - 2.4, opacity: 1 },
    });
    tl.to(el, {
      duration: PERIOD,
      ease: 'sine.inOut',
      attr: { cy: baseY, opacity: 0.6 },
    });
    tl.delay((phase / (Math.PI * 2)) * 0.45);
  });

  // Rising embers — staggered spawn over 2.5s.
  const embers: SVGCircleElement[] = [];
  for (let i = 0; i < 7; i++) {
    const c = document.createElementNS(SVG_NS, 'circle');
    const ex = x + (Math.random() - 0.5) * 6;
    c.setAttribute('cx', String(ex));
    c.setAttribute('cy', String(y));
    c.setAttribute('r', String(0.4 + Math.random() * 0.35));
    c.setAttribute('fill', '#ffd97a');
    c.setAttribute('opacity', '0');
    layer.appendChild(c);
    embers.push(c);
    const delay = 0.3 + i * 0.32;
    const drift = (Math.random() - 0.5) * 5;
    const rise = 14 + Math.random() * 8;
    const tl = gsap.timeline({ delay, onComplete: () => c.remove() });
    tl.to(c, { attr: { opacity: 0.85 }, duration: 0.3, ease: 'sine.out' });
    tl.to(
      c,
      {
        attr: { cy: y - rise, cx: ex + drift, opacity: 0 },
        duration: 1.6,
        ease: 'sine.out',
      },
      '<',
    );
  }

  // Long fade-out.
  gsap.to(
    flames.map((f) => f.el),
    {
      attr: { opacity: 0 },
      duration: 0.9,
      delay: TOTAL,
      ease: 'sine.in',
      onComplete: () => flames.forEach((f) => f.el.remove()),
    },
  );
  gsap.to(glow, {
    attr: { opacity: 0 },
    duration: 1.2,
    delay: TOTAL,
    ease: 'sine.in',
    onComplete: () => glow.remove(),
  });
}

/** 7. Lightning strike — jagged polyline, two flashes. */
function fxLightningStrike(
  svg: SVGSVGElement,
  data: { from: [number, number]; to: [number, number] },
) {
  if (!data?.from || !data?.to) return;
  const layer = getFxLayer(svg);

  // Lazy-build a soft glow filter we can reuse for subsequent strikes.
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.insertBefore(defs, svg.firstChild);
  }
  if (!svg.querySelector('#narration-fx-lightning-glow')) {
    const filter = document.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', 'narration-fx-lightning-glow');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');
    filter.innerHTML = `
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    `;
    defs.appendChild(filter);
  }

  // Brief sky-flash overlay across the SVG (very low opacity).
  const [, , vw, vh] = getViewBox(svg);
  const skyFlash = document.createElementNS(SVG_NS, 'rect');
  skyFlash.setAttribute('x', '0');
  skyFlash.setAttribute('y', '0');
  skyFlash.setAttribute('width', String(vw));
  skyFlash.setAttribute('height', String(vh));
  skyFlash.setAttribute('fill', '#ffffff');
  skyFlash.setAttribute('opacity', '0');
  layer.appendChild(skyFlash);
  const flashTl = gsap.timeline({ onComplete: () => skyFlash.remove() });
  flashTl.to(skyFlash, { attr: { opacity: 0.18 }, duration: 0.08, ease: 'power2.out' });
  flashTl.to(skyFlash, { attr: { opacity: 0 }, duration: 0.45, ease: 'sine.in' });
  flashTl.to(skyFlash, { attr: { opacity: 0.1 }, duration: 0.05, ease: 'power2.out' }, '+=0.3');
  flashTl.to(skyFlash, { attr: { opacity: 0 }, duration: 0.6, ease: 'sine.in' });

  const flash = (afterglow = true) => {
    const [fx, fy] = data.from;
    const [tx, ty] = data.to;
    const segs = 5 + Math.floor(Math.random() * 3); // 5..7
    const dx = tx - fx;
    const dy = ty - fy;
    const len = Math.hypot(dx, dy) || 1;
    const px = -dy / len;
    const py = dx / len;
    const pts: string[] = [`${fx},${fy}`];
    for (let i = 1; i < segs; i++) {
      const t = i / segs;
      const bx = fx + dx * t;
      const by = fy + dy * t;
      const j = (Math.random() - 0.5) * 18;
      pts.push(`${(bx + px * j).toFixed(2)},${(by + py * j).toFixed(2)}`);
    }
    pts.push(`${tx},${ty}`);

    const line = document.createElementNS(SVG_NS, 'polyline');
    line.setAttribute('points', pts.join(' '));
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#ffffff');
    line.setAttribute('stroke-width', '2.4');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    line.setAttribute('filter', 'url(#narration-fx-lightning-glow)');
    layer.appendChild(line);

    if (afterglow) {
      const tl = gsap.timeline({ onComplete: () => line.remove() });
      tl.to(line, {
        attr: { 'stroke-width': 1.2, opacity: 0.7 },
        duration: 0.25,
        ease: 'power2.in',
      });
      tl.to(line, {
        attr: { 'stroke-width': 0.4, opacity: 0 },
        duration: 1.4,
        ease: 'sine.in',
      });
    } else {
      gsap.to(line, {
        attr: { 'stroke-width': 0, opacity: 0 },
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => line.remove(),
      });
    }
  };

  flash(true);
  setTimeout(() => flash(false), 220);
  setTimeout(() => flash(true), 520);
}

/** 8. Tradition badge — fixed HTML overlay with cinematic intro, hold + pulse, slow exit. */
function fxTraditionBadge(data: { tradition: 'tora' | 'biblia' | 'coran' }) {
  if (!data?.tradition) return;
  const symbols: Record<string, string> = {
    tora: '✡',     // ✡ Star of David
    timeline: '✝',   // ✝ Cross
    coran: '☪',    // ☪ Crescent
  };
  const sym = symbols[data.tradition];
  if (!sym) return;

  const badge = document.createElement('div');
  badge.setAttribute('data-narration-tradition-badge', '');
  badge.style.cssText = `
    position: fixed;
    top: calc(var(--site-nav-h) + 7rem);
    right: 1.5rem;
    z-index: 56;
    pointer-events: none;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    color: var(--era-primary);
    background: color-mix(in srgb, var(--era-accent) 38%, var(--era-bg) 62%);
    border: 1.5px solid color-mix(in srgb, var(--era-primary) 60%, transparent);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0,0,0,0.4);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
    opacity: 0;
    transform: translateY(-14px) scale(0.7) rotate(-12deg);
    will-change: transform, opacity, box-shadow;
  `;
  badge.textContent = sym;
  document.body.appendChild(badge);

  // Cinematic intro -> hold with subtle pulse/rotation -> slow exit.
  // Use a GSAP-driven sequence so we can layer pulses during the hold.
  const tl = gsap.timeline({
    onComplete: () => badge.remove(),
  });
  // Intro (0.7s): expo.out for a confident entry with overshoot.
  tl.to(badge.style, {
    opacity: 1,
    transform: 'translateY(0) scale(1.08) rotate(0deg)',
    duration: 0.7,
    ease: 'expo.out',
  });
  // Settle (0.35s).
  tl.to(badge.style, {
    transform: 'translateY(0) scale(1) rotate(0deg)',
    duration: 0.35,
    ease: 'power2.inOut',
  });
  // Hold + pulse for 4s (3 gentle breathing pulses with slight rotation sway).
  for (let i = 0; i < 3; i++) {
    tl.to(badge.style, {
      transform: `translateY(0) scale(1.05) rotate(${i % 2 === 0 ? 2 : -2}deg)`,
      duration: 0.7,
      ease: 'sine.inOut',
    });
    tl.to(badge.style, {
      transform: 'translateY(0) scale(1) rotate(0deg)',
      duration: 0.7,
      ease: 'sine.inOut',
    });
  }
  // Slow exit (1s).
  tl.to(badge.style, {
    opacity: 0,
    transform: 'translateY(-12px) scale(0.9) rotate(6deg)',
    duration: 1.0,
    ease: 'power2.in',
  });
}

/** Ensure a single <defs> exists, returning it. */
function getDefs(svg: SVGSVGElement): SVGDefsElement {
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.insertBefore(defs, svg.firstChild);
  }
  return defs as SVGDefsElement;
}

/** Read the SVG viewBox as [x, y, w, h] (fallback to width/height attrs). */
function getViewBox(svg: SVGSVGElement): [number, number, number, number] {
  const vb = svg.getAttribute('viewBox');
  if (vb) {
    const parts = vb.trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts.every((n) => !Number.isNaN(n))) {
      return [parts[0], parts[1], parts[2], parts[3]];
    }
  }
  const w = parseFloat(svg.getAttribute('width') ?? '1000') || 1000;
  const h = parseFloat(svg.getAttribute('height') ?? '600') || 600;
  return [0, 0, w, h];
}

/** 9. Rain — denser slanted drops over a longer window + faint puddle ripples at ground. */
function fxRain(
  svg: SVGSVGElement,
  data: { count?: number; durationS?: number } = {},
) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const count = data.count ?? 55;
  const duration = data.durationS ?? 4.2;
  const tilt = -12; // degrees
  const tiltRad = (tilt * Math.PI) / 180;
  const dx = Math.sin(tiltRad) * vh;

  const drops: SVGLineElement[] = [];
  for (let i = 0; i < count; i++) {
    const startX = vx + Math.random() * vw;
    const startY = vy - 10 - Math.random() * (vh * 0.4);
    const length = 6 + Math.random() * 6;
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', String(startX));
    line.setAttribute('y1', String(startY));
    line.setAttribute('x2', String(startX + Math.sin(tiltRad) * length));
    line.setAttribute('y2', String(startY + Math.cos(tiltRad) * length));
    line.setAttribute('stroke', '#9bbcd9');
    line.setAttribute('stroke-width', '0.7');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', String(0.35 + Math.random() * 0.45));
    layer.appendChild(line);
    drops.push(line);

    const delay = Math.random() * duration * 0.7;
    const fallDur = duration * (0.55 + Math.random() * 0.4);
    gsap.to(line, {
      attr: {
        y1: startY + vh + 20,
        y2: startY + vh + 20 + Math.cos(tiltRad) * length,
        x1: startX + dx,
        x2: startX + dx + Math.sin(tiltRad) * length,
        opacity: 0,
      },
      duration: fallDur,
      delay,
      ease: 'sine.in',
    });
  }

  // Sprinkle a few ground-puddle ripples along the bottom for atmosphere.
  const puddleCount = 6;
  const puddles: SVGCircleElement[] = [];
  for (let i = 0; i < puddleCount; i++) {
    const px = vx + Math.random() * vw;
    const py = vy + vh - 4 - Math.random() * 6;
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', String(px));
    c.setAttribute('cy', String(py));
    c.setAttribute('r', '0.5');
    c.setAttribute('fill', 'none');
    c.setAttribute('stroke', '#9bbcd9');
    c.setAttribute('stroke-width', '0.4');
    c.setAttribute('opacity', '0');
    layer.appendChild(c);
    puddles.push(c);
    const delay = 0.5 + i * 0.45;
    const tl = gsap.timeline({ delay, onComplete: () => c.remove() });
    tl.to(c, { attr: { opacity: 0.6, r: 2 }, duration: 0.35, ease: 'sine.out' });
    tl.to(c, { attr: { opacity: 0, r: 4 }, duration: 1.2, ease: 'sine.in' });
  }

  // Cleanup after the longest possible run.
  setTimeout(() => drops.forEach((d) => d.remove()), (duration + 1.2) * 1000);
}

/** 10. Smoke rise — staggered wisps with longer rise + soft base shadow. */
function fxSmokeRise(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const n = 14 + Math.floor(Math.random() * 5); // 14..18
  const palette = ['#3a3a3a', '#4a4a4a', '#5a5a5a', '#6a6a6a', '#2c2c2c'];
  const wisps: SVGEllipseElement[] = [];

  // Faint dark base "char" smear that lingers under the rising smoke.
  const base = document.createElementNS(SVG_NS, 'ellipse');
  base.setAttribute('cx', String(x));
  base.setAttribute('cy', String(y + 1.5));
  base.setAttribute('rx', '5');
  base.setAttribute('ry', '1.8');
  base.setAttribute('fill', '#202020');
  base.setAttribute('opacity', '0');
  base.setAttribute('filter', 'blur(0.8px)');
  layer.appendChild(base);
  const baseTl = gsap.timeline({ onComplete: () => base.remove() });
  baseTl.to(base, { attr: { opacity: 0.55 }, duration: 0.5, ease: 'sine.out' });
  baseTl.to({}, { duration: 3.2 });
  baseTl.to(base, { attr: { opacity: 0 }, duration: 1.4, ease: 'sine.in' });

  for (let i = 0; i < n; i++) {
    const baseOx = (Math.random() - 0.5) * 6;
    const e = document.createElementNS(SVG_NS, 'ellipse');
    e.setAttribute('cx', String(x + baseOx));
    e.setAttribute('cy', String(y));
    e.setAttribute('rx', String(2 + Math.random() * 1.5));
    e.setAttribute('ry', String(1.4 + Math.random() * 1));
    e.setAttribute('fill', palette[i % palette.length]);
    e.setAttribute('opacity', '0');
    e.setAttribute('filter', 'blur(0.6px)');
    layer.appendChild(e);
    wisps.push(e);

    // Staggered spawn over ~2.6s so smoke keeps emitting, not all at once.
    const delay = i * 0.17;
    const drift = (Math.random() - 0.5) * 10;
    const rise = 22 + Math.random() * 12;
    const finalRx = 6 + Math.random() * 3;
    const finalRy = 4.5 + Math.random() * 2;

    const tl = gsap.timeline({ delay, onComplete: () => e.remove() });
    tl.to(e, {
      attr: { opacity: 0.6 },
      duration: 0.45,
      ease: 'sine.out',
    });
    tl.to(
      e,
      {
        attr: {
          cy: y - rise,
          cx: x + baseOx + drift,
          rx: finalRx,
          ry: finalRy,
          opacity: 0,
        },
        duration: 3.6,
        ease: 'power2.out',
      },
      '<',
    );
  }
}

/** 11. Earthquake shake — long jiggle with decay + cracked-ground polylines fading in. */
function fxEarthquakeShake(
  svg: SVGSVGElement,
  data: { pinIdx?: number; intensity?: number } = {},
) {
  if (!currentEventId) return;
  const marker = svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`);
  if (!marker) return;
  const intensity = data.intensity ?? 3;

  let target: SVGGraphicsElement = marker;
  if (typeof data.pinIdx === 'number') {
    const pins = marker.querySelectorAll<SVGGElement>('[data-char-pin-wrap]');
    const pin = pins[data.pinIdx];
    if (pin) target = pin;
  }

  const originalTransform = target.getAttribute('transform') ?? '';
  const [baseX, baseY] = parseTranslate(originalTransform);

  // Long shake with decay (~3s).
  const OSC = 44;
  const DUR = 3.0;
  const step = DUR / OSC;
  const tl = gsap.timeline({
    onComplete: () => {
      if (originalTransform) target.setAttribute('transform', originalTransform);
      else target.removeAttribute('transform');
    },
  });
  for (let i = 0; i < OSC; i++) {
    // Front-loaded intensity with smoother decay.
    const decay = Math.pow(1 - i / OSC, 1.6);
    const jx = (Math.random() - 0.5) * 2 * intensity * decay;
    const jy = (Math.random() - 0.5) * 2 * intensity * decay;
    tl.to(target, {
      duration: step,
      ease: 'sine.inOut',
      attr: { transform: `translate(${baseX + jx}, ${baseY + jy})` },
    });
  }

  // Cracked-ground polylines that fade in under the marker and linger.
  const layer = getFxLayer(svg);
  const cracks: SVGPolylineElement[] = [];
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2 + Math.random() * 0.6;
    const len = 14 + Math.random() * 8;
    const segs = 4;
    const pts: string[] = [`${baseX},${baseY}`];
    for (let s = 1; s <= segs; s++) {
      const t = s / segs;
      const r = len * t;
      const jx = (Math.random() - 0.5) * 3;
      const jy = (Math.random() - 0.5) * 3;
      pts.push(
        `${(baseX + Math.cos(angle) * r + jx).toFixed(2)},${(baseY + Math.sin(angle) * r + jy).toFixed(2)}`,
      );
    }
    const line = document.createElementNS(SVG_NS, 'polyline');
    line.setAttribute('points', pts.join(' '));
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', '#2a2018');
    line.setAttribute('stroke-width', '0.6');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    line.setAttribute('opacity', '0');
    layer.appendChild(line);
    cracks.push(line);

    const cTl = gsap.timeline({ delay: 0.2 + i * 0.18, onComplete: () => line.remove() });
    cTl.to(line, { attr: { opacity: 0.55 }, duration: 0.4, ease: 'power2.out' });
    cTl.to({}, { duration: 2.2 });
    cTl.to(line, { attr: { opacity: 0 }, duration: 1.4, ease: 'sine.in' });
  }
}

/** 12. Blood stain — slow seep with halo + droplets, long hold, slow fade (>4s visible). */
function fxBloodStain(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);

  // Faint outer halo (suggests soaked area).
  const halo = document.createElementNS(SVG_NS, 'circle');
  halo.setAttribute('cx', String(x));
  halo.setAttribute('cy', String(y));
  halo.setAttribute('r', '0');
  halo.setAttribute('fill', '#5a0e0a');
  halo.setAttribute('opacity', '0');
  halo.setAttribute('filter', 'blur(1px)');
  layer.appendChild(halo);

  const outer = document.createElementNS(SVG_NS, 'circle');
  outer.setAttribute('cx', String(x));
  outer.setAttribute('cy', String(y));
  outer.setAttribute('r', '0');
  outer.setAttribute('fill', '#7a1a14');
  outer.setAttribute('opacity', '0');
  layer.appendChild(outer);

  const inner = document.createElementNS(SVG_NS, 'circle');
  inner.setAttribute('cx', String(x));
  inner.setAttribute('cy', String(y));
  inner.setAttribute('r', '0');
  inner.setAttribute('fill', '#a03020');
  inner.setAttribute('opacity', '0');
  layer.appendChild(inner);

  // A few small droplets seeping outward.
  const droplets: SVGCircleElement[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.6;
    const dist = 8 + Math.random() * 5;
    const dx = x + Math.cos(angle) * dist;
    const dy = y + Math.sin(angle) * dist;
    const d = document.createElementNS(SVG_NS, 'circle');
    d.setAttribute('cx', String(dx));
    d.setAttribute('cy', String(dy));
    d.setAttribute('r', '0');
    d.setAttribute('fill', '#7a1a14');
    d.setAttribute('opacity', '0');
    layer.appendChild(d);
    droplets.push(d);
    const dTl = gsap.timeline({ delay: 0.4 + i * 0.1 });
    dTl.to(d, {
      attr: { r: 1 + Math.random() * 0.8, opacity: 0.8 },
      duration: 0.7,
      ease: 'power2.out',
    });
    dTl.to({}, { duration: 3.2 });
    dTl.to(d, {
      attr: { opacity: 0 },
      duration: 1.6,
      ease: 'sine.in',
      onComplete: () => d.remove(),
    });
  }

  const tl = gsap.timeline({
    onComplete: () => {
      halo.remove();
      outer.remove();
      inner.remove();
    },
  });
  // Bigger so the bloodstain reads at viewBox scale (was getting lost as a 14px halo on a 1000-unit-wide map).
  tl.to(halo, {
    attr: { r: 22, opacity: 0.55 },
    duration: 1.3,
    ease: 'power3.out',
  });
  tl.to(
    outer,
    { attr: { r: 15, opacity: 0.9 }, duration: 1.0, ease: 'power2.out' },
    '-=1.0',
  );
  tl.to(
    inner,
    { attr: { r: 6, opacity: 0.95 }, duration: 0.85, ease: 'power2.out' },
    '-=0.7',
  );
  tl.to({}, { duration: 3.4 }); // long hold
  tl.to([halo, outer, inner], {
    attr: { opacity: 0 },
    duration: 1.6,
    ease: 'sine.in',
  });
}

/** 13. Journey trace — dashed path from→to with draw-on effect + trail. */
function fxJourneyTrace(
  svg: SVGSVGElement,
  data: {
    from: [number, number];
    to: [number, number];
    style?: 'walking' | 'boat' | 'caravan';
  },
) {
  if (!data?.from || !data?.to) return;
  const [fx, fy] = data.from;
  const [tx, ty] = data.to;
  const layer = getFxLayer(svg);
  const stroke = eraVar('--era-accent', '#d9b35a');

  // Style → dash pattern.
  let dash = '3 2';
  if (data.style === 'boat') dash = '1 3';
  else if (data.style === 'caravan') dash = '5 2 1 2';

  // Slight arc via a quadratic for visual interest.
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2;
  const dx = tx - fx;
  const dy = ty - fy;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular curl amount, scaled to length.
  const curl = Math.min(len * 0.18, 18);
  const cx = mx - (dy / len) * curl;
  const cy = my + (dx / len) * curl;
  const d = `M ${fx} ${fy} Q ${cx} ${cy} ${tx} ${ty}`;

  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '1.4');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-dasharray', dash);
  path.setAttribute('opacity', '0.9');
  layer.appendChild(path);

  // Draw-on effect.
  const total = (() => {
    try {
      return path.getTotalLength();
    } catch {
      return len;
    }
  })();
  path.setAttribute('stroke-dasharray', String(total));
  path.setAttribute('stroke-dashoffset', String(total));

  // Traveling pulse dot that rides the path while it draws.
  const pulse = document.createElementNS(SVG_NS, 'circle');
  pulse.setAttribute('r', '1.8');
  pulse.setAttribute('fill', stroke);
  pulse.setAttribute('opacity', '0.9');
  pulse.setAttribute('filter', 'blur(0.4px)');
  layer.appendChild(pulse);
  const obj = { t: 0 };
  const DRAW = 2.8;
  gsap.to(obj, {
    t: 1,
    duration: DRAW,
    ease: 'power3.inOut',
    onUpdate: () => {
      try {
        const pt = path.getPointAtLength(total * obj.t);
        pulse.setAttribute('cx', String(pt.x));
        pulse.setAttribute('cy', String(pt.y));
      } catch {
        /* path detached during cleanup */
      }
    },
  });
  gsap.to(path, {
    attr: { 'stroke-dashoffset': 0 },
    duration: DRAW,
    ease: 'power3.inOut',
    onComplete: () => {
      // Restore stylistic dashes, then fade pulse + path.
      path.setAttribute('stroke-dasharray', dash);
      path.setAttribute('stroke-dashoffset', '0');
      gsap.to(pulse, {
        attr: { opacity: 0, r: 4 },
        duration: 0.9,
        ease: 'sine.in',
        onComplete: () => pulse.remove(),
      });
      gsap.to(path, {
        attr: { opacity: 0 },
        duration: 2.0,
        delay: 1.0,
        ease: 'sine.in',
        onComplete: () => path.remove(),
      });
    },
  });
}

/** 14. Halo divine — soft inner glow held during breathing + two expanding outer rings. */
function fxHaloDivine(svg: SVGSVGElement, data: { pinIdx: number }) {
  const pin = getPinAt(svg, data.pinIdx);
  if (!pin) return;
  const [px, py] = parseTranslate(pin.getAttribute('transform'));
  const marker = pin.closest('[data-marker]') as SVGGElement | null;
  const [mx, my] = parseTranslate(marker?.getAttribute('transform') ?? null);
  const layer = getFxLayer(svg);
  const cx = mx + px;
  const cy = my + py;

  // Inner solid soft glow — fades in, breathes during hold, fades out.
  const glow = document.createElementNS(SVG_NS, 'circle');
  glow.setAttribute('cx', String(cx));
  glow.setAttribute('cy', String(cy));
  glow.setAttribute('r', '6');
  glow.setAttribute('fill', '#f0d878');
  glow.setAttribute('opacity', '0');
  glow.setAttribute('filter', 'blur(1px)');
  layer.appendChild(glow);
  const glowTl = gsap.timeline({ onComplete: () => glow.remove() });
  glowTl.to(glow, { attr: { opacity: 0.45, r: 14 }, duration: 1.0, ease: 'expo.out' });
  // Two breathing pulses while held.
  for (let i = 0; i < 2; i++) {
    glowTl.to(glow, { attr: { r: 16, opacity: 0.55 }, duration: 0.8, ease: 'sine.inOut' });
    glowTl.to(glow, { attr: { r: 13, opacity: 0.4 }, duration: 0.8, ease: 'sine.inOut' });
  }
  glowTl.to(glow, { attr: { opacity: 0, r: 22 }, duration: 1.4, ease: 'sine.in' });

  // Two outer ring pulses, staggered.
  const inner = document.createElementNS(SVG_NS, 'circle');
  inner.setAttribute('cx', String(cx));
  inner.setAttribute('cy', String(cy));
  inner.setAttribute('r', '10');
  inner.setAttribute('fill', 'none');
  inner.setAttribute('stroke', '#f0d878');
  inner.setAttribute('stroke-width', '2');
  inner.setAttribute('opacity', '0');
  layer.appendChild(inner);
  const tlInner = gsap.timeline({ onComplete: () => inner.remove() });
  tlInner.to(inner, {
    attr: { r: 22, opacity: 0.75 },
    duration: 1.2,
    ease: 'power3.out',
  });
  tlInner.to(inner, {
    attr: { r: 36, opacity: 0, 'stroke-width': 0.4 },
    duration: 2.6,
    ease: 'sine.in',
  });

  const outer = document.createElementNS(SVG_NS, 'circle');
  outer.setAttribute('cx', String(cx));
  outer.setAttribute('cy', String(cy));
  outer.setAttribute('r', '14');
  outer.setAttribute('fill', 'none');
  outer.setAttribute('stroke', '#f0d878');
  outer.setAttribute('stroke-width', '1');
  outer.setAttribute('opacity', '0');
  layer.appendChild(outer);
  const tlOuter = gsap.timeline({ delay: 0.5, onComplete: () => outer.remove() });
  tlOuter.to(outer, {
    attr: { r: 28, opacity: 0.5 },
    duration: 1.4,
    ease: 'power3.out',
  });
  tlOuter.to(outer, {
    attr: { r: 46, opacity: 0, 'stroke-width': 0.2 },
    duration: 2.6,
    ease: 'sine.in',
  });
}

/** 15. Dove flight — slower travel with wing-flutter scale and trailing feathers. */
function fxDoveFlight(
  svg: SVGSVGElement,
  data: { from: [number, number]; to: [number, number] },
) {
  if (!data?.from || !data?.to) return;
  const [fx, fy] = data.from;
  const [tx, ty] = data.to;
  const layer = getFxLayer(svg);

  const dove = document.createElementNS(SVG_NS, 'path');
  dove.setAttribute(
    'd',
    'M -3 0 Q -1.5 -2 0 0 Q 1.5 -2 3 0 Q 1.5 1 0 0.5 Q -1.5 1 -3 0 Z',
  );
  dove.setAttribute('fill', '#ffffff');
  dove.setAttribute('stroke', 'rgba(0,0,0,0.25)');
  dove.setAttribute('stroke-width', '0.3');
  dove.setAttribute('opacity', '0');
  dove.setAttribute('transform', `translate(${fx}, ${fy}) scale(1)`);
  layer.appendChild(dove);

  const DUR = 4.0;
  const dx = tx - fx;
  const dy = ty - fy;

  gsap.to(dove, { attr: { opacity: 1 }, duration: 0.45, ease: 'sine.out' });

  // Trailing feather particles spawn while the dove travels.
  const feathers: SVGCircleElement[] = [];
  const tickerObj = { t: 0 };
  let lastFeatherT = 0;

  gsap.to(tickerObj, {
    t: 1,
    duration: DUR,
    ease: 'power2.inOut',
    onUpdate: () => {
      const t = tickerObj.t;
      const bob = Math.sin(t * Math.PI * 6) * 2.0;
      const cx = fx + dx * t;
      const cy = fy + dy * t + bob;
      // Wing flutter via subtle Y-scale variation tied to bob phase.
      const wing = 1 + Math.sin(t * Math.PI * 12) * 0.18;
      dove.setAttribute('transform', `translate(${cx}, ${cy}) scale(1, ${wing.toFixed(3)})`);

      // Drop a feather every ~0.18 of progress.
      if (t - lastFeatherT > 0.12 && t < 0.95) {
        lastFeatherT = t;
        const f = document.createElementNS(SVG_NS, 'circle');
        f.setAttribute('cx', String(cx + (Math.random() - 0.5) * 2));
        f.setAttribute('cy', String(cy + (Math.random() - 0.5) * 1));
        f.setAttribute('r', '0.6');
        f.setAttribute('fill', '#ffffff');
        f.setAttribute('opacity', '0.7');
        layer.appendChild(f);
        feathers.push(f);
        gsap.to(f, {
          attr: { opacity: 0, cy: cy + 6 + Math.random() * 4 },
          duration: 1.4 + Math.random() * 0.6,
          ease: 'sine.in',
          onComplete: () => f.remove(),
        });
      }
    },
    onComplete: () => {
      gsap.to(dove, {
        attr: { opacity: 0 },
        duration: 1.0,
        ease: 'sine.in',
        onComplete: () => dove.remove(),
      });
    },
  });
}

/** 16. Idol shatter — anticipation tremor, explosive burst, falling shards + dust cloud. */
function fxIdolShatter(
  svg: SVGSVGElement,
  data: { position: [number, number]; count?: number },
) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const n = data.count ?? 9 + Math.floor(Math.random() * 5); // 9..13
  const palette = ['#8a7250', '#a08560', '#7a6240', '#9b8264'];

  // Dust cloud puff that blooms at the moment of shatter.
  const dust = document.createElementNS(SVG_NS, 'circle');
  dust.setAttribute('cx', String(x));
  dust.setAttribute('cy', String(y));
  dust.setAttribute('r', '4');
  dust.setAttribute('fill', '#b8a484');
  dust.setAttribute('opacity', '0');
  dust.setAttribute('filter', 'blur(1px)');
  layer.appendChild(dust);
  const dustTl = gsap.timeline({ delay: 0.7, onComplete: () => dust.remove() });
  dustTl.to(dust, { attr: { opacity: 0.55, r: 14 }, duration: 0.5, ease: 'expo.out' });
  dustTl.to(dust, { attr: { opacity: 0, r: 26 }, duration: 2.2, ease: 'sine.in' });

  for (let i = 0; i < n; i++) {
    const isDiamond = Math.random() < 0.5;
    const r = 1.8 + Math.random() * 1.2;
    let pts: string;
    if (isDiamond) {
      pts = `0,-${r} ${r * 0.7},0 0,${r} -${r * 0.7},0`;
    } else {
      pts = `0,-${r} ${r},${r * 0.8} -${r},${r * 0.8}`;
    }
    const poly = document.createElementNS(SVG_NS, 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', palette[i % palette.length]);
    poly.setAttribute('stroke', '#3a2a1a');
    poly.setAttribute('stroke-width', '0.3');
    poly.setAttribute('opacity', '0');
    poly.setAttribute('transform', `translate(${x}, ${y}) scale(0) rotate(0)`);
    layer.appendChild(poly);

    const angle = (i / n) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 10 + Math.random() * 12;
    const fx2 = x + Math.cos(angle) * dist;
    const fy2 = y + Math.sin(angle) * dist;
    // Add gravity drop for the falling phase.
    const fy3 = fy2 + 4 + Math.random() * 4;
    const rot = (Math.random() - 0.5) * 540;
    const rot2 = rot + (Math.random() - 0.5) * 180;

    const tl = gsap.timeline({ onComplete: () => poly.remove() });
    // Build up (idol assembles).
    tl.to(poly, {
      attr: { opacity: 1, transform: `translate(${x}, ${y}) scale(1) rotate(0)` },
      duration: 0.4,
      ease: 'back.out(2)',
    });
    // Anticipation tremor before shatter.
    tl.to(poly, {
      attr: { transform: `translate(${x + (Math.random() - 0.5) * 1.5}, ${y + (Math.random() - 0.5) * 1.5}) scale(1.05) rotate(${(Math.random() - 0.5) * 8})` },
      duration: 0.3,
      ease: 'power2.inOut',
    });
    // Explode outward (fast).
    tl.to(poly, {
      attr: {
        transform: `translate(${fx2}, ${fy2}) scale(0.8) rotate(${rot})`,
        opacity: 0.9,
      },
      duration: 0.6,
      ease: 'expo.out',
    });
    // Fall + tumble + fade.
    tl.to(poly, {
      attr: {
        transform: `translate(${fx2}, ${fy3}) scale(0.4) rotate(${rot2})`,
        opacity: 0,
      },
      duration: 1.8,
      ease: 'power2.in',
    });
  }
}

/** 17. Plague swarm — many chaotic dots moving Brownian around center. */
function fxPlagueSwarm(
  svg: SVGSVGElement,
  data: { position: [number, number]; type?: string },
) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const n = 38 + Math.floor(Math.random() * 16); // 38..53
  const SPAN = 48;
  const DUR = 4.5; // seconds

  const dots: { el: SVGCircleElement; px: number; py: number }[] = [];
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * (SPAN / 2);
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', String(px));
    c.setAttribute('cy', String(py));
    c.setAttribute('r', String(0.6 + Math.random() * 0.6));
    c.setAttribute('fill', '#0a0a0a');
    c.setAttribute('opacity', '0');
    layer.appendChild(c);
    dots.push({ el: c, px, py });
  }

  // Stagger fade-in so the swarm gathers rather than appearing all-at-once.
  gsap.to(
    dots.map((d) => d.el),
    {
      attr: { opacity: 0.85 },
      duration: 0.45,
      ease: 'sine.out',
      stagger: { each: 0.012, from: 'center' },
    },
  );

  // Brownian per-tick: gsap ticker for ~DUR seconds.
  const start = performance.now();
  const tick = () => {
    const elapsed = (performance.now() - start) / 1000;
    if (elapsed >= DUR) {
      gsap.ticker.remove(tick);
      gsap.to(
        dots.map((d) => d.el),
        {
          attr: { opacity: 0 },
          duration: 1.4,
          ease: 'sine.in',
          stagger: { each: 0.01, from: 'random' },
          onComplete: () => dots.forEach((d) => d.el.remove()),
        },
      );
      return;
    }
    dots.forEach((d) => {
      d.px += (Math.random() - 0.5) * 1.4;
      d.py += (Math.random() - 0.5) * 1.4;
      // Soft pull back toward center if drifting too far.
      const ddx = d.px - x;
      const ddy = d.py - y;
      const dist = Math.hypot(ddx, ddy);
      if (dist > SPAN / 2) {
        d.px -= (ddx / dist) * 0.6;
        d.py -= (ddy / dist) * 0.6;
      }
      d.el.setAttribute('cx', String(d.px));
      d.el.setAttribute('cy', String(d.py));
    });
  };
  gsap.ticker.add(tick);
}

/** 18. Walls fall — three stacked rectangles that tilt + drop in sequence. */
function fxWallsFall(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const palette = ['#b89c70', '#a88858', '#967848'];
  const W = 14;
  const H = 4;

  for (let i = 0; i < 3; i++) {
    const rectY = y - 6 + i * (H + 0.8);
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('transform', `translate(${x}, ${rectY}) rotate(0)`);
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', String(-W / 2));
    rect.setAttribute('y', String(-H / 2));
    rect.setAttribute('width', String(W));
    rect.setAttribute('height', String(H));
    rect.setAttribute('fill', palette[i]);
    rect.setAttribute('stroke', '#4a3820');
    rect.setAttribute('stroke-width', '0.4');
    rect.setAttribute('opacity', '1');
    g.appendChild(rect);
    layer.appendChild(g);

    // Slower stagger (top falls first, walls collapse in sequence).
    const delay = i * 0.55;
    const tiltDir = i % 2 === 0 ? 1 : -1;
    // Tiny anticipation sway then a heavy fall (expo.in for weighty drama).
    const tl = gsap.timeline({ delay });
    tl.to(g, {
      attr: {
        transform: `translate(${x + tiltDir * 0.6}, ${rectY}) rotate(${tiltDir * 3})`,
      },
      duration: 0.45,
      ease: 'sine.inOut',
    });
    tl.to(g, {
      attr: {
        transform: `translate(${x + tiltDir * 5}, ${rectY + 12}) rotate(${tiltDir * 30})`,
      },
      duration: 1.7,
      ease: 'expo.in',
    });
    gsap.to(rect, {
      attr: { opacity: 0 },
      duration: 1.0,
      delay: delay + 1.8,
      ease: 'sine.in',
      onComplete: () => g.remove(),
    });

    // Dust puff at the moment of impact.
    const puff = document.createElementNS(SVG_NS, 'ellipse');
    puff.setAttribute('cx', String(x + tiltDir * 5));
    puff.setAttribute('cy', String(rectY + 14));
    puff.setAttribute('rx', '3');
    puff.setAttribute('ry', '1.5');
    puff.setAttribute('fill', '#c9b48a');
    puff.setAttribute('opacity', '0');
    puff.setAttribute('filter', 'blur(0.8px)');
    layer.appendChild(puff);
    const pTl = gsap.timeline({ delay: delay + 1.6, onComplete: () => puff.remove() });
    pTl.to(puff, { attr: { opacity: 0.6, rx: 9, ry: 4 }, duration: 0.5, ease: 'expo.out' });
    pTl.to(puff, { attr: { opacity: 0, rx: 14, ry: 6 }, duration: 1.6, ease: 'sine.in' });
  }
}

/** 19. Burning bush — green bush + 6 flickering flames on top. */
function fxBurningBush(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);

  // Soft ambient glow that lingers behind the bush.
  const glow = document.createElementNS(SVG_NS, 'circle');
  glow.setAttribute('cx', String(x));
  glow.setAttribute('cy', String(y));
  glow.setAttribute('r', '10');
  glow.setAttribute('fill', '#ffb050');
  glow.setAttribute('opacity', '0');
  glow.setAttribute('filter', 'blur(1.4px)');
  layer.appendChild(glow);
  gsap.to(glow, {
    attr: { opacity: 0.35, r: 18 },
    duration: 0.9,
    ease: 'expo.out',
  });

  // Bush — fades in then sways subtly while burning.
  const bush = document.createElementNS(SVG_NS, 'ellipse');
  bush.setAttribute('cx', String(x));
  bush.setAttribute('cy', String(y + 3));
  bush.setAttribute('rx', '8');
  bush.setAttribute('ry', '5');
  bush.setAttribute('fill', '#2e6a2a');
  bush.setAttribute('stroke', '#1e4a1a');
  bush.setAttribute('stroke-width', '0.5');
  bush.setAttribute('opacity', '0');
  layer.appendChild(bush);

  gsap.to(bush, {
    attr: { opacity: 1 },
    duration: 0.6,
    ease: 'sine.out',
  });
  // Subtle sway loop (cx jitter) while burning.
  const bushSway = gsap.timeline({ repeat: 3, yoyo: true });
  bushSway.to(bush, { attr: { cx: x + 0.6 }, duration: 0.9, ease: 'sine.inOut' });
  bushSway.to(bush, { attr: { cx: x - 0.6 }, duration: 0.9, ease: 'sine.inOut' });

  // 6 flames across the top.
  const palette = ['#ff8b3a', '#ffa84a', '#ffd34f', '#ff6a20'];
  const flames: { el: SVGEllipseElement; baseY: number; phase: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const ox = -6 + (i / 5) * 12 + (Math.random() - 0.5) * 1.5;
    const oy = -1 + (Math.random() - 0.5) * 1.5;
    const e = document.createElementNS(SVG_NS, 'ellipse');
    e.setAttribute('cx', String(x + ox));
    e.setAttribute('cy', String(y + oy));
    e.setAttribute('rx', String(1.6 + Math.random() * 1.2));
    e.setAttribute('ry', String(3.5 + Math.random() * 2));
    e.setAttribute('fill', palette[i % palette.length]);
    e.setAttribute('opacity', '0.65');
    e.setAttribute('filter', 'blur(0.4px)');
    layer.appendChild(e);
    flames.push({ el: e, baseY: y + oy, phase: Math.random() * Math.PI * 2 });
  }

  const TOTAL = 5.0;
  const PERIOD = 0.85;
  flames.forEach(({ el, baseY, phase }) => {
    const tl = gsap.timeline({ repeat: Math.max(1, Math.floor(TOTAL / (PERIOD * 2))) });
    tl.to(el, {
      duration: PERIOD,
      ease: 'sine.inOut',
      attr: { cy: baseY - 2.6, opacity: 1 },
    });
    tl.to(el, {
      duration: PERIOD,
      ease: 'sine.inOut',
      attr: { cy: baseY, opacity: 0.65 },
    });
    tl.delay((phase / (Math.PI * 2)) * 0.45);
  });

  // Slow fade everything out at the end (longer dissolve).
  gsap.to(
    [bush, ...flames.map((f) => f.el)],
    {
      attr: { opacity: 0 },
      duration: 1.4,
      delay: TOTAL,
      ease: 'sine.in',
      onComplete: () => {
        bush.remove();
        flames.forEach((f) => f.el.remove());
      },
    },
  );
  gsap.to(glow, {
    attr: { opacity: 0, r: 26 },
    duration: 1.8,
    delay: TOTAL,
    ease: 'sine.in',
    onComplete: () => glow.remove(),
  });
}

/** 20. Stone tablets — two arched rectangles + glow halo + line marks. */
function fxStoneTablets(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);

  // Halo behind.
  const halo = document.createElementNS(SVG_NS, 'circle');
  halo.setAttribute('cx', String(x));
  halo.setAttribute('cy', String(y));
  halo.setAttribute('r', '12');
  halo.setAttribute('fill', '#f0d878');
  halo.setAttribute('opacity', '0');
  layer.appendChild(halo);

  // Two tablets — arched top via path. Each is ~6 wide x 9 tall.
  const TW = 5;
  const TH = 9;
  const makeTablet = (cx: number): SVGGElement => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('transform', `translate(${cx}, ${y}) scale(0)`);
    g.setAttribute('style', 'transform-box: fill-box; transform-origin: 50% 50%;');

    const path = document.createElementNS(SVG_NS, 'path');
    // Path: rect bottom + arch top. (cx is the local 0.)
    const d = `M ${-TW / 2} ${TH / 2}
               L ${-TW / 2} ${-TH / 2 + 2}
               Q ${-TW / 2} ${-TH / 2} 0 ${-TH / 2}
               Q ${TW / 2} ${-TH / 2} ${TW / 2} ${-TH / 2 + 2}
               L ${TW / 2} ${TH / 2}
               Z`;
    path.setAttribute('d', d.replace(/\s+/g, ' '));
    path.setAttribute('fill', '#bcae8a');
    path.setAttribute('stroke', '#5a4e30');
    path.setAttribute('stroke-width', '0.4');
    g.appendChild(path);

    // 5 line marks (commandments).
    for (let i = 0; i < 5; i++) {
      const ly = -TH / 2 + 2.5 + i * 1.2;
      const ln = document.createElementNS(SVG_NS, 'line');
      ln.setAttribute('x1', String(-TW / 2 + 1));
      ln.setAttribute('x2', String(TW / 2 - 1));
      ln.setAttribute('y1', String(ly));
      ln.setAttribute('y2', String(ly));
      ln.setAttribute('stroke', '#5a4e30');
      ln.setAttribute('stroke-width', '0.3');
      g.appendChild(ln);
    }
    return g;
  };

  const left = makeTablet(x - TW / 2 - 0.5);
  const right = makeTablet(x + TW / 2 + 0.5);
  layer.appendChild(left);
  layer.appendChild(right);

  const tl = gsap.timeline({
    onComplete: () => {
      halo.remove();
      left.remove();
      right.remove();
    },
  });
  tl.to(halo, {
    attr: { opacity: 0.55, r: 18 },
    duration: 0.8,
    ease: 'expo.out',
  });
  tl.to(
    [left, right],
    {
      attr: {
        transform: (_i: number, el: Element) => {
          const t = el.getAttribute('transform') ?? '';
          const m = /translate\(([^)]+)\)/.exec(t);
          return `translate(${m?.[1] ?? '0,0'}) scale(1)`;
        },
      },
      duration: 1.0,
      ease: 'back.out(1.6)',
      stagger: 0.2,
    },
    '-=0.4',
  );

  // Hold with breathing halo + subtle sway on tablets.
  const haloBreath = gsap.timeline({ delay: 1.2, repeat: 2 });
  haloBreath.to(halo, { attr: { opacity: 0.7, r: 22 }, duration: 0.9, ease: 'sine.inOut' });
  haloBreath.to(halo, { attr: { opacity: 0.5, r: 18 }, duration: 0.9, ease: 'sine.inOut' });

  const swayL = gsap.timeline({ delay: 1.2, repeat: 2, yoyo: true });
  swayL.to(left, {
    attr: {
      transform: () => {
        const t = left.getAttribute('transform') ?? '';
        const m = /translate\(([^)]+)\)/.exec(t);
        return `translate(${m?.[1] ?? '0,0'}) scale(1) rotate(-1.5)`;
      },
    },
    duration: 1.3,
    ease: 'sine.inOut',
  });
  const swayR = gsap.timeline({ delay: 1.2, repeat: 2, yoyo: true });
  swayR.to(right, {
    attr: {
      transform: () => {
        const t = right.getAttribute('transform') ?? '';
        const m = /translate\(([^)]+)\)/.exec(t);
        return `translate(${m?.[1] ?? '0,0'}) scale(1) rotate(1.5)`;
      },
    },
    duration: 1.3,
    ease: 'sine.inOut',
  });

  tl.to({}, { duration: 4.4 }); // long hold
  tl.to([halo, left, right], {
    attr: { opacity: 0 },
    duration: 1.4,
    ease: 'sine.in',
  });
}

/** 21. Scroll unfurl — thin vertical line expands horizontally. */
function fxScrollUnfurl(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);

  const W_FINAL = 40;
  const H = 7;

  const rect = document.createElementNS(SVG_NS, 'rect');
  rect.setAttribute('x', String(x - 1));
  rect.setAttribute('y', String(y - H / 2));
  rect.setAttribute('width', '2');
  rect.setAttribute('height', String(H));
  rect.setAttribute('rx', '2');
  rect.setAttribute('ry', '2');
  rect.setAttribute('fill', '#e8d4a8');
  rect.setAttribute('stroke', '#8a6e3a');
  rect.setAttribute('stroke-width', '0.4');
  rect.setAttribute('opacity', '0');
  layer.appendChild(rect);

  // Two end caps (the "rolls").
  const capL = document.createElementNS(SVG_NS, 'rect');
  capL.setAttribute('y', String(y - H / 2 - 0.6));
  capL.setAttribute('width', '1.8');
  capL.setAttribute('height', String(H + 1.2));
  capL.setAttribute('rx', '0.9');
  capL.setAttribute('fill', '#8a6e3a');
  capL.setAttribute('x', String(x - 1));
  capL.setAttribute('opacity', '0');
  layer.appendChild(capL);

  const capR = document.createElementNS(SVG_NS, 'rect');
  capR.setAttribute('y', String(y - H / 2 - 0.6));
  capR.setAttribute('width', '1.8');
  capR.setAttribute('height', String(H + 1.2));
  capR.setAttribute('rx', '0.9');
  capR.setAttribute('fill', '#8a6e3a');
  capR.setAttribute('x', String(x - 1));
  capR.setAttribute('opacity', '0');
  layer.appendChild(capR);

  // Edge flutter — a faint stripe at top/bottom of the parchment that
  // wobbles to suggest the paper isn't perfectly still.
  const fluttTop = document.createElementNS(SVG_NS, 'rect');
  fluttTop.setAttribute('x', String(x - 1));
  fluttTop.setAttribute('y', String(y - H / 2));
  fluttTop.setAttribute('width', '2');
  fluttTop.setAttribute('height', '0.5');
  fluttTop.setAttribute('fill', '#d8c298');
  fluttTop.setAttribute('opacity', '0');
  layer.appendChild(fluttTop);

  const fluttBot = document.createElementNS(SVG_NS, 'rect');
  fluttBot.setAttribute('x', String(x - 1));
  fluttBot.setAttribute('y', String(y + H / 2 - 0.5));
  fluttBot.setAttribute('width', '2');
  fluttBot.setAttribute('height', '0.5');
  fluttBot.setAttribute('fill', '#d8c298');
  fluttBot.setAttribute('opacity', '0');
  layer.appendChild(fluttBot);

  const tl = gsap.timeline({
    onComplete: () => {
      // Edge flutter loop during the hold.
      const flutLoop = gsap.timeline({ repeat: 2, yoyo: true });
      flutLoop.to(fluttTop, { attr: { y: y - H / 2 - 0.4 }, duration: 0.8, ease: 'sine.inOut' });
      flutLoop.to(fluttBot, { attr: { y: y + H / 2 - 0.1 }, duration: 0.8, ease: 'sine.inOut' }, '<');

      // Hold then slow fade out.
      gsap.to([rect, capL, capR, fluttTop, fluttBot], {
        attr: { opacity: 0 },
        duration: 1.4,
        delay: 3.0,
        ease: 'sine.in',
        onComplete: () => {
          rect.remove();
          capL.remove();
          capR.remove();
          fluttTop.remove();
          fluttBot.remove();
        },
      });
    },
  });
  tl.to([rect, capL, capR], {
    attr: { opacity: 1 },
    duration: 0.4,
    ease: 'sine.out',
  });
  tl.to(
    [fluttTop, fluttBot],
    { attr: { opacity: 0.6, width: W_FINAL }, duration: 0.4, ease: 'sine.out' },
    '<',
  );
  // Slower, more cinematic unfurl with expo.out so it whips open then settles.
  tl.to(
    rect,
    {
      attr: {
        x: x - W_FINAL / 2,
        width: W_FINAL,
      },
      duration: 2.4,
      ease: 'expo.out',
    },
    '<',
  );
  tl.to(
    capL,
    {
      attr: { x: x - W_FINAL / 2 - 0.9 },
      duration: 2.4,
      ease: 'expo.out',
    },
    '<',
  );
  tl.to(
    capR,
    {
      attr: { x: x + W_FINAL / 2 - 0.9 },
      duration: 2.4,
      ease: 'expo.out',
    },
    '<',
  );
  // Position flutter strips after unfurl.
  tl.to(
    fluttTop,
    { attr: { x: x - W_FINAL / 2, width: W_FINAL }, duration: 2.4, ease: 'expo.out' },
    '<',
  );
  tl.to(
    fluttBot,
    { attr: { x: x - W_FINAL / 2, width: W_FINAL }, duration: 2.4, ease: 'expo.out' },
    '<',
  );
}

/** 22. Angel descent — soft glowing star descends with vertical light trail. */
function fxAngelDescent(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const [, vy] = getViewBox(svg);
  const startY = Math.max(vy + 2, y - 60);

  // Lazy glow filter for the angel.
  const defs = getDefs(svg);
  if (!svg.querySelector('#narration-fx-angel-glow')) {
    const filter = document.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', 'narration-fx-angel-glow');
    filter.setAttribute('x', '-100%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('height', '300%');
    filter.innerHTML = `
      <feGaussianBlur stdDeviation="1.6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    `;
    defs.appendChild(filter);
  }

  // Vertical light trail (a tall thin gradient rect).
  const trail = document.createElementNS(SVG_NS, 'rect');
  trail.setAttribute('x', String(x - 1));
  trail.setAttribute('y', String(startY));
  trail.setAttribute('width', '2');
  trail.setAttribute('height', '0');
  trail.setAttribute('fill', '#fff6d0');
  trail.setAttribute('opacity', '0.45');
  trail.setAttribute('filter', 'url(#narration-fx-angel-glow)');
  layer.appendChild(trail);

  // Angel — 4-pointed star (path).
  const angel = document.createElementNS(SVG_NS, 'path');
  angel.setAttribute(
    'd',
    'M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z',
  );
  angel.setAttribute('fill', '#fff6d0');
  angel.setAttribute('stroke', '#f0d878');
  angel.setAttribute('stroke-width', '0.3');
  angel.setAttribute('opacity', '0');
  angel.setAttribute('filter', 'url(#narration-fx-angel-glow)');
  angel.setAttribute('transform', `translate(${x}, ${startY})`);
  layer.appendChild(angel);

  // Descend over 3.2s with smooth dramatic ease + soft pulse at landing.
  const DUR = 3.2;
  const obj = { t: 0 };
  gsap.to(angel, { attr: { opacity: 1 }, duration: 0.5, ease: 'sine.out' });
  gsap.to(obj, {
    t: 1,
    duration: DUR,
    ease: 'expo.inOut',
    onUpdate: () => {
      const t = obj.t;
      const cy = startY + (y - startY) * t;
      // Subtle horizontal drift (sine) for ethereal motion.
      const driftX = Math.sin(t * Math.PI * 2) * 0.6;
      angel.setAttribute('transform', `translate(${x + driftX}, ${cy})`);
      // Trail grows behind the angel.
      trail.setAttribute('height', String(Math.max(0, cy - startY)));
    },
    onComplete: () => {
      // Landing pulse: brief scale-up shimmer.
      const pulse = document.createElementNS(SVG_NS, 'circle');
      pulse.setAttribute('cx', String(x));
      pulse.setAttribute('cy', String(y));
      pulse.setAttribute('r', '4');
      pulse.setAttribute('fill', '#fff6d0');
      pulse.setAttribute('opacity', '0');
      pulse.setAttribute('filter', 'url(#narration-fx-angel-glow)');
      layer.appendChild(pulse);
      const pTl = gsap.timeline({ onComplete: () => pulse.remove() });
      pTl.to(pulse, { attr: { opacity: 0.75, r: 12 }, duration: 0.5, ease: 'expo.out' });
      pTl.to(pulse, { attr: { opacity: 0, r: 24 }, duration: 1.6, ease: 'sine.in' });

      // Trail fades first, angel lingers and then fades up slightly.
      gsap.to(trail, {
        attr: { opacity: 0 },
        duration: 1.4,
        ease: 'sine.in',
        onComplete: () => trail.remove(),
      });
      gsap.to(angel, {
        attr: { opacity: 0 },
        duration: 1.8,
        delay: 0.6,
        ease: 'sine.inOut',
        onComplete: () => angel.remove(),
      });
    },
  });
}

// ---------------------------------------------------------------------------
// Figurative helpers — shared by the iconographic primitives below.
// ---------------------------------------------------------------------------

/** Create an SVG element with a flat attribute bag (numbers stringified). */
function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, tag) as SVGElementTagNameMap[K];
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
  return el;
}

/** Looping horizontal shimmer (subtle ±d sway). Returns the timeline. */
function makeShimmer(el: Element, d = 0.5, period = 0.9, repeat = 4) {
  const tl = gsap.timeline({ repeat, yoyo: true });
  tl.to(el, { attr: { transform: `translate(${d},0)` }, duration: period, ease: 'sine.inOut' });
  tl.to(el, { attr: { transform: `translate(${-d},0)` }, duration: period, ease: 'sine.inOut' });
  return tl;
}

/**
 * Build a soft glow filter (single-use ID); idempotent.
 * Returns the filter URL fragment (e.g. `url(#narration-fx-glow-x)`).
 */
function ensureGlowFilter(svg: SVGSVGElement, id: string, stdDev = 1.4): string {
  const fullId = `narration-fx-${id}`;
  if (!svg.querySelector(`#${fullId}`)) {
    const defs = getDefs(svg);
    const f = svgEl('filter', {
      id: fullId,
      x: '-100%',
      y: '-100%',
      width: '300%',
      height: '300%',
    });
    f.innerHTML = `
      <feGaussianBlur stdDeviation="${stdDev}" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    `;
    defs.appendChild(f);
  }
  return `url(#${fullId})`;
}

/** Fade out + remove a list of nodes at the given delay. */
function fadeAndRemove(nodes: Element[], opts: { delay?: number; duration?: number } = {}) {
  const delay = opts.delay ?? 0;
  const duration = opts.duration ?? 1.2;
  gsap.to(nodes, {
    attr: { opacity: 0 },
    duration,
    delay,
    ease: 'sine.in',
    onComplete: () => nodes.forEach((n) => n.remove()),
  });
}

// ---------------------------------------------------------------------------
// Figurative / iconographic primitives (23..40)
// ---------------------------------------------------------------------------

/** 23. Serpent — coiled snake silhouette rising via S-curve, head tilts. */
function fxSerpent(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'serpent-glow', 1.4);

  // Bigger overall scale so the serpent reads as a clear silhouette
  // even at the narrow viewBox crop used for adan/eva, expulsion, etc.
  const g = svgEl('g', { transform: `translate(${x}, ${y}) scale(0)`, opacity: '0' });
  // Body — S-curve via quadratic beziers. Local frame: head ~ (8,-12), tail ~ (-6,8).
  const body = svgEl('path', {
    d: 'M -6 8 Q -8 2 -2 -2 Q 4 -6 0 -10 Q -4 -14 4 -14 Q 10 -14 8 -10',
    fill: 'none',
    stroke: '#3a5a28',
    'stroke-width': '2.4',
    'stroke-linecap': 'round',
    filter: glow,
  });
  // Belly highlight
  const belly = svgEl('path', {
    d: 'M -6 8 Q -8 2 -2 -2 Q 4 -6 0 -10 Q -4 -14 4 -14 Q 10 -14 8 -10',
    fill: 'none',
    stroke: '#7ab050',
    'stroke-width': '0.8',
    'stroke-linecap': 'round',
    opacity: '0.7',
  });
  // Head — small triangle/oval at end of curve
  const head = svgEl('ellipse', {
    cx: '8',
    cy: '-10',
    rx: '2',
    ry: '1.4',
    fill: '#3a5a28',
    filter: glow,
  });
  // Forked tongue
  const tongue = svgEl('path', {
    d: 'M 10 -10 L 13 -10.6 M 10 -10 L 13 -9.4',
    stroke: '#b22030',
    'stroke-width': '0.4',
    'stroke-linecap': 'round',
    opacity: '0',
  });
  // Eye glint
  const eye = svgEl('circle', { cx: '8.6', cy: '-10.4', r: '0.3', fill: '#ffd34f' });
  g.appendChild(body);
  g.appendChild(belly);
  g.appendChild(head);
  g.appendChild(eye);
  g.appendChild(tongue);
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  // Rise from ground with scale-in — scale 1.8x for visibility.
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y}) scale(1.8)`, opacity: 1 },
    duration: 1.0,
    ease: 'expo.out',
  });
  // Head tilt (rotate slightly, tongue flickers)
  tl.to(head, { attr: { cx: 9, cy: -10.6 }, duration: 0.35, ease: 'sine.inOut' });
  tl.to(tongue, { attr: { opacity: 1 }, duration: 0.15 }, '-=0.1');
  tl.to(tongue, { attr: { opacity: 0 }, duration: 0.2 });
  tl.to(tongue, { attr: { opacity: 1 }, duration: 0.15 });
  tl.to(tongue, { attr: { opacity: 0 }, duration: 0.2 });
  // Linger longer so the reader catches it.
  tl.to(g, { attr: { opacity: 0.6 }, duration: 1.6, ease: 'sine.inOut' });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.1, ease: 'sine.in' });
}

/** 24. Golden calf — stylised calf appears with halo + shimmers gently. */
function fxGoldenCalf(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'calf-glow', 1.6);
  const gold = '#d4a040';
  const goldHi = '#f0c870';

  // Halo behind
  const halo = svgEl('circle', { cx: x, cy: y, r: 6, fill: '#f0d878', opacity: '0' });
  layer.appendChild(halo);

  const g = svgEl('g', {
    transform: `translate(${x}, ${y}) scale(0)`,
    style: 'transform-box: fill-box; transform-origin: 50% 50%;',
    filter: glow,
  });
  // Body (rounded rectangle)
  g.appendChild(svgEl('ellipse', { cx: 0, cy: -1, rx: 7, ry: 4, fill: gold, stroke: '#8a5818', 'stroke-width': 0.4 }));
  // Head
  g.appendChild(svgEl('ellipse', { cx: 7, cy: -3, rx: 3, ry: 2.4, fill: gold, stroke: '#8a5818', 'stroke-width': 0.4 }));
  // Snout
  g.appendChild(svgEl('ellipse', { cx: 9.6, cy: -2.4, rx: 1.4, ry: 1, fill: goldHi }));
  // Horns
  g.appendChild(svgEl('path', { d: 'M 6.4 -4.6 Q 5.4 -7 6.8 -7.6', fill: 'none', stroke: '#5a3010', 'stroke-width': 0.7, 'stroke-linecap': 'round' }));
  g.appendChild(svgEl('path', { d: 'M 8.4 -4.6 Q 9.4 -7 8.0 -7.6', fill: 'none', stroke: '#5a3010', 'stroke-width': 0.7, 'stroke-linecap': 'round' }));
  // Eye
  g.appendChild(svgEl('circle', { cx: 7.8, cy: -3.4, r: 0.3, fill: '#3a2008' }));
  // 4 legs
  [-4, -1.5, 2.5, 5].forEach((lx) => {
    g.appendChild(svgEl('rect', { x: lx - 0.6, y: 2.5, width: 1.2, height: 3.5, fill: gold, stroke: '#8a5818', 'stroke-width': 0.3 }));
  });
  // Tail
  g.appendChild(svgEl('path', { d: 'M -6.8 -1 Q -9 -0.5 -8.4 2.5', fill: 'none', stroke: '#8a5818', 'stroke-width': 0.6, 'stroke-linecap': 'round' }));
  layer.appendChild(g);

  const tl = gsap.timeline({
    onComplete: () => {
      g.remove();
      halo.remove();
    },
  });
  tl.to(halo, { attr: { opacity: 0.6, r: 16 }, duration: 0.7, ease: 'expo.out' }, 0);
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y}) scale(1)` },
    duration: 0.9,
    ease: 'back.out(1.6)',
  }, 0.1);
  // Shimmer sway
  tl.add(() => makeShimmer(g, 0.4, 0.7, 3), 1.0);
  // Hold + fade
  tl.to(halo, { attr: { opacity: 0.35, r: 22 }, duration: 1.6, ease: 'sine.inOut' }, 1.0);
  tl.to([g, halo], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=1.3');
}

/** 25. Ark boat — Noah's ark sails in + rocks gently. */
function fxArkBoat(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const wood = '#5a3010';
  const woodHi = '#8a5018';

  const startX = x - 30;
  const g = svgEl('g', { transform: `translate(${startX}, ${y})`, opacity: '0' });
  // Hull (rounded rectangle bottom)
  g.appendChild(svgEl('path', {
    d: 'M -12 -2 Q -14 4 -10 6 L 10 6 Q 14 4 12 -2 Z',
    fill: woodHi,
    stroke: wood,
    'stroke-width': 0.5,
  }));
  // Cabin (rounded top)
  g.appendChild(svgEl('path', {
    d: 'M -8 -2 L -8 -7 Q -8 -10 -4 -10 L 4 -10 Q 8 -10 8 -7 L 8 -2 Z',
    fill: wood,
    stroke: '#3a1e08',
    'stroke-width': 0.4,
  }));
  // Horizontal planks
  for (let i = 0; i < 3; i++) {
    g.appendChild(svgEl('line', {
      x1: -10, x2: 10, y1: -1 + i * 2.2, y2: -1 + i * 2.2,
      stroke: '#3a1e08', 'stroke-width': 0.25, opacity: 0.7,
    }));
  }
  // Tiny window
  g.appendChild(svgEl('rect', { x: -1.2, y: -7, width: 2.4, height: 2, fill: '#f0d878', stroke: '#3a1e08', 'stroke-width': 0.2 }));
  // Tiny dove perch (small triangle on top)
  g.appendChild(svgEl('polygon', { points: '0,-12 -1,-10 1,-10', fill: '#f5e9d0' }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  // Sail in
  tl.to(g, { attr: { opacity: 1 }, duration: 0.6, ease: 'sine.out' }, 0);
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y})` },
    duration: 2.2,
    ease: 'sine.inOut',
  }, 0);
  // Rocking — slight rotation while travelling
  const rock = gsap.timeline({ repeat: 3, yoyo: true });
  rock.to(g, { attr: { transform: () => g.getAttribute('transform')?.replace(/rotate\([^)]*\)/, '') + ' rotate(3)' }, duration: 0.6, ease: 'sine.inOut' } as any);
  // Simpler rocking via separate group? Use direct setter via onUpdate
  let phase = 0;
  const obj = { t: 0 };
  gsap.to(obj, {
    t: 1, duration: 3.5, ease: 'none',
    onUpdate: () => {
      phase = obj.t * Math.PI * 4;
      const ang = Math.sin(phase) * 2.5;
      const cx = startX + (x - startX) * Math.min(1, obj.t * 1.3);
      g.setAttribute('transform', `translate(${cx}, ${y}) rotate(${ang})`);
    },
  });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.0, ease: 'sine.in' }, 3.6);
}

/** 26. Tower of Babel — ziggurat with 5 tiers rising, top wobbles + crack. */
function fxTowerBabel(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const palette = ['#a88858', '#b89c70', '#c8a878', '#b89c70', '#a88858'];

  const tiers: SVGRectElement[] = [];
  const tierH = 3.2;
  const baseW = 18;
  const taper = 2.8;

  for (let i = 0; i < 5; i++) {
    const w = baseW - i * taper;
    const ry = y - 3 - i * tierH;
    const r = svgEl('rect', {
      x: x - w / 2,
      y: ry + 10, // start below
      width: w,
      height: tierH,
      fill: palette[i],
      stroke: '#5a3a18',
      'stroke-width': 0.4,
      opacity: 0,
    });
    layer.appendChild(r);
    tiers.push(r);
    // Tier rises into place
    gsap.to(r, {
      attr: { y: ry, opacity: 1 },
      duration: 0.85,
      delay: i * 0.22,
      ease: 'expo.out',
    });
  }

  // After stack is up, top wobbles + crack appears
  const topR = tiers[4];
  const wobbleDelay = 5 * 0.22 + 0.5;
  gsap.to(topR, {
    attr: { transform: `rotate(2 ${x} ${y - 3 - 4 * tierH + tierH / 2})` },
    duration: 0.25,
    delay: wobbleDelay,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: 3,
  });
  // Crack appears on top tier
  const crackY = y - 3 - 4 * tierH;
  const crack = svgEl('path', {
    d: `M ${x - 0.5} ${crackY + 0.4} L ${x + 0.6} ${crackY + 1.4} L ${x - 0.2} ${crackY + 2.4} L ${x + 0.7} ${crackY + tierH - 0.2}`,
    stroke: '#2a1808',
    'stroke-width': 0.4,
    fill: 'none',
    opacity: 0,
  });
  layer.appendChild(crack);
  gsap.to(crack, { attr: { opacity: 1 }, duration: 0.4, delay: wobbleDelay + 0.6 });

  // Fade all
  fadeAndRemove([...tiers, crack], { delay: wobbleDelay + 1.5, duration: 1.0 });
}

/** 27. Sword strike — sword sweeps from→to with trail + flash. */
function fxSwordStrike(svg: SVGSVGElement, data: { from: [number, number]; to: [number, number] }) {
  if (!data?.from || !data?.to) return;
  const layer = getFxLayer(svg);
  const [fx, fy] = data.from;
  const [tx, ty] = data.to;
  const glow = ensureGlowFilter(svg, 'sword-glow', 1.2);

  const angle = (Math.atan2(ty - fy, tx - fx) * 180) / Math.PI;

  // Build sword group oriented along +X locally
  const g = svgEl('g', {
    transform: `translate(${fx}, ${fy}) rotate(${angle})`,
    opacity: '0',
    filter: glow,
  });
  // Blade
  g.appendChild(svgEl('rect', { x: 0, y: -0.5, width: 10, height: 1, fill: '#e8e8f0', stroke: '#5a5a6a', 'stroke-width': 0.2 }));
  // Tip
  g.appendChild(svgEl('polygon', { points: '10,-0.5 12,0 10,0.5', fill: '#e8e8f0' }));
  // Cross-guard
  g.appendChild(svgEl('rect', { x: -0.6, y: -2.4, width: 1.2, height: 4.8, fill: '#d4a040', stroke: '#8a5818', 'stroke-width': 0.2 }));
  // Handle
  g.appendChild(svgEl('rect', { x: -3, y: -0.5, width: 2.5, height: 1, fill: '#5a3010' }));
  // Pommel
  g.appendChild(svgEl('circle', { cx: -3.4, cy: 0, r: 0.7, fill: '#d4a040' }));
  layer.appendChild(g);

  // Trail line
  const trail = svgEl('line', {
    x1: fx, y1: fy, x2: fx, y2: fy,
    stroke: '#ffffff',
    'stroke-width': 1.4,
    opacity: 0.7,
    filter: glow,
  });
  layer.appendChild(trail);

  const tl = gsap.timeline({ onComplete: () => { g.remove(); trail.remove(); } });
  tl.to(g, { attr: { opacity: 1 }, duration: 0.1 }, 0);
  // Sweep
  tl.to(g, {
    attr: { transform: `translate(${tx}, ${ty}) rotate(${angle})` },
    duration: 0.4,
    ease: 'power3.in',
  }, 0);
  tl.to(trail, {
    attr: { x2: tx, y2: ty },
    duration: 0.4,
    ease: 'power3.in',
  }, 0);
  // Flash at impact
  const flash = svgEl('circle', { cx: tx, cy: ty, r: 0.5, fill: '#fff6d0', opacity: 0, filter: glow });
  layer.appendChild(flash);
  tl.to(flash, { attr: { opacity: 1, r: 6 }, duration: 0.18, ease: 'expo.out' });
  tl.to(flash, { attr: { opacity: 0, r: 14 }, duration: 0.9, ease: 'sine.in', onComplete: () => flash.remove() });
  // Sword fades
  tl.to([g, trail], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '-=0.6');
}

/** 28. Fish multiply — 5-7 small fish appear with stagger, drift, glow. */
function fxFishMultiply(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'fish-glow', 1.0);
  const n = 6;
  const fish: SVGGElement[] = [];

  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + Math.random() * 0.4;
    const r = 5 + Math.random() * 4;
    const fx2 = x + Math.cos(ang) * r;
    const fy2 = y + Math.sin(ang) * r * 0.6;
    const flip = Math.cos(ang) < 0 ? -1 : 1;
    const g = svgEl('g', {
      transform: `translate(${fx2}, ${fy2}) scale(0)`,
      opacity: 0,
      filter: glow,
    });
    // Body
    g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 2 * flip, ry: 1, fill: '#5a8aa0', stroke: '#2a4a60', 'stroke-width': 0.2 }));
    // Tail (triangle)
    g.appendChild(svgEl('polygon', { points: `${-2.4 * flip},0 ${-3.6 * flip},-1 ${-3.6 * flip},1`, fill: '#3a6a80' }));
    // Eye
    g.appendChild(svgEl('circle', { cx: 1.2 * flip, cy: -0.2, r: 0.2, fill: '#fff' }));
    layer.appendChild(g);
    fish.push(g);

    const delay = i * 0.25;
    gsap.to(g, {
      attr: { transform: `translate(${fx2}, ${fy2}) scale(1)`, opacity: 1 },
      duration: 0.6,
      delay,
      ease: 'back.out(2)',
    });
    // Drift
    gsap.to(g, {
      attr: { transform: `translate(${fx2 + (Math.random() - 0.5) * 4}, ${fy2 + (Math.random() - 0.5) * 2}) scale(1)` },
      duration: 1.6,
      delay: delay + 0.6,
      ease: 'sine.inOut',
    });
  }
  fadeAndRemove(fish, { delay: 3.2, duration: 1.2 });
}

/** 29. Bread multiply — loaves accumulate with stagger + warm glow. */
function fxBreadMultiply(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'bread-glow', 1.4);
  const n = 5;
  const loaves: SVGGElement[] = [];

  // Warm radial glow
  const warm = svgEl('circle', { cx: x, cy: y, r: 8, fill: '#f0c060', opacity: 0, filter: 'blur(2px)' });
  layer.appendChild(warm);
  gsap.to(warm, { attr: { opacity: 0.3, r: 14 }, duration: 0.7, ease: 'expo.out' });

  for (let i = 0; i < n; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const lx = x + (col - 1) * 4 + (Math.random() - 0.5) * 0.8;
    const ly = y + 2 - row * 2.5;
    const rot = (Math.random() - 0.5) * 14;
    const g = svgEl('g', {
      transform: `translate(${lx}, ${ly + 8}) rotate(${rot}) scale(0)`,
      opacity: 0,
    });
    // Loaf (rounded rectangle path)
    g.appendChild(svgEl('path', {
      d: 'M -2.4 0 Q -3 -1.6 -1.6 -1.8 L 1.6 -1.8 Q 3 -1.6 2.4 0 Q 2 1.4 0 1.4 Q -2 1.4 -2.4 0 Z',
      fill: '#c08848',
      stroke: '#6a3a10',
      'stroke-width': 0.3,
      filter: glow,
    }));
    // Score marks
    g.appendChild(svgEl('path', {
      d: 'M -1.4 -1 L 1.4 -1 M -1.4 0 L 1.4 0',
      stroke: '#8a5018',
      'stroke-width': 0.2,
      fill: 'none',
      opacity: 0.7,
    }));
    layer.appendChild(g);
    loaves.push(g);

    gsap.to(g, {
      attr: { transform: `translate(${lx}, ${ly}) rotate(${rot}) scale(1)`, opacity: 1 },
      duration: 0.5,
      delay: i * 0.28,
      ease: 'back.out(1.8)',
    });
  }
  fadeAndRemove([warm, ...loaves], { delay: 3.0, duration: 1.2 });
}

/** 30. Cross rise — cross rises from ground, golden glow settles. */
function fxCrossRise(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'cross-glow', 1.6);

  // Halo behind
  const halo = svgEl('circle', { cx: x, cy: y - 4, r: 4, fill: '#f0d878', opacity: 0, filter: glow });
  layer.appendChild(halo);

  // Cross group, starts below ground
  const g = svgEl('g', {
    transform: `translate(${x}, ${y + 12}) scale(1)`,
    opacity: 0,
  });
  // Vertical beam
  g.appendChild(svgEl('rect', { x: -0.8, y: -10, width: 1.6, height: 14, fill: '#5a3010', stroke: '#2a1808', 'stroke-width': 0.2 }));
  // Horizontal beam
  g.appendChild(svgEl('rect', { x: -4, y: -6, width: 8, height: 1.6, fill: '#5a3010', stroke: '#2a1808', 'stroke-width': 0.2 }));
  // Wood grain
  g.appendChild(svgEl('line', { x1: 0, y1: -9, x2: 0, y2: 3, stroke: '#3a2008', 'stroke-width': 0.2 }));
  layer.appendChild(g);

  const tl = gsap.timeline({
    onComplete: () => { g.remove(); halo.remove(); },
  });
  tl.to(g, { attr: { opacity: 1 }, duration: 0.3 }, 0);
  // Rise from ground
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y}) scale(1)` },
    duration: 1.4,
    ease: 'expo.out',
  }, 0);
  // Halo grows & golden tint applies
  tl.to(halo, { attr: { opacity: 0.7, r: 12 }, duration: 0.9, ease: 'expo.out' }, 0.6);
  // Golden glow on cross — overlay rect that turns gold
  tl.to(halo, { attr: { opacity: 0.5, r: 16 }, duration: 1.6, ease: 'sine.inOut' });
  tl.to([g, halo], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' });
}

/** 31. Lamp glow — oil lamp with flickering flame + pulsing warm rings. */
function fxLampGlow(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'lamp-glow', 1.4);

  const g = svgEl('g', { transform: `translate(${x}, ${y})`, opacity: 0 });
  // Bowl (rounded)
  g.appendChild(svgEl('path', {
    d: 'M -4 0 Q -5 2 -2 2.6 L 2 2.6 Q 5 2 4 0 Z',
    fill: '#a08458',
    stroke: '#5a3010',
    'stroke-width': 0.3,
  }));
  // Spout (small triangle on left)
  g.appendChild(svgEl('polygon', { points: '-4,0 -6,-0.4 -4,-1', fill: '#a08458', stroke: '#5a3010', 'stroke-width': 0.2 }));
  // Wick base
  g.appendChild(svgEl('rect', { x: -0.3, y: -1, width: 0.6, height: 1, fill: '#3a2008' }));
  // Flame
  const flame = svgEl('ellipse', { cx: 0, cy: -2.5, rx: 0.8, ry: 1.8, fill: '#ffd34f', filter: glow });
  g.appendChild(flame);
  const flameCore = svgEl('ellipse', { cx: 0, cy: -2.5, rx: 0.4, ry: 1.0, fill: '#fff6d0' });
  g.appendChild(flameCore);
  layer.appendChild(g);

  gsap.to(g, { attr: { opacity: 1 }, duration: 0.5, ease: 'sine.out' });

  // Flame flicker (loop)
  const flick = gsap.timeline({ repeat: 4, yoyo: true });
  flick.to([flame, flameCore], { attr: { cy: -2.8, ry: 2.1 }, duration: 0.3, ease: 'sine.inOut' });
  flick.to([flame, flameCore], { attr: { cy: -2.3, ry: 1.6 }, duration: 0.3, ease: 'sine.inOut' });

  // Pulsing warm rings outward
  const makeRing = (delay: number) => {
    const r = svgEl('circle', { cx: x, cy: y - 1, r: 3, fill: 'none', stroke: '#ffb050', 'stroke-width': 0.8, opacity: 0 });
    layer.appendChild(r);
    const tl = gsap.timeline({ delay, onComplete: () => r.remove() });
    tl.to(r, { attr: { opacity: 0.6, r: 8 }, duration: 0.8, ease: 'sine.out' });
    tl.to(r, { attr: { opacity: 0, r: 16 }, duration: 1.4, ease: 'sine.in' });
  };
  makeRing(0.2);
  makeRing(1.1);
  makeRing(2.0);

  fadeAndRemove([g], { delay: 3.6, duration: 1.0 });
}

/** 32. Well — circular stone well, arch, bucket, water shimmer. */
function fxWell(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);

  const g = svgEl('g', {
    transform: `translate(${x}, ${y}) scale(0)`,
    style: 'transform-box: fill-box; transform-origin: 50% 50%;',
    opacity: 0,
  });
  // Well body — top ellipse (rim)
  g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 6, ry: 2, fill: '#3a5a78', stroke: '#1a2a3a', 'stroke-width': 0.4 }));
  // Inner water
  const water = svgEl('ellipse', { cx: 0, cy: 0, rx: 5, ry: 1.5, fill: '#3a6fa0' });
  g.appendChild(water);
  // Stone wall (front arc)
  g.appendChild(svgEl('path', {
    d: 'M -6 0 Q -6 4 -3 4 L 3 4 Q 6 4 6 0',
    fill: 'none',
    stroke: '#6a5840',
    'stroke-width': 1.2,
  }));
  // Stones on rim (pattern)
  for (let i = 0; i < 4; i++) {
    const sx = -4 + i * 2.6;
    g.appendChild(svgEl('line', { x1: sx, y1: 0, x2: sx + 1, y2: 2.5, stroke: '#3a2a18', 'stroke-width': 0.2 }));
  }
  // Arch posts
  g.appendChild(svgEl('line', { x1: -5, y1: 0, x2: -5, y2: -8, stroke: '#5a3010', 'stroke-width': 0.6 }));
  g.appendChild(svgEl('line', { x1: 5, y1: 0, x2: 5, y2: -8, stroke: '#5a3010', 'stroke-width': 0.6 }));
  // Arch top
  g.appendChild(svgEl('path', { d: 'M -5 -8 Q 0 -10 5 -8', fill: 'none', stroke: '#5a3010', 'stroke-width': 0.6 }));
  // Bucket rope
  g.appendChild(svgEl('line', { x1: 0, y1: -8.5, x2: 0, y2: -3, stroke: '#3a2008', 'stroke-width': 0.3 }));
  // Bucket
  g.appendChild(svgEl('rect', { x: -1, y: -3, width: 2, height: 2, fill: '#8a5018', stroke: '#3a2008', 'stroke-width': 0.3 }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y}) scale(1)`, opacity: 1 },
    duration: 0.8,
    ease: 'back.out(1.4)',
  });
  // Water shimmer ripple
  const ripple = svgEl('ellipse', { cx: x, cy: y, rx: 1, ry: 0.3, fill: 'none', stroke: '#7ad0e0', 'stroke-width': 0.4, opacity: 0 });
  layer.appendChild(ripple);
  tl.to(ripple, { attr: { opacity: 0.8, rx: 4, ry: 1.2 }, duration: 0.6, ease: 'sine.out' });
  tl.to(ripple, { attr: { opacity: 0, rx: 5.5, ry: 1.6 }, duration: 1.0, ease: 'sine.in', onComplete: () => ripple.remove() });
  // Water tint pulse
  tl.to(water, { attr: { fill: '#7ad0e0' }, duration: 0.4 }, '-=0.8');
  tl.to(water, { attr: { fill: '#3a6fa0' }, duration: 0.8 });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.1, ease: 'sine.in' });
}

/** 33. Mountain glow — triangular silhouette with summit glowing golden. */
function fxMountainGlow(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'mtn-glow', 1.8);

  // Mountain triangle (apex at (x, y-12), base around y)
  const mtn = svgEl('polygon', {
    points: `${x - 12},${y + 2} ${x},${y - 12} ${x + 12},${y + 2}`,
    fill: '#6a5840',
    stroke: '#3a2a18',
    'stroke-width': 0.5,
    opacity: 0,
  });
  layer.appendChild(mtn);
  // Snow cap (small lighter triangle on top)
  const cap = svgEl('polygon', {
    points: `${x - 3},${y - 8} ${x},${y - 12} ${x + 3},${y - 8}`,
    fill: '#e8d8a0',
    opacity: 0,
  });
  layer.appendChild(cap);
  // Summit glow halo
  const halo = svgEl('circle', {
    cx: x, cy: y - 12, r: 2, fill: '#ffd34f', opacity: 0, filter: glow,
  });
  layer.appendChild(halo);

  const tl = gsap.timeline({ onComplete: () => { mtn.remove(); cap.remove(); halo.remove(); } });
  tl.to(mtn, { attr: { opacity: 1 }, duration: 0.7, ease: 'expo.out' }, 0);
  tl.to(cap, { attr: { opacity: 1 }, duration: 0.7, ease: 'expo.out' }, 0.2);
  tl.to(halo, { attr: { opacity: 0.7, r: 6 }, duration: 0.9, ease: 'expo.out' }, 0.4);
  // Slow pulse (3s)
  tl.to(halo, { attr: { opacity: 0.95, r: 9 }, duration: 1.5, ease: 'sine.inOut' });
  tl.to(halo, { attr: { opacity: 0.6, r: 6 }, duration: 1.5, ease: 'sine.inOut' });
  // Fade
  tl.to([mtn, cap, halo], { attr: { opacity: 0 }, duration: 1.0, ease: 'sine.in' });
}

/** 34. Ladder — Jacob's ladder, two rails + 6 rungs, drawn from→to. */
function fxLadder(svg: SVGSVGElement, data: { from: [number, number]; to: [number, number] }) {
  if (!data?.from || !data?.to) return;
  const layer = getFxLayer(svg);
  const [fx, fy] = data.from;
  const [tx, ty] = data.to;
  const dx = tx - fx;
  const dy = ty - fy;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular for ladder width
  const px = (-dy / len) * 1.6;
  const py = (dx / len) * 1.6;

  const glow = ensureGlowFilter(svg, 'ladder-glow', 1.4);

  // Two rails
  const railA = svgEl('line', {
    x1: fx + px, y1: fy + py, x2: tx + px, y2: ty + py,
    stroke: '#d4a040', 'stroke-width': 0.8,
    'stroke-dasharray': len, 'stroke-dashoffset': len, opacity: 0.9,
    filter: glow,
  });
  const railB = svgEl('line', {
    x1: fx - px, y1: fy - py, x2: tx - px, y2: ty - py,
    stroke: '#d4a040', 'stroke-width': 0.8,
    'stroke-dasharray': len, 'stroke-dashoffset': len, opacity: 0.9,
    filter: glow,
  });
  layer.appendChild(railA);
  layer.appendChild(railB);

  // Rungs
  const rungs: SVGLineElement[] = [];
  const N_RUNGS = 6;
  for (let i = 1; i <= N_RUNGS; i++) {
    const t = i / (N_RUNGS + 1);
    const cx = fx + dx * t;
    const cy = fy + dy * t;
    const rung = svgEl('line', {
      x1: cx + px, y1: cy + py, x2: cx - px, y2: cy - py,
      stroke: '#d4a040', 'stroke-width': 0.7, opacity: 0,
      filter: glow,
    });
    layer.appendChild(rung);
    rungs.push(rung);
  }

  const tl = gsap.timeline({ onComplete: () => { railA.remove(); railB.remove(); rungs.forEach((r) => r.remove()); } });
  tl.to([railA, railB], { attr: { 'stroke-dashoffset': 0 }, duration: 2.0, ease: 'sine.inOut' }, 0);
  // Rungs appear staggered
  rungs.forEach((r, i) => {
    tl.to(r, { attr: { opacity: 1 }, duration: 0.2, ease: 'sine.out' }, 0.3 + i * 0.2);
  });
  // Golden pulse
  tl.to(rungs, { attr: { opacity: 0.6 }, duration: 0.6, ease: 'sine.inOut' }, '+=0.2');
  tl.to(rungs, { attr: { opacity: 1 }, duration: 0.6, ease: 'sine.inOut' });
  // Fade
  tl.to([railA, railB, ...rungs], { attr: { opacity: 0 }, duration: 1.0, ease: 'sine.in' });
}

/** 35. Ram — ram silhouette with curled horns, scale-in + head bob. */
function fxRam(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const wool = '#c8b89a';
  const dark = '#5a4830';

  const g = svgEl('g', {
    transform: `translate(${x}, ${y}) scale(0)`,
    style: 'transform-box: fill-box; transform-origin: 50% 50%;',
    opacity: 0,
  });
  // Body
  g.appendChild(svgEl('ellipse', { cx: 0, cy: -1, rx: 7, ry: 4, fill: wool, stroke: dark, 'stroke-width': 0.4 }));
  // Wool texture (small bumps)
  for (let i = 0; i < 4; i++) {
    g.appendChild(svgEl('circle', { cx: -4 + i * 2.6, cy: -3.5, r: 1.2, fill: wool, stroke: dark, 'stroke-width': 0.2 }));
  }
  // Head group (separate for bob)
  const head = svgEl('g', { transform: 'translate(0,0)' });
  head.appendChild(svgEl('ellipse', { cx: 7, cy: -2.4, rx: 2.6, ry: 2, fill: wool, stroke: dark, 'stroke-width': 0.3 }));
  // Snout
  head.appendChild(svgEl('ellipse', { cx: 9.2, cy: -2, rx: 1, ry: 0.8, fill: '#a08858' }));
  // Curled horns (spiral path)
  head.appendChild(svgEl('path', {
    d: 'M 6 -3.4 Q 3 -5 5 -7 Q 8 -8 7 -4',
    fill: 'none', stroke: dark, 'stroke-width': 0.8, 'stroke-linecap': 'round',
  }));
  head.appendChild(svgEl('path', {
    d: 'M 8 -3.4 Q 11 -5 9 -7 Q 6 -8 7 -4',
    fill: 'none', stroke: dark, 'stroke-width': 0.8, 'stroke-linecap': 'round',
  }));
  // Eye
  head.appendChild(svgEl('circle', { cx: 7.6, cy: -2.6, r: 0.25, fill: '#1a0808' }));
  g.appendChild(head);
  // 4 legs
  [-4, -1.5, 2.5, 5].forEach((lx) => {
    g.appendChild(svgEl('rect', { x: lx - 0.5, y: 2.5, width: 1, height: 3.5, fill: dark }));
  });
  // Tail
  g.appendChild(svgEl('circle', { cx: -6.5, cy: -2, r: 1, fill: wool, stroke: dark, 'stroke-width': 0.2 }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  // Scale 1.6x for visibility — ram silhouette was getting lost at unit scale.
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y}) scale(1.6)`, opacity: 1 },
    duration: 0.7,
    ease: 'back.out(1.6)',
  });
  // Head bob loop
  const bob = gsap.timeline({ repeat: 3, yoyo: true });
  bob.to(head, { attr: { transform: 'translate(0, -0.4)' }, duration: 0.5, ease: 'sine.inOut' });
  bob.to(head, { attr: { transform: 'translate(0, 0.2)' }, duration: 0.5, ease: 'sine.inOut' });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=2.0');
}

/** 36. Star of Bethlehem — 5-point star with 4 long rays, rotating, downward beam. */
function fxStarBethlehem(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'star-glow', 1.8);

  // Star is positioned above the target with a beam pointing down
  const sx = x;
  const sy = y - 24;

  // Downward light beam (tapered rectangle/polygon)
  const beam = svgEl('polygon', {
    points: `${sx - 1},${sy} ${sx + 1},${sy} ${sx + 4},${y} ${sx - 4},${y}`,
    fill: '#fff6d0',
    opacity: 0,
    filter: glow,
  });
  layer.appendChild(beam);

  // Rays group (4 long rays from center)
  const rays = svgEl('g', { transform: `translate(${sx}, ${sy}) rotate(0)`, opacity: 0, filter: glow });
  [0, 45, 90, 135].forEach((a) => {
    rays.appendChild(svgEl('line', {
      x1: 0, y1: 0,
      x2: Math.cos((a * Math.PI) / 180) * 10,
      y2: Math.sin((a * Math.PI) / 180) * 10,
      stroke: '#fff6d0', 'stroke-width': 0.8,
    }));
    rays.appendChild(svgEl('line', {
      x1: 0, y1: 0,
      x2: -Math.cos((a * Math.PI) / 180) * 10,
      y2: -Math.sin((a * Math.PI) / 180) * 10,
      stroke: '#fff6d0', 'stroke-width': 0.8,
    }));
  });
  layer.appendChild(rays);

  // 5-pointed star polygon
  const r1 = 4;
  const r2 = 1.6;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${sx + Math.cos(a) * r},${sy + Math.sin(a) * r}`);
  }
  const star = svgEl('polygon', {
    points: pts.join(' '),
    fill: '#fff6d0',
    stroke: '#f0d878',
    'stroke-width': 0.3,
    opacity: 0,
    filter: glow,
  });
  layer.appendChild(star);

  const tl = gsap.timeline({
    onComplete: () => { beam.remove(); rays.remove(); star.remove(); },
  });
  tl.to(star, { attr: { opacity: 1 }, duration: 0.7, ease: 'expo.out' }, 0);
  tl.to(rays, { attr: { opacity: 0.85 }, duration: 0.8, ease: 'expo.out' }, 0.1);
  tl.to(beam, { attr: { opacity: 0.55 }, duration: 0.9, ease: 'sine.out' }, 0.3);
  // Pulse + rotate rays
  const rotate = gsap.timeline({ repeat: 1 });
  rotate.to(rays, { attr: { transform: `translate(${sx}, ${sy}) rotate(30)` }, duration: 1.6, ease: 'sine.inOut' });
  rotate.to(rays, { attr: { transform: `translate(${sx}, ${sy}) rotate(-15)` }, duration: 1.6, ease: 'sine.inOut' });
  // Star pulse
  tl.to(star, { attr: { opacity: 0.7 }, duration: 0.6, ease: 'sine.inOut' }, '+=0.2');
  tl.to(star, { attr: { opacity: 1 }, duration: 0.6, ease: 'sine.inOut' });
  tl.to([star, rays, beam], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' });
}

/** 37. Chalice — cup with shimmering wine surface and golden glow. */
function fxChalice(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'chalice-glow', 1.4);
  const gold = '#d4a040';
  const wine = '#7a1a14';

  const g = svgEl('g', {
    transform: `translate(${x}, ${y}) scale(0)`,
    style: 'transform-box: fill-box; transform-origin: 50% 50%;',
    opacity: 0,
    filter: glow,
  });
  // Bowl (cup)
  g.appendChild(svgEl('path', {
    d: 'M -4 -6 Q -4.5 -2 -3 0 L 3 0 Q 4.5 -2 4 -6 Z',
    fill: gold,
    stroke: '#8a5018',
    'stroke-width': 0.4,
  }));
  // Wine surface (ellipse at top of bowl)
  const wineSurface = svgEl('ellipse', { cx: 0, cy: -6, rx: 4, ry: 0.8, fill: wine });
  g.appendChild(wineSurface);
  // Stem
  g.appendChild(svgEl('rect', { x: -0.6, y: 0, width: 1.2, height: 4, fill: gold, stroke: '#8a5018', 'stroke-width': 0.3 }));
  // Foot
  g.appendChild(svgEl('ellipse', { cx: 0, cy: 4.5, rx: 3, ry: 0.8, fill: gold, stroke: '#8a5018', 'stroke-width': 0.4 }));
  // Highlight on bowl
  g.appendChild(svgEl('path', { d: 'M -3 -5 Q -3.4 -3 -2.8 -1', fill: 'none', stroke: '#f0c870', 'stroke-width': 0.4, opacity: 0.8 }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, {
    attr: { transform: `translate(${x}, ${y}) scale(1)`, opacity: 1 },
    duration: 0.8,
    ease: 'back.out(1.5)',
  });
  // Wine level rises slightly + shimmer
  tl.to(wineSurface, { attr: { ry: 1.1, cy: -6.4 }, duration: 0.6, ease: 'sine.out' });
  // Shimmer: surface oscillates ry
  const shimmer = gsap.timeline({ repeat: 3, yoyo: true });
  shimmer.to(wineSurface, { attr: { ry: 1.3 }, duration: 0.4, ease: 'sine.inOut' });
  shimmer.to(wineSurface, { attr: { ry: 0.9 }, duration: 0.4, ease: 'sine.inOut' });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=1.6');
}

/** 38. Manna fall — many small white-gold circles fall like slow warm snow. */
function fxMannaFall(svg: SVGSVGElement, _data: Record<string, never> = {} as any) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const N = 40;
  const flakes: SVGCircleElement[] = [];
  const glow = ensureGlowFilter(svg, 'manna-glow', 1.0);

  for (let i = 0; i < N; i++) {
    const sx = vx + Math.random() * vw;
    const sy = vy - 2 - Math.random() * 8;
    const radius = 0.5 + Math.random() * 0.7;
    const c = svgEl('circle', {
      cx: sx, cy: sy, r: radius,
      fill: '#fff6d0',
      stroke: '#f0d878', 'stroke-width': 0.15,
      opacity: 0.85,
      filter: glow,
    });
    layer.appendChild(c);
    flakes.push(c);

    const dur = 3.0 + Math.random() * 1.5;
    const drift = (Math.random() - 0.5) * 30;
    gsap.to(c, {
      attr: { cy: sy + vh + 6, cx: sx + drift },
      duration: dur,
      delay: i * 0.04,
      ease: 'sine.in',
    });
    gsap.to(c, {
      attr: { opacity: 0 },
      duration: 0.7,
      delay: i * 0.04 + dur - 0.7,
      ease: 'sine.in',
      onComplete: () => c.remove(),
    });
  }
}

/** 39. Pillar of fire — vertical column gradient (orange→yellow), pulses + flickers. */
function fxPillarOfFire(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'pillar-glow', 2.0);

  // Lazy gradient
  const defs = getDefs(svg);
  const gradId = 'narration-fx-pillar-grad';
  if (!svg.querySelector(`#${gradId}`)) {
    const grad = svgEl('linearGradient', { id: gradId, x1: '0', y1: '1', x2: '0', y2: '0' });
    grad.innerHTML = `
      <stop offset="0" stop-color="#ff6a20" stop-opacity="0.95"/>
      <stop offset="0.4" stop-color="#ff8b3a" stop-opacity="0.9"/>
      <stop offset="0.8" stop-color="#ffd34f" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.2"/>
    `;
    defs.appendChild(grad);
  }

  // Pillar — tapered polygon
  const pillar = svgEl('polygon', {
    points: `${x - 4},${y} ${x + 4},${y} ${x + 2},${y - 20} ${x - 2},${y - 20}`,
    fill: `url(#${gradId})`,
    opacity: 0,
    filter: glow,
  });
  layer.appendChild(pillar);
  // Inner core (brighter, narrower)
  const core = svgEl('polygon', {
    points: `${x - 1.6},${y} ${x + 1.6},${y} ${x + 0.6},${y - 18} ${x - 0.6},${y - 18}`,
    fill: '#ffd34f',
    opacity: 0,
    filter: glow,
  });
  layer.appendChild(core);
  // Base glow
  const base = svgEl('ellipse', { cx: x, cy: y, rx: 6, ry: 2, fill: '#ff8b3a', opacity: 0, filter: glow });
  layer.appendChild(base);

  const tl = gsap.timeline({ onComplete: () => { pillar.remove(); core.remove(); base.remove(); } });
  tl.to(pillar, { attr: { opacity: 0.95 }, duration: 0.8, ease: 'expo.out' }, 0);
  tl.to(core, { attr: { opacity: 0.95 }, duration: 0.8, ease: 'expo.out' }, 0.15);
  tl.to(base, { attr: { opacity: 0.85, rx: 8 }, duration: 0.7, ease: 'sine.out' }, 0);
  // Flicker (loop) — core opacity oscillates
  const flick = gsap.timeline({ repeat: 4, yoyo: true });
  flick.to(core, { attr: { opacity: 0.65 }, duration: 0.25, ease: 'sine.inOut' });
  flick.to(core, { attr: { opacity: 1.0 }, duration: 0.25, ease: 'sine.inOut' });
  // Pulse pillar width
  const pulse = gsap.timeline({ repeat: 3, yoyo: true });
  pulse.to(pillar, {
    attr: { points: `${x - 4.6},${y} ${x + 4.6},${y} ${x + 2.4},${y - 20} ${x - 2.4},${y - 20}` },
    duration: 0.6, ease: 'sine.inOut',
  });
  pulse.to(pillar, {
    attr: { points: `${x - 3.4},${y} ${x + 3.4},${y} ${x + 1.6},${y - 20} ${x - 1.6},${y - 20}` },
    duration: 0.6, ease: 'sine.inOut',
  });
  tl.to([pillar, core, base], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=2.4');
}

/** 40. Parted waters — two water walls slide outward, leaving a path. */
function fxPartedWaters(svg: SVGSVGElement, data: { position: [number, number] }) {
  if (!data?.position) return;
  const [x, y] = data.position;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'water-glow', 1.2);

  // Lazy gradient
  const defs = getDefs(svg);
  const gradId = 'narration-fx-water-grad';
  if (!svg.querySelector(`#${gradId}`)) {
    const grad = svgEl('linearGradient', { id: gradId, x1: '0', y1: '0', x2: '0', y2: '1' });
    grad.innerHTML = `
      <stop offset="0" stop-color="#7ad0e0" stop-opacity="0.9"/>
      <stop offset="0.6" stop-color="#3a6fa0" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#1a3a60" stop-opacity="0.95"/>
    `;
    defs.appendChild(grad);
  }

  const WALL_W = 8;
  const WALL_H = 18;
  // Left wall — starts at center, slides left
  const left = svgEl('rect', {
    x: x - WALL_W / 2,
    y: y - WALL_H / 2,
    width: WALL_W,
    height: WALL_H,
    fill: `url(#${gradId})`,
    stroke: '#1a3a60',
    'stroke-width': 0.4,
    opacity: 0,
    filter: glow,
  });
  layer.appendChild(left);
  // Right wall
  const right = svgEl('rect', {
    x: x - WALL_W / 2,
    y: y - WALL_H / 2,
    width: WALL_W,
    height: WALL_H,
    fill: `url(#${gradId})`,
    stroke: '#1a3a60',
    'stroke-width': 0.4,
    opacity: 0,
    filter: glow,
  });
  layer.appendChild(right);

  // Ripple decorations on the inner faces
  const rippleL = svgEl('path', {
    d: `M ${x - 1} ${y - WALL_H / 2 + 2} Q ${x - 3} ${y - 4} ${x - 1} ${y - 2} Q ${x - 3} ${y + 2} ${x - 1} ${y + 6}`,
    fill: 'none', stroke: '#bfe6ec', 'stroke-width': 0.4, opacity: 0,
  });
  const rippleR = svgEl('path', {
    d: `M ${x + 1} ${y - WALL_H / 2 + 2} Q ${x + 3} ${y - 4} ${x + 1} ${y - 2} Q ${x + 3} ${y + 2} ${x + 1} ${y + 6}`,
    fill: 'none', stroke: '#bfe6ec', 'stroke-width': 0.4, opacity: 0,
  });
  layer.appendChild(rippleL);
  layer.appendChild(rippleR);

  const tl = gsap.timeline({
    onComplete: () => { left.remove(); right.remove(); rippleL.remove(); rippleR.remove(); },
  });
  tl.to([left, right], { attr: { opacity: 0.9 }, duration: 0.5, ease: 'sine.out' }, 0);
  // Parted: slide outward
  tl.to(left, { attr: { x: x - WALL_W / 2 - 10 }, duration: 1.4, ease: 'expo.out' }, 0.2);
  tl.to(right, { attr: { x: x - WALL_W / 2 + 10 }, duration: 1.4, ease: 'expo.out' }, 0.2);
  tl.to([rippleL, rippleR], { attr: { opacity: 0.7 }, duration: 0.6, ease: 'sine.out' }, 0.6);
  // Wave shimmer on walls (subtle width pulse)
  const wave = gsap.timeline({ repeat: 2, yoyo: true });
  wave.to([rippleL, rippleR], { attr: { opacity: 0.95 }, duration: 0.5, ease: 'sine.inOut' });
  wave.to([rippleL, rippleR], { attr: { opacity: 0.55 }, duration: 0.5, ease: 'sine.inOut' });
  // Fade
  tl.to([left, right, rippleL, rippleR], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=1.4');
}

// ===========================================================================
// EXTENDED PRIMITIVES — see docs/superpowers/STYLE_GUIDE_ANIMACIONES.md
// Categories: C.1 figurative, C.2 atmospheric one-shot, C.4 cinematic.
// All primitives below follow the existing pattern: lazy-mount into the FX
// layer, animate with GSAP, remove on completion. Color uses only era CSS
// vars (--era-*) or the universal palette (fire #ff8844, blood #a01010,
// divine gold #ffd866, dark ink #1a0f08 / #3a261a).
// ===========================================================================

// Resolve a target [x, y] more tolerantly: accepts {position} or {pinIdx}
// or {from}/{to}. Falls back to active marker center.
function targetOrMarker(
  svg: SVGSVGElement,
  data: { position?: [number, number]; pinIdx?: number } = {},
): [number, number] | null {
  const t = resolveTarget(svg, data);
  if (t) return t;
  if (!currentEventId) return null;
  const m = svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`);
  if (!m) return null;
  return parseTranslate(m.getAttribute('transform'));
}

// ─── C.1 FIGURATIVE ────────────────────────────────────────────────────────

/** fx:animate-scene-object — animate a scene-object that's already rendered
 *  in the [data-layer="scene-objects"] layer. Delegates to the sceneObjects
 *  animator so the figurative SVG that's already on stage (arca, becerro,
 *  zarza…) actually moves instead of being duplicated by a parallel FX.
 *  This is the keystone primitive of REGLA #1 (one concept, one render). */
async function fxAnimateSceneObject(
  svg: SVGSVGElement,
  data: { id?: string; kind?: string; duration?: number } = {},
) {
  if (!data?.id || !data?.kind) return;
  try {
    const mod = await import('./sceneObjects/animator');
    mod.animateSceneObject(svg, data.id, data.kind as any, data.duration);
  } catch {
    /* animator not yet available — silent no-op */
  }
}

/** fx:caravan — string of camels marching across the marker area. */
function fxCaravan(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const target = targetOrMarker(svg, data);
  if (!target) return;
  const [x, y] = target;
  const layer = getFxLayer(svg);
  const sec = eraVar('--era-secondary', '#7a5a3a');
  const acc = eraVar('--era-accent', '#d9b35a');

  const buildCamel = (cx: number, cy: number, scale = 1): SVGGElement => {
    const g = svgEl('g', { transform: `translate(${cx}, ${cy}) scale(${scale})`, opacity: 0 });
    g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 4, ry: 1.6, fill: sec }));
    g.appendChild(svgEl('path', { d: 'M -1.5 -0.5 Q -1 -3 0 -2 Q 1 -3 1.5 -0.5 Z', fill: sec })); // 2 humps
    g.appendChild(svgEl('rect', { x: 3, y: -2, width: 0.8, height: 3.5, fill: sec })); // neck
    g.appendChild(svgEl('ellipse', { cx: 3.6, cy: -2.5, rx: 0.9, ry: 0.7, fill: sec })); // head
    g.appendChild(svgEl('rect', { x: -3, y: 1.4, width: 0.5, height: 2.2, fill: '#3a261a' }));
    g.appendChild(svgEl('rect', { x: -1, y: 1.4, width: 0.5, height: 2.2, fill: '#3a261a' }));
    g.appendChild(svgEl('rect', { x: 1.5, y: 1.4, width: 0.5, height: 2.2, fill: '#3a261a' }));
    g.appendChild(svgEl('rect', { x: 3, y: 1.4, width: 0.5, height: 2.2, fill: '#3a261a' }));
    return g;
  };

  const startX = x - 30;
  const camels: SVGGElement[] = [];
  for (let i = 0; i < 4; i++) {
    const c = buildCamel(startX + i * 8, y + 6 + i * 0.4, 0.95 - i * 0.06);
    layer.appendChild(c);
    camels.push(c);
    gsap.to(c, { attr: { opacity: 0.92 }, duration: 0.5, delay: 0.08 * i });
    gsap.to(c, {
      attr: { transform: `translate(${x + 26}, ${y + 6 + i * 0.4}) scale(${0.95 - i * 0.06})` },
      duration: 7.5,
      delay: 0.05 * i,
      ease: 'none',
      onComplete: () => {
        gsap.to(c, { attr: { opacity: 0 }, duration: 0.6, onComplete: () => c.remove() });
      },
    });
  }
  // dust trail behind
  const dust = svgEl('ellipse', { cx: x - 30, cy: y + 8, rx: 6, ry: 1, fill: acc, opacity: 0, filter: 'blur(1px)' });
  layer.appendChild(dust);
  gsap.to(dust, { attr: { opacity: 0.4 }, duration: 0.6 });
  gsap.to(dust, { attr: { cx: x + 26, opacity: 0 }, duration: 7.5, ease: 'none', onComplete: () => dust.remove() });
}

/** fx:throne — golden royal throne rising into view. */
function fxThrone(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'throne-glow', 1.6);
  const gold = '#ffd866';
  const dark = eraVar('--era-primary', '#5b3a8a');

  const g = svgEl('g', { transform: `translate(${x}, ${y - 12}) scale(0)`, opacity: 0, filter: glow });
  // base + steps
  g.appendChild(svgEl('rect', { x: -10, y: 8, width: 20, height: 2, fill: dark }));
  g.appendChild(svgEl('rect', { x: -8, y: 6, width: 16, height: 2, fill: dark }));
  // throne body
  g.appendChild(svgEl('rect', { x: -6, y: -4, width: 12, height: 10, fill: gold, stroke: dark, 'stroke-width': 0.5 }));
  // armrests
  g.appendChild(svgEl('rect', { x: -8, y: 0, width: 2, height: 6, fill: gold, stroke: dark, 'stroke-width': 0.4 }));
  g.appendChild(svgEl('rect', { x: 6, y: 0, width: 2, height: 6, fill: gold, stroke: dark, 'stroke-width': 0.4 }));
  // back with crown
  g.appendChild(svgEl('rect', { x: -6, y: -14, width: 12, height: 10, fill: gold, stroke: dark, 'stroke-width': 0.5 }));
  g.appendChild(svgEl('polygon', { points: '-5,-14 -2,-18 0,-15 2,-18 5,-14', fill: gold, stroke: dark, 'stroke-width': 0.4 }));
  // gem on top
  g.appendChild(svgEl('circle', { cx: 0, cy: -17, r: 1.2, fill: '#a01010' }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { transform: `translate(${x}, ${y - 12}) scale(1)`, opacity: 1 }, duration: 0.9, ease: 'back.out(1.3)' });
  tl.to(g, { attr: { opacity: 0.95 }, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '+=0.5');
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=1.5');
}

/** fx:crown-descent — crown floating down onto a position. */
function fxCrownDescent(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'crown-glow', 1.4);
  const gold = '#ffd866';

  const g = svgEl('g', { transform: `translate(${x}, ${y - 30})`, opacity: 0, filter: glow });
  g.appendChild(svgEl('path', { d: 'M -5 0 L -5 -6 L -3 -3 L -1 -7 L 1 -7 L 3 -3 L 5 -6 L 5 0 Z', fill: gold, stroke: '#8a5018', 'stroke-width': 0.4 }));
  g.appendChild(svgEl('rect', { x: -5.5, y: 0, width: 11, height: 1.6, fill: gold, stroke: '#8a5018', 'stroke-width': 0.3 }));
  // gems
  g.appendChild(svgEl('circle', { cx: -3, cy: -4.5, r: 0.6, fill: '#a01010' }));
  g.appendChild(svgEl('circle', { cx: 0, cy: -5.5, r: 0.7, fill: '#1a3a60' }));
  g.appendChild(svgEl('circle', { cx: 3, cy: -4.5, r: 0.6, fill: '#27ae60' }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 1 }, duration: 0.4 });
  tl.to(g, { attr: { transform: `translate(${x}, ${y - 8})` }, duration: 1.6, ease: 'sine.inOut' }, 0);
  tl.to(g, { attr: { opacity: 0.95 }, duration: 0.6, yoyo: true, repeat: 2, ease: 'sine.inOut' });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=1.2');
}

/** fx:fire-from-heaven — vertical fire bolt descending onto target. */
function fxFireFromHeaven(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'firesky-glow', 2.8);

  // Pre-flash on the cloud — sky lights up before the bolt descends.
  const skyFlash = svgEl('ellipse', { cx: x, cy: y - 72, rx: 28, ry: 6, fill: '#ffd866', opacity: 0, filter: glow });
  layer.appendChild(skyFlash);

  // Descending bolt (bigger, longer, faster).
  const bolt = svgEl('polygon', {
    points: `${x - 2.2},${y - 90} ${x + 2.2},${y - 90} ${x + 5.5},${y} ${x - 5.5},${y}`,
    fill: '#ff8844', opacity: 0, filter: glow,
  });
  const inner = svgEl('polygon', {
    points: `${x - 1.0},${y - 90} ${x + 1.0},${y - 90} ${x + 2.5},${y} ${x - 2.5},${y}`,
    fill: '#fff5c8', opacity: 0, filter: glow,
  });
  layer.appendChild(bolt); layer.appendChild(inner);

  // Impact shockwave ring (separate from the central flame).
  const ring = svgEl('circle', { cx: x, cy: y, r: 0, fill: 'none', stroke: '#ffd866', 'stroke-width': 1.5, opacity: 0, filter: glow });
  const impact = svgEl('circle', { cx: x, cy: y, r: 0, fill: '#ffd866', opacity: 0, filter: glow });
  layer.appendChild(ring); layer.appendChild(impact);

  const tl = gsap.timeline({ onComplete: () => { skyFlash.remove(); bolt.remove(); inner.remove(); ring.remove(); impact.remove(); } });
  // 1. Sky pre-flash
  tl.to(skyFlash, { attr: { opacity: 0.85, rx: 38 }, duration: 0.25, ease: 'expo.out' }, 0);
  tl.to(skyFlash, { attr: { opacity: 0 }, duration: 0.5, ease: 'sine.in' }, 0.3);
  // 2. Bolt strike (fast, bright)
  tl.to(bolt, { attr: { opacity: 1 }, duration: 0.12, ease: 'power3.in' }, 0.18);
  tl.to(inner, { attr: { opacity: 1 }, duration: 0.1, ease: 'power3.in' }, 0.22);
  // 3. Impact — smaller than before so it doesn't become a planet-sized circle.
  tl.to(impact, { attr: { r: 8, opacity: 1 }, duration: 0.22, ease: 'expo.out' }, 0.3);
  tl.to(ring, { attr: { r: 14, opacity: 0.9 }, duration: 0.32, ease: 'expo.out' }, 0.3);
  // 4. Bolt fades, shockwave expands and dissolves
  tl.to(inner, { attr: { opacity: 0 }, duration: 0.4, ease: 'sine.in' }, 0.45);
  tl.to(bolt, { attr: { opacity: 0 }, duration: 0.6, ease: 'sine.in' }, 0.5);
  tl.to(ring, { attr: { r: 30, opacity: 0, 'stroke-width': 0.2 }, duration: 1.4, ease: 'sine.in' }, 0.5);
  tl.to(impact, { attr: { r: 14, opacity: 0 }, duration: 1.4, ease: 'sine.in' }, 0.5);
  // 5. Residual flame on impact site
  setTimeout(() => fxFireFlicker(svg, { position: [x, y] }), 500);
}

/** fx:bowing-crowd — silhouettes bowing in unison around the target. */
function fxBowingCrowd(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const dark = '#1a0f08';
  const fig: SVGGElement[] = [];
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2;
    const fx = x + Math.cos(ang) * 14;
    const fy = y + Math.sin(ang) * 8 + 4;
    const g = svgEl('g', { transform: `translate(${fx}, ${fy})`, opacity: 0 });
    g.appendChild(svgEl('circle', { cx: 0, cy: -3, r: 1.2, fill: dark })); // head
    g.appendChild(svgEl('path', { d: 'M -1.6 -2 L -1.6 2 L 1.6 2 L 1.6 -2 Z', fill: dark })); // torso
    layer.appendChild(g);
    fig.push(g);
    gsap.to(g, { attr: { opacity: 0.85 }, duration: 0.4, delay: i * 0.05 });
    // bow: rotate the torso path via Y compression on group
    const bow = gsap.timeline({ delay: 0.6 + i * 0.05, repeat: 1, yoyo: true });
    bow.to(g, { attr: { transform: `translate(${fx}, ${fy + 1.2}) scale(1, 0.6)` }, duration: 0.7, ease: 'sine.inOut' });
    bow.to(g, { attr: { transform: `translate(${fx}, ${fy}) scale(1, 1)` }, duration: 0.7, ease: 'sine.inOut' });
  }
  setTimeout(() => fig.forEach((f) => gsap.to(f, { attr: { opacity: 0 }, duration: 0.8, onComplete: () => f.remove() })), 3800);
}

/** fx:trumpet-blast — shofar/trumpet with sound waves rippling outward. */
function fxTrumpetBlast(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const acc = eraVar('--era-accent', '#d9b35a');
  // trumpet horn
  const horn = svgEl('g', { transform: `translate(${x}, ${y}) scale(0)`, opacity: 0 });
  horn.appendChild(svgEl('path', { d: 'M -6 -1 Q -6 0 -5 1 L 4 2 L 8 4 L 8 -4 L 4 -2 L -5 -1 Q -6 -2 -6 -1 Z', fill: acc, stroke: '#5a4830', 'stroke-width': 0.4 }));
  layer.appendChild(horn);
  gsap.to(horn, { attr: { transform: `translate(${x}, ${y}) scale(1)`, opacity: 1 }, duration: 0.5, ease: 'back.out(2)' });
  // sound waves
  for (let i = 0; i < 4; i++) {
    const arc = svgEl('path', { d: `M ${x + 9} ${y - 4} Q ${x + 14 + i * 3} ${y} ${x + 9} ${y + 4}`, fill: 'none', stroke: acc, 'stroke-width': 0.8, opacity: 0 });
    layer.appendChild(arc);
    const tl = gsap.timeline({ delay: 0.3 + i * 0.2, onComplete: () => arc.remove() });
    tl.to(arc, { attr: { opacity: 0.8 }, duration: 0.3 });
    tl.to(arc, { attr: { opacity: 0, d: `M ${x + 9} ${y - 8} Q ${x + 20 + i * 3} ${y} ${x + 9} ${y + 8}` }, duration: 1.2, ease: 'sine.out' });
  }
  setTimeout(() => gsap.to(horn, { attr: { opacity: 0 }, duration: 0.8, onComplete: () => horn.remove() }), 2800);
}

/** fx:angel-formation — three angels arrayed in flight. */
function fxAngelFormation(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'angel-form-glow', 1.6);
  const positions = [[-12, -18], [0, -22], [12, -18]];
  positions.forEach(([dx, dy], i) => {
    const g = svgEl('g', { transform: `translate(${x + dx}, ${y + dy - 14})`, opacity: 0, filter: glow });
    g.appendChild(svgEl('circle', { cx: 0, cy: -1.5, r: 1.4, fill: '#ffd866' })); // head
    g.appendChild(svgEl('path', { d: 'M -3 0 Q -4 -3 -2 -4 M 3 0 Q 4 -3 2 -4', fill: 'none', stroke: '#ffd866', 'stroke-width': 1.2, 'stroke-linecap': 'round' })); // wings
    g.appendChild(svgEl('path', { d: 'M -1 0 L 0 4 L 1 0 Z', fill: '#ffffff' })); // robe
    g.appendChild(svgEl('circle', { cx: 0, cy: -3.5, r: 2, fill: 'none', stroke: '#ffd866', 'stroke-width': 0.3, opacity: 0.7 })); // halo
    layer.appendChild(g);
    const tl = gsap.timeline({ delay: i * 0.15, onComplete: () => g.remove() });
    tl.to(g, { attr: { opacity: 1, transform: `translate(${x + dx}, ${y + dy})` }, duration: 1.2, ease: 'sine.out' });
    tl.to(g, { attr: { opacity: 0 }, duration: 1.4, ease: 'sine.in' }, '+=2.0');
  });
}

/** fx:tablets-shatter — the stone tablets break in two. */
function fxTabletsShatter(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const stone = '#3a261a';
  const left = svgEl('path', { d: 'M -5 -7 Q -5 -8 -4 -8 L -0.4 -8 L -0.4 5 L -5 5 Z', fill: '#8a7250', stroke: stone, 'stroke-width': 0.5, transform: `translate(${x}, ${y})`, opacity: 1 });
  const right = svgEl('path', { d: 'M 0.4 -8 L 4 -8 Q 5 -8 5 -7 L 5 5 L 0.4 5 Z', fill: '#8a7250', stroke: stone, 'stroke-width': 0.5, transform: `translate(${x}, ${y})`, opacity: 1 });
  // engravings (suggest Hebrew letters)
  [-1, 1].forEach((sgn) => {
    const t2 = svgEl('g', { transform: `translate(${x}, ${y})` });
    for (let r = 0; r < 4; r++) {
      t2.appendChild(svgEl('line', { x1: sgn * 1.5, y1: -5 + r * 2, x2: sgn * 3.5, y2: -5 + r * 2, stroke: stone, 'stroke-width': 0.3 }));
    }
    layer.appendChild(t2);
    setTimeout(() => t2.remove(), 2400);
  });
  layer.appendChild(left); layer.appendChild(right);
  const tl = gsap.timeline({ onComplete: () => { left.remove(); right.remove(); } });
  tl.to({}, { duration: 0.4 });
  tl.to(left, { attr: { transform: `translate(${x - 6}, ${y + 4}) rotate(-22)`, opacity: 0.7 }, duration: 0.8, ease: 'expo.out' });
  tl.to(right, { attr: { transform: `translate(${x + 6}, ${y + 4}) rotate(20)`, opacity: 0.7 }, duration: 0.8, ease: 'expo.out' }, '<');
  tl.to([left, right], { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=0.4');
  // dust burst
  setTimeout(() => fxDustBurst(svg, { position: [x, y + 4] }), 400);
}

/** fx:moon-split — the moon splits into two halves (Islamic miracle). */
function fxMoonSplit(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw] = getViewBox(svg);
  const cx = vx + vw * 0.5;
  const cy = vy + 40;
  const glow = ensureGlowFilter(svg, 'moonsplit-glow', 2.4);
  const left = svgEl('path', { d: `M ${cx - 8} ${cy} A 8 8 0 0 1 ${cx} ${cy - 8} L ${cx} ${cy + 8} A 8 8 0 0 1 ${cx - 8} ${cy} Z`, fill: '#f4f1e0', filter: glow, opacity: 0 });
  const right = svgEl('path', { d: `M ${cx} ${cy - 8} A 8 8 0 0 1 ${cx + 8} ${cy} A 8 8 0 0 1 ${cx} ${cy + 8} Z`, fill: '#f4f1e0', filter: glow, opacity: 0 });
  layer.appendChild(left); layer.appendChild(right);
  const tl = gsap.timeline({ onComplete: () => { left.remove(); right.remove(); } });
  tl.to([left, right], { attr: { opacity: 1 }, duration: 0.6 });
  tl.to(left, { attr: { transform: `translate(-12, 0)` }, duration: 1.6, ease: 'expo.out' }, '<+0.5');
  tl.to(right, { attr: { transform: `translate(12, 0)` }, duration: 1.6, ease: 'expo.out' }, '<');
  tl.to([left, right], { attr: { opacity: 0 }, duration: 1.4, ease: 'sine.in' }, '+=1.2');
}

/** fx:kaaba-pulse — Kaaba cube with golden halo pulse. */
function fxKaabaPulse(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'kaaba-glow', 1.8);
  const dark = '#1a0f08';
  const g = svgEl('g', { transform: `translate(${x}, ${y})`, opacity: 0, filter: glow });
  // cube perspective: 3 faces
  g.appendChild(svgEl('polygon', { points: '-6,-4 0,-7 6,-4 0,-1', fill: '#3a261a' })); // top
  g.appendChild(svgEl('polygon', { points: '-6,-4 -6,5 0,8 0,-1', fill: dark })); // left face
  g.appendChild(svgEl('polygon', { points: '0,-1 0,8 6,5 6,-4', fill: '#2a1a10' })); // right face
  // gold band (kiswa embroidery)
  g.appendChild(svgEl('polygon', { points: '-6,1 0,4 6,1 6,2 0,5 -6,2', fill: '#ffd866', opacity: 0.85 }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 1 }, duration: 0.4 });
  // halo pulse
  for (let i = 0; i < 3; i++) {
    const r = svgEl('circle', { cx: x, cy: y, r: 10, fill: 'none', stroke: '#ffd866', 'stroke-width': 1.2, opacity: 0 });
    layer.appendChild(r);
    const rt = gsap.timeline({ delay: 0.4 + i * 0.4, onComplete: () => r.remove() });
    rt.to(r, { attr: { r: 22, opacity: 0.6 }, duration: 0.6, ease: 'expo.out' });
    rt.to(r, { attr: { r: 38, opacity: 0 }, duration: 1.6, ease: 'sine.in' });
  }
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=2.4');
}

/** fx:tongue-of-flame — tongues of fire over several positions (Pentecost). */
function fxTongueOfFlame(svg: SVGSVGElement, data: { positions?: [number, number][]; position?: [number, number]; pinIdx?: number } = {}) {
  const positions = data.positions ?? (() => { const t = targetOrMarker(svg, data); return t ? [t] : []; })();
  if (positions.length === 0) return;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'tongue-glow', 1.2);
  positions.forEach(([x, y], i) => {
    const t = svgEl('path', {
      d: `M ${x - 1.5} ${y - 4} Q ${x} ${y - 9} ${x + 1.5} ${y - 4} Q ${x} ${y - 2} ${x - 1.5} ${y - 4} Z`,
      fill: '#ff8844', opacity: 0, filter: glow,
    });
    const inner = svgEl('path', {
      d: `M ${x - 0.7} ${y - 5} Q ${x} ${y - 8.5} ${x + 0.7} ${y - 5} Z`,
      fill: '#ffd866', opacity: 0,
    });
    layer.appendChild(t); layer.appendChild(inner);
    const tl = gsap.timeline({ delay: i * 0.12, onComplete: () => { t.remove(); inner.remove(); } });
    tl.to([t, inner], { attr: { opacity: 0.95 }, duration: 0.4 });
    // flicker
    const fl = gsap.timeline({ repeat: 6, yoyo: true });
    fl.to(inner, { attr: { opacity: 0.6 }, duration: 0.25, ease: 'sine.inOut' });
    fl.to(inner, { attr: { opacity: 1 }, duration: 0.25, ease: 'sine.inOut' });
    tl.to([t, inner], { attr: { opacity: 0 }, duration: 1.0, ease: 'sine.in' }, '+=3.0');
  });
}

/** fx:crown-of-thorns — woven thorn crown ring around target. */
function fxCrownOfThorns(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const dark = '#3a261a';
  const g = svgEl('g', { transform: `translate(${x}, ${y - 6}) scale(0)`, opacity: 0, style: 'transform-origin: 50% 50%; transform-box: fill-box;' });
  const ring = svgEl('ellipse', { cx: 0, cy: 0, rx: 6, ry: 2.4, fill: 'none', stroke: dark, 'stroke-width': 1.4 });
  g.appendChild(ring);
  // thorns
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const tx = Math.cos(a) * 6;
    const ty = Math.sin(a) * 2.4;
    const nx = Math.cos(a) * 8;
    const ny = Math.sin(a) * 3.4;
    g.appendChild(svgEl('line', { x1: tx, y1: ty, x2: nx, y2: ny, stroke: dark, 'stroke-width': 0.6, 'stroke-linecap': 'round' }));
  }
  // drops of blood
  g.appendChild(svgEl('circle', { cx: -2, cy: 2.5, r: 0.6, fill: '#a01010' }));
  g.appendChild(svgEl('circle', { cx: 3, cy: 2.4, r: 0.5, fill: '#a01010' }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { transform: `translate(${x}, ${y - 6}) scale(1)`, opacity: 1 }, duration: 0.7, ease: 'back.out(1.4)' });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=2.4');
}

/** fx:fish-school — silver fish swimming across the position. */
function fxFishSchool(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const silver = '#bfe6ec';
  for (let i = 0; i < 7; i++) {
    const oy = (i - 3) * 2;
    const fish = svgEl('path', { d: 'M -3 0 Q 0 -1.2 3 0 Q 0 1.2 -3 0 Z M 3 0 L 4.5 -1 L 4.5 1 Z', fill: silver, stroke: '#3a6fa0', 'stroke-width': 0.2, transform: `translate(${x - 22}, ${y + oy})`, opacity: 0 });
    layer.appendChild(fish);
    const tl = gsap.timeline({ delay: i * 0.08, onComplete: () => fish.remove() });
    tl.to(fish, { attr: { opacity: 0.9 }, duration: 0.3 });
    tl.to(fish, { attr: { transform: `translate(${x + 22}, ${y + oy + Math.sin(i) * 1.5})` }, duration: 3.5, ease: 'sine.inOut' }, '<');
    tl.to(fish, { attr: { opacity: 0 }, duration: 0.6, ease: 'sine.in' }, '-=0.4');
  }
}

/** fx:plague-locust — swarm of locusts crossing the scene. */
function fxPlagueLocust(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const N = 28;
  for (let i = 0; i < N; i++) {
    const sx = vx - 10 - Math.random() * 30;
    const sy = vy + Math.random() * vh;
    const c = svgEl('path', { d: 'M 0 0 L 2 -0.4 L 2.2 0 L 2 0.4 Z M 0.4 -0.6 L 1 -1.4 M 0.4 0.6 L 1 1.4', fill: '#5a6a30', stroke: '#3a4818', 'stroke-width': 0.15, transform: `translate(${sx}, ${sy})`, opacity: 0 });
    layer.appendChild(c);
    const drift = (Math.random() - 0.5) * 30;
    const dur = 3.5 + Math.random() * 2;
    const tl = gsap.timeline({ delay: Math.random() * 0.8, onComplete: () => c.remove() });
    tl.to(c, { attr: { opacity: 0.8 }, duration: 0.4 });
    tl.to(c, { attr: { transform: `translate(${vx + vw + 10}, ${sy + drift})` }, duration: dur, ease: 'none' }, '<');
    tl.to(c, { attr: { opacity: 0 }, duration: 0.5 }, '-=0.5');
  }
}

/** fx:plague-frogs — frogs hopping across the scene. */
function fxPlagueFrogs(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  for (let i = 0; i < 10; i++) {
    const sx = x + (Math.random() - 0.5) * 28;
    const sy = y + (Math.random() - 0.5) * 16;
    const g = svgEl('g', { transform: `translate(${sx}, ${sy})`, opacity: 0 });
    g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 1.6, ry: 1, fill: '#3a6a30', stroke: '#1a3a10', 'stroke-width': 0.2 }));
    g.appendChild(svgEl('circle', { cx: -0.6, cy: -0.6, r: 0.3, fill: '#ffd866' }));
    g.appendChild(svgEl('circle', { cx: 0.6, cy: -0.6, r: 0.3, fill: '#ffd866' }));
    g.appendChild(svgEl('circle', { cx: -0.6, cy: -0.6, r: 0.12, fill: '#1a0808' }));
    g.appendChild(svgEl('circle', { cx: 0.6, cy: -0.6, r: 0.12, fill: '#1a0808' }));
    layer.appendChild(g);
    const tl = gsap.timeline({ delay: i * 0.1, onComplete: () => g.remove() });
    tl.to(g, { attr: { opacity: 1 }, duration: 0.3 });
    // hop
    for (let h = 0; h < 4; h++) {
      tl.to(g, { attr: { transform: `translate(${sx + h * 2.5 - 4 + (Math.random() - 0.5)}, ${sy - 3})` }, duration: 0.25, ease: 'sine.out' });
      tl.to(g, { attr: { transform: `translate(${sx + h * 2.5 - 3 + (Math.random() - 0.5)}, ${sy})` }, duration: 0.25, ease: 'sine.in' });
    }
    tl.to(g, { attr: { opacity: 0 }, duration: 0.5, ease: 'sine.in' });
  }
}

/** fx:plague-darkness — full-screen darkness overlay (ninth plague). */
function fxPlagueDarkness(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const rect = svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill: '#0a0506', opacity: 0 });
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { opacity: 0.78 }, duration: 1.4, ease: 'sine.inOut' });
  tl.to(rect, { attr: { opacity: 0.6 }, duration: 0.3, yoyo: true, repeat: 2, ease: 'sine.inOut' });
  tl.to({}, { duration: 1.6 });
  tl.to(rect, { attr: { opacity: 0 }, duration: 2.0, ease: 'sine.in' });
}

/** fx:rolling-stone — round stone rolling away from a tomb. */
function fxRollingStone(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const stone = svgEl('circle', { cx: x, cy: y, r: 5, fill: '#8a7250', stroke: '#3a261a', 'stroke-width': 0.5, opacity: 0 });
  layer.appendChild(stone);
  const tl = gsap.timeline({ onComplete: () => stone.remove() });
  tl.to(stone, { attr: { opacity: 1 }, duration: 0.4 });
  tl.to(stone, { attr: { cx: x + 18, transform: `rotate(360 ${x + 9} ${y})` }, duration: 2.0, ease: 'power2.out' });
  tl.to(stone, { attr: { opacity: 0 }, duration: 1.0, ease: 'sine.in' }, '+=0.6');
  // dust
  setTimeout(() => fxDustBurst(svg, { position: [x + 10, y + 2] }), 400);
}

/** fx:tomb-empty — open tomb arch with empty interior glow. */
function fxTombEmpty(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'tomb-glow', 1.6);
  const g = svgEl('g', { transform: `translate(${x}, ${y})`, opacity: 0, filter: glow });
  g.appendChild(svgEl('path', { d: 'M -7 5 L -7 -4 Q -7 -8 0 -8 Q 7 -8 7 -4 L 7 5 Z', fill: '#3a261a', stroke: '#1a0f08', 'stroke-width': 0.5 }));
  g.appendChild(svgEl('path', { d: 'M -5 5 L -5 -3 Q -5 -6 0 -6 Q 5 -6 5 -3 L 5 5 Z', fill: '#ffd866', opacity: 0.6 }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 1 }, duration: 0.6 });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.4, ease: 'sine.in' }, '+=2.5');
}

/** fx:resurrection-light — radial bloom + ascending body silhouette. */
function fxResurrectionLight(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'res-glow', 2.4);
  // radial bloom
  const bloom = svgEl('circle', { cx: x, cy: y, r: 0, fill: '#ffd866', opacity: 0, filter: glow });
  layer.appendChild(bloom);
  // rays
  const rays = svgEl('g', { transform: `translate(${x}, ${y})`, opacity: 0, filter: glow });
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    rays.appendChild(svgEl('line', { x1: Math.cos(a) * 6, y1: Math.sin(a) * 6, x2: Math.cos(a) * 22, y2: Math.sin(a) * 22, stroke: '#ffd866', 'stroke-width': 0.6 }));
  }
  layer.appendChild(rays);
  const tl = gsap.timeline({ onComplete: () => { bloom.remove(); rays.remove(); } });
  tl.to(bloom, { attr: { r: 18, opacity: 0.85 }, duration: 0.5, ease: 'expo.out' });
  tl.to(rays, { attr: { opacity: 0.9, transform: `translate(${x}, ${y}) rotate(30)` }, duration: 0.8, ease: 'sine.out' }, '<');
  tl.to(bloom, { attr: { r: 36, opacity: 0 }, duration: 1.8, ease: 'sine.in' });
  tl.to(rays, { attr: { opacity: 0, transform: `translate(${x}, ${y}) rotate(60)` }, duration: 1.8, ease: 'sine.in' }, '<');
}

/** fx:divine-hand — large hand silhouette descending from above. */
function fxDivineHand(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'dhand-glow', 1.8);
  const g = svgEl('g', { transform: `translate(${x}, ${y - 30})`, opacity: 0, filter: glow });
  // simple hand silhouette
  g.appendChild(svgEl('path', { d: 'M -3 0 L -3 -4 L -2 -4 L -2 -7 L -1 -7 L -1 -4 L 0 -4 L 0 -8 L 1 -8 L 1 -4 L 2 -4 L 2 -7 L 3 -7 L 3 -4 L 4 0 L 4 5 L -3 5 Z', fill: '#ffd866', opacity: 0.85 }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 1, transform: `translate(${x}, ${y - 12})` }, duration: 1.4, ease: 'sine.out' });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=1.8');
}

/** fx:sword-clash — two swords striking at center with sparks. */
function fxSwordClash(svg: SVGSVGElement, data: { from?: [number, number]; to?: [number, number]; position?: [number, number] } = {}) {
  const from = data.from ?? data.position;
  const to = data.to ?? data.position;
  if (!from || !to) return;
  const cx = (from[0] + to[0]) / 2;
  const cy = (from[1] + to[1]) / 2;
  const layer = getFxLayer(svg);
  // two diagonal swords
  const sA = svgEl('line', { x1: cx - 6, y1: cy - 6, x2: cx + 6, y2: cy + 6, stroke: '#bfe6ec', 'stroke-width': 1.4, opacity: 0 });
  const sB = svgEl('line', { x1: cx + 6, y1: cy - 6, x2: cx - 6, y2: cy + 6, stroke: '#bfe6ec', 'stroke-width': 1.4, opacity: 0 });
  layer.appendChild(sA); layer.appendChild(sB);
  // spark burst
  const spark = svgEl('circle', { cx, cy, r: 0, fill: '#ffd866', opacity: 0 });
  layer.appendChild(spark);
  const tl = gsap.timeline({ onComplete: () => { sA.remove(); sB.remove(); spark.remove(); } });
  tl.to([sA, sB], { attr: { opacity: 1 }, duration: 0.2 });
  tl.to(spark, { attr: { r: 6, opacity: 1 }, duration: 0.15, ease: 'expo.out' });
  tl.to(spark, { attr: { r: 14, opacity: 0 }, duration: 0.8, ease: 'sine.in' });
  tl.to([sA, sB], { attr: { opacity: 0 }, duration: 0.6, ease: 'sine.in' }, '<');
}

/** fx:lion-roar — lion silhouette with roar shockwave. */
function fxLionRoar(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const tan = '#c8a064';
  const dark = '#3a261a';
  const g = svgEl('g', { transform: `translate(${x}, ${y}) scale(0)`, opacity: 0, style: 'transform-origin: 50% 50%; transform-box: fill-box;' });
  g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 6, ry: 3, fill: tan, stroke: dark, 'stroke-width': 0.4 })); // body
  // mane
  g.appendChild(svgEl('circle', { cx: 6, cy: -1, r: 3.5, fill: '#8a6030', stroke: dark, 'stroke-width': 0.4 }));
  // head
  g.appendChild(svgEl('ellipse', { cx: 7.5, cy: -1, rx: 2, ry: 1.6, fill: tan }));
  // eye
  g.appendChild(svgEl('circle', { cx: 8, cy: -1.4, r: 0.25, fill: dark }));
  // open jaw
  g.appendChild(svgEl('path', { d: 'M 8.5 -0.5 L 10 0 L 9.5 0.8 Z', fill: '#a01010' }));
  // legs
  [-4, -1, 2, 4.5].forEach((lx) => g.appendChild(svgEl('rect', { x: lx, y: 2.5, width: 0.7, height: 3, fill: dark })));
  // tail
  g.appendChild(svgEl('path', { d: 'M -6 -1 Q -9 -2 -8 -4', fill: 'none', stroke: dark, 'stroke-width': 0.6 }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { transform: `translate(${x}, ${y}) scale(1)`, opacity: 1 }, duration: 0.6, ease: 'back.out(1.6)' });
  // roar shockwave
  for (let i = 0; i < 3; i++) {
    const r = svgEl('path', { d: `M ${x + 10} ${y - 3} Q ${x + 16 + i * 3} ${y} ${x + 10} ${y + 3}`, fill: 'none', stroke: '#ff8844', 'stroke-width': 0.8, opacity: 0 });
    layer.appendChild(r);
    const rt = gsap.timeline({ delay: 0.6 + i * 0.18, onComplete: () => r.remove() });
    rt.to(r, { attr: { opacity: 0.75 }, duration: 0.2 });
    rt.to(r, { attr: { opacity: 0, d: `M ${x + 10} ${y - 6} Q ${x + 24 + i * 3} ${y} ${x + 10} ${y + 6}` }, duration: 1.0, ease: 'sine.out' });
  }
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' }, '+=2.4');
}

/** fx:wolf-prowl — wolf silhouette prowling across position. */
function fxWolfProwl(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const grey = '#5a5a5a';
  const g = svgEl('g', { transform: `translate(${x - 22}, ${y + 4})`, opacity: 0 });
  g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 5, ry: 1.8, fill: grey })); // body
  g.appendChild(svgEl('ellipse', { cx: 5, cy: -1, rx: 2, ry: 1.4, fill: grey })); // head
  g.appendChild(svgEl('polygon', { points: '4,-2 4.5,-3.2 5.2,-2.2', fill: grey })); // ear1
  g.appendChild(svgEl('polygon', { points: '5.5,-2 6,-3.2 6.5,-2.2', fill: grey })); // ear2
  g.appendChild(svgEl('circle', { cx: 5.5, cy: -1.2, r: 0.2, fill: '#ffd866' })); // eye
  [-3, -1, 2, 3.5].forEach((lx) => g.appendChild(svgEl('rect', { x: lx, y: 1.5, width: 0.5, height: 2.5, fill: '#3a3a3a' })));
  g.appendChild(svgEl('path', { d: 'M -5 -0.5 Q -7 -1 -7 0.5', fill: 'none', stroke: grey, 'stroke-width': 0.6 })); // tail
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 0.92 }, duration: 0.5 });
  tl.to(g, { attr: { transform: `translate(${x + 22}, ${y + 4})` }, duration: 4.5, ease: 'sine.inOut' }, '<');
  tl.to(g, { attr: { opacity: 0 }, duration: 0.8, ease: 'sine.in' }, '-=0.5');
}

/** fx:eagle-soar — eagle silhouette soaring across the sky. */
function fxEagleSoar(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const dark = '#3a261a';
  const eagle = svgEl('path', { d: 'M -6 0 Q -3 -3 0 -1 Q 3 -3 6 0 Q 3 1 0 0.5 Q -3 1 -6 0 Z', fill: dark, opacity: 0, transform: `translate(${x - 28}, ${y - 16})` });
  layer.appendChild(eagle);
  const tl = gsap.timeline({ onComplete: () => eagle.remove() });
  tl.to(eagle, { attr: { opacity: 0.85 }, duration: 0.4 });
  // bob + travel
  const path = { t: 0 };
  gsap.to(path, { t: 1, duration: 5.0, ease: 'sine.inOut', onUpdate: () => {
    const cx = x - 28 + 56 * path.t;
    const cy = y - 16 + Math.sin(path.t * Math.PI * 3) * 4;
    eagle.setAttribute('transform', `translate(${cx}, ${cy})`);
  }, onComplete: () => { gsap.to(eagle, { attr: { opacity: 0 }, duration: 0.6 }); } });
}

/** fx:raven-flight — single black raven flying. */
function fxRavenFlight(svg: SVGSVGElement, data: { from?: [number, number]; to?: [number, number]; position?: [number, number] } = {}) {
  const from = data.from ?? (data.position ? [data.position[0] - 20, data.position[1] - 10] as [number, number] : null);
  const to = data.to ?? (data.position ?? null);
  if (!from || !to) return;
  const layer = getFxLayer(svg);
  const raven = svgEl('path', { d: 'M -3 0 Q -1 -2 0 0 Q 1 -2 3 0 Q 1 1 0 0.6 Q -1 1 -3 0 Z', fill: '#1a0f08', opacity: 0, transform: `translate(${from[0]}, ${from[1]})` });
  layer.appendChild(raven);
  const tl = gsap.timeline({ onComplete: () => raven.remove() });
  tl.to(raven, { attr: { opacity: 0.95 }, duration: 0.3 });
  const path = { t: 0 };
  gsap.to(path, { t: 1, duration: 3.6, ease: 'sine.inOut', onUpdate: () => {
    const cx = from[0] + (to[0] - from[0]) * path.t;
    const cy = from[1] + (to[1] - from[1]) * path.t + Math.sin(path.t * Math.PI * 4) * 2;
    const wing = 1 + Math.sin(path.t * Math.PI * 14) * 0.2;
    raven.setAttribute('transform', `translate(${cx}, ${cy}) scale(1, ${wing.toFixed(3)})`);
  } });
  tl.to(raven, { attr: { opacity: 0 }, duration: 0.6, delay: 3.4 });
}

/** fx:horse-gallop — galloping horse silhouette. */
function fxHorseGallop(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const dark = '#3a261a';
  const g = svgEl('g', { transform: `translate(${x - 24}, ${y + 4})`, opacity: 0 });
  g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 6, ry: 2, fill: '#7a4a30', stroke: dark, 'stroke-width': 0.3 }));
  g.appendChild(svgEl('ellipse', { cx: 6, cy: -2, rx: 1.4, ry: 1.8, fill: '#7a4a30', stroke: dark, 'stroke-width': 0.3 })); // head
  g.appendChild(svgEl('rect', { x: 5, y: -3.5, width: 0.4, height: 1.5, fill: dark }));
  g.appendChild(svgEl('path', { d: 'M 4.5 -3 Q 5.5 -5 5 -2', fill: dark })); // mane
  [-4, -1, 2, 4].forEach((lx) => g.appendChild(svgEl('rect', { x: lx, y: 2, width: 0.5, height: 3, fill: dark })));
  g.appendChild(svgEl('path', { d: 'M -6 -1 Q -8 0 -7 2', fill: 'none', stroke: dark, 'stroke-width': 0.6 }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 1 }, duration: 0.3 });
  tl.to(g, { attr: { transform: `translate(${x + 24}, ${y + 4})` }, duration: 3.0, ease: 'sine.in' }, '<');
  // bobbing via secondary tween on a child is too complex; rely on travel.
  tl.to(g, { attr: { opacity: 0 }, duration: 0.6 }, '-=0.4');
  // dust puffs along the way
  for (let i = 0; i < 4; i++) setTimeout(() => fxDustBurst(svg, { position: [x - 18 + i * 12, y + 6], duration: 1.2 }), 300 + i * 600);
}

/** fx:camel-train — alias of caravan but smaller (single line, slower). */
function fxCamelTrain(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  fxCaravan(svg, data);
}

/** fx:goat-herd — small herd of goats. */
function fxGoatHerd(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  for (let i = 0; i < 5; i++) {
    const sx = x + (i - 2) * 4 + (Math.random() - 0.5) * 2;
    const sy = y + 6 + (Math.random() - 0.5) * 1.5;
    const g = svgEl('g', { transform: `translate(${sx}, ${sy})`, opacity: 0 });
    g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 2, ry: 1.2, fill: '#d0c0a0', stroke: '#5a4830', 'stroke-width': 0.2 }));
    g.appendChild(svgEl('ellipse', { cx: 1.8, cy: -0.6, rx: 0.7, ry: 0.6, fill: '#d0c0a0' }));
    g.appendChild(svgEl('path', { d: 'M 1.4 -1.2 L 1.2 -1.8 M 2.2 -1.2 L 2.4 -1.8', stroke: '#3a261a', 'stroke-width': 0.2 })); // horns
    [-1.2, -0.4, 0.6, 1.4].forEach((lx) => g.appendChild(svgEl('rect', { x: lx, y: 1, width: 0.3, height: 1.6, fill: '#3a261a' })));
    layer.appendChild(g);
    gsap.to(g, { attr: { opacity: 0.9 }, duration: 0.4, delay: i * 0.08 });
    setTimeout(() => gsap.to(g, { attr: { opacity: 0 }, duration: 0.8, onComplete: () => g.remove() }), 4500);
  }
}

/** fx:donkey-walk — donkey walking. */
function fxDonkeyWalk(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const grey = '#a0a0a0';
  const dark = '#3a261a';
  const g = svgEl('g', { transform: `translate(${x - 18}, ${y + 5})`, opacity: 0 });
  g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 4, ry: 1.6, fill: grey, stroke: dark, 'stroke-width': 0.3 }));
  g.appendChild(svgEl('ellipse', { cx: 4, cy: -1.4, rx: 1.2, ry: 1.4, fill: grey, stroke: dark, 'stroke-width': 0.3 }));
  g.appendChild(svgEl('polygon', { points: '3.4,-2.4 3.8,-3.6 4.2,-2.4', fill: grey })); // ear
  g.appendChild(svgEl('polygon', { points: '4.2,-2.4 4.6,-3.6 5,-2.4', fill: grey })); // ear
  [-2.5, -0.5, 1.5, 3].forEach((lx) => g.appendChild(svgEl('rect', { x: lx, y: 1.4, width: 0.5, height: 2.6, fill: dark })));
  g.appendChild(svgEl('path', { d: 'M -4 -0.5 Q -6 0 -5 1.5', fill: 'none', stroke: dark, 'stroke-width': 0.5 }));
  layer.appendChild(g);
  gsap.to(g, { attr: { opacity: 1 }, duration: 0.4 });
  gsap.to(g, { attr: { transform: `translate(${x + 18}, ${y + 5})` }, duration: 5.5, ease: 'sine.inOut', onComplete: () => gsap.to(g, { attr: { opacity: 0 }, duration: 0.6, onComplete: () => g.remove() }) });
}

/** fx:locust-cloud — same as plague-locust but denser and darker. */
function fxLocustCloud(svg: SVGSVGElement, data: any = {}) { fxPlagueLocust(svg, data); }
/** fx:frog-rain — frogs falling from above. */
function fxFrogRain(svg: SVGSVGElement, data: any = {}) { fxPlagueFrogs(svg, data); }

/** fx:scorpion-skitter — small scorpions scurrying. */
function fxScorpionSkitter(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  for (let i = 0; i < 5; i++) {
    const sx = x + (Math.random() - 0.5) * 18;
    const sy = y + 4 + (Math.random() - 0.5) * 8;
    const g = svgEl('g', { transform: `translate(${sx}, ${sy}) rotate(${Math.random() * 360})`, opacity: 0 });
    g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: 1.6, ry: 0.8, fill: '#3a261a' }));
    g.appendChild(svgEl('path', { d: 'M 1.6 0 Q 3 -1 2.8 -2 Q 3.2 -2 3 -1.5', fill: 'none', stroke: '#3a261a', 'stroke-width': 0.4 }));
    g.appendChild(svgEl('line', { x1: -1.6, y1: -0.6, x2: -2.4, y2: -1.2, stroke: '#3a261a', 'stroke-width': 0.3 }));
    g.appendChild(svgEl('line', { x1: -1.6, y1: 0.6, x2: -2.4, y2: 1.2, stroke: '#3a261a', 'stroke-width': 0.3 }));
    layer.appendChild(g);
    const tl = gsap.timeline({ delay: i * 0.1, onComplete: () => g.remove() });
    tl.to(g, { attr: { opacity: 0.9 }, duration: 0.3 });
    tl.to(g, { attr: { transform: `translate(${sx + (Math.random() - 0.5) * 8}, ${sy + (Math.random() - 0.5) * 6}) rotate(${Math.random() * 360})` }, duration: 2.0, ease: 'sine.inOut' }, '<');
    tl.to(g, { attr: { opacity: 0 }, duration: 0.6 });
  }
}

/** fx:whale-breach — large whale silhouette breaching from below. */
function fxWhaleBreach(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const dark = '#1a3a60';
  const g = svgEl('g', { transform: `translate(${x}, ${y + 10})`, opacity: 0 });
  g.appendChild(svgEl('path', { d: 'M -12 0 Q -10 -8 0 -10 Q 10 -8 12 0 Q 8 1 0 1 Q -8 1 -12 0 Z', fill: dark, stroke: '#0a1a30', 'stroke-width': 0.4 }));
  g.appendChild(svgEl('path', { d: 'M 10 -5 L 14 -2 L 12 -1 Z', fill: dark })); // tail fin
  g.appendChild(svgEl('circle', { cx: -8, cy: -6, r: 0.4, fill: '#1a0f08' })); // eye
  // water splash
  const splash = svgEl('path', { d: `M -14 ${y - 3} Q -10 ${y - 8} -6 ${y - 3} M 6 ${y - 3} Q 10 ${y - 8} 14 ${y - 3}`, fill: 'none', stroke: '#bfe6ec', 'stroke-width': 0.6, opacity: 0 });
  layer.appendChild(splash); layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => { g.remove(); splash.remove(); } });
  tl.to(g, { attr: { opacity: 1, transform: `translate(${x}, ${y - 4})` }, duration: 1.2, ease: 'sine.out' });
  tl.to(splash, { attr: { opacity: 0.8 }, duration: 0.3 }, '<+0.5');
  tl.to(splash, { attr: { opacity: 0 }, duration: 1.2 });
  tl.to(g, { attr: { opacity: 0, transform: `translate(${x}, ${y + 10})` }, duration: 1.6, ease: 'sine.in' }, '+=1.2');
}

// ─── C.2 ATMOSPHERIC ONE-SHOT ─────────────────────────────────────────────

function viewBoxRect(svg: SVGSVGElement, fill: string, opacity = 0): SVGRectElement {
  const [vx, vy, vw, vh] = getViewBox(svg);
  return svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill, opacity });
}

/** fx:dawn-break — warm horizon sweep upward. */
function fxDawnBreak(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const defs = getDefs(svg);
  const gradId = 'narration-fx-dawn-grad';
  if (!svg.querySelector(`#${gradId}`)) {
    const g = svgEl('linearGradient', { id: gradId, x1: '0', y1: '1', x2: '0', y2: '0' });
    g.innerHTML = `<stop offset="0" stop-color="#ffd866" stop-opacity="0.7"/><stop offset="0.5" stop-color="#ff8844" stop-opacity="0.35"/><stop offset="1" stop-color="#ffd866" stop-opacity="0"/>`;
    defs.appendChild(g);
  }
  const rect = svgEl('rect', { x: vx, y: vy + vh, width: vw, height: vh, fill: `url(#${gradId})`, opacity: 0 });
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { y: vy, opacity: 0.9 }, duration: 2.0, ease: 'sine.out' });
  tl.to(rect, { attr: { opacity: 0 }, duration: 2.0, ease: 'sine.in' }, '+=1.0');
}

/** fx:dusk-fall — orange-violet sweep downward. */
function fxDuskFall(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const defs = getDefs(svg);
  const gradId = 'narration-fx-dusk-grad';
  if (!svg.querySelector(`#${gradId}`)) {
    const g = svgEl('linearGradient', { id: gradId, x1: '0', y1: '0', x2: '0', y2: '1' });
    g.innerHTML = `<stop offset="0" stop-color="#ff8844" stop-opacity="0.5"/><stop offset="0.6" stop-color="#5b3a8a" stop-opacity="0.35"/><stop offset="1" stop-color="#1a0f08" stop-opacity="0.6"/>`;
    defs.appendChild(g);
  }
  const rect = svgEl('rect', { x: vx, y: vy - vh, width: vw, height: vh, fill: `url(#${gradId})`, opacity: 0 });
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { y: vy, opacity: 0.85 }, duration: 2.2, ease: 'sine.out' });
  tl.to(rect, { attr: { opacity: 0 }, duration: 2.0, ease: 'sine.in' }, '+=1.0');
}

/** fx:night-fall — dark blue sky + stars. */
function fxNightFall(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const rect = viewBoxRect(svg, '#0a1a30');
  layer.appendChild(rect);
  gsap.to(rect, { attr: { opacity: 0.55 }, duration: 1.8, ease: 'sine.inOut' });
  // sparse stars
  const [vx, vy, vw] = getViewBox(svg);
  const stars: SVGCircleElement[] = [];
  for (let i = 0; i < 24; i++) {
    const sx = vx + Math.random() * vw;
    const sy = vy + Math.random() * 60;
    const s = svgEl('circle', { cx: sx, cy: sy, r: 0.4 + Math.random() * 0.4, fill: '#ffd866', opacity: 0 });
    layer.appendChild(s); stars.push(s);
    gsap.to(s, { attr: { opacity: 0.9 }, duration: 0.4, delay: 1.0 + i * 0.04 });
  }
  setTimeout(() => {
    gsap.to([rect, ...stars], { attr: { opacity: 0 }, duration: 1.8, onComplete: () => { rect.remove(); stars.forEach((s) => s.remove()); } });
  }, 6500);
}

/** fx:starfield-shimmer — band of twinkling stars at top. */
function fxStarfieldShimmer(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw] = getViewBox(svg);
  const stars: SVGCircleElement[] = [];
  for (let i = 0; i < 32; i++) {
    const sx = vx + Math.random() * vw;
    const sy = vy + Math.random() * 50;
    const s = svgEl('circle', { cx: sx, cy: sy, r: 0.4 + Math.random() * 0.6, fill: '#fff6d0', opacity: 0 });
    layer.appendChild(s); stars.push(s);
    const tl = gsap.timeline({ delay: Math.random() * 1.5, repeat: 3, yoyo: true });
    tl.to(s, { attr: { opacity: 0.95 }, duration: 0.5 + Math.random(), ease: 'sine.inOut' });
    tl.to(s, { attr: { opacity: 0.2 }, duration: 0.5 + Math.random(), ease: 'sine.inOut' });
  }
  setTimeout(() => stars.forEach((s) => gsap.to(s, { attr: { opacity: 0 }, duration: 1.2, onComplete: () => s.remove() })), 6000);
}

/** fx:starfield-rotate — slow rotation of stars (epic projection). */
function fxStarfieldRotate(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const g = svgEl('g', { transform: `translate(${vx + vw / 2}, ${vy + vh / 2})`, opacity: 0 });
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 20 + Math.random() * (Math.min(vw, vh) / 2);
    g.appendChild(svgEl('circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 0.3 + Math.random() * 0.6, fill: '#fff6d0' }));
  }
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 0.8 }, duration: 1.2 });
  // rotation via attr transform substring update
  const rot = { a: 0 };
  gsap.to(rot, { a: 12, duration: 8, ease: 'none', onUpdate: () => {
    g.setAttribute('transform', `translate(${vx + vw / 2}, ${vy + vh / 2}) rotate(${rot.a})`);
  } });
  tl.to(g, { attr: { opacity: 0 }, duration: 2.0, ease: 'sine.in' }, '+=6');
}

/** fx:eclipse-darken — sun disk eclipsed, light drops. */
function fxEclipseDarken(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw] = getViewBox(svg);
  const cx = vx + vw * 0.5;
  const cy = vy + 50;
  const glow = ensureGlowFilter(svg, 'eclipse-glow', 2.2);
  const sun = svgEl('circle', { cx, cy, r: 10, fill: '#ffd866', filter: glow, opacity: 0 });
  const disk = svgEl('circle', { cx: cx - 14, cy, r: 10, fill: '#0a0506', opacity: 0 });
  const overlay = viewBoxRect(svg, '#0a0506');
  layer.appendChild(sun); layer.appendChild(disk); layer.appendChild(overlay);
  const tl = gsap.timeline({ onComplete: () => { sun.remove(); disk.remove(); overlay.remove(); } });
  tl.to(sun, { attr: { opacity: 1 }, duration: 0.6 });
  tl.to(disk, { attr: { opacity: 1, cx }, duration: 2.4, ease: 'sine.inOut' });
  tl.to(overlay, { attr: { opacity: 0.5 }, duration: 1.4, ease: 'sine.inOut' }, '<+0.6');
  tl.to({}, { duration: 1.2 });
  tl.to(disk, { attr: { cx: cx + 14, opacity: 0 }, duration: 2.0, ease: 'sine.inOut' });
  tl.to(overlay, { attr: { opacity: 0 }, duration: 1.5, ease: 'sine.in' }, '<');
  tl.to(sun, { attr: { opacity: 0 }, duration: 0.8 });
}

/** fx:moon-bloodred — apocalyptic blood-red moon. */
function fxMoonBloodred(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw] = getViewBox(svg);
  const cx = vx + vw * 0.5;
  const cy = vy + 50;
  const glow = ensureGlowFilter(svg, 'bloodmoon-glow', 2.4);
  const moon = svgEl('circle', { cx, cy, r: 9, fill: '#a01010', filter: glow, opacity: 0 });
  layer.appendChild(moon);
  const tl = gsap.timeline({ onComplete: () => moon.remove() });
  tl.to(moon, { attr: { opacity: 0.95 }, duration: 1.2, ease: 'sine.out' });
  tl.to(moon, { attr: { opacity: 0.7 }, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' });
  tl.to(moon, { attr: { opacity: 0 }, duration: 1.5, ease: 'sine.in' });
}

/** fx:storm-clouds — dark clouds rolling in from one edge. */
function fxStormClouds(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw] = getViewBox(svg);
  const clouds: SVGEllipseElement[] = [];
  for (let i = 0; i < 6; i++) {
    const cy = vy + 10 + i * 6;
    const e = svgEl('ellipse', { cx: vx - 30 - i * 10, cy, rx: 22 + Math.random() * 10, ry: 6 + Math.random() * 2, fill: '#2a2a3a', opacity: 0, filter: 'blur(1.2px)' });
    layer.appendChild(e); clouds.push(e);
    gsap.to(e, { attr: { opacity: 0.85, cx: vx + vw + 30 }, duration: 5.0 + Math.random() * 1.5, delay: i * 0.15, ease: 'sine.inOut', onComplete: () => gsap.to(e, { attr: { opacity: 0 }, duration: 0.6, onComplete: () => e.remove() }) });
  }
}

/** fx:hailstorm — small ice balls falling + small impacts. */
function fxHailstorm(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const N = 40;
  for (let i = 0; i < N; i++) {
    const sx = vx + Math.random() * vw;
    const sy = vy - 5 - Math.random() * 30;
    const ball = svgEl('circle', { cx: sx, cy: sy, r: 0.8 + Math.random() * 0.6, fill: '#bfe6ec', stroke: '#7ad0e0', 'stroke-width': 0.2, opacity: 0 });
    layer.appendChild(ball);
    const dur = 1.2 + Math.random() * 0.7;
    const delay = Math.random() * 2;
    const tl = gsap.timeline({ delay, onComplete: () => ball.remove() });
    tl.to(ball, { attr: { opacity: 0.95 }, duration: 0.1 });
    tl.to(ball, { attr: { cy: vy + vh + 5 }, duration: dur, ease: 'sine.in' }, '<');
    tl.to(ball, { attr: { opacity: 0 }, duration: 0.2 }, '-=0.2');
  }
}

/** fx:rain-sheet — dense rain wall, denser than fxRain. */
function fxRainSheet(svg: SVGSVGElement, _data: any = {}) {
  fxRain(svg, { count: 110, durationS: 5.5 });
}

/** fx:fog-roll — fog entering from a side. */
function fxFogRoll(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const fog = svgEl('rect', { x: vx - vw, y: vy, width: vw, height: vh, fill: '#b8b8c0', opacity: 0, filter: 'blur(2.5px)' });
  layer.appendChild(fog);
  const tl = gsap.timeline({ onComplete: () => fog.remove() });
  tl.to(fog, { attr: { opacity: 0.45, x: vx }, duration: 3.5, ease: 'sine.out' });
  tl.to(fog, { attr: { opacity: 0, x: vx + vw }, duration: 4.5, ease: 'sine.in' });
}

/** fx:mist-rise — mist rising from ground (lakes/rivers). */
function fxMistRise(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  for (let i = 0; i < 6; i++) {
    const ox = (Math.random() - 0.5) * 14;
    const e = svgEl('ellipse', { cx: x + ox, cy: y + 4, rx: 4 + Math.random() * 2, ry: 1.4, fill: '#cfd6dc', opacity: 0, filter: 'blur(1px)' });
    layer.appendChild(e);
    const tl = gsap.timeline({ delay: i * 0.25, onComplete: () => e.remove() });
    tl.to(e, { attr: { opacity: 0.55 }, duration: 0.6 });
    tl.to(e, { attr: { cy: y - 12, rx: 7, opacity: 0 }, duration: 2.4, ease: 'sine.out' }, '<');
  }
}

/** fx:wind-streaks — fast wind lines across the scene. */
function fxWindStreaks(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  for (let i = 0; i < 18; i++) {
    const sy = vy + Math.random() * vh;
    const len = 18 + Math.random() * 22;
    const line = svgEl('line', { x1: vx - len, y1: sy, x2: vx, y2: sy, stroke: '#e0e0e0', 'stroke-width': 0.4, opacity: 0 });
    layer.appendChild(line);
    const tl = gsap.timeline({ delay: i * 0.04, onComplete: () => line.remove() });
    tl.to(line, { attr: { opacity: 0.6 }, duration: 0.1 });
    tl.to(line, { attr: { x1: vx + vw, x2: vx + vw + len, opacity: 0 }, duration: 1.0 + Math.random() * 0.4, ease: 'sine.in' });
  }
}

/** fx:sandstorm-major — heavier wrapper of triggerSandstorm. */
function fxSandstormMajor(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  triggerSandstorm(svg, [t], { count: 220, duration: 6.0, windStrength: 32 });
  // overlay haze
  const layer = getFxLayer(svg);
  const rect = viewBoxRect(svg, '#c9b48a');
  layer.appendChild(rect);
  gsap.to(rect, { attr: { opacity: 0.35 }, duration: 1.2, ease: 'sine.inOut' });
  gsap.to(rect, { attr: { opacity: 0 }, duration: 2.0, delay: 4.5, ease: 'sine.in', onComplete: () => rect.remove() });
}

/** fx:heat-shimmer — turbulence distortion over horizon. */
function fxHeatShimmer(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const defs = getDefs(svg);
  const fid = 'narration-fx-heat-shim';
  if (!svg.querySelector(`#${fid}`)) {
    const f = svgEl('filter', { id: fid, x: '0%', y: '0%', width: '100%', height: '100%' });
    f.innerHTML = `<feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="3"/>`;
    defs.appendChild(f);
  }
  const rect = svgEl('rect', { x: vx, y: vy + vh * 0.55, width: vw, height: vh * 0.45, fill: '#ffd866', opacity: 0, filter: `url(#${fid})` });
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { opacity: 0.2 }, duration: 1.2 });
  tl.to({}, { duration: 3.0 });
  tl.to(rect, { attr: { opacity: 0 }, duration: 1.4 });
}

/** fx:meteor-strike — single meteor with tail. */
function fxMeteorStrike(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const sx = vx + vw * 0.2;
  const sy = vy + 8;
  const ex = vx + vw * 0.7;
  const ey = vy + vh * 0.7;
  const glow = ensureGlowFilter(svg, 'meteor-glow', 1.6);
  const tail = svgEl('line', { x1: sx, y1: sy, x2: sx - 6, y2: sy - 4, stroke: '#ffd866', 'stroke-width': 1.2, opacity: 0, filter: glow });
  const meteor = svgEl('circle', { cx: sx, cy: sy, r: 1.6, fill: '#fff6d0', filter: glow, opacity: 0 });
  layer.appendChild(tail); layer.appendChild(meteor);
  const path = { t: 0 };
  gsap.to(meteor, { attr: { opacity: 1 }, duration: 0.2 });
  gsap.to(tail, { attr: { opacity: 1 }, duration: 0.2 });
  gsap.to(path, { t: 1, duration: 1.4, ease: 'power2.in', onUpdate: () => {
    const cx = sx + (ex - sx) * path.t;
    const cy = sy + (ey - sy) * path.t;
    meteor.setAttribute('cx', String(cx)); meteor.setAttribute('cy', String(cy));
    tail.setAttribute('x1', String(cx)); tail.setAttribute('y1', String(cy));
    tail.setAttribute('x2', String(cx - 10)); tail.setAttribute('y2', String(cy - 8));
  }, onComplete: () => {
    // impact flash
    const flash = svgEl('circle', { cx: ex, cy: ey, r: 0, fill: '#ffd866', opacity: 1, filter: glow });
    layer.appendChild(flash);
    gsap.to(flash, { attr: { r: 14, opacity: 0 }, duration: 0.8, ease: 'sine.out', onComplete: () => flash.remove() });
    meteor.remove(); tail.remove();
  } });
}

/** fx:meteor-shower — multiple meteors. */
function fxMeteorShower(svg: SVGSVGElement, _data: any = {}) {
  for (let i = 0; i < 5; i++) setTimeout(() => fxMeteorStrike(svg), i * 350);
}

/** fx:lightning-storm — multiple lightning bolts in cascade. */
function fxLightningStorm(svg: SVGSVGElement, _data: any = {}) {
  const [vx, vy, vw, vh] = getViewBox(svg);
  for (let i = 0; i < 4; i++) {
    const fx2 = vx + Math.random() * vw;
    const fy = vy + 10;
    const tx = fx2 + (Math.random() - 0.5) * 30;
    const ty = vy + vh * (0.5 + Math.random() * 0.4);
    setTimeout(() => fxLightningStrike(svg, { from: [fx2, fy], to: [tx, ty] }), i * 600);
  }
}

/** fx:thunder-flash — quick white flash + shake. */
function fxThunderFlash(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const rect = viewBoxRect(svg, '#ffffff');
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { opacity: 0.7 }, duration: 0.08 });
  tl.to(rect, { attr: { opacity: 0 }, duration: 0.4, ease: 'sine.in' });
  // mild shake of marker
  if (currentEventId) {
    const m = svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`);
    if (m) fxEarthquakeShake(svg, { intensity: 1.5 });
  }
}

/** fx:earthquake-major — strong shake of the whole SVG. */
function fxEarthquakeMajor(svg: SVGSVGElement, _data: any = {}) {
  fxEarthquakeShake(svg, { intensity: 5 });
  // cracks across
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  for (let i = 0; i < 3; i++) {
    const y0 = vy + vh * (0.3 + i * 0.2);
    const pts = [`${vx},${y0}`];
    for (let s = 1; s <= 6; s++) {
      pts.push(`${vx + (vw * s) / 6},${y0 + (Math.random() - 0.5) * 6}`);
    }
    const line = svgEl('polyline', { points: pts.join(' '), fill: 'none', stroke: '#1a0f08', 'stroke-width': 0.6, opacity: 0 });
    layer.appendChild(line);
    const tl = gsap.timeline({ delay: 0.4 + i * 0.2, onComplete: () => line.remove() });
    tl.to(line, { attr: { opacity: 0.7 }, duration: 0.4 });
    tl.to({}, { duration: 1.8 });
    tl.to(line, { attr: { opacity: 0 }, duration: 1.4 });
  }
}

/** fx:divine-light-beam — vertical golden beam from heaven to target. */
function fxDivineLightBeam(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const [, vy] = getViewBox(svg);
  const glow = ensureGlowFilter(svg, 'beam-glow', 2.4);
  const beam = svgEl('polygon', { points: `${x - 1.5},${vy} ${x + 1.5},${vy} ${x + 8},${y} ${x - 8},${y}`, fill: '#ffd866', opacity: 0, filter: glow });
  layer.appendChild(beam);
  const tl = gsap.timeline({ onComplete: () => beam.remove() });
  tl.to(beam, { attr: { opacity: 0.7 }, duration: 0.8, ease: 'sine.out' });
  tl.to({}, { duration: 1.5 });
  tl.to(beam, { attr: { opacity: 0 }, duration: 1.6, ease: 'sine.in' });
}

/** fx:incense-spiral — spiral of smoke rising. */
function fxIncenseSpiral(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const pts: string[] = [];
  for (let i = 0; i < 24; i++) {
    const tt = i / 23;
    const r = 1 + tt * 2.5;
    const a = tt * Math.PI * 4;
    pts.push(`${(x + Math.cos(a) * r).toFixed(2)},${(y - tt * 18).toFixed(2)}`);
  }
  const path = svgEl('polyline', { points: pts.join(' '), fill: 'none', stroke: '#8a7250', 'stroke-width': 0.6, opacity: 0, filter: 'blur(0.6px)' });
  layer.appendChild(path);
  const tl = gsap.timeline({ onComplete: () => path.remove() });
  tl.to(path, { attr: { opacity: 0.7 }, duration: 0.6 });
  tl.to(path, { attr: { transform: 'translate(0, -4)', opacity: 0 }, duration: 2.6, ease: 'sine.out' });
}

/** fx:smoke-column — thick column of dark smoke. */
function fxSmokeColumn(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  for (let i = 0; i < 8; i++) {
    const e = svgEl('ellipse', { cx: x + (Math.random() - 0.5) * 4, cy: y, rx: 3 + Math.random() * 2, ry: 2, fill: '#3a3a3a', opacity: 0, filter: 'blur(1px)' });
    layer.appendChild(e);
    const tl = gsap.timeline({ delay: i * 0.2, onComplete: () => e.remove() });
    tl.to(e, { attr: { opacity: 0.7 }, duration: 0.4 });
    tl.to(e, { attr: { cy: y - 26, rx: 6, opacity: 0 }, duration: 3.5, ease: 'power2.out' }, '<');
  }
}

/** fx:dust-pillar — pillar of dust by day (Exodus column). */
function fxDustPillar(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'dustpillar-glow', 1.4);
  const pillar = svgEl('polygon', { points: `${x - 2},${y} ${x + 2},${y} ${x + 5},${y - 30} ${x - 5},${y - 30}`, fill: '#c9b48a', opacity: 0, filter: glow });
  layer.appendChild(pillar);
  const tl = gsap.timeline({ onComplete: () => pillar.remove() });
  tl.to(pillar, { attr: { opacity: 0.85 }, duration: 0.9, ease: 'sine.out' });
  tl.to({}, { duration: 2.0 });
  tl.to(pillar, { attr: { opacity: 0 }, duration: 1.6, ease: 'sine.in' });
}

/** fx:cloud-pillar — pillar of cloud by night. */
function fxCloudPillar(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const pillar = svgEl('polygon', { points: `${x - 3},${y} ${x + 3},${y} ${x + 6},${y - 30} ${x - 6},${y - 30}`, fill: '#cfd6dc', opacity: 0, filter: 'blur(1.2px)' });
  layer.appendChild(pillar);
  const tl = gsap.timeline({ onComplete: () => pillar.remove() });
  tl.to(pillar, { attr: { opacity: 0.9 }, duration: 1.0, ease: 'sine.out' });
  tl.to({}, { duration: 2.0 });
  tl.to(pillar, { attr: { opacity: 0 }, duration: 1.6, ease: 'sine.in' });
}

// ─── C.4 CINEMATIC ────────────────────────────────────────────────────────

/** fx:vignette-pulse — radial vignette to darken edges. */
function fxVignettePulse(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const defs = getDefs(svg);
  const gradId = 'narration-fx-vignette';
  if (!svg.querySelector(`#${gradId}`)) {
    const g = svgEl('radialGradient', { id: gradId, cx: '50%', cy: '50%', r: '78%' });
    // Softer falloff — clear centre, smooth gradient to warm-dark edges.
    g.innerHTML = `<stop offset="0.4" stop-color="#000000" stop-opacity="0"/><stop offset="0.78" stop-color="#0c0805" stop-opacity="0.35"/><stop offset="1" stop-color="#000000" stop-opacity="0.72"/>`;
    defs.appendChild(g);
  }
  const rect = svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill: `url(#${gradId})`, opacity: 0 });
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { opacity: 0.7 }, duration: 1.6, ease: 'sine.inOut' });
  tl.to({}, { duration: 2.0 });
  tl.to(rect, { attr: { opacity: 0 }, duration: 1.8, ease: 'sine.inOut' });
}

/** fx:flash-white — short white flash. */
function fxFlashWhite(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  // Radial flash centred on the active marker (or viewport centre) so the
  // bloom feels like it's coming FROM the action, not a TV white-out.
  const m = currentEventId ? svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`) : null;
  let cx = vx + vw / 2, cy = vy + vh / 2;
  if (m) { const t = m.getAttribute('transform') ?? ''; const [tx, ty] = parseTranslate(t); cx = tx; cy = ty; }
  const defs = getDefs(svg);
  const gradId = 'narration-fx-flash';
  if (!svg.querySelector(`#${gradId}`)) {
    const g = svgEl('radialGradient', { id: gradId, cx: '50%', cy: '50%', r: '70%' });
    g.innerHTML = `<stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="0.45" stop-color="#fff5c8" stop-opacity="0.85"/><stop offset="1" stop-color="#ffd866" stop-opacity="0"/>`;
    defs.appendChild(g);
  }
  const rect = svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill: `url(#${gradId})`, opacity: 0 });
  // Position the gradient centre on the marker via CSS transform.
  rect.style.transformBox = 'fill-box';
  rect.style.transformOrigin = `${((cx - vx) / vw) * 100}% ${((cy - vy) / vh) * 100}%`;
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { opacity: 0.95 }, duration: 0.1, ease: 'power3.out' });
  tl.to(rect, { attr: { opacity: 0 }, duration: 0.7, ease: 'sine.in' });
}

/** fx:fade-to-black — slow fade to black (deaths, era endings). */
function fxFadeToBlack(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const defs = getDefs(svg);
  // Radial vignette overlay — warm-dark in centre, almost-black on edges.
  // Reads as a deepening sepia rather than a brutal black wipe.
  const gradId = 'narration-fx-fadeblack';
  if (!svg.querySelector(`#${gradId}`)) {
    const g = svgEl('radialGradient', { id: gradId, cx: '50%', cy: '50%', r: '75%' });
    g.innerHTML = `<stop offset="0" stop-color="#1a0f08" stop-opacity="0.55"/><stop offset="0.55" stop-color="#0c0805" stop-opacity="0.75"/><stop offset="1" stop-color="#000000" stop-opacity="0.92"/>`;
    defs.appendChild(g);
  }
  const rect = svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill: `url(#${gradId})`, opacity: 0 });
  layer.appendChild(rect);
  const tl = gsap.timeline({ onComplete: () => rect.remove() });
  tl.to(rect, { attr: { opacity: 0.9 }, duration: 2.8, ease: 'power1.in' });
  tl.to({}, { duration: 1.4 });
  tl.to(rect, { attr: { opacity: 0 }, duration: 2.0, ease: 'sine.out' });
}

/** fx:fade-from-black — fade from black (births, awakenings). */
function fxFadeFromBlack(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const rect = viewBoxRect(svg, '#000000', 0.85);
  layer.appendChild(rect);
  gsap.to(rect, { attr: { opacity: 0 }, duration: 2.4, ease: 'sine.out', onComplete: () => rect.remove() });
}

/** fx:zoom-pulse — slight zoom-in-zoom-out on the active marker. */
function fxZoomPulse(svg: SVGSVGElement, _data: any = {}) {
  if (!currentEventId) return;
  const m = svg.querySelector<SVGGElement>(`[data-marker="${currentEventId}"]`);
  if (!m) return;
  const t = m.getAttribute('transform') ?? '';
  const [bx, by] = parseTranslate(t);
  const tl = gsap.timeline({ onComplete: () => { if (t) m.setAttribute('transform', t); else m.removeAttribute('transform'); } });
  tl.to(m, { attr: { transform: `translate(${bx}, ${by}) scale(1.15)` }, duration: 0.8, ease: 'sine.inOut' });
  tl.to(m, { attr: { transform: `translate(${bx}, ${by}) scale(1)` }, duration: 1.0, ease: 'sine.inOut' });
}

/** fx:slow-motion — slow GSAP global timescale temporarily. */
function fxSlowMotion(_svg: SVGSVGElement, data: { duration?: number } = {}) {
  const dur = (data.duration ?? 2.5) * 1000;
  const prev = gsap.globalTimeline.timeScale();
  gsap.globalTimeline.timeScale(0.4);
  setTimeout(() => gsap.globalTimeline.timeScale(prev), dur);
}

/** fx:silhouette-horizon — distant figure silhouette appearing on horizon. */
function fxSilhouetteHorizon(svg: SVGSVGElement, _data: any = {}) {
  const layer = getFxLayer(svg);
  const [vx, vy, vw, vh] = getViewBox(svg);
  const cx = vx + vw * 0.5;
  const cy = vy + vh * 0.7;
  const g = svgEl('g', { transform: `translate(${cx}, ${cy})`, opacity: 0 });
  g.appendChild(svgEl('circle', { cx: 0, cy: -3, r: 0.8, fill: '#1a0f08' }));
  g.appendChild(svgEl('path', { d: 'M -1 -2 L -1 3 L 1 3 L 1 -2 Z', fill: '#1a0f08' }));
  layer.appendChild(g);
  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { opacity: 0.85 }, duration: 1.5, ease: 'sine.out' });
  tl.to({}, { duration: 2.0 });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.4, ease: 'sine.in' });
}

/** fx:char-clash — two pins lurch at each other, brief weapon-spark
 *  between them, then the "loser" recedes. Used for conflicts
 *  (David↔Goliat, Caín↔Abel, Moisés↔Faraón). data: { fromPinIdx,
 *  toPinIdx, loserPinIdx? }. Implements the motion-meaning rule:
 *  the gesture itself describes the conflict. */
function fxCharClash(svg: SVGSVGElement, data: { fromPinIdx: number; toPinIdx: number; loserPinIdx?: number } = { fromPinIdx: 0, toPinIdx: 1 }) {
  const a = getPinAt(svg, data.fromPinIdx);
  const b = getPinAt(svg, data.toPinIdx);
  if (!a || !b) return;
  const [ax, ay] = parseTranslate(a.getAttribute('transform'));
  const [bx, by] = parseTranslate(b.getAttribute('transform'));
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const lunge = Math.min(6, dist * 0.35);
  // Move A toward B and B toward A — collision blocking.
  const tlA = gsap.timeline();
  tlA.to(a, { attr: { transform: `translate(${ax + ux * lunge}, ${ay + uy * lunge})` }, duration: 0.35, ease: 'power3.in' });
  tlA.to(a, { attr: { transform: `translate(${ax - ux * 2}, ${ay - uy * 2})` }, duration: 0.4, ease: 'back.out(2)' });
  tlA.to(a, { attr: { transform: `translate(${ax}, ${ay})` }, duration: 0.6, ease: 'sine.inOut' });

  const tlB = gsap.timeline();
  tlB.to(b, { attr: { transform: `translate(${bx - ux * lunge}, ${by - uy * lunge})` }, duration: 0.35, ease: 'power3.in' });
  tlB.to(b, { attr: { transform: `translate(${bx + ux * 2}, ${by + uy * 2})` }, duration: 0.4, ease: 'back.out(2)' });
  tlB.to(b, { attr: { transform: `translate(${bx}, ${by})` }, duration: 0.6, ease: 'sine.inOut' });

  // Weapon spark at midpoint (sword-strike line + tiny flash).
  const layer = getFxLayer(svg);
  const marker = a.closest('[data-marker]') as SVGGElement | null;
  const [mx, my] = parseTranslate(marker?.getAttribute('transform') ?? null);
  const mid = { x: mx + (ax + bx) / 2, y: my + (ay + by) / 2 };
  const sparkLine = svgEl('line', {
    x1: mx + ax, y1: my + ay, x2: mx + bx, y2: my + by,
    stroke: '#ffffff', 'stroke-width': 0.6, 'stroke-linecap': 'round', opacity: 0,
  });
  layer.appendChild(sparkLine);
  const spark = svgEl('circle', { cx: mid.x, cy: mid.y, r: 0, fill: '#fff5c8', opacity: 0 });
  layer.appendChild(spark);
  const sparkTl = gsap.timeline({ onComplete: () => { sparkLine.remove(); spark.remove(); } });
  sparkTl.to(sparkLine, { attr: { opacity: 0.9 }, duration: 0.06 }, 0.32);
  sparkTl.to(spark, { attr: { r: 3, opacity: 1 }, duration: 0.12, ease: 'expo.out' }, 0.32);
  sparkTl.to(sparkLine, { attr: { opacity: 0 }, duration: 0.4, ease: 'sine.in' }, 0.45);
  sparkTl.to(spark, { attr: { r: 6, opacity: 0 }, duration: 0.55, ease: 'sine.in' }, 0.45);

  // Loser recedes after the clash (defaults to pinB).
  const loserIdx = data.loserPinIdx ?? data.toPinIdx;
  setTimeout(() => fxCharacterRecede(svg, { pinIdx: loserIdx }), 800);
}

/** fx:char-embrace — two pins drift toward each other, share a warm
 *  glow at the meeting point, then return to base. Used for
 *  reconciliations (José↔hermanos, padre prodigo, Jacob↔Esaú). */
function fxCharEmbrace(svg: SVGSVGElement, data: { fromPinIdx: number; toPinIdx: number } = { fromPinIdx: 0, toPinIdx: 1 }) {
  const a = getPinAt(svg, data.fromPinIdx);
  const b = getPinAt(svg, data.toPinIdx);
  if (!a || !b) return;
  const [ax, ay] = parseTranslate(a.getAttribute('transform'));
  const [bx, by] = parseTranslate(b.getAttribute('transform'));
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  // Move halfway toward each other, hold, drift back.
  const meet = Math.min(dist * 0.42, 6);
  const tlA = gsap.timeline();
  tlA.to(a, { attr: { transform: `translate(${ax + ux * meet}, ${ay + uy * meet})` }, duration: 1.2, ease: 'sine.inOut' });
  tlA.to({}, { duration: 1.4 });
  tlA.to(a, { attr: { transform: `translate(${ax}, ${ay})` }, duration: 1.2, ease: 'sine.inOut' });

  const tlB = gsap.timeline();
  tlB.to(b, { attr: { transform: `translate(${bx - ux * meet}, ${by - uy * meet})` }, duration: 1.2, ease: 'sine.inOut' });
  tlB.to({}, { duration: 1.4 });
  tlB.to(b, { attr: { transform: `translate(${bx}, ${by})` }, duration: 1.2, ease: 'sine.inOut' });

  // Warm glow at the meeting point.
  const layer = getFxLayer(svg);
  const marker = a.closest('[data-marker]') as SVGGElement | null;
  const [mx, my] = parseTranslate(marker?.getAttribute('transform') ?? null);
  const cx = mx + (ax + bx) / 2;
  const cy = my + (ay + by) / 2;
  const glowFx = ensureGlowFilter(svg, 'embrace-glow', 2.4);
  const glow = svgEl('circle', { cx, cy, r: 0, fill: '#ffd866', opacity: 0, filter: glowFx });
  layer.appendChild(glow);
  const tlGlow = gsap.timeline({ onComplete: () => glow.remove() });
  tlGlow.to(glow, { attr: { r: 6, opacity: 0.65 }, duration: 1.0, ease: 'sine.out' }, 0.6);
  tlGlow.to(glow, { attr: { r: 9, opacity: 0.85 }, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' });
  tlGlow.to(glow, { attr: { r: 12, opacity: 0 }, duration: 1.2, ease: 'sine.in' });
}

/** fx:forbidden-fruit — apple/fig on a leafy branch (Edén). */
function fxForbiddenFruit(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'fruit-glow', 1.4);
  const g = svgEl('g', { transform: `translate(${x}, ${y}) scale(0)`, opacity: '0' });
  // Branch
  g.appendChild(svgEl('path', { d: 'M -10 -4 Q -4 -2 0 0', fill: 'none', stroke: '#5a3a18', 'stroke-width': 0.7, 'stroke-linecap': 'round' }));
  // Stem
  g.appendChild(svgEl('line', { x1: 0, y1: 0, x2: 0, y2: 2, stroke: '#5a3a18', 'stroke-width': 0.6 }));
  // Two leaves
  g.appendChild(svgEl('ellipse', { cx: -3, cy: -2, rx: 3, ry: 1.4, fill: '#3a7a30', transform: 'rotate(-30 -3 -2)' }));
  g.appendChild(svgEl('ellipse', { cx: -7, cy: -3.5, rx: 2.5, ry: 1.2, fill: '#2e6028', transform: 'rotate(-20 -7 -3.5)' }));
  // Apple body — main fruit
  g.appendChild(svgEl('circle', { cx: 0, cy: 4, r: 3.4, fill: '#c02020', stroke: '#601010', 'stroke-width': 0.4, filter: glow }));
  // Highlight on the apple
  g.appendChild(svgEl('ellipse', { cx: -1.2, cy: 2.8, rx: 1.0, ry: 0.6, fill: '#ff8866', opacity: 0.7 }));
  // Tiny leaf at top of apple
  g.appendChild(svgEl('path', { d: 'M 0 1 Q 1.4 0.2 2.2 1.2 Q 1.4 1.6 0 1 Z', fill: '#3a7a30' }));
  layer.appendChild(g);

  const tl = gsap.timeline({ onComplete: () => g.remove() });
  tl.to(g, { attr: { transform: `translate(${x}, ${y}) scale(1.6)`, opacity: 1 }, duration: 0.6, ease: 'back.out(1.6)' });
  tl.to({}, { duration: 1.8 });
  tl.to(g, { attr: { opacity: 0 }, duration: 1.2, ease: 'sine.in' });
}

/** fx:radial-bloom — bright radial bloom centered on target (epiphanies). */
function fxRadialBloom(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  const glow = ensureGlowFilter(svg, 'bloom-glow', 2.0);
  // 4 short rays of glory — NOT a big concentric ring set. Reads as a
  // momentary holy-light burst, not a planet-sized circle.
  const rays: SVGLineElement[] = [];
  for (let i = 0; i < 4; i++) {
    const ang = (i * Math.PI * 2) / 4 + Math.PI / 4;
    const sx = x + Math.cos(ang) * 5;
    const sy = y + Math.sin(ang) * 5;
    const ln = svgEl('line', { x1: sx, y1: sy, x2: sx, y2: sy, stroke: '#fff5c8', 'stroke-width': 1.2, 'stroke-linecap': 'round', opacity: 0, filter: glow });
    layer.appendChild(ln); rays.push(ln);
  }
  // Single small core flash (no outer halo, no shockwave ring).
  const core = svgEl('circle', { cx: x, cy: y, r: 0, fill: '#fff5c8', opacity: 0, filter: glow });
  layer.appendChild(core);
  const tl = gsap.timeline({ onComplete: () => { core.remove(); rays.forEach((r) => r.remove()); } });
  tl.to(core, { attr: { r: 8, opacity: 0.95 }, duration: 0.22, ease: 'expo.out' }, 0);
  rays.forEach((ln, i) => {
    const ang = (i * Math.PI * 2) / 4 + Math.PI / 4;
    const ex = x + Math.cos(ang) * 18;
    const ey = y + Math.sin(ang) * 18;
    tl.to(ln, { attr: { x2: ex, y2: ey, opacity: 0.85 }, duration: 0.32, ease: 'expo.out' }, 0.04);
    tl.to(ln, { attr: { opacity: 0 }, duration: 0.7, ease: 'sine.in' }, 0.45);
  });
  tl.to(core, { attr: { r: 14, opacity: 0 }, duration: 0.9, ease: 'sine.in' }, 0.25);
}

/** fx:shockwave — expanding ring (earthquake, explosion). */
function fxShockwave(svg: SVGSVGElement, data: { position?: [number, number]; pinIdx?: number } = {}) {
  const t = targetOrMarker(svg, data);
  if (!t) return;
  const [x, y] = t;
  const layer = getFxLayer(svg);
  for (let i = 0; i < 3; i++) {
    const r = svgEl('circle', { cx: x, cy: y, r: 4, fill: 'none', stroke: '#ffd866', 'stroke-width': 1.4, opacity: 0 });
    layer.appendChild(r);
    const tl = gsap.timeline({ delay: i * 0.15, onComplete: () => r.remove() });
    tl.to(r, { attr: { r: 22, opacity: 0.8 }, duration: 0.4, ease: 'expo.out' });
    tl.to(r, { attr: { r: 56, opacity: 0, 'stroke-width': 0.2 }, duration: 1.4, ease: 'sine.in' });
  }
}

// ---------------------------------------------------------------------------
// Public init
// ---------------------------------------------------------------------------

let inited = false;

export function initNarrationFx(svg: SVGSVGElement): void {
  if (inited) return;
  inited = true;

  // Track the active scene so pinIdx-only cues know which marker to use.
  window.addEventListener('timeline:scene-changed', (e: Event) => {
    const detail = (e as CustomEvent<{ eventId?: string }>).detail;
    if (detail?.eventId) currentEventId = detail.eventId;
  });

  window.addEventListener('timeline:cue', (e: Event) => {
    const detail = (e as CustomEvent<{ eventId?: string; cueId?: string; data?: any }>)
      .detail;
    if (!detail || !detail.cueId) return;
    const { cueId, eventId, data = {} } = detail;

    // If the cue carries its own eventId, prefer it for pin lookups.
    const prevEventId = currentEventId;
    if (eventId) currentEventId = eventId;

    try {
      switch (cueId) {
        case 'fx:dust-burst':
          fxDustBurst(svg, data);
          break;
        case 'fx:character-emerge':
          fxCharacterEmerge(svg, data);
          break;
        case 'fx:character-recede':
          fxCharacterRecede(svg, data);
          break;
        case 'fx:glow-pulse':
          fxGlowPulse(svg, data);
          break;
        case 'fx:water-wave':
          fxWaterWave(svg, data);
          break;
        case 'fx:fire-flicker':
          fxFireFlicker(svg, data);
          break;
        case 'fx:lightning-strike':
          fxLightningStrike(svg, data);
          break;
        case 'fx:tradition-badge':
          fxTraditionBadge(data);
          break;
        case 'fx:rain':
          fxRain(svg, data);
          break;
        case 'fx:smoke-rise':
          fxSmokeRise(svg, data);
          break;
        case 'fx:earthquake-shake':
          fxEarthquakeShake(svg, data);
          break;
        case 'fx:blood-stain':
          fxBloodStain(svg, data);
          break;
        case 'fx:journey-trace':
          fxJourneyTrace(svg, data);
          break;
        case 'fx:halo-divine':
          fxHaloDivine(svg, data);
          break;
        case 'fx:dove-flight':
          fxDoveFlight(svg, data);
          break;
        case 'fx:idol-shatter':
          fxIdolShatter(svg, data);
          break;
        case 'fx:plague-swarm':
          fxPlagueSwarm(svg, data);
          break;
        case 'fx:walls-fall':
          fxWallsFall(svg, data);
          break;
        case 'fx:burning-bush':
          fxBurningBush(svg, data);
          break;
        case 'fx:forbidden-fruit':
          fxForbiddenFruit(svg, data);
          break;
        case 'fx:char-clash':
          fxCharClash(svg, data);
          break;
        case 'fx:char-embrace':
          fxCharEmbrace(svg, data);
          break;
        case 'fx:stone-tablets':
          fxStoneTablets(svg, data);
          break;
        case 'fx:scroll-unfurl':
          fxScrollUnfurl(svg, data);
          break;
        case 'fx:angel-descent':
          fxAngelDescent(svg, data);
          break;
        case 'fx:serpent':
          fxSerpent(svg, data);
          break;
        case 'fx:golden-calf':
          fxGoldenCalf(svg, data);
          break;
        case 'fx:ark-boat':
          fxArkBoat(svg, data);
          break;
        case 'fx:tower-babel':
          fxTowerBabel(svg, data);
          break;
        case 'fx:sword-strike':
          fxSwordStrike(svg, data);
          break;
        case 'fx:fish-multiply':
          fxFishMultiply(svg, data);
          break;
        case 'fx:bread-multiply':
          fxBreadMultiply(svg, data);
          break;
        case 'fx:cross-rise':
          fxCrossRise(svg, data);
          break;
        case 'fx:lamp-glow':
          fxLampGlow(svg, data);
          break;
        case 'fx:well':
          fxWell(svg, data);
          break;
        case 'fx:mountain-glow':
          fxMountainGlow(svg, data);
          break;
        case 'fx:ladder':
          fxLadder(svg, data);
          break;
        case 'fx:ram':
          fxRam(svg, data);
          break;
        case 'fx:star-bethlehem':
          fxStarBethlehem(svg, data);
          break;
        case 'fx:chalice':
          fxChalice(svg, data);
          break;
        case 'fx:manna-fall':
          fxMannaFall(svg, data);
          break;
        case 'fx:pillar-of-fire':
          fxPillarOfFire(svg, data);
          break;
        case 'fx:parted-waters':
          fxPartedWaters(svg, data);
          break;
        // ─── Extended C.1 figurative ─────────────────────────────────
        case 'fx:animate-scene-object':
          fxAnimateSceneObject(svg, data);
          break;
        case 'fx:caravan':
          fxCaravan(svg, data);
          break;
        case 'fx:throne':
          fxThrone(svg, data);
          break;
        case 'fx:crown-descent':
          fxCrownDescent(svg, data);
          break;
        case 'fx:fire-from-heaven':
          fxFireFromHeaven(svg, data);
          break;
        case 'fx:bowing-crowd':
          fxBowingCrowd(svg, data);
          break;
        case 'fx:trumpet-blast':
          fxTrumpetBlast(svg, data);
          break;
        case 'fx:angel-formation':
          fxAngelFormation(svg, data);
          break;
        case 'fx:tablets-shatter':
          fxTabletsShatter(svg, data);
          break;
        case 'fx:moon-split':
          fxMoonSplit(svg, data);
          break;
        case 'fx:kaaba-pulse':
          fxKaabaPulse(svg, data);
          break;
        case 'fx:tongue-of-flame':
          fxTongueOfFlame(svg, data);
          break;
        case 'fx:crown-of-thorns':
          fxCrownOfThorns(svg, data);
          break;
        case 'fx:fish-school':
          fxFishSchool(svg, data);
          break;
        case 'fx:plague-locust':
          fxPlagueLocust(svg, data);
          break;
        case 'fx:plague-frogs':
          fxPlagueFrogs(svg, data);
          break;
        case 'fx:plague-darkness':
          fxPlagueDarkness(svg, data);
          break;
        case 'fx:rolling-stone':
          fxRollingStone(svg, data);
          break;
        case 'fx:tomb-empty':
          fxTombEmpty(svg, data);
          break;
        case 'fx:resurrection-light':
          fxResurrectionLight(svg, data);
          break;
        case 'fx:divine-hand':
          fxDivineHand(svg, data);
          break;
        case 'fx:sword-clash':
          fxSwordClash(svg, data);
          break;
        case 'fx:lion-roar':
          fxLionRoar(svg, data);
          break;
        case 'fx:wolf-prowl':
          fxWolfProwl(svg, data);
          break;
        case 'fx:eagle-soar':
          fxEagleSoar(svg, data);
          break;
        case 'fx:raven-flight':
          fxRavenFlight(svg, data);
          break;
        case 'fx:horse-gallop':
          fxHorseGallop(svg, data);
          break;
        case 'fx:camel-train':
          fxCamelTrain(svg, data);
          break;
        case 'fx:goat-herd':
          fxGoatHerd(svg, data);
          break;
        case 'fx:donkey-walk':
          fxDonkeyWalk(svg, data);
          break;
        case 'fx:locust-cloud':
          fxLocustCloud(svg, data);
          break;
        case 'fx:frog-rain':
          fxFrogRain(svg, data);
          break;
        case 'fx:scorpion-skitter':
          fxScorpionSkitter(svg, data);
          break;
        case 'fx:whale-breach':
          fxWhaleBreach(svg, data);
          break;
        // ─── Extended C.2 atmospheric one-shot ───────────────────────
        case 'fx:dawn-break':
          fxDawnBreak(svg, data);
          break;
        case 'fx:dusk-fall':
          fxDuskFall(svg, data);
          break;
        case 'fx:night-fall':
          fxNightFall(svg, data);
          break;
        case 'fx:starfield-shimmer':
          fxStarfieldShimmer(svg, data);
          break;
        case 'fx:starfield-rotate':
          fxStarfieldRotate(svg, data);
          break;
        case 'fx:eclipse-darken':
          fxEclipseDarken(svg, data);
          break;
        case 'fx:moon-bloodred':
          fxMoonBloodred(svg, data);
          break;
        case 'fx:storm-clouds':
          fxStormClouds(svg, data);
          break;
        case 'fx:hailstorm':
          fxHailstorm(svg, data);
          break;
        case 'fx:rain-sheet':
          fxRainSheet(svg, data);
          break;
        case 'fx:fog-roll':
          fxFogRoll(svg, data);
          break;
        case 'fx:mist-rise':
          fxMistRise(svg, data);
          break;
        case 'fx:wind-streaks':
          fxWindStreaks(svg, data);
          break;
        case 'fx:sandstorm-major':
          fxSandstormMajor(svg, data);
          break;
        case 'fx:heat-shimmer':
          fxHeatShimmer(svg, data);
          break;
        case 'fx:meteor-strike':
          fxMeteorStrike(svg, data);
          break;
        case 'fx:meteor-shower':
          fxMeteorShower(svg, data);
          break;
        case 'fx:lightning-storm':
          fxLightningStorm(svg, data);
          break;
        case 'fx:thunder-flash':
          fxThunderFlash(svg, data);
          break;
        case 'fx:earthquake-major':
          fxEarthquakeMajor(svg, data);
          break;
        case 'fx:divine-light-beam':
          fxDivineLightBeam(svg, data);
          break;
        case 'fx:incense-spiral':
          fxIncenseSpiral(svg, data);
          break;
        case 'fx:smoke-column':
          fxSmokeColumn(svg, data);
          break;
        case 'fx:dust-pillar':
          fxDustPillar(svg, data);
          break;
        case 'fx:cloud-pillar':
          fxCloudPillar(svg, data);
          break;
        // ─── Extended C.4 cinematic ──────────────────────────────────
        case 'fx:vignette-pulse':
          fxVignettePulse(svg, data);
          break;
        case 'fx:flash-white':
          fxFlashWhite(svg, data);
          break;
        case 'fx:fade-to-black':
          fxFadeToBlack(svg, data);
          break;
        case 'fx:fade-from-black':
          fxFadeFromBlack(svg, data);
          break;
        case 'fx:zoom-pulse':
          fxZoomPulse(svg, data);
          break;
        case 'fx:slow-motion':
          fxSlowMotion(svg, data);
          break;
        case 'fx:silhouette-horizon':
          fxSilhouetteHorizon(svg, data);
          break;
        case 'fx:radial-bloom':
          fxRadialBloom(svg, data);
          break;
        case 'fx:shockwave':
          fxShockwave(svg, data);
          break;
        default:
          // Unknown cue — silently ignore so the dispatcher can grow.
          break;
      }
    } finally {
      // Restore module state only if the cue was a one-off override. We
      // keep the new eventId if the dispatcher meant it as the new active
      // scene; we revert if it didn't match any cue we handle (no-op).
      if (eventId && !prevEventId) {
        // first event sets it; keep it
      }
    }
  });
}
