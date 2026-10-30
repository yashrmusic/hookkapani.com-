import { artworks } from '@/data/artworks';
import { buildSpecPdf, type PdfLine } from '@/lib/spec-pdf';
import { artworkUrl, getArtworkBySlug, sizeLabel, isMoving } from '@/lib/artwork-utils';

interface Params {
  params: Promise<{ id: string }>;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function wrap(text: string, max = 88): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > max) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  // The route parameter is now the readable slug, with the old numbered id
  // accepted as a fallback by getArtworkBySlug.
  const artwork = getArtworkBySlug(artworks, id);

  if (!artwork) {
    return new Response('Not found', { status: 404 });
  }

  const lines: PdfLine[] = [
    { text: 'HOOKKAPANI STUDIO', size: 11, bold: true, color: [0.85, 0.1, 0.12] },
    { text: 'Artwork Specification Sheet', size: 11, color: [0.4, 0.4, 0.4] },
    { text: artwork.title, size: 22, bold: true, gapBefore: 26 },
    { text: `Category: ${artwork.category}`, size: 12, gapBefore: 10 },
    { text: `Materials: ${artwork.materials.join(', ')}`, size: 12 },
    { text: `Dimensions: ${sizeLabel(artwork) || 'Custom / on request'}`, size: 12 },
    { text: `Movement: ${isMoving(artwork) ? 'Moving (kinetic)' : 'Static'}`, size: 12 },
  ];

  if (artwork.description) {
    lines.push({ text: 'About the work', size: 13, bold: true, gapBefore: 16 });
    for (const l of wrap(artwork.description)) lines.push({ text: l, size: 11.5 });
  }

  lines.push(
    { text: 'Installation notes', size: 13, bold: true, gapBefore: 16 },
    { text: '- Site and load requirements are finalised after a technical survey.', size: 11.5 },
    { text: '- Mounting and motion systems require scheduled preventive checks.', size: 11.5 },
    { text: '- Suitability for indoor or outdoor display depends on the selected material finish.', size: 11.5 },
    { text: '- Weight, power requirements and lead time are confirmed for each site on enquiry.', size: 11.5 },
    { text: 'Availability', size: 13, bold: true, gapBefore: 16 },
    { text: 'Confirmed directly with the studio on enquiry.', size: 11.5 },
    { text: 'Studio contact', size: 13, bold: true, gapBefore: 16 },
    { text: 'hookkapani.15@gmail.com  ·  +91 95400 26221  ·  New Delhi, India', size: 11.5 },
    { text: `hookkapani.com${artworkUrl(artwork)}`, size: 10, color: [0.45, 0.45, 0.45], gapBefore: 10 }
  );

  const pdf = buildSpecPdf(lines);

  return new Response(new Uint8Array(pdf), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${artwork.id}-spec-sheet.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
