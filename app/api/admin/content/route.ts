import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getCmsContent, validateCmsContent } from '@/lib/cms-content';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'cms-content.json');
const MAX_BODY_BYTES = 50_000;

function isPayloadTooLarge(request: NextRequest) {
  const contentLength = request.headers.get('content-length');
  if (!contentLength) return false;
  const parsed = Number(contentLength);
  return Number.isFinite(parsed) && parsed > MAX_BODY_BYTES;
}

function secureCompare(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  if (expectedBuffer.length !== actualBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, actualBuffer);
}

function isAuthorized(request: NextRequest) {
  const expectedToken = process.env.CMS_ADMIN_TOKEN?.trim();
  const providedToken = request.headers.get('x-admin-token')?.trim() || '';
  if (!expectedToken || !providedToken) return false;
  return secureCompare(expectedToken, providedToken);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const content = await getCmsContent();
  return NextResponse.json(content, { status: 200 });
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  if (isPayloadTooLarge(request)) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const validated = validateCmsContent(payload);
  if (!validated) {
    return NextResponse.json({ error: 'Invalid CMS content schema' }, { status: 400 });
  }

  try {
    await writeFile(CONTENT_PATH, JSON.stringify(validated, null, 2), 'utf8');
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: 'Could not persist file in this environment. Use CMS_CONTENT_URL for hosted JSON content.',
      },
      { status: 501 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
