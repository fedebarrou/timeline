import { describe, it, expect, beforeEach } from 'vitest';
import { clearFxLayer } from '../../src/lib/narrationFx';

const SVG_NS = 'http://www.w3.org/2000/svg';

function makeSvg(): SVGSVGElement {
  document.body.innerHTML = '';
  const svg = document.createElementNS(SVG_NS, 'svg') as SVGSVGElement;
  document.body.appendChild(svg);
  return svg;
}

function addFxNode(svg: SVGSVGElement, tag: string = 'circle'): SVGElement {
  let layer = svg.querySelector<SVGGElement>('[data-layer="narration-fx"]');
  if (!layer) {
    layer = document.createElementNS(SVG_NS, 'g') as SVGGElement;
    layer.setAttribute('data-layer', 'narration-fx');
    svg.appendChild(layer);
  }
  const node = document.createElementNS(SVG_NS, tag) as SVGElement;
  layer.appendChild(node);
  return node;
}

describe('clearFxLayer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('removes every child node from the narration-fx layer', () => {
    const svg = makeSvg();
    addFxNode(svg, 'circle');
    addFxNode(svg, 'rect');
    addFxNode(svg, 'g');
    const layer = svg.querySelector<SVGGElement>('[data-layer="narration-fx"]')!;
    expect(layer.children.length).toBe(3);

    clearFxLayer(svg);
    expect(layer.children.length).toBe(0);
  });

  it('preserves the layer itself for reuse', () => {
    const svg = makeSvg();
    addFxNode(svg);
    clearFxLayer(svg);
    const layer = svg.querySelector<SVGGElement>('[data-layer="narration-fx"]');
    expect(layer).not.toBeNull();
  });

  it('preserves <defs> filters/gradients on the SVG', () => {
    const svg = makeSvg();
    const defs = document.createElementNS(SVG_NS, 'defs');
    const filter = document.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', 'narration-fx-lightning-glow');
    defs.appendChild(filter);
    svg.appendChild(defs);
    addFxNode(svg);

    clearFxLayer(svg);
    expect(svg.querySelector('#narration-fx-lightning-glow')).not.toBeNull();
  });

  it('removes any floating tradition-badge nodes from document.body', () => {
    const svg = makeSvg();
    const badge = document.createElement('div');
    badge.setAttribute('data-narration-tradition-badge', '');
    document.body.appendChild(badge);

    clearFxLayer(svg);
    expect(document.querySelector('[data-narration-tradition-badge]')).toBeNull();
  });

  it('is safe to call when the layer does not exist yet', () => {
    const svg = makeSvg();
    expect(() => clearFxLayer(svg)).not.toThrow();
  });
});
