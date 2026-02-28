

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

function parseBooleanEnv(value: string | undefined) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

function getEnv(name: string) {
  return process.env[name]?.trim();
}

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

  const webhookUrl = getEnv('COMMISSION_WEBHOOK_URL');
  const smtpHost = getEnv('SMTP_HOST');
  const smtpPort = Number(getEnv('SMTP_PORT')) || 587;
  const smtpSecure = parseBooleanEnv(getEnv('SMTP_SECURE'));
  const smtpUser = getEnv('SMTP_USER');
  const smtpPass = getEnv('SMTP_PASS');
  const smtpFrom = getEnv('SMTP_FROM_EMAIL');
  const smtpConfigured = Boolean(smtpHost && smtpUser && smtpPass);
  const hasDeliveryChannel = Boolean(webhookUrl) || smtpConfigured;
  const recipientEmail = getEnv('COMMISSION_TO_EMAIL') || 'hookkapani.15@gmail.com';
  let delivered = false;

  if (!hasDeliveryChannel) {
    return NextResponse.json(
      { error: 'Inquiry delivery is not configured. Please contact the studio directly at hookkapani.15@gmail.com.' },
      { status: 503 }
    );
  }

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
        throw new Error(`Webhook responded with status ${response.status}`);
      }
      delivered = true;
    } catch (e) {
      console.error('Webhook delivery failed', e);
    }
  }

  // Send Email via Nodemailer
  if (smtpConfigured) {
    try {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: smtpFrom || '"Hookkapaani Website" <no-reply@hookkapani.com>',
        to: recipientEmail,
        replyTo: payload.email,
        subject: `New Commission Inquiry: ${payload.name} - ${payload.projectType}`,
        text: `
New Commission Inquiry Received

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
${payload.description}
        `,
        html: `
<h2>New Commission Inquiry Received</h2>
<p><strong>Name:</strong> ${payload.name}</p>
<p><strong>Email:</strong> ${payload.email}</p>
<p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
<p><strong>Company:</strong> ${payload.companyName || 'N/A'}</p>
<p><strong>Role:</strong> ${payload.decisionRole || 'N/A'}</p>
<hr />
<p><strong>Project Type:</strong> ${payload.projectType}</p>
<p><strong>Location:</strong> ${payload.location || 'N/A'}</p>
<p><strong>Dimensions:</strong> ${payload.dimensions || 'N/A'}</p>
<p><strong>Budget:</strong> ${payload.budget}</p>
<p><strong>Timeline:</strong> ${payload.timeline}</p>
<hr />
<h3>Description:</h3>
<p>${payload.description.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      delivered = true;
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  if (!delivered) {
    return NextResponse.json(
      { error: 'We could not deliver your brief right now. Please try again in a minute.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
