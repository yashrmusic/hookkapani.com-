"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const titleOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Architectural sculpture installation in a concrete gallery space"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-accent/40" />
      </div>

      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
        style={{ opacity: titleOpacity }}
      >
        <p className="mb-6 text-xs tracking-[0.4em] uppercase text-background/80 md:text-sm">
          Architecture x Kinetic Sculpture
        </p>
        <h1 className="text-center font-serif text-6xl leading-none tracking-tight text-background sm:text-7xl md:text-8xl lg:text-[10rem]">
          Abhigyan<br />
          x Vishal
        </h1>
        <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-background/70 md:text-base">
          Crafting movement. Carving meaning. Where architecture meets kinetic
          art and site-specific installations.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-background/50">
            Scroll
          </span>
          <div className="h-10 w-px bg-background/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
