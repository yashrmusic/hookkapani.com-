'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from '@/hooks/use-intersection-observer';

const heroVideos = [
  { src: '/videos/video1.mp4', label: 'Kinetic Motion 1' },
  { src: '/videos/video2.mp4', label: 'Kinetic Motion 2' },
  { src: '/videos/video3.mp4', label: 'Kinetic Motion 3' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setActiveSlide(idx);
  }, []);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroVideos.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + heroVideos.length) % heroVideos.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroVideos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const opacity = Math.max(0, 1 - scrollY / 400);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden bg-background"
      style={{
        minHeight: '100vh',
        ...({ minHeight: '100dvh' } as React.CSSProperties),
        paddingTop: 'max(env(safe-area-inset-top), 0px)',
      }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto px-4 sm:px-6 z-10 pt-24 md:pt-32" style={{ opacity }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center">

          {/* Logo / Brand Text */}
          <div
            ref={titleRef}
            className={`mb-10 md:mb-14 transition-all duration-700 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-red-500 text-center leading-[0.95]">
              hookkapani
            </h1>
          </div>

          {/* Video Slider */}
          <div
            className={`w-full transition-all duration-700 delay-300 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Slider container */}
            <div className="relative">
              {/* Video area */}
              <div
                className="relative aspect-video overflow-hidden bg-black/40 border border-white/[0.06]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {heroVideos.map((video, i) => (
                  <video
                    key={video.src}
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: activeSlide === i ? 1 : 0 }}
                  />
                ))}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Slide label overlay */}
                <div className="absolute bottom-4 left-5 md:bottom-6 md:left-8 flex items-center gap-3 pointer-events-none bg-black/35 border border-white/15 rounded-full px-4 py-2 backdrop-blur-md">
                  <span className="text-accent text-2xl md:text-4xl font-mono font-bold leading-none">
                    {String(activeSlide + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm md:text-lg font-semibold text-white tracking-tight">
                      {heroVideos[activeSlide].label}
                    </p>
                  </div>
                </div>

                {/* Nav arrows */}
                <button
                  onClick={goPrev}
                  className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2.5 mt-4">
                {heroVideos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${activeSlide === i ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Explore Works CTA */}
          <div
            className={`mt-12 md:mt-16 flex flex-col items-center gap-4 transition-all duration-700 delay-700 ${(titleInView || isLoaded) ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-label text-muted-foreground">Explore Works</p>
            <div className="w-[2px] h-12 sm:h-16 bg-accent origin-top animate-pulse" />
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  );
}

