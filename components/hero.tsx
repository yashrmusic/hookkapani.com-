'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-intersection-observer';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after a short delay to ensure visibility
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setOpacity(Math.max(0, 1 - currentScrollY / 300));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxY = scrollY * 0.3;

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden bg-background industrial-grid"
      style={{
        /* min-h-screen fallback, then dvh for mobile chrome */
        minHeight: '100vh',
        // @ts-ignore — dvh is valid CSS, TS doesn't know it
        ...({ minHeight: '100dvh' } as React.CSSProperties),
        /* Push content below safe area (iPhone notch) */
        paddingTop: 'max(env(safe-area-inset-top), 0px)',
      }}
    >
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 border-2 border-accent/20 rotate-45 rounded-none" />
        <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 border-2 border-rust/20 -rotate-12 rounded-none" />
      </div>

      <div
        className="container mx-auto px-4 sm:px-6 z-10 pt-20"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Main title */}
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-display mb-4 sm:mb-6 md:mb-8">
              <span className="block glitch" data-text="HOOKKAPAANI">
                HOOKKAPAANI
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mb-6 sm:mb-8 md:mb-12 transition-all duration-700 delay-200 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p className="text-headline text-muted-foreground max-w-4xl">
              Kinetic sculpture studio exploring the intersection of{' '}
              <span className="text-accent">industrial materials</span>,{' '}
              <span className="text-rust">mechanical motion</span>, and{' '}
              <span className="text-copper">temporal transformation</span>.
            </p>
          </div>

          {/* Info grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl transition-all duration-700 delay-500 ${(titleInView || isLoaded) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <InfoCard
              number="01"
              title="Kinetic Sculpture"
              description="Large-scale mechanical sculptures that explore motion, balance, and material properties"
            />
            <InfoCard
              number="02"
              title="Industrial Aesthetic"
              description="Raw materials and honest construction celebrating manufacturing heritage"
            />
            <InfoCard
              number="03"
              title="Temporal Art"
              description="Works that evolve through oxidation, wear, and environmental interaction"
            />
          </div>

          {/* Scroll indicator */}
          <div
            className={`mt-12 sm:mt-16 md:mt-20 lg:mt-32 flex flex-col items-center gap-4 transition-all duration-700 delay-700 ${(titleInView || isLoaded) ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-label text-muted-foreground">Explore Works</p>
            <div className="w-[2px] h-12 sm:h-16 bg-accent origin-top animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </section>
  );
}

interface InfoCardProps {
  number: string;
  title: string;
  description: string;
}

function InfoCard({ number, title, description }: InfoCardProps) {
  const [ref, inView] = useInView({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-600 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold text-accent/20 mb-2 sm:mb-4 transition-colors group-hover:text-accent/40">
        {number}
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 translate-x-2 translate-y-2" />
    </div>
  );
}
