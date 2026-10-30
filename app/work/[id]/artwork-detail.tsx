'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShareButton } from '@/components/share-button';
import { ShortlistButton } from '@/components/shortlist';
import { WhatsAppButton } from '@/components/whatsapp-button';
import type { Artwork } from '@/data/artworks';
import { parseMaxFt, sizeLabel, isMoving, displayTags, artworkUrl } from '@/lib/artwork-utils';
import { trackEvent } from '@/lib/client-analytics';
import { artworkAlt, categoryLabel } from '@/lib/seo';

/* The 3D/AR viewer was removed 2026-10-19: no artwork has a 3D model,
   and its model-viewer/three.js chunk (~990 KB) single-handedly broke
   the repo's perf-budget check. Re-add the viewer when models exist. */
interface PageLink {
  href: string;
  label: string;
}

interface ArtworkDetailProps {
  artwork: Artwork;
  related: Artwork[];
  /** The case study that names this work, when one does. */
  caseStudyLink?: PageLink | null;
  /** The /for/* audience pages that list this work. */
  audienceLinks?: PageLink[];
}

const PERSON_FT = 5.6;

/** "A kinetic sculpture in resin and mechanism, 12 ft in size." — for works without a written description. */
function fallbackSummary(artwork: Artwork): string {
  const label = categoryLabel(artwork);
  const mats = artwork.materials.map((m) => m.toLowerCase());
  const matText = mats.length > 1 ? `${mats.slice(0, -1).join(', ')} and ${mats[mats.length - 1]}` : mats[0];
  const motionImplied = artwork.category === 'kinetic' || mats.some((m) => m.includes('mechanism'));
  return [
    `${/^[aeiou]/i.test(label) ? 'An' : 'A'} ${label}`,
    matText ? ` in ${matText}` : '',
    artwork.dimensions ? `, ${artwork.dimensions} in size` : '',
    isMoving(artwork) && !motionImplied ? ', built around a moving mechanism' : '',
    '.',
  ].join('');
}

function ScaleFigure({ artwork }: { artwork: Artwork }) {
  const ft = parseMaxFt(artwork.dimensions);
  if (!ft) return null;
  const maxH = 150;
  const workH = maxH;
  const personH = Math.max(10, (maxH * PERSON_FT) / Math.max(ft, PERSON_FT));
  return (
    <div className="border border-border p-5 bg-card/30">
      <p className="text-sm font-medium mb-4">Scale</p>
      <div className="flex items-end gap-10" style={{ height: maxH + 8 }}>
        <div className="flex flex-col items-center gap-2">
          <svg width="26" height={personH} viewBox="0 0 26 100" preserveAspectRatio="none" aria-hidden="true">
            <circle cx="13" cy="8" r="7" fill="currentColor" opacity="0.55" />
            <rect x="9" y="17" width="8" height="48" fill="currentColor" opacity="0.55" />
            <rect x="9" y="65" width="3.4" height="35" fill="currentColor" opacity="0.55" />
            <rect x="13.6" y="65" width="3.4" height="35" fill="currentColor" opacity="0.55" />
          </svg>
          <span className="text-xs text-muted-foreground whitespace-nowrap">Person · 5 ft 7 in</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-accent/70 border border-accent" style={{ width: 54, height: workH }} />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            This work · {artwork.dimensions}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Shown to scale by largest dimension.</p>
    </div>
  );
}

