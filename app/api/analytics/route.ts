import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const webhook = process.env.ANALYTICS_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Intentionally swallow telemetry forwarding failures.
    }
  } else {
    console.info('[analytics]', payload);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
