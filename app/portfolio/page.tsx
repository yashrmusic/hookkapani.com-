import { Metadata } from 'next';
import PortfolioContent from './portfolio-content';
import { artworks } from '@/data/artworks';
import { ORGANIZATION_ID, WEBSITE_ID, absoluteUrl, jsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Portfolio — All Works',
    description: `The full Hookkapaani catalogue: all ${artworks.length} sculptures, kinetic works and installations in steel, resin and mixed media, with materials and a PDF catalogue.`,
    path: '/portfolio',
});

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: absoluteUrl('/portfolio'),
    name: 'Hookkapaani Studio portfolio',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntity: {
        '@type': 'ItemList',
        numberOfItems: artworks.length,
        itemListElement: artworks.map((artwork, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/work/${artwork.id}`),
            name: artwork.title,
        })),
    },
};

export default function PortfolioPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
            <PortfolioContent />
        </>
    );
}
