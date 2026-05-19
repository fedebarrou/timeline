import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('boot classes', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('adds is-touch when pointer is coarse', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({
      matches: q === '(pointer: coarse)',
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    return import('../../src/lib/bootClasses').then(({ applyBootClasses }) => {
      applyBootClasses(navigator, document);
      expect(document.body.classList.contains('is-touch')).toBe(true);
    });
  });

  it('adds fx-reduced when hardwareConcurrency <= 4', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 4, configurable: true });
    return import('../../src/lib/bootClasses').then(({ applyBootClasses }) => {
      applyBootClasses(navigator, document);
      expect(document.body.classList.contains('fx-reduced')).toBe(true);
    });
  });

  it('does not add fx-reduced when hardwareConcurrency > 4', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }));
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 8, configurable: true });
    return import('../../src/lib/bootClasses').then(({ applyBootClasses }) => {
      applyBootClasses(navigator, document);
      expect(document.body.classList.contains('fx-reduced')).toBe(false);
    });
  });
});
