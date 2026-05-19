/**
 * eraAmbient — persistent, low-intensity ambient FX layer per era.
 *
 * Mounted by `EraTheme.astro` on page hydration, kept alive while the
 * user is on events of that era, and torn down when the era changes
 * (handled at mount site via the returned cleanup).
 *
 * Lives in its own SVG layer `<g data-layer="era-ambient">`, sibling
 * of narration-fx, so it never interferes with per-event primitives.
 * Each era has a distinct atmospheric signature documented in the
 * spec Section 3.C.3.
 */

import { gsap } from './scrollytelling';
import type { EraId } from './cues/_eraIds';

const SVG_NS = 'http://www.w3.org/2000/svg';

function getMapSvg(): SVGSVGElement | null {
  return document.querySelector<SVGSVGElement>('[data-map-root]');
}

function getAmbientLayer(svg: SVGSVGElement): SVGGElement {
  let layer = svg.querySelector<SVGGElement>('[data-layer="era-ambient"]');
  if (!layer) {
    layer = document.createElementNS(SVG_NS, 'g') as SVGGElement;
    layer.setAttribute('data-layer', 'era-ambient');
    layer.setAttribute('pointer-events', 'none');
    // Insert as the FIRST child so ambient sits BEHIND markers, routes,
    // scene-objects and narration-fx.
    svg.insertBefore(layer, svg.firstChild);
  }
  return layer;
}

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, tag) as SVGElementTagNameMap[K];
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
  return el;
}

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

// ─── Per-era implementations ──────────────────────────────────────────

function mountPrimordial(layer: SVGGElement, svg: SVGSVGElement): () => void {
  const [vx, vy, vw, vh] = getViewBox(svg);
  const tweens: gsap.core.Tween[] = [];
  // Soft golden wash
  const wash = svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill: 'var(--era-accent)', opacity: 0.06 });
  layer.appendChild(wash);
  // 30 golden dust motes
  const motes: SVGCircleElement[] = [];
  for (let i = 0; i < 30; i++) {
    const cx = vx + Math.random() * vw;
    const cy = vy + Math.random() * vh;
    const m = svgEl('circle', { cx, cy, r: 0.3 + Math.random() * 0.6, fill: '#ffd866', opacity: 0.3 + Math.random() * 0.3 });
    layer.appendChild(m);
    motes.push(m);
    tweens.push(gsap.to(m, {
      attr: { cy: cy - 14 - Math.random() * 12, cx: cx + (Math.random() - 0.5) * 8, opacity: 0 },
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 6,
      repeat: -1,
      ease: 'sine.inOut',
      onRepeat: () => {
        m.setAttribute('cy', String(vy + vh + 4));
        m.setAttribute('cx', String(vx + Math.random() * vw));
        m.setAttribute('opacity', String(0.3 + Math.random() * 0.3));
      },
    }));
  }
  return () => { tweens.forEach((t) => t.kill()); wash.remove(); motes.forEach((m) => m.remove()); };
}

function mountPatriarcal(layer: SVGGElement, svg: SVGSVGElement): () => void {
  const [vx, vy, vw, vh] = getViewBox(svg);
  const tweens: gsap.core.Tween[] = [];
  // Heat shimmer rect over lower horizon (uses turbulence filter)
  const defs = svg.querySelector('defs') ?? (() => {
    const d = svgEl('defs');
    svg.insertBefore(d, svg.firstChild);
    return d;
  })();
  const fid = 'era-ambient-patri-heat';
  if (!svg.querySelector(`#${fid}`)) {
    const f = svgEl('filter', { id: fid, x: '0%', y: '0%', width: '100%', height: '100%' });
    f.innerHTML = `<feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.2"/>`;
    defs.appendChild(f);
  }
  const shimmer = svgEl('rect', { x: vx, y: vy + vh * 0.55, width: vw, height: vh * 0.45, fill: 'var(--era-accent)', opacity: 0.08, filter: `url(#${fid})` });
  layer.appendChild(shimmer);
  // dust devils (distant) — every 8-12s
  let devilTimer: number | null = window.setInterval(() => {
    const cx = vx + 20 + Math.random() * (vw - 40);
    const cy = vy + vh * (0.65 + Math.random() * 0.2);
    const d = svgEl('ellipse', { cx, cy, rx: 2.4, ry: 6, fill: 'var(--era-secondary)', opacity: 0 });
    layer.appendChild(d);
    const tl = gsap.timeline({ onComplete: () => d.remove() });
    tl.to(d, { attr: { opacity: 0.5, rx: 3.2, ry: 12 }, duration: 1.0, ease: 'sine.out' });
    tl.to(d, { attr: { opacity: 0, ry: 18, cy: cy - 10 }, duration: 2.2, ease: 'sine.in' });
    tweens.push(tl as unknown as gsap.core.Tween);
  }, 9000 + Math.random() * 3000);
  return () => {
    tweens.forEach((t) => t.kill());
    if (devilTimer != null) { clearInterval(devilTimer); devilTimer = null; }
    shimmer.remove();
  };
}

