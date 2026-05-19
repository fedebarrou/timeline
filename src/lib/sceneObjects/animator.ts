import { gsap } from '../scrollytelling';

/**
 * sceneObjects/animator — animates an already-rendered scene-object
 * <g> in the [data-layer="scene-objects"] layer.
 *
 * Invoked exclusively by `fx:animate-scene-object` (narrationFx.ts).
 * This is the keystone of REGLA #1 (one concept, one render): instead
 * of spawning a parallel primitive for an icon that's already on stage,
 * the cue dispatches `{ id, kind }` and we mutate the existing SVG.
 *
 * Each `kind` is a short looping/one-shot tween that respects the
 * scene-object's transform-origin and tidies up when the scene changes
 * (see `clearSceneObjects`, which kills any active tweens on those
 * elements).
 */

export type AnimateKind =
  | 'drift'   // gentle side-to-side drift
  | 'pulse'   // opacity pulse (glow)
  | 'shake'   // jiggle (terror, earthquake)
  | 'march'   // travel a small horizontal distance and back
  | 'sway'    // rotational sway (trees, hanging objects)
  | 'rock'    // up-and-down rocking (boats, cradles)
  | 'burn'    // red-orange overlay glow (burning)
  | 'glow'    // subtle bright halo around the element
  | 'wobble'  // skew wobble (instability)
  | 'rise';   // float upward and fade

/**
 * Locate the rendered SVG <g> for a scene-object id within the active
 * scene-objects layer.
 */
function findEl(svg: SVGSVGElement, id: string): SVGGElement | null {
  return svg.querySelector<SVGGElement>(
    `[data-layer="scene-objects"] [data-scene-object-id="${id}"]`,
  );
}

/**
 * Animate the scene-object identified by `id` with the given `kind`.
 * Re-invoking with the same id+kind is safe: GSAP overwrites the
 * existing tween. The optional `duration` overrides the default cycle.
 */
export function animateSceneObject(
  svg: SVGSVGElement,
  id: string,
  kind: AnimateKind,
  duration?: number,
): void {
  const el = findEl(svg, id);
  if (!el) return;
  const dur = duration ?? 1.4;

  switch (kind) {
    case 'drift':
      gsap.to(el, { x: 2, duration: dur, yoyo: true, repeat: 3, ease: 'sine.inOut' });
      break;
    case 'pulse':
      gsap.to(el, { opacity: 0.6, duration: dur, yoyo: true, repeat: 5, ease: 'sine.inOut' });
      break;
    case 'shake': {
      const tl = gsap.timeline();
      for (let i = 0; i < 12; i++) {
        const decay = 1 - i / 12;
        tl.to(el, { x: (Math.random() - 0.5) * 3 * decay, y: (Math.random() - 0.5) * 3 * decay, duration: dur / 12, ease: 'sine.inOut' });
      }
      tl.to(el, { x: 0, y: 0, duration: 0.2 });
      break;
    }
    case 'march':
      gsap.to(el, { x: 8, duration: dur, yoyo: true, repeat: 1, ease: 'sine.inOut' });
      break;
    case 'sway':
      gsap.to(el, { rotation: 3, duration: dur, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 100%' });
      break;
    case 'rock':
      gsap.to(el, { y: 2, rotation: 1.5, duration: dur, yoyo: true, repeat: 5, ease: 'sine.inOut' });
      break;
    case 'burn': {
      // Overlay red-orange glow circle on top of the element bounds.
      const SVG_NS = 'http://www.w3.org/2000/svg';
      const halo = document.createElementNS(SVG_NS, 'circle');
      const bbox = (el as unknown as SVGGraphicsElement).getBBox();
      halo.setAttribute('cx', String(bbox.x + bbox.width / 2));
      halo.setAttribute('cy', String(bbox.y + bbox.height / 2));
      halo.setAttribute('r', String(Math.max(bbox.width, bbox.height) * 0.6));
      halo.setAttribute('fill', '#ff8844');
      halo.setAttribute('opacity', '0');
      halo.setAttribute('filter', 'blur(1.2px)');
      halo.setAttribute('pointer-events', 'none');
      halo.setAttribute('data-burn-halo', '');
      el.appendChild(halo);
      gsap.to(halo, { attr: { opacity: 0.55 }, duration: 0.4 });
      gsap.to(halo, {
        attr: { opacity: 0.25 }, duration: dur, yoyo: true, repeat: 5, ease: 'sine.inOut',
        onComplete: () => {
          gsap.to(halo, { attr: { opacity: 0 }, duration: 0.6, onComplete: () => halo.remove() });
        },
      });
      break;
    }
    case 'glow':
      gsap.to(el, { scale: 1.05, opacity: 1, duration: dur, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 50%' });
      break;
    case 'wobble':
      gsap.to(el, { skewX: 3, duration: dur, yoyo: true, repeat: 3, ease: 'sine.inOut' });
      break;
    case 'rise':
      gsap.to(el, { y: -6, opacity: 0.6, duration: dur * 1.5, ease: 'sine.out' });
      break;
    default:
      // Unknown kind — silent no-op.
      break;
  }
}
