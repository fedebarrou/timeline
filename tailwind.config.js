/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--era-bg)',
        surface:   'var(--era-surface)',
        primary:   'var(--era-primary)',
        secondary: 'var(--era-secondary)',
        accent:    'var(--era-accent)',
        text:      'var(--era-text)',
        muted:     'var(--era-muted)',
        border:    'var(--era-border)',
      },
      fontFamily: {
        display: 'var(--era-display)',
        body:    'var(--era-body)',
        ui:      'var(--era-ui)',
      },
    },
  },
  plugins: [],
};
