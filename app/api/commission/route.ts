
import { createHash } from 'node:crypto';
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

const ALLOWED_DECISION_ROLES = new Set(['owner', 'curator', 'designer', 'procurement', 'other']);
const ALLOWED_PROJECT_TYPES = new Set([
  'private-commission',
  'public-installation',
  'gallery-exhibition',
  'hospitality',
  'contact',
]);
const ALLOWED_BUDGETS = new Set(['400k-500k', '500k-2m', '2m-plus', 'not-specified']);
const ALLOWED_TIMELINES = new Set(['1-3-months', '3-6-months', '6-12-months', '12-plus-months', 'not-specified']);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_MAX_ENTRIES = 5000;
const MAX_BODY_BYTES = 24_000;
const RATE_LIMIT_ERROR = 'Too many requests. Please try again later.';

const rateLimitStore = new Map<string, { count: number; windowStart: number; lastSeen: number }>();

function parseBooleanEnv(value: string | undefined) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

function getEnv(name: string) {
  return process.env[name]?.trim();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function pruneRateLimitStore(now: number) {
  for (const [key, value] of rateLimitStore) {
    if (now - value.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  const entriesByAge = [...rateLimitStore.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen);
  const overflow = rateLimitStore.size - RATE_LIMIT_MAX_ENTRIES;
  for (let i = 0; i < overflow; i += 1) {
    const victimKey = entriesByAge[i]?.[0];
    if (victimKey) {
      rateLimitStore.delete(victimKey);
    }
  }
}

function consumeRateLimit(ip: string) {
  const now = Date.now();
  pruneRateLimitStore(now);

  const current = rateLimitStore.get(ip);
  if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now, lastSeen: now });
    return { limited: false, retryAfterSeconds: 0 };
  }

  current.lastSeen = now;
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - current.windowStart)) / 1000));
    rateLimitStore.set(ip, current);
    return { limited: true, retryAfterSeconds };
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return { limited: false, retryAfterSeconds: 0 };
}

function normalizeSingleLine(value: unknown, maxLength: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized) return undefined;
  if (normalized.length > maxLength) return undefined;
  return normalized;
}

function normalizeMultiline(value: unknown, maxLength: number): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') return undefined;
  const normalized = value.replace(/\r\n/g, '\n').trim();
  if (!normalized) return undefined;
  if (normalized.length > maxLength) return undefined;
  return normalized;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeMailHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function isPayloadTooLarge(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (!contentLength) return false;

  const parsed = Number(contentLength);
  if (!Number.isFinite(parsed) || parsed <= 0) return false;
  return parsed > MAX_BODY_BYTES;
}

function normalizePayload(raw: unknown): { payload?: CommissionPayload; error?: string; honeypotFilled?: boolean } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { error: 'Invalid JSON payload.' };
  }

  const input = raw as Record<string, unknown>;
  const website = normalizeSingleLine(input.website, 180);
  if (website) {
    return { honeypotFilled: true };
  }

  const payload: CommissionPayload = {
    name: normalizeSingleLine(input.name, 120) || '',
    email: normalizeSingleLine(input.email, 160) || '',
    phone: normalizeSingleLine(input.phone, 40),
    companyName: normalizeSingleLine(input.companyName, 160),
    decisionRole: normalizeSingleLine(input.decisionRole, 80),
    projectType: normalizeSingleLine(input.projectType, 60) || '',
    location: normalizeSingleLine(input.location, 180),
    dimensions: normalizeSingleLine(input.dimensions, 180),
    budget: normalizeSingleLine(input.budget, 60) || '',
    timeline: normalizeSingleLine(input.timeline, 60) || '',
    description: normalizeMultiline(input.description, 4000) || '',
    website: undefined,
  };

  const missingField = REQUIRED_FIELDS.find((field) => !payload[field]);
  if (missingField) {
    return { error: `Missing required field: ${missingField}` };
  }

  if (!isValidEmail(payload.email)) {
    return { error: 'Invalid email address.' };
  }

  if (payload.decisionRole && !ALLOWED_DECISION_ROLES.has(payload.decisionRole)) {
    return { error: 'Invalid decisionRole value.' };
  }

  if (!ALLOWED_PROJECT_TYPES.has(payload.projectType)) {
    return { error: 'Invalid projectType value.' };
  }

  if (!ALLOWED_BUDGETS.has(payload.budget)) {
    return { error: 'Invalid budget value.' };
  }

  if (!ALLOWED_TIMELINES.has(payload.timeline)) {
    return { error: 'Invalid timeline value.' };
  }

  return { payload };
}

function commissionEventPayload(ip: string, payload: CommissionPayload) {
  return {
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
  };
}

