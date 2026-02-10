"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const titleOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className={`absolute inset-0 transition-transform duration-100 ease-linear ${mounted ? "animate-scale-in" : "opacity-0"}`}
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          animationDuration: "1.5s",
        }}
      >
        <Image
          src="/images/hero.png"
          alt="Golden kinetic sculpture in eternal dialogue with the horizon"
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
        <p
          className={`mb-6 text-xs tracking-[0.4em] uppercase text-background/80 md:text-sm ${mounted ? "animate-letter-spacing" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          Structural Poetry x Kinetic Motion
        </p>
        <h1
          className={`text-center font-serif text-6xl leading-none tracking-tight text-background sm:text-7xl md:text-8xl lg:text-[10rem] ${mounted ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          Abhigyan
          <br />
          x Vishal
        </h1>
        <p
          className={`mt-6 max-w-md text-center text-sm leading-relaxed text-background/70 md:text-base ${mounted ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.9s" }}
        >
          Engineering silence through movement. Curating spaces where
          architecture dissolves into art.
        </p>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 z-10 -translate-x-1/2 ${mounted ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "1.4s" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-background/50">
            Scroll
          </span>
          <div className="h-10 w-px bg-background/30 animate-line-grow" />
        </div>
      </div>
    </section>
  );
}
