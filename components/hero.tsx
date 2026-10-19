'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useInView } from '@/hooks/use-intersection-observer';

const heroSlides = [
  { src: '/videos/video1.mp4', caption: 'Medusa', detail: '12 ft · moving sculpture', href: '/work/new-work-28' },
  { src: '/videos/video2.mp4', caption: 'Forest Lady', detail: '8 ft · moving sculpture', href: '/work/new-work-22' },
  { src: '/videos/video3.mp4', caption: 'Works in motion', detail: 'Hookkapaani Studio, New Delhi', href: '/#work' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [titleRef, titleInView] = useInView({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    return () => clearTimeout(timer);
  }, []);

  // Only the visible slide plays — the others stay paused (lighter page, no stacked motion).
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeSlide && !reducedMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeSlide, reducedMotion]);

  const goToSlide = useCallback((idx: number) => setActiveSlide(idx), []);
  const goNext = useCallback(() => setActiveSlide((p) => (p + 1) % heroSlides.length), []);
  const goPrev = useCallback(() => setActiveSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion]);

  const slide = heroSlides[activeSlide];

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
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 z-10 pt-24 md:pt-32 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div
            ref={titleRef}
            className={`w-full max-w-xl mb-8 md:mb-10 transition-all duration-700 ${
              titleInView || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <img src="/images/hookkapani-logo-red.png" alt="Hookkapaani" className="w-full h-auto object-contain mx-auto" />
          </div>

          {/* Owner direction 2026-10-19: no headline copy in the hero —
              the work speaks first. H1 kept for screen readers/SEO only. */}
          <h1 className="sr-only">Hookkapaani — kinetic sculpture studio of Vishal Gupta</h1>

          <div
            className={`w-full mt-10 md:mt-12 transition-all duration-700 delay-200 ${
              titleInView || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative">
              <div
                className="relative aspect-video overflow-hidden bg-black/40 border border-white/[0.06]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {heroSlides.map((s, i) => (
                  <video
                    key={s.src}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={s.src}
                    loop
                    muted
                    playsInline
                    preload={i === 0 ? 'auto' : 'metadata'}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: activeSlide === i ? 1 : 0 }}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <Link
                  href={slide.href}
                  className="absolute bottom-4 left-5 md:bottom-6 md:left-8 flex items-center gap-3 bg-black/35 border border-white/15 rounded-full px-4 py-2 backdrop-blur-md hover:border-accent transition-colors"
                >
                  <span className="text-accent text-2xl md:text-4xl font-mono font-bold leading-none">
                    {String(activeSlide + 1).padStart(2, '0')}
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block text-sm md:text-base font-semibold text-white">{slide.caption}</span>
                    <span className="block text-xs md:text-sm text-white/70">{slide.detail}</span>
                  </span>
                </Link>

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

              <div className="flex justify-center gap-2.5 mt-4">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      activeSlide === i ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/commission"
              className="px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors min-h-[44px] flex items-center"
            >
              Commission a work
            </Link>
            <Link
              href="/#work"
              className="px-8 py-4 border border-border font-medium tracking-wide hover:border-accent hover:text-accent transition-colors min-h-[44px] flex items-center"
            >
              See the works
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  );
}
