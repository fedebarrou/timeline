# Rediseño mobile de la página `era/[id]`

**Fecha**: 2026-05-19
**Autor**: Federico Barroumeres
**Estado**: Spec aprobado por usuario, pendiente plan de implementación

## Contexto y problema

El layout actual de `src/pages/era/[id].astro` fue diseñado para desktop (texto 40% / mapa 60%). En móvil "se exprime": el mapa sticky se mueve al scrollear, los textos quedan muy chicos o desbordan, la tarjeta lateral (CharacterInfoPanel) tiene demasiado detalle para una pantalla angosta, el botón de fullscreen solo aplica un overlay CSS pero no entra en fullscreen real del navegador, y las animaciones SVG no se escalan al tamaño reducido del mapa.

Problemas reportados por el usuario:

1. Timeline se desborda horizontalmente, botones muy chicos para tocar, comportamiento sticky inconsistente.
2. Mapa "se mueve" al scrollear (el sticky se despega del contenedor padre).
3. Textos no escalan bien a pantallas angostas.
4. Animaciones FX sobre el mapa no se ven bien al estar comprimidas.
5. El botón de "pantalla completa" no entra en fullscreen real del navegador.
6. La tarjeta lateral (`CharacterInfoPanel`) muestra demasiada información en móvil; debería ser solo imagen + nombre + rol.
7. Falta una estrategia general de rescalado en móvil.

## Enfoque elegido

**Layout móvil paralelo**: mantener el layout desktop como está hoy, pero introducir un layout dedicado bajo el breakpoint `md` (<768px) con comportamiento propio para mapa, tarjetas, tipografía y timeline. Desktop ≥1024px no cambia. Tablet (768–1023px) recibe un middleground compacto.

Soporte mínimo: 320px (iPhone SE viejo) en adelante.

## Filosofía y breakpoints

```
< 768px        → MÓVIL    (layout nuevo)
768 – 1023px   → TABLET   (texto + mapa lado a lado, compacto)
≥ 1024px       → DESKTOP  (igual que hoy)
```

Detección extra (en `BaseLayout.astro`, script inline al boot):

```ts
if (matchMedia('(pointer: coarse)').matches) document.body.classList.add('is-touch');
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
  document.body.classList.add('fx-reduced');
}
```

- `body.is-touch` — para targets táctiles ≥44px y desactivar hovers.
- `body.fx-reduced` — para reducir densidad de FX en dispositivos modestos.

## Sección 1 — Layout de `era/[id]` en móvil

```
┌────────────────────────┐
│ SiteNav         56px   │ sticky top:0
├────────────────────────┤
│ TimelineNav     48px   │ sticky bajo SiteNav
├────────────────────────┤
│ ▓▓▓ MAPA ▓▓▓           │
│ ▓▓ marcadores ▓▓       │ 35vh, sticky bajo nav stack
│ ▓▓ + zoom auto ▓▓      │
├────────────────────────┤  ← bloque scrolleable
│ — AÑO 1300 a.C. —      │
│ # Moisés y el Éxodo    │
│ ▶ narrar               │
│ [hero image]           │
│ Lorem ipsum...         │
│                        │
│ [MobileCharacterCard]  │ ← tarjeta nueva inline
│ ┌────┐ Moisés          │
│ │img │ PROFETA         │
│ └────┘                 │
│                        │
│ ▼ Torá / Biblia / Corán│ ← accordion <details>
│ ▶ Fuentes              │
│ ▶ Profundizar          │
└────────────────────────┘
```

Cambios estructurales:

- En móvil, el grid `grid-cols-[40fr_60fr]` del `EventScene` colapsa a una sola columna; el `<div class="map-spacer">` queda con `display: none`.
- El contenedor `.map-container` se mueve fuera del wrapper `<div class="relative">` que envuelve `.scenes`. Hoy vive dentro de ese wrapper, lo que hace que el `sticky` se despegue al llegar al final del scroll del wrapper. Pasa a ser hijo directo de `<main>` (o de un wrapper específico para el mapa), de modo que su contexto de sticky es el viewport completo de la página.
- Espaciados: `px-6 lg:px-10 py-24` del `.narrative` se reemplaza por `px-4 py-10` en móvil.

