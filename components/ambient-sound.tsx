'use client';

import { useState, useEffect, useRef } from 'react';

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const hadSound = localStorage.getItem('hookkapaani-sound') === 'true';
    if (hadSound) {
      setIsMuted(false);
    }
    // Delay showing the button for 2 seconds
    setTimeout(() => setIsVisible(true), 2000);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!audioRef.current) {
      audioRef.current = new Audio('/ambient.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
    }

    if (!isMuted && isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, isMuted, mounted]);

  const toggleSound = () => {
    if (isMuted) {
      setIsMuted(false);
      setIsPlaying(true);
      localStorage.setItem('hookkapaani-sound', 'true');
    } else {
      setIsMuted(true);
      setIsPlaying(false);
      localStorage.setItem('hookkapaani-sound', 'false');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm border-2 border-accent/50 flex items-center justify-center hover:bg-accent/20 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label={isMuted ? 'Enable ambient sound' : 'Mute ambient sound'}
    >
      {isMuted ? (
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
