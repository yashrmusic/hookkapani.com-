'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShareButton } from '@/components/share-button';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Artwork } from '@/data/artworks';

const ARViewer = dynamic(() => import('@/components/ar-viewer'), { ssr: false });

interface ArtworkDetailProps {
    artwork: Artwork;
    prevArtwork: Artwork | null;
    nextArtwork: Artwork | null;
}

export function ArtworkDetail({ artwork, prevArtwork, nextArtwork }: ArtworkDetailProps) {
    const [showAR, setShowAR] = useState(false);
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
                        className="relative w-full mx-auto group"
                        style={{
                            aspectRatio: artwork.aspectRatio || '3/4',
                            maxHeight: '85vh',
                        }}
                    >
                        {artwork.modelUrl && (
                            <button
                                onClick={() => setShowAR(!showAR)}
                                className="absolute top-4 right-4 z-40 px-6 py-3 bg-accent text-white rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                {showAR ? 'View Static Image' : 'Explore in 3D'}
                            </button>
                        )}

                        {showAR && artwork.modelUrl ? (
                            <ARViewer
                                src={artwork.modelUrl}
                                alt={artwork.title}
                                className="w-full h-full"
                            />
                        ) : (
                            <Image
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                fill
                                className="object-contain"
                                quality={90}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                            />
                        )}
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