## Sección 2 — Mapa móvil

### 2.A Sticky correcto

```html
<!-- era/[id].astro, simplificado -->
<main>
  <TimelineNav />
  <div class="map-container md:fixed md:right-0 sticky h-[35vh] md:h-[calc(100vh-var(--sticky-header-h))]"
       style="top: var(--sticky-header-h);">
    <!-- map svg, controls -->
  </div>
  <div class="scenes">
    <!-- todas las EventScene -->
  </div>
</main>
```

El mapa deja de ser hermano dentro de `<div class="relative">`. El sticky se ancla al `<main>`, así que persiste durante todo el scroll de la página.

### 2.B Auto-zoom a la zona del evento activo

Nuevo módulo `src/lib/mapMobileZoom.ts`:

```ts
const ZOOM_LEVEL = 2.4; // 1 = mundo entero, 3 = muy cerca

function viewBoxFor(svgX: number, svgY: number): string {
  const w = MAP_VIEWBOX.w / ZOOM_LEVEL;
  const h = MAP_VIEWBOX.h / ZOOM_LEVEL;
  const x = clamp(svgX - w / 2, 0, MAP_VIEWBOX.w - w);
  const y = clamp(svgY - h / 2, 0, MAP_VIEWBOX.h - h);
  return `${x} ${y} ${w} ${h}`;
}

function viewBoxForJourney(from: [number, number], to: [number, number]): string {
  // bounding box from → to + padding 20% para que ambos puntos sean visibles
}

export function initMobileZoom(svg: SVGSVGElement) {
  if (!matchMedia('(max-width: 767px)').matches) return; // móvil only
  window.addEventListener('timeline:scene-changed', (e) => {
    const cfg = sceneConfigFor((e as CustomEvent).detail.eventId);
    const vb = cfg.journeys?.length
      ? viewBoxForJourney(cfg.journeys[0].from, cfg.journeys[0].to)
      : viewBoxFor(cfg.svgPosition[0], cfg.svgPosition[1]);
    gsap.to(svg, { attr: { viewBox: vb }, duration: 0.6, ease: 'power2.inOut' });
  });
}
```

Solo activo en `<768px`. Desktop sigue mostrando todo el mundo.

Los marcadores quedan en su posición real del SVG y escalan naturalmente con el viewBox. Las animaciones de FX (serpiente, becerro, partículas, etc.) también, porque viven dentro del mismo SVG.

### 2.C Fullscreen API real

Nuevo módulo `src/lib/fullscreenApi.ts`:

```ts
export async function enterFullscreen(): Promise<boolean> {
  const root = document.documentElement as any;
  try {
    if (root.requestFullscreen) { await root.requestFullscreen(); return true; }
    if (root.webkitRequestFullscreen) { await root.webkitRequestFullscreen(); return true; }
    // iOS Safari: no soporta requestFullscreen en <html>; intenta el video/elemento específico
    const mc = document.querySelector('.map-container') as any;
    if (mc?.webkitEnterFullscreen) { mc.webkitEnterFullscreen(); return true; }
  } catch { /* fall through */ }
  return false;
}

export async function exitFullscreen(): Promise<void> {
  const d = document as any;
  if (d.exitFullscreen) await d.exitFullscreen();
  else if (d.webkitExitFullscreen) d.webkitExitFullscreen();
}

export function onFullscreenChange(cb: (active: boolean) => void): () => void {
  const handler = () => cb(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  return () => {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
  };
}
```

`MapFullscreenButton.astro` se actualiza:

