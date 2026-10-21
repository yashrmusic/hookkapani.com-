'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView } from '../hooks/use-intersection-observer';

interface StudioImage {
  id: string;
  src: string;
  title: string;
  description: string;
  category: 'workspace' | 'process' | 'tools' | 'detail';
}

const studioImages: StudioImage[] = [
  {
    id: '1',
    src: '/images/new-work-1.jpg',
    title: 'Orbital Equilibrium',
    description: 'Mirror-finished stainless steel spheres creating shifting reflections.',
    category: 'workspace',
  },
  {
    id: '2',
    src: '/images/new-work-2.jpg',
    title: 'Prismatic Anatomy',
    description: 'Bronze facets exploring organic structural logic.',
    category: 'process',
  },
  {
    id: '3',
    src: '/images/new-work-3.jpg',
    title: 'Crimson Resonance',
    description: 'Wave-like red planes creating rhythmic visual pulse.',
    category: 'tools',
  },
  {
    id: '4',
    src: '/images/new-work-4.jpg',
    title: 'Echo of the Sitar',
    description: 'Wireframe sculpture capturing musical vibrations.',
    category: 'process',
  },
  {
    id: '5',
    src: '/images/new-work-5.jpg',
    title: 'Obsidian Pulse',
    description: 'Black monolithic kinetic sculpture in ancient ruins.',
    category: 'process',
  },
  {
    id: '6',
    src: '/images/new-work-6.jpg',
    title: 'Lunar Dialogue',
    description: 'Stark white monoliths in high-altitude desert.',
    category: 'detail',
  },
];

export function StudioGallery() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<StudioImage | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'workspace', label: 'Workspace' },
    { value: 'process', label: 'Process' },
    { value: 'tools', label: 'Tools' },
    { value: 'detail', label: 'Details' },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? studioImages
      : studioImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: StudioImage) => {
    setLightboxImage(image);
    setTimeout(() => setLightboxVisible(true), 10);
  };

  const closeLightbox = useCallback(() => {
    setLightboxVisible(false);
    setTimeout(() => setLightboxImage(null), 200);
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 20);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
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
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxImage, closeLightbox]);

  useEffect(() => {
    if (!lightboxImage) previousFocusRef.current?.focus();
  }, [lightboxImage]);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`mb-12 max-w-3xl transition-all duration-600 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-headline mb-6">Inside the Studio</h2>
          <p className="text-body text-muted-foreground">
            A glimpse into our workshop in New Delhi—where raw materials transform
            into kinetic sculptures through hands-on fabrication, welding, and
            mechanical assembly.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap gap-3 mb-12 transition-all duration-600 delay-200 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`
                px-6 py-3 text-sm font-medium uppercase tracking-wider
                border-2 transition-all duration-300
                ${selectedCategory === cat.value
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-transparent text-foreground border-border hover:border-accent hover:text-accent'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-600 delay-400 ${sectionInView ? 'opacity-100' : 'opacity-0'}`}
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] bg-secondary overflow-hidden"
            >
              <button
                type="button"
                onClick={() => openLightbox(image)}
                aria-label={`Open ${image.title} larger`}
                className="absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </button>

              {/* Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxImage.title} — studio image`}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-md p-4 transition-opacity duration-200 ${lightboxVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close image"
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-secondary hover:bg-accent hover:text-accent-foreground transition-all"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] mb-6">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
                quality={82}
              />
            </div>
            <div className="bg-secondary p-6">
              <h3 className="text-2xl font-semibold mb-2">{lightboxImage.title}</h3>
              <p className="text-muted-foreground">{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