export function ArtworkDetail({ artwork, related, caseStudyLink = null, audienceLinks = [] }: ArtworkDetailProps) {
  const tags = displayTags(artwork);
    const workUrl = `https://hookkapani.com${artworkUrl(artwork)}`;
  const pageLinks = caseStudyLink ? [caseStudyLink, ...audienceLinks] : audienceLinks;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-0">
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to the Works
          </Link>

                  <ShareButton title={artwork.title} text={artwork.title} url={artworkUrl(artwork)} variant="button" />
        </div>
      </div>

      <div className="pt-16 bg-[#111]">
        <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div
            className="relative w-full mx-auto group"
            style={{
              aspectRatio: artwork.aspectRatio || '3/4',
              maxHeight: '85vh',
            }}
          >
            {artwork.videoUrl ? (
              <video
                src={artwork.videoUrl}
                poster={artwork.imageUrl}
                aria-label={artworkAlt(artwork)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={artwork.imageUrl}
                alt={artworkAlt(artwork)}
                fill
                className="object-contain"
                quality={82}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">{artwork.title}</h1>
            {artwork.description ? (
              <p className="text-base text-foreground/85 leading-relaxed mb-6">{artwork.description}</p>
            ) : (
              <p className="text-base text-foreground/85 leading-relaxed mb-6">
                {fallbackSummary(artwork)} Full details are in
                the spec sheet below; the studio confirms suitability for your site after a technical survey.
              </p>
            )}
            {artwork.motion && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">How it moves</h2>
                <p className="text-base text-foreground/85 leading-relaxed">{artwork.motion}</p>
              </div>
            )}
            <ScaleFigure artwork={artwork} />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-1.5">Category</h2>
              <p className="text-lg font-medium capitalize">{artwork.category}</p>
            </div>

            {artwork.materials.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1.5">Materials</h2>
                <ul className="space-y-1">
                  {artwork.materials.map((material) => (
                    <li key={material} className="text-base text-foreground/85">
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {artwork.dimensions && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1.5">Size</h2>
                <p className="text-base text-foreground/85">{sizeLabel(artwork)}</p>
              </div>
            )}

            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-1.5">Movement</h2>
              <p className="text-base text-foreground/85">{isMoving(artwork) ? 'Moving (kinetic)' : 'Static'}</p>
            </div>

            {tags.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1.5">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-accent/10 text-accent-bright text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border space-y-3">
              <Link
                href={`/commission?work=${artwork.id}`}
                className="block text-center py-3 px-6 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent/90 transition-colors min-h-[44px]"
              >
                Enquire about this work
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ShortlistButton artworkId={artwork.id} />
                <WhatsAppButton artworkTitle={artwork.title} artworkUrl={workUrl} />
              </div>
              <Link
                                href={`${artworkUrl(artwork)}/spec-sheet`}
                prefetch={false}
                                                onClick={() =>
                  trackEvent('spec_sheet_download_requested', {
                    artworkId: artwork.id,
                    artworkTitle: artwork.title,
                  })
                }
                className="block text-center py-3 px-6 border border-border text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors min-h-[44px]"
              >
                Download spec sheet (PDF)
              </Link>
              <p className="text-sm text-muted-foreground pt-2">
                Planning a commission?{' '}
                <Link href="/case-studies" className="text-accent hover:text-accent/80">
                  See how the studio delivers projects
                </Link>{' '}
                or{' '}
                <Link href="/portfolio" className="text-accent hover:text-accent/80">
                  browse all works
                </Link>
                .
              </p>
            </div>

            {pageLinks.length > 0 && (
              <nav aria-label="Related pages">
                <h2 className="text-sm font-medium text-muted-foreground mb-1.5">Related pages</h2>
                <ul className="space-y-1">
                  {pageLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-base text-accent hover:text-accent/80">
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="text-2xl font-bold mb-6">Related works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                            <Link key={rel.id} href={artworkUrl(rel)} className="group block"></Link>
                  <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: rel.aspectRatio || '3/4' }}>
                    <Image
                      src={rel.imageUrl}
                      alt={artworkAlt(rel)}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={75}
                    />
                  </div>
                  <h3 className="mt-3 font-semibold group-hover:text-accent transition-colors">{rel.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {[sizeLabel(rel), rel.materials[0], isMoving(rel) ? 'Moves' : null].filter(Boolean).join(' · ')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky enquire bar — mobile only */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#101010]/97 backdrop-blur border-t border-border px-4 py-3 flex gap-3">
        <Link
          href={`/commission?work=${artwork.id}`}
          className="flex-1 text-center py-3 bg-accent text-accent-foreground text-sm font-medium min-h-[44px] flex items-center justify-center"
        >
          Enquire about this work
        </Link>
        <a
          href={`https://wa.me/919540026221?text=${encodeURIComponent(`Hi, I'm interested in "${artwork.title}" — ${workUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 flex items-center justify-center border border-border min-h-[44px]"
          aria-label="WhatsApp the studio about this work"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>
        </a>
      </div>
    </div>
  );
}
