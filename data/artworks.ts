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

/**
 * ⚠️  ARTWORK TITLES ARE LOCKED
 * 
 * The `title` field for each artwork below is protected by data/locked-titles.json.
 * Do NOT change titles programmatically. If you need to update a title:
 *   1. Edit the title here manually
 *   2. Run: node scripts/validate-titles.js --lock
 * 
 * To verify titles haven't drifted: node scripts/validate-titles.js
 */
const artworksRaw: Artwork[] = [
  {
    id: "new-work-1",
    title: "Sitting Monkey",
    imageUrl: "/images/new-work-1.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "4 ft",
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-2",
    title: "The Bear",
    imageUrl: "/images/new-work-2.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "9 ft",
    tags: ["New Work", "Contemplative"]
  },
  {
    id: "new-work-3",
    title: "Rebirth in Silence",
    imageUrl: "/images/new-work-3.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Metal Casting (Stainless Steel)"],
    dimensions: "5 ft",
    tags: ["New Work", "Goddess"]
  },
  {
    id: "new-work-5",
    title: "Sitting Bear",
    imageUrl: "/images/new-work-5.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "9 ft",
    tags: ["New Work", "Satire"]
  },
  {
    id: "new-work-6",
    title: "Steel Balls",
    imageUrl: "/images/new-work-6.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "7 ft",
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-7",
    title: "Metal Sphere",
    imageUrl: "/images/new-work-7.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Metal Casting"],
    dimensions: "5 ft",
    tags: ["New Work", "Monochrome"]
  },
  {
    id: "new-work-8",
    title: "The Open Gates Soul",
    imageUrl: "/images/new-work-8.jpg",
    aspectRatio: 0.778,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "12 x 15 ft",
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-10",
    title: "Formless",
    imageUrl: "/images/new-work-10.jpg",
    aspectRatio: 1.37,
    category: "installation",
    materials: ["Resin", "Chromium"],
    dimensions: "8 ft",
    tags: ["New Work", "Oceanic"]
  },
  {
    id: "new-work-11",
    title: "Chrome Drop",
    imageUrl: "/images/new-work-11.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "6x8 feet",
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
    materials: ["Stainless Steel"],
    dimensions: "6 ft",
    tags: ["New Work", "Color"]
  },
  {
    id: "new-work-15",
    title: "Formula 1",
    imageUrl: "/images/new-work-15.jpg",
    aspectRatio: 1.5,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "9 feet",
    tags: ["New Work", "Wonder"]
  },
  {
    id: "new-work-16",
    title: "The Owl",
    imageUrl: "/images/new-work-16.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "8 ft",
    tags: ["New Work", "Organic"]
  },
  {
    id: "new-work-17",
    title: "The Strawberry",
    imageUrl: "/images/new-work-17.jpg",
    videoUrl: "/videos/trippy-strawberry.mp4",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin", "Mechanism"],
    dimensions: "6 ft",
    tags: ["New Work", "Power"]
  },
  {
    id: "new-work-18",
    title: "Chilled Owl",
    imageUrl: "/images/new-work-18.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Resin", "Chromium"],
    dimensions: "6 ft",
    tags: ["New Work", "Conceptual"]
  },
  {
    id: "new-work-19",
    title: "Gesture of Genius",
    imageUrl: "/images/new-work-19.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "4.5 ft",
    tags: ["New Work", "Digital"]
  },
  {
    id: "new-work-20",
    title: "Mona Lisa",
    imageUrl: "/images/new-work-20.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Scrap"],
    dimensions: "5 ft",
    description: "A resin-and-chrome reinterpretation of an iconic face, balancing reflective finish with sculptural mass.",
    tags: ["New Work", "Haunting"]
  },
  {
    id: "new-work-21",
    title: "Reclining Buddha",
    imageUrl: "/images/new-work-21.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "5 ft",
    tags: ["New Work", "Avian"]
  },
  {
    id: "new-work-22",
    title: "Forest Lady",
    imageUrl: "/images/new-work-22.jpg",
    videoUrl: "/videos/video2.mp4",
    aspectRatio: 0.667,
    category: "mechanism",
    materials: ["Resin"],
    dimensions: "8 feet",
    tags: ["New Work", "Automotive"]
  },
  {
    id: "new-work-23",
    title: "Tiger Man",
    imageUrl: "/images/new-work-23.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "5 ft",
    tags: ["New Work", "Process"]
  },
  {
    id: "new-work-24",
    title: "The Bunny",
    imageUrl: "/images/new-work-24.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "6 ft",
    tags: ["New Work", "Surrealism"]
  },
  {
    id: "new-work-25",
    title: "Drowning Man",
    imageUrl: "/images/new-work-25.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Resin"],
    dimensions: "5 ft",
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-26",
    title: "The Bull",
    imageUrl: "/images/new-work-26.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "17 ft",
    tags: ["New Work", "Philosophical"]
  },
  {
    id: "new-work-27",
    title: "Table Horse",
    imageUrl: "/images/new-work-27.jpg",
    aspectRatio: 1.5,
    category: "installation",
    materials: ["Resin"],
    dimensions: "6 ft",
    tags: ["New Work", "Mosaic"]
  },
  {
    id: "new-work-28",
    title: "Medusa",
    imageUrl: "/images/new-work-28.jpg",
    videoUrl: "/videos/video1.mp4",
    aspectRatio: 0.667,
    category: "kinetic",
    materials: ["Resin", "Mechanism"],
    dimensions: "12 ft",
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-29",
    title: "The Moon",
    imageUrl: "/images/new-work-29.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "5x15 ft",
    tags: ["New Work", "Alien"]
  },
  {
    id: "new-work-30",
    title: "The Hearing Heart",
    imageUrl: "/images/new-work-30.jpg",
    videoUrl: "/videos/yearning-heart.mov",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin", "Mechanism"],
    dimensions: "6 ft",
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-31",
    title: "Golden Petals",
    imageUrl: "/images/new-work-31.jpg",
    aspectRatio: 1.5,
    category: "sculpture",
    materials: ["Stainless Steel"],
    dimensions: "2.5 ft each",
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-32",
    title: "Koi Fish",
    imageUrl: "/images/new-work-32.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin", "Acrylic"],
    dimensions: "15 feet",
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-33",
    title: "The Apple Cage",
    imageUrl: "/images/new-work-33.jpg",
    aspectRatio: 0.764,
    category: "sculpture",
    materials: ["Stainless Steel", "Resin"],
    dimensions: "12 ft",
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-34",
    title: "Metalic Wave",
    imageUrl: "/images/new-work-34.jpg",
    aspectRatio: 1.339,
    category: "installation",
    materials: ["Stainless Steel", "Copper"],
    tags: ["New Work", "Social"]
  },
  {
    id: "new-work-35",
    title: "Forest Panther",
    imageUrl: "/images/new-work-35.jpg",
    aspectRatio: 0.705,
    category: "sculpture",
    materials: ["Resin"],
    dimensions: "6 ft",
    tags: ["New Work", "Cosmic"]
  },
  {
    id: "new-work-36",
    title: "Fish in Spectrum",
    imageUrl: "/images/new-work-36.jpg",
    aspectRatio: 1.5,
    category: "installation",
    materials: ["Resin"],
    tags: ["New Work", "Light"]
  },
  {
    id: "new-work-37",
    title: "King Kong",
    imageUrl: "/images/new-work-37.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Cardboard"],
    tags: ["New Work", "Functional"]
  },
  {
    id: "new-work-38",
    title: "The Cactus",
    imageUrl: "/images/new-work-38.jpg",
    aspectRatio: 1.0,
    category: "sculpture",
    materials: ["Fiberglass", "Resin"],
    dimensions: "4 ft",
    tags: ["New Work", "Legend"]
  },
  {
    id: "new-work-39",
    title: "Astronaut",
    imageUrl: "/images/new-work-39.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Resin", "Chromium"],
    dimensions: "7 ft",
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-40",
    title: "The Color of Fabric",
    imageUrl: "/images/new-work-40.jpg",
    aspectRatio: 0.905,
    category: "sculpture",
    materials: ["Resin", "Craft Stone"],
    dimensions: "4 ft",
    tags: ["New Work", "Study"]
  },
];

function materialPriority(materials: string[]) {
  const normalized = materials.map((m) => m.toLowerCase());
  if (normalized.includes('stainless steel') || normalized.includes('ss')) return 0;
  if (normalized.includes('resin') || normalized.includes('clear resin')) return 1;
  return 2;
}

export const artworks: Artwork[] = [...artworksRaw].sort((a, b) => {
  const byPriority = materialPriority(a.materials) - materialPriority(b.materials);
  if (byPriority !== 0) return byPriority;
  return a.title.localeCompare(b.title);
});

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