async function postJsonWithTimeout(url: string, body: unknown, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function hashValue(value: string) {
  return createHash('sha256').update(value).digest('hex').slice(0, 14);
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 });
  }

  if (isPayloadTooLarge(request)) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }

  const ip = getClientIp(request);
  const limit = consumeRateLimit(ip);
  if (limit.limited) {
    return NextResponse.json(
      { error: RATE_LIMIT_ERROR },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const normalized = normalizePayload(rawPayload);
  if (normalized.honeypotFilled) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!normalized.payload) {
    return NextResponse.json({ error: normalized.error || 'Invalid payload.' }, { status: 400 });
  }

  const payload = normalized.payload;
  const webhookUrl = getEnv('COMMISSION_WEBHOOK_URL');
  const backupWebhookUrl = getEnv('COMMISSION_BACKUP_WEBHOOK_URL');
  const smtpHost = getEnv('SMTP_HOST');
  const smtpPort = Number(getEnv('SMTP_PORT')) || 587;
  const smtpSecure = parseBooleanEnv(getEnv('SMTP_SECURE'));
  const smtpUser = getEnv('SMTP_USER');
  const smtpPass = getEnv('SMTP_PASS');
  const smtpFrom = getEnv('SMTP_FROM_EMAIL');
  const smtpConfigured = Boolean(smtpHost && smtpUser && smtpPass);
  const recipientEmail = getEnv('COMMISSION_TO_EMAIL') || 'hookkapani.15@gmail.com';

  let delivered = false;
  const deliveryErrors: string[] = [];

  if (webhookUrl) {
    try {
      const response = await postJsonWithTimeout(webhookUrl, commissionEventPayload(ip, payload));
      if (!response.ok) {
        throw new Error(`Primary webhook responded with ${response.status}`);
      }
      delivered = true;
    } catch (error) {
      deliveryErrors.push(error instanceof Error ? error.message : 'Primary webhook failed');
    }
  }

  if (!delivered && backupWebhookUrl) {
    try {
      const response = await postJsonWithTimeout(backupWebhookUrl, commissionEventPayload(ip, payload));
      if (!response.ok) {
        throw new Error(`Backup webhook responded with ${response.status}`);
      }
      delivered = true;
    } catch (error) {
      deliveryErrors.push(error instanceof Error ? error.message : 'Backup webhook failed');
    }
  }

  if (smtpConfigured) {
    try {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const escapedDescription = escapeHtml(payload.description).replace(/\n/g, '<br>');
      const safeName = sanitizeMailHeader(payload.name);
      const safeProjectType = sanitizeMailHeader(payload.projectType);

      const mailOptions = {
        from: smtpFrom || '"Hookkapaani Website" <no-reply@hookkapani.com>',
        to: recipientEmail,
        replyTo: payload.email,
        subject: `New Commission Inquiry: ${safeName} - ${safeProjectType}`,
        text: `New Commission Inquiry Received

Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || 'N/A'}
Company: ${payload.companyName || 'N/A'}
Role: ${payload.decisionRole || 'N/A'}

Project Type: ${payload.projectType}
Location: ${payload.location || 'N/A'}
Dimensions: ${payload.dimensions || 'N/A'}
Budget: ${payload.budget}
Timeline: ${payload.timeline}

Description:
${payload.description}`,
        html: `<h2>New Commission Inquiry Received</h2>
<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(payload.phone || 'N/A')}</p>
<p><strong>Company:</strong> ${escapeHtml(payload.companyName || 'N/A')}</p>
<p><strong>Role:</strong> ${escapeHtml(payload.decisionRole || 'N/A')}</p>
<hr />
<p><strong>Project Type:</strong> ${escapeHtml(payload.projectType)}</p>
<p><strong>Location:</strong> ${escapeHtml(payload.location || 'N/A')}</p>
<p><strong>Dimensions:</strong> ${escapeHtml(payload.dimensions || 'N/A')}</p>
<p><strong>Budget:</strong> ${escapeHtml(payload.budget)}</p>
<p><strong>Timeline:</strong> ${escapeHtml(payload.timeline)}</p>
<hr />
<h3>Description:</h3>
<p>${escapedDescription}</p>`,
      };

      let lastError: unknown = null;
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
          await transporter.sendMail(mailOptions);
          delivered = true;
          lastError = null;
          break;
        } catch (error) {
          lastError = error;
          if (attempt < 3) {
            await sleep(attempt * 500);
          }
        }
      }

      if (lastError) {
        throw lastError;
      }
    } catch (error) {
      deliveryErrors.push(error instanceof Error ? error.message : 'SMTP delivery failed');
    }
  }

  if (!delivered) {
    console.error(
      'COMMISSION_DELIVERY_DELAYED',
      JSON.stringify({
        submissionId: hashValue(`${payload.email}|${payload.name}|${payload.projectType}`),
        ipHash: hashValue(ip),
        webhookConfigured: Boolean(webhookUrl),
        backupWebhookConfigured: Boolean(backupWebhookUrl),
        smtpConfigured,
        errorCount: deliveryErrors.length,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json(
      {
        ok: true,
        queued: true,
        warning: 'Your brief was received. Delivery is delayed and queued for manual review.',
      },
      { status: 202 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
