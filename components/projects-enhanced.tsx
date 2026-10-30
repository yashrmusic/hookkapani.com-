'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { artworks } from '../data/artworks';
import { ArtworkCard, ArtworkImage } from './artwork-image';
import { sizeLabel, isMoving, artworkUrl } from '@/lib/artwork-utils';
import { ArtworkFilters } from './artwork-filters';
import { Lightbox } from './lightbox';
import { useInView } from '../hooks/use-intersection-observer';
import { MasonryGrid } from './masonry-grid';
import type { Artwork } from '../data/artworks';

export function ProjectsEnhanced({ featured = false }: { featured?: boolean }) {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.05 });
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  const [lightboxArtwork, setLightboxArtwork] = useState<typeof artworks[0] | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const getLayerRank = (artwork: Artwork) => {
    const normalized = artwork.materials.map((m) => m.toLowerCase());
    const hasMechanism = artwork.category === 'kinetic' || normalized.some((m) => m.includes('mechanism'));
    if (hasMechanism) return 0; // Top layer

    const hasMetal = normalized.some((m) =>
      m.includes('metal') ||
      m.includes('steel') ||
      m.includes('copper') ||
      m.includes('chromium') ||
      m.includes('aluminum') ||
      m.includes('scrap')
    );
    if (hasMetal) return 1; // Middle layer

    const hasFiber = normalized.some((m) => m.includes('fiber') || m.includes('fabric'));
    if (hasFiber) return 2; // Lower layer

    return 3; // Remaining works
  };

  const orderedFilteredArtworks = useMemo(() => {
    const indexMap = new Map(filteredArtworks.map((art, idx) => [art.id, idx]));
    return [...filteredArtworks].sort((a, b) => {
      const byLayer = getLayerRank(a) - getLayerRank(b);
      if (byLayer !== 0) return byLayer;
      return (indexMap.get(a.id) ?? 0) - (indexMap.get(b.id) ?? 0);
    });
  }, [filteredArtworks]);

  const openLightbox = (artwork: typeof artworks[0]) => {
    setLightboxArtwork(artwork);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setLightboxArtwork(null), 220);
  };

  const handleNext = () => {
    if (!lightboxArtwork) return;
    const currentIndex = orderedFilteredArtworks.findIndex(a => a.id === lightboxArtwork.id);
    const nextIndex = (currentIndex + 1) % orderedFilteredArtworks.length;
    setLightboxArtwork(orderedFilteredArtworks[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxArtwork) return;
    const currentIndex = orderedFilteredArtworks.findIndex(a => a.id === lightboxArtwork.id);
    const prevIndex = (currentIndex - 1 + orderedFilteredArtworks.length) % orderedFilteredArtworks.length;
    setLightboxArtwork(orderedFilteredArtworks[prevIndex]);
  };

  if (featured) {
    const featuredIds = [
      'new-work-28', // Medusa (video)
      'new-work-22', // Forest Lady (video)
      'new-work-17', // The Strawberry (video)
      'new-work-30', // The Hearing Heart (video)
      'new-work-26', // The Bull — 17 ft
      'new-work-32', // Koi Fish — 15 ft
      'new-work-8', // The Open Gates Soul — 12 x 15 ft
      'new-work-13', // Sangeeta — 12 ft
    ];
    const featuredWorks = featuredIds
      .map((id) => artworks.find((a) => a.id === id))
      .filter(Boolean) as Artwork[];
    return (
      <section id="work" className="py-16 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Works</h2>
            <p className="text-body text-muted-foreground max-w-3xl">
              Eight pieces that show the breadth of the practice: four works filmed in motion, and
              the largest works the studio has built.
            </p>
          </div>
          <MasonryGrid gap={24} columnCount={{ mobile: 1, tablet: 2, desktop: 3 }} className="mb-12">
            {featuredWorks.map((artwork, index) => (
                          <Link key={artwork.id} href={artworkUrl(artwork)} className="group block mb-6"></Link>
                <ArtworkImage artwork={artwork} priority={index < 2} />
                <div className="pt-4">
                  <h3 className="text-lg md:text-xl font-semibold group-hover:text-accent transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {[sizeLabel(artwork), artwork.materials[0], isMoving(artwork) ? 'Moves' : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              </Link>
            ))}
          </MasonryGrid>
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 border border-border font-medium hover:border-accent hover:text-accent transition-colors min-h-[44px]"
            >
              View all {artworks.length} works
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="py-16 md:py-32 bg-background"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Selected Works</h2>
            <p className="text-body text-muted-foreground max-w-3xl">
              A collection of kinetic sculptures, installations, and explorations in industrial materials.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 md:mb-12">
            <ArtworkFilters
              artworks={artworks}
              onFilterChange={setFilteredArtworks}
            />
          </div>

          {/* Ordered Artwork Grid (labels hidden) */}
          <MasonryGrid
            gap={24}
            columnCount={{ mobile: 1, tablet: 2, desktop: 3 }}
            className="mb-12"
          >
            {orderedFilteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                              initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 12) * 0.05 }}
                className="cursor-pointer group mb-6"
                onClick={() => openLightbox(artwork)}
              >
                <ArtworkCard
                  artwork={artwork}
                  showInfo={true}
                  compact={false}
                  priority={index < 2}
                />
              </motion.div>
            ))}
          </MasonryGrid>

          {/* No results */}
          {orderedFilteredArtworks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No artworks match your filters.
              </p>
            </div>
          )}


        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        artwork={lightboxArtwork}
        allArtworks={orderedFilteredArtworks}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
