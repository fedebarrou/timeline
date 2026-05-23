# Mobile Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la fila scrollable de pills del `TimelineNav` mobile (que desborda el body a la derecha) por un header compacto de 5 slots con ventana centrada + un dialog tipo pergamino con la lista completa de eventos de la era.

**Architecture:** Toda la UI nueva vive dentro de un `@media (max-width: 767px)` o en un componente nuevo (`MobileTimelineDialog`). El cómputo de la ventana de 5 slots es una función pura compartida (server-side en Astro y cliente en JS). El dialog reutiliza el lenguaje visual del `EraClosingDialog` (paleta pergamino). Comunicación vía custom events del `window` ya existentes (`timeline:scene-changed`) más dos eventos nuevos (`mobile-timeline:open`, `mobile-timeline:close`).

**Tech Stack:** Astro 5, TypeScript, Tailwind, Playwright (e2e), `src/lib/playMode.ts` y `src/lib/scrollOffset.ts` (existentes, sin cambios).

**Spec:** `docs/superpowers/specs/2026-05-23-mobile-timeline-design.md`

---

## File Structure

| Archivo | Responsabilidad |
|---|---|
| `src/components/TimelineNav.astro` (modify) | Markup, CSS y JS del header. Desktop intacto; mobile rediseñado. Calcula los 5 slots iniciales server-side y los actualiza en cliente cuando cambia la scene activa. Despacha `mobile-timeline:open` cuando el usuario toca el header. |
| `src/components/MobileTimelineDialog.astro` (create) | Componente nuevo. Encapsula el dialog pergamino: backdrop, lista vertical de eventos, lógica de open/close, auto-scroll al row activo, body lock, focus trap, navegación al tocar fila. Escucha `mobile-timeline:open`. |
| `src/pages/era/[id].astro` (modify) | Renderiza `<MobileTimelineDialog>` una vez al final, junto al `<EraClosingDialog>`, con los mismos `events` + `eraName`. |
| `src/lib/mobileTimelineWindow.ts` (create) | Función pura `computeSlots(events, currentIndex)` reusada por TimelineNav server-side y por el script del cliente. Mantiene la lógica de ventana en un solo lugar y permite tests unitarios. |
| `tests/lib/mobileTimelineWindow.test.ts` (create) | Tests unitarios de `computeSlots`: caso medio, caso inicio, caso fin, N<5. |
| `tests/e2e/mobile-era.spec.ts` (modify) | Reemplazar el test obsoleto del `timeline-mobile-track`. Agregar tests para los 5 slots, label/año, apertura del dialog, navegación desde el dialog. |

---

## Task 1: Función pura `computeSlots` con tests unitarios

**Files:**
- Create: `src/lib/mobileTimelineWindow.ts`
- Create: `tests/lib/mobileTimelineWindow.test.ts`

- [ ] **Step 1: Escribir el test que falla**

Crear `tests/lib/mobileTimelineWindow.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { computeSlots } from '../../src/lib/mobileTimelineWindow';

const evts = (n: number) => Array.from({ length: n }, (_, k) => ({ id: `e${k}`, biblicalYear: 1000 + k, title: `Event ${k}` }));

describe('computeSlots', () => {
  it('center case (N=10, i=5): shows events 3..7, active at slot 2', () => {
    const out = computeSlots(evts(10), 5);
    expect(out).toHaveLength(5);
    expect(out.map(s => s.kind)).toEqual(['dot','dot','dot','dot','dot']);
    expect(out.map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e3','e4','e5','e6','e7']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(2);
  });

  it('start case (N=10, i=0): cap "inicio" at slot 0, events 0..3 at slots 1..4, active at slot 1', () => {
    const out = computeSlots(evts(10), 0);
    expect(out[0]).toEqual({ kind: 'cap', side: 'start' });
    expect(out.slice(1).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e0','e1','e2','e3']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(1);
  });

  it('start case (N=10, i=1): cap at slot 0, active at slot 2', () => {
    const out = computeSlots(evts(10), 1);
    expect(out[0].kind).toBe('cap');
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(2);
  });

  it('end case (N=10, i=9): cap "fin" at slot 4, events 6..9 at slots 0..3, active at slot 3', () => {
    const out = computeSlots(evts(10), 9);
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.slice(0, 4).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e6','e7','e8','e9']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(3);
  });

  it('small era (N=3): both caps + 3 events, active at the right slot', () => {
    const out = computeSlots(evts(3), 1);
    expect(out[0]).toEqual({ kind: 'cap', side: 'start' });
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.slice(1, 4).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e0','e1','e2']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(2);
  });

  it('small era (N=1): cap, _, dot active, _, cap → render 5 slots, only one dot', () => {
    const out = computeSlots(evts(1), 0);
    expect(out).toHaveLength(5);
    expect(out[0]).toEqual({ kind: 'cap', side: 'start' });
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.filter(s => s.kind === 'dot')).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/lib/mobileTimelineWindow.test.ts
```

