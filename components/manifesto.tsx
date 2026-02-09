"use client";

import { useEffect, useRef, useState } from "react";

export function Manifesto() {
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
    <section className="py-32 px-6 md:px-10 lg:px-16">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="mb-8 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Manifesto
        </p>
        <blockquote className="font-serif text-3xl leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl">
          We don{"'"}t just make art — we engineer experience. Where
          architecture gives form to space, sculpture breathes life into it.
          What if art could breathe?
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-foreground">
              Abhigyan
            </p>
            <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Architect
            </p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-foreground">
              Vishal Gupta
            </p>
            <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Founder, Hookkapani Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
