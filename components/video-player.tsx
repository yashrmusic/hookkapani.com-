'use client';

import { useState } from 'react';

type StudioVideo = {
    videoUrl: string;
};

export function VideoPlayer({ video }: { video: { videoUrl: string } }) {
    const [hasError, setHasError] = useState(false);
    const [retryUrl, setRetryUrl] = useState<string | null>(null);
    const [hasRetried, setHasRetried] = useState(false);
    const videoSrc = retryUrl ?? video.videoUrl;

    const handleError = () => {
        if (!hasRetried) {
            const separator = video.videoUrl.includes('?') ? '&' : '?';
            setRetryUrl(`${video.videoUrl}${separator}retry=1`);
            setHasRetried(true);
            return;
        }
        setHasError(true);
    };

    if (hasError) {
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-white/10 p-6 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">Video unavailable</span>
                <a
                    href={video.videoUrl}
                    className="mt-3 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                    Open video file
                </a>
            </div>
        );
    }

    return (
        <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={handleError}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
