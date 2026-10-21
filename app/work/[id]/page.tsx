import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { artworks, getArtworkById } from '@/data/artworks';
import type { Artwork } from '@/data/artworks';
import { displayTags, isMoving, relatedWorks } from '@/lib/artwork-utils';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl, artworkAlt, categoryLabel, jsonLd, pageMetadata } from '@/lib/seo';
import { ArtworkDetail } from './artwork-detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }));
}

function artworkDescription(artwork: Artwork): string {
  if (artwork.description) return `${artwork.title}: ${artwork.description}`;
  const size = artwork.dimensions ? `, ${artwork.dimensions}` : '';
  // Skip when the category or materials already say it moves.
  const motionImplied = artwork.category === 'kinetic' || artwork.materials.some((m) => /mechanism/i.test(m));
  const motion = isMoving(artwork) && !motionImplied ? ', moving' : '';
  return `${artworkAlt(artwork)}${size}${motion}. By Hookkapaani Studio, New Delhi — with scale, specification sheet and enquiry details.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    return { title: 'Artwork Not Found', robots: { index: false } };
  }

  // Share image comes from the sibling opengraph-image.tsx file convention.
  return pageMetadata({
    title: `${artwork.title} — ${categoryLabel(artwork).replace(/^./, (c) => c.toUpperCase())}`,
    description: artworkDescription(artwork),
    path: `/work/${artwork.id}`,
    ogType: 'article',
    image: null,
  });
}

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  const related = relatedWorks(artworks, artwork, 3);
  const url = absoluteUrl(`/work/${artwork.id}`);
  const tags = displayTags(artwork);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${url}#artwork`,
    url,
    name: artwork.title,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(artwork.imageUrl),
      contentUrl: absoluteUrl(artwork.imageUrl),
      name: `${artwork.title} — ${categoryLabel(artwork)} by Hookkapaani Studio`,
    },
    description: artworkDescription(artwork),
    artform: categoryLabel(artwork),
    material: artwork.materials,
    artMedium: artwork.materials.join(', '),
    ...(artwork.dimensions ? { size: artwork.dimensions } : {}),
    ...(tags.length ? { keywords: tags.join(', ') } : {}),
    creator: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: url,
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Works', item: `${SITE_URL}/#work` },
      { '@type': 'ListItem', position: 3, name: artwork.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbData) }} />
      <ArtworkDetail artwork={artwork} related={related} />
    </>
  );
}
