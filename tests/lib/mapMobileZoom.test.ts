import { describe, it, expect } from 'vitest';
import { viewBoxFor, viewBoxForJourney, MOBILE_ZOOM } from '../../src/lib/mapMobileZoom';
import { MAP_VIEWBOX } from '../../src/lib/mapManuscript';

describe('viewBoxFor', () => {
  it('centers the viewBox on the given point', () => {
    const vb = viewBoxFor(500, 300);
    const [x, y, w, h] = vb.split(' ').map(Number);
    expect(w).toBeCloseTo(MAP_VIEWBOX.w / MOBILE_ZOOM, 1);
    expect(h).toBeCloseTo(MAP_VIEWBOX.h / MOBILE_ZOOM, 1);
    expect(x + w / 2).toBeCloseTo(500, 1);
    expect(y + h / 2).toBeCloseTo(300, 1);
  });

  it('clamps to [0, MAP_VIEWBOX.w - w] on the x axis (left edge)', () => {
    const vb = viewBoxFor(0, 300);
    const [x] = vb.split(' ').map(Number);
    expect(x).toBe(0);
  });

  it('clamps to right edge on the x axis', () => {
    const vb = viewBoxFor(MAP_VIEWBOX.w, 300);
    const [x, , w] = vb.split(' ').map(Number);
    expect(x + w).toBeCloseTo(MAP_VIEWBOX.w, 1);
  });

  it('clamps on the y axis', () => {
    const vb1 = viewBoxFor(500, 0);
    const [, y1] = vb1.split(' ').map(Number);
    expect(y1).toBe(0);

    const vb2 = viewBoxFor(500, MAP_VIEWBOX.h);
    const [, y2, , h2] = vb2.split(' ').map(Number);
    expect(y2 + h2).toBeCloseTo(MAP_VIEWBOX.h, 1);
  });
});

describe('viewBoxForJourney', () => {
  it('includes both points with padding', () => {
    const vb = viewBoxForJourney([100, 100], [400, 400]);
    const [x, y, w, h] = vb.split(' ').map(Number);
    expect(x).toBeLessThanOrEqual(100);
    expect(y).toBeLessThanOrEqual(100);
    expect(x + w).toBeGreaterThanOrEqual(400);
    expect(y + h).toBeGreaterThanOrEqual(400);
    expect(w).toBeGreaterThanOrEqual(300 * 1.2);
  });

  it('handles same-point journey (degenerate)', () => {
    const vb = viewBoxForJourney([500, 300], [500, 300]);
    const [, , w, h] = vb.split(' ').map(Number);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
  });
});
