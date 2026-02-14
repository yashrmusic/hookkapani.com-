'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { artworks } from '../data/artworks';
import { ArtworkCard } from './artwork-image';
import { ArtworkFilters } from './artwork-filters';
import { Lightbox } from './lightbox';
import { useInView } from '../hooks/use-intersection-observer';
import { MasonryGrid } from './masonry-grid';

export function ProjectsEnhanced() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.05 });
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  const [lightboxArtwork, setLightboxArtwork] = useState<typeof artworks[0] | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (artwork: typeof artworks[0]) => {
    setLightboxArtwork(artwork);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleNext = () => {
    if (!lightboxArtwork) return;
    const currentIndex = filteredArtworks.findIndex(a => a.id === lightboxArtwork.id);
    const nextIndex = (currentIndex + 1) % filteredArtworks.length;
    setLightboxArtwork(filteredArtworks[nextIndex]);
  };

  const handlePrev = () => {
    if (!lightboxArtwork) return;
    const currentIndex = filteredArtworks.findIndex(a => a.id === lightboxArtwork.id);
    const prevIndex = (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    setLightboxArtwork(filteredArtworks[prevIndex]);
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



          {/* Artwork Grid - Masonry Layout for "Coherent/Eye-Candy" Look */}
          <MasonryGrid
            gap={24}
            columnCount={{ mobile: 1, tablet: 2, desktop: 3 }}
            className="mb-12"
          >
            {filteredArtworks.map((artwork, index) => (
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
                  priority={index < 6}
                />
              </motion.div>
            ))}
          </MasonryGrid>

          {/* No results */}
          {filteredArtworks.length === 0 && (
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
        allArtworks={filteredArtworks}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}


