'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
    // Delay visibility to let the page settle
    const timer = setTimeout(() => setIsVisible(true), 1500);

    // Check local storage for preference
    const savedSound = localStorage.getItem('hookkapaani-sound');
    const shouldPlay = savedSound === 'true';

    // Wake up audio on first user interaction if they previously had it on
    const handleFirstInteraction = () => {
      if (shouldPlay && audioRef.current && !isPlaying) {
        resumeAudio();
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const resumeAudio = useCallback(async () => {
    if (!audioRef.current) return;

    // Initialize AudioContext on first play/resume to satisfy mobile browser requirements
    if (!audioContextRef.current) {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }

    // Explicitly resume the context if it's suspended (mobile Safari behavior)
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem('hookkapaani-sound', 'true');
    } catch (err) {
      console.warn('Playback blocked:', err);
      setIsPlaying(false);
    }
  }, []);

  const toggleSound = useCallback(async (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('hookkapaani-sound', 'false');
    } else {
      await resumeAudio();
    }
  }, [isPlaying, resumeAudio]);

  if (!mounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/ambient.mp3"
        loop
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />
      <button
        onClick={toggleSound}
        onPointerDown={(e) => e.stopPropagation()}
        className={`fixed bottom-6 right-6 z-[70] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/90 backdrop-blur-md border-2 border-accent/50 flex items-center justify-center hover:bg-accent hover:border-accent text-accent transition-all duration-500 shadow-lg touch-manipulation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label={isPlaying ? 'Mute' : 'Unmute'}
      >
        {!isPlaying ? (
          <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-3 bg-accent animate-[bounce_1s_infinite_0ms]" />
            <span className="w-1 h-5 bg-accent animate-[bounce_1s_infinite_200ms]" />
            <span className="w-1 h-4 bg-accent animate-[bounce_1s_infinite_400ms]" />
          </div>
        )}
      </button>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}
