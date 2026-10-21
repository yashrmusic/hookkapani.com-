'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MagneticButton } from '@/components/magnetic-button';

const navLinks = [
  { href: '/#work', label: 'Works' },
  { href: '/case-studies', label: 'Projects' },
  { href: '/studio', label: 'Studio' },
  { href: '/press-kit', label: 'Press' },
  { href: '/portfolio', label: 'Portfolio' },
];

export function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        navRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) || []
      ).filter((el) => el.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

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

  // Work detail pages carry their own back/share bar, so the global nav would
  // otherwise sit on top of it.
  if (pathname?.startsWith('/work/')) return null;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled
        ? 'bg-[#0d0d0d] border-b border-border'
        : 'bg-[#0d0d0d]/95'
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
            style={{ color: '#fafafa', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
          >
            H/K
          </Link>

          {/* Desktop Nav — only visible on lg (1024px+) */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <MagneticButton key={link.href}>
                {link.href.endsWith('.pdf') ? (
                  <a
                    href={link.href}
                    download="Hookkapaani_Portfolio_2026.pdf"
                    className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors py-2 px-4 block"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors py-2 px-4 block"
                  >
                    {link.label}
                  </Link>
                )}
              </MagneticButton>
            ))}
            <Link
              href="/commission"
              className="ml-2 px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors min-h-[44px] flex items-center"
            >
              Commission
            </Link>
          </div>

          {/* Mobile Menu Button — visible below lg */}
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => (isMobileMenuOpen ? closeMenu() : setIsMobileMenuOpen(true))}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
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
          id="mobile-menu"
          aria-hidden={!isMobileMenuOpen}
          className={`lg:hidden overflow-y-auto bg-background transition-all duration-300 ${
            isMobileMenuOpen
              ? 'visible h-[calc(100dvh-4rem)] opacity-100'
              : 'invisible h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1">
            {navLinks.map((link) => (
              link.href.endsWith('.pdf') ? (
                <a
                  key={link.href}
                  href={link.href}
                  download="Hookkapaani_Portfolio_2026.pdf"
                  className="block py-3 px-2 text-base font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors min-h-[44px] flex items-center rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-2 text-base font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors min-h-[44px] flex items-center rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              href="/commission"
              className="block py-3 px-2 text-base font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors min-h-[44px] flex items-center rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Commission a work
            </Link>
          </div>
          {/* Extra padding for bottom safe area on notched phones */}
          <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      </div>
    </nav>
  );
}
