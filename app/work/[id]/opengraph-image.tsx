import { ImageResponse } from 'next/og';
import { getArtworkById } from '@/data/artworks';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OpengraphImage({ params }: Props) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  const title = artwork?.title ?? 'Hookkapaani Studio';
  const subtitle = artwork
    ? `${artwork.category.toUpperCase()} • ${artwork.year}`
    : 'Kinetic Sculpture Studio';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #141414 60%, #1f1f1f 100%)',
          color: '#fafafa',
          padding: '56px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.75 }}>HOOKKAPAANI</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: '80%' }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 28, opacity: 0.85 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 24, color: '#ff9500' }}>hookkapaani.com</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
