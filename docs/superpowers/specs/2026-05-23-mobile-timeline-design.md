# Mobile Timeline — diseño compacto + dialog

**Fecha:** 2026-05-23
**Branch base:** `feat/mobile-redesign`
**Archivo afectado principal:** `src/components/TimelineNav.astro`

## Problema

En viewport móvil (≤768px), el `TimelineNav` muestra `timeline-mobile-track`: una fila de "pills" con el título completo de cada evento, scrollable horizontalmente. Con eras de hasta ~25 eventos y títulos largos ("Las diez plagas de Egipto", "Cruce del mar Rojo"…), la fila excede el ancho del viewport y dispara el scroll horizontal **a nivel de la página entera**. Resultado: el sitio "se desborda" lateralmente en móvil — feo, confuso y rompe el efecto editorial.

La versión desktop con dots posicionados por año + título flotante on-hover **no se puede portar a móvil** porque:
- No hay hover en touch.
- 20+ dots en ~340px de ancho útil quedan apretados, sin espacio para títulos.
- El intento actual de "pills horizontales" es lo que está rompiendo.

## Solución

Reemplazar el track horizontal por:

1. **Header compacto** con 5 dots (ventana centrada en el evento actual) + título + año debajo. **No scroll**, ancho fijo.
2. **Dialog tipo pergamino** que se abre al tocar el área del timeline, con la lista vertical completa de los eventos de la era.

Desktop **no se toca**. Toda la lógica nueva vive bajo `@media (max-width: 767px)`.

---

## Componente 1 — Header compacto (`.timeline-mobile-track`, rediseñado)

### Estructura

```
[‹]  [• • ● • •]  [▶]  [›]
       Diez plagas
       año 2448 · 5/23
```

- `‹` / `›` — flechas de **era anterior / siguiente** (ya existen, se conservan).
- `▶` — play button (ya existe, se conserva).
- `⏮` — restart-btn aparece **solo** en `body.map-fullscreen` (igual que hoy). Cuando aparece, el header móvil pasa a una fila más densa: `[‹] [dots] [⏮] [▶] [›]`. A 320px puede quedar muy apretado; en ese caso se reduce el `gap` del row a 4px y se aumenta el `min-width:0` del track para que comprima los dots.
- En el centro, una "ventana" de **5 slots equidistantes** representando 5 eventos consecutivos: 2 antes, el actual destacado, 2 después.
- Debajo: **título del evento actual** (Cinzel ~11px, `--era-primary`) y **año + posición** (`año X · N/T`, 9px opacity 0.5).
- El restart pill (`⏮`) mantiene su comportamiento actual (solo visible en map-fullscreen).

### Comportamiento de la ventana

5 slots siempre. Sea `i` el índice del evento actual (0..N-1) en `sortedEventsByYear` y `N` el total.

- **Caso medio (N≥5, 2≤i≤N-3):** slots = eventos `[i-2, i-1, i, i+1, i+2]`. El activo queda en el slot 2 (centro).
- **Caso inicio (i<2, N≥5):** slot 0 = cap `‹ inicio`. Slots 1..4 = eventos `[0, 1, 2, 3]`. Activo en slot `1 + i` (slot 1 si `i=0`, slot 2 si `i=1`).
- **Caso fin (i>N-3, N≥5):** slot 4 = cap `fin ›`. Slots 0..3 = eventos `[N-4, N-3, N-2, N-1]`. Activo en slot `i - (N - 5)`.
- **Era pequeña (N<5):** los `N` eventos se colocan en `N` slots consecutivos centrados horizontalmente. Los slots restantes se rellenan con caps: a la izquierda `‹ inicio`, a la derecha `fin ›`. El activo queda en su posición real dentro del bloque de eventos. Ejemplo `N=3`: `[‹ inicio, e0, e1, e2, fin ›]`.

El cap tipográfico es Cinzel 9px, `letter-spacing: 0.18em`, opacity 0.5, color `--era-primary`, todo en minúsculas.

### Línea horizontal

La fina línea base (1px, `rgba(--era-primary, 0.25)`) **no atraviesa los caps**. Con 5 slots equidistantes (cada uno 20% del track), el centro del slot `s` está en `(s + 0.5) * 20%` = 10%, 30%, 50%, 70%, 90%.

