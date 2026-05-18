/**
 * Sand-storm page transition.
 *
 * The OUT half veils the current page with a fullscreen canvas, paints a
 * dim layer + ~360 era-tinted particles whipped sideways, then navigates
 * via `location.href`. A sessionStorage handshake (`sand-page-transition`)
 * is set before the unload so the next document knows to start covered.
 *
 * The IN half is paired with a synchronous `<head>` script in
 * `BaseLayout.astro` that reads the handshake BEFORE the body renders
 * and adds `html.sand-arriving`. CSS in `SandPageTransition.astro` uses
 * that class to (a) hide every body sibling so the new page never flashes
 * "naked" and (b) make the server-rendered canvas opaque with a CSS dim
 * background. When `maybePlayIn()` runs after DOM load it spawns inflowing
 * particles + dims with JS, then ~1050 ms later removes `sand-arriving`
 * — the body becomes visible and the canvas fades out. The user sees
 * sand assembling the page, not landing on a fully-rendered one.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  age: number;
  life: number;
  baseAlpha: number;
}

const STORAGE_FLAG = 'sand-page-transition';
const OUT_DURATION_MS = 620;
// IN is intentionally longer than OUT — the user complained that the
// arriving page appeared "without the effect". The full duration here
// is what the user actually sees on the new document (~1.6 s of sand
// covering then settling). REVEAL_AT_MS is the point at which the body
// content becomes visible underneath the still-fading canvas — until
// then the page is fully veiled.
const IN_DURATION_MS = 1600;
const IN_REVEAL_AT_MS = 1050;
// Peak dim is FULL opacity. The user complained that the previous 0.94
// let the underlying map peek through, breaking the illusion ("map
// visible → particles → new map"). At 1.0 the screen is solid era-bg
// behind the particle cloud — no see-through. The dim ramps up in OUT
// and ramps down in IN, so the user still gets the assembly/disassembly
// arc, just clamped at "fully covered" at the midpoint.
const DIM_PEAK = 1.0;
// Particle counts tuned for "hero-like" cloud density. The LogoParticles
// component samples ~1500-2500 dots from logo silhouettes — we match
// that ballpark so the cloud LOOKS like a sandstorm, not "a few specks
// over a dimmed page". Two waves stagger end-of-life so the swarm
// doesn't suddenly thin out mid-transition.
const PARTICLE_COUNT_PRIMARY = 1100;
const PARTICLE_COUNT_SECONDARY = 600;
// Sparse calligraphic thread mesh (same trick as LogoParticles) — gives
// the cloud cohesion without performance cost. Each particle connects
// only to its nearest LINK_PER_PARTICLE neighbours within LINK_DISTANCE
// px, drawn at LINK_OPACITY.
const LINK_DISTANCE = 24;
const LINK_OPACITY = 0.22;
const LINK_PER_PARTICLE = 2;

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId: number | null = null;
let startTime = 0;
let mode: 'idle' | 'out' | 'in' = 'idle';
let pendingHref: string | null = null;
let lastFrameAt = 0;
let interceptorAttached = false;

function ensureCanvas(): HTMLCanvasElement | null {
  if (canvas) return canvas;
  if (typeof document === 'undefined') return null;
  // Prefer the server-rendered canvas (SandPageTransition.astro). Falls
  // back to creating one on the fly if for some reason the layout's
  // <canvas> isn't in the DOM yet (e.g. fired before component mount).
  canvas = document.querySelector<HTMLCanvasElement>('[data-sand-page-transition]');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.setAttribute('data-sand-page-transition', '');
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity 200ms ease',
    });
    document.body.appendChild(canvas);
  }
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  return canvas;
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  if (ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
}

function readEraColor(): string {
  const v = getComputedStyle(document.body).getPropertyValue('--era-primary').trim();
  return v || '#c9a35a';
}

function readEraAccent(): string {
  const v = getComputedStyle(document.body).getPropertyValue('--era-accent').trim();
  return v || '#e8b87a';
}

/** Pull `--era-bg` so the dim layer matches the page background exactly
 *  — at peak DIM=1.0 there's no transparency gap between the canvas and
 *  the document body, so the user can't tell where the page ends and
 *  the overlay starts. Falls back to dark brown if the var isn't set. */
function readEraBg(): string {
  const v = getComputedStyle(document.body).getPropertyValue('--era-bg').trim();
  return v || '#0a0604';
}

