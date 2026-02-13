'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/use-intersection-observer';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.3 });
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background industrial-grid"
    >
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-accent/20 rotate-45 rounded-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 border-2 border-rust/20 -rotate-12 rounded-none" />
      </div>

      <div
        className="container mx-auto px-4 z-10"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Main title */}
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-display mb-6 md:mb-8">
              <span className="block glitch" data-text="HOOKKAPAANI">
                HOOKKAPAANI
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mb-8 md:mb-12 transition-all duration-700 delay-200 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p className="text-headline text-muted-foreground max-w-4xl">
              Kinetic sculpture studio exploring the intersection of{' '}
              <span className="text-accent">industrial materials</span>,{' '}
              <span className="text-rust">mechanical motion</span>, and{' '}
              <span className="text-copper">temporal transformation</span>.
            </p>
          </div>

          {/* Download Portfolio Button */}
          <div
            className={`mb-12 md:mb-16 transition-all duration-700 delay-300 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <a
              href="/portfolio.pdf"
              download="Hookkapaani-Portfolio-2024.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-300 border-2 border-accent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Portfolio
            </a>
          </div>

          {/* Info grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl transition-all duration-700 delay-500 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
            className={`mt-20 md:mt-32 flex flex-col items-center gap-4 transition-all duration-700 delay-700 ${titleInView ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-label text-muted-foreground">Explore Works</p>
            <div className="w-[2px] h-16 bg-accent origin-top animate-pulse" />
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
      <div className="text-6xl font-mono font-bold text-accent/20 mb-4 transition-colors group-hover:text-accent/40">
        {number}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-3 transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 translate-x-2 translate-y-2" />
    </div>
  );
}
