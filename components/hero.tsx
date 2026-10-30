'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/use-intersection-observer';

const heroSlides = [
  { src: '/videos/video1-720.mp4', poster: '/images/new-work-28.jpg', caption: 'Medusa', detail: '12 ft · moving sculpture', href: '/work/medusa' },
  { src: '/videos/video2-720.mp4', poster: '/images/new-work-22.jpg', caption: 'Forest Lady', detail: '8 ft · moving sculpture', href: '/work/forest-lady' },
  { src: '/videos/video3-720.mp4', poster: '/images/new-work-36.jpg', caption: 'Works in motion', detail: 'Hookkapani Studio, New Delhi', href: '/#work' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.1 });
  // Start visible so the served HTML is at full opacity for crawlers
  // that do not scroll or run the load timer.
  const [isLoaded, setIsLoaded] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
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
      if (i === activeSlide && !reducedMotion && !isUserPaused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeSlide, reducedMotion, isUserPaused]);

  const goToSlide = useCallback((idx: number) => setActiveSlide(idx), []);
  const goNext = useCallback(() => setActiveSlide((p) => (p + 1) % heroSlides.length), []);
  const goPrev = useCallback(() => setActiveSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (isHovered || isUserPaused || reducedMotion) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, isUserPaused, reducedMotion]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  const slide = heroSlides[activeSlide];
  const isPaused = isUserPaused || reducedMotion;

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

      <div className="container mx-auto px-4 sm:px-6 z-10 pt-24 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div
            ref={titleRef}
            className={`w-full max-w-xl mb-8 md:mb-10 transition-all duration-700 ${
              titleInView || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Image
              src="/images/hookkapani-logo-red.png"
              alt="Hookkapani"
              width={1119}
              height={246}
              priority
              sizes="(max-width: 768px) 90vw, 576px"
              className="w-full h-auto object-contain mx-auto"
            />
          </div>

          {/* Owner direction 2026-10-19: no headline copy in the hero —
              the work speaks first. H1 kept for screen readers/SEO only. */}
          <h1 className="sr-only">Hookkapani — kinetic sculpture studio of Vishal Gupta</h1>

          <div
            className={`w-full mt-8 md:mt-10 transition-all duration-700 delay-200 ${
              titleInView || isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div
              className="relative"
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured works"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onFocusCapture={() => setIsHovered(true)}
              onBlurCapture={() => setIsHovered(false)}
            >
              <div
                className="relative aspect-video overflow-hidden bg-black/40 border border-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {heroSlides.map((s, i) => (
                  <video
                    key={s.src}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={s.src}
                    poster={s.poster}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden={activeSlide !== i}
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
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label="Previous artwork"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label="Next artwork"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUserPaused((p) => !p)}
                  className="absolute top-3 right-3 md:top-5 md:right-5 w-9 h-9 flex items-center justify-center bg-black/35 hover:bg-black/55 text-white rounded-full transition-colors backdrop-blur-sm"
                  aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                >
                  {isPaused ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex justify-center gap-2.5 mt-4">
                {heroSlides.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      activeSlide === i ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={activeSlide === i ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4">
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
