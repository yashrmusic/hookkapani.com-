'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  // Initialize audio element
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio('/ambient.mp3');
      audio.loop = true;
      audio.volume = 0.25;
      audio.preload = 'none'; // Don't preload for performance
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 2000);

    // Check if user previously enabled sound
    const hadSound = localStorage.getItem('hookkapaani-sound') === 'true';
    if (hadSound) {
      // We'll try to play on the first user interaction with the page
      const tryAutoResume = () => {
        if (hasInteractedRef.current) return;
        hasInteractedRef.current = true;
        const audio = getAudio();
        audio.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay still blocked — user will need to click the button
            setIsPlaying(false);
          });
        // Remove listeners after first interaction
        document.removeEventListener('click', tryAutoResume);
        document.removeEventListener('touchstart', tryAutoResume);
        document.removeEventListener('scroll', tryAutoResume);
      };

      document.addEventListener('click', tryAutoResume, { once: true });
      document.addEventListener('touchstart', tryAutoResume, { once: true });
      document.addEventListener('scroll', tryAutoResume, { once: true, passive: true });

      return () => {
        document.removeEventListener('click', tryAutoResume);
        document.removeEventListener('touchstart', tryAutoResume);
        document.removeEventListener('scroll', tryAutoResume);
      };
    }
  }, [getAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    const audio = getAudio();
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('hookkapaani-sound', 'false');
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem('hookkapaani-sound', 'true');
        })
        .catch(() => {
          // If play fails, the browser requires a user gesture
          // This shouldn't happen since toggleSound IS a user gesture (click)
          console.warn('Audio playback was blocked by the browser.');
        });
    }
  }, [isPlaying, getAudio]);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleSound}
      className={`fixed z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/80 backdrop-blur-sm border-2 border-accent/50 flex items-center justify-center hover:bg-accent/20 active:bg-accent/30 transition-all duration-500 touch-manipulation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
        right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Enable ambient sound'}
    >
      {!isPlaying ? (
        <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
}
