'use client';

type AnalyticsPayload = Record<string, unknown>;

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  const body = JSON.stringify({
    type: 'event',
    event,
    ...payload,
    ts: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics', blob);
    return;
  }

  void fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  });
}
