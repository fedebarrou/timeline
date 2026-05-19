/** Scene-object descriptor — permanent figurative SVG rendered alongside
 *  the marker while a scene is active. Distinct from narration FX
 *  primitives, which are ephemeral.
 *
 *  REGLA #1 — every scene-object SHOULD have a stable `id` so that
 *  cues can dispatch `fx:animate-scene-object` against it instead of
 *  rendering a parallel primitive on top. Older entries without an id
 *  receive a slug derived from `name`. */
export type SceneObject = {
  /** Stable id used by `fx:animate-scene-object` to find the rendered
   *  group via `[data-scene-object-id="{id}"]`. Recommended kebab-case
   *  (ej. 'arca', 'becerro', 'torre-de-babel'). */
  id?: string;
  /** Display name shown on hover. */
  name: string;
  /** SVG markup (innerHTML of a <g> element) — must be valid SVG with
   *  var(--era-*) colors and only the universal hex exceptions allowed
   *  by STYLE_GUIDE_ANIMACIONES.md. */
  svg: string;
  /** Position offset from the marker (svg pixels). */
  offset: [number, number];
  /** Optional GSAP animation factory invoked once after spawn; receives
   *  the rendered <g> element. */
  animate?: (el: SVGGElement) => void;
};
