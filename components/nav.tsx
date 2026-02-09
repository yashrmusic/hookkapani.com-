"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md py-4"
          : "mix-blend-difference"
      } ${mounted ? "animate-fade-in" : "opacity-0"}`}
      style={{ animationDelay: "0.2s" }}
    >
      <a
        href="#"
        className={`text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
          scrolled ? "text-foreground" : "text-background"
        }`}
      >
        Abhigyan x Vishal
      </a>

      <div className="hidden md:flex items-center gap-10">
        {["Projects", "Practice", "Contact"].map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-60 ${
              scrolled ? "text-foreground" : "text-background"
            } ${mounted ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
          >
            ({item})
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`md:hidden transition-colors duration-300 ${
          scrolled ? "text-foreground" : "text-background"
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className="text-sm tracking-[0.15em] uppercase">
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-accent flex flex-col items-center justify-center gap-10 md:hidden animate-fade-in">
          <button
            type="button"
            className="absolute top-5 right-6 text-accent-foreground text-sm tracking-[0.15em] uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          {["Projects", "Practice", "Contact"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl tracking-[0.15em] uppercase text-accent-foreground animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setMenuOpen(false)}
            >
              ({item})
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
