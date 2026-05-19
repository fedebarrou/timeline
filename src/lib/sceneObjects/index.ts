/**
 * sceneObjects — scene-object rendering & cleanup.
 *
 * Public surface (kept compatible with the previous monolith
 * `mapSceneObjects.ts`):
 *   - `renderSceneObjects(svgRoot, eventId, markerPos)`
 *   - `clearSceneObjects(svgRoot)`
 *
 * Internally composes the six era shards. Each shard owns the
 * scene-objects for its own era, which lets the Phase 1 era agents
 * work in parallel without touching the same file.
 *
 * Animation hookup: each rendered <g> is tagged with
 * `data-scene-object-id="{id}"` so the FX primitive
 * `fx:animate-scene-object` (see narrationFx.ts) can mutate the live
 * SVG instead of duplicating it. This is the enforcement vehicle for
 * REGLA #1.
 */

import { gsap } from '../scrollytelling';
import type { SceneObject } from './types';
import PRIMORDIAL from './primordial';
import PATRIARCAL from './patriarcal';
import EXODO from './exodo';
import REINOS from './reinos-y-exilio';
import EVANGELIO from './evangelio';
import REVELACION from './revelacion';

export type { SceneObject };

const SVG_NS = 'http://www.w3.org/2000/svg';

const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  ...PRIMORDIAL,
  ...PATRIARCAL,
  ...EXODO,
  ...REINOS,
  ...EVANGELIO,
  ...REVELACION,
};

/** Slugify a name into a safe scene-object id when no id was declared. */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function renderSceneObjects(
  svgRoot: SVGSVGElement,
  eventId: string,
  markerPos: [number, number],
): void {
  const layer = svgRoot.querySelector('[data-layer="scene-objects"]');
  if (!layer) return;
  // clear
  layer.innerHTML = '';

  const items = SCENE_OBJECTS[eventId];
  if (!items || items.length === 0) return;

  items.forEach((obj, i) => {
    const g = document.createElementNS(SVG_NS, 'g') as SVGGElement;
    g.setAttribute(
      'transform',
      `translate(${markerPos[0] + obj.offset[0]}, ${markerPos[1] + obj.offset[1]})`,
    );
    const sid = obj.id ?? slugify(obj.name);
    g.setAttribute('data-scene-object', `${eventId}-${i}`);
    g.setAttribute('data-scene-object-id', sid);
    g.innerHTML = obj.svg;
    g.style.opacity = '0';
    g.style.pointerEvents = 'auto';
    g.style.cursor = 'help';

    // Custom styled tooltip on hover (SVG <title> intentionally OMITTED:
    // it spawns Chrome's native delay-tooltip on top of our papyrus one).
    const showTooltip = (e: MouseEvent) => {
      let tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
      if (!tip) {
        tip = document.createElement('div');
        tip.setAttribute('data-scene-tooltip', '');
        tip.style.position = 'fixed';
        tip.style.padding = '4px 10px';
        tip.style.background = 'var(--era-surface)';
        tip.style.border = '1px solid var(--era-primary)';
        tip.style.borderRadius = '999px';
        tip.style.fontFamily = "var(--era-display, 'Cinzel', serif)";
        tip.style.fontSize = '11px';
        tip.style.letterSpacing = '0.12em';
        tip.style.textTransform = 'uppercase';
        tip.style.color = 'var(--era-primary)';
        tip.style.pointerEvents = 'none';
        tip.style.zIndex = '60';
        tip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.45)';
        tip.style.opacity = '0';
        tip.style.transition = 'opacity 120ms ease';
        document.body.appendChild(tip);
      }
      tip.textContent = obj.name;
      tip.style.left = `${e.clientX + 12}px`;
      tip.style.top = `${e.clientY + 12}px`;
      tip.style.opacity = '1';
    };
    const moveTooltip = (e: MouseEvent) => {
      const tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
      if (!tip) return;
      tip.style.left = `${e.clientX + 12}px`;
      tip.style.top = `${e.clientY + 12}px`;
    };
    const hideTooltip = () => {
      const tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
      if (!tip) return;
      tip.style.opacity = '0';
    };
    g.addEventListener('mouseenter', showTooltip);
    g.addEventListener('mousemove', moveTooltip);
    g.addEventListener('mouseleave', hideTooltip);

    layer.appendChild(g);
    gsap.fromTo(
      g,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: 0.4 + i * 0.15,
        ease: 'power1.out',
        transformOrigin: '50% 50%',
      },
    );
    if (obj.animate) obj.animate(g);
  });
}

export function clearSceneObjects(svgRoot: SVGSVGElement): void {
  const layer = svgRoot.querySelector('[data-layer="scene-objects"]');
  if (!layer) return;
  // Kill any GSAP tweens running against the scene-object groups so
  // animator-driven tweens don't continue after the scene changes.
  layer.querySelectorAll<SVGGElement>('[data-scene-object-id]').forEach((g) => {
    gsap.killTweensOf(g);
    g.querySelectorAll('[data-burn-halo]').forEach((h) => h.remove());
  });
  layer.innerHTML = '';
  const tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
  if (tip) tip.style.opacity = '0';
}
