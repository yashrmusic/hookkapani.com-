"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Orbital Equilibrium",
    year: "2024",
    location: "Kashmir, India",
    category: "Stainless Steel Installation",
    image: "/images/new-work-7.png",
    alt: "A stack of mirror-finished stainless steel spheres reflecting a serene lakeside horizon",
  },
  {
    title: "Prismatic Anatomy",
    year: "2024",
    location: "Milan, Italy",
    category: "Polyhedral Sculpture",
    image: "/images/new-work-8.png",
    alt: "A faceted anatomical study in teal bronze with a malachite core in a modern gallery",
  },
  {
    title: "Crimson Resonance",
    year: "2023",
    location: "Lake Como, Italy",
    category: "Kinetic Sculpture",
    image: "/images/new-work-9.png",
    alt: "Large-scale red kinetic installation in a manicured lakeside garden",
  },
  {
    title: "Echo of the Sitar",
    year: "2023",
    location: "New Delhi, India",
    category: "Wireframe Installation",
    image: "/images/new-work-10.png",
    alt: "Intricate metallic wireframe sculpture of a sitar player in a minimalist white space",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 200}ms`,
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0 z-10 bg-accent origin-bottom transition-transform duration-700 ease-out"
          style={{
            transform: isVisible ? "scaleY(0)" : "scaleY(1)",
            transitionDelay: `${200 + index * 200}ms`,
          }}
        />
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          loading="eager"
        />
        <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/20" />
      </div>
      <div className="mt-5 flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl tracking-tight text-foreground md:text-2xl transition-transform duration-300 group-hover:translate-x-2">
            {project.title}
          </h3>
          <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
            {project.category}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
            {project.location}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{project.year}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-16 flex items-end justify-between"
    >
      <div
        className="transition-all ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-30px)",
          transitionDuration: "800ms",
        }}
      >
        <p className="mb-3 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Selected Work
        </p>
        <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Projects
        </h2>
      </div>
      <a
        href="https://www.instagram.com/hookkapaani/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden text-xs tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDuration: "800ms",
          transitionDelay: "300ms",
        }}
      >
        View on Instagram
      </a>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader />
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
