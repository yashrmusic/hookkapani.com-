import { defineConfig, devices } from '@playwright/test';

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
        command: 'pnpm dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
});
