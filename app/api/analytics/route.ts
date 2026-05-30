import { NextRequest, NextResponse } from 'next/server';

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const RATE_LIMIT_MAX_ENTRIES = 4000;
const rateLimitStore = new Map<string, { count: number; windowStart: number; lastSeen: number }>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function isPayloadTooLarge(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (!contentLength) return false;
  const parsed = Number(contentLength);
  return Number.isFinite(parsed) && parsed > MAX_BODY_BYTES;
}

function sanitizeSingleLine(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized) return undefined;
  return normalized.slice(0, maxLength);
}

function pruneRateLimitStore(now: number) {
  for (const [key, value] of rateLimitStore) {
    if (now - value.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) return;
  const byAge = [...rateLimitStore.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen);
  const overflow = rateLimitStore.size - RATE_LIMIT_MAX_ENTRIES;
  for (let i = 0; i < overflow; i += 1) {
    const oldestKey = byAge[i]?.[0];
    if (oldestKey) rateLimitStore.delete(oldestKey);
  }
}

function consumeRateLimit(ip: string) {
  const now = Date.now();
  pruneRateLimitStore(now);
  const current = rateLimitStore.get(ip);
  if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now, lastSeen: now });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    current.lastSeen = now;
    rateLimitStore.set(ip, current);
    return true;
  }
  current.count += 1;
  current.lastSeen = now;
  rateLimitStore.set(ip, current);
  return false;
}

function sanitizePayload(raw: Record<string, unknown>) {
  const type = sanitizeSingleLine(raw.type, 32);
  const allowedType = type && ['page_view', 'web_vital', 'event'].includes(type) ? type : 'event';

  const payload: Record<string, unknown> = {
    type: allowedType,
    pathname: sanitizeSingleLine(raw.pathname, 256),
    event: sanitizeSingleLine(raw.event, 80),
    metric: sanitizeSingleLine(raw.metric, 20),
    userAgent: sanitizeSingleLine(raw.userAgent, 280),
    viewport: sanitizeSingleLine(raw.viewport, 40),
    sessionId: sanitizeSingleLine(raw.sessionId, 80),
    ts: sanitizeSingleLine(raw.ts, 64),
  };

  if (typeof raw.value === 'number' && Number.isFinite(raw.value)) {
    payload.value = raw.value;
  }

  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
}

async function forwardPayload(webhook: string, payload: Record<string, unknown>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  if (isPayloadTooLarge(request)) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (consumeRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let rawPayload: Record<string, unknown>;

  try {
    rawPayload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (!rawPayload || typeof rawPayload !== 'object' || Array.isArray(rawPayload)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const payload = sanitizePayload(rawPayload);
  const webhook = process.env.ANALYTICS_WEBHOOK_URL;

  if (webhook) {
    try {
      await forwardPayload(webhook, payload);
    } catch (error) {
      console.warn('Analytics forwarding failed:', error);
    }
  } else {
    console.info('[analytics]', payload);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
