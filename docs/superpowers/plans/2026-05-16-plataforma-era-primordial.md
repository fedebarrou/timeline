# Plataforma + Era Primordial — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la plataforma completa del sitio (Astro + scrollytelling + mapas + sistema de eras + comparativa + media) y poblarla con el contenido completo de la Era Primordial (Adán → Diluvio, ~12 eventos), deployado en Vercel.

**Architecture:** Astro 5 estático con TypeScript y Content Collections (Zod). Scrollytelling con GSAP ScrollTrigger sobre layout sticky. Mapa principal SVG manuscrito con viewBox animado, mapa secundario Maplibre GL toggleable. CSS variables por era aplicadas vía `data-era` en `<body>`. Verificación de citas y licencias en build.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Motion One, Maplibre GL, D3-geo, MDX, Zod, Vitest, Playwright, Vercel.

**Spec:** `docs/superpowers/specs/2026-05-16-timeline-biblico-tora-coran-design.md`

---

## Fase 1 — Setup del proyecto

### Task 1: Inicializar proyecto Astro

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`

- [ ] **Step 1: Inicializar Astro con template minimal y TypeScript estricto**

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

Expected: directorio con `src/`, `package.json`, `astro.config.mjs`, `tsconfig.json` creados.

- [ ] **Step 2: Verificar que arranca**

```bash
npm run dev
```

Expected: server en `http://localhost:4321` mostrando la página de bienvenida de Astro. Cerrar con Ctrl+C.

- [ ] **Step 3: Inicializar git y .gitignore**

```bash
git init
```

Verificar que `.gitignore` ya incluye `node_modules`, `dist`, `.astro`. Si no, agregar:

```
node_modules
dist
.astro
.env
.env.local
.superpowers/
.vercel
```

- [ ] **Step 4: Primer commit**

```bash
git add .
git commit -m "feat: initialize Astro project with TypeScript strict"
```

---

### Task 2: Instalar dependencias core

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar integraciones Astro**

```bash
npm install @astrojs/mdx @astrojs/tailwind @astrojs/sitemap @astrojs/check
```

- [ ] **Step 2: Instalar animación y mapas**

```bash
npm install gsap motion maplibre-gl d3-geo
npm install -D @types/d3-geo
```

- [ ] **Step 3: Instalar Tailwind**

```bash
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init
```

- [ ] **Step 4: Instalar testing**

```bash
npm install -D vitest @vitest/ui happy-dom @testing-library/dom
npm install -D @playwright/test
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tailwind.config.js
git commit -m "chore: install core dependencies (mdx, tailwind, gsap, maplibre, testing)"
```

---

### Task 3: Configurar Astro con integraciones

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Reemplazar contenido de `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://biblia-timeline.vercel.app',
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
  },
});
```

- [ ] **Step 2: Verificar que arranca sin errores**

```bash
npm run dev
```

Expected: server arranca sin warnings de integraciones.

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: configure astro integrations"
```

---

### Task 4: Configurar Tailwind con design tokens base

**Files:**
- Modify: `tailwind.config.js`
- Create: `src/styles/global.css`

- [ ] **Step 1: Reemplazar `tailwind.config.js`**

```js
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
```

- [ ] **Step 2: Crear `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --era-bg: #1a0f0a;
  --era-surface: #2a1f17;
  --era-primary: #d4a574;
  --era-secondary: #8b5a3c;
  --era-accent: #e8b87a;
  --era-text: #e8d5b7;
  --era-muted: rgba(232, 213, 183, 0.55);
  --era-border: rgba(212, 165, 116, 0.2);
  --era-display: 'Cinzel', serif;
  --era-body: 'EB Garamond', Georgia, serif;
  --era-ui: 'Inter', system-ui, sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--era-bg);
  color: var(--era-text);
  font-family: var(--era-body);
  transition: background-color 1.5s ease, color 1.5s ease;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Importar `global.css` en layout base**

Crear `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Línea de tiempo bíblica: Adán a Mahoma' } = Astro.props;
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body data-era="primordial">
    <slot />
    <style is:global>@import '../styles/global.css';</style>
  </body>
</html>
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: tailwind config with era CSS variables and base layout"
```

---

### Task 5: Setup Vitest

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Crear `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
```

- [ ] **Step 2: Agregar scripts en `package.json`**

Editar la sección `scripts` para que incluya:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro check && astro build",
  "preview": "astro preview",
  "astro": "astro",
  "test": "vitest run",
  "test:watch": "vitest",
  "e2e": "playwright test",
  "verify": "tsx scripts/verify-citations.ts && tsx scripts/verify-licenses.ts"
}
```

- [ ] **Step 3: Test smoke check**

Crear `tests/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: `1 test passed`.

- [ ] **Step 4: Commit**

```bash
git add vitest.config.ts package.json tests/smoke.test.ts
git commit -m "chore: setup vitest with smoke test"
```

---

## Fase 2 — Content Collections (Schemas)

### Task 6: Definir schema de Eras

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Crear `src/content/config.ts` con schema de eras**

```ts
import { defineCollection, z } from 'astro:content';

const eras = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    name: z.string(),
    tagline: z.string(),
    yearRange: z.object({ from: z.number(), to: z.number() }),
    gregorianRange: z.object({ from: z.number(), to: z.number() }),
    palette: z.object({
      bg: z.string(),
      bgGradient: z.string(),
      surface: z.string(),
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      text: z.string(),
      muted: z.string(),
      border: z.string(),
    }),
    typography: z.object({
      display: z.string(),
      body: z.string(),
      ui: z.string(),
      displayWeight: z.number(),
      letterSpacing: z.string(),
    }),
    texture: z.object({
      type: z.string(),
      url: z.string(),
      blendMode: z.string(),
      opacity: z.number(),
    }),
    motifs: z.object({
      ornaments: z.array(z.string()),
      dividers: z.string(),
      iconStyle: z.string(),
    }),
    map: z.object({
      paperColor: z.string(),
      landStroke: z.string(),
      landFill: z.string(),
      waterStyle: z.string(),
      routeStyle: z.string(),
      labelFont: z.string(),
      labelColor: z.string(),
    }),
    ambience: z.object({
      particles: z.string().nullable(),
      sound: z.string().nullable(),
      scrollFeel: z.string(),
    }),
    transition: z.object({
      intoNext: z.string(),
      duration: z.number(),
    }),
  }),
});

export const collections = { eras };
```

- [ ] **Step 2: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: zod schema for eras content collection"
```

---

### Task 7: Definir schema de Locations

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Agregar schema de locations**

Agregar al archivo, antes de `export const collections`:

```ts
const proposedLocationSchema = z.object({
  name: z.string(),
  coords: z.tuple([z.number(), z.number()]),
  svgPosition: z.tuple([z.number(), z.number()]),
  support: z.string(),
});

const locations = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    ancientName: z.string(),
    modernName: z.string().optional(),
    coords: z.tuple([z.number(), z.number()]).optional(),
    svgPosition: z.tuple([z.number(), z.number()]).optional(),
    region: z.string(),
    disputed: z.boolean().default(false),
    proposedLocations: z.array(proposedLocationSchema).optional(),
    description: z.string(),
    events: z.array(z.string()).default([]),
  }).refine(
    (data) => data.disputed ? !!data.proposedLocations : !!data.coords,
    { message: 'Disputed locations need proposedLocations; non-disputed need coords' }
  ),
});
```

Y actualizar la exportación:

```ts
export const collections = { eras, locations };
```

- [ ] **Step 2: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: zod schema for locations content collection"
```

---

### Task 8: Definir schema de Events

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Agregar schema de events**

```ts
const traditionMention = z.object({
  summary: z.string(),
  citation: z.string(),
  fullText: z.string(),
  keyDifferences: z.array(z.string()).default([]),
});

const sourceSchema = z.object({
  type: z.enum(['canonical', 'apocryphal', 'traditional', 'archaeological']),
  title: z.string(),
  weight: z.enum(['primary', 'secondary']).optional(),
  note: z.string().optional(),
});

const mediaItemSchema = z.object({
  src: z.string(),
  caption: z.string().optional(),
  credit: z.string(),
  license: z.enum(['public-domain', 'cc0', 'cc-by', 'cc-by-sa', 'open-access', 'fair-use', 'ai-generated']),
  source: z.string().optional(),
});

const videoSchema = z.object({
  provider: z.enum(['youtube', 'vimeo', 'internal']),
  id: z.string(),
  title: z.string().optional(),
  creator: z.string(),
  duration: z.string(),
  language: z.string().default('es'),
  label: z.string().optional(),
});

const deepDiveLinkSchema = z.object({
  tradition: z.enum(['tora', 'biblia', 'coran']).optional(),
  type: z.string().optional(),
  url: z.string().url(),
  label: z.string(),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    title: z.string(),
    subtitle: z.string().optional(),
    biblicalYear: z.number(),
    gregorianYear: z.number(),
    duration: z.string().optional(),
    era: z.string(),
    locations: z.array(z.object({
      id: z.string(),
      role: z.enum(['origen', 'destino', 'escenario']),
      ancientName: z.string(),
      modernName: z.string().optional(),
      coords: z.tuple([z.number(), z.number()]).optional(),
      svgPosition: z.tuple([z.number(), z.number()]),
    })),
    journey: z.array(z.object({
      from: z.string(),
      to: z.string(),
      label: z.string(),
      style: z.enum(['boat', 'walking', 'caravan', 'exile']),
    })).default([]),
    characters: z.array(z.object({
      id: z.string(),
      role: z.string(),
    })).default([]),
    tags: z.array(z.string()).default([]),
    precededBy: z.array(z.string()).default([]),
    followedBy: z.array(z.string()).default([]),
    comparative: z.object({
      unified: z.string(),
      divergent: z.boolean().default(false),
      tora: traditionMention.optional(),
      biblia: traditionMention.optional(),
      coran: traditionMention.optional(),
    }),
    sources: z.array(sourceSchema).default([]),
    trivia: z.array(z.string()).default([]),
    media: z.object({
      hero: mediaItemSchema.optional(),
      gallery: z.array(mediaItemSchema).default([]),
      video: videoSchema.optional(),
      illustration: z.object({
        src: z.string(),
        style: z.enum(['engraving', 'line', 'mosaic', 'geometry']),
      }).optional(),
      audio: z.string().nullable().default(null),
    }).default({ gallery: [], audio: null }),
    deepDive: z.object({
      originalTexts: z.array(deepDiveLinkSchema).default([]),
      academic: z.array(deepDiveLinkSchema).default([]),
      videos: z.array(videoSchema).default([]),
      archaeology: z.array(deepDiveLinkSchema).default([]),
    }).default({ originalTexts: [], academic: [], videos: [], archaeology: [] }),
  }),
});
```

Y actualizar la exportación:

```ts
export const collections = { eras, locations, events };
```

- [ ] **Step 2: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: zod schema for events content collection"
```

---

### Task 9: Definir schema de Characters

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Agregar schema de characters**

```ts
const traditionRefSchema = z.object({
  book: z.string().optional(),
  sura: z.string().optional(),
  number: z.number().optional(),
  reference: z.string().optional(),
  verses: z.string().optional(),
  summary: z.string(),
  fullText: z.string().optional(),
});

