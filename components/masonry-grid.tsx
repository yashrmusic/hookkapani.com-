'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../hooks/use-media-query';

interface MasonryGridProps {
  children: ReactNode[];
  columnCount?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
  className?: string;
}

export function MasonryGrid({
  children,
  columnCount = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  gap = 24,
  className = '',
}: MasonryGridProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  
  const columns = isMobile 
    ? columnCount.mobile 
    : isTablet 
    ? columnCount.tablet 
    : columnCount.desktop;

  // Distribute children across columns
  const columnWrappers: ReactNode[][] = Array.from({ length: columns || 3 }, () => []);
  
  children.forEach((child, index) => {
    const columnIndex = index % (columns || 3);
    columnWrappers[columnIndex].push(child);
  });

  return (
    <div 
      className={`flex ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnWrappers.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {column.map((item, itemIndex) => (
            <div key={`${columnIndex}-${itemIndex}`}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// CSS Grid based masonry (simpler but less control)
interface SimpleMasonryProps {
  children: ReactNode;
  className?: string;
}

export function SimpleMasonry({ children, className = '' }: SimpleMasonryProps) {
  return (
    <div
      className={`
        grid gap-6
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        auto-rows-max
        ${className}
      `}
      style={{
        gridAutoFlow: 'dense',
      }}
    >
      {children}
    </div>
  );
}

// Advanced CSS Grid masonry with dynamic row spans
export function DynamicMasonry({ children, className = '' }: SimpleMasonryProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridReady, setGridReady] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const resizeGridItems = () => {
      const items = grid.children;
      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
      );
      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
      );

      Array.from(items).forEach((item) => {
        const content = item.querySelector('.masonry-content') as HTMLElement;
        if (!content) return;

        const contentHeight = content.getBoundingClientRect().height;
        const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        
        (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
      });
      
      setGridReady(true);
    };

    // Initial resize
    resizeGridItems();

    // Resize on window resize
    window.addEventListener('resize', resizeGridItems);
    
    // Observe image loading
    const images = grid.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('load', resizeGridItems);
    });

    return () => {
      window.removeEventListener('resize', resizeGridItems);
      images.forEach((img) => {
        img.removeEventListener('load', resizeGridItems);
      });
    };
  }, [children]);

  return (
    <div
      ref={gridRef}
      className={`
        grid gap-6
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        auto-rows-[10px]
        ${!gridReady ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