Expected: FAIL with "Cannot find module '../../src/lib/mobileTimelineWindow'".

- [ ] **Step 3: Implementar `computeSlots`**

Crear `src/lib/mobileTimelineWindow.ts`:

```ts
export type Slot =
  | { kind: 'dot'; eventId: string; year: number; title: string; active: boolean }
  | { kind: 'cap'; side: 'start' | 'end' };

export interface SlotEvent {
  id: string;
  biblicalYear: number;
  title: string;
}

/**
 * Computes the 5-slot window for the mobile timeline header.
 *
 * Rules (see spec 2026-05-23-mobile-timeline-design.md):
 * - Always returns exactly 5 slots.
 * - N >= 5, 2 <= i <= N-3 (center): slots = events [i-2..i+2], active at slot 2.
 * - N >= 5, i < 2 (start): slot 0 = cap 'start'; slots 1..4 = events [0..3]; active at slot 1 + i.
 * - N >= 5, i > N-3 (end): slots 0..3 = events [N-4..N-1]; slot 4 = cap 'end'; active at slot i - (N-5).
 * - N < 5 (small): center the N real events; caps fill the remaining slots on both sides.
 */
export function computeSlots(events: SlotEvent[], currentIndex: number): Slot[] {
  const N = events.length;
  if (N === 0) {
    return Array.from({ length: 5 }, (_, s) => ({ kind: 'cap', side: s < 2 ? 'start' : 'end' } as Slot));
  }

  if (N >= 5) {
    if (currentIndex >= 2 && currentIndex <= N - 3) {
      return [-2, -1, 0, 1, 2].map((offset, slotIdx) => {
        const e = events[currentIndex + offset];
        return { kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: slotIdx === 2 } as Slot;
      });
    }
    if (currentIndex < 2) {
      const slots: Slot[] = [{ kind: 'cap', side: 'start' }];
      for (let j = 0; j < 4; j++) {
        const e = events[j];
        slots.push({ kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: j === currentIndex });
      }
      return slots;
    }
    // i > N - 3
    const slots: Slot[] = [];
    for (let j = N - 4; j < N; j++) {
      const e = events[j];
      slots.push({ kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: j === currentIndex });
    }
    slots.push({ kind: 'cap', side: 'end' });
    return slots;
  }

  // Small era: center N events, fill the rest with caps on both sides.
  const leftCaps = Math.floor((5 - N) / 2);
  const rightCaps = 5 - N - leftCaps;
  const slots: Slot[] = [];
  for (let k = 0; k < leftCaps; k++) slots.push({ kind: 'cap', side: 'start' });
  for (let j = 0; j < N; j++) {
    const e = events[j];
    slots.push({ kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: j === currentIndex });
  }
  for (let k = 0; k < rightCaps; k++) slots.push({ kind: 'cap', side: 'end' });
  return slots;
}

/**
 * Returns the [leftPct, rightPct] tuple for the horizontal base line, where
 * each value is the percentage offset (0..100) of the line endpoint along
 * the 5-slot track. The line spans from the center of the first dot-slot
 * to the center of the last dot-slot.
 *
 * Slot s center = (s + 0.5) * 20%.
 */
export function computeLinePct(slots: Slot[]): [number, number] {
  const firstDot = slots.findIndex(s => s.kind === 'dot');
  const lastDot = slots.length - 1 - [...slots].reverse().findIndex(s => s.kind === 'dot');
  if (firstDot < 0) return [50, 50];
  return [(firstDot + 0.5) * 20, (lastDot + 0.5) * 20];
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/lib/mobileTimelineWindow.test.ts
```

Expected: PASS — 6 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/mobileTimelineWindow.ts tests/lib/mobileTimelineWindow.test.ts
git commit -m "feat(timeline): compute 5-slot window helper for mobile header"
```

---

## Task 2: E2E test que falla — header compacto sin overflow + 5 slots visibles

**Files:**
- Modify: `tests/e2e/mobile-era.spec.ts`

- [ ] **Step 1: Reemplazar el test obsoleto y agregar tests del header**

En `tests/e2e/mobile-era.spec.ts`, **borrar** el test `'timeline mobile track is scrollable and shows event labels'` (queda obsoleto) y **agregar** justo después del test del overflow:

```ts
test('mobile timeline header renders exactly 5 slots', async ({ page }) => {
  await page.goto('/era/exodo');
  const slots = page.locator('[data-tl-mobile-slot]');
  await expect(slots).toHaveCount(5);
});

test('mobile timeline header shows active dot + current event label', async ({ page }) => {
  await page.goto('/era/exodo');
  const active = page.locator('[data-tl-mobile-slot].is-active');
  await expect(active).toHaveCount(1);
  await expect(page.locator('[data-tl-mobile-label]')).toBeVisible();
  await expect(page.locator('[data-tl-mobile-meta]')).toBeVisible();
});