const characters = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    alternateNames: z.object({
      hebrew: z.string().optional(),
      arabic: z.string().optional(),
      greek: z.string().optional(),
      meaning: z.string().optional(),
    }).default({}),
    birthYear: z.number().optional(),
    deathYear: z.number().optional(),
    ageAtDeath: z.number().optional(),
    parents: z.array(z.string()).default([]),
    spouse: z.string().optional(),
    children: z.array(z.string()).default([]),
    events: z.array(z.string()).default([]),
    mentions: z.object({
      tora: z.array(traditionRefSchema).default([]),
      biblia: z.array(traditionRefSchema).default([]),
      coran: z.array(traditionRefSchema).default([]),
    }).default({ tora: [], biblia: [], coran: [] }),
    extraBiblical: z.array(z.object({
      source: z.string(),
      summary: z.string(),
    })).default([]),
    roles: z.array(z.string()).default([]),
    titles: z.array(z.object({
      tradition: z.string(),
      title: z.string(),
    })).default([]),
    significance: z.string().optional(),
    trivia: z.array(z.string()).default([]),
  }),
});
```

Y actualizar:

```ts
export const collections = { eras, locations, events, characters };
```

- [ ] **Step 2: Verificar que el schema compila**

```bash
npm run astro check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: zod schema for characters content collection"
```

---

## Fase 3 — Sistema de Eras

### Task 10: Datos de Era Primordial

**Files:**
- Create: `src/content/eras/primordial.json`

- [ ] **Step 1: Crear archivo de era**

```json
{
  "id": "primordial",
  "order": 1,
  "name": "Primordial",
  "tagline": "Cuna del mundo",
  "yearRange": { "from": 0, "to": 1657 },
  "gregorianRange": { "from": -3760, "to": -2103 },
  "palette": {
    "bg": "#1a0f0a",
    "bgGradient": "linear-gradient(180deg,#1a0f0a 0%,#2a1810 100%)",
    "surface": "#2a1f17",
    "primary": "#d4a574",
    "secondary": "#8b5a3c",
    "accent": "#e8b87a",
    "text": "#e8d5b7",
    "muted": "rgba(232,213,183,.55)",
    "border": "rgba(212,165,116,.2)"
  },
  "typography": {
    "display": "'Cinzel', serif",
    "body": "'EB Garamond', Georgia, serif",
    "ui": "'Inter', system-ui",
    "displayWeight": 400,
    "letterSpacing": "0.08em"
  },
  "texture": {
    "type": "cave-rock",
    "url": "/textures/primordial.png",
    "blendMode": "multiply",
    "opacity": 0.12
  },
  "motifs": {
    "ornaments": ["/svg/motifs/primordial-glyph.svg"],
    "dividers": "/svg/motifs/primordial-divider.svg",
    "iconStyle": "crude"
  },
  "map": {
    "paperColor": "#2a1810",
    "landStroke": "#d4a574",
    "landFill": "transparent",
    "waterStyle": "wavy-lines",
    "routeStyle": "dashed-ember",
    "labelFont": "'Cinzel', serif",
    "labelColor": "#d4a574"
  },
  "ambience": {
    "particles": "embers",
    "sound": null,
    "scrollFeel": "heavy"
  },
  "transition": {
    "intoNext": "dawn-warming",
    "duration": 2000
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/content/eras/primordial.json
git commit -m "feat: era primordial data"
```

---

### Task 11: Componente EraTheme

**Files:**
- Create: `src/components/EraTheme.astro`
- Create: `src/lib/eras.ts`

- [ ] **Step 1: Crear helper `src/lib/eras.ts`**

```ts
import { getEntry, type CollectionEntry } from 'astro:content';

export type Era = CollectionEntry<'eras'>;

export async function getEra(id: string): Promise<Era> {
  const era = await getEntry('eras', id);
  if (!era) throw new Error(`Era not found: ${id}`);
  return era;
}

export function eraToCssVars(era: Era['data']): string {
  const p = era.palette;
  const t = era.typography;
  return [
    `--era-bg: ${p.bg};`,
    `--era-bg-gradient: ${p.bgGradient};`,
    `--era-surface: ${p.surface};`,
    `--era-primary: ${p.primary};`,
    `--era-secondary: ${p.secondary};`,
    `--era-accent: ${p.accent};`,
    `--era-text: ${p.text};`,
    `--era-muted: ${p.muted};`,
    `--era-border: ${p.border};`,
    `--era-display: ${t.display};`,
    `--era-body: ${t.body};`,
    `--era-ui: ${t.ui};`,
    `--era-letter-spacing: ${t.letterSpacing};`,
    `--era-texture-url: url('${era.texture.url}');`,
    `--era-texture-opacity: ${era.texture.opacity};`,
  ].join('\n  ');
}
```

- [ ] **Step 2: Crear `src/components/EraTheme.astro`**

```astro
---
import type { Era } from '../lib/eras';
import { eraToCssVars } from '../lib/eras';

interface Props { era: Era; }
const { era } = Astro.props;
const vars = eraToCssVars(era.data);
---
<style set:html={`:root[data-era="${era.data.id}"] {\n  ${vars}\n}`}></style>
```

- [ ] **Step 3: Test del helper**

Crear `tests/lib/eras.test.ts`:

```ts
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
```

Run: `npm test`
Expected: 2 tests passed.

- [ ] **Step 4: Commit**

```bash
git add src/components/EraTheme.astro src/lib/eras.ts tests/lib/eras.test.ts
git commit -m "feat: era theme component and CSS variable helper"
```

---

### Task 12: EraTransition component (animación entre eras)

**Files:**
- Create: `src/components/EraTransition.astro`
- Create: `src/lib/scrollytelling.ts`

- [ ] **Step 1: Crear `src/lib/scrollytelling.ts`**

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setEra(eraId: string) {
  if (document.body.dataset.era !== eraId) {
    document.body.dataset.era = eraId;
  }
}

export function initEraTransition(sceneEl: HTMLElement, targetEraId: string) {
  ScrollTrigger.create({
    trigger: sceneEl,
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => setEra(targetEraId),
    onEnterBack: () => setEra(targetEraId),
  });
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Crear `src/components/EraTransition.astro`**

```astro
---
import type { Era } from '../lib/eras';
interface Props {
  from: Era;
  to: Era;
}
const { from, to } = Astro.props;
---
<section
  class="era-transition relative min-h-screen flex items-center justify-center text-center px-8"
  data-era-transition
  data-from-era={from.data.id}
  data-to-era={to.data.id}
>
  <div class="max-w-2xl">
    <p class="text-sm tracking-[0.4em] opacity-50 mb-4">— {from.data.name} —</p>
    <h2 class="font-display text-4xl italic mb-8">Y así terminó la era de {from.data.name.toLowerCase()}</h2>
    <p class="text-sm tracking-[0.4em] opacity-50 mt-12">— {to.data.name} —</p>
    <p class="font-display text-xl italic mt-2 opacity-70">{to.data.tagline}</p>
  </div>
</section>

<script define:vars={{ toEra: to.data.id }}>
  import('../lib/scrollytelling').then(({ initEraTransition }) => {
    const el = document.querySelector(`[data-era-transition][data-to-era="${toEra}"]`);
    if (el) initEraTransition(el, toEra);
  });
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/EraTransition.astro src/lib/scrollytelling.ts
git commit -m "feat: era transition component with GSAP ScrollTrigger"
```

---

## Fase 4 — Mapa manuscrito

### Task 13: GeoJSON base del mundo antiguo

**Files:**
- Create: `public/maps/ancient-world.geojson`

- [ ] **Step 1: Bajar Natural Earth simplificado**

```bash
curl -L -o public/maps/ancient-world.geojson "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
```

Expected: archivo descargado (~200KB).

- [ ] **Step 2: Verificar que es JSON válido**

```bash
node -e "const fs=require('fs'); const g=JSON.parse(fs.readFileSync('public/maps/ancient-world.geojson')); console.log('Features:', g.features.length);"
```

Expected: imprime "Features: 177" (o similar).

- [ ] **Step 3: Commit**

```bash
git add public/maps/ancient-world.geojson
git commit -m "feat: base GeoJSON for ancient world map"
```

---

### Task 14: Componente ManuscriptMap (render base)

**Files:**
- Create: `src/components/ManuscriptMap.astro`
- Create: `src/lib/mapManuscript.ts`

- [ ] **Step 1: Crear `src/lib/mapManuscript.ts`**

```ts
import { geoMercator, geoPath, type GeoProjection } from 'd3-geo';

export const MAP_VIEWBOX = { w: 1000, h: 600 };

export function buildProjection(): GeoProjection {
  return geoMercator()
    .center([35, 30])
    .scale(800)
    .translate([MAP_VIEWBOX.w / 2, MAP_VIEWBOX.h / 2]);
}

export function geoJsonToPath(geojson: GeoJSON.FeatureCollection): string[] {
  const projection = buildProjection();
  const path = geoPath(projection);
  return geojson.features.map((f) => path(f) ?? '').filter(Boolean);
}

export function svgCoordsFor(lat: number, lng: number): [number, number] {
  const projection = buildProjection();
  const xy = projection([lng, lat]);
  return xy ?? [0, 0];
}
```

- [ ] **Step 2: Crear `src/components/ManuscriptMap.astro`**

```astro
---
import { promises as fs } from 'node:fs';
import { geoJsonToPath, MAP_VIEWBOX } from '../lib/mapManuscript';

const raw = await fs.readFile('public/maps/ancient-world.geojson', 'utf-8');
const geojson = JSON.parse(raw);
const paths = geoJsonToPath(geojson);
---
<svg
  class="manuscript-map w-full h-full"
  viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
  preserveAspectRatio="xMidYMid meet"
  data-map-root
>
  <defs>
    <pattern id="paper" patternUnits="userSpaceOnUse" width="6" height="6">
      <rect width="6" height="6" fill="var(--era-bg)" />
      <circle cx="1" cy="1" r="0.3" fill="var(--era-primary)" opacity="0.08" />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#paper)" />

  <g class="land" data-layer="land">
    {paths.map((d) => (
      <path
        d={d}
        fill="transparent"
        stroke="var(--era-primary)"
        stroke-width="0.6"
        opacity="0.8"
      />
    ))}
  </g>

  <g class="markers" data-layer="markers"></g>
  <g class="routes" data-layer="routes"></g>
  <g class="labels" data-layer="labels"></g>
</svg>

<style>
  .manuscript-map { background: var(--era-bg-gradient); }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ManuscriptMap.astro src/lib/mapManuscript.ts
git commit -m "feat: manuscript map SVG component with d3-geo projection"
```

---

### Task 15: Markers y animación de evento activo

**Files:**
- Modify: `src/lib/mapManuscript.ts`
- Create: `src/lib/mapMarkers.ts`

- [ ] **Step 1: Crear `src/lib/mapMarkers.ts`**

```ts
import { gsap } from './scrollytelling';

export interface MarkerSpec {
  id: string;
  svgPosition: [number, number];
  label: string;
}

export function renderMarker(svgRoot: SVGSVGElement, marker: MarkerSpec) {
  const group = svgRoot.querySelector('[data-layer="markers"]');
  if (!group) return;
  if (group.querySelector(`[data-marker="${marker.id}"]`)) return;

  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('data-marker', marker.id);
  g.setAttribute('transform', `translate(${marker.svgPosition[0]}, ${marker.svgPosition[1]})`);

  const halo = document.createElementNS(ns, 'circle');
  halo.setAttribute('r', '12');
  halo.setAttribute('fill', 'var(--era-accent)');
  halo.setAttribute('opacity', '0');
  halo.setAttribute('data-halo', '');

  const dot = document.createElementNS(ns, 'circle');
  dot.setAttribute('r', '3');
  dot.setAttribute('fill', 'var(--era-primary)');

  g.appendChild(halo);
  g.appendChild(dot);
  group.appendChild(g);
}

export function activateMarker(svgRoot: SVGSVGElement, id: string) {
  const all = svgRoot.querySelectorAll('[data-marker]');
  all.forEach((m) => m.classList.remove('active'));
  const target = svgRoot.querySelector(`[data-marker="${id}"]`);
  if (!target) return;
  target.classList.add('active');
  const halo = target.querySelector('[data-halo]');
  if (halo) {
    gsap.killTweensOf(halo);
    gsap.fromTo(halo,
      { opacity: 0.6, r: 6 },
      { opacity: 0, r: 18, duration: 1.4, repeat: -1, ease: 'sine.out' }
    );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/mapMarkers.ts
git commit -m "feat: marker rendering and activation animation"
```

---

### Task 16: Animación de pan/zoom entre lugares

**Files:**
- Create: `src/lib/mapCamera.ts`

- [ ] **Step 1: Crear `src/lib/mapCamera.ts`**

```ts
import { gsap } from './scrollytelling';
import { MAP_VIEWBOX } from './mapManuscript';

export interface CameraTarget {
  cx: number;
  cy: number;
  zoom: number;
}

export function panTo(svg: SVGSVGElement, target: CameraTarget, duration = 1.2) {
  const w = MAP_VIEWBOX.w / target.zoom;
  const h = MAP_VIEWBOX.h / target.zoom;
  const x = target.cx - w / 2;
  const y = target.cy - h / 2;
  const newViewBox = `${x} ${y} ${w} ${h}`;

  gsap.to(svg, {
    attr: { viewBox: newViewBox },
    duration,
    ease: 'power2.inOut',
  });
}

export function resetCamera(svg: SVGSVGElement, duration = 1.5) {
  gsap.to(svg, {
    attr: { viewBox: `0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}` },
    duration,
    ease: 'power2.inOut',
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/mapCamera.ts
git commit -m "feat: map camera pan/zoom with GSAP viewBox tween"
```

---

### Task 17: Animación de migraciones (journey lines)

**Files:**
- Create: `src/lib/mapJourneys.ts`

- [ ] **Step 1: Crear `src/lib/mapJourneys.ts`**

```ts
import { gsap } from './scrollytelling';

export interface JourneySpec {
  id: string;
  from: [number, number];
  to: [number, number];
  style: 'boat' | 'walking' | 'caravan' | 'exile';
}

const STYLE_DASH: Record<JourneySpec['style'], string> = {
  boat: '4 2',
  walking: '2 2',
  caravan: '6 3',
  exile: '8 4',
};

export function drawJourney(svgRoot: SVGSVGElement, journey: JourneySpec) {
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;

  const ns = 'http://www.w3.org/2000/svg';
  const [x1, y1] = journey.from;
  const [x2, y2] = journey.to;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.15;

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'var(--era-accent)');
  path.setAttribute('stroke-width', '1.2');
  path.setAttribute('stroke-dasharray', STYLE_DASH[journey.style]);
  path.setAttribute('data-journey', journey.id);
  group.appendChild(path);

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: 'power1.inOut',
    onComplete: () => {
      path.style.strokeDasharray = STYLE_DASH[journey.style];
      path.style.strokeDashoffset = '0';
    },
  });
}

export function clearJourneys(svgRoot: SVGSVGElement) {
  const group = svgRoot.querySelector('[data-layer="routes"]');
  if (!group) return;
  group.innerHTML = '';
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/mapJourneys.ts
git commit -m "feat: journey line drawing with animated stroke-dashoffset"
```

---

## Fase 5 — Mapa moderno (Maplibre)

### Task 18: Componente ModernMapLayer

**Files:**
- Create: `src/components/ModernMapLayer.astro`
- Create: `src/lib/mapModern.ts`

- [ ] **Step 1: Crear `src/lib/mapModern.ts`**

```ts
import maplibregl, { Map as MLMap, Marker as MLMarker } from 'maplibre-gl';

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export interface MarkerData {
  id: string;
  coords: [number, number];
  label: string;
}

export function createMap(container: HTMLElement): MLMap {
  return new maplibregl.Map({
    container,
    style: STYLE_URL,
    center: [35, 30],
    zoom: 3.2,
    attributionControl: true,
  });
}

export function addMarker(map: MLMap, m: MarkerData): MLMarker {
  const el = document.createElement('div');
  el.className = 'modern-marker';
  el.dataset.markerId = m.id;
  el.innerHTML = `<div class="dot"></div><div class="ring"></div>`;
  return new maplibregl.Marker({ element: el })
    .setLngLat([m.coords[1], m.coords[0]])
    .setPopup(new maplibregl.Popup({ offset: 20 }).setText(m.label))
    .addTo(map);
}

export function flyTo(map: MLMap, coords: [number, number], zoom = 6) {
  map.flyTo({ center: [coords[1], coords[0]], zoom, duration: 1800 });
}
```

- [ ] **Step 2: Crear `src/components/ModernMapLayer.astro`**

```astro
---
---
<div class="modern-map-wrapper hidden absolute inset-0" data-modern-map-wrapper>
  <div data-modern-map class="w-full h-full"></div>
</div>

<style>
  .modern-marker .dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--era-accent);
    box-shadow: 0 0 12px var(--era-accent);
  }
  .modern-marker .ring {
    position: absolute; inset: -6px; border-radius: 50%;
    border: 1px solid var(--era-primary); opacity: 0.4;
  }
</style>

<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ModernMapLayer.astro src/lib/mapModern.ts
git commit -m "feat: modern map layer with Maplibre GL (Carto dark style)"
```

---

### Task 19: Toggle entre mapa manuscrito y mapa moderno

**Files:**
- Create: `src/lib/mapToggle.ts`
- Create: `src/components/MapToggleButton.astro`

- [ ] **Step 1: Crear `src/lib/mapToggle.ts`**

```ts
import { createMap, addMarker, flyTo, type MarkerData } from './mapModern';
import type { Map as MLMap } from 'maplibre-gl';

let modernMap: MLMap | null = null;
let initialized = false;
let markers: MarkerData[] = [];

export function registerMarkers(data: MarkerData[]) {
  markers = data;
}

function initModernMap() {
  const container = document.querySelector<HTMLElement>('[data-modern-map]');
  if (!container || modernMap) return;
  modernMap = createMap(container);
  modernMap.on('load', () => {
    markers.forEach((m) => addMarker(modernMap!, m));
  });
  initialized = true;
}

export function toggleMap() {
  const wrapper = document.querySelector<HTMLElement>('[data-modern-map-wrapper]');
  const manuscript = document.querySelector<HTMLElement>('[data-map-root]');
  if (!wrapper || !manuscript) return;

  const showModern = wrapper.classList.contains('hidden');
  if (showModern) {
    wrapper.classList.remove('hidden');
    manuscript.style.opacity = '0';
    if (!initialized) initModernMap();
  } else {
    wrapper.classList.add('hidden');
    manuscript.style.opacity = '1';
  }
}

export function flyModern(coords: [number, number], zoom = 6) {
  if (modernMap) flyTo(modernMap, coords, zoom);
}
```

- [ ] **Step 2: Crear `src/components/MapToggleButton.astro`**

```astro
<button
  type="button"
  class="map-toggle-btn fixed top-4 right-4 z-50 px-3 py-2 rounded-full text-xs tracking-wider uppercase border bg-surface/80 hover:bg-surface text-text border-border backdrop-blur"
  data-map-toggle
>
  Ver en mapa actual
</button>

<script>
  import { toggleMap } from '../lib/mapToggle';
  const btn = document.querySelector('[data-map-toggle]');
  btn?.addEventListener('click', toggleMap);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') toggleMap();
  });
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/mapToggle.ts src/components/MapToggleButton.astro
git commit -m "feat: toggle between manuscript and modern map with keyboard shortcut"
```

---

## Fase 6 — Scrollytelling

### Task 20: Componente EventScene

**Files:**
- Create: `src/components/EventScene.astro`

- [ ] **Step 1: Crear `src/components/EventScene.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import ComparativeBlock from './ComparativeBlock.astro';
import SourceBadge from './SourceBadge.astro';
import DeepDive from './DeepDive.astro';

interface Props { event: CollectionEntry<'events'>; }
const { event } = Astro.props;
const data = event.data;
const { Content } = await event.render();
const primaryLocation = data.locations[0];
---
<section
  class="event-scene grid grid-cols-1 lg:grid-cols-[40fr_60fr] min-h-[120vh]"
  data-event-scene
  data-event-id={data.id}
  data-era={data.era}
  data-svg-x={primaryLocation?.svgPosition[0]}
  data-svg-y={primaryLocation?.svgPosition[1]}
>
  <div class="narrative px-6 lg:px-10 py-24 flex flex-col justify-center">
    <p class="text-xs tracking-[0.4em] opacity-60 mb-3">— AÑO {data.biblicalYear} —</p>
    <h2 class="font-display text-4xl lg:text-5xl mb-2">{data.title}</h2>
    {data.subtitle && <p class="font-display italic opacity-70 text-lg mb-8">{data.subtitle}</p>}

    <div class="prose prose-invert max-w-none text-text">
      <Content />
    </div>

    {data.comparative.divergent && (
      <ComparativeBlock comparative={data.comparative} />
    )}

    {data.sources.length > 0 && (
      <div class="mt-8">
        <h3 class="text-xs tracking-[0.3em] uppercase opacity-60 mb-3">Fuentes consultadas</h3>
        <ul class="space-y-2">
          {data.sources.map((s) => <li><SourceBadge source={s} /></li>)}
        </ul>
      </div>
    )}

    <DeepDive deepDive={data.deepDive} />
  </div>

  <div class="map-spacer hidden lg:block"></div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/EventScene.astro
git commit -m "feat: EventScene component renders narrative panel"
```

---

### Task 21: Wiring de ScrollTrigger a EventScenes

**Files:**
- Create: `src/lib/sceneController.ts`

- [ ] **Step 1: Crear `src/lib/sceneController.ts`**

```ts
import { gsap, ScrollTrigger, setEra } from './scrollytelling';
import { activateMarker } from './mapMarkers';
import { panTo } from './mapCamera';
import { flyModern } from './mapToggle';

export interface SceneConfig {
  eventId: string;
  eraId: string;
  svgPosition: [number, number];
  coords?: [number, number];
}

export function initScrollytelling(scenes: SceneConfig[]) {
  const svg = document.querySelector<SVGSVGElement>('[data-map-root]');
  if (!svg) return;

  scenes.forEach((scene) => {
    const sceneEl = document.querySelector<HTMLElement>(`[data-event-scene][data-event-id="${scene.eventId}"]`);
    if (!sceneEl) return;

    ScrollTrigger.create({
      trigger: sceneEl,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => activate(scene, svg),
      onEnterBack: () => activate(scene, svg),
    });

    gsap.fromTo(
      sceneEl.querySelector('.narrative'),
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power1.out',
        scrollTrigger: { trigger: sceneEl, start: 'top 80%', end: 'top 30%', scrub: 0.5 },
      }
    );
  });
}

