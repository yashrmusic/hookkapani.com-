'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import type { Artwork } from '../data/artworks';

interface LightboxProps {
  artwork: Artwork | null;
  allArtworks: Artwork[];
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function Lightbox({
  artwork,
  allArtworks,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const currentIndex = artwork ? allArtworks.findIndex(a => a.id === artwork.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allArtworks.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev && onPrev) onPrev();
          break;
        case 'ArrowRight':
          if (hasNext && onNext) onNext();
          break;
        case 'z':
        case 'Z':
          setIsZoomed(!isZoomed);
          break;
      }
    },
    [isOpen, onClose, onNext, onPrev, hasPrev, hasNext, isZoomed]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
        setIsZoomed(false);
        setImageLoaded(false);
      }, 200);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!artwork) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full touch-manipulation transition-colors"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full touch-manipulation transition-colors"
          style={{ WebkitTapHighlightColor: 'transparent' }}
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full touch-manipulation transition-colors"
          style={{ WebkitTapHighlightColor: 'transparent' }}
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div 
        className="w-full h-full flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image - Full width on mobile */}
        <div className="flex-1 flex items-center justify-center p-4 pt-16 md:p-8 min-h-0">
          <div 
            className={`relative w-full ${isZoomed ? 'overflow-auto' : ''}`}
            style={{ 
              aspectRatio: artwork.aspectRatio ? `${1/artwork.aspectRatio}` : '3/4',
              maxHeight: '65vh'
            }}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              quality={85}
              priority
              onLoad={() => setImageLoaded(true)}
              sizes="100vw"
            />
          </div>
        </div>

        {/* Info Panel - Below image on mobile, side on desktop */}
        <div className="w-full md:w-96 bg-[#141414] md:bg-[#141414]/90 p-4 md:p-6 overflow-y-auto flex-shrink-0"
             style={{ maxHeight: '40vh' }}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{artwork.title}</h3>
          <p className="text-sm text-white/60 mb-4">{artwork.category} • {artwork.year}</p>
          
          <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-4 md:line-clamp-none">
            {artwork.description}
          </p>
          
          {artwork.materials && artwork.materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {artwork.materials.slice(0, 3).map((material: string) => (
                <span key={material} className="px-2 py-1 bg-white/5 text-white/70 text-xs rounded">
                  {material}
                </span>
              ))}
            </div>
          )}

          {artwork.dimensions && (
            <p className="text-xs text-white/50 mb-4">{artwork.dimensions}</p>
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50">
        {currentIndex + 1} / {allArtworks.length}
      </div>
    </div>
  );
}
