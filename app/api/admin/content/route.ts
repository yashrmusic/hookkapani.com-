import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getCmsContent } from '@/lib/cms-content';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'cms-content.json');

export async function GET() {
  const content = await getCmsContent();
  return NextResponse.json(content, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const token = request.headers.get('x-admin-token');
  const expectedToken = process.env.CMS_ADMIN_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  try {
    await writeFile(CONTENT_PATH, JSON.stringify(payload, null, 2), 'utf8');
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
