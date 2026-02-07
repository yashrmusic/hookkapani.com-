"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Threshold",
    year: "2024",
    location: "Lisbon, Portugal",
    category: "Pavilion & Installation",
    image: "/images/project-1.jpg",
    alt: "Geometric travertine sculpture in open-air courtyard",
  },
  {
    title: "Monolith Rising",
    year: "2023",
    location: "Kyoto, Japan",
    category: "Public Sculpture",
    image: "/images/project-2.jpg",
    alt: "Corten steel sculpture integrated into concrete architecture",
  },
  {
    title: "Hollow Light",
    year: "2023",
    location: "Copenhagen, Denmark",
    category: "Gallery Exhibition",
    image: "/images/project-3.jpg",
    alt: "Abstract marble sculptures on minimal pedestals in a gallery",
  },
  {
    title: "Erosion Studies",
    year: "2022",
    location: "Marrakech, Morocco",
    category: "Residency Work",
    image: "/images/project-4.jpg",
    alt: "Close-up detail of hand-carved sandstone sculpture surface",
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/20" />
      </div>
      <div className="mt-5 flex items-start justify-between">
        <div>
          <h3 className="font-serif text-xl tracking-tight text-foreground md:text-2xl">
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

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-muted-foreground">
              Selected Work
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Projects
            </h2>
          </div>
          <a
            href="#"
            className="hidden text-xs tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            View Archive
          </a>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