function spawnParticles(count: number, direction: 'out' | 'in') {
  const W = window.innerWidth;
  const H = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    let vx: number;
    let vy: number;
    if (direction === 'out') {
      // OUT — particles whip across with directional bias so the page
      // reads as "blown away". Speed varies wide so some streak, others
      // hover, giving the cloud depth.
      const dir = Math.random() < 0.7 ? 1 : -1;
      vx = (180 + Math.random() * 360) * dir;
      vy = -80 + Math.random() * 220;
    } else {
      // IN — gentle converging drift, much slower than OUT, so the sand
      // visually "settles" rather than whipping. Lower speed also makes
      // the cloud read as denser per-frame (particles linger).
      vx = -110 + Math.random() * 220;
      vy = -50 + Math.random() * 110;
    }
    // Two size buckets: most particles are small dots like the hero's
    // sampled silhouette dots; ~15 % are bigger "puffs" for visual
    // weight. Without the puffs the cloud reads as static / pointillist
    // rather than swirling sand.
    const isPuff = Math.random() < 0.15;
    const size = isPuff
      ? 2.4 + Math.random() * 2.0
      : 0.9 + Math.random() * 1.6;
    particles.push({
      x,
      y,
      vx,
      vy,
      size,
      age: 0,
      life: direction === 'out' ? 580 + Math.random() * 280 : 850 + Math.random() * 360,
      baseAlpha: 0.6 + Math.random() * 0.35,
    });
  }
}

// Sparse spatial grid for thread linking — bucket each particle by
// LINK_DISTANCE cell so we only test neighbours in the same / adjacent
// cells. Same trick as LogoParticles. Rebuilt per frame because particles
// move every tick.
let grid: Map<string, Particle[]> = new Map();
function rebuildGrid() {
  grid = new Map();
  const cell = LINK_DISTANCE;
  for (const p of particles) {
    const gx = Math.floor(p.x / cell);
    const gy = Math.floor(p.y / cell);
    const key = `${gx},${gy}`;
    let arr = grid.get(key);
    if (!arr) { arr = []; grid.set(key, arr); }
    arr.push(p);
  }
}

/** Convert a hex/rgb CSS colour string to an `r, g, b` triplet ready
 *  for `rgba(...)` interpolation. The dim layer needs runtime opacity,
 *  but the era-bg comes from a CSS var that's a hex code — we'd lose
 *  the alpha channel if we used it directly. */
