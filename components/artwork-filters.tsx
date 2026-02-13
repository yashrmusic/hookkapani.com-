'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Artwork } from '../data/artworks';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface ArtworkFiltersProps {
  artworks: Artwork[];
  onFilterChange: (filtered: Artwork[]) => void;
}

export function ArtworkFilters({ artworks, onFilterChange }: ArtworkFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique values for filters
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(artworks.map(a => a.category))];
    return cats.map(cat => ({
      value: cat,
      label: cat === 'all' ? 'All Works' : cat.charAt(0).toUpperCase() + cat.slice(1),
      count: cat === 'all' ? artworks.length : artworks.filter(a => a.category === cat).length,
    }));
  }, [artworks]);

  const materials = useMemo(() => {
    const allMaterials = artworks.flatMap(a => a.materials || []);
    const unique = [...new Set(allMaterials)].sort();
    return unique.map(mat => ({
      value: mat,
      label: mat,
      count: artworks.filter(a => a.materials?.includes(mat)).length,
    }));
  }, [artworks]);

  const years = useMemo(() => {
    const unique = [...new Set(artworks.map(a => a.year))].sort().reverse();
    return unique.map(year => ({
      value: year,
      label: year,
      count: artworks.filter(a => a.year === year).length,
    }));
  }, [artworks]);

  // Apply filters
  const filteredArtworks = useMemo(() => {
    let filtered = [...artworks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        a =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.longDescription.toLowerCase().includes(query) ||
          a.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    // Materials filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(a =>
        selectedMaterials.some(mat => a.materials?.includes(mat))
      );
    }

    // Years filter
    if (selectedYears.length > 0) {
      filtered = filtered.filter(a => selectedYears.includes(a.year));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.year.localeCompare(a.year);
        case 'oldest':
          return a.year.localeCompare(b.year);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [artworks, searchQuery, selectedCategory, selectedMaterials, selectedYears, sortBy]);

  // Update parent when filters change
  useEffect(() => {
    onFilterChange(filteredArtworks);
  }, [filteredArtworks, onFilterChange]);

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleYearToggle = (year: string) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMaterials([]);
    setSelectedYears([]);
    setSortBy('newest');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedMaterials.length +
    selectedYears.length +
    (searchQuery ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search artworks, materials, tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-secondary border-2 border-border focus:border-accent focus:outline-none transition-colors"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
          className="px-4 py-3 bg-secondary border-2 border-border focus:border-accent focus:outline-none transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">By Title</option>
        </select>

        {/* Expand/Collapse Filters Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-6 py-3 bg-secondary border-2 border-border hover:border-accent hover:text-accent transition-all whitespace-nowrap"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Pills (Always Visible) */}
      <div className="flex flex-wrap gap-3">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`
              px-6 py-3 text-sm font-medium uppercase tracking-wider
              border-2 transition-all duration-300 touch-target
              ${selectedCategory === cat.value
                ? 'bg-accent text-accent-foreground border-accent'
                : 'bg-transparent text-foreground border-border hover:border-accent hover:text-accent'
              }
            `}
          >
            {cat.label}
            <span className="ml-2 text-xs opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Expanded Filters */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-secondary/30 border-l-4 border-accent">
          {/* Materials Filter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Materials
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {materials.map(mat => (
                <label
                  key={mat.value}
                  className="flex items-center gap-3 cursor-pointer hover:text-accent transition-colors touch-target"
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(mat.value)}
                    onChange={() => handleMaterialToggle(mat.value)}
                    className="w-5 h-5 accent-accent"
                  />
                  <span className="text-sm">
                    {mat.label} ({mat.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Years Filter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Year
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {years.map(year => (
                <label
                  key={year.value}
                  className="flex items-center gap-3 cursor-pointer hover:text-accent transition-colors touch-target"
                >
                  <input
                    type="checkbox"
                    checked={selectedYears.includes(year.value)}
                    onChange={() => handleYearToggle(year.value)}
                    className="w-5 h-5 accent-accent"
                  />
                  <span className="text-sm">
                    {year.label} ({year.count})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {activeFilterCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Clear All Filters ({activeFilterCount})
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredArtworks.length} of {artworks.length} artworks
        {activeFilterCount > 0 && ` (${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active)`}
      </div>
    </div>
  );
}
