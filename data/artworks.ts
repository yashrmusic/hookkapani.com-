export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  aspectRatio: number;
  category: 'sculpture' | 'installation' | 'kinetic';
  materials: string[];
  dimensions?: string;
  tags: string[];
  modelUrl?: string;
}

export const artworks: Artwork[] = [
  {
    id: "new-work-1",
    title: "Form in Motion",
    imageUrl: "/images/new-work-1.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Ceramic", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-2",
    title: "Liquid Dreams",
    imageUrl: "/images/new-work-2.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Steel Mesh"],
    tags: ["New Work", "Contemplative"]
  },
  {
    id: "new-work-3",
    title: "Echoes of Light",
    imageUrl: "/images/new-work-3.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Terracotta", "LEDs", "Silk Plants"],
    tags: ["New Work", "Goddess"]
  },
  {
    id: "new-work-4",
    title: "Obsidian Dream",
    imageUrl: "/images/new-work-4.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Gilded Wood", "Lacquer"],
    tags: ["New Work", "Astro-Bunny"]
  },
  {
    id: "new-work-5",
    title: "Terra Nova",
    imageUrl: "/images/new-work-5.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Cast Resin", "Fabric"],
    tags: ["New Work", "Satire"]
  },
  {
    id: "new-work-6",
    title: "Organic Fusion",
    imageUrl: "/images/new-work-6.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Acrylic", "Steel"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-7",
    title: "Midnight Bloom",
    imageUrl: "/images/new-work-7.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Ebonized Wood"],
    tags: ["New Work", "Monochrome"]
  },
  {
    id: "new-work-8",
    title: "Golden Ratio",
    imageUrl: "/images/new-work-8.jpg",
    aspectRatio: 0.778,
    category: "sculpture",
    materials: ["Gold-Plated Steel"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-9",
    title: "Crystal Vision",
    imageUrl: "/images/new-work-9.jpg",
    aspectRatio: 0.778,
    category: "sculpture",
    materials: ["Wood", "Glass Eyeball"],
    tags: ["New Work", "Surreal"]
  },
  {
    id: "new-work-10",
    title: "Shadow Dancer",
    imageUrl: "/images/new-work-10.jpg",
    aspectRatio: 1.37,
    category: "installation",
    materials: ["Layered Acrylic"],
    tags: ["New Work", "Oceanic"]
  },
  {
    id: "new-work-11",
    title: "Neon Pulse",
    imageUrl: "/images/new-work-11.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Matte Ceramic"],
    tags: ["New Work", "Peace"]
  },
  {
    id: "new-work-12",
    title: "Prismatic Core",
    imageUrl: "/images/new-work-12.jpg",
    aspectRatio: 0.73,
    category: "sculpture",
    materials: ["Resin", "Pigment"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-13",
    title: "Lunar Reflection",
    imageUrl: "/images/new-work-13.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Cast Iron", "Obsidian"],
    tags: ["New Work", "Mythic"]
  },
  {
    id: "new-work-14",
    title: "Cosmic Nest",
    imageUrl: "/images/new-work-14.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Mixed Media"],
    tags: ["New Work", "Color"]
  },
  {
    id: "new-work-15",
    title: "Silent Observer",
    imageUrl: "/images/new-work-15.jpg",
    aspectRatio: 1.5,
    category: "sculpture",
    materials: ["Fiberglass", "Auto Finish"],
    tags: ["New Work", "Wonder"]
  },
  {
    id: "new-work-16",
    title: "Flow State",
    imageUrl: "/images/new-work-16.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Bioplastic"],
    tags: ["New Work", "Organic"]
  },
  {
    id: "new-work-17",
    title: "Ancient Future",
    imageUrl: "/images/new-work-17.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Carbon Fiber", "Matte Resin"],
    tags: ["New Work", "Power"]
  },
  {
    id: "new-work-18",
    title: "Tidal Memory",
    imageUrl: "/images/new-work-18.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Engineered Wood", "Plaster"],
    tags: ["New Work", "Conceptual"]
  },
  {
    id: "new-work-19",
    title: "Metallic Flora",
    imageUrl: "/images/new-work-19.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Vintage Electronics", "Steel"],
    tags: ["New Work", "Digital"]
  },
  {
    id: "new-work-20",
    title: "Void Structure",
    imageUrl: "/images/new-work-20.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Carved Limestone"],
    tags: ["New Work", "Haunting"]
  },
  {
    id: "new-work-21",
    title: "Chromatic Ring",
    imageUrl: "/images/new-work-21.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Glass-Reinforced Plastic"],
    tags: ["New Work", "Avian"]
  },
  {
    id: "new-work-22",
    title: "Serpentine Form",
    imageUrl: "/images/new-work-22.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Aluminum", "Carbon Fiber"],
    tags: ["New Work", "Automotive"]
  },
  {
    id: "new-work-23",
    title: "Solar Wind",
    imageUrl: "/images/new-work-23.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Cast Bronze"],
    tags: ["New Work", "Process"]
  },
  {
    id: "new-work-24",
    title: "Emerald Depths",
    imageUrl: "/images/new-work-24.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Fiberglass", "Acrylic Paint"],
    tags: ["New Work", "Surrealism"]
  },
  {
    id: "new-work-25",
    title: "Glass Cathedral",
    imageUrl: "/images/new-work-25.jpg",
    aspectRatio: 0.667,
    category: "installation",
    materials: ["Bronze", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-26",
    title: "Night Garden",
    imageUrl: "/images/new-work-26.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Bronze"],
    tags: ["New Work", "Philosophical"]
  },
  {
    id: "new-work-27",
    title: "Kinetic Poetry",
    imageUrl: "/images/new-work-27.jpg",
    aspectRatio: 1.5,
    category: "installation",
    materials: ["Found Objects", "Mixed Media"],
    tags: ["New Work", "Mosaic"]
  },
  {
    id: "new-work-28",
    title: "Mercury Rise",
    imageUrl: "/images/new-work-28.jpg",
    aspectRatio: 0.667,
    category: "kinetic",
    materials: ["Plexiglass", "LEDs"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-29",
    title: "Stone Whisper",
    imageUrl: "/images/new-work-29.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Cast Resin", "Matte Black Paint"],
    tags: ["New Work", "Alien"]
  },
  {
    id: "new-work-30",
    title: "Untitled Study 30",
    imageUrl: "/images/new-work-30.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-31",
    title: "Untitled Study 31",
    imageUrl: "/images/new-work-31.jpg",
    aspectRatio: 1.5,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-32",
    title: "Untitled Study 32",
    imageUrl: "/images/new-work-32.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-33",
    title: "Untitled Study 33",
    imageUrl: "/images/new-work-33.jpg",
    aspectRatio: 0.764,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-34",
    title: "Ruby Cascade",
    imageUrl: "/images/new-work-34.jpg",
    aspectRatio: 1.339,
    category: "installation",
    materials: ["Soft-Touch Vinyl", "Fiberglass"],
    tags: ["New Work", "Social"]
  },
  {
    id: "new-work-35",
    title: "Sapphire Current",
    imageUrl: "/images/new-work-35.jpg",
    aspectRatio: 0.705,
    category: "sculpture",
    materials: ["Polyurethane", "Glass Spheres"],
    tags: ["New Work", "Cosmic"]
  },
  {
    id: "new-work-36",
    title: "Platinum Edge",
    imageUrl: "/images/new-work-36.jpg",
    aspectRatio: 1.5,
    category: "installation",
    materials: ["Optical Fiber", "Translucent Resin"],
    tags: ["New Work", "Light"]
  },
  {
    id: "new-work-37",
    title: "Hollow Light",
    imageUrl: "/images/new-work-37.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["High-Gloss Carbon Fiber"],
    tags: ["New Work", "Functional"]
  },
  {
    id: "new-work-38",
    title: "Ivory Tower",
    imageUrl: "/images/new-work-38.jpg",
    aspectRatio: 1.0,
    category: "sculpture",
    materials: ["Corroded Steel", "Neon"],
    tags: ["New Work", "Legend"]
  },
  {
    id: "new-work-39",
    title: "Untitled Study 39",
    imageUrl: "/images/new-work-39.jpg",
    aspectRatio: 0.667,
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work", "Study"]
  },
  {
    id: "new-work-40",
    title: "Untitled Study 40",
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
