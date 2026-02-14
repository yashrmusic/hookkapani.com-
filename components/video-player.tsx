'use client';

import { useState } from 'react';

export function VideoPlayer({ video }: { video: any }) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-white/10 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">Feed Signal Lost</span>
                <span className="text-[10px] text-white/20 mt-2">Reconnecting to secure channel...</span>
            </div>
        );
    }

    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <span className="text-[10px] uppercase font-mono tracking-widest opacity-20 group-hover:opacity-40 transition-opacity">
                    Initializing Stream...
                </span>
            </div>
            <video
                src={video.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                onError={() => setHasError(true)}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0 z-10"
            />
            <div className="absolute top-6 left-6 flex items-center gap-3 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Live Studio Cam</span>
            </div>
        </>
    );
}
