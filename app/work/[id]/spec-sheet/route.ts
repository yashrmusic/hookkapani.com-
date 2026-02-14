import { getArtworkById } from '@/data/artworks';

interface Params {
  params: Promise<{ id: string }>;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    return new Response('Not found', { status: 404 });
  }

  const lines = [
    'Hookkapaani Studio',
    'Artwork Specification Sheet',
    '',
    `Title: ${artwork.title}`,
    `Year: ${artwork.year}`,
    `Category: ${artwork.category}`,
    `Materials: ${artwork.materials.join(', ')}`,
    `Dimensions: ${artwork.dimensions || 'Custom / On request'}`,
    '',
    'Description:',
    artwork.longDescription || artwork.description,
    '',
    'Installation Notes:',
    '- Site and load requirements to be finalized after technical survey.',
    '- Mounting and motion systems require scheduled preventive checks.',
    '- Indoor / outdoor suitability depends on selected material finish.',
    '',
    'Studio Contact:',
    'studio@hookkapaani.com',
    'New Delhi, India',
  ];

  const content = `${lines.join('\n')}\n`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${artwork.id}-spec-sheet.txt"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
