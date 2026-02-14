'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { artworks } from '../data/artworks';

const stats = [
  { value: artworks.length, suffix: "", label: "Works Created" },
  { value: 3, suffix: "", label: "Categories" },
  { value: 6, suffix: "+", label: "Years Active" },
  { value: 1, suffix: "", label: "Studio, New Delhi" },
];

function AnimatedStat({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof stats)[0];
  index: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const duration = 1200;
    const startTime = Date.now();
    const target = stat.value;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [stat.value]);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(animate, 400 + index * 200);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, animate, index]);

  return (
    <div
      className="border-t border-accent-foreground/20 pt-6 transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${400 + index * 150}ms`,
      }}
    >
      <p className="font-serif text-4xl text-accent-foreground md:text-5xl">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs tracking-[0.15em] uppercase text-accent-foreground/50">
        {stat.label}
      </p>
    </div>
  );
}

export function Practice() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="practice"
      className="bg-accent py-32 px-6 md:px-10 lg:px-16"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div
            className="transition-all duration-800 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
              transitionDuration: "800ms",
            }}
          >
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-accent-foreground/50">
              About the Studio
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-accent-foreground md:text-5xl">
              Industrial materials,
              <br />
              kinetic poetry.
            </h2>
          </div>
          <div
            className="flex flex-col justify-end transition-all ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transitionDuration: "800ms",
              transitionDelay: "200ms",
            }}
          >
            <p className="text-base leading-relaxed text-accent-foreground/70 md:text-lg">
              Operating from our workshop in New Delhi, Hookkapaani explores the intersection
              of industrial fabrication and artistic expression. We work with steel, bronze,
              aluminum, and found materials to create sculptures that move, breathe, and evolve.
              Each piece is a dialogue between mechanical precision and organic fluidity—
              celebrating the beauty of raw materials, honest construction, and the passage of time.
            </p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              stat={stat}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
