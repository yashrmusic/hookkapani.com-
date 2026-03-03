'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { artworks } from '../data/artworks';
import { ArtworkCard } from './artwork-image';
import { ArtworkFilters } from './artwork-filters';
import { Lightbox } from './lightbox';
import { useInView } from '../hooks/use-intersection-observer';
import { MasonryGrid } from './masonry-grid';
import type { Artwork } from '../data/artworks';

export function ProjectsEnhanced() {
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

  const groupedArtworks = useMemo(() => {
    return {
      mechanical: orderedFilteredArtworks.filter((a) => getLayerRank(a) === 0),
      metal: orderedFilteredArtworks.filter((a) => getLayerRank(a) === 1),
      fiber: orderedFilteredArtworks.filter((a) => getLayerRank(a) === 2),
      other: orderedFilteredArtworks.filter((a) => getLayerRank(a) === 3),
    };
  }, [orderedFilteredArtworks]);

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

          {/* Layered Artwork Groups */}
          {[
            { key: 'mechanical', title: 'Mechanical Artworks', items: groupedArtworks.mechanical },
            { key: 'metal', title: 'Metal', items: groupedArtworks.metal },
            { key: 'fiber', title: 'Fiber', items: groupedArtworks.fiber },
            { key: 'other', title: 'Other Materials', items: groupedArtworks.other },
          ].map((group) => (
            group.items.length > 0 ? (
              <div key={group.key} className="mb-14">
                <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase text-white/90 mb-6">
                  {group.title}
                </h3>
                <MasonryGrid
                  gap={24}
                  columnCount={{ mobile: 1, tablet: 2, desktop: 3 }}
                >
                  {group.items.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      initial={{ opacity: 0, y: 20 }}
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
              </div>
            ) : null
          ))
          }

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
