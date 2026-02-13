'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Artwork } from '../data/artworks';

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
      className={`relative w-full overflow-hidden bg-secondary ${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ paddingBottom }}
    >
      <Image
        src={artwork.imageUrl}
        alt={artwork.title}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        loading={priority ? 'eager' : 'lazy'}
        className={`
          object-contain
          transition-transform duration-500
          ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
        `}
        onClick={onClick}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />

      {onClick && (
        <div className="absolute inset-0 bg-accent/0 hover:bg-accent/10 transition-colors duration-300 pointer-events-none" />
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
      className="group relative"
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
                {artwork.year} • {artwork.category}
              </p>
              <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                {artwork.description}
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