- Al activar: aplica `body.map-fullscreen` (overlay CSS) Y llama `enterFullscreen()`. Si la API falla, queda solo el overlay (estado actual como fallback).
- Al desactivar: quita la clase Y llama `exitFullscreen()`.
- Escucha `onFullscreenChange` para sincronizar el botón si el usuario sale con ESC del navegador o el gesto del SO en iOS.
- En iOS Safari donde la API no agarra en `<html>`, se muestra un hint pequeño "Girá el teléfono para una vista más inmersiva" la primera vez (localStorage flag para no repetir).

## Sección 3 — Tarjeta lateral simplificada (`MobileCharacterCard`)

Componente nuevo `src/components/MobileCharacterCard.astro`:

```astro
---
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
---
<a href={`/personajes/${char.id}`} class="mobile-char-card">
  <div class="mcc-portrait">
    <img src={char.portrait ?? char.avatar} alt={char.name} loading="lazy" />
  </div>
  <div class="mcc-text">
    <div class="mcc-name">{char.name}</div>
    <div class="mcc-role">{char.role.replace(/-/g, ' ')}</div>
  </div>
</a>

<style>
  .mobile-char-card {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.6rem 0.9rem;
    border: 1px solid var(--era-border);
    border-radius: 8px;
    background: color-mix(in srgb, var(--era-surface) 70%, transparent);
    min-height: 88px;
  }
  .mcc-portrait { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
  .mcc-portrait img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
  .mcc-name { font-family: var(--era-display); font-size: 1.125rem; line-height: 1.15; }
  .mcc-role { font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; margin-top: 0.15rem; }
</style>
```

Solo: imagen 80×80, nombre, rol en uppercase. Sin canonicidad, sin meaning, sin lore, sin dots, sin arrows.

**Uso en EventScene**:

```astro
{/* móvil: tarjetas simples inline, una por personaje */}
<div class="md:hidden flex flex-col gap-2 mt-6">
  {charactersInEvent.map((c) => <MobileCharacterCard char={c} />)}
</div>

{/* desktop: el bloque actual con tooltips y portrait clouds */}
<div class="hidden md:block characters-in-event mt-8">
  {/* ... bloque existente sin cambios ... */}
</div>
```

**Fullscreen móvil**: el `CharacterInfoPanel` actual queda oculto bajo `<768px` (`@media (max-width: 767px) { .character-info-panel { display: none !important; } }`). En su lugar, un `MobileCharacterCard` flotante aparece anclado al borde inferior del mapa (`position: fixed; bottom: 1rem; left: 1rem; right: 1rem`), reusando el mismo listener `timeline:narration-tick` que el panel desktop para ciclar entre personajes según el progreso de narración. Si el evento tiene un solo personaje, no cicla; si tiene cero, no se muestra.

## Sección 4 — Tipografía fluida

`src/styles/global.css`:

```css
:root {
  --fs-h2:    clamp(1.75rem, 5.5vw, 3rem);     /* títulos evento */
  --fs-h3:    clamp(1.25rem, 4vw, 1.75rem);
  --fs-body:  clamp(15px, 1.05vw + 12px, 17px);
  --fs-small: clamp(12px, 0.6vw + 10px, 14px);
  --fs-year:  clamp(10px, 0.7vw + 8px, 13px);
}

body { font-size: var(--fs-body); /* reemplaza el 17px fijo */ }
```

En `EventScene.astro`:

- `text-4xl lg:text-5xl` (título evento) → `style="font-size: var(--fs-h2)"` o clase nueva `.text-h2-fluid`.
- `text-sm tracking-[0.4em]` (línea de año) → `style="font-size: var(--fs-year)"`.
- `font-display italic opacity-70 text-xl` (subtítulo) → `style="font-size: var(--fs-h3)"`.

A 320px: títulos ~28px, cuerpo 15px, año 10px — legible y sin desbordes.
A 1024px+: títulos 48px, cuerpo 17px, año 13px — igual que hoy.

## Sección 5 — TimelineNav en móvil

### 5.A Track horizontal scrolleable

