'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Artwork } from '../data/artworks';
import { sizeLabel, isMoving } from '@/lib/artwork-utils';
import { artworkAlt } from '@/lib/seo';

interface ArtworkImageProps {
  artwork: Artwork;
  priority?: boolean;
  sizes?: string;
  className?: string;
  onClick?: () => void;
}

export function ArtworkImage({
  artwork,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  onClick,
}: ArtworkImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const paddingBottom = `${(1 / artwork.aspectRatio) * 100}%`;

  return (
    <div
      className={`relative w-full overflow-hidden bg-secondary shadow-[0_0_0_0_rgba(0,0,0,0)] group-hover:shadow-2xl ${className} transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ paddingBottom }}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${artwork.title} in the image viewer`}
          className="absolute inset-0 block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <Image
            src={artwork.imageUrl}
            alt={artworkAlt(artwork)}
            fill
            sizes={sizes}
            priority={priority}
            quality={75}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-contain transition-transform duration-500 hover:scale-[1.02]"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
          />
          <span className="absolute inset-0 bg-accent/0 hover:bg-accent/10 transition-colors duration-300 pointer-events-none" />
        </button>
      ) : (
        <Image
          src={artwork.imageUrl}
          alt={artworkAlt(artwork)}
          fill
          sizes={sizes}
          priority={priority}
          quality={75}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="object-contain transition-transform duration-500"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}

interface ArtworkCardProps extends ArtworkImageProps {
  showInfo?: boolean;
  compact?: boolean;
}

export function ArtworkCard({
  artwork,
  showInfo = true,
  compact = false,
  ...imageProps
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArtworkImage artwork={artwork} {...imageProps} />

      {showInfo && (
        <div
          className={`
            absolute bottom-0 left-0 right-0
            bg-gradient-to-t from-background via-background/95 to-transparent
            p-4 md:p-6
            transition-all duration-300
            ${compact ? 'translate-y-full group-hover:translate-y-0' : ''}
            ${compact ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-100'}
          `}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-1 text-balance">
            {artwork.title}
          </h3>

          {!compact && (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                {[
                  artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1),
                  sizeLabel(artwork),
                  artwork.materials?.[0],
                  isMoving(artwork) ? 'Moves' : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <Link
                href={`/work/${artwork.id}`}
                className="inline-block text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors border-b border-accent/50 hover:border-accent pb-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                View Full Detail →
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
