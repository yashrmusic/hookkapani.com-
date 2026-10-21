'use client';

import { useEffect, useRef, useState } from 'react';

import { artworks } from '../data/artworks';

const stats = [
  { value: String(artworks.length), label: "Works Created" },
  { value: "17 ft", label: "Largest Work — The Bull" },
  { value: "14 weeks", label: "Atrium Commission, Delivered" },
  { value: "6+", label: "Years of Practice" },
];

function Stat({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof stats)[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="border-t border-accent-foreground/20 pt-6 transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <p className="font-serif text-4xl text-accent-foreground md:text-5xl">{stat.value}</p>
      <p className="mt-2 text-sm text-accent-foreground">{stat.label}</p>
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
      className="overflow-x-hidden bg-accent py-32 px-6 md:px-10 lg:px-16"
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
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-accent-foreground">
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
            <p className="text-base leading-relaxed text-accent-foreground md:text-lg">
              From its workshop in New Delhi, Hookkapaani works at the meeting point of industrial
              fabrication and artistic expression. We work with steel, bronze, aluminium and found
              materials to create sculptures that move, breathe and evolve. Each piece is a dialogue
              between mechanical precision and organic fluidity — a celebration of raw material,
              honest construction and the passage of time.
            </p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Stat
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
