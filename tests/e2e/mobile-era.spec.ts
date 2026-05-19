import { test, expect, devices } from '@playwright/test';

const iPhone12 = devices['iPhone 12'];
const { defaultBrowserType, ...iPhone12Use } = iPhone12;

// First-visit intro modal blocks clicks; mark it as already seen before any
// navigation so the e2e suite can interact with the page directly.
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    try { localStorage.setItem('intro-modal-seen', '1'); } catch {}
  });
});

test.describe('mobile era page', () => {
  test.use(iPhone12Use);

  test('era page renders without horizontal overflow at 390px', async ({ page }) => {
    await page.goto('/era/primordial');
    await expect(page.locator('[data-map-root]')).toBeVisible();
    const bodyOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });
    expect(bodyOverflow).toBeLessThanOrEqual(1);
  });

  test('map stays visible while scrolling', async ({ page }) => {
    await page.goto('/era/primordial');
    const map = page.locator('.map-container').first();
    await expect(map).toBeVisible();
    await page.evaluate(() => window.scrollBy(0, 800));
    await expect(map).toBeVisible();
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
    const mobileCardsVisible = await page.locator('[data-mobile-char-cards]').first().isVisible();
    expect(mobileCardsVisible).toBe(false);
  });

  test('map is fixed (not sticky) at desktop', async ({ page }) => {
    await page.goto('/era/primordial');
    const position = await page.locator('.map-container').first().evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });
});
