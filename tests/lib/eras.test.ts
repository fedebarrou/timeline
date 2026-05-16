import { describe, it, expect } from 'vitest';
import { eraToCssVars } from '../../src/lib/eras';

const fixture = {
  id: 'test',
  order: 1,
  name: 'Test',
  tagline: 'x',
  yearRange: { from: 0, to: 10 },
  gregorianRange: { from: 0, to: 10 },
  palette: {
    bg: '#000', bgGradient: 'linear-gradient(0,#000,#fff)',
    surface: '#111', primary: '#222', secondary: '#333',
    accent: '#444', text: '#fff', muted: 'rgba(0,0,0,.5)', border: '#555',
  },
  typography: {
    display: 'Serif', body: 'Body', ui: 'UI',
    displayWeight: 400, letterSpacing: '0.05em',
  },
  texture: { type: 't', url: '/x.png', blendMode: 'multiply', opacity: 0.1 },
  motifs: { ornaments: [], dividers: '/d.svg', iconStyle: 'crude' },
  map: {
    paperColor: '#000', landStroke: '#fff', landFill: 'transparent',
    waterStyle: 'wavy', routeStyle: 'dashed', labelFont: 'F', labelColor: '#000',
  },
  ambience: { particles: null, sound: null, scrollFeel: 'heavy' },
  transition: { intoNext: 'fade', duration: 1000 },
} as const;

describe('eraToCssVars', () => {
  it('produces CSS variable declarations', () => {
    const css = eraToCssVars(fixture as never);
    expect(css).toContain('--era-bg: #000;');
    expect(css).toContain('--era-primary: #222;');
    expect(css).toContain('--era-display: Serif;');
    expect(css).toContain("--era-texture-url: url('/x.png');");
  });
});
