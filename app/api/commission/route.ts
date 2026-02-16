import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    // ... webhook logic ...
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
    } catch (e) {
      console.error('Webhook delivery failed', e);
    }
  }

  // Send Email via Nodemailer
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE) || false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || '"Hookkapaani Website" <no-reply@hookkapani.com>',
        to: 'mandeep@hookkapani.com',
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
    } catch (error) {
      console.error('Email sending failed:', error);
      // Don't fail the request if email fails, just log it.
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