function mountExodo(layer: SVGGElement, svg: SVGSVGElement): () => void {
  const [vx, vy, vw, vh] = getViewBox(svg);
  const tweens: gsap.core.Tween[] = [];
  // Ash flakes falling intermittently (12 particles)
  const flakes: SVGCircleElement[] = [];
  for (let i = 0; i < 12; i++) {
    const cx = vx + Math.random() * vw;
    const cy = vy + Math.random() * vh;
    const f = svgEl('circle', { cx, cy, r: 0.4 + Math.random() * 0.3, fill: '#3a3a3a', opacity: 0.45 });
    layer.appendChild(f); flakes.push(f);
    tweens.push(gsap.to(f, {
      attr: { cy: cy + vh, cx: cx + 12 + Math.random() * 8, opacity: 0 },
      duration: 10 + Math.random() * 6,
      delay: Math.random() * 8,
      repeat: -1,
      ease: 'none',
      onRepeat: () => {
        f.setAttribute('cx', String(vx + Math.random() * vw));
        f.setAttribute('cy', String(vy - 4));
        f.setAttribute('opacity', String(0.4 + Math.random() * 0.25));
      },
    }));
  }
  // Sand-laden wind streaks (diagonal)
  const streaks: SVGLineElement[] = [];
  for (let i = 0; i < 6; i++) {
    const sy = vy + Math.random() * vh;
    const l = svgEl('line', { x1: vx - 20, y1: sy, x2: vx, y2: sy + 6, stroke: '#c9b48a', 'stroke-width': 0.3, opacity: 0.4 });
    layer.appendChild(l); streaks.push(l);
    tweens.push(gsap.to(l, {
      attr: { x1: vx + vw + 20, x2: vx + vw + 40, opacity: 0 },
      duration: 6 + Math.random() * 3,
      delay: Math.random() * 4,
      repeat: -1,
      ease: 'none',
      onRepeat: () => {
        l.setAttribute('x1', String(vx - 20));
        l.setAttribute('x2', String(vx));
        l.setAttribute('opacity', '0.4');
      },
    }));
  }
  return () => { tweens.forEach((t) => t.kill()); flakes.forEach((f) => f.remove()); streaks.forEach((s) => s.remove()); };
}

