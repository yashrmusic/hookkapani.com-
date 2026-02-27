'use client';

import { useState } from 'react';

type StudioVideo = {
    videoUrl: string;
};

export function VideoPlayer({ video }: { video: { videoUrl: string } }) {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    if (hasError) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-white/10 p-6 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">Video unavailable</span>
            </div>
        );
    }

    return (
        <video
            src={video.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
