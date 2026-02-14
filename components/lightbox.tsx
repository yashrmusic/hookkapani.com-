'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { ShareButton } from './share-button';
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
  const scrollPosRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

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

  // iOS-safe scroll lock: use position fixed + save/restore scroll
  useEffect(() => {
    if (isOpen) {
      scrollPosRef.current = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollPosRef.current);
        setIsZoomed(false);
        setImageLoaded(false);
      }, 200);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Swipe gesture support for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    // Only trigger if horizontal swipe is dominant and significant
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0 && hasPrev && onPrev) {
        onPrev();
      } else if (deltaX < 0 && hasNext && onNext) {
        onNext();
      }
    }

    // Swipe down to close
    if (deltaY > 100 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      onClose();
    }

    touchStartRef.current = null;
  }, [hasPrev, hasNext, onPrev, onNext, onClose]);

  if (!artwork) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        /* Ensure lightbox covers notch/Dynamic Island area */
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* Toolbar */}
      <div
        className="absolute top-4 right-4 z-50 flex items-center gap-3"
        style={{
          top: 'max(1rem, env(safe-area-inset-top))',
          right: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        <ShareButton
          title={artwork.title}
          text={`${artwork.title} — ${artwork.description}`}
          url={`/work/${artwork.id}`}
          variant="icon"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full touch-manipulation transition-colors"
          style={{ WebkitTapHighlightColor: 'transparent' }}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Previous */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full touch-manipulation transition-colors"
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
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full touch-manipulation transition-colors"
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
        {/* Image - Filling maximum space on mobile */}
        <div className="flex-1 flex items-center justify-center p-2 pt-16 md:p-8 min-h-0 bg-black/40">
          <div
            className={`relative w-full h-full ${isZoomed ? 'overflow-auto' : ''}`}
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
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
        </div>

        {/* Info Panel - Below image on mobile, side on desktop */}
        <div
          className="w-full md:w-80 lg:w-96 bg-[#141414] md:bg-[#141414]/90 p-4 md:p-6 overflow-y-auto flex-shrink-0"
          style={{ maxHeight: '35vh' }}
        >
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{artwork.title}</h3>
          <p className="text-sm text-white/60 mb-3">{artwork.category} • {artwork.year}</p>

          <p className="text-sm text-white/70 leading-relaxed mb-3 line-clamp-4 md:line-clamp-none">
            {artwork.description}
          </p>

          {artwork.materials && artwork.materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {artwork.materials.slice(0, 3).map((material: string) => (
                <span key={material} className="px-2 py-1 bg-white/5 text-white/70 text-xs rounded">
                  {material}
                </span>
              ))}
            </div>
          )}

          {artwork.dimensions && (
            <p className="text-xs text-white/50 mb-3">{artwork.dimensions}</p>
          )}
        </div>
      </div>

      {/* Counter */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50"
        style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        {currentIndex + 1} / {allArtworks.length}
      </div>
    </div>
  );
}
