import { NextResponse } from 'next/server';

function parseBooleanEnv(value: string | undefined) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

export async function GET() {
  const webhookConfigured = Boolean(process.env.COMMISSION_WEBHOOK_URL?.trim());
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_PORT
  );

  const smtpSecure = parseBooleanEnv(process.env.SMTP_SECURE);
  const deliveryConfigured = webhookConfigured || smtpConfigured;

  return NextResponse.json(
    {
      ok: deliveryConfigured,
      service: 'commission-form',
      deliveryConfigured,
      channels: {
        webhook: webhookConfigured,
        smtp: smtpConfigured,
      },
      smtp: smtpConfigured
        ? {
            port: Number(process.env.SMTP_PORT),
            secure: smtpSecure,
          }
        : null,
      timestamp: new Date().toISOString(),
    },
    {
      status: deliveryConfigured ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
