import type { BoundaryPolygon } from './boundaries/types';

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Build the `d` attribute for one ring. Each ring is auto-closed with "Z".
 */
function ringToPath(ring: Array<[number, number]>): string {
  if (ring.length === 0) return '';
  const head = `M ${ring[0][0]} ${ring[0][1]}`;
  const rest = ring.slice(1).map(([x, y]) => `L ${x} ${y}`).join(' ');
  return `${head} ${rest} Z`;
}

/**
 * Render (or replace) the boundaries layer's contents. Idempotent —
 * calling again with a different set wipes the previous one cleanly.
 *
 * The layer SHOULD already exist in the SVG (added in ManuscriptMap.astro
 * as `<g data-layer="boundaries">`). If it's missing we create it once;
 * that lets us be defensive against partial DOM trees but doesn't hide
 * configuration errors during development (a missing layer prints a
 * single warning so the user notices).
 */
export function renderBoundaries(
  svg: SVGSVGElement,
  polygons: BoundaryPolygon[],
): void {
  let layer = svg.querySelector<SVGGElement>('[data-layer="boundaries"]');
  if (!layer) {
    console.warn('[mapBoundaries] no [data-layer="boundaries"] in SVG — creating one');
    layer = document.createElementNS(SVG_NS, 'g');
    layer.setAttribute('data-layer', 'boundaries');
    // Insert BEFORE markers so character pins stay clickable on top.
    const markers = svg.querySelector('[data-layer="markers"]');
    if (markers && markers.parentNode === svg) svg.insertBefore(layer, markers);
    else svg.appendChild(layer);
  }
  while (layer.firstChild) layer.removeChild(layer.firstChild);

  for (const p of polygons) {
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('data-boundary', p.id);
    group.setAttribute('pointer-events', 'none');
    const fill = p.color ?? 'var(--era-accent)';
    for (const ring of p.paths) {
      const pathEl = document.createElementNS(SVG_NS, 'path');
      pathEl.setAttribute('d', ringToPath(ring));
      pathEl.setAttribute('fill', fill);
      pathEl.setAttribute('fill-opacity', '0.10');
      pathEl.setAttribute('stroke', fill);
      pathEl.setAttribute('stroke-width', '1.2');
      pathEl.setAttribute('stroke-dasharray', '4 3');
      pathEl.setAttribute('stroke-opacity', '0.65');
      group.appendChild(pathEl);
    }
    if (p.label) {
      const text = document.createElementNS(SVG_NS, 'text');
      text.setAttribute('x', String(p.label.x));
      text.setAttribute('y', String(p.label.y));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-family', "'Cinzel', serif");
      text.setAttribute('font-size', String(p.label.size ?? 8));
      text.setAttribute('font-style', 'italic');
      text.setAttribute('fill', fill);
      text.setAttribute('opacity', '0.75');
      text.setAttribute('letter-spacing', '1.5');
      text.setAttribute('pointer-events', 'none');
      text.textContent = p.name;
      group.appendChild(text);
    }
    layer.appendChild(group);
  }
}

/**
 * Toggle visibility of the boundaries layer. We hide via CSS class on the
 * layer itself (not display:none) so future intra-layer animations are
 * still possible while the user is fading the layer in/out.
 */
export function setBoundariesVisible(svg: SVGSVGElement, visible: boolean): void {
  const layer = svg.querySelector<SVGGElement>('[data-layer="boundaries"]');
  if (!layer) return;
  layer.classList.toggle('is-hidden', !visible);
}

export function areBoundariesVisible(svg: SVGSVGElement): boolean {
  const layer = svg.querySelector<SVGGElement>('[data-layer="boundaries"]');
  if (!layer) return false;
  return !layer.classList.contains('is-hidden');
}
