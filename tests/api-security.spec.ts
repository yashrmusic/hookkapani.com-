import { expect, test } from '@playwright/test';

test('commission endpoint rejects invalid content-type', async ({ request }) => {
  const response = await request.post('/api/commission', {
    headers: { 'Content-Type': 'text/plain' },
    data: 'hello',
  });

  expect(response.status()).toBe(415);
});

test('commission endpoint validates required fields', async ({ request }) => {
  const response = await request.post('/api/commission', {
    headers: { 'Content-Type': 'application/json' },
    data: { name: 'Only Name' },
  });

  expect(response.status()).toBe(400);
});

test('commission endpoint blocks oversized payloads', async ({ request }) => {
  const response = await request.post('/api/commission', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      name: 'Load Test',
      email: 'load@test.com',
      projectType: 'private-commission',
      budget: '400k-500k',
      timeline: '1-3-months',
      description: 'x'.repeat(25000),
    },
  });

  expect(response.status()).toBe(413);
});

test('analytics endpoint validates payload shape', async ({ request }) => {
  const invalidResponse = await request.post('/api/analytics', {
    headers: { 'Content-Type': 'application/json' },
    data: ['invalid'],
  });
  expect(invalidResponse.status()).toBe(400);

  const validResponse = await request.post('/api/analytics', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      type: 'event',
      event: 'smoke_test',
      pathname: '/',
      value: 1,
    },
  });
  expect(validResponse.ok()).toBeTruthy();
});

test('error endpoint blocks oversized payloads', async ({ request }) => {
  const response = await request.post('/api/errors', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      type: 'error',
      message: 'x'.repeat(13000),
    },
  });

  expect(response.status()).toBe(413);
});

test('admin content API requires auth', async ({ request }) => {
  const getResponse = await request.get('/api/admin/content');
  expect(getResponse.status()).toBe(401);

  const putResponse = await request.put('/api/admin/content', {
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  expect(putResponse.status()).toBe(401);
});

test('commission health endpoint returns channel configuration', async ({ request }) => {
  const response = await request.get('/api/commission/health');
  expect([200, 503]).toContain(response.status());
  const json = await response.json();
  expect(typeof json.channels?.webhook).toBe('boolean');
  expect(typeof json.channels?.backupWebhook).toBe('boolean');
  expect(typeof json.channels?.smtp).toBe('boolean');
});
