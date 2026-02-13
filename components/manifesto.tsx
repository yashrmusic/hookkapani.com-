'use client';

import { useEffect, useRef, useState } from 'react';

const quoteWords =
  "We don't just make sculptures — we engineer motion. Where steel meets soul, and mechanics become poetry. Art that breathes, moves, and transforms.".split(
    " "
  );

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
    <section className="py-32 px-6 md:px-10 lg:px-16 bg-background">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <p
          className={`mb-8 text-xs tracking-[0.4em] uppercase text-muted-foreground transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Manifesto
        </p>
        <blockquote className="font-serif text-3xl leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {quoteWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block transition-all ease-out mr-[0.25em]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0)"
                  : "translateY(12px)",
                transitionDuration: "600ms",
                transitionDelay: `${200 + i * 50}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </blockquote>
        <div
          className={`mt-12 flex items-center justify-center gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: isVisible ? "1.8s" : "0s" }}
        >
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-foreground">
              Vishal Gupta
            </p>
            <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Founder & Lead Artist
            </p>
          </div>
          <div
            className={`h-8 w-px bg-border transition-transform duration-700 origin-top ${
              isVisible ? "scale-y-100" : "scale-y-0"
            }`}
            style={{ transitionDelay: isVisible ? "2s" : "0s" }}
          />
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-foreground">
              Hookkapaani Studio
            </p>
            <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              New Delhi, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