La línea se dibuja con `position: absolute` desde el centro del **primer slot-con-dot** hasta el centro del **último slot-con-dot**. Ejemplos:

- Caso medio (slots 0..4 son dots): línea de 10% a 90%.
- Caso inicio (slot 0 = cap, slots 1..4 = dots): línea de 30% a 90%.
- Caso fin (slot 4 = cap, slots 0..3 = dots): línea de 10% a 70%.
- `N=3` (slots 0 y 4 = caps, slots 1..3 = dots): línea de 30% a 70%.

Implementación: `left` y `right` (o `transform`) calculados en el server-side de Astro a partir de las posiciones de los caps, así no requiere JS para layout inicial. Re-cálculo on `timeline:scene-changed` desde el script.

### Dot estilos

| Estado | Tamaño | Color | Glow |
|---|---|---|---|
| Inactivo | 6×6px | `rgba(--era-primary, 0.4)` | — |
| Activo | 11×11px | `--era-accent` | `box-shadow: 0 0 8px --era-accent` |
| Cap (no-dot) | text-9px Cinzel | `rgba(--era-primary, 0.5)` | — |

### Tappability

**Toda la zona del timeline compacto** (la franja entera con dots + label + año) es un único tap target que abre el dialog. Los dots individuales **no navegan inline** — son solo indicadores visuales. La navegación evento-a-evento se hace:

- Tocando un row dentro del dialog.
- Con scroll vertical (cada evento es su propia scene, ya implementado).
- Con play mode (auto-advance, ya implementado).

ARIA: el contenedor es `<button type="button" aria-haspopup="dialog" aria-label="Abrir línea de tiempo de la era">`.

---

## Componente 2 — Dialog "pergamino" (`MobileTimelineDialog.astro`, nuevo)

Reutiliza el lenguaje visual de `EraClosingDialog.astro`: pergamino centrado, backdrop oscuro con blur, animación de fade + scale.

### Estructura visual

```
┌─────────────────────────────┐
│         LÍNEA DE TIEMPO     │  ← eyebrow, Cinzel 9px 0.35em
│            Éxodo             │  ← título de la era, Cinzel 17px
├─────────────────────────────┤
│  2447  Zarza ardiente        │
│         Vocación de Moisés…  │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│  2448  Cruce del mar Rojo    │
│         Liberación de Egipto │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│► 2448  Las diez plagas     ◄ │  ← activo: border-left, bg
│         Sangre, ranas…       │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│  …                            │
└─────────────────────────────┘
```

- `width: min(92vw, 480px)`, `max-height: 78vh`, scroll-vertical interno.
- Paleta pergamino idéntica a `EraClosingDialog` (`#f3e0b8 → #d8b985`, texto `#3a261a`, header `#5a2c10`).
- **Filas:** `display: grid; grid-template-columns: 56px 1fr; gap: 10px; padding: 10px 16px; border-bottom: 1px dashed rgba(90,50,20,0.18)`.
- **Año:** Cinzel 11px, color `#5a2c10`, alineado top.
- **Título:** Cinzel 13px, `#2f1b10`.
- **Subtítulo:** EB Garamond 11px, `rgba(58,38,26,0.65)` — proviene de `event.data.subtitle`. Si no existe, se omite la línea (no se intenta extraer del body MDX).
- **Fila activa:** `background: rgba(120,70,30,0.12); border-left: 2px solid #5a2c10; padding-left: 14px`.

### Auto-scroll

Al abrir el dialog, el row activo se desplaza al centro de la zona scrollable (`scrollIntoView({ block: 'center', behavior: 'instant' })`). El usuario aterriza viendo "dónde está".

### Apertura / cierre

- **Abre:** tap sobre el header compacto del timeline.
- **Cierra:**
  - Tap sobre el backdrop.
  - Tecla `Escape`.
  - Botón × en una esquina del header del dialog (top-right, 26×26, redondo).
  - Al tocar un row → navega y cierra.

### Navegación desde el dialog

Tap en un row → ejecuta exactamente la misma lógica que el click en un dot de la timeline actual:

- Si `isPlaying()`: `jumpToEventId(id)` con el callback de progreso.
- Si no: `scrollToElement(target)` al `#event-${id}`.

Después de navegar, **el dialog se cierra**.

### Datos

El dialog recibe la **misma lista de eventos** que ya recibe `TimelineNav` (eventos filtrados por era, ordenados por `biblicalYear`). No requiere fetch adicional.

---

## Archivos a tocar

| Archivo | Cambio |
|---|---|
| `src/components/TimelineNav.astro` | Rediseñar markup mobile (reemplazar `.timeline-mobile-track` por la ventana de 5 slots + label/año). Borrar todo el CSS de `mobile-dot` y `scroll-snap`. El nuevo CSS vive en el mismo bloque `@media (max-width: 767px)`. |
| `src/components/MobileTimelineDialog.astro` | **Nuevo.** Component que recibe `events`, `eraName`, `currentEraId` como props. Encapsula markup + CSS + script (open/close, auto-scroll, tap-row). |
| `src/pages/era/[id].astro` | Importar `MobileTimelineDialog` y renderizarlo una vez al final del layout (junto a `EraClosingDialog`). Pasarle los mismos `events` + `era.data.name`. |
| `src/lib/playMode.ts` | Sin cambios. |
| `src/lib/scrollOffset.ts` | Sin cambios. |

## Eventos / contratos

El nuevo header compacto **escucha los mismos eventos** que ya escucha el desktop track:

- `timeline:scene-changed` → recalcular la ventana y actualizar el label/año.
- `IntersectionObserver` sobre `[data-event-scene]` → mismo dispatcher de "activo".

El dialog **emite/escucha**:

- Escucha el click en el header compacto para abrir.
- Escucha `Escape`, click en backdrop, click en × para cerrar.
- Al navegar, dispara la misma función que el dot desktop.

No se introducen eventos nuevos del bus.

## Edge cases

- **Era con 1 solo evento:** ventana de 5 slots con `inicio ›` y `‹ fin` a ambos lados, dot activo al centro. Dialog muestra 1 fila.
- **Era con 2 eventos:** caps a ambos extremos, 2 dots interiores. La ventana refleja la realidad.
- **Era con 3-4 eventos:** ventana arranca sin clamping, sin caps a un lado pero sí del otro.
- **Eventos con `subtitle` muy largo:** el subtítulo se trunca con `-webkit-line-clamp: 2; overflow: hidden`. En la lista del dialog, no en el header compacto (donde solo va el título).
- **Eventos sin subtitle:** se omite la línea de subtítulo en el dialog. Solo año + título.
- **Body scroll lock:** al abrir el dialog, `document.body.style.overflow = 'hidden'`. Se restaura al cerrar.
- **`prefers-reduced-motion`:** las animaciones de fade/scale del dialog se reducen a `opacity 200ms` sin transform.

## Accesibilidad

- Header compacto: `<button>` con `aria-haspopup="dialog"`, `aria-controls="mobile-timeline-dialog"`, `aria-label` descriptivo.
- Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="mobile-timeline-dialog-title"`.
- Focus trap dentro del dialog mientras está abierto. Focus inicial sobre el row activo.
- Al cerrar, devolver focus al header compacto.

## Testing

- E2E con Playwright a 390px de ancho:
  1. Cargar `/era/exodo`, verificar que **no hay scrollbar horizontal en body**.
  2. Verificar que se renderizan 5 slots.
  3. Hacer scroll a un evento intermedio, verificar que el dot activo cambia.
  4. Tap en el header compacto → dialog visible.
  5. Tap en un row → dialog se cierra y la URL/scroll se mueve al evento.
  6. Verificar el cap `‹ inicio` cuando estamos en el primer evento.
- Verificar manualmente en 320px (iPhone SE), 390px (iPhone 14), 768px (umbral).
- Desktop (≥768px) sin cambios — visual regression check sobre `/era/exodo`, `/era/evangelio`, `/era/primordial`.

## Out of scope

- Cambiar el diseño desktop.
- Cambiar el contenido / subtitles de los eventos.
- Cambiar el `EraClosingDialog` (solo se reusa el estilo visual del pergamino).
- Soporte tablet específico — el breakpoint sigue siendo 768px.
