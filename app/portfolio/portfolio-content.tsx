'use client';

import Image from 'next/image';
import { artworks } from '@/data/artworks';

export default function PortfolioContent() {
  return (
    <div className="min-h-screen bg-white text-black font-sans p-8 md:p-16 print:p-0">


      <div className="h-screen flex flex-col justify-between items-start border-b-2 border-black pb-8 mb-16 break-after-page">
        <div className="mt-20">
          <h1 className="text-9xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>H/K</h1>
          <h2 className="text-4xl font-light tracking-widest uppercase">Hookkapaani Studio</h2>
        </div>

        <div className="w-full flex justify-between items-end text-sm uppercase tracking-wider">
          <div>
            <p>New Delhi, India</p>
            <p>est. 2026</p>
          </div>
          <div className="text-right">
            <p>Selected Works</p>
            <p>Portfolio Vol. 1</p>
          </div>
        </div>
      </div>

      <div className="mb-16 max-w-2xl break-after-auto">
        <h3 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>Manifesto</h3>
        <p className="text-lg leading-relaxed text-gray-800 mb-4 font-serif">
          We are a kinetic sculpture studio exploring the intersection of industrial materials,
          mechanical motion, and temporal transformation. Our work seeks to find the rhythm within
          the static, creating objects that breathe, move, and evolve.
        </p>
      </div>

      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="break-inside-avoid mb-12 group">
            <div className="relative mb-4 w-full" style={{ aspectRatio: artwork.aspectRatio }}>
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                quality={75}
                unoptimized
              />
            </div>

            <div className="border-t border-black pt-3">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-xl font-bold uppercase" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>{artwork.title}</h4>
                <span className="text-sm text-gray-500 font-mono">{artwork.year}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide text-xs mb-2">{artwork.category} - {artwork.materials.join(', ')}</p>
              <p className="text-sm text-gray-800 leading-snug">{artwork.longDescription || artwork.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 pt-12 border-t-2 border-black break-before-page flex flex-col items-center justify-center text-center h-[50vh]">
        <h1 className="text-8xl font-bold mb-8" style={{ fontFamily: 'var(--font-cormorant-garamond), serif' }}>H/K</h1>
        <p className="text-xl mb-2 font-serif">contact@hookkapaani.com</p>
        <p className="text-xl font-serif">+91-9540026221</p>
        <p className="mt-12 text-sm text-gray-400 uppercase tracking-widest">© 2026 Hookkapaani Studio</p>
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
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* Floating Download Button */}
      <a
        href="/portfolio.pdf"
        download="Hookkapaani_Portfolio_2026.pdf"
        className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-full print:hidden z-50 hover:bg-neutral-800 transition-all shadow-2xl font-bold uppercase tracking-widest text-sm flex items-center gap-3 border border-white/10 group active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-y-0.5 transition-transform"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Portfolio
      </a>
    </div>
  );
}
