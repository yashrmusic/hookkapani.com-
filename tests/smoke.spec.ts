import { test, expect } from '@playwright/test';

test('home renders and navigation links are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Works' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Commission' }).first()).toBeVisible();
  await expect(page.getByText('Selected Works')).toBeVisible();
});

test('work grid exposes artwork detail links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#work a[href^="/work/"]').first()).toBeVisible();
});

test('work detail route renders', async ({ page }) => {
  await page.goto('/work/new-work-12');
  await expect(page.getByText('Back to the Works')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('mobile menu opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible();
  await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Works' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'true');
});

test('commission form submits a complete brief', async ({ page }) => {
  await page.goto('/commission');

  // Step 1 — about you
  await page.fill('#name', 'Smoke Test');
  await page.fill('#email', 'smoke@example.com');
  await page.selectOption('#decisionRole', 'owner');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 2 — the site
  await page.selectOption('#projectType', 'private-commission');
  await page.fill('#location', 'New Delhi');
  await page.fill('#dimensions', '2m x 2m');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 3 — scope & timeline
  await page.selectOption('#timeline', '1-3-months');
  await page.selectOption('#budget', '400k-500k');
  await page.fill('#description', 'Automated smoke test submission.');

  await page.getByRole('button', { name: 'Send Project Brief' }).click();
  await expect(page.getByRole('heading', { name: /your brief has been received/i })).toBeVisible();
});