function mountReinosYExilio(layer: SVGGElement, svg: SVGSVGElement): () => void {
  const [vx, vy, vw, vh] = getViewBox(svg);
  const tweens: gsap.core.Tween[] = [];
  // 3 distant smoke columns (incense)
  const cols: SVGEllipseElement[][] = [];
  for (let c = 0; c < 3; c++) {
    const baseX = vx + vw * (0.2 + c * 0.3);
    const baseY = vy + vh * 0.85;
    const col: SVGEllipseElement[] = [];
    for (let i = 0; i < 4; i++) {
      const e = svgEl('ellipse', { cx: baseX + (i % 2 === 0 ? 1 : -1), cy: baseY - i * 5, rx: 1.6, ry: 2.4, fill: 'var(--era-secondary)', opacity: 0.18, filter: 'blur(0.8px)' });
      layer.appendChild(e); col.push(e);
      tweens.push(gsap.to(e, { attr: { cy: baseY - 26 - i * 4, opacity: 0 }, duration: 6 + i, delay: i * 0.8, repeat: -1, ease: 'sine.out', onRepeat: () => {
        e.setAttribute('cy', String(baseY - i * 5));
        e.setAttribute('opacity', '0.18');
      } }));
    }
    cols.push(col);
  }
  // 2 stained-glass-like diagonal beams
  const beams: SVGPolygonElement[] = [];
  for (let i = 0; i < 2; i++) {
    const sx = vx + vw * (0.25 + i * 0.5);
    const beam = svgEl('polygon', {
      points: `${sx},${vy} ${sx + 6},${vy} ${sx + 30},${vy + vh} ${sx + 24},${vy + vh}`,
      fill: 'var(--era-accent)', opacity: 0.07,
    });
    layer.appendChild(beam); beams.push(beam);
    tweens.push(gsap.to(beam, { attr: { opacity: 0.12 }, duration: 4 + i, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
  }
  return () => {
    tweens.forEach((t) => t.kill());
    cols.forEach((col) => col.forEach((e) => e.remove()));
    beams.forEach((b) => b.remove());
  };
}

function mountEvangelio(layer: SVGGElement, svg: SVGSVGElement): () => void {
  const [vx, vy, vw, vh] = getViewBox(svg);
  const tweens: gsap.core.Tween[] = [];
  // 3 oblique golden-hour beams
  const beams: SVGPolygonElement[] = [];
  for (let i = 0; i < 3; i++) {
    const sx = vx + vw * (0.15 + i * 0.3);
    const beam = svgEl('polygon', {
      points: `${sx},${vy} ${sx + 8},${vy} ${sx + 26},${vy + vh} ${sx + 18},${vy + vh}`,
      fill: '#ffd866', opacity: 0.08,
    });
    layer.appendChild(beam); beams.push(beam);
    tweens.push(gsap.to(beam, { attr: { opacity: 0.16 }, duration: 5 + i, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
  }
  // Occasional dove silhouettes passing
  let doveTimer: number | null = window.setInterval(() => {
    const sy = vy + 20 + Math.random() * 40;
    const dove = svgEl('path', { d: 'M -3 0 Q -1 -1.5 0 0 Q 1 -1.5 3 0 Q 1 0.6 0 0.4 Q -1 0.6 -3 0 Z', fill: '#ffffff', opacity: 0, transform: `translate(${vx - 8}, ${sy})` });
    layer.appendChild(dove);
    const tl = gsap.timeline({ onComplete: () => dove.remove() });
    tl.to(dove, { attr: { opacity: 0.7 }, duration: 0.4 });
    tl.to(dove, { attr: { transform: `translate(${vx + vw + 8}, ${sy - 6})` }, duration: 8, ease: 'sine.inOut' }, '<');
    tl.to(dove, { attr: { opacity: 0 }, duration: 0.6 }, '-=0.6');
    tweens.push(tl as unknown as gsap.core.Tween);
  }, 12000 + Math.random() * 4000);
  return () => { tweens.forEach((t) => t.kill()); beams.forEach((b) => b.remove()); if (doveTimer != null) { clearInterval(doveTimer); doveTimer = null; } };
}

function mountRevelacion(layer: SVGGElement, svg: SVGSVGElement): () => void {
  const [vx, vy, vw, vh] = getViewBox(svg);
  const tweens: gsap.core.Tween[] = [];
  // Desert-wind thin lines
  const lines: SVGLineElement[] = [];
  for (let i = 0; i < 8; i++) {
    const sy = vy + Math.random() * vh;
    const l = svgEl('line', { x1: vx - 30, y1: sy, x2: vx, y2: sy, stroke: 'var(--era-text)', 'stroke-width': 0.2, opacity: 0.35 });
    layer.appendChild(l); lines.push(l);
    tweens.push(gsap.to(l, {
      attr: { x1: vx + vw, x2: vx + vw + 30, opacity: 0 },
      duration: 7 + Math.random() * 4,
      delay: Math.random() * 4,
      repeat: -1,
      ease: 'none',
      onRepeat: () => {
        l.setAttribute('x1', String(vx - 30));
        l.setAttribute('x2', String(vx));
        l.setAttribute('opacity', '0.35');
      },
    }));
  }
  // Top starfield shimmer
  const stars: SVGCircleElement[] = [];
  for (let i = 0; i < 18; i++) {
    const s = svgEl('circle', { cx: vx + Math.random() * vw, cy: vy + Math.random() * 50, r: 0.3 + Math.random() * 0.4, fill: 'var(--era-accent)', opacity: 0.4 });
    layer.appendChild(s); stars.push(s);
    tweens.push(gsap.to(s, { attr: { opacity: 0.95 }, duration: 1.4 + Math.random(), yoyo: true, repeat: -1, ease: 'sine.inOut', delay: Math.random() * 2 }));
  }
  // Subtle geometric overlay pattern (8-pointed stars)
  const defs = svg.querySelector('defs') ?? (() => { const d = svgEl('defs'); svg.insertBefore(d, svg.firstChild); return d; })();
  const pid = 'era-ambient-revel-pattern';
  if (!svg.querySelector(`#${pid}`)) {
    const p = svgEl('pattern', { id: pid, width: '24', height: '24', patternUnits: 'userSpaceOnUse' });
    p.innerHTML = `<path d="M 12 4 L 14 10 L 20 12 L 14 14 L 12 20 L 10 14 L 4 12 L 10 10 Z" fill="none" stroke="var(--era-accent)" stroke-width="0.2" opacity="0.5"/>`;
    defs.appendChild(p);
  }
  const overlay = svgEl('rect', { x: vx, y: vy, width: vw, height: vh, fill: `url(#${pid})`, opacity: 0.18 });
  layer.appendChild(overlay);
  return () => {
    tweens.forEach((t) => t.kill());
    lines.forEach((l) => l.remove());
    stars.forEach((s) => s.remove());
    overlay.remove();
  };
}

/**
 * Mount the ambient layer for a given era. Returns a cleanup function
 * to be invoked when the era changes or the user navigates away.
 *
 * Safe to call before the map SVG has hydrated — returns a no-op
 * cleanup in that case (caller can simply retry on next tick).
 */
export function mountEraAmbient(eraId: EraId): () => void {
  if (typeof document === 'undefined') return () => {};
  const svg = getMapSvg();
  if (!svg) return () => {};
  const layer = getAmbientLayer(svg);
  // Clear any pre-existing ambient (defensive: prevents stacking on hot reload).
  while (layer.firstChild) layer.removeChild(layer.firstChild);
  switch (eraId) {
    case 'primordial':       return mountPrimordial(layer, svg);
    case 'patriarcal':       return mountPatriarcal(layer, svg);
    case 'exodo':            return mountExodo(layer, svg);
    case 'reinos-y-exilio':  return mountReinosYExilio(layer, svg);
    case 'evangelio':        return mountEvangelio(layer, svg);
    case 'revelacion':       return mountRevelacion(layer, svg);
    default:                 return () => {};
  }
}
