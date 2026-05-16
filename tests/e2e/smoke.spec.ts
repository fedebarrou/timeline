import { test, expect } from '@playwright/test';

test('landing loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h1').first()).toContainText('Adán → Mahoma');
});

test('timeline page renders with map', async ({ page }) => {
  await page.goto('/timeline');
  await expect(page.locator('[data-map-root]')).toBeVisible();
  await expect(page.locator('[data-event-scene]').first()).toBeVisible();
});

test('character page shows mentions', async ({ page }) => {
  await page.goto('/personajes/noe');
  await expect(page.locator('main h1').first()).toContainText('Noé');
  await expect(page.locator('text=Menciones en las escrituras')).toBeVisible();
});

test('comparative page lists divergent events', async ({ page }) => {
  await page.goto('/comparativa');
  await expect(page.locator('main h1').first()).toContainText('Comparativa');
  await expect(page.locator('table')).toBeVisible();
});
