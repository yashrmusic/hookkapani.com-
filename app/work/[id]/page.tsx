import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { artworks, getArtworkById } from '@/data/artworks';
import { ArtworkDetail } from './artwork-detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    return { title: 'Artwork Not Found | Hookkapaani' };
  }

  const url = `https://hookkapaani.com/work/${artwork.id}`;
  const ogImageUrl = `${url}/opengraph-image`;

  return {
    title: `${artwork.title} | Hookkapaani Studio`,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} - Hookkapaani Studio`,
      description: artwork.description,
      url,
      siteName: 'Hookkapaani Studio',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: artwork.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} - Hookkapaani`,
      description: artwork.description,
      images: [ogImageUrl],
    },
  };
}

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  const currentIndex = artworks.findIndex((a) => a.id === id);
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  return (
    <ArtworkDetail
      artwork={artwork}
      prevArtwork={prevArtwork}
      nextArtwork={nextArtwork}
    />
  );
}