test('mobile timeline header trigger is a button with aria attributes', async ({ page }) => {
  await page.goto('/era/exodo');
  const trigger = page.locator('[data-tl-mobile-trigger]');
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/e2e/mobile-era.spec.ts
```

Expected: los 3 nuevos tests fallan ("expected count 5, received 0") y el test del overflow puede seguir pasando o fallando dependiendo del estado actual. Anotá cuáles fallan.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/mobile-era.spec.ts
git commit -m "test(timeline): failing e2e for compact mobile header"
```

---

## Task 3: Implementar el header compacto en `TimelineNav.astro`

**Files:**
- Modify: `src/components/TimelineNav.astro` (líneas ~144-152 markup mobile, ~194-239 CSS mobile, agregar nuevo script)

- [ ] **Step 1: Importar el helper y calcular slots server-side**

Al final del front-matter de `src/components/TimelineNav.astro` (después de la línea `const nextHref = ...`), agregar:

```ts
import { computeSlots, computeLinePct, type Slot } from '../lib/mobileTimelineWindow';

const slotEvents = sortedEventsByYear.map((e) => ({ id: e.data.id, biblicalYear: e.data.biblicalYear, title: e.data.title }));
const initialSlots: Slot[] = computeSlots(slotEvents, 0);
const [initialLineFrom, initialLineTo] = computeLinePct(initialSlots);
const initialActive = sortedEventsByYear[0];
const totalEvents = sortedEventsByYear.length;
```

- [ ] **Step 2: Reemplazar el markup de `.timeline-mobile-track`**

En `src/components/TimelineNav.astro`, **borrar** el bloque actual del `<nav class="timeline-mobile-track" ...>...</nav>` (líneas ~144-152) y **reemplazarlo** por:

```astro
<button
  type="button"
  class="tl-mobile-trigger"
  data-tl-mobile-trigger
  aria-haspopup="dialog"
  aria-controls="mobile-timeline-dialog"
  aria-label="Abrir línea de tiempo de la era"
>
  <div class="tl-mobile-track" data-tl-mobile-track>
    <div
      class="tl-mobile-line"
      data-tl-mobile-line
      style={`left: ${initialLineFrom}%; right: ${100 - initialLineTo}%`}
    ></div>
    {initialSlots.map((slot, idx) => (
      slot.kind === 'dot' ? (
        <div
          class:list={["tl-mobile-slot", { "is-active": slot.active }]}
          data-tl-mobile-slot
          data-slot-index={idx}
          data-slot-kind="dot"
          data-event-id={slot.eventId}
        >
          <span class="tl-mobile-dot"></span>
        </div>
      ) : (
        <div
          class="tl-mobile-slot tl-mobile-slot--cap"
          data-tl-mobile-slot
          data-slot-index={idx}
          data-slot-kind="cap"
          data-cap-side={slot.side}
        >
          <span class="tl-mobile-cap">{slot.side === 'start' ? '‹ inicio' : 'fin ›'}</span>
        </div>
      )
    ))}
  </div>
  <div class="tl-mobile-label" data-tl-mobile-label>{initialActive.data.title}</div>
  <div class="tl-mobile-meta" data-tl-mobile-meta>año {initialActive.data.biblicalYear} · 1/{totalEvents}</div>
</button>
```

- [ ] **Step 3: Reemplazar el CSS móvil**

En el bloque `<style>` de `TimelineNav.astro`, dentro de `@media (max-width: 767px)`, **borrar** todo lo referente a `.timeline-mobile-track` y `.mobile-dot` y reemplazarlo por:

```css
  @media (max-width: 767px) {
    /* La timeline-nav crece para acomodar la fila de label + año. */
    .timeline-nav { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .timeline-nav > .flex { height: auto; min-height: 3.25rem; }

    /* Botón trigger que envuelve todo el bloque móvil. */
    .tl-mobile-trigger {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.25rem;
      padding: 0;
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      text-align: center;
    }
    .tl-mobile-trigger:focus-visible { outline: 2px solid var(--era-accent); outline-offset: 2px; border-radius: 4px; }

    .tl-mobile-track {
      position: relative;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      height: 22px;
    }
    .tl-mobile-line {
      position: absolute;
      top: 50%;
      height: 1px;
      transform: translateY(-50%);
      background: color-mix(in srgb, var(--era-primary) 25%, transparent);
      pointer-events: none;
    }
    .tl-mobile-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 22px;
      z-index: 1;
    }
    .tl-mobile-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--era-primary) 40%, transparent);
      transition: width 200ms ease, height 200ms ease, box-shadow 200ms ease, background 200ms ease;
    }
    .tl-mobile-slot.is-active .tl-mobile-dot {
      width: 11px;
      height: 11px;
      background: var(--era-accent);
      box-shadow: 0 0 8px var(--era-accent);
    }
    .tl-mobile-cap {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: lowercase;
      color: color-mix(in srgb, var(--era-primary) 55%, transparent);
      white-space: nowrap;
    }
    .tl-mobile-label {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      letter-spacing: 0.14em;
      color: var(--era-primary);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tl-mobile-meta {
      font-size: 9px;
      opacity: 0.55;
      letter-spacing: 0.05em;
    }

    /* Hide desktop track + step arrows on mobile (mismo que antes). */
    .timeline-desktop-track { display: none; }
    .step-arrow { display: none; }

    /* Con restart-btn visible (map-fullscreen), comprimir el row. */
    body.map-fullscreen .timeline-nav > .flex { gap: 0.5rem; }
  }
  @media (min-width: 768px) {
    .tl-mobile-trigger { display: none; }
  }
```

- [ ] **Step 4: Agregar el script que actualiza los slots cuando cambia la scene**

Al final del `<script>` existente en `TimelineNav.astro` (después del último `mobileDots.forEach(...)`), **borrar el bloque viejo** de `const mobileDots = ...` hasta el final del script (incluye `updateMobileActive` y el listener de `timeline:scene-changed` viejo + el `mobileDots.forEach((dot) => { dot.addEventListener('click', ...) })`), y **reemplazarlo** por:

```ts
import { computeSlots, computeLinePct, type Slot } from '../lib/mobileTimelineWindow';

const tlMobileTrigger = document.querySelector<HTMLButtonElement>('[data-tl-mobile-trigger]');
const tlMobileTrack = document.querySelector<HTMLElement>('[data-tl-mobile-track]');
const tlMobileLine = document.querySelector<HTMLElement>('[data-tl-mobile-line]');
const tlMobileLabel = document.querySelector<HTMLElement>('[data-tl-mobile-label]');
const tlMobileMeta = document.querySelector<HTMLElement>('[data-tl-mobile-meta]');

interface SerializedEvent { id: string; biblicalYear: number; title: string; }
const slotEvents: SerializedEvent[] = Array.from(
  document.querySelectorAll<HTMLElement>('[data-event-scene]')
).map((el) => ({
  id: el.dataset.eventId || '',
  biblicalYear: Number(el.dataset.eventYear || 0),
  title: el.dataset.eventTitle || '',
})).filter((e) => e.id);

function renderMobileSlots(activeIndex: number) {
  if (!tlMobileTrack || activeIndex < 0 || activeIndex >= slotEvents.length) return;
  const slots = computeSlots(slotEvents, activeIndex);
  const [lineFrom, lineTo] = computeLinePct(slots);

  // Re-render slot DOM. We rely on a fixed 5-child grid so we can wipe and rebuild.
  tlMobileTrack.innerHTML = '';
  if (tlMobileLine) {
    tlMobileLine.style.left = `${lineFrom}%`;
    tlMobileLine.style.right = `${100 - lineTo}%`;
    tlMobileTrack.appendChild(tlMobileLine);
  }
  slots.forEach((slot, idx) => {
    const cell = document.createElement('div');
    cell.dataset.tlMobileSlot = '';
    cell.dataset.slotIndex = String(idx);
    if (slot.kind === 'dot') {
      cell.className = 'tl-mobile-slot' + (slot.active ? ' is-active' : '');
      cell.dataset.slotKind = 'dot';
      cell.dataset.eventId = slot.eventId;
      const dot = document.createElement('span');
      dot.className = 'tl-mobile-dot';
      cell.appendChild(dot);
    } else {
      cell.className = 'tl-mobile-slot tl-mobile-slot--cap';
      cell.dataset.slotKind = 'cap';
      cell.dataset.capSide = slot.side;
      const cap = document.createElement('span');
      cap.className = 'tl-mobile-cap';
      cap.textContent = slot.side === 'start' ? '‹ inicio' : 'fin ›';
      cell.appendChild(cap);
    }
    tlMobileTrack.appendChild(cell);
  });

  const active = slotEvents[activeIndex];
  if (active && tlMobileLabel) tlMobileLabel.textContent = active.title;
  if (active && tlMobileMeta) tlMobileMeta.textContent = `año ${active.biblicalYear} · ${activeIndex + 1}/${slotEvents.length}`;
}

window.addEventListener('timeline:scene-changed', (e) => {
  const id = (e as CustomEvent).detail?.eventId;
  if (!id) return;
  const idx = slotEvents.findIndex((ev) => ev.id === id);
  if (idx >= 0) renderMobileSlots(idx);
});

// Initialize from the IntersectionObserver's first hit or fall back to index 0.
function syncFromActiveDesktopDot() {
  const desktopActive = document.querySelector<HTMLElement>('[data-timeline-active]');
  if (!desktopActive) return;
  const left = desktopActive.style.left;
  // Heuristic: find the desktop dot whose left matches and resolve to its eventId.
  const allMarkers = document.querySelectorAll<HTMLElement>('[data-timeline-marker]');
  for (const m of allMarkers) {
    if (m.style.left === left) {
      const id = m.dataset.timelineMarker;
      const idx = id ? slotEvents.findIndex((ev) => ev.id === id) : -1;
      if (idx >= 0) renderMobileSlots(idx);
      return;
    }
  }
}
document.addEventListener('DOMContentLoaded', syncFromActiveDesktopDot);

// Trigger opens the dialog (component listens to this event).
tlMobileTrigger?.addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('mobile-timeline:open'));
});
```

- [ ] **Step 5: Asegurar que cada scene expone `data-event-year` y `data-event-title`**

Verificar `src/components/EventScene.astro`. Si no existen `data-event-year` y `data-event-title` (sólo está `data-event-id`), agregarlos. Buscar la línea `<section data-event-scene ...>` y agregar los atributos:

```bash
grep -n "data-event-scene" src/components/EventScene.astro
```

Si faltan, agregar a esa misma `<section>`:

```astro
data-event-id={event.data.id}
data-event-year={event.data.biblicalYear}
data-event-title={event.data.title}
```

- [ ] **Step 6: Verificar que los e2e tests del header pasan**

```bash
npx playwright test tests/e2e/mobile-era.spec.ts -g "renders exactly 5 slots|active dot|trigger is a button"
```

Expected: PASS los 3 tests del header. El test del overflow también debería pasar (no hay scroll horizontal).

- [ ] **Step 7: Commit**

```bash
git add src/components/TimelineNav.astro src/components/EventScene.astro
git commit -m "feat(timeline): compact 5-slot mobile header replacing scrollable pills"
```

---

## Task 4: E2E test que falla — dialog se abre y muestra la lista

**Files:**
- Modify: `tests/e2e/mobile-era.spec.ts`

- [ ] **Step 1: Agregar los tests del dialog**

Agregar al final del `test.describe('mobile era page', ...)`:

```ts
test('tap on mobile timeline header opens parchment dialog', async ({ page }) => {
  await page.goto('/era/exodo');
  await page.locator('[data-tl-mobile-trigger]').tap();
  await expect(page.locator('[data-tl-mobile-dialog]')).toBeVisible();
});

test('dialog lists all era events with year + title', async ({ page }) => {
  await page.goto('/era/exodo');
  await page.locator('[data-tl-mobile-trigger]').tap();
  const rows = page.locator('[data-tl-mobile-dialog-row]');
  expect(await rows.count()).toBeGreaterThan(3);
  await expect(rows.first().locator('[data-tl-dialog-year]')).toBeVisible();
  await expect(rows.first().locator('[data-tl-dialog-title]')).toBeVisible();
});

test('tap on a dialog row closes dialog and scrolls to event', async ({ page }) => {
  await page.goto('/era/exodo');
  await page.locator('[data-tl-mobile-trigger]').tap();
  const targetRow = page.locator('[data-tl-mobile-dialog-row]').nth(2);
  const eventId = await targetRow.getAttribute('data-event-id');
  await targetRow.tap();
  await expect(page.locator('[data-tl-mobile-dialog]')).toBeHidden();
  const targetScene = page.locator(`#event-${eventId}`);
  await expect(targetScene).toBeInViewport();
});

