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
    title: "The Little Monarch",
    description: "A whimsical exploration of innocence and authority.",
    longDescription: "A small white figurine with a gold crown, reminiscent of 'The Little Prince', exploring themes of leadership and childhood wonder.",
    imageUrl: "/images/new-work-1.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Ceramic", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-2",
    title: "Crimson Whisper",
    description: "An evocative study of expression and silence.",
    longDescription: "A large, vibrant red set of lips on a minimalist pedestal, questioning the power of the spoken word versus the unspoken.",
    imageUrl: "/images/new-work-2.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Resin", "Auto Paint"],
    tags: ["New Work", "Bold"]
  },
  {
    id: "new-work-3",
    title: "Ephemeral Echo",
    description: "A delicate balance between presence and absence.",
    longDescription: "A metallic mesh figure in a contemplative pose, using transparency to suggest the weight of memory.",
    imageUrl: "/images/new-work-3.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Steel Mesh"],
    tags: ["New Work", "Contemplative"]
  },
  {
    id: "new-work-4",
    title: "Pure Fluidity",
    description: "Capturing the essence of motion in a static form.",
    longDescription: "An abstract white organic sculpture that flows like liquid, challenging the rigid nature of solid material.",
    imageUrl: "/images/new-work-4.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Polished Plaster"],
    tags: ["New Work", "Minimalist"]
  },
  {
    id: "new-work-5",
    title: "Verdant Muse",
    description: "The face of nature emerging from the earth.",
    longDescription: "A green goddess head that seems to grow directly from the soil, symbolizing the cyclical nature of life.",
    imageUrl: "/images/new-work-5.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Mixed Media", "Living Flora"],
    tags: ["New Work", "Nature"]
  },
  {
    id: "new-work-6",
    title: "Lunar Explorer",
    description: "A miniature tribute to human curiosity and discovery.",
    longDescription: "A small astronaut figurine standing on a moon-like base, celebrating the spirit of space exploration.",
    imageUrl: "/images/new-work-6.png",
    aspectRatio: 1.75,
    year: "2024",
    category: "sculpture",
    materials: ["Bronze", "Stone"],
    tags: ["New Work", "Space"]
  },
  {
    id: "new-work-7",
    title: "Vibrant Nexus",
    description: "A collision of primary colors and sharp angles.",
    longDescription: "An abstract geometric sculpture using blue and yellow planes to create a dynamic sense of intersection.",
    imageUrl: "/images/new-work-7.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Acrylic", "Steel"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-8",
    title: "Midnight Silhouette",
    description: "A stark representation of human form in shadow.",
    longDescription: "A black minimalist bust that emphasizes silhouette and form over detail, inviting the viewer's interpretation.",
    imageUrl: "/images/new-work-8.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Ebonized Wood"],
    tags: ["New Work", "Monochrome"]
  },
  {
    id: "new-work-9",
    title: "Solar Flare",
    description: "Radiating energy captured in polished metal.",
    longDescription: "A golden abstract flame-like sculpture that reflects and distorts light, mimicking the sun's volatile beauty.",
    imageUrl: "/images/new-work-9.png",
    aspectRatio: 0.73,
    year: "2024",
    category: "sculpture",
    materials: ["Gold-Plated Steel"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-10",
    title: "Unison",
    description: "A study of human connection and synchronized form.",
    longDescription: "Two intertwined white figures that merge into a single flowing entity, representing partnership and shared destiny.",
    imageUrl: "/images/new-work-10.png",
    aspectRatio: 0.778,
    year: "2024",
    category: "sculpture",
    materials: ["Marble Dust Resin"],
    tags: ["New Work", "Connection"]
  },
  {
    id: "new-work-11",
    title: "The All-Seeing Root",
    description: "Watching eyes emerge from the heart of the forest.",
    longDescription: "A surreal eyeball integrated into a complex tree trunk structure, exploring the sentience of nature.",
    imageUrl: "/images/new-work-11.png",
    aspectRatio: 0.778,
    year: "2024",
    category: "sculpture",
    materials: ["Wood", "Glass Eyeball"],
    tags: ["New Work", "Surreal"]
  },
  {
    id: "new-work-12",
    title: "Scarlet Fragment",
    description: "A sharp interrogation of color and broken symmetry.",
    longDescription: "A red abstract sculpture with jagged, crystalline edges that seems to have shattered and reformed.",
    imageUrl: "/images/new-work-12.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Glass"],
    tags: ["New Work", "Energy"]
  },
  {
    id: "new-work-13",
    title: "Azure Surge",
    description: "Capturing the dynamic energy of the ocean.",
    longDescription: "A blue wave-like form that uses layering to create depth and the illusion of constant movement.",
    imageUrl: "/images/new-work-13.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Layered Acrylic"],
    tags: ["New Work", "Oceanic"]
  },
  {
    id: "new-work-14",
    title: "Silent Meditation",
    description: "A peaceful form finding balance in minimalism.",
    longDescription: "A white minimalist character in a seated pose, emphasizing negative space and tranquility.",
    imageUrl: "/images/new-work-14.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Matte Ceramic"],
    tags: ["New Work", "Peace"]
  },
  {
    id: "new-work-15",
    title: "Emerald Crystal",
    description: "Sharp geometric growth mimicking natural minerals.",
    longDescription: "A green abstract crystalline form that explores the bridge between organic growth and geometric precision.",
    imageUrl: "/images/new-work-15.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Resin", "Pigment"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-16",
    title: "Sentinel of the Gate",
    description: "A stoic guardian standing watch at the threshold of perception.",
    longDescription: "A large black figure with a circular head holding a symbolic staff, acting as a boundary marker between reality and imagination.",
    imageUrl: "/images/new-work-16.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Iron", "Obsidian"],
    tags: ["New Work", "Mythic"]
  },
  {
    id: "new-work-17",
    title: "Golden Requiem",
    description: "A bold memento mori blending mortality with opulence.",
    longDescription: "A giant red skull adorned with intricate golden details, celebrating the beauty found in the cycle of life and death.",
    imageUrl: "/images/new-work-17.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Bronze", "Gold Leaf", "Enamel"],
    tags: ["New Work", "Memento Mori"]
  },
  {
    id: "new-work-18",
    title: "Chromatic Blast",
    description: "An explosion of color frozen in a chaotic yet balanced state.",
    longDescription: "An abstract sculpture that seems to radiate from a central point, using a spectrum of colors to represent pure energy.",
    imageUrl: "/images/new-work-18.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Mixed Media"],
    tags: ["New Work", "Color"]
  },
  {
    id: "new-work-19",
    title: "The White Rabbit's Rebirth",
    description: "A surreal, larger-than-life tribute to curiosities and wonder.",
    longDescription: "A giant white rabbit-like figure that invites viewers to question scale and their own sense of reality.",
    imageUrl: "/images/new-work-19.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Fiberglass", "Auto Finish"],
    tags: ["New Work", "Wonder"]
  },
  {
    id: "new-work-20",
    title: "Global Equilibrium",
    description: "Finding stable ground on a spinning world.",
    longDescription: "A metallic figure carefully balancing atop a large spherical orb, symbolizing the human struggle for stability.",
    imageUrl: "/images/new-work-20.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Polished Chrome", "Steel"],
    tags: ["New Work", "Balance"]
  },
  {
    id: "new-work-21",
    title: "Amethyst Bloom",
    description: "An organic unfolding of deep violet textures.",
    longDescription: "A purple abstract organic form that mimics the unfolding petals of a nocturnal flower.",
    imageUrl: "/images/new-work-21.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Bioplastic"],
    tags: ["New Work", "Organic"]
  },
  {
    id: "new-work-22",
    title: "Midnight Prowler",
    description: "The stealthy grace of the forest captured in matte black.",
    longDescription: "A giant black panther sculpture that emphasizes muscular tension and the quiet power of the feline form.",
    imageUrl: "/images/new-work-22.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Carbon Fiber", "Matte Resin"],
    tags: ["New Work", "Power"]
  },
  {
    id: "new-work-23",
    title: "Cognitive Forest",
    description: "The intersection of human thought and natural growth.",
    longDescription: "A large white human figure with a complex tree structure growing from its mind, representing the birth of ideas.",
    imageUrl: "/images/new-work-23.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Engineered Wood", "Plaster"],
    tags: ["New Work", "Conceptual"]
  },
  {
    id: "new-work-24",
    title: "Infinite Loop",
    description: "Cycles of energy represented through continuous golden bands.",
    longDescription: "An abstract sculpture of interlocking circles that create a never-ending path for the eye to follow.",
    imageUrl: "/images/new-work-24.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Gold-Anodized Aluminum"],
    tags: ["New Work", "Infinity"]
  },
  {
    id: "new-work-25",
    title: "Inner Sanctuary",
    description: "Exploring the internal landscape of a meditative soul.",
    longDescription: "A large blue figure in a lotus position, with a garden emerging from its hollow torso, representing internal peace.",
    imageUrl: "/images/new-work-25.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Concrete", "Preserved Moss"],
    tags: ["New Work", "Zen"]
  },
  {
    id: "new-work-26",
    title: "The Transmitted Soul",
    description: "A commentary on the digital age and human identity.",
    longDescription: "A sculptural figure with a television for a head, questioning how much of our identity is broadcasted versus inherent.",
    imageUrl: "/images/new-work-26.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Vintage Electronics", "Steel"],
    tags: ["New Work", "Digital"]
  },
  {
    id: "new-work-27",
    title: "Enigma",
    description: "A simplified, hauntingly beautiful interpretation of the human gaze.",
    longDescription: "A large white abstract sculpture of a face that uses subtle shadows to convey deep emotion.",
    imageUrl: "/images/new-work-27.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Carved Limestone"],
    tags: ["New Work", "Haunting"]
  },
  {
    id: "new-work-28",
    title: "The Red Robin",
    description: "A delicate splash of color and life.",
    longDescription: "A small, vibrant red bird sculpture that serves as an accent of vitality in any space.",
    imageUrl: "/images/new-work-28.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Glass-Reinforced Plastic"],
    tags: ["New Work", "Avian"]
  },
  {
    id: "new-work-29",
    title: "Multiplicities",
    description: "The many paths of action and potential within one form.",
    longDescription: "An abstract white sculpture with numerous radiating arms, symbolizing the endless choices we face.",
    imageUrl: "/images/new-work-29.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Powder-Coated Steel"],
    tags: ["New Work", "Complexity"]
  },
  {
    id: "new-work-30",
    title: "Obsidian Serpent",
    description: "The powerful, winding form of an ancient myth made real.",
    longDescription: "A large black serpent sculpture that winds through the space, combining grace with a sense of danger.",
    imageUrl: "/images/new-work-30.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Polished Stone", "Steel Skeleton"],
    tags: ["New Work", "Mythology"]
  },
  {
    id: "new-work-31",
    title: "Velocity Red",
    description: "Capturing the high-speed essence of automotive engineering.",
    longDescription: "A stylized representation of a Formula 1 car, emphasizing the sleek lines and aggressive posture of speed.",
    imageUrl: "/images/new-work-31.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Aluminum", "Carbon Fiber"],
    tags: ["New Work", "Automotive"]
  },
  {
    id: "new-work-32",
    title: "Nocturnal Guardian",
    description: "The silent wisdom of the night bird.",
    longDescription: "A majestic black owl sculpture with an intense gaze, representing ancient knowledge and protective presence.",
    imageUrl: "/images/new-work-32.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Bronze", "Patina"],
    tags: ["New Work", "Wisdom"]
  },
  {
    id: "new-work-33",
    title: "Owl in Reflection",
    description: "A study of the midnight hunter in its creative birthplace.",
    longDescription: "An alternative perspective of the Nocturnal Guardian, captured in the raw environment of the studio.",
    imageUrl: "/images/new-work-33.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Bronze"],
    tags: ["New Work", "Process"]
  },
  {
    id: "new-work-34",
    title: "The Watchful Berry",
    description: "A surrealist hallucination blending fruit and perception.",
    longDescription: "A giant strawberry sculpture covered in numerous eyes, challenging the viewer's gaze and the nature of observation.",
    imageUrl: "/images/new-work-34.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Fiberglass", "Acrylic Paint"],
    tags: ["New Work", "Surrealism"]
  },
  {
    id: "new-work-35",
    title: "The Gilded Pedestrian",
    description: "A whimsical traveler resting on the journey between worlds.",
    longDescription: "A golden owl character sitting casually on a bench, bridging the gap between mythic beings and everyday life.",
    imageUrl: "/images/new-work-35.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Bronze", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-36",
    title: "The Oracle",
    description: "A wise figure pointing towards celestial truths.",
    longDescription: "A bronze statue of a contemplative man pointing upwards, inviting viewers to look beyond the material world.",
    imageUrl: "/images/new-work-36.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Bronze"],
    tags: ["New Work", "Philosophical"]
  },
  {
    id: "new-work-37",
    title: "Found Memories",
    description: "A portrait of history rebuilt from the fragments of the present.",
    longDescription: "A mosaic of the Mona Lisa constructed from thousands of small found objects, celebrating reinterpretation.",
    imageUrl: "/images/new-work-37.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Found Objects", "Mixed Media"],
    tags: ["New Work", "Mosaic"]
  },
  {
    id: "new-work-38",
    title: "Luminous Leviathan",
    description: "A bioluminescent wonder from the deep gallery seas.",
    longDescription: "A large hanging fish sculpture with glowing red eyes, representing the mysteries of the unexplored ocean.",
    imageUrl: "/images/new-work-38.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "kinetic",
    materials: ["Plexiglass", "LEDs"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-39",
    title: "Void Walker",
    description: "A silent explorer emerging from the shadows of existence.",
    longDescription: "A black alien-like figure sitting stoically, exploring themes of isolation and extraterrestrial life.",
    imageUrl: "/images/new-work-39.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Resin", "Matte Black Paint"],
    tags: ["New Work", "Alien"]
  },
  {
    id: "new-work-40",
    title: "Layered Existence",
    description: "The human experience seen as a series of geological strata.",
    longDescription: "An abstract bronze sculpture of a seated figure made of horizontal layers, suggesting the passage of time.",
    imageUrl: "/images/new-work-40.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Bronze"],
    tags: ["New Work", "Time"]
  },
  {
    id: "new-work-41",
    title: "Gaia's Gaze",
    description: "The ancient earth mother watching through emerald eyes.",
    longDescription: "A giant goddess head interwoven with vines and flora, featuring glowing green eyes that represent the spirit of life.",
    imageUrl: "/images/new-work-41.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Terracotta", "LEDs", "Silk Plants"],
    tags: ["New Work", "Goddess"]
  },
  {
    id: "new-work-42",
    title: "Corporate Predator",
    description: "A dapper hunter navigating the concrete jungle.",
    longDescription: "A character with a majestic tiger's head wearing a sharp white suit, satirizing modern ambition.",
    imageUrl: "/images/new-work-42.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Resin", "Fabric"],
    tags: ["New Work", "Satire"]
  },
  {
    id: "new-work-43",
    title: "Stellar Monarch",
    description: "The cosmic traveler who claimed the golden seat.",
    longDescription: "A black bunny-eared astronaut figure sitting on a golden throne-like armchair, blending pop culture with royalty.",
    imageUrl: "/images/new-work-43.jpg",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Gilded Wood", "Lacquer"],
    tags: ["New Work", "Astro-Bunny"]
  },
  {
    id: "new-work-44",
    title: "The Collective",
    description: "A gathering of silent souls in varying states of contemplation.",
    longDescription: "A group of multiple white-headed characters in different poses, exploring social dynamics and individual isolation.",
    imageUrl: "/images/new-work-44.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Soft-Touch Vinyl", "Fiberglass"],
    tags: ["New Work", "Social"]
  },
  {
    id: "new-work-45",
    title: "The Sphere Bearer",
    description: "Holding the universe within the core of their being.",
    longDescription: "A blue humanoid figure with a hollow torso filled with white and golden spheres, representing the burdens of creation.",
    imageUrl: "/images/new-work-45.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Polyurethane", "Glass Spheres"],
    tags: ["New Work", "Cosmic"]
  },
  {
    id: "new-work-46",
    title: "Starlight Bloom",
    description: "An organic cocoon glowing with the light of distant nebulas.",
    longDescription: "A purple and white bioluminescent-looking shell structure that seems to pulse with its own internal light.",
    imageUrl: "/images/new-work-46.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "installation",
    materials: ["Optical Fiber", "Translucent Resin"],
    tags: ["New Work", "Light"]
  },
  {
    id: "new-work-47",
    title: "Galloping Surface",
    description: "The speed of a stallion transformed into functional sculpture.",
    longDescription: "A sleek, black animal-form table that captures the dynamic power of a galloping horse in a furniture piece.",
    imageUrl: "/images/new-work-47.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["High-Gloss Carbon Fiber"],
    tags: ["New Work", "Functional"]
  },
  {
    id: "new-work-48",
    title: "Lithos Whisper",
    description: "The legendary gorgon with a gaze that freezes time and spirit.",
    longDescription: "A large-scale Medusa head with snakes for hair and glowing red eyes, reimagining the myth in a modern sculptural context.",
    imageUrl: "/images/new-work-48.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Corroded Steel", "Neon"],
    tags: ["New Work", "Legend"]
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
