export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl?: string;
  aspectRatio: number;
  category: 'sculpture' | 'installation' | 'kinetic';
  materials: string[];
  dimensions?: string;
  description?: string;
  tags: string[];
  modelUrl?: string;
}

export const artworks: Artwork[] = [
  {
    id: "new-work-1",
    title: "Sitting Monkey",
    imageUrl: "/images/new-work-1.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Ceramic", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-2",
    title: "The Bear",
    imageUrl: "/images/new-work-2.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Steel Mesh"],
    tags: ["New Work", "Contemplative"]
  },
  {
    id: "new-work-3",
    title: "Rebirth in Silence",
    imageUrl: "/images/new-work-3.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Terracotta", "LEDs", "Silk Plants"],
    tags: ["New Work", "Goddess"]
  },
  {
    id: "new-work-4",
    title: "The Sitting Bear",
    imageUrl: "/images/new-work-4.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Gilded Wood", "Lacquer"],
    tags: ["New Work", "Astro-Bunny"]
  },
  {
    id: "new-work-5",
    title: "Sitting Bear",
    imageUrl: "/images/new-work-5.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Cast Resin", "Fabric"],
    tags: ["New Work", "Satire"]
  },
  {
    id: "new-work-6",
    title: "Steel Balls",
    imageUrl: "/images/new-work-6.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Acrylic", "Steel"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-7",
    title: "Metal Sphere",
    imageUrl: "/images/new-work-7.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Ebonized Wood"],
    tags: ["New Work", "Monochrome"]
  },
  {
    id: "new-work-8",
    title: "The Open Gates Soul",
    imageUrl: "/images/new-work-8.jpg",
    aspectRatio: 0.778,
    category: "sculpture",
    materials: ["Gold-Plated Steel"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-9",
    title: "Cosmic Drift",
    imageUrl: "/images/new-work-9.jpg",
    aspectRatio: 0.778,
    category: "sculpture",
    materials: ["Wood", "Glass Eyeball"],
    tags: ["New Work", "Surreal"]
  },
  {
    id: "new-work-10",
    title: "Formless",
    imageUrl: "/images/new-work-10.jpg",
    aspectRatio: 1.37,
    category: "installation",
    materials: ["Layered Acrylic"],
    tags: ["New Work", "Oceanic"]
  },
  {
    id: "new-work-11",
    title: "Chrome Drop",
    imageUrl: "/images/new-work-11.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Matte Ceramic"],
    tags: ["New Work", "Peace"]
  },
  {
    id: "new-work-12",
    title: "Bowling Man",
    imageUrl: "/images/new-work-12.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Stainless Steel", "Resin"],
    dimensions: "8 ft",
    description: "A kinetic-inspired figure balancing industrial heft and fluid posture, built in stainless steel and resin.",
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-13",
    title: "Sangeeta",
    imageUrl: "/images/new-work-13.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "12 ft",
    description: "A vertical stainless-steel statement at monumental scale, designed as a musical and spatial anchor.",
    tags: ["New Work", "Mythic"]
  },
  {
    id: "new-work-14",
    title: "Throne of Steel",
    imageUrl: "/images/new-work-14.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Mixed Media"],
    tags: ["New Work", "Color"]
  },
  {
    id: "new-work-15",
    title: "Formula 1",
    imageUrl: "/images/new-work-15.jpg",
    aspectRatio: 1.5,
    category: "sculpture",
    materials: ["Fiberglass", "Auto Finish"],
    tags: ["New Work", "Wonder"]
  },
  {
    id: "new-work-16",
    title: "The Owl",
    imageUrl: "/images/new-work-16.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Bioplastic"],
    tags: ["New Work", "Organic"]
  },
  {
    id: "new-work-17",
    title: "The Strawberry",
    imageUrl: "/images/new-work-17.jpg",
    videoUrl: "/videos/trippy-strawberry.mp4",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Carbon Fiber", "Matte Resin"],
    tags: ["New Work", "Power"]
  },
  {
    id: "new-work-18",
    title: "Chilled Owl",
    imageUrl: "/images/new-work-18.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Engineered Wood", "Plaster"],
    tags: ["New Work", "Conceptual"]
  },
  {
    id: "new-work-19",
    title: "Gesture of Genius",
    imageUrl: "/images/new-work-19.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Vintage Electronics", "Steel"],
    tags: ["New Work", "Digital"]
  },
  {
    id: "new-work-20",
    title: "Mona Lisa",
    imageUrl: "/images/new-work-20.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin", "Chrome"],
    dimensions: "7 ft",
    description: "A resin-and-chrome reinterpretation of an iconic face, balancing reflective finish with sculptural mass.",
    tags: ["New Work", "Haunting"]
  },
  {
    id: "new-work-21",
    title: "Reclining Buddha",
    imageUrl: "/images/new-work-21.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Glass-Reinforced Plastic"],
    tags: ["New Work", "Avian"]
  },
  {
    id: "new-work-22",
    title: "Forest Lady",
    imageUrl: "/images/new-work-22.jpg",
    videoUrl: "/videos/video2.mp4",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Aluminum", "Carbon Fiber"],
    tags: ["New Work", "Automotive"]
  },
  {
    id: "new-work-23",
    title: "Tiger Man",
    imageUrl: "/images/new-work-23.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Cast Bronze"],
    tags: ["New Work", "Process"]
  },
  {
    id: "new-work-24",
    title: "The Bunny",
    imageUrl: "/images/new-work-24.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Fiberglass", "Acrylic Paint"],
    tags: ["New Work", "Surrealism"]
  },
  {
    id: "new-work-25",
    title: "Drowning Man",
    imageUrl: "/images/new-work-25.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Bronze", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-26",
    title: "The Bull",
    imageUrl: "/images/new-work-26.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Bronze"],
    tags: ["New Work", "Philosophical"]
  },
  {
    id: "new-work-27",
    title: "Table Horse",
    imageUrl: "/images/new-work-27.jpg",
    aspectRatio: 1.5,
    category: "installation",
    materials: ["Found Objects", "Mixed Media"],
    tags: ["New Work", "Mosaic"]
  },
  {
    id: "new-work-28",
    title: "Medusa",
    imageUrl: "/images/new-work-28.jpg",
    videoUrl: "/videos/video1.mp4",
    aspectRatio: 0.667,
    category: "kinetic",
    materials: ["Plexiglass", "LEDs"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-29",
    title: "The Moon",
    imageUrl: "/images/new-work-29.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Cast Resin", "Matte Black Paint"],
    tags: ["New Work", "Alien"]
  },
  {
    id: "new-work-30",
    title: "The Hearing Heart",
    imageUrl: "/images/new-work-30.jpg",
    videoUrl: "/videos/yearning-heart.mov",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-31",
    title: "Golden Petals",
    imageUrl: "/images/new-work-31.jpg",
    aspectRatio: 1.5,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-32",
    title: "Koi Fish",
    imageUrl: "/images/new-work-32.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-33",
    title: "The Apple Cage",
    imageUrl: "/images/new-work-33.jpg",
    aspectRatio: 0.764,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-34",
    title: "Metalic Wave",
    imageUrl: "/images/new-work-34.jpg",
    aspectRatio: 1.339,
    category: "installation",
    materials: ["Soft-Touch Vinyl", "Fiberglass"],
    tags: ["New Work", "Social"]
  },
  {
    id: "new-work-35",
    title: "Forest Panther",
    imageUrl: "/images/new-work-35.jpg",
    aspectRatio: 0.705,
    category: "sculpture",
    materials: ["Polyurethane", "Glass Spheres"],
    tags: ["New Work", "Cosmic"]
  },
  {
    id: "new-work-36",
    title: "Fish in Spectrum",
    imageUrl: "/images/new-work-36.jpg",
    aspectRatio: 1.5,
    category: "installation",
    materials: ["Optical Fiber", "Translucent Resin"],
    tags: ["New Work", "Light"]
  },
  {
    id: "new-work-37",
    title: "King Kong",
    imageUrl: "/images/new-work-37.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["High-Gloss Carbon Fiber"],
    tags: ["New Work", "Functional"]
  },
  {
    id: "new-work-38",
    title: "The Cactus",
    imageUrl: "/images/new-work-38.jpg",
    aspectRatio: 1.0,
    category: "sculpture",
    materials: ["Corroded Steel", "Neon"],
    tags: ["New Work", "Legend"]
  },
  {
    id: "new-work-39",
    title: "Astronaut",
    imageUrl: "/images/new-work-39.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-40",
    title: "The Color of Fabric",
    imageUrl: "/images/new-work-40.jpg",
    aspectRatio: 0.905,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
];

export function getArtworksByCategory(category: Artwork['category']): Artwork[] {
  return artworks.filter(artwork => artwork.category === category);
}

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find(artwork => artwork.id === id);
}

export function getFeaturedArtworks(count: number = 6): Artwork[] {
  return artworks.slice(0, count);
}

export const categories = [
  { value: 'all', label: 'All Works' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'installation', label: 'Installation' },
  { value: 'kinetic', label: 'Kinetic' },
] as const;
