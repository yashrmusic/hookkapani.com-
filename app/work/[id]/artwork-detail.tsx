'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShareButton } from '@/components/share-button';
import type { Artwork } from '@/data/artworks';

interface ArtworkDetailProps {
    artwork: Artwork;
    prevArtwork: Artwork | null;
    nextArtwork: Artwork | null;
}

export function ArtworkDetail({ artwork, prevArtwork, nextArtwork }: ArtworkDetailProps) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Back link */}
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
                        Back to Works
                    </Link>

                    <ShareButton
                        title={artwork.title}
                        text={`${artwork.title} — ${artwork.description}`}
                        url={`/work/${artwork.id}`}
                        variant="button"
                    />
                </div>
            </div>

            {/* Hero image — full width */}
            <div className="pt-16 bg-[#111]">
                <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
                    <div
                        className="relative w-full mx-auto"
                        style={{
                            aspectRatio: artwork.aspectRatio || '3/4',
                            maxHeight: '85vh',
                        }}
                    >
                        <Image
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            fill
                            className="object-contain"
                            quality={90}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                        />
                    </div>
                </div>
            </div>

            {/* Artwork info */}
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Main info */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {artwork.title}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            {artwork.longDescription || artwork.description}
                        </p>
                    </div>

                    {/* Details sidebar */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Year</h3>
                            <p className="text-lg font-medium">{artwork.year}</p>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Category</h3>
                            <p className="text-lg font-medium capitalize">{artwork.category}</p>
                        </div>

                        {artwork.materials && artwork.materials.length > 0 && (
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Materials</h3>
                                <ul className="space-y-1">
                                    {artwork.materials.map((material: string) => (
                                        <li key={material} className="text-sm text-foreground/80">{material}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {artwork.dimensions && (
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Dimensions</h3>
                                <p className="text-sm text-foreground/80">{artwork.dimensions}</p>
                            </div>
                        )}

                        {artwork.tags && artwork.tags.length > 0 && (
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {artwork.tags.map((tag: string) => (
                                        <span key={tag} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Commission CTA */}
                        <div className="pt-4 border-t border-border">
                            <Link
                                href="/#commission"
                                className="block text-center py-3 px-6 bg-accent text-accent-foreground text-sm font-medium uppercase tracking-wider hover:bg-accent/90 transition-colors min-h-[44px]"
                            >
                                Commission Similar Work
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Prev / Next navigation */}
                <div className="mt-16 border-t border-border pt-8 grid grid-cols-2 gap-4">
                    {prevArtwork ? (
                        <Link
                            href={`/work/${prevArtwork.id}`}
                            className="group flex flex-col gap-1 hover:text-accent transition-colors"
                        >
                            <span className="text-xs uppercase tracking-widest text-muted-foreground">← Previous</span>
                            <span className="font-medium group-hover:text-accent transition-colors line-clamp-1">
                                {prevArtwork.title}
                            </span>
                        </Link>
                    ) : <div />}

                    {nextArtwork ? (
                        <Link
                            href={`/work/${nextArtwork.id}`}
                            className="group flex flex-col gap-1 text-right hover:text-accent transition-colors"
                        >
                            <span className="text-xs uppercase tracking-widest text-muted-foreground">Next →</span>
                            <span className="font-medium group-hover:text-accent transition-colors line-clamp-1">
                                {nextArtwork.title}
                            </span>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </main>
    );
}
