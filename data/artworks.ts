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
    id: "spheroid-ensemble",
    title: "Spheroid Ensemble",
    description: "A vertical accumulation of mirrored spheres, capturing a balanced reflection of the surrounding environment.",
    longDescription: "A monumental stack of mirror-finished stainless steel spheres. The work explores the tension between individual units and the collective form, creating a shifting map of reflections that changes with the light and the viewer's position.",
    imageUrl: "/images/project1.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Mirror-Finished Stainless Steel", "Internal Support"],
    dimensions: "320cm x 120cm x 120cm",
    tags: ["Reflection", "Minimalism", "Verticality"]
  },
  {
    id: "geometric-anatomist",
    title: "Geometric Anatomist",
    description: "A faceted study of human form in motion, interacting with a malachite-textured sphere.",
    longDescription: "A low-poly anatomical study in deep verdigris bronze. The figure captures a moment of dynamic equilibrium, paused at the point of interaction with a perfectly smooth, malachite-patterned orb.",
    imageUrl: "/images/project2.png",
    aspectRatio: 0.75,
    year: "2024",
    category: "sculpture",
    materials: ["Verdigris Bronze", "Polished Malachite Resin"],
    dimensions: "180cm x 120cm x 240cm",
    tags: ["Anatomy", "Low-Poly", "Interaction"]
  },
  {
    id: "crimson-flux",
    title: "Crimson Flux",
    description: "Vibrant red planar forms that oscillate between rigidity and fluid motion, set against a serene backdrop.",
    longDescription: "A series of interconnected, wave-like red planes. The installation examines the rhythmic intrusion of color into natural spaces, creating a rhythmic visual pulse through its modular, curved geometry.",
    imageUrl: "/images/project3.png",
    aspectRatio: 1.5,
    year: "2023",
    category: "installation",
    materials: ["Anodized Aluminum", "High-Gloss Pigment"],
    dimensions: "Variable",
    tags: ["Rhythm", "Modular", "Contrast"]
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
    dimensions: "160cm x 140cm x 190cm",
    tags: ["Sound", "Transparency", "Wireframe"]
  },
  {
    id: "organic-metamorphosis",
    title: "Organic Metamorphosis",
    description: "An abstract bronze form that bridges natural curves and urban architecture.",
    longDescription: "A large-scale abstract sculpture with a weathered bronze finish. Its soaring, wing-like architecture creates a dramatic silhouette, exploring the threshold between organic and industrial design in both urban and coastal settings.",
    imageUrl: "/images/project5.png",
    aspectRatio: 1.4,
    year: "2024",
    category: "installation",
    materials: ["Cast Bronze", "Structural Steel"],
    dimensions: "500cm x 300cm x 300cm",
    tags: ["Urban", "Coastal", "Metamorphosis"]
  },
  {
    id: "lunar-dialogue",
    title: "Lunar Dialogue",
    description: "Stark white monoliths in the high-altitude desert, creating a stark geometric shadow play.",
    longDescription: "Minimalist white powder-coated aluminum monoliths positioned to create geometric shadow patterns that shift with the lunar cycle.",
    imageUrl: "/images/project6.png",
    aspectRatio: 1.5,
    year: "2023",
    category: "installation",
    materials: ["Powder-Coated Aluminum"],
    tags: ["Minimalism", "Light", "Shadow"]
  },
  {
    id: "ursine-monolith",
    title: "Ursine Monolith",
    description: "A faceted silver polar bear sculpture that introduces a clinical aesthetic into luxury spaces.",
    longDescription: "A low-poly, life-sized polar bear in polished silver. The work creates a dialogue between wild nature and the sterile precision of contemporary luxury environments, examined through its geometric purity and material honesty.",
    imageUrl: "/images/project7.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Polished Chrome", "Faceted Steel"],
    dimensions: "210cm x 210cm",
    tags: ["Brutalist", "Ursine", "Reflection"]
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
    id: "companion-noir",
    title: "Companion Noir",
    description: "A deep blue pop-surrealist figure with iconic glowing eyes, commanding interior thresholds.",
    longDescription: "A towering, deep cobalt blue figure inspired by pop-surrealism. Standing at the transition between street and interior, its large proportions and glowing orange 'X' eyes create a powerful, silent gatekeeper of modern culture.",
    imageUrl: "/images/project9.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Matte Polyurethane Resin", "Internal LED"],
    dimensions: "350cm x 150cm",
    tags: ["Pop Art", "Surrealism", "Iconic"]
  },
  {
    id: "tectonic-breath",
    title: "Tectonic Breath",
    description: "Balancing the ancient and the breathing with weighted granite and teak arms.",
    longDescription: "Weighted granite holding teak arms that sway with the forest winds, exploring the relationship between heavy and light.",
    imageUrl: "/images/project10.png",
    aspectRatio: 1.4,
    year: "2023",
    category: "kinetic",
    materials: ["Teak Wood", "Granite"],
    tags: ["Organic", "Balance", "Nature"]
  },
  {
    id: "cardiac-ocular",
    title: "Cardiac Ocular",
    description: "A heart-shaped sculpture with a realistic eye and botanical top-work, exploring emotion and vision.",
    longDescription: "A visceral, surrealist sculpture of a heart featuring a central, realistic eye. Topped with intricate floral arrangements, the piece explores the intersection of emotion, vision, and growth, revealing subtle textures under gallery-grade lighting.",
    imageUrl: "/images/project11.png",
    aspectRatio: 0.58,
    year: "2024",
    category: "sculpture",
    materials: ["Hand-Painted Resin", "Silk Botanicals", "Steel Base"],
    dimensions: "240cm x 160cm x 100cm",
    tags: ["Surrealism", "Floral", "Anatomical"]
  },
  {
    id: "desert-mirage",
    title: "Desert Mirage",
    description: "Chrome surface reflecting the heat haze into geometric patterns.",
    longDescription: "Blurring the line between the sky and the Thar desert. The chrome surface reflects the heat haze into geometric patterns.",
    imageUrl: "/images/project12.png",
    aspectRatio: 1.0,
    year: "2023",
    category: "installation",
    materials: ["Polished Chrome", "Sandstone"],
    tags: ["Reflection", "Desert", "Optical"]
  },
  {
    id: "banyan-resonance",
    title: "Banyan Resonance",
    description: "Iron and copper sculpture inspired by the aerial roots of the Great Banyan.",
    longDescription: "A heavy, grounded form that breathes through a network of copper veins, inspired by the organic root systems.",
    imageUrl: "/images/project13.png",
    aspectRatio: 0.75,
    year: "2024",
    category: "sculpture",
    materials: ["Cast Iron", "Copper Rootwork"],
    tags: ["Organic", "Roots", "Nature"]
  },
  {
    id: "stepped-silence",
    title: "Stepped Silence",
    description: "Tiered terracotta and glass sculpture inspired by India's stepwells.",
    longDescription: "A descending geometric form that traps light in its tiered glass heart, inspired by traditional stepwell architecture.",
    imageUrl: "/images/project14.png",
    aspectRatio: 1.2,
    year: "2023",
    category: "sculpture",
    materials: ["Terracotta", "Glass"],
    tags: ["Architecture", "Light", "Traditional"]
  },
  {
    id: "ghat-rhythm",
    title: "Ghat Rhythm",
    description: "Steel kinetic sculpture capturing the relentless flow of the Ganges.",
    longDescription: "Steel blades rotate with the updrafts from the river valley, capturing the motion of water and air.",
    imageUrl: "/images/project15.png",
    aspectRatio: 0.8,
    year: "2024",
    category: "kinetic",
    materials: ["Brushed Steel", "River Stone"],
    tags: ["River", "Motion", "Nature"]
  },
  {
    id: "indigo-echo",
    title: "Indigo Echo",
    description: "Deep blue geometric volumes resonating with the Blue City architecture.",
    longDescription: "Powdered cobalt and concrete creating deep blue geometric forms that resonate with Jodhpur's architectural identity.",
    imageUrl: "/images/project16.png",
    aspectRatio: 0.9,
    year: "2023",
    category: "sculpture",
    materials: ["Powdered Cobalt", "Concrete"],
    tags: ["Blue", "Geometry", "Architecture"]
  },
  {
    id: "temple-geometry",
    title: "Temple Geometry",
    description: "Granite monolith with intricate gold leaf patterns.",
    longDescription: "The precision of Dravidian architecture distilled into a single, gold-veined monolith.",
    imageUrl: "/images/project17.png",
    aspectRatio: 0.67,
    year: "2024",
    category: "sculpture",
    materials: ["Granite", "Gold Leaf"],
    tags: ["Temple", "Gold", "Precision"]
  },
  {
    id: "salt-monolith",
    title: "Salt Monolith",
    description: "White marble sculpture disappearing into the white salt marshes.",
    longDescription: "A sculpture that tracks the sun's path across the infinite horizon of the Rann of Kutch.",
    imageUrl: "/images/project18.png",
    aspectRatio: 0.75,
    year: "2024",
    category: "sculpture",
    materials: ["White Marble", "Polished Steel"],
    tags: ["Minimalism", "Desert", "Light"]
  },

  {
    id: "tidal-breather",
    title: "Tidal Breather",
    description: "A biological/mechanical installation that responds to environmental humidity and tidal patterns.",
    longDescription: "A series of bronze 'breathers' that expand and contract. The work uses environmental sensors to move with the rhythm of the tides, exploring the concept of a living, mechanical architecture.",
    imageUrl: "/images/project19.png",
    aspectRatio: 1.1,
    year: "2023",
    category: "installation",
    materials: ["Bronze", "Pneumatic Systems"],
    tags: ["Environment", "Breathing", "Tidal"]
  },
  {
    id: "lotus-void",
    title: "Lotus Void",
    description: "White concrete geometric petals creating a void that fills with light.",
    longDescription: "A study in unfolding. The geometric petals create a void that fills with light during twilight hours.",
    imageUrl: "/images/project20.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["White Concrete", "LED"],
    tags: ["Light", "Geometry", "Void"]
  },
  {
    id: "basalt-dialogue-ii",
    title: "Basalt Dialogue II",
    description: "The interaction of textures between polished obsidian and rough-hewn volcanic basalt.",
    longDescription: "A study in contrast. The matte, porous surface of the basalt shell protects a perfectly reflective obsidian core, examining the internal vs external identity of the stone.",
    imageUrl: "/images/project21.png",
    aspectRatio: 0.9,
    year: "2023",
    category: "sculpture",
    materials: ["Carved Basalt", "Obsidian"],
    tags: ["Texture", "Duality", "Stone"]
  },
  {
    id: "mist-drift-mesh",
    title: "Mist Drift Mesh",
    description: "An aluminum mesh sculpture designed to capture and diffuse mountain mists.",
    longDescription: "A series of lightweight mesh wings that catch the wind and mist. The semi-transparent surface creates a visual bridge between the solid earth and the atmospheric phenomenon of the mountain valley.",
    imageUrl: "/images/project22.png",
    aspectRatio: 1.4,
    year: "2024",
    category: "kinetic",
    materials: ["Anodized Aluminum Mesh"],
    tags: ["Atmosphere", "Wind", "Incorporeal"]
  },
  {
    id: "marine-skeletal-study",
    title: "Marine Skeletal Study",
    description: "A porous, sintered ceramic form that echoes the intricate biological growth of coral reefs.",
    longDescription: "Developed using algorithmic growth patterns, this ceramic sculpture captures the fragile complexity of marine life. Its skeletal architecture explores the limit of structural stability in the natural world.",
    imageUrl: "/images/project23.png",
    aspectRatio: 1.2,
    year: "2023",
    category: "sculpture",
    materials: ["Sintered Ceramic", "Limestone Base"],
    tags: ["Marine", "Biology", "Algorithmic"]
  },
  {
    id: "iron-epoch",
    title: "Iron Epoch",
    description: "A heavy, grinding kinetic piece celebrating the industrial soul.",
    longDescription: "Raw pig iron and graphite creating a heavy, grinding kinetic piece that celebrates the industrial heritage.",
    imageUrl: "/images/project24.png",
    aspectRatio: 0.8,
    year: "2024",
    category: "kinetic",
    materials: ["Raw Pig Iron", "Graphite"],
    tags: ["Industrial", "Heavy", "Mechanical"]
  },
  {
    id: "spice-echo",
    title: "Spice Echo",
    description: "Red laterite and brass wire in a coastal heritage setting.",
    longDescription: "The color of the earth meets the sheen of trade. A rhythmic wireframe encircling a laterite core.",
    imageUrl: "/images/project25.png",
    aspectRatio: 1.0,
    year: "2023",
    category: "sculpture",
    materials: ["Red Laterite", "Brass Wire"],
    tags: ["Coastal", "Historical", "Wire"]
  },
  {
    id: "glacier-pulse",
    title: "Glacier Pulse",
    description: "Frosted glass sculpture in high-altitude environments.",
    longDescription: "A sculpture that lives in temperatures below zero, where the glass cracks and heals with the freeze-thaw cycle.",
    imageUrl: "/images/project26.png",
    aspectRatio: 1.33,
    year: "2024",
    category: "sculpture",
    materials: ["Frosted Glass", "Cold-Rolled Steel"],
    tags: ["High-Altitude", "Glass", "Thermal"]
  },
  {
    id: "textile-geometry-stone",
    title: "Textile Geometry (Stone)",
    description: "A study in visual softness achieved through the carving of rigid stone jali and silk accents.",
    longDescription: "This work explores the 'textile logic' of stone. The intricate carving mimics the weave of luxury fabrics, accented with silk cords to highlight the threshold between hardness and softness.",
    imageUrl: "/images/project27.png",
    aspectRatio: 0.8,
    year: "2023",
    category: "sculpture",
    materials: ["Intricate Stone Jali", "Silk Thread"],
    tags: ["Textile", "Softness", "Precision"]
  },
  {
    id: "kinetic-array",
    title: "Kinetic Array",
    description: "A dynamic kinetic sculpture with moving parts that respond to environmental forces.",
    longDescription: "An intricate mechanical installation featuring multiple rotating elements. The work explores the relationship between motion, balance, and the passage of time through carefully engineered kinetic systems.",
    imageUrl: "/images/project35.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "kinetic",
    materials: ["Steel", "Mechanical Components"],
    tags: ["Kinetic", "Motion", "Engineering"]
  },
  {
    id: "orbital-rings",
    title: "Orbital Rings",
    description: "Interlocking circular forms in polished metal exploring circular motion and balance.",
    longDescription: "A sculpture composed of multiple interlocking rings that suggest planetary orbits. The polished surfaces create dynamic reflections that change with the viewer's position and available light.",
    imageUrl: "/images/project45.png",
    aspectRatio: 0.75,
    year: "2024",
    category: "sculpture",
    materials: ["Polished Steel", "Chrome"],
    tags: ["Orbital", "Reflection", "Geometry"]
  },
  {
    id: "tension-structure",
    title: "Tension Structure",
    description: "A study in structural tension with cables and metal forms reaching toward equilibrium.",
    longDescription: "An exploration of structural forces, this piece uses tensioned cables and metal rods to create a sense of balanced instability. The work captures the moment before perfect equilibrium, frozen in time.",
    imageUrl: "/images/project48.png",
    aspectRatio: 1.2,
    year: "2024",
    category: "sculpture",
    materials: ["Steel Rods", "Tension Cables"],
    tags: ["Structure", "Tension", "Balance"]
  },
  {
    id: "luminous-orb",
    title: "Luminous Orb",
    description: "An illuminated spherical form with internal light source creating ethereal glow.",
    longDescription: "A sculptural piece featuring an orb with an internal illumination system. The light emanates through carefully designed openings, creating patterns that transform the piece throughout the day.",
    imageUrl: "/images/project51.png",
    aspectRatio: 1.0,
    year: "2024",
    category: "sculpture",
    materials: ["Metal", "LED Lighting"],
    tags: ["Light", "Illumination", "Orb"]
  },
  {
    id: "wind-mechanism",
    title: "Wind Mechanism",
    description: "A wind-powered kinetic sculpture with blades that rotate in response to air currents.",
    longDescription: "An outdoor kinetic installation designed to harness wind energy. The rotating blades create a meditative experience, with each revolution unique based on the prevailing winds.",
    imageUrl: "/images/project54.png",
    aspectRatio: 1.33,
    year: "2024",
    category: "kinetic",
    materials: ["Weathered Steel", "Bearings"],
    tags: ["Wind", "Outdoor", "Kinetic"]
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