```html
<nav class="timeline-track">
  <button>Adán</button>
  <button>Caín</button>
  <button class="active">Noé</button>
  <button>Babel</button>
  ...
</nav>

<style>
  .timeline-track {
    display: flex; gap: 0.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
  }
  .timeline-track::-webkit-scrollbar { display: none; }
  .timeline-track > button { scroll-snap-align: center; min-height: 44px; padding: 0 1rem; flex-shrink: 0; }
</style>
```

En `timeline:scene-changed`, el evento activo recibe `scrollIntoView({ inline: 'center', behavior: 'smooth' })`.

### 5.B Targets táctiles

`body.is-touch .timeline-track > button { min-height: 44px; min-width: 44px; }`. El círculo visual interno mantiene su tamaño actual; solo el área clickeable crece.

### 5.C Sticky correcto

Hoy `SiteNav` es `fixed top:0` y `TimelineNav` es `fixed top:3rem`. En iOS Safari con URL bar dinámica, el cálculo de `var(--sticky-header-h)` se desfasa. Fix:

- Ambos pasan a `position: sticky; top: 0` dentro de un wrapper común `<div class="nav-stack">` que vive al principio de `<main>`.
- Se eliminan los `top: 3rem` y similares; el orden DOM define el stack.
- `var(--sticky-header-h)` sigue existiendo para `scroll-margin-top` pero se calcula via `ResizeObserver` sobre el `.nav-stack` para que refleje el alto real (incluye URL bar collapse/expand).

### 5.D Era selector en móvil

El custom dropdown actual del era selector se reemplaza por un `<select>` nativo del SO en móvil (`md:hidden`), con un wrapper estilizado. Más rápido, más accesible, ocupa menos.

## Sección 6 — EventScene móvil (accordion)

Bloques que **se mantienen siempre visibles**:

- Año + título + subtítulo
- NarratorButton
- Hero image
- Prosa principal (`<Content />`)
- MobileCharacterCard por cada personaje

Bloques que **pasan a `<details>` colapsable** bajo `md:hidden`:

- Comparativa Torá / Biblia / Corán (cuando `divergent: true`)
- Fuentes consultadas
- MiniHistorySection
- DeepDive
- VideoEmbed + MediaGallery (un solo `<details>` "Galería")

```astro
<div class="md:hidden">
  {data.comparative.divergent && (
    <details class="mobile-accordion">
      <summary>Torá / Biblia / Corán</summary>
      <ComparativeBlock comparative={data.comparative} />
    </details>
  )}
  {data.sources.length > 0 && (
    <details class="mobile-accordion">
      <summary>Fuentes consultadas</summary>
      <ul>{data.sources.map(s => <li><SourceBadge source={s}/></li>)}</ul>
    </details>
  )}
  {/* ... etc */}
</div>

<div class="hidden md:block">
  {/* Los mismos bloques pero sin <details>, expandidos como hoy */}
</div>
```

Cada `<summary>` con padding 16px, chevron CSS que rota con `details[open] summary::after { transform: rotate(90deg); }`. Sin JS extra.

**Narrator sticky** en móvil: cuando el usuario scrollea dentro de una escena, el botón `▶ Narrar` se vuelve `position: sticky; bottom: 1rem; align-self: flex-end` mientras la escena está activa. Vuelve a flujo normal al salir de la escena.

## Sección 7 — FX y animaciones móviles

### 7.A Densidad reducida por cue

Cada cue en `src/lib/cues/*.ts` puede declarar opcionalmente:

```ts
{ pattern: /serpiente de bronce/, fx: 'bronze-serpent', mobileDensity: 0.5 }
```

El runner (`narrationFx.ts`) lee `mobileDensity` y multiplica el `count` de partículas/líneas/elementos. Default 1.0 = igual que hoy.

### 7.B Detección low-end

```ts
// global.css boot script o BaseLayout
const lowEnd = navigator.hardwareConcurrency <= 4;
if (lowEnd) document.body.classList.add('fx-reduced');
```

