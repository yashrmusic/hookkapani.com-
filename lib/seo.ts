import type { Metadata } from 'next';
import type { Artwork } from '@/data/artworks';

export const SITE_URL = 'https://hookkapani.com';
export const SITE_NAME = 'Hookkapani Studio';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
/**
 * The single official spelling is "Hookkapani", matching the domain,
 * Instagram handle, email and press coverage.
 */
export const SITE_ALTERNATE_NAMES = ['Hookkapani', 'Hookkapani Studio'];

/** Homepage title and description: what the studio makes, for whom, and where. */
export const HOME_TITLE = 'Hookkapani | Kinetic Sculpture & Art Installations, New Delhi';
export const HOME_DESCRIPTION =
  'Kinetic sculptures and art installations for restaurants, hotels, malls and public spaces, designed, engineered, built and installed by one New Delhi studio.';

/** Fallback share image: a landscape work photo that exists in public/images. */
export const DEFAULT_OG_IMAGE = {
  url: '/images/new-work-36.jpg',
  width: 1536,
  height: 1024,
  alt: 'Fish in Spectrum — resin installation by Hookkapani Studio',
};

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '' : path}`;
}

/** Trim to a meta-description length on a word boundary. */
export function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—–-]+$/, '')}…`;
}

interface PageMetaInput {
  /** Page title without the brand suffix — the root layout template appends it. */
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  /** Leave unset on routes with an opengraph-image file; the file convention supplies it. */
  image?: { url: string; width?: number; height?: number; alt: string } | null;
}

/**
 * Per-route metadata. Next merges metadata shallowly, so a page that sets
 * `openGraph` replaces the layout's whole object — every field is set here.
 */
export function pageMetadata({ title, description, path, ogType = 'website', image = DEFAULT_OG_IMAGE }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const desc = truncate(description);
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: 'en_IN',
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

const CATEGORY_LABEL: Record<Artwork['category'], string> = {
  sculpture: 'sculpture',
  installation: 'installation',
  kinetic: 'kinetic sculpture',
};

export function categoryLabel(artwork: Artwork): string {
  return CATEGORY_LABEL[artwork.category];
}

/** Descriptive alt text built only from data: "Medusa — kinetic sculpture in resin and mechanism". */
export function artworkAlt(artwork: Artwork): string {
  const mats = artwork.materials.map((m) => m.toLowerCase());
  const matText = mats.length > 1 ? `${mats.slice(0, -1).join(', ')} and ${mats[mats.length - 1]}` : mats[0];
  return matText ? `${artwork.title} — ${categoryLabel(artwork)} in ${matText}` : `${artwork.title} — ${categoryLabel(artwork)}`;
}

/** Serialise JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
