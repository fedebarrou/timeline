import { gsap } from './scrollytelling';

/**
 * Sand-storm transition between scenes.
 *
 * Inspired by the hero `LogoParticles` cycle: previous-scene silhouette
 * (markers + pins) DISSOLVES into a turbulent cloud of sand, the cloud
 * REASSEMBLES on the new-scene targets. Single continuous flow, not two
 * separate bursts.
 *
 * Phases (~2.8s total):
 *   0.00–0.20s  particles materialise on the FROM positions (small + fade-in)
 *   0.20–1.00s  disperse: turbulent wind pushes them out radially, scale up
 *   1.00–1.80s  migrate: cloud drifts toward the TO positions, still windy
 *   1.80–2.60s  converge: spring-snap onto TO positions, scale down + fade
 *
 * First call has no `fromTargets` — particles spawn from viewBox edges and
 * only "form" on the new scene (legacy behaviour). Subsequent calls reuse
 * the previously-stored targets as `fromTargets` so the user sees the
 * old silhouette literally turn to sand and drift to the new event.
 */

// Module-level memory of the last scene's particle anchor points.
let lastSandTargets: [number, number][] = [];

interface SandOpts {
  count?: number;
  /** Total duration in seconds. */
  duration?: number;
  /** Wind turbulence amplitude in SVG units. */
  windStrength?: number;
}

interface Particle {
  el: SVGCircleElement;
  /** Wind phase offset so each particle drifts on its own rhythm. */
  phase: number;
  /** Base radius, used to scale up/down. */
  baseR: number;
  /** Source point (where the particle starts / dissolves from). */
  sx: number;
  sy: number;
  /** Mid-storm dispersed position. */
  mx: number;
  my: number;
  /** Destination point (where the particle reforms). */
  tx: number;
  ty: number;
}

