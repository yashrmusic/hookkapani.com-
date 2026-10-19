'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { Artwork } from '../data/artworks';
import { isMoving, sizeBand, materialFamily, type SizeBand, type MaterialFamily } from '@/lib/artwork-utils';

interface ArtworkFiltersProps {
  artworks: Artwork[];
  onFilterChange: (filtered: Artwork[]) => void;
}

type MoveFilter = 'all' | 'moving' | 'static';
type SizeFilter = 'all' | SizeBand;
type FamilyFilter = 'all' | MaterialFamily;

const moveOptions: { value: MoveFilter; label: string }[] = [
  { value: 'all', label: 'All works' },
  { value: 'moving', label: 'Moving' },
  { value: 'static', label: 'Static' },
];

const sizeOptions: { value: SizeFilter; label: string }[] = [
  { value: 'all', label: 'Any size' },
  { value: 'under6', label: 'Under 6 ft' },
  { value: '6to10', label: '6–10 ft' },
  { value: 'over10', label: 'Over 10 ft' },
];

const familyOptions: { value: FamilyFilter; label: string }[] = [
  { value: 'all', label: 'All materials' },
  { value: 'Steel & metal', label: 'Steel & metal' },
  { value: 'Resin & fibre', label: 'Resin & fibre' },
  { value: 'Mixed media', label: 'Mixed media' },
];

export function ArtworkFilters({ artworks, onFilterChange }: ArtworkFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [move, setMove] = useState<MoveFilter>('all');
  const [size, setSize] = useState<SizeFilter>('all');
  const [family, setFamily] = useState<FamilyFilter>('all');
  const hydratedFromUrl = useRef(false);

  // Read the starting filters from the URL once (shareable filtered views).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('move');
    const s = params.get('size');
    const f = params.get('family');
    const q = params.get('q');
    if (m === 'moving' || m === 'static') setMove(m);
    if (s === 'under6' || s === '6to10' || s === 'over10') setSize(s);
    if (f === 'Steel & metal' || f === 'Resin & fibre' || f === 'Mixed media') setFamily(f);
    if (q) setSearchQuery(q);
    hydratedFromUrl.current = true;
  }, []);

  const filteredArtworks = useMemo(() => {
    let filtered = [...artworks];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.materials.some((mat) => mat.toLowerCase().includes(query)) ||
          a.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    if (move !== 'all') {
      filtered = filtered.filter((a) => (move === 'moving' ? isMoving(a) : !isMoving(a)));
    }
    if (size !== 'all') {
      filtered = filtered.filter((a) => sizeBand(a) === size);
    }
    if (family !== 'all') {
      filtered = filtered.filter((a) => materialFamily(a) === family);
    }
    return filtered;
  }, [artworks, searchQuery, move, size, family]);

  useEffect(() => {
    onFilterChange(filteredArtworks);
    if (!hydratedFromUrl.current) return;
    const params = new URLSearchParams();
    if (move !== 'all') params.set('move', move);
    if (size !== 'all') params.set('size', size);
    if (family !== 'all') params.set('family', family);
    if (searchQuery) params.set('q', searchQuery);
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }, [filteredArtworks, onFilterChange, move, size, family, searchQuery]);

  const activeFilterCount =
    (move !== 'all' ? 1 : 0) + (size !== 'all' ? 1 : 0) + (family !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0);

  const clearAll = () => {
    setSearchQuery('');
    setMove('all');
    setSize('all');
    setFamily('all');
  };

  const chip = (active: boolean) =>
    `px-5 py-2.5 text-sm font-medium border-2 transition-all duration-200 min-h-[44px] ${
      active
        ? 'bg-accent text-accent-foreground border-accent'
        : 'bg-transparent text-foreground border-border hover:border-accent hover:text-accent'
    }`;

  return (
    <div className="space-y-6">
      <div className="relative max-w-xl">
        <input
          type="text"
          placeholder="Search works, materials, tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-secondary border-2 border-border focus:border-accent focus:outline-none transition-colors"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Movement</p>
          <div className="flex flex-wrap gap-2">
            {moveOptions.map((o) => (
              <button key={o.value} onClick={() => setMove(o.value)} className={chip(move === o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((o) => (
              <button key={o.value} onClick={() => setSize(o.value)} className={chip(size === o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Material</p>
          <div className="flex flex-wrap gap-2">
            {familyOptions.map((o) => (
              <button key={o.value} onClick={() => setFamily(o.value)} className={chip(family === o.value)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredArtworks.length} of {artworks.length} works
        </p>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-sm text-accent hover:text-accent/80 transition-colors">
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