function rgbTriplet(css: string): string {
  const hex = css.trim().replace(/^#/, '');
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  // rgb(…) / rgba(…) — pull the first three numbers.
  const m = css.match(/-?\d+(?:\.\d+)?/g);
  if (m && m.length >= 3) return `${m[0]}, ${m[1]}, ${m[2]}`;
  return '10, 6, 4';
}

function step(now: number) {
  if (!ctx || !canvas) return;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const dt = lastFrameAt === 0 ? 16 : Math.min(40, now - lastFrameAt);
  lastFrameAt = now;
  const elapsed = now - startTime;

  ctx.clearRect(0, 0, W, H);

  // Dim layer — fades IN during the out phase, fades OUT during the in
  // phase. Painted with the active era's `--era-bg` colour so it matches
  // the page background EXACTLY at peak DIM=1.0; the user can't tell
  // where the page ends and the overlay begins. Without this match the
  // overlay reads as "a tinted veil on top of the map" instead of "the
  // page itself dissolving into sand".
  let dim = 0;
  if (mode === 'out') {
    dim = Math.min(1, elapsed / OUT_DURATION_MS) * DIM_PEAK;
  } else if (mode === 'in') {
    dim = Math.max(0, 1 - elapsed / IN_DURATION_MS) * DIM_PEAK;
  }
  if (dim > 0) {
    ctx.fillStyle = `rgba(${rgbTriplet(readEraBg())}, ${dim})`;
    ctx.fillRect(0, 0, W, H);
  }

  // Advance particles (position + wind drift). We do this BEFORE
  // drawing so the spatial grid is built off the new positions.
  for (const p of particles) {
    p.age += dt;
    p.x += (p.vx * dt) / 1000;
    p.y += (p.vy * dt) / 1000;
    p.vy += 28 * (dt / 1000);
    p.vx += Math.sin((now + p.x) * 0.002) * 6 * (dt / 1000);
  }
  particles = particles.filter((p) => p.age < p.life);

  // Sparse thread mesh — drawn UNDER the dots so they "stamp" the
  // intersection points. Mesh density is bounded by LINK_PER_PARTICLE
  // per node and LINK_DISTANCE search radius, so the look stays
  // calligraphic instead of a dense graph.
  if (particles.length > 0) {
    rebuildGrid();
    const primary = readEraColor();
    const primTriplet = rgbTriplet(primary);
    ctx.lineWidth = 0.7;
    for (const p of particles) {
      const lifeProgress = p.age / p.life;
      const a = Math.max(0, (1 - lifeProgress) * p.baseAlpha);
      if (a <= 0) continue;
      let drawn = 0;
      const cell = LINK_DISTANCE;
      const gx = Math.floor(p.x / cell);
      const gy = Math.floor(p.y / cell);
      outer: for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const arr = grid.get(`${gx + ox},${gy + oy}`);
          if (!arr) continue;
          for (const q of arr) {
            if (q === p) continue;
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > LINK_DISTANCE * LINK_DISTANCE) continue;
            const d = Math.sqrt(d2);
            const falloff = 1 - d / LINK_DISTANCE;
            ctx.strokeStyle = `rgba(${primTriplet}, ${a * LINK_OPACITY * falloff})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            drawn++;
            if (drawn >= LINK_PER_PARTICLE) break outer;
          }
        }
      }
    }
  }

  // Dot pass — primary colour for most, accent for ~15 % to add warmth.
  const primary = readEraColor();
  const accent = readEraAccent();
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const lifeProgress = p.age / p.life;
    const a = Math.max(0, (1 - lifeProgress) * p.baseAlpha);
    if (a <= 0) continue;
    ctx.fillStyle = (i % 7 === 0) ? accent : primary;
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // For IN, halfway through the animation we lift the `sand-arriving`
  // veil so the new page starts peeking through under the still-fading
  // canvas. The remaining particles + dropping dim then act as the
  // "sand settling onto the page" moment.
  if (mode === 'in' && elapsed >= IN_REVEAL_AT_MS && document.documentElement.classList.contains('sand-arriving')) {
    document.documentElement.classList.remove('sand-arriving');
  }

  if (mode === 'out') {
    if (elapsed < OUT_DURATION_MS) {
      rafId = requestAnimationFrame(step);
    } else {
      const href = pendingHref;
      pendingHref = null;
      try { sessionStorage.setItem(STORAGE_FLAG, '1'); } catch {}
      if (href) location.href = href;
    }
  } else if (mode === 'in') {
    if (elapsed < IN_DURATION_MS) {
      rafId = requestAnimationFrame(step);
    } else {
      mode = 'idle';
      // Safety net in case the IN_REVEAL_AT_MS branch above didn't run
      // (e.g. tab was backgrounded across that frame).
      document.documentElement.classList.remove('sand-arriving');
      if (canvas) {
        canvas.style.transition = 'opacity 220ms ease';
        canvas.style.opacity = '0';
        setTimeout(() => ctx?.clearRect(0, 0, W, H), 240);
      }
    }
  }
}

export function triggerOut(href: string): void {
  if (mode !== 'idle') return;
  const c = ensureCanvas();
  if (!c || !ctx) { location.href = href; return; }
  pendingHref = href;
  mode = 'out';
  startTime = performance.now();
  lastFrameAt = 0;
  particles.length = 0;
  spawnParticles(PARTICLE_COUNT_PRIMARY, 'out');
  // Stagger a second wave so the swarm doesn't all peak at once.
  setTimeout(() => {
    if (mode === 'out') spawnParticles(PARTICLE_COUNT_SECONDARY, 'out');
  }, 180);
  c.style.transition = 'opacity 100ms linear';
  c.style.opacity = '1';
  rafId = requestAnimationFrame(step);
}

/**
 * If the previous page navigated through `triggerOut()`, the
 * `html.sand-arriving` flag is set by the synchronous head script and the
 * sessionStorage handshake confirms it. Plays the IN animation: spawns
 * settling particles, fades the canvas + drops the veil class so the new
 * page reveals. Safe to call unconditionally — bails when there's no flag.
 */
export function maybePlayIn(): void {
  let hasFlag = false;
  try {
    hasFlag = sessionStorage.getItem(STORAGE_FLAG) === '1';
    if (hasFlag) sessionStorage.removeItem(STORAGE_FLAG);
  } catch {}
  const veiled = document.documentElement.classList.contains('sand-arriving');
  if (!hasFlag && !veiled) return;
  const c = ensureCanvas();
  if (!c || !ctx) {
    // Last-ditch reveal so the page isn't stuck invisible.
    document.documentElement.classList.remove('sand-arriving');
    return;
  }
  mode = 'in';
  startTime = performance.now();
  lastFrameAt = 0;
  particles.length = 0;
  // Initial dense burst so the canvas is full of sand the moment the
  // new page loads — visually says "the page is being assembled out of
  // sand", not "sand is landing on a page that's already here".
  spawnParticles(PARTICLE_COUNT_PRIMARY, 'in');
  setTimeout(() => {
    if (mode === 'in') spawnParticles(PARTICLE_COUNT_SECONDARY, 'in');
  }, 280);
  // First frame synchronously so the dim+particles paint BEFORE the rAF
  // yields — guards against a one-frame flash of body content
  // underneath the canvas right after swap.
  step(performance.now());
  rafId = requestAnimationFrame(step);
}

/**
 * Install ONE document-level click handler that routes internal links
 * through the sand transition. Idempotent — calling twice is a no-op.
 */
export function attachClickInterceptor(): void {
  if (interceptorAttached || typeof document === 'undefined') return;
  interceptorAttached = true;

  document.addEventListener('click', (ev) => {
    if (ev.defaultPrevented) return;
    if (ev.button !== 0) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    const link = target.closest('a');
    if (!link) return;
    if (link.target && link.target !== '_self') return;
    if (link.hasAttribute('download')) return;
    const rawHref = link.getAttribute('href');
    if (!rawHref) return;
    if (rawHref.startsWith('#') || rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return;
    let resolved: URL;
    try { resolved = new URL(rawHref, window.location.href); } catch { return; }
    if (resolved.origin !== window.location.origin) return;
    // Same path = same page (hash / query change only) — let it scroll.
    if (resolved.pathname === window.location.pathname) return;
    ev.preventDefault();
    triggerOut(resolved.href);
  }, { capture: false });
}
