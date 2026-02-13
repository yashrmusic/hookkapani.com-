
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { artworks } from '@/data/artworks';

export default function PortfolioPage() {
    const [mounted, setMounted] = useState(false);

    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

    useEffect(() => {
        setMounted(true);
        // Auto-trigger print if ?print=true is present
        if (typeof window !== 'undefined' && window.location.search.includes('print=true')) {
            // Slight delay to allow images to load (simplified)
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    }, [])

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white text-black font-sans p-8 md:p-16 print:p-0">
            {/* Print Controls */}
            {/* Print Controls removed - handled by Nav button */}

            {/* Cover Page */}
            <div className="h-screen flex flex-col justify-between items-start border-b-2 border-black pb-8 mb-16 break-after-page">
                <div className="mt-20">
                    <h1 className="text-9xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>H/K</h1>
                    <h2 className="text-4xl font-light tracking-widest uppercase">Hookkapaani Studio</h2>
                </div>

                <div className="w-full flex justify-between items-end text-sm uppercase tracking-wider">
                    <div>
                        <p>New Delhi, India</p>
                        <p>est. 2024</p>
                    </div>
                    <div className="text-right">
                        <p>Selected Works</p>
                        <p>Portfolio Vol. 1</p>
                    </div>
                </div>
            </div>

            {/* Introduction / Artist Statement */}
            <div className="mb-16 max-w-2xl break-after-auto">
                <h3 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>Manifesto</h3>
                <p className="text-lg leading-relaxed text-gray-800 mb-4 font-serif">
                    We are a kinetic sculpture studio exploring the intersection of industrial materials,
                    mechanical motion, and temporal transformation. Our work seeks to find the rhythm within
                    the static, creating objects that breathe, move, and evolve.
                </p>
            </div>

            {/* Artwork Grid (Masonry using CSS Columns) */}
            <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {artworks.map((artwork) => (
                    <div key={artwork.id} className="break-inside-avoid mb-12 group">
                        <div className="relative mb-4">
                            <img
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                className="w-full h-auto object-contain block"
                                style={{ aspectRatio: artwork.aspectRatio }}
                            />
                        </div>

                        <div className="border-t border-black pt-3">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-xl font-bold uppercase" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>{artwork.title}</h4>
                                <span className="text-sm text-gray-500 font-mono">{artwork.year}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide text-xs mb-2">{artwork.category} — {artwork.materials.join(', ')}</p>
                            <p className="text-sm text-gray-800 leading-snug">{artwork.longDescription || artwork.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Contact Page */}
            <div className="mt-24 pt-12 border-t-2 border-black break-before-page flex flex-col items-center justify-center text-center h-[50vh]">
                <h1 className="text-8xl font-bold mb-8" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>H/K</h1>
                <p className="text-xl mb-2 font-serif">contact@hookkapaani.com</p>
                <p className="text-xl font-serif">+91 98765 43210</p>
                <p className="mt-12 text-sm text-gray-400 uppercase tracking-widest">© 2024 Hookkapaani Studio</p>
            </div>

            <style jsx global>{`
        @media print {
            @page {
                size: A4;
                margin: 10mm;
            }
            body {
                background: white;
                color: black;
                -webkit-print-color-adjust: exact;
            }
            .break-after-page {
                page-break-after: always;
            }
            .break-before-page {
                page-break-before: always;
            }
            .break-inside-avoid {
                page-break-inside: avoid;
            }
            .print\:hidden {
                display: none !important;
            }
        }
      `}</style>
        </div>
    );
}
