import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://biblia-timeline.vercel.app',
  // Silence the noisy "504 Outdated Optimize Dep" coming from the dev toolbar
  // entrypoint — it has nothing to do with our code and only adds confusion
  // when debugging the actual app scripts.
  devToolbar: { enabled: false },
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  vite: {
    // Maplibre is loaded from the CDN as a global `window.maplibregl`
    // (see ModernMapLayer.astro). Vite never touches it. The
    // `exclude` entry guarantees Vite doesn't try to optimize a phantom
    // import path even though no source file statically imports it.
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
  },
});
