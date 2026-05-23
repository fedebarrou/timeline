import { describe, it, expect, vi } from 'vitest';
import { scaleCountForViewport } from '../../src/lib/narrationFx';

describe('scaleCountForViewport', () => {
  it('returns count unchanged on desktop', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    expect(scaleCountForViewport(20, 0.5)).toBe(20);
  });

  it('scales count by mobileDensity on mobile', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q === '(max-width: 767px)' }));
    expect(scaleCountForViewport(20, 0.5)).toBe(10);
  });

  it('defaults to 1.0 when mobileDensity undefined', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q === '(max-width: 767px)' }));
    expect(scaleCountForViewport(20, undefined)).toBe(20);
  });

  it('rounds to at least 1 element', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q === '(max-width: 767px)' }));
    expect(scaleCountForViewport(2, 0.1)).toBe(1);
  });
});
