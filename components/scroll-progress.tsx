'use client';

import { useEffect, useState, useRef } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollProgress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50"
    >
      <div
        ref={progressRef}
        className="h-full bg-accent transition-transform duration-150 ease-out origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

// Alternative circular progress indicator
export function CircularScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (scrollProgress < 10) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden md:block">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-secondary"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
            className="text-accent transition-all duration-150"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-mono font-bold">
            {Math.round(scrollProgress)}%
          </span>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute inset-0 rounded-full hover:bg-accent/10 transition-colors"
          aria-label="Scroll to top"
        />
      </div>
    </div>
  );
}
