'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { ShareButton } from './share-button';
import dynamic from 'next/dynamic';
import type { Artwork } from '../data/artworks';

const ARViewer = dynamic(() => import('./ar-viewer'), { ssr: false });

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
  const [showAR, setShowAR] = useState(false);
  const scrollPosRef = useRef(0);

  const currentIndex = artwork ? allArtworks.findIndex((a) => a.id === artwork.id) : -1;
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
        setShowAR(false);
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

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX > 0 && hasPrev && onPrev) {
          onPrev();
        } else if (deltaX < 0 && hasNext && onNext) {
          onNext();
        }
      }

      if (deltaY > 100 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
        onClose();
      }

      touchStartRef.current = null;
    },
    [hasPrev, hasNext, onPrev, onNext, onClose]
  );

  if (!artwork) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div
        className="absolute top-4 right-4 z-50 flex items-center gap-3"
        style={{
          top: 'max(1rem, env(safe-area-inset-top))',
          right: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        {artwork.modelUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAR(!showAR);
            }}
            className={`px-4 h-12 flex items-center justify-center gap-2 rounded-full transition-all font-mono text-xs uppercase tracking-widest ${showAR ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {showAR ? 'View Image' : 'View in 3D'}
          </button>
        )}

        <ShareButton
          title={artwork.title}
          text={artwork.title}
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

      <div
        className="w-full h-full flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center p-2 pt-16 md:p-8 min-h-0 bg-black/40">
          <div className={`relative w-full h-full ${isZoomed ? 'overflow-auto' : ''}`}>
            {showAR && artwork.modelUrl ? (
              <ARViewer
                src={artwork.modelUrl}
                alt={artwork.title}
                className="w-full h-full"
              />
            ) : artwork.videoUrl ? (
              <video
                src={artwork.videoUrl}
                poster={artwork.imageUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <>
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
                  quality={80}
                  priority
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </>
            )}
          </div>
        </div>

        <aside
          className="w-full md:w-[22rem] lg:w-[26rem] max-h-[50vh] md:max-h-full bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-white/[0.06] overflow-y-auto flex-shrink-0 flex flex-col"
          aria-label="Artwork details"
        >
          {/* Main content area */}
          <div className="flex-1 p-6 md:p-8 lg:p-10">

            {/* Category badge */}
            <div className="mb-6 md:mb-8">
              <span className="inline-block text-[10px] font-mono tracking-[0.35em] uppercase text-accent/90 border border-accent/20 bg-accent/[0.04] px-3 py-1.5">
                {artwork.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-[1.15] tracking-tight mb-8 md:mb-10">
              {artwork.title}
            </h3>

            {/* Accent divider */}
            <div className="w-10 h-[2px] bg-accent/60 mb-8 md:mb-10" />

            {/* Info grid */}
            <div className="space-y-7 md:space-y-8">

              {/* Dimensions — hero treatment */}
              {artwork.dimensions && (
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/35 mb-2.5">Height</p>
                  <p className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                    {artwork.dimensions}
                  </p>
                </div>
              )}

              {/* Materials */}
              {artwork.materials && artwork.materials.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/35 mb-3">Material</p>
                  <div className="flex flex-wrap gap-2">
                    {artwork.materials.map((material: string) => (
                      <span
                        key={material}
                        className="px-3 py-1.5 text-[11px] font-medium text-white/75 border border-white/[0.08] bg-white/[0.03] hover:border-accent/30 hover:text-white/90 transition-all duration-200"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {artwork.description && (
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/35 mb-3">About</p>
                  <p className="text-sm text-white/50 leading-[1.7] font-light">{artwork.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer with counter + link */}
          <div className="border-t border-white/[0.06] px-6 md:px-8 lg:px-10 py-4 flex items-center justify-between">
            <span className="text-[11px] font-mono text-white/30 tracking-wider">
              {currentIndex + 1} <span className="text-white/15">/</span> {allArtworks.length}
            </span>
            <a
              href={`/work/${artwork.id}`}
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Full details →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
