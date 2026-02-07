"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "12", label: "Years of Practice" },
  { value: "34", label: "Completed Works" },
  { value: "8", label: "Countries" },
  { value: "6", label: "Residencies" },
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
              Our practice operates at the intersection of architecture and
              sculptural art. Each project begins as a material study — an
              investigation into how stone, steel, and concrete can hold space,
              capture light, and evoke the monumental in the everyday. We design
              structures that are experienced as objects and sculptures that
              function as spaces.
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
