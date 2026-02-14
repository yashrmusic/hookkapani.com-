'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';

interface ARViewerProps {
    src: string;
    iosSrc?: string;
    alt: string;
    poster?: string;
    className?: string;
}

const ModelViewer = 'model-viewer' as unknown as ComponentType<Record<string, unknown>>;

export default function ARViewer({ src, iosSrc, alt, poster, className = '' }: ARViewerProps) {
    const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Dynamically import model-viewer only on client
        import('@google/model-viewer')
            .then(() => setModelViewerLoaded(true))
            .catch((err) => console.error('Failed to load model-viewer:', err));
    }, []);

    if (!modelViewerLoaded) {
        return (
            <div className={`flex items-center justify-center bg-black/20 animate-pulse ${className}`}>
                <div className="text-white/40 text-sm font-mono">Loading 3D Engine...</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative group ${className}`}>
            <ModelViewer
                src={src}
                ios-src={iosSrc}
                alt={alt}
                poster={poster}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                shadow-intensity="1"
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                touch-action="pan-y"
            >
                <button
                    slot="ar-button"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-2 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    View in Your Room (AR)
                </button>

                {/* Loading progress bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 overflow-hidden">
                    <div className="h-full bg-accent animate-[progress_2s_ease-in-out_infinite]" />
                </div>
            </ModelViewer>

            <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
