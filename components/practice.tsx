"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "5+", label: "Services Offered" },
  { value: "50+", label: "Completed Works" },
  { value: "1", label: "Studio, New Delhi" },
  { value: "2", label: "Creative Disciplines" },
];

export function Practice() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="practice"
      className="bg-accent py-32 px-6 md:px-10 lg:px-16"
    >
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-accent-foreground/50">
              About the Practice
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-accent-foreground md:text-5xl">
              Two disciplines,
              <br />
              one language.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-relaxed text-accent-foreground/70 md:text-lg">
              Based in the heart of New Delhi, this collaboration fuses
              traditional craftsmanship with experimental thinking. From kinetic
              sculptures and wooden installations to large-scale architectural
              art and custom fabrication — we create works that move, react, and
              resonate. Every project bridges poetic concept and
              production-grade reality.
            </p>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-accent-foreground/20 pt-6">
              <p className="font-serif text-4xl text-accent-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs tracking-[0.15em] uppercase text-accent-foreground/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
