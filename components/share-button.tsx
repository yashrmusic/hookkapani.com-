'use client';

import { useCallback, useState } from 'react';

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
    className?: string;
    variant?: 'icon' | 'button';
}

export function ShareButton({
    title,
    text,
    url,
    className = '',
    variant = 'icon',
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = useCallback(async () => {
        const shareUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;

        // Use native Web Share API on mobile (iOS/Android)
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: shareUrl,
                });
                return;
            } catch (err) {
                // User cancelled or share failed — fall through to copy
                if ((err as Error).name === 'AbortError') return;
            }
        }

        // Fallback: copy link to clipboard
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Final fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = shareUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [title, text, url]);

    if (variant === 'button') {
        return (
            <button
                onClick={handleShare}
                className={`inline-flex items-center gap-2 px-4 py-2.5 border border-accent/50 text-accent text-sm font-medium uppercase tracking-wider hover:bg-accent hover:text-accent-foreground active:bg-accent/80 transition-all duration-300 touch-manipulation min-h-[44px] ${className}`}
            >
                {copied ? (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Link Copied
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                    </>
                )}
            </button>
        );
    }

    // Icon variant (for lightbox)
    return (
        <button
            onClick={handleShare}
            className={`w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full touch-manipulation transition-colors ${className}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Share this artwork"
        >
            {copied ? (
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            )}
        </button>
    );
}
