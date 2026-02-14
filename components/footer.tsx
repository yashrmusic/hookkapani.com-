'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
      id="contact"
      className="bg-secondary/30 border-t border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h3 className="text-2xl font-bold mb-4">Hookkapaani</h3>
            <p className="text-muted-foreground mb-6">
              Kinetic sculpture studio exploring industrial materials, mechanical motion, and temporal transformation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/hookkapaani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#work" className="text-muted-foreground hover:text-accent transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="#studio" className="text-muted-foreground hover:text-accent transition-colors">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="#commission" className="text-muted-foreground hover:text-accent transition-colors">
                  Commission
                </Link>
              </li>
              <li>
                <Link href="/portfolio.pdf" className="text-muted-foreground hover:text-accent transition-colors">
                  Download Portfolio
                </Link>
              </li>
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>New Delhi, India</li>
              <li>
                <a href="mailto:studio@hookkapaani.com" className="hover:text-accent transition-colors">
                  studio@hookkapaani.com
                </a>
              </li>
              <li>By appointment only</li>
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Studio Hours</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Monday - Friday</li>
              <li>10:00 AM - 6:00 PM IST</li>
              <li className="pt-2 text-sm">Visits by appointment</li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-sm text-muted-foreground">(c) {new Date().getFullYear()} Hookkapaani. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">
            Crafting movement. Carving meaning.
          </p>
        </div>
        <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </footer>
  );
}
