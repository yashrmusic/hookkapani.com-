import type { Artwork } from '@/data/artworks';

/** Largest numeric dimension (in feet) from a free-form dimensions string like "9 ft", "12 x 15 ft", "2.5 ft each". */
export function parseMaxFt(dimensions?: string): number | null {
  if (!dimensions) return null;
  const nums = dimensions.match(/\d+(\.\d+)?/g);
  if (!nums) return null;
  const vals = nums.map(Number).filter((n) => n > 0 && n < 100);
  return vals.length ? Math.max(...vals) : null;
}

export function ftToM(ft: number): string {
  return (ft * 0.3048).toFixed(1);
}

/** "12 ft · 3.7 m" — original string plus metric conversion of the largest dimension. */
export function sizeLabel(artwork: Artwork): string | null {
  if (!artwork.dimensions) return null;
  const max = parseMaxFt(artwork.dimensions);
  if (!max) return artwork.dimensions;
  return `${artwork.dimensions} · ${ftToM(max)} m`;
}

export function isMoving(artwork: Artwork): boolean {
  return (
    artwork.category === 'kinetic' ||
    Boolean(artwork.videoUrl) ||
    artwork.materials.some((m) => /mechanism/i.test(m))
  );
}

export type SizeBand = 'under6' | '6to10' | 'over10';

export function sizeBand(artwork: Artwork): SizeBand | null {
  const max = parseMaxFt(artwork.dimensions);
  if (!max) return null;
  if (max < 6) return 'under6';
  if (max <= 10) return '6to10';
  return 'over10';
}

export type MaterialFamily = 'Steel & metal' | 'Resin & fibre' | 'Mixed media';

export function materialFamily(artwork: Artwork): MaterialFamily {
  const mats = artwork.materials.map((m) => m.toLowerCase());
  const hasMetal = mats.some((m) =>
    /steel|metal|iron|brass|copper|aluminium|aluminum|chromium|scrap/.test(m)
  );
  const hasResin = mats.some((m) => /resin|fiber|fibre|fabric/.test(m));
  if (hasMetal && hasResin) return 'Mixed media';
  if (hasMetal) return 'Steel & metal';
  if (hasResin) return 'Resin & fibre';
  return 'Mixed media';
}

/** Tags worth showing — "New Work" sits on every work, so it carries no information. */
export function displayTags(artwork: Artwork): string[] {
  return (artwork.tags || []).filter((t) => t.toLowerCase() !== 'new work');
}

export function relatedWorks(all: Artwork[], current: Artwork, count = 3): Artwork[] {
  const currentFt = parseMaxFt(current.dimensions);
  const scored = all
    .filter((a) => a.id !== current.id)
    .map((a) => {
      let score = 0;
      if (a.category === current.category) score += 3;
      const shared = a.materials.filter((m) => current.materials.includes(m)).length;
      score += shared * 2;
      if (materialFamily(a) === materialFamily(current)) score += 1;
      const ft = parseMaxFt(a.dimensions);
      if (currentFt && ft && Math.abs(ft - currentFt) <= 3) score += 1;
      if (a.videoUrl) score += 0.5;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score);
  return scored.slice(0, count).map((s) => s.a);
}
/**
 * Readable work slug derived from the locked title, e.g. "The Strawberry"
 * becomes "the-strawberry". Titles are never changed; the slug is computed
 * so the internal artwork id stays the identifier for shortlist,
 * commission and audience/case-study lookups.
 */
export function artworkSlug(artwork: Artwork): string {
  return artwork.title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Public work URL, e.g. "/work/the-strawberry". */
export function artworkUrl(artwork: Artwork): string {
  return `/work/${artworkSlug(artwork)}`;
}

/**
 * Find a work by its readable slug. The old numbered id is accepted as a
 * fallback only; the permanent redirects in next.config.mjs are the
 * canonical route from old URLs to slug URLs.
 */
export function getArtworkBySlug(all: Artwork[], slug: string): Artwork | undefined {
  return all.find((a) => artworkSlug(a) === slug) ?? all.find((a) => a.id === slug);
}