export function triggerSandstorm(
  svg: SVGSVGElement,
  toTargets: [number, number][],
  opts: SandOpts = {},
) {
  if (toTargets.length === 0) return;

  const count = opts.count ?? 150;
  const duration = opts.duration ?? 2.2;
  const windStrength = opts.windStrength ?? 22;

  // viewBox is used both as a fallback "edge spawn" source for the first
  // scene activation and to bound stray particles.
  const vb = svg.getAttribute('viewBox')?.split(/\s+|,/).map(Number) ?? [0, 0, 1000, 600];
  const [vbX, vbY, vbW, vbH] = vb;

  // Where does the dust come FROM? Previous scene's targets, or — first
  // activation — the viewBox edges so particles "blow in" like before.
  const haveFrom = lastSandTargets.length > 0;
  const fromTargets: [number, number][] = haveFrom
    ? lastSandTargets.slice()
    : [];

  const ns = 'http://www.w3.org/2000/svg';
  let group = svg.querySelector<SVGGElement>('[data-sandstorm]');
  if (!group) {
    group = document.createElementNS(ns, 'g');
    group.setAttribute('data-sandstorm', '');
    group.setAttribute('pointer-events', 'none');
    svg.appendChild(group);
  }
  // Clear any leftover particles from a previous (perhaps interrupted) run.
  while (group.firstChild) group.removeChild(group.firstChild);

  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const toIdx = i % toTargets.length;
    const target = toTargets[toIdx];

    // Source: either tied to a previous-scene anchor (so we see the OLD
    // silhouette dissolve) or to a viewBox edge (first activation only).
    let sx: number, sy: number;
    if (haveFrom) {
      const src = fromTargets[i % fromTargets.length];
      // Small jitter around the source so the silhouette has texture
      // rather than being a tight cluster of N identical points.
      sx = src[0] + (Math.random() - 0.5) * 6;
      sy = src[1] + (Math.random() - 0.5) * 6;
    } else {
      const fromEdge = Math.random();
      if (fromEdge < 0.25)      { sx = vbX + Math.random() * vbW;       sy = vbY - 10 + Math.random() * 10; }
      else if (fromEdge < 0.5)  { sx = vbX + vbW + Math.random() * 10;  sy = vbY + Math.random() * vbH; }
      else if (fromEdge < 0.75) { sx = vbX + Math.random() * vbW;       sy = vbY + vbH + Math.random() * 10; }
      else                       { sx = vbX - 10 + Math.random() * 10;   sy = vbY + Math.random() * vbH; }
    }

    // Mid-storm dispersed position: push outward from the midpoint between
    // source and target so the cloud genuinely SPREADS rather than slides.
    // Direction is a random unit vector + a bias away from the midpoint
    // (so dispersal looks centrifugal around the silhouette).
    const midX = (sx + target[0]) / 2;
    const midY = (sy + target[1]) / 2;
    const ang = Math.random() * Math.PI * 2;
    const radius = 18 + Math.random() * 28; // SVG units
    const mx = midX + Math.cos(ang) * radius;
    const my = midY + Math.sin(ang) * radius;

    const baseR = 0.18 + Math.random() * 0.35;
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', String(sx));
    circle.setAttribute('cy', String(sy));
    circle.setAttribute('r', String(baseR));
    circle.setAttribute('fill', 'var(--era-primary)');
    circle.setAttribute('opacity', '0');
    group.appendChild(circle);

    particles.push({
      el: circle,
      phase: Math.random() * Math.PI * 2,
      baseR,
      sx, sy,
      mx, my,
      tx: target[0], ty: target[1],
    });
  }

  // Per-particle timeline. We secuence Materialise → Disperse → Migrate →
  // Converge as four `tl.to(...)` segments. Times are FRACTIONS of total
  // duration, scaled at the end.
  const fMaterEnd   = 0.20 / 2.6 * duration; // ~0.20s
  const fDispEnd    = 1.00 / 2.6 * duration; // ~1.00s
  const fMigEnd     = 1.80 / 2.6 * duration; // ~1.80s
  // duration is the end of converge phase.

  for (const p of particles) {
    // Time offset per particle (small stagger) so the silhouette doesn't
    // dissolve in a single hard frame. Caps at ~150ms so the whole
    // sequence still fits in `duration`.
    const stagger = Math.random() * 0.15;

    // Turbulent wind offsets evaluated at a couple of representative moments.
    // We compute these once and reuse via `+=` deltas on the path.
    const wind = (x: number, y: number, t: number) => {
      const wx = Math.sin(y * 0.012 + t * 0.6 + p.phase) * windStrength
               + Math.cos(x * 0.008 - t * 0.4) * windStrength * 0.55;
      const wy = Math.cos(x * 0.011 + t * 0.7 + p.phase * 1.3) * windStrength * 0.7
               + Math.sin(y * 0.009 + t * 0.5) * windStrength * 0.45;
      return [wx, wy];
    };
    // Two waypoint offsets for organic curvature during disperse & migrate.
    const [w1x, w1y] = wind(p.sx, p.sy, 0.4);
    const [w2x, w2y] = wind(p.mx, p.my, 1.2);

    // Disperse target = mid-cloud point + wind offset
    const dispX = p.mx + w1x * 0.4;
    const dispY = p.my + w1y * 0.4;
    // Migrate waypoint = a point between disperse and target, offset by wind
    // so the trajectory curves rather than runs straight.
    const migX = (p.mx + p.tx) / 2 + w2x * 0.5;
    const migY = (p.my + p.ty) / 2 + w2y * 0.5;

    const tl = gsap.timeline({ delay: stagger });

    // 1) Materialise on source (fade in, small size).
    tl.to(p.el, {
      attr: { opacity: 0.55 },
      duration: fMaterEnd,
      ease: 'sine.out',
    }, 0);

    // 2) Disperse — drift outward to mid-cloud position, scale up
    //    (chunks of dust visibly inflate as they spread).
    tl.to(p.el, {
      attr: {
        cx: dispX,
        cy: dispY,
        r: p.baseR * 1.1,
      },
      duration: fDispEnd - fMaterEnd,
      ease: 'power1.inOut',
    }, fMaterEnd);

    // 3) Migrate — cloud as a whole drifts toward the new targets.
    //    Through the migrate waypoint, still windy.
    tl.to(p.el, {
      attr: {
        cx: migX,
        cy: migY,
      },
      duration: (fMigEnd - fDispEnd) * 0.55,
      ease: 'sine.inOut',
    }, fDispEnd);

    // 4) Converge — snap onto the new target, scale down, fade out.
    tl.to(p.el, {
      attr: {
        cx: p.tx,
        cy: p.ty,
        r: p.baseR,
      },
      duration: duration - fMigEnd + (fMigEnd - fDispEnd) * 0.45,
      ease: 'power2.out',
    }, fDispEnd + (fMigEnd - fDispEnd) * 0.55);

    // Fade out at the very end so the cloud "settles" into the marker
    // rather than persisting on top of it.
    tl.to(p.el, {
      attr: { opacity: 0, r: p.baseR * 0.2 },
      duration: 0.45,
      ease: 'sine.in',
    }, duration - 0.45);
  }

  // Remember the new targets so the NEXT call can dissolve from here.
  lastSandTargets = toTargets.slice();

  // Auto-cleanup: remove particle nodes shortly after the animation ends
  // so we don't accumulate detached SVG nodes across many scene changes.
  // We keep the group itself (cheap to reuse).
  const cleanupAfter = (duration + 0.5 + 0.2) * 1000; // +stagger ceiling
  setTimeout(() => {
    if (!group) return;
    while (group.firstChild) group.removeChild(group.firstChild);
  }, cleanupAfter);
}

/**
 * Reset the cached "from" targets — call this when the user navigates to
 * a different page or the map is torn down, so the next first scene
 * activation falls back to the viewBox-edge spawn instead of dissolving
 * from a stale set of points.
 */
export function resetSandstormMemory() {
  lastSandTargets = [];
}
