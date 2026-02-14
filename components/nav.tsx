'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#work', label: 'Works' },
  { href: '#studio', label: 'Studio' },
  { href: '#commission', label: 'Commission' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-background/95 backdrop-blur-md border-b border-border'
        : 'bg-background/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none'
        }`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tighter hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center"
          >
            HOOKKAPAANI
          </Link>

          {/* Desktop Nav — only visible on lg (1024px+) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors py-2 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button — visible below lg */}
          <button
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-[2px] w-full bg-foreground transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block h-[2px] w-full bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[2px] w-full bg-foreground transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu — slides down with solid bg */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-2 text-base font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors min-h-[44px] flex items-center rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Extra padding for bottom safe area on notched phones */}
          <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      </div>
    </nav>
  );
}
