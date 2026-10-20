'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'hk-shortlist';

interface ShortlistCtx {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const Ctx = createContext<ShortlistCtx>({ ids: [], toggle: () => {}, has: () => false, clear: () => {} });

export function useShortlist() {
  return useContext(Ctx);
}

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
    },
    [ids, persist]
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo(() => ({ ids, toggle, has, clear }), [ids, toggle, has, clear]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function ShortlistButton({ artworkId, className = '' }: { artworkId: string; className?: string }) {
  const { has, toggle } = useShortlist();
  const active = has(artworkId);
  return (
    <button
      type="button"
      onClick={() => toggle(artworkId)}
      aria-pressed={active}
      className={`block w-full text-center py-3 px-6 border text-sm font-medium tracking-wide transition-colors min-h-[44px] ${
        active
          ? 'border-accent text-accent bg-accent/10'
          : 'border-border hover:border-accent hover:text-accent'
      } ${className}`}
    >
      {active ? 'Shortlisted ✓ — select to remove' : 'Add to shortlist'}
    </button>
  );
}

export function ShortlistTray() {
  const { ids, clear } = useShortlist();
  const pathname = usePathname();
  if (ids.length === 0 || pathname?.startsWith('/commission')) return null;
  const onWorkPage = pathname?.startsWith('/work/');
  return (
    <div
      className={`fixed ${
        onWorkPage ? 'bottom-20 lg:bottom-4' : 'bottom-4'
      } left-1/2 -translate-x-1/2 z-[70] flex items-center gap-3 bg-[#161616] border border-accent/50 shadow-2xl px-4 py-3 max-w-[94vw]`}
    >
      <span className="text-sm whitespace-nowrap">
        Shortlist · <strong className="text-accent">{ids.length}</strong> {ids.length === 1 ? 'work' : 'works'}
      </span>
      <Link
        href="/commission"
        className="bg-accent text-accent-foreground text-sm font-medium px-4 py-2 whitespace-nowrap hover:bg-accent/90 transition-colors"
      >
        Send with your brief →
      </Link>
      <button type="button" onClick={clear} className="text-xs text-muted-foreground hover:text-foreground whitespace-nowrap">
        Clear
      </button>
    </div>
  );
}
