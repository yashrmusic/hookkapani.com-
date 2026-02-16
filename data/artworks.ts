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
    id: "new-work-45",
    title: "Luminous Leviathan",
    description: "A luminous fish sculpture, suspended as if swimming through air.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-45.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "sitar-silhouette",
    title: "Sitar Silhouette",
    description: "A weightless wireframe silhouette that captures the ethereal resonance of classical music.",
    longDescription: "An intricate metallic wireframe sculpture of a sitar player. The hand-drawn mesh creates a visual representation of sound waves and musical vibrations, appearing almost weightless in a gallery setting.",
    imageUrl: "/images/project4.png",
    aspectRatio: 0.8,
    year: "2023",
    category: "sculpture",
    materials: ["Hand-Drawn Copper Wire", "Steel Mesh"],
    tags: ["Sound", "Transparency", "Wireframe"]
  },
  {
    id: "new-work-33",
    title: "Crimson Lattice",
    description: "A geometric red apple sculpture with a lattice structure.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-33.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-26",
    title: "Azure Icon",
    description: "A blue urban vinyl figure, standing with a distinct street art aesthetic.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-26.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-16",
    title: "Viscous Moment",
    description: "A floor installation capturing the moment of a liquid droplet's impact.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-16.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },







  {
    id: "ethereal-weave",
    title: "Ethereal Weave",
    description: "A contemporary reinterpretation of Rajputana Jali work with intricate brass wire patterns.",
    longDescription: "The brass weave creates intricate shadows that dance with the movement of the sun, inspired by traditional Indian architecture.",
    imageUrl: "/images/project8.png",
    aspectRatio: 1.0,
    year: "2023",
    category: "sculpture",
    materials: ["Polished Brass"],
    tags: ["Jali", "Light", "Shadow"]
  },




  {
    id: "banyan-resonance",
    title: "Banyan Resonance",
    description: "Iron and copper sculpture inspired by the aerial roots of the Great Banyan.",
    longDescription: "A heavy, grounded form that breathes through a network of copper veins, inspired by the organic root systems.",
    imageUrl: "/images/new-work-13.png",
    aspectRatio: 0.75,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Iron", "Copper Rootwork"],
    tags: ["Organic", "Roots", "Nature"]
  },

  {
    id: "ghat-rhythm",
    title: "Ghat Rhythm",
    description: "Steel kinetic sculpture capturing the relentless flow of the Ganges.",
    longDescription: "Steel blades rotate with the updrafts from the river valley, capturing the motion of water and air.",
    imageUrl: "/images/new-work-15.png",
    aspectRatio: 0.8,
    year: "2024",
    category: "kinetic",
    materials: ["Brushed Steel", "River Stone"],
    tags: ["River", "Motion", "Nature"]
  },

  {
    id: "temple-geometry",
    title: "Temple Geometry",
    description: "Granite monolith with intricate gold leaf patterns.",
    longDescription: "The precision of Dravidian architecture distilled into a single, gold-veined monolith.",
    imageUrl: "/images/new-work-17.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Granite", "Gold Leaf"],
    tags: ["Temple", "Gold", "Precision"]
  },


  {
    id: "lotus-void",
    title: "Lotus Void",
    description: "White concrete geometric petals creating a void that fills with light.",
    longDescription: "A study in unfolding. The geometric petals create a void that fills with light during twilight hours.",
    imageUrl: "/images/new-work-20.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["White Concrete", "LED"],
    tags: ["Light", "Geometry", "Void"]
  },








  {
    id: "new-work-1",
    title: "Cardiac Vision I",
    description: "A surrealist heart sculpture featuring a central eye and floral crown.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-1.png",
    aspectRatio: 0.56,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-2",
    title: "Cardiac Vision II",
    description: "A variation of the cardiac series, exploring organic and anatomical fusion.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-2.png",
    aspectRatio: 0.56,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-3",
    title: "Cobalt Pneumatic",
    description: "A blue metallic balloon dog sculpture, reflecting pop art influences.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-3.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },








  {
    id: "new-work-12",
    title: "Chromalith Disc",
    description: "A circular wall relief with textured, colorful weaving.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-12.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-13",
    title: "Aerodynamic Bronze",
    description: "A dynamic abstract bronze form, suggesting flight and motion.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-13.png",
    aspectRatio: 1.37,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-14",
    title: "Aquatic Copper Array",
    description: "A wall installation of copper elements arranged in an aquatic school.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-14.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-15",
    title: "Folded Bronze Wave",
    description: "A folded bronze wall sculpture, mimicking the fluidity of fabric.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-15.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },





  {
    id: "new-work-21",
    title: "Fissured Feline",
    description: "A weathered lion's head sculpture with glowing internal fractures.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-21.png",
    aspectRatio: 1.5,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },









  {
    id: "new-work-31",
    title: "Soaring Bronze",
    description: "A golden abstract form soaring over a landscape, capturing light and movement.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-31.png",
    aspectRatio: 1.5,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },


  {
    id: "new-work-34",
    title: "Regal Iron",
    description: "A detailed iron throne replica, evoking themes of power and legacy.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-34.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-35",
    title: "Prismatic Ursine",
    description: "A low-poly colorful bear sculpture, sitting in a reflective pose.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-35.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-36",
    title: "Polychrome Bear",
    description: "A studio study of the polychrome bear, highlighting its geometric facets.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-36.png",
    aspectRatio: 1.5,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-37",
    title: "Scuderia Kinetic",
    description: "A kinetic model of a Formula 1 car, capturing speed in a static form.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-37.png",
    aspectRatio: 1.5,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-38",
    title: "Obsidian Sentinel",
    description: "A black metal owl sculpture, standing as a silent sentinel.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-38.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },

  {
    id: "new-work-40",
    title: "Ocular Berry",
    description: "A surreal strawberry sculpture with multiple eyes, challenging perception.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-40.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-41",
    title: "Mythic Hybrid",
    description: "A hybrid bust combining human features with an owl headdress and glowing eyes.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-41.png",
    aspectRatio: 0.8,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-42",
    title: "Golden Break",
    description: "A golden owl figure in a casual pose, blending myth with modernity.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-42.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-43",
    title: "Bronze Rhetoric",
    description: "A bronze figure caught in a moment of rhetorical oration.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-43.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },
  {
    id: "new-work-44",
    title: "Recycled Gioconda",
    description: "A large-scale mosaic of the Mona Lisa, constructed from recycled materials.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-44.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
  },

  {
    id: "new-work-46",
    title: "Void Form",
    description: "A glossy black humanoid figure sitting in contemplation.",
    longDescription: "A recently documented work from the studio, showcasing current explorations in material and form.",
    imageUrl: "/images/new-work-46.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media"],
    tags: ["New Arrival"]
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