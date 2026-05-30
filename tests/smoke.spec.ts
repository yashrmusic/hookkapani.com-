import { test, expect } from '@playwright/test';

test('home renders and navigation links are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Works' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Commission' }).first()).toBeVisible();
  await expect(page.getByText('Selected Works')).toBeVisible();
});

test('work grid exposes artwork detail links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#work').getByRole('link', { name: /View Full Detail/ }).first()).toBeVisible();
});

test('work detail route renders', async ({ page }) => {
  await page.goto('/work/new-work-12');
  await expect(page.getByText('Back to Works')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('commission form submits', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#commission').scrollIntoViewIfNeeded();
  await page.fill('#name', 'Smoke Test');
  await page.fill('#email', 'smoke@example.com');
  await page.selectOption('#decisionRole', 'owner');
  await page.selectOption('#projectType', 'private-commission');
  await page.fill('#location', 'New Delhi');
  await page.fill('#dimensions', '2m x 2m');
  await page.selectOption('#budget', '400k-500k');
  await page.selectOption('#timeline', '1-3-months');
  await page.fill('#description', 'Automated smoke test submission.');
  await expect(page.locator('#name')).toHaveValue('Smoke Test');
  await expect(page.locator('#budget')).toHaveValue('400k-500k');
  await page.getByRole('button', { name: 'Send Project Brief' }).click();
  await expect(page.getByText('Project Brief Received')).toBeVisible();
});
