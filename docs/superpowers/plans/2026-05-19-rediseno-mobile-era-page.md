# Rediseño mobile de `era/[id]` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Layout móvil dedicado (<768px) para la página `era/[id]` con mapa sticky+zoom, tarjetas de personaje simplificadas, tipografía fluida, fullscreen API real y TimelineNav táctil.

**Architecture:** Layout paralelo. Desktop ≥1024px no cambia. Mobile <768px usa: stack de navs sticky (no fixed), `.map-container` movido fuera del wrapper relativo (sticky real), auto-zoom del SVG por evento, componente `MobileCharacterCard` inline en EventScene, accordion `<details>` para bloques secundarios, Fullscreen API real con fallback al overlay CSS actual.

**Tech Stack:** Astro 6, Tailwind 3, GSAP 3, vitest + happy-dom para unit, Playwright para E2E.

**Spec:** `docs/superpowers/specs/2026-05-19-rediseno-mobile-era-page-design.md`

---

## File Structure

**Archivos nuevos**:

- `src/components/MobileCharacterCard.astro` — tarjeta simplificada (portrait + nombre + rol) para móvil.
- `src/lib/fullscreenApi.ts` — wrapper cross-browser sobre `requestFullscreen`/`webkitRequestFullscreen` + listener `fullscreenchange`.
- `src/lib/mapMobileZoom.ts` — calcula `viewBox` por evento y anima con GSAP.
- `tests/lib/fullscreenApi.test.ts` — unit tests del wrapper.
- `tests/lib/mapMobileZoom.test.ts` — unit tests de cálculo de viewBox.
- `tests/e2e/mobile-era.spec.ts` — E2E responsive para `era/[id]` en distintos viewports.

**Archivos modificados**:

- `src/layouts/BaseLayout.astro` — script inline para `body.is-touch` / `body.fx-reduced`; quitar `pt-16` del `<main>` (lo manejará el stack de navs sticky).
- `src/styles/global.css` — tokens `--fs-*` (fluid typography); body usa `var(--fs-body)`; reglas `body.is-touch`.
- `src/pages/era/[id].astro` — sacar `.map-container` del wrapper relativo; bajar a sticky en móvil; inicializar `mapMobileZoom`.
- `src/components/SiteNav.astro` — `fixed top-0` → `sticky top:0` (parte de `.nav-stack`).
- `src/components/TimelineNav.astro` — `fixed top-12` → `sticky top:0`; track horizontal scrolleable en móvil; targets táctiles; era selector compacto.
- `src/components/MapFullscreenButton.astro` — integra `fullscreenApi.ts`.
- `src/components/MapToggleButton.astro` — sin cambios funcionales, sólo si toca posicionamiento.
- `src/components/EventScene.astro` — fluid typography vars; render condicional `md:hidden` para `MobileCharacterCard`; accordion `<details>` para comparativa/fuentes/deep-dive/mini-history; sticky narrator en móvil.
- `src/components/CharacterInfoPanel.astro` — ocultar bajo `<768px`; reemplazo flotante simplificado en fullscreen móvil.
- `src/lib/narrationFx.ts` — leer `mobileDensity` opcional de cues.

---

## Conventions

- **Tests primero** cuando el cambio tiene lógica testeable (cálculo viewBox, wrapper fullscreen, parsing mobileDensity). Para puro CSS/markup, smoke E2E al final.
- **Commits frecuentes**: uno por tarea, mensaje en imperativo, prefijo convencional (`feat:`, `fix:`, `refactor:`, `test:`).
- **Sin tocar contenido**: no se editan archivos en `src/content/**`.
- **Verificación visual** entre tareas: `npm run dev` y revisar manualmente desktop + Chrome DevTools mobile (375px).

---

### Task 1: Boot inline para `body.is-touch` y `body.fx-reduced`

**Files:**
- Modify: `src/layouts/BaseLayout.astro:59` (antes del `<main>`)
- Create: `tests/lib/bootClasses.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/lib/bootClasses.test.ts`:

```ts
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
    // We import the boot module after stubbing matchMedia so its
    // top-level code runs against the stubbed environment.
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/bootClasses.test.ts`
Expected: FAIL — module `src/lib/bootClasses` does not exist.

- [ ] **Step 3: Create the module**

Create `src/lib/bootClasses.ts`:

```ts
export function applyBootClasses(nav: Navigator, doc: Document): void {
  try {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      doc.body.classList.add('is-touch');
    }
  } catch { /* matchMedia missing in SSR */ }
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
    doc.body.classList.add('fx-reduced');
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/bootClasses.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Wire into BaseLayout**

In `src/layouts/BaseLayout.astro`, between `<body data-era={bodyEra}>` and `{allEras.map(...)}`, add:

```astro
<script>
  import { applyBootClasses } from '../lib/bootClasses';
  applyBootClasses(navigator, document);
</script>
```

- [ ] **Step 6: Smoke test the page**

Run: `npm run dev`
Open `http://localhost:4321/era/primordial` in Chrome DevTools mobile emulation (iPhone SE).
Verify: `<body>` has class `is-touch` (DevTools → Elements).

- [ ] **Step 7: Commit**

```bash
git add src/lib/bootClasses.ts tests/lib/bootClasses.test.ts src/layouts/BaseLayout.astro
git commit -m "feat(boot): is-touch + fx-reduced body classes for mobile"
```

---

### Task 2: Fluid typography tokens

**Files:**
- Modify: `src/styles/global.css:21-31`
- Modify: `src/components/EventScene.astro:99-101`

- [ ] **Step 1: Add tokens to global.css**

In `src/styles/global.css`, replace the `:root` block (lines 5-17) by extending it with fluid sizes and update `body`:

```css
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

  /* Fluid typography — scales smoothly between 320px and 1024px+ viewports. */
  --fs-h2:    clamp(1.75rem, 5.5vw, 3rem);
  --fs-h3:    clamp(1.25rem, 4vw, 1.75rem);
  --fs-body:  clamp(15px, 1.05vw + 12px, 17px);
  --fs-small: clamp(12px, 0.6vw + 10px, 14px);
  --fs-year:  clamp(10px, 0.7vw + 8px, 13px);
}

html { scroll-behavior: smooth; }

body {
  background: var(--era-bg);
  color: var(--era-text);
  font-family: var(--era-body);
  font-size: var(--fs-body);
  transition: background-color 1.5s ease, color 1.5s ease;
}
```

(Remove the previous fixed `font-size: 17px;` and its multi-line comment — `var(--fs-body)` clamps to 17px on desktop anyway.)

- [ ] **Step 2: Apply tokens in EventScene**

In `src/components/EventScene.astro`, replace lines 99-101:

```astro
<p class="text-sm tracking-[0.4em] opacity-60 mb-3" data-event-year-anchor>— AÑO {data.biblicalYear} —</p>
<h2 class="font-display text-4xl lg:text-5xl mb-2">{data.title}</h2>
{data.subtitle && <p class="font-display italic opacity-70 text-xl mb-4">{data.subtitle}</p>}
```

with:

```astro
<p class="tracking-[0.4em] opacity-60 mb-3" style="font-size: var(--fs-year)" data-event-year-anchor>— AÑO {data.biblicalYear} —</p>
<h2 class="font-display mb-2" style="font-size: var(--fs-h2); line-height: 1.1">{data.title}</h2>
{data.subtitle && <p class="font-display italic opacity-70 mb-4" style={`font-size: var(--fs-h3)`}>{data.subtitle}</p>}
```

- [ ] **Step 3: Smoke test**

