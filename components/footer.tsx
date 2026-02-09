"use client";

import { useEffect, useRef, useState } from "react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
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
    <footer
      ref={ref}
      className="border-t border-border px-6 py-12 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <p className="font-serif text-lg text-foreground">
              Abhigyan x Vishal
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Architecture & Sculpture
            </p>
          </div>

          <div
            className="flex flex-col gap-2 transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "150ms",
            }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Connect
            </p>
            <a
              href="https://www.instagram.com/hookkapani/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Instagram
            </a>
            <a
              href="https://hookkapani.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Hookkapani Studio
            </a>
          </div>

          <div
            className="flex flex-col gap-2 md:items-end transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "300ms",
            }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Studio
            </p>
            <p className="text-sm text-foreground">New Delhi, India</p>
            <p className="text-sm text-foreground">Hookkapani Studio</p>
            <p className="text-sm text-muted-foreground">
              By appointment only
            </p>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: "500ms",
          }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {"Abhigyan x Vishal 2025. All rights reserved."}
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Crafting movement. Carving meaning.
          </p>
        </div>
      </div>
    </footer>
  );
}
