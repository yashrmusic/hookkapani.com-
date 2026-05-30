import { defineConfig, devices } from '@playwright/test';

const includeWebkit = process.env.PLAYWRIGHT_ENABLE_WEBKIT === '1';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'pnpm exec next dev --webpack',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
    ...(includeWebkit ? [{ name: 'mobile-safari', use: { ...devices['iPhone 13'] } }] : []),
  ],
});