Run: `npm run dev`
Test at 3 widths in DevTools: 320, 375, 1024.
Verify:
- At 320: título ~28px, año ~10px, subtítulo ~20px. No desbordes.
- At 1024: título ~48px, año ~13px, subtítulo ~28px (igual que antes).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/components/EventScene.astro
git commit -m "feat(typography): fluid type scale via clamp tokens"
```

---

### Task 3: `fullscreenApi.ts` wrapper with tests

**Files:**
- Create: `src/lib/fullscreenApi.ts`
- Create: `tests/lib/fullscreenApi.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/fullscreenApi.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('fullscreenApi', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    (document as any).fullscreenElement = null;
    (document as any).webkitFullscreenElement = null;
  });

  it('enterFullscreen calls requestFullscreen on documentElement', async () => {
    const spy = vi.fn().mockResolvedValue(undefined);
    (document.documentElement as any).requestFullscreen = spy;
    const { enterFullscreen } = await import('../../src/lib/fullscreenApi');
    const ok = await enterFullscreen();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(ok).toBe(true);
  });

  it('enterFullscreen falls back to webkitRequestFullscreen', async () => {
    delete (document.documentElement as any).requestFullscreen;
    const spy = vi.fn().mockResolvedValue(undefined);
    (document.documentElement as any).webkitRequestFullscreen = spy;
    const { enterFullscreen } = await import('../../src/lib/fullscreenApi');
    const ok = await enterFullscreen();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(ok).toBe(true);
  });

  it('enterFullscreen returns false when no API available', async () => {
    delete (document.documentElement as any).requestFullscreen;
    delete (document.documentElement as any).webkitRequestFullscreen;
    const { enterFullscreen } = await import('../../src/lib/fullscreenApi');
    const ok = await enterFullscreen();
    expect(ok).toBe(false);
  });

  it('onFullscreenChange fires with active=true when fullscreenElement is set', async () => {
    const cb = vi.fn();
    const { onFullscreenChange } = await import('../../src/lib/fullscreenApi');
    const off = onFullscreenChange(cb);
    (document as any).fullscreenElement = document.documentElement;
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(cb).toHaveBeenCalledWith(true);
    off();
  });

  it('onFullscreenChange returns disposer that detaches listener', async () => {
    const cb = vi.fn();
    const { onFullscreenChange } = await import('../../src/lib/fullscreenApi');
    const off = onFullscreenChange(cb);
    off();
    document.dispatchEvent(new Event('fullscreenchange'));
    expect(cb).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/lib/fullscreenApi.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement the module**

Create `src/lib/fullscreenApi.ts`:

```ts
/**
 * Cross-browser wrapper for the Fullscreen API.
 * iOS Safari does not implement requestFullscreen on <html>; in that case
 * we fall back to false and the caller can rely on the body.map-fullscreen
 * CSS overlay alone (and optionally show an "rotate phone" hint).
 */
export async function enterFullscreen(): Promise<boolean> {
  const root = document.documentElement as any;
  try {
    if (typeof root.requestFullscreen === 'function') {
      await root.requestFullscreen();
      return true;
    }
    if (typeof root.webkitRequestFullscreen === 'function') {
      await root.webkitRequestFullscreen();
      return true;
    }
  } catch {
    /* permission denied / not allowed in current context */
  }
  return false;
}

export async function exitFullscreen(): Promise<void> {
  const d = document as any;
  try {
    if (typeof d.exitFullscreen === 'function') await d.exitFullscreen();
    else if (typeof d.webkitExitFullscreen === 'function') d.webkitExitFullscreen();
  } catch {
    /* not in fullscreen — ignore */
  }
}

export function isFullscreenActive(): boolean {
  const d = document as any;
  return !!(d.fullscreenElement || d.webkitFullscreenElement);
}

export function onFullscreenChange(cb: (active: boolean) => void): () => void {
  const handler = () => cb(isFullscreenActive());
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  return () => {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/lib/fullscreenApi.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/fullscreenApi.ts tests/lib/fullscreenApi.test.ts
git commit -m "feat(fullscreen): cross-browser API wrapper with tests"
```

---

### Task 4: Integrate Fullscreen API into MapFullscreenButton

**Files:**
- Modify: `src/components/MapFullscreenButton.astro:31-100` (the inline `<script>`)

- [ ] **Step 1: Replace the script block**

In `src/components/MapFullscreenButton.astro`, replace the entire `<script>...</script>` block (starting at line 31) with:

```astro
<script>
  import { enterFullscreen, exitFullscreen, onFullscreenChange, isFullscreenActive } from '../lib/fullscreenApi';

  const btn = document.querySelector<HTMLButtonElement>('[data-map-fullscreen-toggle]');
  const iconExpand   = btn?.querySelector<HTMLElement>('.icon-expand');
  const iconCollapse = btn?.querySelector<HTMLElement>('.icon-collapse');

  if (btn && iconExpand && iconCollapse) {
    let idleTimer: number | null = null;
    const IDLE_MS = 2800;
    /* iOS hint flag — show "rotate phone" hint once when fullscreen API
       silently fails (iOS Safari). Persisted so we don't nag every visit. */
    const IOS_HINT_KEY = 'fs-ios-hint-shown';

    async function activateFullscreen() {
      document.body.classList.add('map-fullscreen');
      iconExpand!.classList.add('hidden');
      iconCollapse!.classList.remove('hidden');
      btn!.setAttribute('aria-label', 'Salir de pantalla completa');
      bindIdle();
      btn!.style.display = 'none';

      const realFs = await enterFullscreen();
      if (!realFs) {
        try {
          if (!localStorage.getItem(IOS_HINT_KEY)) {
            showIosHint();
            localStorage.setItem(IOS_HINT_KEY, '1');
          }
        } catch { /* localStorage blocked */ }
      }
      window.dispatchEvent(new Event('resize'));
    }

    async function deactivateFullscreen() {
      document.body.classList.remove('map-fullscreen', 'map-fullscreen-idle');
      iconExpand!.classList.remove('hidden');
      iconCollapse!.classList.add('hidden');
      btn!.setAttribute('aria-label', 'Ver mapa en pantalla completa');
      unbindIdle();
      btn!.style.display = '';
      await exitFullscreen();
      window.dispatchEvent(new Event('resize'));
    }

    function showIosHint() {
      const hint = document.createElement('div');
      hint.className = 'fs-ios-hint';
      hint.textContent = 'Girá el teléfono para una vista más inmersiva';
      hint.style.cssText = 'position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);background:var(--era-bg);color:var(--era-text);padding:.5rem 1rem;border:1px solid var(--era-primary);border-radius:999px;font-size:13px;z-index:9999;opacity:0;transition:opacity 300ms ease;pointer-events:none;';
      document.body.appendChild(hint);
      requestAnimationFrame(() => { hint.style.opacity = '1'; });
      setTimeout(() => {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 400);
      }, 3500);
    }

    function resetIdle() {
      document.body.classList.remove('map-fullscreen-idle');
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        document.body.classList.add('map-fullscreen-idle');
      }, IDLE_MS);
    }
    function bindIdle() {
      window.addEventListener('mousemove', resetIdle, { passive: true });
      window.addEventListener('touchstart', resetIdle, { passive: true });
      window.addEventListener('click', resetIdle, { passive: true });
      window.addEventListener('keydown', resetIdle, { passive: true });
      window.addEventListener('timeline:scene-changed', resetIdle as EventListener);
      resetIdle();
    }
    function unbindIdle() {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = null;
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('click', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('timeline:scene-changed', resetIdle as EventListener);
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (document.body.classList.contains('map-fullscreen')) deactivateFullscreen();
      else activateFullscreen();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('map-fullscreen')) {
        deactivateFullscreen();
      }
      if (e.key === 'f' || e.key === 'F') btn!.click();
    });

    /* Sync overlay state with browser-level fullscreen — if the user exits
       via ESC at the browser level (different from our app ESC handler) or
       a system gesture on iOS, we must remove .map-fullscreen too. */
    onFullscreenChange((active) => {
      const overlayOn = document.body.classList.contains('map-fullscreen');
      if (!active && overlayOn) deactivateFullscreen();
    });
  }
</script>
```

- [ ] **Step 2: Smoke test fullscreen**

Run: `npm run dev`
Test in Chrome desktop on `http://localhost:4321/era/primordial`:
1. Click fullscreen button → browser enters real fullscreen (URL bar disappears).
2. Press ESC → exits both browser fullscreen AND overlay.
3. Click button again → enters again.

Test in DevTools mobile emulation (iPhone 12, 390px):
1. Click button → overlay appears. (Fullscreen API may not work in DevTools emulation; the overlay still does its job.)

- [ ] **Step 3: Commit**

```bash
git add src/components/MapFullscreenButton.astro
git commit -m "feat(fullscreen): use real Fullscreen API with overlay fallback"
```

---

### Task 5: Move `.map-container` out of the relative wrapper

**Files:**
- Modify: `src/pages/era/[id].astro:433-471`

This fixes "el mapa se mueve al scrollear" — today `.map-container` is `position: sticky` inside `<div class="relative">` which also wraps `.scenes`. When you scroll past the relative wrapper, the sticky detaches.

- [ ] **Step 1: Restructure the era page wrapper**

In `src/pages/era/[id].astro`, locate the `<div class="relative">` block (around line 433) and restructure so the map sits as a direct child of `<main>` (i.e., outside the relative wrapper that contains the scenes).

Current structure (simplified):

```astro
<div class="relative">
  <div class="map-container ...">...</div>
  <h2 class="fs-narration-title">...</h2>
  <aside class="fs-narration-panel">...</aside>
  <FullscreenTimeline />
  <CharacterInfoPanel />
  <EraClosingDialog />
  <div class="scenes">...</div>
</div>
```

New structure:

```astro
<div class="map-container md:fixed md:right-0 md:w-[55%] lg:w-[60%] sticky z-20 h-[35vh] md:h-[calc(100vh-var(--sticky-header-h))] w-full" data-map-mode="manuscript" style="top: var(--sticky-header-h); background: var(--era-bg);">
  <ManuscriptMap />
  <ModernMapLayer />
  <MapToggleButton />
  <BoundariesToggleButton
    hasBoundaries={boundarySet !== null}
    caption={boundarySet?.caption}
  />
  <MapFullscreenButton />
</div>

<h2 class="fs-narration-title" data-fs-narration-title aria-live="polite">{events[0]?.data.title ?? ''}</h2>

<aside class="fs-narration-panel" data-fs-narration-panel aria-hidden="true">
  <div data-fs-narration-body>Empezá la reproducción para ver el texto.</div>
  <div class="fs-narration-duration" data-fs-narration-duration aria-hidden="true"></div>
</aside>

<FullscreenTimeline events={events} />
<CharacterInfoPanel events={events} charById={charByIdMap} />
<EraClosingDialog currentEraId={era.data.id} />

<div class="scenes">
  {events.map((event) => <EventScene event={event} />)}
</div>
```

Two changes:
1. The outer `<div class="relative">` is removed.
2. The map container's mobile height drops from `h-[40vh]` to `h-[35vh]` (per spec).

- [ ] **Step 2: Smoke test sticky behavior**

Run: `npm run dev`
Test at iPhone 12 (390x844) in DevTools:
1. Open `/era/primordial`.
2. Verify mapa is sticky bajo el nav stack, ocupa ~35vh.
3. Scrollear hasta el final de la página. El mapa debe permanecer sticky hasta el final (no "saltar" o quedarse en el medio).

Test at desktop (1440px):
1. El mapa sigue siendo `fixed right` 55-60% ancho, sin regresiones.

- [ ] **Step 3: Commit**

```bash
git add src/pages/era/[id].astro
git commit -m "fix(map): mover .map-container fuera del wrapper relative para sticky real"
```

---

### Task 6: Nav stack — pasar SiteNav y TimelineNav a sticky

**Files:**
- Modify: `src/components/SiteNav.astro:29` (cambiar `fixed top-0` por `sticky top-0`)
- Modify: `src/components/TimelineNav.astro:59` (cambiar `fixed top-12` por `sticky top-0`)
- Modify: `src/layouts/BaseLayout.astro:65` (quitar `pt-16` del `<main>`)
- Modify: `src/pages/era/[id].astro:148-157` (recalcular `--sticky-header-h` via ResizeObserver)

Hoy SiteNav es `fixed top-0` (56px) y TimelineNav es `fixed top-12` (~48px above the rest). El `<main>` tiene `pt-16` para no quedar tapado, y `era/[id].astro` sobrescribe a `pt-[var(--sticky-header-h)]`. En iOS Safari con URL bar dinámica, esto se desfasa. Pasamos a layout natural: ambos navs `sticky top:0` apilados en orden DOM, sin padding-top en `<main>`.

- [ ] **Step 1: SiteNav → sticky**

In `src/components/SiteNav.astro:29`, change:

```astro
<nav class="site-nav fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-3 bg-bg">
```

to:

```astro
<nav class="site-nav sticky top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-3 bg-bg">
```

- [ ] **Step 2: TimelineNav → sticky**

In `src/components/TimelineNav.astro:59`, change:

```astro
<div class="timeline-nav fixed top-12 inset-x-0 z-30 px-3 md:px-5 py-3 bg-bg shadow-lg" data-timeline-nav>
```

to:

```astro
<div class="timeline-nav sticky top-0 inset-x-0 z-30 px-3 md:px-5 py-3 bg-bg shadow-lg" data-timeline-nav>
```

- [ ] **Step 3: BaseLayout — quitar pt-16**

In `src/layouts/BaseLayout.astro:65`, change:

```astro
<main class="pt-16"><slot /></main>
```

to:

```astro
<main><slot /></main>
```

- [ ] **Step 4: era/[id].astro — quitar override de padding-top y medir nav stack**

In `src/pages/era/[id].astro`, remove this rule (around line 157):

```css
main { padding-top: var(--sticky-header-h) !important; }
```

The `--sticky-header-h` var is still used for the map's `top: var(--sticky-header-h)` and for scroll-margin-top on year anchors, so keep the var definition. Replace its derivation (static `calc(--site-nav-h + --timeline-nav-h)`) with a ResizeObserver script.

After the existing `</style>` block on `era/[id].astro`, add a new `<script>`:

```astro
<script>
  /* Re-measure the sticky nav stack on resize. URL bar collapse/expand in
     iOS Safari can change the effective height, so we use a ResizeObserver
     instead of hardcoded rem values. */
  function measureNavStack() {
    const nav = document.querySelector<HTMLElement>('.site-nav');
    const tnav = document.querySelector<HTMLElement>('[data-timeline-nav]');
    const h = (nav?.offsetHeight ?? 0) + (tnav?.offsetHeight ?? 0);
    document.documentElement.style.setProperty('--sticky-header-h', `${h}px`);
  }
  measureNavStack();
  const ro = new ResizeObserver(measureNavStack);
  const nav = document.querySelector('.site-nav');
  const tnav = document.querySelector('[data-timeline-nav]');
  if (nav) ro.observe(nav);
  if (tnav) ro.observe(tnav);
  window.addEventListener('orientationchange', measureNavStack);
</script>
```

- [ ] **Step 5: Smoke test the nav stack**

Run: `npm run dev`
Test in desktop (1440):
1. Both navs stick to the top while scrolling. Order: SiteNav above TimelineNav.
2. No layout shift on page load.

Test in iPhone 12 emulation:
1. Same behavior. URL bar should not push content under nav.

Test in Firefox:
1. Same (some quirk possible with `sticky` inside `<main>`; verify).

- [ ] **Step 6: Commit**

```bash
git add src/components/SiteNav.astro src/components/TimelineNav.astro src/layouts/BaseLayout.astro src/pages/era/[id].astro
git commit -m "refactor(nav): sticky stack via DOM order, drop fixed positioning"
```

---

### Task 7: TimelineNav horizontal scrolleable + targets táctiles (móvil)

**Files:**
- Modify: `src/components/TimelineNav.astro`

Hoy el TimelineNav comprime los `timeline-dot` en un track absoluto-positioned con `left: X%`. En móvil, las dots se aplastan unas con otras y los targets son <44px. Solución: en móvil reemplazamos el track absoluto por un track con `display: flex; overflow-x: auto; scroll-snap-type`. Cada dot pasa a ser un botón flex con tamaño táctil. El indicador activo se centra con `scrollIntoView`.

- [ ] **Step 1: Add mobile track CSS at the end of TimelineNav `<style>`**

In `src/components/TimelineNav.astro`, after line 184 (inside the existing `<style>` block), add:

```css
  /* ── Mobile horizontal track ────────────────────────────────────────
     <768px: el track absoluto-positioned se reemplaza por flex con
     overflow-x. Cada timeline-dot se vuelve un botón mín. 44×44px y
     el evento activo se centra con scrollIntoView. */
  @media (max-width: 767px) {
    .timeline-mobile-track {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 0 0.5rem;
      mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
    }
    .timeline-mobile-track::-webkit-scrollbar { display: none; }
    .timeline-mobile-track .mobile-dot {
      scroll-snap-align: center;
      flex-shrink: 0;
      min-width: 44px;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 .75rem;
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--era-muted);
      border-radius: 999px;
      white-space: nowrap;
      text-decoration: none;
    }
    .timeline-mobile-track .mobile-dot.is-active {
      color: var(--era-accent);
      background: color-mix(in srgb, var(--era-accent) 12%, transparent);
    }
    /* Hide the desktop dot/track on mobile. */
    .timeline-desktop-track { display: none; }
    /* Hide step arrows on mobile — the swipe IS the step. */
    .step-arrow { display: none; }
  }
  @media (min-width: 768px) {
    .timeline-mobile-track { display: none; }
  }
```

- [ ] **Step 2: Add the mobile-track markup**

In `src/components/TimelineNav.astro`, locate the central `flex-1 min-w-0 relative h-8` div (line 88). It wraps the prev arrow, the absolute-positioned track, and the next arrow. Rename the inner `relative h-8 flex-1 min-w-0 px-2 md:px-3` div by adding the class `timeline-desktop-track`:

Change line 97:

```astro
<div class="relative h-8 flex-1 min-w-0 px-2 md:px-3">
```

to:

```astro
<div class="timeline-desktop-track relative h-8 flex-1 min-w-0 px-2 md:px-3">
```

Then, immediately after the closing tag of that inner div (after line 143, the line with the active marker `data-timeline-active`), add the mobile track:

```astro
<nav class="timeline-mobile-track" data-timeline-mobile-track aria-label="Eventos de la era">
  {sortedEventsByYear.map((e) => (
    <a
      href={`#event-${e.data.id}`}
      class="mobile-dot"
      data-timeline-mobile-marker={e.data.id}
    >{e.data.title}</a>
  ))}
