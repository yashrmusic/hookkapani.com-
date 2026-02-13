'use client';

import { useState } from 'react';
import { artworks } from '../data/artworks';
import { ArtworkCard } from './artwork-image';
import { ArtworkFilters } from './artwork-filters';
import { Lightbox } from './lightbox';
import { useInView } from '../hooks/use-intersection-observer';

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

          {/* Artwork Grid - Simple 3-column responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="cursor-pointer group"
                onClick={() => openLightbox(artwork)}
              >
                <ArtworkCard
                  artwork={artwork}
                  showInfo={true}
                  compact={false}
                  priority={index < 6}
                />
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredArtworks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No artworks match your filters.
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
            <Stat number={artworks.length.toString()} label="Works Created" />
            <Stat number="3" label="Categories" />
            <Stat number="2019" label="Studio Founded" />
            <Stat number="∞" label="Iterations" />
          </div>
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

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-mono">
        {number}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
