export interface Artwork {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  aspectRatio: number;
  year: string;
  category: 'sculpture' | 'installation' | 'kinetic';
  materials: string[];
  dimensions?: string;
  tags: string[];
  modelUrl?: string;
}

export const artworks: Artwork[] = [
  {
    id: "new-work-1",
    title: "Artwork 1",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-1.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-2",
    title: "Artwork 2",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-2.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-3",
    title: "Artwork 3",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-3.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-4",
    title: "Artwork 4",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-4.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-5",
    title: "Artwork 5",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-5.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-6",
    title: "Artwork 6",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-6.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-7",
    title: "Artwork 7",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-7.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-8",
    title: "Artwork 8",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-8.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-9",
    title: "Artwork 9",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-9.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-10",
    title: "Artwork 10",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-10.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-11",
    title: "Artwork 11",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-11.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-12",
    title: "Artwork 12",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-12.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-13",
    title: "Artwork 13",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-13.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-14",
    title: "Artwork 14",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-14.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-15",
    title: "Artwork 15",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-15.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-16",
    title: "Artwork 16",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-16.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-17",
    title: "Artwork 17",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-17.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-18",
    title: "Artwork 18",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-18.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-19",
    title: "Artwork 19",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-19.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-20",
    title: "Artwork 20",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-20.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-21",
    title: "Artwork 21",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-21.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-22",
    title: "Artwork 22",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-22.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-23",
    title: "Artwork 23",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-23.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-24",
    title: "Artwork 24",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-24.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-25",
    title: "Artwork 25",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-25.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-26",
    title: "Artwork 26",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-26.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-27",
    title: "Artwork 27",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-27.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-28",
    title: "Artwork 28",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-28.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-29",
    title: "Artwork 29",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-29.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-30",
    title: "Artwork 30",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-30.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-31",
    title: "Artwork 31",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-31.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-32",
    title: "Artwork 32",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-32.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-33",
    title: "Artwork 33",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-33.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-34",
    title: "Artwork 34",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-34.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-35",
    title: "Artwork 35",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-35.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-36",
    title: "Artwork 36",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-36.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-37",
    title: "Artwork 37",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-37.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-38",
    title: "Artwork 38",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-38.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-39",
    title: "Artwork 39",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-39.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-40",
    title: "Artwork 40",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-40.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-41",
    title: "Artwork 41",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-41.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-42",
    title: "Artwork 42",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-42.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-43",
    title: "Artwork 43",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-43.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-44",
    title: "Artwork 44",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-44.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-45",
    title: "Artwork 45",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-45.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-46",
    title: "Artwork 46",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-46.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-47",
    title: "Artwork 47",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-47.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  },
  {
    id: "new-work-48",
    title: "Artwork 48",
    description: "A sculptural work exploring form and material.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-48.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Work"]
  }
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