```css
body.fx-reduced .ambient-layer { opacity: 0.5; animation-duration: 200% !important; }
body.fx-reduced [data-fx-particles] { display: none; } /* solo las primitivas más caras */
```

### 7.C Speech bubbles

Ya se posicionan dentro del SVG, así que el zoom las acompaña sin cambios. Si una burbuja queda fuera del viewBox visible (caso raro de personaje muy a un lado del journey), se reposiciona al centro inferior del mapa con CSS fallback:

```css
@media (max-width: 767px) {
  .speech-bubble[data-out-of-view] { position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); }
}
```

## Archivos afectados

**Componentes nuevos**:

- `src/components/MobileCharacterCard.astro`

**Módulos nuevos**:

- `src/lib/mapMobileZoom.ts` — calcula viewBox por evento, anima con GSAP
- `src/lib/fullscreenApi.ts` — wrapper cross-browser sobre `requestFullscreen`

**Componentes modificados**:

- `src/pages/era/[id].astro` — saca `.map-container` del wrapper relativo, agrega clases responsive, inicializa `mapMobileZoom`
- `src/components/EventScene.astro` — accordion mobile, sticky narrator, render condicional de tarjetas, tokens de tipografía fluida
- `src/components/TimelineNav.astro` — track horizontal scrolleable, era selector nativo, fix sticky con sticky en lugar de fixed
- `src/components/SiteNav.astro` — pasa de `fixed` a `sticky` (parte del stack)
- `src/components/MapFullscreenButton.astro` — integra `fullscreenApi.ts`, escucha `onFullscreenChange`
- `src/components/CharacterInfoPanel.astro` — `md:hidden` como wrapper exterior, versión simplificada bajo móvil fullscreen
- `src/styles/global.css` — tokens fluid typography (`--fs-*`), `body.is-touch`, `body.fx-reduced`
- `src/lib/narrationFx.ts` — leer `mobileDensity` de cues

**Sin tocar**:

- Contenido MDX (`src/content/events/**`, `src/content/characters/**`)
- Lógica de cues, narración, playMode
- Layout desktop (verificación visual mandatoria, pero sin cambios intencionales)

## Plan de testing

- **Playwright responsive**: snapshots a 320, 375, 414, 768, 1024, 1440 sobre 3 eras representativas (primordial, evangelio, revelación).
- **Chrome DevTools mobile emulation**: navegar las 6 eras manualmente, abrir 2 eventos por era.
- **iOS Safari real**: Fullscreen API es notoriamente raro; testear en iPhone físico o BrowserStack.
- **Smoke test golden path**: navegar las 6 eras → abrir 2 eventos por era → dar play → entrar/salir fullscreen → ver una comparativa divergente.
- **No-regresión desktop**: smoke test en 1440px verificando que el layout y los tooltips de personajes no cambiaron.

## Métricas de éxito

- En 320–430px no hay scroll horizontal en ningún punto de la página.
- El mapa permanece visible (sticky) durante todo el scroll de la página, sin "saltos".
- El botón de pantalla completa entra en fullscreen real del navegador en Chrome/Firefox/Edge móvil; en iOS Safari aplica al menos el overlay CSS y un hint de orientación.
- Las tarjetas de personaje en móvil muestran solo imagen + nombre + rol.
- Los títulos no se truncan en 320px.
- TimelineNav permite navegar todos los eventos de una era con touch sin desbordes.
- Las animaciones de FX se ven proporcionadas al tamaño del mapa zoom-eado.

## Fuera de alcance (no en este spec)

- Páginas distintas de `era/[id]` (índice, personajes, lugares, comparativa): cambios incidentales solo si son necesarios para que SiteNav siga consistente.
- Rediseño del estilo visual o paleta.
- Cambios al motor de cues o al texto narrado.
- Soporte de orientación landscape específico (solo aprovechamos lo que da la fullscreen API).
- Tablets como categoría con layout propio: heredan la versión mobile o desktop según breakpoint, sin tratamiento dedicado más allá del middleground 768–1023px.