</nav>
```

- [ ] **Step 3: Sync active state + auto-scroll into view**

At the end of the existing `<script>` block in `TimelineNav.astro` (after line 291), append:

```ts
/* Mobile track: highlight the active event and center it in the scrollable
   row whenever the scene changes. */
const mobileDots = document.querySelectorAll<HTMLAnchorElement>('[data-timeline-mobile-marker]');

function updateMobileActive(eventId: string) {
  mobileDots.forEach((d) => {
    const active = d.getAttribute('data-timeline-mobile-marker') === eventId;
    d.classList.toggle('is-active', active);
    if (active) {
      d.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  });
}

window.addEventListener('timeline:scene-changed', (e) => {
  const id = (e as CustomEvent).detail?.eventId;
  if (id) updateMobileActive(id);
});

mobileDots.forEach((dot) => {
  dot.addEventListener('click', (ev) => {
    const id = dot.getAttribute('data-timeline-mobile-marker');
    if (!id) return;
    if (isPlaying()) {
      ev.preventDefault();
      const playBtn = document.querySelector<HTMLElement>('[data-play-mode]');
      const progress = playBtn?.querySelector<HTMLElement>('[data-play-progress]');
      jumpToEventId(id, (i, total) => {
        if (progress) progress.textContent = `${i}/${total}`;
      });
      return;
    }
    const target = document.getElementById(`event-${id}`);
    if (target) {
      ev.preventDefault();
      scrollToElement(target);
    }
  });
});
```

- [ ] **Step 4: Smoke test**

Run: `npm run dev`
Test at iPhone 12 (390px):
1. `/era/primordial`. La timeline muestra una fila scrolleable con los títulos cortos de cada evento.
2. Hacer scroll dentro de la barra: scroll lateral funciona.
3. Activar un evento haciendo scroll de la página: el dot móvil correspondiente se centra automáticamente.
4. Tap en un dot móvil distinto: navega a ese evento.

Test at desktop (1440): timeline normal sin cambios.

- [ ] **Step 5: Commit**

```bash
git add src/components/TimelineNav.astro
git commit -m "feat(timeline): mobile horizontal track con touch targets y auto-center"
```

---

### Task 8: `mapMobileZoom.ts` — viewBox por evento

**Files:**
- Create: `src/lib/mapMobileZoom.ts`
- Create: `tests/lib/mapMobileZoom.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/mapMobileZoom.test.ts`:

```ts
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
    // both points inside
    expect(x).toBeLessThanOrEqual(100);
    expect(y).toBeLessThanOrEqual(100);
    expect(x + w).toBeGreaterThanOrEqual(400);
    expect(y + h).toBeGreaterThanOrEqual(400);
    // padding of ~20%
    expect(w).toBeGreaterThanOrEqual(300 * 1.2);
  });

  it('handles same-point journey (degenerate)', () => {
    const vb = viewBoxForJourney([500, 300], [500, 300]);
    const [, , w, h] = vb.split(' ').map(Number);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/lib/mapMobileZoom.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement the module**

Create `src/lib/mapMobileZoom.ts`:

```ts
import { MAP_VIEWBOX } from './mapManuscript';

/** Zoom factor in mobile. 1 = world view; 2.4 = focused regional view. */
export const MOBILE_ZOOM = 2.4;
const JOURNEY_PADDING_PCT = 0.2;
const MIN_JOURNEY_W = MAP_VIEWBOX.w / MOBILE_ZOOM;
const MIN_JOURNEY_H = MAP_VIEWBOX.h / MOBILE_ZOOM;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/** SVG viewBox string centered on (cx, cy) with the world divided by MOBILE_ZOOM. */
export function viewBoxFor(cx: number, cy: number): string {
  const w = MAP_VIEWBOX.w / MOBILE_ZOOM;
  const h = MAP_VIEWBOX.h / MOBILE_ZOOM;
  const x = clamp(cx - w / 2, 0, MAP_VIEWBOX.w - w);
  const y = clamp(cy - h / 2, 0, MAP_VIEWBOX.h - h);
  return `${x} ${y} ${w} ${h}`;
}

/** Bounding-box viewBox for a journey from→to with 20% padding, never smaller than the single-point zoom. */
export function viewBoxForJourney(from: [number, number], to: [number, number]): string {
  const minX = Math.min(from[0], to[0]);
  const minY = Math.min(from[1], to[1]);
  const maxX = Math.max(from[0], to[0]);
  const maxY = Math.max(from[1], to[1]);
  let w = (maxX - minX) * (1 + JOURNEY_PADDING_PCT * 2);
  let h = (maxY - minY) * (1 + JOURNEY_PADDING_PCT * 2);
  if (w < MIN_JOURNEY_W) w = MIN_JOURNEY_W;
  if (h < MIN_JOURNEY_H) h = MIN_JOURNEY_H;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const x = clamp(cx - w / 2, 0, MAP_VIEWBOX.w - w);
  const y = clamp(cy - h / 2, 0, MAP_VIEWBOX.h - h);
  return `${x} ${y} ${w} ${h}`;
}

interface SceneConfig {
  eventId: string;
  svgPosition: [number, number];
  journeys?: Array<{ from: [number, number]; to: [number, number]; style?: string } | null>;
}

/** Wire scene-change events to animated viewBox transitions on the SVG. Mobile-only. */
export async function initMobileZoom(svg: SVGSVGElement, configs: SceneConfig[]): Promise<() => void> {
  if (typeof window === 'undefined') return () => {};
  if (!window.matchMedia('(max-width: 767px)').matches) return () => {};
  const gsap = (await import('gsap')).default;
  const byId = new Map(configs.map((c) => [c.eventId, c]));

  function applyFor(eventId: string) {
    const cfg = byId.get(eventId);
    if (!cfg) return;
    const validJourneys = (cfg.journeys ?? []).filter(Boolean) as Array<{ from: [number, number]; to: [number, number] }>;
    const vb = validJourneys.length
      ? viewBoxForJourney(validJourneys[0].from, validJourneys[0].to)
      : viewBoxFor(cfg.svgPosition[0], cfg.svgPosition[1]);
    gsap.to(svg, { attr: { viewBox: vb }, duration: 0.6, ease: 'power2.inOut' });
  }

  const handler = (e: Event) => {
    const id = (e as CustomEvent).detail?.eventId;
    if (id) applyFor(id);
  };
  window.addEventListener('timeline:scene-changed', handler);

  // Apply for the first event immediately so the initial view is centred.
  if (configs.length > 0) applyFor(configs[0].eventId);

  return () => window.removeEventListener('timeline:scene-changed', handler);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/lib/mapMobileZoom.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/mapMobileZoom.ts tests/lib/mapMobileZoom.test.ts
git commit -m "feat(map): mobile auto-zoom helpers (viewBoxFor, viewBoxForJourney)"
```

---

### Task 9: Wire `initMobileZoom` in era/[id].astro

**Files:**
- Modify: `src/pages/era/[id].astro` (the main `<script>` block ~line 475)

- [ ] **Step 1: Import and initialize**

In `src/pages/era/[id].astro`, locate the main `<script>` block (around line 475 that imports `initScrollytelling`). Add the import and the init call.

Find:

```ts
import { initScrollytelling } from '../../lib/sceneController';
import { renderMarker } from '../../lib/mapMarkers';
import { registerMarkers } from '../../lib/mapToggle';
import { initNarrationFx } from '../../lib/narrationFx';
import { renderBoundaries } from '../../lib/mapBoundaries';
import { initSpeechBubble } from '../../lib/mapSpeechBubble';
import { mountEraAmbient } from '../../lib/eraAmbient';
import type { EraId } from '../../lib/cues/_eraIds';
```

Add at the end of the imports:

```ts
import { initMobileZoom } from '../../lib/mapMobileZoom';
```

Then, after the `initScrollytelling(sceneConfigs);` call, add:

```ts
if (svg) {
  initMobileZoom(svg, sceneConfigs).then((cleanup) => {
    document.addEventListener('astro:before-swap', () => { try { cleanup?.(); } catch {} }, { once: true });
  });
}
```

- [ ] **Step 2: Smoke test**

Run: `npm run dev`
At iPhone 12 (390px), `/era/exodo`:
1. Open. El SVG arranca con un viewBox enfocado a la primera ubicación (no todo el mundo).
2. Scrollear al siguiente evento (Egipto/Sinai). El viewBox anima al nuevo punto (~600ms ease).
3. Eventos con `journey` (ej. salida de Egipto): el viewBox incluye ambos puntos.

At desktop (1440): el SVG mantiene el viewBox original `0 0 1000 600` — sin cambios.

- [ ] **Step 3: Commit**

```bash
git add src/pages/era/[id].astro
git commit -m "feat(map): activar auto-zoom mobile en era page"
```

---

### Task 10: `MobileCharacterCard.astro` component

**Files:**
- Create: `src/components/MobileCharacterCard.astro`

- [ ] **Step 1: Create the component**

Create `src/components/MobileCharacterCard.astro`:

```astro
---
/**
 * Tarjeta de personaje SIMPLIFICADA para móvil.
 * Sólo imagen + nombre + rol-del-evento. Sin canonicidad, sin meaning,
 * sin lore, sin tooltip, sin ciclado. Funciona inline en EventScene.
 */
interface Props {
  char: {
    id: string;
    name: string;
    portrait?: string | null;
    avatar?: string | null;
    role: string;
  };
}
const { char } = Astro.props;
const img = char.portrait ?? char.avatar ?? null;
const roleDisplay = char.role.replace(/-/g, ' ');
---
<a href={`/personajes/${char.id}`} class="mobile-char-card" data-mobile-char-card>
  <div class="mcc-portrait">
    {img ? (
      <img src={img} alt={char.name} loading="lazy" />
    ) : (
      <div class="mcc-portrait-placeholder" aria-hidden="true">{char.name.charAt(0)}</div>
    )}
  </div>
  <div class="mcc-text">
    <div class="mcc-name">{char.name}</div>
    <div class="mcc-role">{roleDisplay}</div>
  </div>
</a>

<style>
  .mobile-char-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.6rem 0.9rem;
    border: 1px solid var(--era-border);
    border-radius: 10px;
    background: color-mix(in srgb, var(--era-surface) 70%, transparent);
    min-height: 96px;
    text-decoration: none;
    color: var(--era-text);
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .mobile-char-card:active { transform: scale(0.98); }
  .mobile-char-card:hover { border-color: var(--era-accent); }
  .mcc-portrait {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: var(--era-bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mcc-portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .mcc-portrait-placeholder {
    font-family: var(--era-display);
    font-size: 1.5rem;
    color: var(--era-primary);
    opacity: 0.7;
  }
  .mcc-text { min-width: 0; }
  .mcc-name {
    font-family: var(--era-display);
    font-size: 1.125rem;
    line-height: 1.15;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .mcc-role {
    font-size: 0.6875rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.65;
    margin-top: 0.2rem;
  }
</style>
```

- [ ] **Step 2: Smoke test (build only)**

Run: `npx astro check`
Expected: 0 errors related to MobileCharacterCard.

- [ ] **Step 3: Commit**

```bash
git add src/components/MobileCharacterCard.astro
git commit -m "feat(component): MobileCharacterCard simplified for narrow screens"
```

---

### Task 11: Integrate `MobileCharacterCard` into EventScene

**Files:**
- Modify: `src/components/EventScene.astro:114-152` (the `.characters-in-event` block)

- [ ] **Step 1: Wrap existing block as desktop-only and add mobile version**

In `src/components/EventScene.astro`, add the import at the top of the frontmatter (near the other imports, around line 15):

```ts
import MobileCharacterCard from './MobileCharacterCard.astro';
```

Then replace the existing block (lines 114-152):

```astro
{charactersInEvent.length > 0 && (
  <div class="characters-in-event mt-8">
    <h3 class="text-sm tracking-[0.3em] uppercase opacity-60 mb-4">Personajes en este momento</h3>
    <div class="flex flex-wrap gap-3">
      {charactersInEvent.map((c) => (
        <a
          href={`/personajes/${c.id}`}
          class="char-pin group relative inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-surface/40 hover:border-accent transition-colors"
          aria-label={`Ver perfil de ${c.name}`}
        >
          <!-- ... tooltip block ... -->
        </a>
      ))}
    </div>
  </div>
)}
```

with:

```astro
{charactersInEvent.length > 0 && (
  <>
    {/* Mobile: tarjetas simples apiladas */}
    <div class="md:hidden flex flex-col gap-2 mt-6" data-mobile-char-cards>
      {charactersInEvent.map((c) => <MobileCharacterCard char={{ id: c.id, name: c.name, portrait: c.portrait, avatar: c.avatar, role: c.role }} />)}
    </div>
    {/* Desktop: bloque actual con tooltips y portrait clouds */}
    <div class="hidden md:block characters-in-event mt-8">
      <h3 class="text-sm tracking-[0.3em] uppercase opacity-60 mb-4">Personajes en este momento</h3>
      <div class="flex flex-wrap gap-3">
        {charactersInEvent.map((c) => (
          <a
            href={`/personajes/${c.id}`}
            class="char-pin group relative inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-surface/40 hover:border-accent transition-colors"
            aria-label={`Ver perfil de ${c.name}`}
          >
            <PortraitPlaceholder name={c.name} src={c.portrait ?? undefined} avatar={c.avatar ?? undefined} size="sm" />
            <span class="text-base font-display">{c.name}</span>
            <span class="text-[11px] tracking-wider uppercase opacity-60">{c.role.replace(/-/g, ' ')}</span>

            <div class="tooltip absolute left-0 top-full z-30 w-80 p-3 rounded-lg border border-border bg-bg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto transition-all duration-200 flex gap-3">
              {(c.portrait || c.avatar) && (
                <div class="w-36 flex-shrink-0 self-stretch -ml-3 -my-2 char-tooltip-portrait">
                  <img src={c.portrait ?? c.avatar} alt={c.name} loading="lazy" class="w-full h-full object-cover object-top" />
                </div>
              )}
              <div class="flex-1 min-w-0">
                <div class="font-display text-base leading-tight">{c.name}</div>
                {c.meaning && <div class="text-[11px] italic opacity-70 leading-snug">"{c.meaning}"</div>}
                <div class="text-[10px] tracking-[0.15em] uppercase opacity-60 mt-1">{c.role.replace(/-/g, ' ')}</div>
                {c.lore ? (
                  <p class="text-[12px] opacity-90 mt-2 leading-snug max-h-28 overflow-y-auto pr-1 whitespace-pre-line">{c.lore}</p>
                ) : c.significance && (
                  <p class="text-[12px] opacity-85 mt-2 leading-snug max-h-28 overflow-y-auto pr-1">{c.significance.slice(0, 160)}{c.significance.length > 160 ? '…' : ''}</p>
                )}
                {c.trivia && c.trivia.length > 0 && (
                  <p class="text-[11px] opacity-70 mt-2 italic leading-snug border-t border-border/40 pt-1.5">{c.trivia[0]}</p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </>
)}
```

- [ ] **Step 2: Smoke test**

Run: `npm run dev`
At iPhone 12 (390px), `/era/exodo` evento "Moisés":
1. La sección "Personajes en este momento" desaparece; en su lugar se ven tarjetas simples con imagen 80x80 + nombre + rol uppercase.

At desktop (1440):
1. La sección original con tooltips y portrait clouds sigue intacta.

- [ ] **Step 3: Commit**

```bash
git add src/components/EventScene.astro
git commit -m "feat(event): MobileCharacterCard inline en versión móvil"
```

---

### Task 12: Accordion `<details>` para bloques secundarios en móvil

**Files:**
- Modify: `src/components/EventScene.astro:154-173` (comparativa, sources, mini-history, deep-dive)

- [ ] **Step 1: Wrap secondary blocks in `<details>` on mobile**

In `src/components/EventScene.astro`, replace lines 154-173 (the comparative + sources + miniHistory + deepDive blocks):

```astro
{data.comparative.divergent && (
  <ComparativeBlock comparative={data.comparative} />
)}

{data.sources.length > 0 && (
  <div class="mt-8">
    <h3 class="text-sm tracking-[0.3em] uppercase opacity-60 mb-3">Fuentes consultadas</h3>
    <ul class="space-y-2">
      {data.sources.map((s) => <li><SourceBadge source={s} /></li>)}
    </ul>
  </div>
)}

<MiniHistorySection
  eventId={data.id}
  eventTitle={data.title}
  eventSubtitle={data.subtitle}
/>

<DeepDive deepDive={data.deepDive} />
```

with:

```astro
{/* Mobile: bloques colapsables */}
<div class="md:hidden mt-6 space-y-2">
  {data.comparative.divergent && (
    <details class="mobile-accordion">
      <summary>Torá / Biblia / Corán</summary>
      <div class="mobile-accordion-body">
        <ComparativeBlock comparative={data.comparative} />
      </div>
    </details>
  )}
  {data.sources.length > 0 && (
    <details class="mobile-accordion">
      <summary>Fuentes consultadas</summary>
      <div class="mobile-accordion-body">
        <ul class="space-y-2">
          {data.sources.map((s) => <li><SourceBadge source={s} /></li>)}
        </ul>
      </div>
    </details>
  )}
  <details class="mobile-accordion">
    <summary>Mini-historia</summary>
    <div class="mobile-accordion-body">
      <MiniHistorySection
        eventId={data.id}
        eventTitle={data.title}
        eventSubtitle={data.subtitle}
      />
    </div>
  </details>
  {data.deepDive && (
    <details class="mobile-accordion">
      <summary>Profundizar</summary>
      <div class="mobile-accordion-body">
        <DeepDive deepDive={data.deepDive} />
      </div>
    </details>
  )}
</div>

{/* Desktop: bloques siempre expandidos */}
<div class="hidden md:block">
  {data.comparative.divergent && (
    <ComparativeBlock comparative={data.comparative} />
  )}

  {data.sources.length > 0 && (
    <div class="mt-8">
      <h3 class="text-sm tracking-[0.3em] uppercase opacity-60 mb-3">Fuentes consultadas</h3>
      <ul class="space-y-2">
        {data.sources.map((s) => <li><SourceBadge source={s} /></li>)}
      </ul>
    </div>
  )}

  <MiniHistorySection
    eventId={data.id}
    eventTitle={data.title}
    eventSubtitle={data.subtitle}
  />

  <DeepDive deepDive={data.deepDive} />
</div>
```

- [ ] **Step 2: Add accordion CSS**

In `src/components/EventScene.astro`, inside the existing `<style>` block (around line 180), add:

```css
.mobile-accordion {
  border: 1px solid var(--era-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--era-surface) 50%, transparent);
  overflow: hidden;
}
.mobile-accordion > summary {
  list-style: none;
  cursor: pointer;
  padding: 0.9rem 1rem;
  font-family: var(--era-display);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
}
.mobile-accordion > summary::-webkit-details-marker { display: none; }
.mobile-accordion > summary::after {
  content: '▸';
  color: var(--era-primary);
  transition: transform 200ms ease;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
.mobile-accordion[open] > summary::after {
  transform: rotate(90deg);
}
.mobile-accordion-body {
  padding: 0 1rem 1rem;
}
```

- [ ] **Step 3: Smoke test**

Run: `npm run dev`
At iPhone 12 (390px), evento "Moisés y el Éxodo" en `/era/exodo`:
1. Después de la tarjeta de personaje, ver 4 acordeones cerrados: Torá/Biblia/Corán, Fuentes, Mini-historia, Profundizar.
2. Tap en cada uno: se abren con chevron rotado.
3. Tap de nuevo: se cierran.

At desktop (1440):
1. Los 4 bloques siguen expandidos sin acordeón.

- [ ] **Step 4: Commit**

```bash
git add src/components/EventScene.astro
git commit -m "feat(event): mobile accordion para comparativa/fuentes/profundizar/mini-historia"
```

---

### Task 13: Hide `CharacterInfoPanel` en móvil + flotante simplificado

**Files:**
- Modify: `src/components/CharacterInfoPanel.astro` (CSS scope + simplified fallback)

El `CharacterInfoPanel` actual es demasiado denso para móvil. Lo ocultamos bajo `<768px` y agregamos un mini-overlay flotante anclado al borde inferior del mapa que muestra solo portrait + nombre + rol, ciclando con la narración igual que el panel desktop.

- [ ] **Step 1: Hide desktop panel below 768px**

In `src/components/CharacterInfoPanel.astro`, find the `.character-info-panel` selector in the `<style>` block (around line 87) and add a media-query exception. Right after the closing `}` of the existing `.character-info-panel { ... }` rule:

```css
@media (max-width: 767px) {
  .character-info-panel { display: none !important; }
}
```

- [ ] **Step 2: Add the mobile flotante markup**

In `src/components/CharacterInfoPanel.astro`, right after the existing `<aside class="character-info-panel" ...>...</aside>` block (around line 82), add:

```astro
<aside class="mobile-cip" data-mobile-cip aria-hidden="true">
  <div class="mcip-portrait">
    <img alt="" data-mcip-portrait-img onerror="this.style.display='none'" />
  </div>
  <div class="mcip-text">
    <div class="mcip-name" data-mcip-name></div>
    <div class="mcip-role" data-mcip-role></div>
  </div>
</aside>
```

- [ ] **Step 3: Add the mobile CSS**

In the same `<style>` block, add at the end:

```css
.mobile-cip {
  display: none;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 53;
  padding: 0.6rem 0.85rem;
  gap: 0.7rem;
  background: color-mix(in srgb, var(--era-bg) 88%, transparent);
  border: 1px solid var(--era-primary);
  border-radius: 10px;
  backdrop-filter: blur(8px);
  align-items: center;
}
.mobile-cip.is-active { display: flex; }
body.map-fullscreen.map-fullscreen-idle .mobile-cip { opacity: 0; pointer-events: none; }
@media (min-width: 768px) {
  .mobile-cip { display: none !important; }
}
.mcip-portrait { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
.mcip-portrait img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.mcip-text { min-width: 0; flex: 1 1 auto; }
.mcip-name {
  font-family: var(--era-display);
  font-size: 1rem;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mcip-role {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-top: 0.15rem;
}
```

- [ ] **Step 4: Wire mobile flotante into the existing tick listener**

Look at the existing `<script>` block in `CharacterInfoPanel.astro` (the one that listens to `timeline:scene-changed` and `timeline:narration-tick` and updates the desktop panel DOM). Find the function that updates the desktop panel's name/portrait/role and add a parallel update for the mobile elements.

Inside the existing renderActiveCharacter / similar function, after writing to the desktop DOM nodes, add parallel writes:

```ts
const mobileEl = document.querySelector<HTMLElement>('[data-mobile-cip]');
const mobileImg = document.querySelector<HTMLImageElement>('[data-mcip-portrait-img]');
const mobileName = document.querySelector<HTMLElement>('[data-mcip-name]');
const mobileRole = document.querySelector<HTMLElement>('[data-mcip-role]');
if (mobileEl) {
  if (active && active.portrait) {
    if (mobileImg) { mobileImg.src = active.portrait; mobileImg.style.display = ''; }
    if (mobileName) mobileName.textContent = active.name;
    if (mobileRole) mobileRole.textContent = (active.role ?? '').replace(/-/g, ' ');
    mobileEl.classList.add('is-active');
  } else {
    mobileEl.classList.remove('is-active');
  }
}
```

(Adapt the variable name `active` to whatever the existing function uses.)

Inside the existing `timeline:scene-changed` handler, when an event has 0 characters, also call `mobileEl?.classList.remove('is-active')`.

- [ ] **Step 5: Smoke test**

Run: `npm run dev`
At iPhone 12 (390px), `/era/exodo`:
1. Entrar en fullscreen del mapa → el panel grande NO aparece (queda oculto por el media query).
2. Reproducir el evento Moisés → aparece un mini-overlay abajo: foto chiquita + "Moisés" + "PROFETA".
3. La narración avanza a otro personaje → el overlay se actualiza con el nuevo.

At desktop (1440):
1. El panel completo sigue funcionando como antes.

- [ ] **Step 6: Commit**

```bash
git add src/components/CharacterInfoPanel.astro
git commit -m "feat(char-panel): mobile overlay simplificado y oculta panel desktop"
```

---

### Task 14: Sticky narrator button en móvil

**Files:**
- Modify: `src/components/EventScene.astro` (envolver `<NarratorButton>` con sticky-on-mobile)
- Modify: `src/components/NarratorButton.astro` o estilos en EventScene

- [ ] **Step 1: Wrap NarratorButton in sticky container on mobile**

In `src/components/EventScene.astro`, locate the line:

```astro
<NarratorButton eventId={data.id} narrationText={narrationText} audioSrc={audioSrc} />
```

Replace with:

```astro
<div class="narrator-mobile-sticky">
  <NarratorButton eventId={data.id} narrationText={narrationText} audioSrc={audioSrc} />
</div>
```

- [ ] **Step 2: Add CSS**

In the EventScene `<style>` block, add:

```css
.narrator-mobile-sticky { display: flex; justify-content: flex-end; }
@media (max-width: 767px) {
  .narrator-mobile-sticky {
    position: sticky;
    bottom: 0.75rem;
    z-index: 30;
    margin-top: 0.5rem;
  }
}
```

- [ ] **Step 3: Smoke test**

Run: `npm run dev`
At iPhone 12, evento largo (ej. "Babel"):
1. Scrollear dentro del evento — el botón ▶ Narrar queda anclado abajo.
2. Llegar al siguiente evento — vuelve al flow normal (sticky se "rompe" al pasar de section).

At desktop: el botón sigue en el flow normal de la columna izquierda, sin sticky.

- [ ] **Step 4: Commit**

```bash
git add src/components/EventScene.astro
git commit -m "feat(narrator): sticky bottom en móvil para acceso permanente"
```

---

### Task 15: `mobileDensity` opcional en cues + lectura en `narrationFx.ts`

**Files:**
- Modify: `src/lib/narrationFx.ts` (read `mobileDensity` and scale count)
- Create: `tests/lib/mobileDensity.test.ts`

Permitir a cada cue declarar `mobileDensity: number` (default 1.0). En móvil multiplica el `count` de partículas/elementos del FX. Sin cambios al schema — el campo es opcional y se lee con fallback.

- [ ] **Step 1: Inspect current narrationFx and identify count fields**

Run: `grep -n "count" src/lib/narrationFx.ts | head -20`
Identificar qué FX usan `count` o equivalente (ej. cantidad de partículas, repeticiones).

- [ ] **Step 2: Write a failing test for density scaling**

Create `tests/lib/mobileDensity.test.ts`:

```ts
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
```

- [ ] **Step 3: Run test to verify failure**

Run: `npx vitest run tests/lib/mobileDensity.test.ts`
Expected: FAIL — `scaleCountForViewport` not exported.

- [ ] **Step 4: Add the helper in narrationFx.ts**

In `src/lib/narrationFx.ts`, add and export at the top:

```ts
export function scaleCountForViewport(count: number, mobileDensity: number | undefined): number {
  if (typeof window === 'undefined') return count;
  if (typeof mobileDensity !== 'number') return count;
  if (!window.matchMedia('(max-width: 767px)').matches) return count;
  return Math.max(1, Math.round(count * mobileDensity));
}
```

- [ ] **Step 5: Wire it into the FX dispatch (where `count` is consumed)**

Find each spot in `narrationFx.ts` (and `src/lib/cues/*.ts` if applicable) where a cue's `count` is read and used to spawn FX. Replace `cue.count` with `scaleCountForViewport(cue.count, cue.mobileDensity)` at the use site.

(If the codebase has central cue invocation logic in a single file, only that file needs the change. Inspect via `grep -rn "cue.count\|count:" src/lib/cues src/lib/narrationFx.ts` first.)

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx vitest run tests/lib/mobileDensity.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 7: Verify regressions**

Run: `npm test`
Expected: all existing tests still PASS.

- [ ] **Step 8: Smoke test**

Run: `npm run dev`
At iPhone 12 emulation, `/era/exodo`. Play el evento "Becerro de oro" o similar con FX figurativos. Las animaciones deben aparecer pero con menor densidad si los cues declaran `mobileDensity`. (En este task no agregamos `mobileDensity` a ningún cue específico; solo dejamos la infra. Eso queda para un PR separado de tuning visual.)

- [ ] **Step 9: Commit**

```bash
git add src/lib/narrationFx.ts tests/lib/mobileDensity.test.ts
git commit -m "feat(fx): infra para mobileDensity por cue (opt-in, default 1.0)"
```

---

### Task 16: E2E responsive smoke tests

**Files:**
- Create: `tests/e2e/mobile-era.spec.ts`

- [ ] **Step 1: Write the responsive tests**

Create `tests/e2e/mobile-era.spec.ts`:

```ts
import { test, expect, devices } from '@playwright/test';

test.describe('mobile era page', () => {
  test.use({ ...devices['iPhone 12'] });

  test('era page renders without horizontal overflow at 390px', async ({ page }) => {
    await page.goto('/era/primordial');
    await expect(page.locator('[data-map-root]')).toBeVisible();
    const bodyOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });
    expect(bodyOverflow).toBeLessThanOrEqual(1); // permitimos 1px de redondeo
  });

  test('map stays visible while scrolling', async ({ page }) => {
    await page.goto('/era/primordial');
    const map = page.locator('.map-container').first();
    await expect(map).toBeInViewport();
    await page.evaluate(() => window.scrollBy(0, 800));
    await expect(map).toBeInViewport(); // sticky lo mantiene
  });

  test('timeline mobile track is scrollable and shows event labels', async ({ page }) => {
    await page.goto('/era/primordial');
    const track = page.locator('[data-timeline-mobile-track]');
    await expect(track).toBeVisible();
    const dots = page.locator('[data-timeline-mobile-marker]');
    await expect(dots.first()).toBeVisible();
    expect(await dots.count()).toBeGreaterThan(0);
  });

  test('mobile character cards render in event scene', async ({ page }) => {
    await page.goto('/era/exodo');
    await page.locator('[data-event-scene]').first().scrollIntoViewIfNeeded();
    const cards = page.locator('[data-mobile-char-card]');
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(cards.first()).toBeVisible();
  });

  test('mobile accordion details are closed by default and expand on click', async ({ page }) => {
    await page.goto('/era/exodo');
    const accordion = page.locator('.mobile-accordion').first();
    await accordion.scrollIntoViewIfNeeded();
    await expect(accordion).toBeVisible();
    expect(await accordion.evaluate((el) => (el as HTMLDetailsElement).open)).toBe(false);
    await accordion.locator('summary').click();
    expect(await accordion.evaluate((el) => (el as HTMLDetailsElement).open)).toBe(true);
  });

  test('fullscreen toggle activates body class', async ({ page }) => {
    await page.goto('/era/primordial');
    await page.locator('[data-map-fullscreen-toggle]').click();
    const hasClass = await page.evaluate(() => document.body.classList.contains('map-fullscreen'));
    expect(hasClass).toBe(true);
  });
});

test.describe('desktop era page (regression check)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('desktop layout still has full character tooltips', async ({ page }) => {
    await page.goto('/era/exodo');
    await page.locator('[data-event-scene]').first().scrollIntoViewIfNeeded();
    await expect(page.locator('.characters-in-event').first()).toBeVisible();
    // mobile cards NOT visible at this width
    const mobileCardsVisible = await page.locator('[data-mobile-char-cards]').first().isVisible();
    expect(mobileCardsVisible).toBe(false);
  });

  test('map is fixed (not sticky) at desktop', async ({ page }) => {
    await page.goto('/era/primordial');
    const position = await page.locator('.map-container').first().evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });
});
```

- [ ] **Step 2: Build and run e2e**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run e2e -- tests/e2e/mobile-era.spec.ts`
Expected: all tests PASS.

If any test fails:
- Read the failure message.
- If it's a real bug, file it as a follow-up; if it's a test framing issue, fix the test.
- Common gotcha: `.toBeInViewport()` requires Playwright ≥1.45; if version is older, replace with `.toBeVisible()`.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/mobile-era.spec.ts
git commit -m "test(e2e): mobile-era responsive smoke + desktop regression"
```

---

### Task 17: Manual smoke test golden path + final commit

- [ ] **Step 1: Manual smoke desktop**

Run: `npm run dev`
At 1440×900 (Chrome):
1. `/` → carga.
2. `/era/primordial` → texto izq, mapa fijo der, narrador funciona, fullscreen entra/sale real con ESC.
3. `/era/exodo` → idem, comparativa Torá/Biblia/Corán expanded; tarjetas de personajes con tooltips funcionando.

- [ ] **Step 2: Manual smoke iPhone 12 emulation**

Same Chrome, DevTools iPhone 12 (390×844):
1. `/era/primordial` → nav stack arriba, mapa sticky 35vh, timeline horizontal scrolleable.
2. Tap evento "Caín y Abel" en timeline mobile → centra y navega.
3. Tarjeta de personaje (Adán/Eva) muestra solo foto + nombre + rol.
4. Acordeón "Torá / Biblia / Corán" abre y cierra.
5. Tap en fullscreen → overlay aparece + mini-overlay flotante de personaje.
6. Scroll del mapa: el viewBox auto-zoomea entre eventos.

- [ ] **Step 3: Manual smoke 320×568 (iPhone SE 1ra gen)**

DevTools custom 320×568:
1. `/era/primordial` → sin scroll horizontal, todos los textos legibles.
2. Tarjetas no se desbordan.

- [ ] **Step 4: Run all unit tests**

Run: `npm test`
Expected: 100% PASS.

- [ ] **Step 5: Final commit (if any pending tweak)**

If you made small adjustments during manual smoke:

```bash
git add -A
git commit -m "polish: small fixes from manual mobile smoke"
```

---

## Self-Review (post-plan)

After writing the plan, ran a fresh-eyes check:

1. **Spec coverage**:
   - Layout móvil paralelo → Tasks 5, 6 (sticky stack), 11, 12.
   - Mapa sticky correcto → Task 5.
   - Auto-zoom por evento → Tasks 8, 9.
   - Fullscreen API real → Tasks 3, 4.
   - MobileCharacterCard → Tasks 10, 11.
   - CharacterInfoPanel oculto en móvil + overlay simplificado → Task 13.
   - Tipografía fluida → Task 2.
   - TimelineNav horizontal scrolleable + táctil + sticky fix → Tasks 6, 7.
   - EventScene accordion → Task 12.
   - Narrator sticky → Task 14.
   - `mobileDensity` por cue → Task 15.
   - `is-touch` / `fx-reduced` boot → Task 1.
   - Testing → Task 16.

2. **Placeholder scan**: ninguna instancia de "TBD/TODO" o "agregar manejo de errores"; cada paso tiene código concreto o comandos exactos.

3. **Type consistency**: `MOBILE_ZOOM` se exporta en task 8 y se usa en task 9 vía `initMobileZoom`; mismo nombre, misma firma. `scaleCountForViewport(count, mobileDensity)` consistente en task 15.

4. **Ambigüedades**: el paso 5 de Task 15 dice "find each spot where count is read" — eso requiere inspección antes; está intencional (cada FX puede tener un campo `count` o equivalente, no hay un schema único). Indicamos el grep para descubrir.

---

## Execution Handoff

**Plan completo y guardado en `docs/superpowers/plans/2026-05-19-rediseno-mobile-era-page.md`**. Hay dos formas de ejecutarlo:

1. **Subagent-Driven (recomendado)** — Despacho un subagente fresh por tarea, hago review entre tasks, iteración rápida.

2. **Inline Execution** — Ejecuto las tareas en esta sesión vía executing-plans, con checkpoints para revisar entre batches.

**¿Cuál preferís?**
