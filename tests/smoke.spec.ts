import { test, expect } from '@playwright/test';

test('home renders and navigation links are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Works' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Commission' }).first()).toBeVisible();
  await expect(page.getByText('Selected Works')).toBeVisible();
});

test('lightbox opens from work grid', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#work .cursor-pointer.group').first();
  await card.click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
});

test('work detail route renders', async ({ page }) => {
  await page.goto('/work/new-work-45');
  await expect(page.getByText('Back to Works')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('commission form submits', async ({ page }) => {
  await page.goto('/');
  await page.locator('#commission').scrollIntoViewIfNeeded();
  await page.fill('#name', 'Smoke Test');
  await page.fill('#email', 'smoke@example.com');
  await page.selectOption('#projectType', 'sculpture');
  await page.selectOption('#budget', 'under-50k');
  await page.selectOption('#timeline', '1-3-months');
  await page.fill('#description', 'Automated smoke test submission.');
  await page.getByRole('button', { name: 'Submit Inquiry' }).click();
  await expect(page.getByText('Inquiry Received')).toBeVisible();
});
