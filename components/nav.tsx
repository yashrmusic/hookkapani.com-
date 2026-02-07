"use client";

import { useState } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16 mix-blend-difference">
      <a
        href="#"
        className="text-sm tracking-[0.2em] uppercase text-background"
      >
        Form & Matter
      </a>

      <div className="hidden md:flex items-center gap-10">
        {["Projects", "Practice", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-60"
          >
            ({item})
          </a>
        ))}
      </div>

      <button
        type="button"
        className="md:hidden text-background"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className="text-sm tracking-[0.15em] uppercase">
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-accent flex flex-col items-center justify-center gap-10 md:hidden">
          <button
            type="button"
            className="absolute top-5 right-6 text-accent-foreground text-sm tracking-[0.15em] uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          {["Projects", "Practice", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl tracking-[0.15em] uppercase text-accent-foreground"
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
