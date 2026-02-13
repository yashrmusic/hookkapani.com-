'use client';

import { useState } from 'react';
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
    src: '/images/project1.png',
    title: 'Orbital Equilibrium',
    description: 'Mirror-finished stainless steel spheres creating shifting reflections.',
    category: 'workspace',
  },
  {
    id: '2',
    src: '/images/project2.png',
    title: 'Prismatic Anatomy',
    description: 'Bronze facets exploring organic structural logic.',
    category: 'process',
  },
  {
    id: '3',
    src: '/images/project3.png',
    title: 'Crimson Resonance',
    description: 'Wave-like red planes creating rhythmic visual pulse.',
    category: 'tools',
  },
  {
    id: '4',
    src: '/images/project4.png',
    title: 'Echo of the Sitar',
    description: 'Wireframe sculpture capturing musical vibrations.',
    category: 'process',
  },
  {
    id: '5',
    src: '/images/project5.png',
    title: 'Obsidian Pulse',
    description: 'Black monolithic kinetic sculpture in ancient ruins.',
    category: 'process',
  },
  {
    id: '6',
    src: '/images/project6.png',
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

  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setLightboxImage(null), 200);
  };

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
                ${
                  selectedCategory === cat.value
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
              className="group relative aspect-[4/3] bg-secondary overflow-hidden cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* Info Box */}
        <div
          className={`mt-16 bg-secondary/30 p-8 md:p-12 border-l-4 border-accent transition-all duration-600 delay-600 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl font-semibold mb-4">Visit the Studio</h3>
          <p className="text-muted-foreground mb-6">
            Interested in seeing the fabrication process in person? We welcome
            collectors, curators, and fellow artists to visit our workshop by
            appointment. See works in progress, discuss custom commissions, and
            experience our approach to kinetic sculpture firsthand.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
          >
            Schedule a Visit
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-md p-4 transition-opacity duration-200 ${lightboxVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-secondary hover:bg-accent hover:text-accent-foreground transition-all"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                quality={100}
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