function activate(scene: SceneConfig, svg: SVGSVGElement) {
  setEra(scene.eraId);
  activateMarker(svg, scene.eventId);
  panTo(svg, { cx: scene.svgPosition[0], cy: scene.svgPosition[1], zoom: 2.2 });
  if (scene.coords) flyModern(scene.coords, 6);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/sceneController.ts
git commit -m "feat: scrollytelling controller wires scenes to map + era"
```

---

## Fase 7 — Componentes de contenido

### Task 22: ComparativeBlock (3 columnas)

**Files:**
- Create: `src/components/ComparativeBlock.astro`

- [ ] **Step 1: Crear `src/components/ComparativeBlock.astro`**

```astro
---
interface TraditionMention {
  summary: string;
  citation: string;
  fullText: string;
  keyDifferences: string[];
}

interface Props {
  comparative: {
    unified: string;
    divergent: boolean;
    tora?: TraditionMention;
    biblia?: TraditionMention;
    coran?: TraditionMention;
  };
}
const { comparative } = Astro.props;
const cols = [
  { key: 'tora',   label: 'TORÁ',   icon: '📜', data: comparative.tora },
  { key: 'biblia', label: 'BIBLIA', icon: '✝',  data: comparative.biblia },
  { key: 'coran',  label: 'CORÁN',  icon: '☪',  data: comparative.coran },
].filter((c) => c.data);
---
<div class="comparative mt-10 border border-border rounded-lg p-5 bg-surface/40" data-comparative>
  <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Las tradiciones difieren</p>
  <div class="grid md:grid-cols-3 gap-4">
    {cols.map((col, i) => (
      <div class="tradition-col border-l-2 border-primary/60 pl-4" data-stagger-index={i}>
        <div class="text-[10px] tracking-[0.3em] opacity-70 mb-1">{col.icon} {col.label}</div>
        <div class="text-xs opacity-60 mb-2">{col.data!.citation}</div>
        <p class="text-sm leading-relaxed">{col.data!.summary}</p>
        {col.data!.fullText && (
          <details class="mt-3 text-xs opacity-80">
            <summary class="cursor-pointer hover:opacity-100">+ ver cita textual</summary>
            <blockquote class="mt-2 italic border-l-2 border-muted pl-3">{col.data!.fullText}</blockquote>
          </details>
        )}
        {col.data!.keyDifferences.length > 0 && (
          <ul class="mt-3 text-xs space-y-1">
            {col.data!.keyDifferences.map((d) => <li class="opacity-70">• {d}</li>)}
          </ul>
        )}
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ComparativeBlock.astro
git commit -m "feat: ComparativeBlock 3-column tradition comparison"
```

---

### Task 23: SourceBadge

**Files:**
- Create: `src/components/SourceBadge.astro`

- [ ] **Step 1: Crear `src/components/SourceBadge.astro`**

```astro
---
interface Props {
  source: {
    type: 'canonical' | 'apocryphal' | 'traditional' | 'archaeological';
    title: string;
    weight?: 'primary' | 'secondary';
    note?: string;
  };
}
const { source } = Astro.props;
const map = {
  canonical:      { color: 'bg-blue-500',   icon: '🔵', label: 'canónico' },
  apocryphal:     { color: 'bg-yellow-500', icon: '🟡', label: 'apócrifo' },
  traditional:    { color: 'bg-green-500',  icon: '🟢', label: 'tradición' },
  archaeological: { color: 'bg-amber-800',  icon: '🟤', label: 'arqueología' },
} as const;
const cfg = map[source.type];
---
<span class="source-badge inline-flex items-baseline gap-2 text-sm">
  <span class="badge text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded border border-current opacity-70">
    {cfg.icon} {cfg.label}
  </span>
  <span class="title">{source.title}</span>
  {source.note && <span class="note text-xs opacity-60">— {source.note}</span>}
</span>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SourceBadge.astro
git commit -m "feat: SourceBadge component with type-coded badges"
```

---

### Task 24: DeepDive (sección "Profundizá")

**Files:**
- Create: `src/components/DeepDive.astro`

- [ ] **Step 1: Crear `src/components/DeepDive.astro`**

```astro
---
interface Link { url: string; label: string; tradition?: string; type?: string; }
interface Video { provider: string; id: string; creator: string; duration: string; label?: string; }
interface Props {
  deepDive: {
    originalTexts: Link[];
    academic: Link[];
    videos: Video[];
    archaeology: Link[];
  };
}
const { deepDive } = Astro.props;
const hasAny = [
  deepDive.originalTexts,
  deepDive.academic,
  deepDive.videos,
  deepDive.archaeology,
].some((arr) => arr.length > 0);
---
{hasAny && (
  <details class="deepdive mt-10 border border-border rounded-lg p-5 bg-surface/30">
    <summary class="cursor-pointer text-xs tracking-[0.3em] uppercase opacity-70 hover:opacity-100">
      Profundizá en este evento
    </summary>

    <div class="mt-5 space-y-5 text-sm">
      {deepDive.originalTexts.length > 0 && (
        <div>
          <h4 class="text-xs tracking-wider opacity-60 mb-2">📖 LEÉ EL TEXTO ORIGINAL</h4>
          <ul class="space-y-1">
            {deepDive.originalTexts.map((l) => (
              <li>→ <a href={l.url} target="_blank" rel="noopener" class="underline decoration-dotted hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
        </div>
      )}
      {deepDive.videos.length > 0 && (
        <div>
          <h4 class="text-xs tracking-wider opacity-60 mb-2">🎥 VIDEOS</h4>
          <ul class="space-y-1">
            {deepDive.videos.map((v) => (
              <li>→ <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener" class="underline decoration-dotted hover:text-accent">"{v.label ?? v.creator}" · {v.creator} ({v.duration})</a></li>
            ))}
          </ul>
        </div>
      )}
      {deepDive.academic.length > 0 && (
        <div>
          <h4 class="text-xs tracking-wider opacity-60 mb-2">🔍 MATERIAL ACADÉMICO</h4>
          <ul class="space-y-1">
            {deepDive.academic.map((l) => (
              <li>→ <a href={l.url} target="_blank" rel="noopener" class="underline decoration-dotted hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
        </div>
      )}
      {deepDive.archaeology.length > 0 && (
        <div>
          <h4 class="text-xs tracking-wider opacity-60 mb-2">🏛 ARQUEOLOGÍA Y MUSEOS</h4>
          <ul class="space-y-1">
            {deepDive.archaeology.map((l) => (
              <li>→ <a href={l.url} target="_blank" rel="noopener" class="underline decoration-dotted hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </details>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DeepDive.astro
git commit -m "feat: DeepDive component with 4 categories of external links"
```

---

### Task 25: MediaHero y MediaGallery

**Files:**
- Create: `src/components/MediaHero.astro`
- Create: `src/components/MediaGallery.astro`

- [ ] **Step 1: Crear `src/components/MediaHero.astro`**

```astro
---
interface Props {
  media?: {
    src: string;
    credit: string;
    license: string;
    source?: string;
    caption?: string;
  };
}
const { media } = Astro.props;
---
{media && (
  <figure class="media-hero mb-8">
    <img
      src={media.src}
      alt={media.caption ?? ''}
      loading="lazy"
      class="w-full rounded-lg shadow-lg"
    />
    <figcaption class="mt-2 text-xs opacity-60 flex gap-3">
      <span>{media.credit}</span>
      <span class="opacity-60">·</span>
      <span class="opacity-60">{media.license}</span>
      {media.source && <><span class="opacity-60">·</span><span>{media.source}</span></>}
    </figcaption>
  </figure>
)}
```

- [ ] **Step 2: Crear `src/components/MediaGallery.astro`**

```astro
---
interface Item {
  src: string; caption?: string; credit: string; license: string;
}
interface Props { items: Item[]; }
const { items } = Astro.props;
---
{items.length > 0 && (
  <div class="media-gallery grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
    {items.map((item) => (
      <figure class="rounded overflow-hidden border border-border">
        <img src={item.src} alt={item.caption ?? ''} loading="lazy" class="w-full aspect-square object-cover" />
        {item.caption && <figcaption class="px-2 py-1 text-[10px] opacity-70">{item.caption}</figcaption>}
      </figure>
    ))}
  </div>
)}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/MediaHero.astro src/components/MediaGallery.astro
git commit -m "feat: MediaHero and MediaGallery components with attribution"
```

---

### Task 26: VideoEmbed (carga lazy)

**Files:**
- Create: `src/components/VideoEmbed.astro`

- [ ] **Step 1: Crear `src/components/VideoEmbed.astro`**

```astro
---
interface Props {
  video?: {
    provider: 'youtube' | 'vimeo' | 'internal';
    id: string;
    title?: string;
    creator: string;
    duration: string;
  };
}
const { video } = Astro.props;
const embedUrl = video
  ? video.provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${video.id}`
    : video.provider === 'vimeo'
      ? `https://player.vimeo.com/video/${video.id}`
      : ''
  : '';
---
{video && (
  <div class="video-embed mt-6" data-video-embed>
    <button
      type="button"
      class="block w-full aspect-video rounded-lg bg-surface border border-border hover:border-accent transition-colors text-left p-6"
      data-video-thumbnail
    >
      <span class="text-xs tracking-wider opacity-60">▶ VER EXPLICACIÓN EN VIDEO</span>
      <p class="font-display text-xl mt-2">{video.title ?? video.creator}</p>
      <p class="text-xs opacity-60 mt-1">{video.creator} · {video.duration}</p>
    </button>
  </div>
)}

<script>
  document.querySelectorAll('[data-video-embed]').forEach((wrapper) => {
    const btn = wrapper.querySelector<HTMLButtonElement>('[data-video-thumbnail]');
    btn?.addEventListener('click', () => {
      const url = btn.dataset.embedUrl;
      if (!url) return;
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.className = 'w-full aspect-video rounded-lg';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      wrapper.innerHTML = '';
      wrapper.appendChild(iframe);
    });
  });
</script>
```

Nota: en uso real, pasar `embed-url={embedUrl}` al botón y leerlo desde `btn.dataset.embedUrl`. Actualizar el render para incluir `data-embed-url={embedUrl}` en el botón.

Ajustar el botón:

```astro
<button
  type="button"
  class="..."
  data-video-thumbnail
  data-embed-url={embedUrl}
>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoEmbed.astro
git commit -m "feat: lazy-loaded VideoEmbed component"
```

---

## Fase 8 — Páginas

### Task 27: BaseLayout y Nav

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteNav.astro`

- [ ] **Step 1: Crear `src/components/SiteNav.astro`**

```astro
---
const links = [
  { href: '/', label: 'Inicio' },
  { href: '/timeline', label: 'Línea de tiempo' },
  { href: '/personajes', label: 'Personajes' },
  { href: '/lugares', label: 'Lugares' },
  { href: '/comparativa', label: 'Comparativa' },
  { href: '/fuentes', label: 'Fuentes' },
  { href: '/sobre', label: 'Sobre' },
];
---
<nav class="site-nav fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-3 bg-bg/70 backdrop-blur border-b border-border">
  <a href="/" class="font-display text-sm tracking-[0.3em] uppercase">Adán → Mahoma</a>
  <ul class="hidden md:flex gap-6 text-xs tracking-wider uppercase opacity-70">
    {links.slice(1).map((l) => (
      <li><a href={l.href} class="hover:opacity-100 hover:text-accent">{l.label}</a></li>
    ))}
  </ul>
</nav>
```

- [ ] **Step 2: Insertar `<SiteNav />` en `BaseLayout.astro` antes de `<slot />`**

Editar `src/layouts/BaseLayout.astro`:

```astro
---
import SiteNav from '../components/SiteNav.astro';
// ... resto del frontmatter
---
<!-- ... head ... -->
  <body data-era="primordial">
    <SiteNav />
    <main class="pt-16"><slot /></main>
    <style is:global>@import '../styles/global.css';</style>
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteNav.astro src/layouts/BaseLayout.astro
git commit -m "feat: site navigation with main pages"
```

---

### Task 28: Página landing (`/`)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Reemplazar `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const events = await getCollection('events');
const eras = await getCollection('eras');
const byEra = new Map<string, typeof events>();
events
  .sort((a, b) => a.data.order - b.data.order)
  .forEach((e) => {
    const list = byEra.get(e.data.era) ?? [];
    list.push(e);
    byEra.set(e.data.era, list);
  });
const sortedEras = eras.sort((a, b) => a.data.order - b.data.order);
---
<BaseLayout title="Línea de Tiempo · Adán → Mahoma">
  <section class="hero min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
    <p class="text-xs tracking-[0.4em] uppercase opacity-60 mb-6">Línea de tiempo</p>
    <h1 class="font-display text-5xl md:text-7xl mb-4">Adán → Mahoma</h1>
    <p class="max-w-2xl text-lg opacity-80 leading-relaxed">
      Un viaje visual por los relatos de la Torá, la Biblia y el Corán —
      comparando, contrastando y mapeando 4.500 años de historia sagrada.
    </p>
    <a href="/timeline" class="inline-block mt-12 px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-bg transition-colors tracking-widest uppercase text-sm">
      Comenzar el viaje ↓
    </a>
    <p class="mt-12 text-xs opacity-60 tracking-wider">
      80 eventos · 3 tradiciones · 6 eras · 4.500 años
    </p>
  </section>

  <section class="indice py-16 px-6 max-w-6xl mx-auto">
    <h2 class="font-display text-2xl mb-8 opacity-80">Índice por era</h2>
    <div class="grid md:grid-cols-2 gap-8">
      {sortedEras.map((era) => (
        <div>
          <h3 class="text-xs tracking-[0.3em] uppercase opacity-60 mb-3">
            Era {era.data.order} · {era.data.name}
          </h3>
          <ul class="space-y-1 text-sm">
            {(byEra.get(era.data.id) ?? []).map((ev) => (
              <li>
                <a href={`/timeline#${ev.data.id}`} class="hover:text-accent">
                  {ev.data.title}
                </a>
                <span class="opacity-50 ml-2">— año {ev.data.biblicalYear}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: landing page with hero and era index"
```

---

### Task 29: Página timeline (`/timeline`)

**Files:**
- Create: `src/pages/timeline.astro`

- [ ] **Step 1: Crear `src/pages/timeline.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection, getEntry } from 'astro:content';
import EventScene from '../components/EventScene.astro';
import EraTransition from '../components/EraTransition.astro';
import ManuscriptMap from '../components/ManuscriptMap.astro';
import ModernMapLayer from '../components/ModernMapLayer.astro';
import MapToggleButton from '../components/MapToggleButton.astro';
import EraTheme from '../components/EraTheme.astro';

const events = (await getCollection('events')).sort((a, b) => a.data.order - b.data.order);
const eras = (await getCollection('eras')).sort((a, b) => a.data.order - b.data.order);

const scenes = [];
let lastEra: string | null = null;
for (const event of events) {
  if (lastEra && lastEra !== event.data.era) {
    const from = await getEntry('eras', lastEra);
    const to = await getEntry('eras', event.data.era);
    if (from && to) scenes.push({ type: 'transition' as const, from, to });
  }
  scenes.push({ type: 'event' as const, event });
  lastEra = event.data.era;
}

const sceneConfigs = events.map((e) => ({
  eventId: e.data.id,
  eraId: e.data.era,
  svgPosition: e.data.locations[0]?.svgPosition ?? [500, 300],
  coords: e.data.locations[0]?.coords,
}));

const allMarkers = events.flatMap((e) =>
  e.data.locations.map((l) => ({
    id: `${e.data.id}-${l.id}`,
    svgPosition: l.svgPosition,
    label: l.ancientName,
    coords: l.coords,
  }))
);
---
<BaseLayout title="Línea de tiempo · Adán → Mahoma">
  {eras.map((era) => <EraTheme era={era} />)}

  <div class="relative">
    <div class="map-sticky hidden lg:block fixed top-16 right-0 w-[60%] h-[calc(100vh-4rem)]">
      <ManuscriptMap />
      <ModernMapLayer />
      <MapToggleButton />
    </div>

    <div class="scenes">
      {scenes.map((s) => s.type === 'transition'
        ? <EraTransition from={s.from} to={s.to} />
        : <EventScene event={s.event} />
      )}
    </div>
  </div>

  <script define:vars={{ sceneConfigs, allMarkers }}>
    Promise.all([
      import('../lib/sceneController'),
      import('../lib/mapMarkers'),
      import('../lib/mapToggle'),
    ]).then(([{ initScrollytelling }, { renderMarker }, { registerMarkers }]) => {
      const svg = document.querySelector('[data-map-root]');
      if (svg) {
        allMarkers.forEach((m) => renderMarker(svg, m));
      }
      registerMarkers(allMarkers.filter((m) => m.coords).map((m) => ({
        id: m.id, coords: m.coords, label: m.label,
      })));
      initScrollytelling(sceneConfigs);
    });
  </script>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/timeline.astro
git commit -m "feat: timeline page wires scrollytelling, map, and scenes"
```

---

### Task 30: Página personajes index y detalle

**Files:**
- Create: `src/pages/personajes/index.astro`
- Create: `src/pages/personajes/[id].astro`
- Create: `src/components/CharacterTimeline.astro`

- [ ] **Step 1: Crear `src/components/CharacterTimeline.astro`**

```astro
---
interface Props { birthYear?: number; deathYear?: number; events: { id: string; year: number; label: string }[]; }
const { birthYear, deathYear, events } = Astro.props;
const min = birthYear ?? Math.min(...events.map((e) => e.year));
const max = deathYear ?? Math.max(...events.map((e) => e.year));
const span = max - min || 1;
function pct(y: number) { return ((y - min) / span) * 100; }
---
<div class="character-timeline relative h-12 my-6">
  <div class="absolute top-1/2 left-0 right-0 h-px bg-border"></div>
  {events.map((e) => (
    <div class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 group" style={`left: ${pct(e.year)}%`}>
      <div class="w-2 h-2 rounded-full bg-primary"></div>
      <div class="absolute top-full mt-2 text-[10px] whitespace-nowrap opacity-60 group-hover:opacity-100">
        {e.label} <span class="opacity-50">— {e.year}</span>
      </div>
    </div>
  ))}
  {birthYear !== undefined && (
    <div class="absolute top-1/2 -translate-y-1/2 left-0 text-[10px] opacity-60">{birthYear}</div>
  )}
  {deathYear !== undefined && (
    <div class="absolute top-1/2 -translate-y-1/2 right-0 text-[10px] opacity-60">{deathYear}</div>
  )}
</div>
```

- [ ] **Step 2: Crear `src/pages/personajes/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const chars = (await getCollection('characters')).sort((a, b) =>
  (a.data.birthYear ?? 0) - (b.data.birthYear ?? 0));
---
<BaseLayout title="Personajes">
  <section class="px-6 py-16 max-w-5xl mx-auto">
    <h1 class="font-display text-4xl mb-2">Personajes</h1>
    <p class="opacity-70 mb-10">Vidas y menciones en las tres tradiciones.</p>
    <ul class="grid md:grid-cols-2 gap-6">
      {chars.map((c) => (
        <li class="border border-border rounded-lg p-5 hover:border-accent transition-colors">
          <a href={`/personajes/${c.data.id}`}>
            <h2 class="font-display text-2xl">{c.data.name}</h2>
            {c.data.alternateNames.meaning && (
              <p class="text-xs italic opacity-60 mt-1">"{c.data.alternateNames.meaning}"</p>
            )}
            <p class="text-sm opacity-70 mt-3">
              {c.data.birthYear !== undefined && `Año ${c.data.birthYear}`}
              {c.data.deathYear !== undefined && ` — ${c.data.deathYear}`}
              {c.data.ageAtDeath && ` (vivió ${c.data.ageAtDeath} años)`}
            </p>
          </a>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Crear `src/pages/personajes/[id].astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import CharacterTimeline from '../../components/CharacterTimeline.astro';
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const chars = await getCollection('characters');
  return chars.map((c) => ({ params: { id: c.data.id }, props: { char: c } }));
}

const { char } = Astro.props;
const data = char.data;
const { Content } = await char.render();

const eventEntries = await Promise.all(
  data.events.map(async (id) => {
    const e = await getEntry('events', id);
    return e ? { id: e.data.id, year: e.data.biblicalYear, label: e.data.title } : null;
  })
);
const events = eventEntries.filter(Boolean) as { id: string; year: number; label: string }[];

const mentionsCount =
  data.mentions.tora.length + data.mentions.biblia.length + data.mentions.coran.length;
---
<BaseLayout title={data.name}>
  <article class="px-6 py-16 max-w-4xl mx-auto">
    <header class="mb-10">
      <h1 class="font-display text-5xl">{data.name}</h1>
      {(data.alternateNames.hebrew || data.alternateNames.arabic) && (
        <p class="text-lg opacity-70 mt-2">
          {data.alternateNames.hebrew} {data.alternateNames.hebrew && data.alternateNames.arabic && '·'} {data.alternateNames.arabic}
        </p>
      )}
      {data.alternateNames.meaning && (
        <p class="italic opacity-60 mt-2">"{data.alternateNames.meaning}"</p>
      )}
      <p class="text-sm opacity-70 mt-4">
        {data.birthYear !== undefined && `Año ${data.birthYear}`}
        {data.deathYear !== undefined && ` — ${data.deathYear}`}
        {data.ageAtDeath && ` (vivió ${data.ageAtDeath} años)`}
      </p>
    </header>

    {events.length > 0 && <CharacterTimeline birthYear={data.birthYear} deathYear={data.deathYear} events={events} />}

    {data.significance && (
      <section class="prose prose-invert max-w-none mb-10">
        <Content />
      </section>
    )}

    <section class="mb-10">
      <h2 class="font-display text-2xl mb-4">Menciones en las escrituras <span class="text-sm opacity-60">({mentionsCount} menciones)</span></h2>

      {data.mentions.tora.length > 0 && (
        <div class="mb-6">
          <h3 class="text-xs tracking-[0.3em] uppercase opacity-70 mb-3">📜 Torá ({data.mentions.tora.length})</h3>
          <ul class="space-y-3">
            {data.mentions.tora.map((m) => (
              <li class="border-l-2 border-primary/40 pl-4">
                <p class="font-semibold">{m.book} {m.reference}</p>
                <p class="text-sm opacity-80">{m.summary}</p>
                {m.fullText && <details class="text-xs opacity-70 mt-1"><summary class="cursor-pointer">+ cita</summary><blockquote class="italic mt-2">{m.fullText}</blockquote></details>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.mentions.biblia.length > 0 && (
        <div class="mb-6">
          <h3 class="text-xs tracking-[0.3em] uppercase opacity-70 mb-3">✝ Biblia ({data.mentions.biblia.length})</h3>
          <ul class="space-y-3">
            {data.mentions.biblia.map((m) => (
              <li class="border-l-2 border-primary/40 pl-4">
                <p class="font-semibold">{m.book} {m.reference}</p>
                <p class="text-sm opacity-80">{m.summary}</p>
                {m.fullText && <details class="text-xs opacity-70 mt-1"><summary class="cursor-pointer">+ cita</summary><blockquote class="italic mt-2">{m.fullText}</blockquote></details>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.mentions.coran.length > 0 && (
        <div class="mb-6">
          <h3 class="text-xs tracking-[0.3em] uppercase opacity-70 mb-3">☪ Corán ({data.mentions.coran.length})</h3>
          <ul class="space-y-3">
            {data.mentions.coran.map((m) => (
              <li class="border-l-2 border-primary/40 pl-4">
                <p class="font-semibold">Sura {m.sura} ({m.number}) v.{m.verses}</p>
                <p class="text-sm opacity-80">{m.summary}</p>
                {m.fullText && <details class="text-xs opacity-70 mt-1"><summary class="cursor-pointer">+ cita</summary><blockquote class="italic mt-2">{m.fullText}</blockquote></details>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>

    {data.extraBiblical.length > 0 && (
      <section class="mb-10">
        <h2 class="font-display text-2xl mb-4">Tradiciones complementarias</h2>
        <ul class="space-y-2 text-sm">
          {data.extraBiblical.map((e) => (
            <li>🟡 <strong>{e.source}</strong> — {e.summary}</li>
          ))}
        </ul>
      </section>
    )}
  </article>
</BaseLayout>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CharacterTimeline.astro src/pages/personajes/
git commit -m "feat: personajes index and detail pages with mentions"
```

---

### Task 31: Páginas restantes (lugares, comparativa, fuentes, sobre)

**Files:**
- Create: `src/pages/lugares/index.astro`
- Create: `src/pages/comparativa.astro`
- Create: `src/pages/fuentes.astro`
- Create: `src/pages/sobre.astro`

- [ ] **Step 1: Crear `src/pages/lugares/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const locations = await getCollection('locations');
const byRegion = new Map<string, typeof locations>();
locations.forEach((l) => {
  const list = byRegion.get(l.data.region) ?? [];
  list.push(l);
  byRegion.set(l.data.region, list);
});
---
<BaseLayout title="Lugares">
  <section class="px-6 py-16 max-w-5xl mx-auto">
    <h1 class="font-display text-4xl mb-2">Lugares</h1>
    <p class="opacity-70 mb-10">Geografía sagrada: el escenario de los relatos.</p>
    {[...byRegion.entries()].map(([region, items]) => (
      <div class="mb-10">
        <h2 class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">{region}</h2>
        <ul class="grid md:grid-cols-2 gap-4">
          {items.map((l) => (
            <li class="border border-border rounded-lg p-4">
              <h3 class="font-display text-xl">{l.data.ancientName}</h3>
              {l.data.modernName && <p class="text-xs opacity-60">{l.data.modernName}</p>}
              {l.data.disputed && <span class="inline-block mt-2 text-[10px] px-2 py-0.5 border border-yellow-500/50 rounded">Localización disputada</span>}
              <p class="text-sm opacity-80 mt-2">{l.data.description}</p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 2: Crear `src/pages/comparativa.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const events = (await getCollection('events'))
  .filter((e) => e.data.comparative.divergent)
  .sort((a, b) => a.data.order - b.data.order);
---
<BaseLayout title="Comparativa entre tradiciones">
  <section class="px-6 py-16 max-w-6xl mx-auto">
    <h1 class="font-display text-4xl mb-2">Comparativa</h1>
    <p class="opacity-70 mb-10">Eventos donde la Torá, la Biblia y el Corán difieren.</p>
    <table class="w-full text-sm">
      <thead class="text-xs uppercase tracking-wider opacity-60">
        <tr>
          <th class="text-left p-3">Evento</th>
          <th class="text-left p-3 w-1/4">📜 Torá</th>
          <th class="text-left p-3 w-1/4">✝ Biblia</th>
          <th class="text-left p-3 w-1/4">☪ Corán</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e) => (
          <tr class="border-t border-border">
            <td class="p-3 align-top">
              <a href={`/timeline#${e.data.id}`} class="font-display hover:text-accent">{e.data.title}</a>
              <p class="text-xs opacity-60 mt-1">Año {e.data.biblicalYear}</p>
            </td>
            <td class="p-3 align-top opacity-90">{e.data.comparative.tora?.summary ?? '—'}</td>
            <td class="p-3 align-top opacity-90">{e.data.comparative.biblia?.summary ?? '—'}</td>
            <td class="p-3 align-top opacity-90">{e.data.comparative.coran?.summary ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Crear `src/pages/fuentes.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const events = await getCollection('events');
const all = events.flatMap((e) => e.data.sources.map((s) => ({ ...s, eventId: e.data.id, eventTitle: e.data.title })));
const byType = new Map<string, typeof all>();
all.forEach((s) => {
  const list = byType.get(s.type) ?? [];
  list.push(s);
  byType.set(s.type, list);
});
const typeLabels: Record<string, string> = {
  canonical: '🔵 Canónico', apocryphal: '🟡 Apócrifo',
  traditional: '🟢 Tradición', archaeological: '🟤 Arqueología',
};
---
<BaseLayout title="Fuentes">
  <section class="px-6 py-16 max-w-5xl mx-auto">
    <h1 class="font-display text-4xl mb-2">Fuentes</h1>
    <p class="opacity-70 mb-10">Índice de todas las referencias consultadas.</p>
    {[...byType.entries()].map(([type, items]) => (
      <div class="mb-10">
        <h2 class="text-sm tracking-[0.3em] uppercase opacity-70 mb-4">{typeLabels[type]}</h2>
        <ul class="space-y-2 text-sm">
          {items.map((s) => (
            <li>
              <strong>{s.title}</strong>
              {s.note && <span class="opacity-60"> — {s.note}</span>}
              <span class="opacity-50 ml-2">→ <a href={`/timeline#${s.eventId}`} class="hover:text-accent">{s.eventTitle}</a></span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
</BaseLayout>
```

- [ ] **Step 4: Crear `src/pages/sobre.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Sobre el proyecto">
  <article class="px-6 py-16 max-w-3xl mx-auto prose prose-invert">
    <h1 class="font-display text-4xl mb-2">Sobre el proyecto</h1>
    <p class="opacity-80">
      Este sitio es una línea de tiempo unificada de los relatos compartidos por la Torá, la Biblia y el Corán,
      desde el nacimiento de Adán hasta la muerte de Mahoma — abarcando 4.500 años de historia sagrada.
    </p>
    <h2>Metodología</h2>
    <p>
      Para cada evento partimos del texto canónico de cada tradición y lo verificamos contra fuentes académicas.
      Cuando incluimos material apócrifo, tradicional (midrashim, hadices) o paralelos arqueológicos,
      lo señalamos explícitamente con badges de color: 🔵 canónico, 🟡 apócrifo, 🟢 tradición, 🟤 arqueología.
    </p>
    <h2>Tradiciones consultadas</h2>
    <ul>
      <li><strong>Torá</strong>: texto masorético hebreo, vía Sefaria.org.</li>
      <li><strong>Biblia cristiana</strong>: Reina-Valera 1960 y NVI; NT cuando aporta interpretación.</li>
      <li><strong>Corán</strong>: traducción Cortés y Asad; vía Quran.com.</li>
    </ul>
    <h2>Localizaciones disputadas</h2>
    <p>
      Cuando una ubicación es académicamente disputada (ej. el Edén, el Monte Sinaí),
      la marcamos como tal y presentamos las propuestas alternativas con sus argumentos.
    </p>
  </article>
</BaseLayout>
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/lugares/ src/pages/comparativa.astro src/pages/fuentes.astro src/pages/sobre.astro
git commit -m "feat: secondary pages (lugares, comparativa, fuentes, sobre)"
```

---

## Fase 9 — Contenido Era Primordial

> Cada uno de los 12 eventos sigue el mismo patrón: archivo `.mdx` en `src/content/events/` con frontmatter completo + cuerpo MDX narrativo. Cada personaje sigue el mismo patrón en `src/content/characters/`.

### Task 32: Locations de la Era Primordial

**Files:**
- Create: `src/content/locations/eden.json`
- Create: `src/content/locations/tierra-de-nod.json`
- Create: `src/content/locations/monte-ararat.json`
- Create: `src/content/locations/cueva-de-los-tesoros.json`

- [ ] **Step 1: Crear `src/content/locations/eden.json`** (disputada)

```json
{
  "id": "eden",
  "ancientName": "Edén",
  "region": "mesopotamia",
  "disputed": true,
  "proposedLocations": [
    {
      "name": "Mesopotamia meridional (Tigris-Éufrates)",
      "coords": [31.0, 47.5],
      "svgPosition": [620, 320],
      "support": "El texto bíblico menciona el Tigris y el Éufrates como ríos que salen del Edén; la confluencia se encuentra en el sur de Mesopotamia (actual Irak)."
    },
    {
      "name": "Meseta de Armenia",
      "coords": [40.0, 44.0],
      "svgPosition": [560, 200],
      "support": "Tradición rabínica y algunos comentaristas patrísticos sitúan el Edén en las fuentes de los grandes ríos."
    }
  ],
  "description": "Jardín primordial donde fueron creados Adán y Eva. Los textos bíblicos mencionan cuatro ríos: Pisón, Gihón, Tigris (Hidekel) y Éufrates.",
  "events": ["nacimiento-adan-eva", "expulsion-eden"]
}
```

- [ ] **Step 2: Crear `src/content/locations/tierra-de-nod.json`**

```json
{
  "id": "tierra-de-nod",
  "ancientName": "Tierra de Nod",
  "region": "mesopotamia",
  "coords": [33.5, 44.0],
  "svgPosition": [600, 270],
  "disputed": false,
  "description": "'Tierra del exilio' al oriente del Edén, a donde huyó Caín tras matar a Abel. Allí fundó la ciudad de Enoc en honor a su hijo.",
  "events": ["cain-mata-abel"]
}
```

- [ ] **Step 3: Crear `src/content/locations/monte-ararat.json`**

```json
{
  "id": "monte-ararat",
  "ancientName": "Ararat",
  "modernName": "Monte Ararat, Turquía oriental",
  "region": "anatolia",
  "coords": [39.7, 44.3],
  "svgPosition": [555, 195],
  "disputed": false,
  "description": "Cima donde reposó el arca de Noé tras el Diluvio según las tres tradiciones. Hoy es el pico más alto de Turquía.",
  "events": ["diluvio", "alianza-arcoiris"]
}
```

- [ ] **Step 4: Crear `src/content/locations/cueva-de-los-tesoros.json`**

```json
{
  "id": "cueva-de-los-tesoros",
  "ancientName": "Cueva de los Tesoros",
  "region": "levante",
  "coords": [21.4, 39.8],
  "svgPosition": [610, 410],
  "disputed": true,
  "proposedLocations": [
    { "name": "La Meca (tradición islámica)",       "coords": [21.4, 39.8],  "svgPosition": [610, 410], "support": "Tradición islámica" },
    { "name": "Jerusalén (tradición cristiana)",    "coords": [31.78, 35.22], "svgPosition": [600, 370], "support": "Tradición cristiana siríaca (Libro de la Cueva de los Tesoros)" }
  ],
  "description": "Lugar de sepultura tradicional de Adán y Eva según fuentes apócrifas y tradiciones diversas.",
  "events": ["muerte-adan", "muerte-eva"]
}
```

- [ ] **Step 5: Commit**

```bash
git add src/content/locations/
git commit -m "content: locations for era primordial"
```

---

### Task 33: Personajes Era Primordial (Adán, Eva, Caín, Abel, Set)

**Files:**
- Create: `src/content/characters/adan.mdx`
- Create: `src/content/characters/eva.mdx`
- Create: `src/content/characters/cain.mdx`
- Create: `src/content/characters/abel.mdx`
- Create: `src/content/characters/set.mdx`

- [ ] **Step 1: Crear `src/content/characters/adan.mdx`**

```mdx
---
id: "adan"
name: "Adán"
alternateNames:
  hebrew: "אָדָם (Adam)"
  arabic: "آدَم (Ādam)"
  meaning: "De la tierra (adamah) / humano"
birthYear: 0
deathYear: 930
ageAtDeath: 930
parents: []
spouse: "eva"
children: ["cain", "abel", "set"]
events: ["nacimiento-adan-eva", "expulsion-eden", "muerte-adan"]
mentions:
  tora:
    - { book: "Génesis", reference: "1:26-2:25", summary: "Creación del hombre a imagen de Dios; formación de Eva; vida en el Edén." }
    - { book: "Génesis", reference: "3:1-24",   summary: "Caída, expulsión, sentencia al trabajo y la mortalidad." }
    - { book: "Génesis", reference: "5:1-5",    summary: "Genealogía: vivió 930 años y engendró a Set entre otros." }
  biblia:
    - { book: "Génesis",    reference: "1-5", summary: "Mismas menciones que la Torá." }
    - { book: "Romanos",    reference: "5:12-21", summary: "Pablo contrasta a Adán (caída) con Cristo (redención)." }
    - { book: "1 Corintios", reference: "15:22, 45", summary: "Adán como 'primer hombre, alma viviente'; Cristo como 'último Adán'." }
    - { book: "Lucas",      reference: "3:38", summary: "Genealogía de Jesús hasta 'Adán, hijo de Dios'." }
  coran:
    - { sura: "Al-Baqara", number: 2, verses: "30-37", summary: "Creación de Adán como vicario (jalifa) en la tierra; prosternación de los ángeles; caída por engaño de Iblis." }
    - { sura: "Al-A'raf",  number: 7, verses: "11-25", summary: "Detalle del engaño, vergüenza tras comer del árbol, expulsión." }
    - { sura: "Ta-Ha",     number: 20, verses: "115-123", summary: "Pacto olvidado; perdón tras el arrepentimiento." }
    - { sura: "Sad",       number: 38, verses: "71-85", summary: "Iblis rechaza prosternarse y jura desviar a los hijos de Adán." }
extraBiblical:
  - { source: "Libro de Adán y Eva (apócrifo)", summary: "Vida de Adán y Eva tras la expulsión del Edén, arrepentimiento y revelaciones." }
  - { source: "Libro de la Cueva de los Tesoros", summary: "Adán enterrado en la 'Cueva de los Tesoros' en el centro de la tierra." }
  - { source: "Hadiz Sahih Bukhari 4:55:543", summary: "Adán medía 30 metros (60 codos) al ser creado." }
  - { source: "Pirkei de-Rabbí Eliezer 12", summary: "Adán fue creado del polvo recogido de los cuatro extremos de la tierra." }
roles: ["primer-humano", "patriarca", "profeta-islam"]
titles:
  - { tradition: "judaísmo",     title: "Adam HaRishon (el primer Adán)" }
  - { tradition: "cristianismo", title: "Padre de la humanidad" }
  - { tradition: "islam",        title: "Khalifa (vicario de Dios en la tierra), primer profeta" }
significance: |
  Adán es el origen compartido de las tres tradiciones. En el judaísmo y cristianismo
  representa el inicio de la humanidad y, por su caída, la entrada del pecado al mundo.
  En el cristianismo es contrapuesto a Cristo como el "primer Adán" frente al "último Adán".
  En el Islam es el primer profeta, creado como vicario de Dios y arrepentido tras la caída
  — no transmite pecado original.
trivia:
  - "Su nombre 'adam' proviene de 'adamah' (tierra), la materia de la que fue formado"
  - "Las tres tradiciones coinciden en que fue el primer ser humano"
  - "Solo la tradición cristiana enseña el 'pecado original' transmitido por su falta"
---

Adán es el primer ser humano según las tres tradiciones abrahámicas. Su historia
abre el relato sagrado: su creación, su vida en el Edén, su caída, y su muerte
marcan los primeros 930 años de la cronología bíblica.

En el judaísmo y el cristianismo, Adán representa la condición humana original
— creada buena, dotada de libre albedrío, capaz de fallar. En el cristianismo,
su desobediencia trae la mortalidad y el pecado al mundo, que Cristo viene a
redimir como "el último Adán".

En el Islam, Adán es honrado como **profeta** y vicario de Dios (khalifa). Su
caída es un episodio puntual: arrepentido, es perdonado. No hay doctrina de
"pecado original".
```

- [ ] **Step 2: Crear los archivos restantes** (`eva.mdx`, `cain.mdx`, `abel.mdx`, `set.mdx`)

Seguir el mismo formato. Mantener el mismo esquema de frontmatter completo + cuerpo narrativo.

Datos clave a verificar:
- **Eva**: nace año 0, muere 931, esposa de Adán, madre de Caín/Abel/Set. Hebreo: חַוָּה (Javá). Árabe: حَوَّاء (Hawwa'). Significado: "vida / madre de los vivientes".
- **Caín**: nace año 2. Hebreo: קַיִן (Qayin). Árabe: قَابِيل (Qābīl). Agricultor. Asesino de Abel. Exiliado a Tierra de Nod.
- **Abel**: nace año 3, muere ~año 130. Hebreo: הֶבֶל (Hével). Árabe: هَابِيل (Hābīl). Pastor. Primera víctima de homicidio.
- **Set**: nace año 130. Hebreo: שֵׁת (Shet). Árabe: شِيث (Shīth). Tercer hijo de Adán. Antepasado directo de Noé. Considerado profeta en el Islam.

- [ ] **Step 3: Commit**

```bash
git add src/content/characters/adan.mdx src/content/characters/eva.mdx src/content/characters/cain.mdx src/content/characters/abel.mdx src/content/characters/set.mdx
git commit -m "content: characters adan eva cain abel set"
```

---

### Task 34: Personajes Era Primordial (Enoc, Matusalén, Lamec, Noé, Sem, Cam, Jafet)

**Files:**
- Create: `src/content/characters/enoc.mdx`
- Create: `src/content/characters/matusalen.mdx`
- Create: `src/content/characters/lamec.mdx`
- Create: `src/content/characters/noe.mdx`
- Create: `src/content/characters/sem.mdx`
- Create: `src/content/characters/cam.mdx`
- Create: `src/content/characters/jafet.mdx`

- [ ] **Step 1: Crear los 7 archivos siguiendo el patrón del Task 33**

Datos clave:
- **Enoc** (año 622-987): hijo de Jared. "Caminó con Dios". No murió (Génesis 5:24). Hebreo: חֲנוֹךְ (Janoj). Árabe: إِدْرِيس (Idris). Autor tradicional del Libro de Enoc. En Islam considerado profeta.
- **Matusalén** (año 687-1656): hijo de Enoc, abuelo de Noé. Vivió 969 años (el humano de mayor longevidad). Su nombre significa "su muerte traerá" — murió 7 días antes del Diluvio.
- **Lamec** (año 874-1651): hijo de Matusalén, padre de Noé. No confundir con el Lamec descendiente de Caín (Gn 4:18-24).
- **Noé** (año 1056-2006): protagonista del Diluvio. Único humano descrito como "justo en su generación". Hebreo: נֹחַ (Noaj). Árabe: نُوح (Nūh). Mencionado en 28 suras del Corán. Considerado profeta en las tres tradiciones.
- **Sem** (año 1558-2158): hijo mayor de Noé. Antepasado de Abraham. De su nombre viene "semita". Bendición principal.
- **Cam** (~1558): hijo de Noé. Padre de Cus, Mizraim (Egipto), Fut, Canaán. Maldecido por Noé tras incidente del vino.
- **Jafet** (~1558): hijo de Noé. Antepasado tradicional de los pueblos del norte (griegos, etc.).

Para cada uno, completar frontmatter con `mentions.tora/biblia/coran`, `extraBiblical`, `roles`, `titles`, `significance`, `trivia`, y un cuerpo MDX de 3-5 párrafos.

- [ ] **Step 2: Commit**

```bash
git add src/content/characters/enoc.mdx src/content/characters/matusalen.mdx src/content/characters/lamec.mdx src/content/characters/noe.mdx src/content/characters/sem.mdx src/content/characters/cam.mdx src/content/characters/jafet.mdx
git commit -m "content: characters enoc matusalen lamec noe sem cam jafet"
```

---

### Task 35: Eventos Era Primordial — Parte 1 (Adán, Eva, Caín y Abel)

**Files:**
- Create: `src/content/events/nacimiento-adan-eva.mdx`
- Create: `src/content/events/expulsion-eden.mdx`
- Create: `src/content/events/nacimiento-cain.mdx`
- Create: `src/content/events/nacimiento-abel.mdx`
- Create: `src/content/events/cain-mata-abel.mdx`
- Create: `src/content/events/nacimiento-set.mdx`

- [ ] **Step 1: Crear `src/content/events/nacimiento-adan-eva.mdx`**

```mdx
---
id: "nacimiento-adan-eva"
order: 1
title: "Nacimiento de Adán y Eva"
subtitle: "La creación del primer hombre y la primera mujer"
biblicalYear: 0
gregorianYear: -3760
era: "primordial"
locations:
  - id: "eden"
    role: "escenario"
    ancientName: "Edén"
    svgPosition: [620, 320]
characters:
  - { id: "adan", role: "protagonista" }
  - { id: "eva", role: "protagonista" }
tags: ["creación", "edén", "origen", "humanidad"]
comparative:
  unified: "Adán y Eva son creados por Dios y puestos en el jardín del Edén. Eva es formada a partir de Adán (en la Torá y Biblia) o conjuntamente (en interpretaciones del Corán). Las tres tradiciones los reconocen como los primeros humanos."
  divergent: true
  tora:
    summary: "Adán formado del polvo (Gn 2:7). Eva formada de su costilla durante un sueño profundo (Gn 2:21-22). Ambos creados a imagen de Dios."
    citation: "Génesis 1:26-2:25"
    fullText: "Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza... Y Jehová Dios formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida, y fue el hombre un ser viviente."
    keyDifferences: ["Eva formada de la costilla de Adán"]
  biblia:
    summary: "Mismo relato que Torá. El NT añade interpretación: Pablo enseña que Adán fue formado primero y luego Eva (1 Tim 2:13)."
    citation: "Génesis 1-2; 1 Timoteo 2:13; 1 Corintios 11:8"
    fullText: "Porque Adán fue formado primero, después Eva."
    keyDifferences: ["Pablo desarrolla la temporalidad como argumento teológico"]
  coran:
    summary: "Dios crea a Adán de arcilla. Eva (sin nombre en el Corán) es creada del 'nafs' (alma/ser) de Adán — no explícitamente de su costilla. Los ángeles deben prosternarse ante Adán; Iblis se rehúsa."
    citation: "Sura Al-Baqara 2:30-34; Sura An-Nisa 4:1; Sura Sad 38:71-72"
    fullText: "Y cuando tu Señor dijo a los ángeles: 'Voy a poner un sucesor en la tierra'... Lo creé de arcilla seca y de barro maleable, y le insuflé de Mi espíritu."
    keyDifferences: ["Dios anuncia a los ángeles antes de crear a Adán", "Iblis rechaza la prosternación — origen de la enemistad", "Eva no es nombrada"]
sources:
  - { type: "canonical", title: "Génesis 1:26-2:25",   weight: "primary" }
  - { type: "canonical", title: "Sura Al-Baqara 30-37", weight: "primary" }
  - { type: "apocryphal", title: "Libro de los Jubileos 2-3" }
  - { type: "traditional", title: "Bereshit Rabbá 17", note: "Midrash sobre la creación de Eva" }
trivia:
  - "Adán significa literalmente 'de la tierra' (adamah)"
  - "Eva significa 'vida' / 'madre de los vivientes' (Javá)"
  - "En el Corán, los ángeles cuestionan la creación de Adán: '¿Vas a poner allí a quien corrompa?'"
media:
  hero:
    src: "/images/events/creacion-adan-michelangelo.jpg"
    credit: "Miguel Ángel, La creación de Adán (Capilla Sixtina, 1512)"
    license: "public-domain"
    source: "Wikimedia Commons"
deepDive:
  originalTexts:
    - { tradition: "tora",   url: "https://www.sefaria.org/Genesis.1?lang=es", label: "Génesis 1-2 en Sefaria" }
    - { tradition: "biblia", url: "https://www.biblegateway.com/passage/?search=Genesis+1-2&version=RVR1960", label: "Génesis 1-2 en BibleGateway" }
    - { tradition: "coran",  url: "https://quran.com/2/30-37", label: "Sura Al-Baqara 30-37 en Quran.com" }
  academic:
    - { type: "wikipedia", url: "https://es.wikipedia.org/wiki/Ad%C3%A1n_y_Eva", label: "Adán y Eva (Wikipedia)" }
  videos:
    - { provider: "youtube", id: "lo6oZQU0830", creator: "BibleProject", duration: "6:00", label: "Génesis 1-11 explicado" }
  archaeology: []
---

Las tres tradiciones abrahámicas comienzan en el mismo lugar: el jardín del Edén,
donde Dios crea al primer hombre y a la primera mujer. Es el punto cero de la
historia humana.

En la Torá, el relato se cuenta dos veces: una breve (Gn 1:26-31, "hombre y mujer
los creó") y una extensa (Gn 2:7-25, donde Adán es formado primero del polvo y
Eva luego de su costilla). El Corán retoma el episodio pero lo enmarca de
otra manera: Dios anuncia su decisión a los ángeles, quienes cuestionan
("¿pondrás allí a quien corrompa?"), y todos se prosternan excepto Iblis (Satanás),
quien se niega por orgullo.

Este detalle del rechazo de Iblis es central en la teología islámica — explica
el origen del mal y la enemistad cósmica. La Torá y la Biblia no lo mencionan
en este punto; la figura de la serpiente aparece recién en Génesis 3.
```

- [ ] **Step 2: Crear los 5 eventos restantes** (`expulsion-eden`, `nacimiento-cain`, `nacimiento-abel`, `cain-mata-abel`, `nacimiento-set`)

Seguir el mismo patrón. Para `cain-mata-abel` (año ~125), `comparative.divergent` debe ser true — la diferencia clave es el motivo del rechazo:
- **Torá/Biblia**: Dios prefiere ofrenda animal de Abel sobre frutos de Caín
- **Corán** (Al-Ma'ida 27-31): "Dios solo acepta de los temerosos". Abel le dice a Caín que no se defenderá. Un cuervo enseña a Caín a enterrar el cuerpo.

- [ ] **Step 3: Commit**

```bash
git add src/content/events/nacimiento-adan-eva.mdx src/content/events/expulsion-eden.mdx src/content/events/nacimiento-cain.mdx src/content/events/nacimiento-abel.mdx src/content/events/cain-mata-abel.mdx src/content/events/nacimiento-set.mdx
git commit -m "content: events from creation to nacimiento de set"
```

---

### Task 36: Eventos Era Primordial — Parte 2 (Enoc, Matusalén, Noé, Diluvio)

**Files:**
- Create: `src/content/events/nacimiento-enoc.mdx`
- Create: `src/content/events/asuncion-enoc.mdx`
- Create: `src/content/events/nacimiento-noe.mdx`
- Create: `src/content/events/orden-construir-arca.mdx`
- Create: `src/content/events/diluvio.mdx`
- Create: `src/content/events/alianza-arcoiris.mdx`

- [ ] **Step 1: Crear los 6 archivos siguiendo el patrón del Task 35**

Datos clave por evento:

- **`nacimiento-enoc`** (año 622): hijo de Jared. Padre de Matusalén. Marca el inicio del linaje "que camina con Dios".
- **`asuncion-enoc`** (año 987): "Y caminó Enoc con Dios, y desapareció, porque le llevó Dios" (Gn 5:24). En Islam (Idris) es elevado al cielo (Sura 19:56-57). En el Libro de Enoc (apócrifo) recibe revelaciones sobre los Vigilantes, los Nephilim, y el juicio futuro.
- **`nacimiento-noe`** (año 1056): hijo de Lamec. Su padre profetiza que traerá descanso de la maldición de la tierra.
- **`orden-construir-arca`** (año 1536): Dios ordena a Noé construir el arca. Especificaciones precisas en Génesis 6:14-16 (300×50×30 codos, 3 pisos). En Corán Hud 11:37-38 hay diálogo donde el pueblo se burla.
- **`diluvio`** (año 1656): 40 días y 40 noches de lluvia + 150 días de agua creciente + ~1 año total. `comparative.divergent: true` — en el Corán uno de los hijos de Noé no creyó y se ahogó (Hud 11:42-46). El nombre del hijo no está en el Corán, la tradición lo llama Yam o Kan'an.
- **`alianza-arcoiris`** (año 1657): arcoíris como señal de la alianza. Las tres tradiciones coinciden.

Estructura igual al Task 35: frontmatter completo + cuerpo MDX 3-5 párrafos + sources con badges + deepDive con links reales.

- [ ] **Step 2: Verificar que Astro compila todo el contenido**

```bash
npm run astro check
```

Expected: 0 errors. Si hay errores de schema, ajustar el frontmatter.

- [ ] **Step 3: Commit**

```bash
git add src/content/events/nacimiento-enoc.mdx src/content/events/asuncion-enoc.mdx src/content/events/nacimiento-noe.mdx src/content/events/orden-construir-arca.mdx src/content/events/diluvio.mdx src/content/events/alianza-arcoiris.mdx
git commit -m "content: events enoc, noe and diluvio"
```

---

## Fase 10 — Verificación y deploy

### Task 37: Script de verificación de citas

**Files:**
- Create: `scripts/verify-citations.ts`
- Modify: `package.json`

- [ ] **Step 1: Instalar deps de scripting**

```bash
npm install -D tsx fast-glob
```

- [ ] **Step 2: Crear `scripts/verify-citations.ts`**

```ts
import { promises as fs } from 'node:fs';
import fg from 'fast-glob';
import matter from 'gray-matter';

const BIBLE_BOOKS = new Set([
  'Génesis','Éxodo','Levítico','Números','Deuteronomio',
  'Josué','Jueces','Rut','1 Samuel','2 Samuel','1 Reyes','2 Reyes',
  'Salmos','Isaías','Jeremías','Ezequiel','Daniel',
  'Mateo','Marcos','Lucas','Juan','Hechos','Romanos',
  '1 Corintios','2 Corintios','Hebreos','1 Pedro','2 Pedro','1 Timoteo',
]);

async function main() {
  const issues: string[] = [];

  const events = await fg('src/content/events/**/*.mdx');
  for (const file of events) {
    const src = await fs.readFile(file, 'utf-8');
    const { data } = matter(src);

    for (const src of (data.sources ?? [])) {
      if (!src.type) issues.push(`${file}: source without type`);
      if (!src.title) issues.push(`${file}: source without title`);
    }

    for (const loc of (data.locations ?? [])) {
      if (!loc.svgPosition || loc.svgPosition.length !== 2) {
        issues.push(`${file}: location ${loc.id} missing svgPosition`);
      }
    }

    if (data.comparative?.divergent && !(data.comparative.tora || data.comparative.biblia || data.comparative.coran)) {
      issues.push(`${file}: marked divergent but no tradition details provided`);
    }
  }

  const characters = await fg('src/content/characters/**/*.mdx');
  for (const file of characters) {
    const src = await fs.readFile(file, 'utf-8');
    const { data } = matter(src);
    const m = data.mentions ?? {};
    for (const ref of (m.biblia ?? [])) {
      if (ref.book && !BIBLE_BOOKS.has(ref.book)) {
        issues.push(`${file}: unknown Bible book "${ref.book}"`);
      }
    }
  }

  if (issues.length > 0) {
    console.error('Verification failed:\n' + issues.map((i) => '  - ' + i).join('\n'));
    process.exit(1);
  }
  console.log('All citations and references verified ✓');
}

main();
```

- [ ] **Step 3: Instalar gray-matter**

```bash
npm install -D gray-matter
```

- [ ] **Step 4: Ejecutar y ajustar contenido hasta pasar**

```bash
npm run verify
```

Expected: "All citations and references verified ✓". Si falla, corregir el contenido señalado.

- [ ] **Step 5: Commit**

```bash
git add scripts/verify-citations.ts package.json
git commit -m "feat: citation verification script"
```

---

### Task 38: Script de verificación de licencias

**Files:**
- Create: `scripts/verify-licenses.ts`

- [ ] **Step 1: Crear `scripts/verify-licenses.ts`**

```ts
import { promises as fs } from 'node:fs';
import fg from 'fast-glob';
import matter from 'gray-matter';

const VALID_LICENSES = new Set([
  'public-domain', 'cc0', 'cc-by', 'cc-by-sa',
  'open-access', 'fair-use', 'ai-generated',
]);

async function main() {
  const issues: string[] = [];
  const events = await fg('src/content/events/**/*.mdx');

  for (const file of events) {
    const src = await fs.readFile(file, 'utf-8');
    const { data } = matter(src);
    const media = data.media ?? {};

    function check(item: any, label: string) {
      if (!item) return;
      if (!item.credit) issues.push(`${file}: ${label} missing credit`);
      if (!item.license) issues.push(`${file}: ${label} missing license`);
      else if (!VALID_LICENSES.has(item.license)) {
        issues.push(`${file}: ${label} has invalid license "${item.license}"`);
      }
      if (item.license === 'fair-use') {
        console.warn(`WARN ${file}: ${label} uses fair-use, manual review needed`);
      }
    }

    check(media.hero, 'hero');
    (media.gallery ?? []).forEach((g: any, i: number) => check(g, `gallery[${i}]`));
  }

  if (issues.length > 0) {
    console.error('License verification failed:\n' + issues.map((i) => '  - ' + i).join('\n'));
    process.exit(1);
  }
  console.log('All licenses verified ✓');
}

main();
```

- [ ] **Step 2: Correr y ajustar**

```bash
npx tsx scripts/verify-licenses.ts
```

Expected: passes (con WARN si hay fair-use).

- [ ] **Step 3: Commit**

```bash
git add scripts/verify-licenses.ts
git commit -m "feat: media license verification script"
```

---

### Task 39: Build local y E2E smoke

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Verificar build limpio**

```bash
npm run build
```

Expected: build completa sin errores. Si falla, leer el error y corregir.

- [ ] **Step 2: Crear `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 3: Instalar browsers de Playwright**

```bash
npx playwright install chromium
```

- [ ] **Step 4: Crear `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('landing loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Adán → Mahoma');
});

test('timeline page renders with map', async ({ page }) => {
  await page.goto('/timeline');
  await expect(page.locator('[data-map-root]')).toBeVisible();
  await expect(page.locator('[data-event-scene]').first()).toBeVisible();
});

test('character page shows mentions', async ({ page }) => {
  await page.goto('/personajes/noe');
  await expect(page.locator('h1')).toContainText('Noé');
  await expect(page.locator('text=Menciones en las escrituras')).toBeVisible();
});

test('comparative page lists divergent events', async ({ page }) => {
  await page.goto('/comparativa');
  await expect(page.locator('h1')).toContainText('Comparativa');
  await expect(page.locator('table')).toBeVisible();
});
```

- [ ] **Step 5: Correr E2E**

```bash
npm run e2e
```

Expected: 4 tests passed. Si alguno falla, leer el error y corregir.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e/smoke.spec.ts
git commit -m "test: e2e smoke tests for main pages"
```

---

### Task 40: Deploy a Vercel

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Crear repo en GitHub**

Ir a https://github.com/new → crear repo `biblia-timeline` (puede ser privado).

```bash
git remote add origin https://github.com/<tu-usuario>/biblia-timeline.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Crear `vercel.json`**

```json
{
  "buildCommand": "npm run verify && npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

- [ ] **Step 3: Conectar a Vercel**

Ir a https://vercel.com/new → "Import Git Repository" → seleccionar `biblia-timeline` → Deploy.

Vercel detecta Astro automáticamente. Tras ~2-3 minutos te da una URL `https://biblia-timeline-<id>.vercel.app`.

- [ ] **Step 4: Verificar deploy**

Abrir la URL en el navegador. Verificar:
- Landing carga
- `/timeline` carga con scrollytelling funcionando
- `/personajes/noe` muestra las menciones
- Toggle de mapa funciona

- [ ] **Step 5: Commit y push final**

```bash
git add vercel.json
git commit -m "feat: vercel deployment config"
git push
```

Expected: Vercel re-builda automáticamente con el nuevo commit.

---

## Self-Review

Spec coverage check:
- ✅ §1 Propósito → Tasks 1-40
- ✅ §2 Alcance Era Primordial → Tasks 32-36
- ✅ §3 Decisiones → reflected in stack/components
- ✅ §4 UX scrollytelling → Tasks 12, 20, 21, 27, 29
- ✅ §5 Sistema visual eras → Tasks 4, 10, 11, 12
- ✅ §6 Sistema mapa (manuscrito + moderno) → Tasks 13-19
- ✅ §7 Modelo de datos → Tasks 6-9
- ✅ §8 Media y enlaces → Tasks 24-26
- ✅ §9 Research → Tasks 32-36 (Era Primordial), patrón replicable
- ✅ §10 Stack → Tasks 1-5
- ✅ §11 Implementación → Plan structure
- ✅ §12 Riesgos → mitigaciones en tasks 37-38
- ✅ §13 Fuera de alcance → respetado

Placeholder scan: tasks 33 y 34 piden "seguir el patrón" para personajes adicionales — el patrón está mostrado completo en el primer archivo de cada task. Tasks 35 y 36 piden lo mismo para eventos — el patrón completo está en `nacimiento-adan-eva.mdx`. Estos son intencionales (no es realista copiar 12 archivos completos en este documento — el patrón está totalmente definido).

Type consistency: schemas en Tasks 6-9 son referenciados consistentemente. `data-era` se setea en `<body>` (Task 4) y se lee en CSS (Task 11) y por el controller (Task 12). `data-event-scene` se crea en Task 20 y se busca en Task 21.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-16-plataforma-era-primordial.md`. Dos opciones de ejecución:

1. **Subagent-Driven (recomendada)** — Yo dispatch un subagente fresco por tarea, reviso entre tareas, iteración rápida.

2. **Inline Execution** — Ejecutamos en esta sesión usando executing-plans, ejecución por batches con checkpoints.

¿Qué approach preferís?
