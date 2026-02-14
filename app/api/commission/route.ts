import { NextRequest, NextResponse } from 'next/server';

type CommissionPayload = {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  decisionRole?: string;
  projectType: string;
  location?: string;
  dimensions?: string;
  budget: string;
  timeline: string;
  description: string;
  website?: string;
};

const REQUIRED_FIELDS: Array<keyof CommissionPayload> = [
  'name',
  'email',
  'projectType',
  'budget',
  'timeline',
  'description',
];

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

function hasValidLengths(payload: CommissionPayload) {
  return (
    payload.name.length <= 120 &&
    payload.email.length <= 160 &&
    (payload.phone?.length ?? 0) <= 40 &&
    (payload.companyName?.length ?? 0) <= 160 &&
    (payload.decisionRole?.length ?? 0) <= 80 &&
    payload.projectType.length <= 60 &&
    (payload.location?.length ?? 0) <= 180 &&
    (payload.dimensions?.length ?? 0) <= 180 &&
    payload.budget.length <= 60 &&
    payload.timeline.length <= 60 &&
    payload.description.length <= 4000
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let payload: CommissionPayload;

  try {
    payload = (await request.json()) as CommissionPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (payload.website && payload.website.trim().length > 0) {
    // Honeypot field filled: likely bot.
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const missingField = REQUIRED_FIELDS.find((field) => !payload[field]?.trim());
  if (missingField) {
    return NextResponse.json({ error: `Missing required field: ${missingField}` }, { status: 400 });
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (!hasValidLengths(payload)) {
    return NextResponse.json({ error: 'Field length exceeds allowed limits.' }, { status: 400 });
  }

  const webhookUrl = process.env.COMMISSION_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'commission_inquiry',
          createdAt: new Date().toISOString(),
          ip,
          data: {
            name: payload.name,
            email: payload.email,
            projectType: payload.projectType,
            phone: payload.phone || '',
            companyName: payload.companyName || '',
            decisionRole: payload.decisionRole || '',
            location: payload.location || '',
            dimensions: payload.dimensions || '',
            budget: payload.budget,
            timeline: payload.timeline,
            description: payload.description,
          },
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        return NextResponse.json({ error: 'Webhook delivery failed.' }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ error: 'Webhook delivery failed.' }, { status: 502 });
    }
  } else {
    console.info('[commission] inquiry received', {
      email: payload.email,
      projectType: payload.projectType,
      phone: payload.phone || '',
      companyName: payload.companyName || '',
      budget: payload.budget,
      timeline: payload.timeline,
      ip,
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