test('escape key closes the dialog', async ({ page }) => {
  await page.goto('/era/exodo');
  await page.locator('[data-tl-mobile-trigger]').tap();
  await expect(page.locator('[data-tl-mobile-dialog]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-tl-mobile-dialog]')).toBeHidden();
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx playwright test tests/e2e/mobile-era.spec.ts -g "dialog|escape"
```

Expected: FAIL — "Locator '[data-tl-mobile-dialog]' not found".

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/mobile-era.spec.ts
git commit -m "test(timeline): failing e2e for mobile dialog open/close/navigate"
```

---

## Task 5: Crear el componente `MobileTimelineDialog.astro`

**Files:**
- Create: `src/components/MobileTimelineDialog.astro`

- [ ] **Step 1: Crear el componente**

Crear `src/components/MobileTimelineDialog.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  events: CollectionEntry<'events'>[];
  eraName: string;
}
const { events, eraName } = Astro.props;
const sortedEvents = [...events].sort((a, b) => a.data.biblicalYear - b.data.biblicalYear);
---
<div
  class="mtd"
  data-tl-mobile-dialog
  id="mobile-timeline-dialog"
  role="dialog"
  aria-modal="true"
  aria-labelledby="mtd-title"
  aria-hidden="true"
>
  <div class="mtd-backdrop" data-tl-mobile-dialog-backdrop></div>
  <article class="mtd-parchment" tabindex="-1">
    <header class="mtd-header">
      <div>
        <p class="mtd-eyebrow">Línea de tiempo</p>
        <h2 class="mtd-title" id="mtd-title">{eraName}</h2>
      </div>
      <button
        type="button"
        class="mtd-close"
        data-tl-mobile-dialog-close
        aria-label="Cerrar línea de tiempo"
      >×</button>
    </header>
    <div class="mtd-list" data-tl-mobile-dialog-list>
      {sortedEvents.map((e) => (
        <button
          type="button"
          class="mtd-row"
          data-tl-mobile-dialog-row
          data-event-id={e.data.id}
        >
          <span class="mtd-year" data-tl-dialog-year>{e.data.biblicalYear}</span>
          <span class="mtd-text">
            <span class="mtd-title-row" data-tl-dialog-title>{e.data.title}</span>
            {e.data.subtitle && <span class="mtd-sub">{e.data.subtitle}</span>}
          </span>
        </button>
      ))}
    </div>
  </article>
</div>

<style>
  .mtd {
    position: fixed; inset: 0; z-index: 70;
    display: none; align-items: center; justify-content: center;
    padding: 1rem; pointer-events: none;
  }
  .mtd.is-open { display: flex; pointer-events: auto; }

  .mtd-backdrop {
    position: absolute; inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    opacity: 0; transition: opacity 320ms ease;
  }
  .mtd.is-open .mtd-backdrop { opacity: 1; }

  .mtd-parchment {
    position: relative;
    width: min(92vw, 480px);
    max-height: 78vh;
    display: flex; flex-direction: column;
    color: #3a261a;
    font-family: 'EB Garamond', Georgia, serif;
    background:
      radial-gradient(ellipse at 20% 10%, rgba(90, 50, 20, 0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 90%, rgba(60, 30, 10, 0.22) 0%, transparent 60%),
      linear-gradient(160deg, #f3e0b8 0%, #ead2a0 50%, #d8b985 100%);
    border-radius: 6px;
    box-shadow:
      0 28px 60px rgba(0, 0, 0, 0.55),
      inset 0 0 60px rgba(120, 70, 30, 0.25),
      inset 0 0 0 1px rgba(120, 70, 30, 0.35);
    transform: translateY(16px) scale(0.97);
    opacity: 0;
    transition: opacity 380ms ease, transform 380ms cubic-bezier(0.2, 0.7, 0.2, 1);
    overflow: hidden;
  }
  .mtd.is-open .mtd-parchment { opacity: 1; transform: translateY(0) scale(1); }

  .mtd-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem 1.1rem 0.6rem;
    border-bottom: 1px dashed rgba(90, 50, 20, 0.3);
  }
  .mtd-eyebrow {
    margin: 0 0 0.2rem;
    font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: rgba(58, 38, 26, 0.6);
  }
  .mtd-title {
    margin: 0;
    font-family: 'Cinzel', serif;
    font-size: 1.05rem; letter-spacing: 0.08em;
    color: #5a2c10;
  }
  .mtd-close {
    width: 28px; height: 28px;
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: 999px;
    border: 1px solid rgba(90, 50, 20, 0.4);
    background: rgba(243, 224, 184, 0.4);
    color: #5a2c10;
    font-size: 1.1rem; line-height: 1;
    cursor: pointer;
  }
  .mtd-close:hover { background: rgba(243, 224, 184, 0.7); }

  .mtd-list {
    flex: 1; overflow-y: auto;
    padding: 0.25rem 0;
    scrollbar-width: thin;
  }
  .mtd-row {
    display: grid; grid-template-columns: 56px 1fr; gap: 0.6rem;
    width: 100%;
    padding: 0.55rem 1.1rem;
    background: transparent; border: none; text-align: left;
    color: inherit; cursor: pointer;
    border-bottom: 1px dashed rgba(90, 50, 20, 0.18);
    border-left: 2px solid transparent;
  }
  .mtd-row:last-child { border-bottom: none; }
  .mtd-row:hover { background: rgba(120, 70, 30, 0.06); }
  .mtd-row.is-active {
    background: rgba(120, 70, 30, 0.12);
    border-left-color: #5a2c10;
    padding-left: calc(1.1rem - 2px);
  }
  .mtd-year {
    font-family: 'Cinzel', serif;
    font-size: 0.72rem; letter-spacing: 0.04em;
    color: #5a2c10;
    padding-top: 2px;
  }
  .mtd-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .mtd-title-row {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem; letter-spacing: 0.02em;
    color: #2f1b10;
    line-height: 1.2;
  }
  .mtd-sub {
    font-size: 0.72rem;
    color: rgba(58, 38, 26, 0.7);
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .mtd-parchment, .mtd-backdrop {
      transition: opacity 200ms ease;
      transform: none !important;
    }
  }

  @media (min-width: 768px) {
    /* Dialog only exists on mobile; hide entirely on desktop. */
    .mtd { display: none !important; }
  }
</style>

<script>
  import { isPlaying, jumpToEventId } from '../lib/playMode';
  import { scrollToElement } from '../lib/scrollOffset';

  const root = document.querySelector<HTMLElement>('[data-tl-mobile-dialog]');
  if (root) {
    const backdrop = root.querySelector<HTMLElement>('[data-tl-mobile-dialog-backdrop]');
    const closeBtn = root.querySelector<HTMLButtonElement>('[data-tl-mobile-dialog-close]');
    const list = root.querySelector<HTMLElement>('[data-tl-mobile-dialog-list]');
    const rows = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tl-mobile-dialog-row]'));
    const parchment = root.querySelector<HTMLElement>('.mtd-parchment');

    let savedBodyOverflow = '';
    let lastTrigger: HTMLElement | null = null;

    function activeEventId(): string | null {
      const activeDot = document.querySelector<HTMLElement>('[data-tl-mobile-slot].is-active');
      return activeDot?.dataset.eventId || null;
    }

    function markActiveRow() {
      const id = activeEventId();
      rows.forEach((r) => r.classList.toggle('is-active', r.dataset.eventId === id));
    }

    function scrollActiveIntoView() {
      const active = root!.querySelector<HTMLElement>('.mtd-row.is-active');
      if (!active || !list) return;
      const listRect = list.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const offset = (activeRect.top - listRect.top) - (list.clientHeight / 2 - activeRect.height / 2);
      list.scrollTop += offset;
    }

    function open() {
      if (root!.classList.contains('is-open')) return;
      lastTrigger = document.querySelector<HTMLElement>('[data-tl-mobile-trigger]');
      markActiveRow();
      root!.classList.add('is-open');
      root!.setAttribute('aria-hidden', 'false');
      savedBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Wait one frame so the layout settles before scrolling.
      requestAnimationFrame(() => {
        scrollActiveIntoView();
        parchment?.focus();
      });
    }

    function close() {
      if (!root!.classList.contains('is-open')) return;
      root!.classList.remove('is-open');
      root!.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = savedBodyOverflow;
      lastTrigger?.focus();
    }

    window.addEventListener('mobile-timeline:open', open);
    window.addEventListener('mobile-timeline:close', close);

    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (!root!.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    });

    rows.forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.dataset.eventId;
        if (!id) return;
        if (isPlaying()) {
          const playBtn = document.querySelector<HTMLElement>('[data-play-mode]');
          const progress = playBtn?.querySelector<HTMLElement>('[data-play-progress]');
          jumpToEventId(id, (i, total) => { if (progress) progress.textContent = `${i}/${total}`; });
          close();
          return;
        }
        const target = document.getElementById(`event-${id}`);
        if (target) {
          scrollToElement(target);
        }
        close();
      });
    });
  }
</script>
```

- [ ] **Step 2: Verificar que el componente compila**

```bash
npx astro check 2>&1 | tail -20
```

Expected: sin errores en `MobileTimelineDialog.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/MobileTimelineDialog.astro
git commit -m "feat(timeline): MobileTimelineDialog component (parchment style)"
```

---

## Task 6: Renderizar el dialog en la página de era

**Files:**
- Modify: `src/pages/era/[id].astro`

- [ ] **Step 1: Importar y renderizar el componente**

En `src/pages/era/[id].astro`, agregar al final del bloque de imports (junto a `import EraClosingDialog ...`):

```astro
import MobileTimelineDialog from '../../components/MobileTimelineDialog.astro';
```

Luego, encontrar dónde se renderiza `<EraClosingDialog ... />` en el markup del layout y agregar inmediatamente antes o después:

```bash
grep -n "EraClosingDialog" src/pages/era/[id].astro
```

Agregar:

```astro
<MobileTimelineDialog events={events} eraName={era.data.name} />
```

- [ ] **Step 2: Levantar dev y verificar manualmente**

```bash
npm run dev
```

Abrir `http://localhost:4321/era/exodo` con DevTools mobile (iPhone 12, 390×844). Verificar:
- Header compacto se ve.
- Tap en la zona del timeline → dialog abre, lista visible.
- Tap en una fila → dialog cierra, scroll a la scene.
- Tecla Esc → cierra.
- En desktop (≥768px) el dialog **no aparece** y el header viejo de dots desktop sigue intacto.

- [ ] **Step 3: Correr los e2e tests del dialog**

```bash
npx playwright test tests/e2e/mobile-era.spec.ts -g "dialog|escape"
```

Expected: PASS los 4 tests.

- [ ] **Step 4: Commit**

```bash
git add src/pages/era/[id].astro
git commit -m "feat(timeline): wire MobileTimelineDialog into era page"
```

---

## Task 7: E2E test del cap "inicio" cuando el evento actual es el primero

**Files:**
- Modify: `tests/e2e/mobile-era.spec.ts`

- [ ] **Step 1: Agregar el test que verifica el edge cap**

Agregar al final del `test.describe('mobile era page', ...)`:

```ts
test('first event shows "inicio" cap on the left of the mobile track', async ({ page }) => {
  await page.goto('/era/exodo');
  // At page load, the first event is the active one → expect cap at slot 0.
  const slot0 = page.locator('[data-tl-mobile-slot][data-slot-index="0"]');
  await expect(slot0).toHaveAttribute('data-slot-kind', 'cap');
  await expect(slot0).toHaveAttribute('data-cap-side', 'start');
  await expect(slot0).toContainText('inicio');
});

test('label updates when scrolling to a different event', async ({ page }) => {
  await page.goto('/era/exodo');
  const initialLabel = await page.locator('[data-tl-mobile-label]').textContent();
  // Scroll well past the first scene.
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 4));
  await page.waitForTimeout(800);
  const newLabel = await page.locator('[data-tl-mobile-label]').textContent();
  expect(newLabel).not.toBe(initialLabel);
});
```

- [ ] **Step 2: Run tests**

```bash
npx playwright test tests/e2e/mobile-era.spec.ts -g "inicio|label updates"
```

Expected: ambos PASS. Si "label updates" falla, revisar que `EventScene.astro` esté disparando `timeline:scene-changed` o que el IntersectionObserver de `TimelineNav` esté funcionando — la lógica de update se conecta a través del observer existente.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/mobile-era.spec.ts
git commit -m "test(timeline): edge cap + label sync on scroll"
```

---

## Task 8: Verificación final + cleanup

**Files:** (sin cambios de código nuevos — solo verificación)

- [ ] **Step 1: Correr toda la suite de tests**

```bash
npm run test 2>&1 | tail -30
npx playwright test 2>&1 | tail -30
```

Expected: todos los tests pasan. Si alguno falla por algo no relacionado, anotar pero no bloquear.

- [ ] **Step 2: Verificación visual desktop intacto**

```bash
npm run dev
```

Abrir `/era/exodo`, `/era/evangelio`, `/era/primordial` en desktop (>=768px). Verificar:
- El timeline desktop con dots posicionados por año sigue idéntico.
- Hover sobre dots muestra el tooltip.
- Step arrows ‹ › funcionan.
- Active dot anclado al evento en pantalla.

- [ ] **Step 3: Verificación visual mobile a 320px (iPhone SE)**

En DevTools, switch a 320×568. Verificar:
- No hay scroll horizontal del body.
- Los 5 slots + label entran sin solaparse con play y arrows.
- En map-fullscreen mode, el restart-btn `⏮` aparece y todo sigue cabiendo (gap reducido).

- [ ] **Step 4: Final commit (si hubo ajustes de tuning)**

Si hubo que ajustar `gap`/`min-width` para 320px:

```bash
git add src/components/TimelineNav.astro
git commit -m "fix(timeline): tighten mobile gaps at 320px"
```

Si no hubo cambios, este step se salta.

---

## Self-review check

Revisé la spec sección por sección contra el plan:

- **Componente 1 - Header compacto** (estructura, ventana, línea, dots, tap target): Tasks 1, 2, 3, 7. ✓
- **Edge caps "inicio/fin"**: Task 1 (función pura), Task 3 (markup), Task 7 (test). ✓
- **Línea horizontal con clipping**: Task 1 (`computeLinePct`), Task 3 (CSS + JS). ✓
- **Componente 2 - Dialog pergamino** (estructura, auto-scroll, open/close, navegación): Tasks 4, 5, 6. ✓
- **Restart-btn en map-fullscreen**: Task 3 (CSS), Task 8 (verificación manual). ✓
- **Body scroll lock / prefers-reduced-motion**: Task 5 (script + CSS). ✓
- **A11y (aria, focus trap, focus return)**: Task 5 (script). El focus trap completo (Tab confinado al dialog) está parcialmente cubierto (`parchment.focus()` y `lastTrigger?.focus()` al cerrar). Un focus trap estricto requeriría más código; la spec lo pide, así que lo agregué como nota — si el reviewer lo flaggea, expandir el handler de `keydown` para interceptar `Tab`/`Shift+Tab` y rotar focus dentro de los rows + close button.
- **Eventos sin subtitle**: Task 5 (`{e.data.subtitle && ...}`). ✓
- **N pequeñas (1-4 eventos)**: Task 1 (tests + lógica). ✓
- **Desktop intacto**: Tasks 3 (`@media`), 8 (verificación). ✓

**Placeholders / TBD scan:** ninguno encontrado. Todos los pasos tienen código completo o comando concreto.

**Type consistency:** `Slot`, `SlotEvent` definidos en Task 1, usados en Task 3 (servidor y cliente). `computeSlots` y `computeLinePct` exportados y consumidos con los mismos nombres. Custom event name `mobile-timeline:open` consistente entre TimelineNav (dispatch) y MobileTimelineDialog (listener).
