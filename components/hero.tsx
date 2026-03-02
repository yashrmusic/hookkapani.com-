'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-intersection-observer';
import Image from 'next/image';

const heroVideos = [
  { src: '/videos/video1.mp4', label: 'Kinetic Motion 1' },
  { src: '/videos/video2.mp4', label: 'Kinetic Motion 2' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div className="container mx-auto px-4 sm:px-6 z-10" style={{ opacity }}>
        <div className="max-w-6xl mx-auto flex flex-col items-center">

          {/* Logo */}
          <div
            ref={titleRef}
            className={`mb-10 md:mb-16 transition-all duration-700 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Image
              src="/placeholder-logo.svg"
              alt="Hookkapaani Studio"
              width={280}
              height={80}
              className="w-[200px] sm:w-[260px] md:w-[320px] h-auto invert"
              priority
            />
          </div>

          {/* Video Showcase */}
          <div
            className={`w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-700 delay-300 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {heroVideos.map((video, i) => (
              <div key={video.src} className="group relative">
                {/* Video container */}
                <div className="relative aspect-video overflow-hidden bg-black/40 border border-white/[0.06]">
                  <video
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Label */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-accent/40 text-3xl md:text-4xl font-mono font-bold leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-white tracking-tight">
                      {video.label}
                    </p>
                    <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mt-0.5">
                      Looping · Autoplay
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore Works CTA */}
          <div
            className={`mt-14 md:mt-20 flex flex-col items-center gap-4 transition-all duration-700 delay-700 ${(titleInView || isLoaded) ? 'opacity-100' : 'opacity-0'}`}
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
