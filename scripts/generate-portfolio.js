const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Get the root directory (parent of scripts folder)
const rootDir = path.join(__dirname, '..');

const artworks = [
  {
    id: "new-work-1",
    title: "The Little Monarch",
    description: "A whimsical exploration of innocence and authority.",
    imageUrl: "/images/new-work-1.png",
    year: "2026",
    category: "sculpture",
    materials: ["Ceramic", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-3",
    title: "Ephemeral Echo",
    description: "A delicate balance between presence and absence.",
    imageUrl: "/images/new-work-3.png",
    year: "2026",
    category: "sculpture",
    materials: ["Steel Mesh"],
    tags: ["New Work", "Contemplative"]
  },
  {
    id: "new-work-4",
    title: "Pure Fluidity",
    description: "Capturing the essence of motion in a static form.",
    imageUrl: "/images/new-work-4.png",
    year: "2026",
    category: "sculpture",
    materials: ["Polished Plaster"],
    tags: ["New Work", "Minimalist"]
  },
  {
    id: "new-work-5",
    title: "Verdant Muse",
    description: "The face of nature emerging from the earth.",
    imageUrl: "/images/new-work-5.png",
    year: "2026",
    category: "sculpture",
    materials: ["Mixed Media", "Living Flora"],
    tags: ["New Work", "Nature"]
  },
  {
    id: "new-work-6",
    title: "Lunar Explorer",
    description: "A miniature tribute to human curiosity and discovery.",
    imageUrl: "/images/new-work-6.png",
    year: "2026",
    category: "sculpture",
    materials: ["Bronze", "Stone"],
    tags: ["New Work", "Space"]
  },
  {
    id: "new-work-7",
    title: "Vibrant Nexus",
    description: "A collision of primary colors and sharp angles.",
    imageUrl: "/images/new-work-7.png",
    year: "2026",
    category: "sculpture",
    materials: ["Acrylic", "Steel"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-8",
    title: "Midnight Silhouette",
    description: "A stark representation of human form in shadow.",
    imageUrl: "/images/new-work-8.png",
    year: "2026",
    category: "sculpture",
    materials: ["Ebonized Wood"],
    tags: ["New Work", "Monochrome"]
  },
  {
    id: "new-work-9",
    title: "Solar Flare",
    description: "Radiating energy captured in polished metal.",
    imageUrl: "/images/new-work-9.png",
    year: "2026",
    category: "sculpture",
    materials: ["Gold-Plated Steel"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-11",
    title: "The All-Seeing Root",
    description: "Watching eyes emerge from the heart of the forest.",
    imageUrl: "/images/new-work-11.png",
    year: "2026",
    category: "sculpture",
    materials: ["Wood", "Glass Eyeball"],
    tags: ["New Work", "Surreal"]
  },
  {
    id: "new-work-12",
    title: "Scarlet Fragment",
    description: "A sharp interrogation of color and broken symmetry.",
    imageUrl: "/images/new-work-12.png",
    year: "2026",
    category: "sculpture",
    materials: ["Cast Glass"],
    tags: ["New Work", "Energy"]
  },
  {
    id: "new-work-13",
    title: "Azure Surge",
    description: "Capturing the dynamic energy of the ocean.",
    imageUrl: "/images/new-work-13.png",
    year: "2026",
    category: "installation",
    materials: ["Layered Acrylic"],
    tags: ["New Work", "Oceanic"]
  },
  {
    id: "new-work-14",
    title: "Silent Meditation",
    description: "A peaceful form finding balance in minimalism.",
    imageUrl: "/images/new-work-14.png",
    year: "2026",
    category: "sculpture",
    materials: ["Matte Ceramic"],
    tags: ["New Work", "Peace"]
  },
  {
    id: "new-work-15",
    title: "Emerald Crystal",
    description: "Sharp geometric growth mimicking natural minerals.",
    imageUrl: "/images/new-work-15.png",
    year: "2026",
    category: "sculpture",
    materials: ["Resin", "Pigment"],
    tags: ["New Work", "Geometric"]
  },
  {
    id: "new-work-16",
    title: "Sentinel of the Gate",
    description: "A stoic guardian standing watch at the threshold of perception.",
    imageUrl: "/images/new-work-16.png",
    year: "2026",
    category: "sculpture",
    materials: ["Cast Iron", "Obsidian"],
    tags: ["New Work", "Mythic"]
  },
  {
    id: "new-work-18",
    title: "Chromatic Blast",
    description: "An explosion of color frozen in a chaotic yet balanced state.",
    imageUrl: "/images/new-work-18.png",
    year: "2026",
    category: "installation",
    materials: ["Mixed Media"],
    tags: ["New Work", "Color"]
  },
  {
    id: "new-work-19",
    title: "The White Rabbit's Rebirth",
    description: "A surreal, larger-than-life tribute to curiosities and wonder.",
    imageUrl: "/images/new-work-19.png",
    year: "2026",
    category: "sculpture",
    materials: ["Fiberglass", "Auto Finish"],
    tags: ["New Work", "Wonder"]
  },
  {
    id: "new-work-21",
    title: "Amethyst Bloom",
    description: "An organic unfolding of deep violet textures.",
    imageUrl: "/images/new-work-21.png",
    year: "2026",
    category: "sculpture",
    materials: ["Bioplastic"],
    tags: ["New Work", "Organic"]
  },
  {
    id: "new-work-22",
    title: "Midnight Prowler",
    description: "The stealthy grace of the forest captured in matte black.",
    imageUrl: "/images/new-work-22.png",
    year: "2026",
    category: "sculpture",
    materials: ["Carbon Fiber", "Matte Resin"],
    tags: ["New Work", "Power"]
  },
  {
    id: "new-work-23",
    title: "Cognitive Forest",
    description: "The intersection of human thought and natural growth.",
    imageUrl: "/images/new-work-23.png",
    year: "2026",
    category: "installation",
    materials: ["Engineered Wood", "Plaster"],
    tags: ["New Work", "Conceptual"]
  },
  {
    id: "new-work-26",
    title: "The Transmitted Soul",
    description: "A commentary on the digital age and human identity.",
    imageUrl: "/images/new-work-26.png",
    year: "2026",
    category: "sculpture",
    materials: ["Vintage Electronics", "Steel"],
    tags: ["New Work", "Digital"]
  },
  {
    id: "new-work-27",
    title: "Enigma",
    description: "A simplified, hauntingly beautiful interpretation of the human gaze.",
    imageUrl: "/images/new-work-27.png",
    year: "2026",
    category: "sculpture",
    materials: ["Carved Limestone"],
    tags: ["New Work", "Haunting"]
  },
  {
    id: "new-work-28",
    title: "The Red Robin",
    description: "A delicate splash of color and life.",
    imageUrl: "/images/new-work-28.png",
    year: "2026",
    category: "sculpture",
    materials: ["Glass-Reinforced Plastic"],
    tags: ["New Work", "Avian"]
  },
  {
    id: "new-work-31",
    title: "Velocity Red",
    description: "Capturing the high-speed essence of automotive engineering.",
    imageUrl: "/images/new-work-31.png",
    year: "2026",
    category: "sculpture",
    materials: ["Aluminum", "Carbon Fiber"],
    tags: ["New Work", "Automotive"]
  },
  {
    id: "new-work-33",
    title: "Owl in Reflection",
    description: "A study of the midnight hunter in its creative birthplace.",
    imageUrl: "/images/new-work-33.png",
    year: "2026",
    category: "sculpture",
    materials: ["Cast Bronze"],
    tags: ["New Work", "Process"]
  },
  {
    id: "new-work-34",
    title: "The Watchful Berry",
    description: "A surrealist hallucination blending fruit and perception.",
    imageUrl: "/images/new-work-34.png",
    year: "2026",
    category: "sculpture",
    materials: ["Fiberglass", "Acrylic Paint"],
    tags: ["New Work", "Surrealism"]
  },
  {
    id: "new-work-35",
    title: "The Gilded Pedestrian",
    description: "A whimsical traveler resting on the journey between worlds.",
    imageUrl: "/images/new-work-35.png",
    year: "2026",
    category: "installation",
    materials: ["Bronze", "Gold Leaf"],
    tags: ["New Work", "Whimsical"]
  },
  {
    id: "new-work-36",
    title: "The Oracle",
    description: "A wise figure pointing towards celestial truths.",
    imageUrl: "/images/new-work-36.png",
    year: "2026",
    category: "sculpture",
    materials: ["Bronze"],
    tags: ["New Work", "Philosophical"]
  },
  {
    id: "new-work-37",
    title: "Found Memories",
    description: "A portrait of history rebuilt from the fragments of the present.",
    imageUrl: "/images/new-work-37.png",
    year: "2026",
    category: "installation",
    materials: ["Found Objects", "Mixed Media"],
    tags: ["New Work", "Mosaic"]
  },
  {
    id: "new-work-38",
    title: "Luminous Leviathan",
    description: "A bioluminescent wonder from the deep gallery seas.",
    imageUrl: "/images/new-work-38.png",
    year: "2026",
    category: "kinetic",
    materials: ["Plexiglass", "LEDs"],
    tags: ["New Work", "Luminous"]
  },
  {
    id: "new-work-39",
    title: "Void Walker",
    description: "A silent explorer emerging from the shadows of existence.",
    imageUrl: "/images/new-work-39.png",
    year: "2026",
    category: "sculpture",
    materials: ["Cast Resin", "Matte Black Paint"],
    tags: ["New Work", "Alien"]
  },
  {
    id: "new-work-40",
    title: "Layered Existence",
    description: "The human experience seen as a series of geological strata.",
    imageUrl: "/images/new-work-40.jpg",
    year: "2026",
    category: "sculpture",
    materials: ["Bronze"],
    tags: ["New Work", "Time"]
  },
  {
    id: "new-work-41",
    title: "Gaia's Gaze",
    description: "The ancient earth mother watching through emerald eyes.",
    imageUrl: "/images/new-work-41.jpg",
    year: "2026",
    category: "sculpture",
    materials: ["Terracotta", "LEDs", "Silk Plants"],
    tags: ["New Work", "Goddess"]
  },
  {
    id: "new-work-42",
    title: "Corporate Predator",
    description: "A dapper hunter navigating the concrete jungle.",
    imageUrl: "/images/new-work-42.png",
    year: "2026",
    category: "sculpture",
    materials: ["Cast Resin", "Fabric"],
    tags: ["New Work", "Satire"]
  },
  {
    id: "new-work-43",
    title: "Stellar Monarch",
    description: "The cosmic traveler who claimed the golden seat.",
    imageUrl: "/images/new-work-43.jpg",
    year: "2026",
    category: "sculpture",
    materials: ["Gilded Wood", "Lacquer"],
    tags: ["New Work", "Astro-Bunny"]
  },
  {
    id: "new-work-44",
    title: "The Collective",
    description: "A gathering of silent souls in varying states of contemplation.",
    imageUrl: "/images/new-work-44.png",
    year: "2026",
    category: "installation",
    materials: ["Soft-Touch Vinyl", "Fiberglass"],
    tags: ["New Work", "Social"]
  },
  {
    id: "new-work-45",
    title: "The Sphere Bearer",
    description: "Holding the universe within the core of their being.",
    imageUrl: "/images/new-work-45.png",
    year: "2026",
    category: "sculpture",
    materials: ["Polyurethane", "Glass Spheres"],
    tags: ["New Work", "Cosmic"]
  },
  {
    id: "new-work-46",
    title: "Starlight Bloom",
    description: "An organic cocoon glowing with the light of distant nebulas.",
    imageUrl: "/images/new-work-46.png",
    year: "2026",
    category: "installation",
    materials: ["Optical Fiber", "Translucent Resin"],
    tags: ["New Work", "Light"]
  },
  {
    id: "new-work-47",
    title: "Galloping Surface",
    description: "The speed of a stallion transformed into functional sculpture.",
    imageUrl: "/images/new-work-47.png",
    year: "2026",
    category: "sculpture",
    materials: ["High-Gloss Carbon Fiber"],
    tags: ["New Work", "Functional"]
  },
  {
    id: "new-work-48",
    title: "Lithos Whisper",
    description: "The legendary gorgon with a gaze that freezes time and spirit.",
    imageUrl: "/images/new-work-48.png",
    year: "2026",
    category: "sculpture",
    materials: ["Corroded Steel", "Neon"],
    tags: ["New Work", "Legend"]
  }
];

const doc = new PDFDocument({
  size: 'A4',
  info: {
    Title: 'Hookkapaani Portfolio 2026',
    Author: 'Hookkapaani - Kinetic Sculpture Studio',
    Subject: 'Portfolio of Kinetic Sculptures and Installations',
    Keywords: 'kinetic sculpture, industrial art, metal sculpture, contemporary art'
  }
});

const outputPath = path.join(rootDir, 'public', 'portfolio.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

const darkBg = '#0a0a0a';
const white = '#ffffff';
const accent = '#c9a227';
const textDark = '#1a1a1a';
const textGray = '#666666';
const textLight = '#999999';

function addFooter(doc, pageNum, total) {
  const y = doc.page.height - 30;
  doc.fontSize(8).fillColor(textLight).text(`© 2026 Hookkapaani | Page ${pageNum}`, 50, y, { align: 'center', width: doc.page.width - 100 });
}

// COVER
doc.rect(0, 0, doc.page.width, doc.page.height).fill(darkBg);
doc.rect(0, 0, 4, doc.page.height).fill(accent);
doc.circle(doc.page.width - 150, 150, 100).fill(accent).opacity(0.1);

doc.fillColor(white).fontSize(14).font('Helvetica').text('KINETIC SCULPTURE STUDIO', 50, 180);
doc.fontSize(56).font('Helvetica-Bold').text('HOOKKAPAANI', 50, 200);
doc.fontSize(14).font('Helvetica').fillColor(accent).text('PORTFOLIO 2026', 50, 270);
doc.fontSize(11).fillColor(textLight).text('Exploring industrial materials, mechanical motion,', 50, 340).text('and temporal transformation through honest', 50, 355).text('construction and material research.', 50, 370);
doc.moveTo(50, 420).lineTo(200, 420).strokeColor(accent).lineWidth(2).stroke();
doc.fontSize(10).fillColor(textLight).text('NEW DELHI, INDIA', 50, 440).text('EST. 2026', 50, 455);
doc.fontSize(9).fillColor(textGray).text('www.hookkapaani.com', 50, doc.page.height - 50, { align: 'center' });

// ABOUT
doc.addPage();
addFooter(doc, 2, 35);
doc.rect(0, 0, 4, doc.page.height).fill(accent);
doc.fontSize(28).font('Helvetica-Bold').fillColor(textDark).text('About', 50, 50);
doc.fontSize(12).font('Helvetica').fillColor(textDark).text('Hookkapaani is a kinetic sculpture studio exploring the intersection of industrial materials, mechanical motion, and temporal transformation. Founded in 2026 in New Delhi, we create large-scale sculptures that move, breathe, and evolve with time.', 50, 90, { align: 'justify', width: doc.page.width - 100 });
doc.moveDown();
doc.text('Our work celebrates the honest beauty of raw materials - steel, copper, bronze, and iron. We believe that the marks of making: welds, joints, and assembly methods should be visible, not hidden. Each piece carries the history of its creation.', { align: 'justify', width: doc.page.width - 100 });
doc.moveDown();
doc.fontSize(16).font('Helvetica-Bold').fillColor(accent).text('Philosophy', 50, doc.y + 20);
doc.moveDown();
doc.fontSize(10).font('Helvetica').fillColor(textDark);

const philosophies = [
  ['Honest Materials', 'We celebrate raw, unadorned industrial materials.'],
  ['Visible Construction', 'The process of making is as important as the finished form.'],
  ['Kinetic Intelligence', 'Motion is not decoration but inquiry.'],
  ['Temporal Awareness', 'Art evolves through oxidation, wear, and environmental interaction.'],
  ['Industrial Heritage', 'We honor manufacturing history and mechanical ingenuity.']
];

philosophies.forEach(([title, desc], i) => {
  doc.font('Helvetica-Bold').text(`${i + 1}. ${title}`, 50, doc.y + 10);
  doc.font('Helvetica').text(desc, 200, doc.y - 5, { width: 350 });
  doc.moveDown(0.5);
});

// SERVICES
doc.addPage();
addFooter(doc, 3, 35);
doc.rect(0, 0, 4, doc.page.height).fill(accent);
doc.fontSize(28).font('Helvetica-Bold').fillColor(textDark).text('Services', 50, 50);

const services = [
  ['Commissioned Sculptures', 'Bespoke kinetic and static sculptures tailored to your vision and space.'],
  ['Site-Specific Installation', 'Works that respond to architectural context, engaging with space, light, and environment.'],
  ['Material Research', 'Exploring properties and aesthetic potential of industrial metals.'],
  ['Restoration & Maintenance', 'Care and preservation of kinetic sculptures for longevity.']
];

services.forEach(([title, desc], i) => {
  doc.fontSize(14).font('Helvetica-Bold').fillColor(accent).text(title, 50, 100 + (i * 70));
  doc.fontSize(10).font('Helvetica').fillColor(textDark).text(desc, 50, 120 + (i * 70), { width: 450 });
  doc.moveTo(50, 140 + (i * 70)).lineTo(500, 140 + (i * 70)).strokeColor('#eee').lineWidth(0.5).stroke();
});

// ARTWORKS
let pageNum = 4;

artworks.forEach((artwork, index) => {
  doc.addPage();
  addFooter(doc, pageNum, 35);
  pageNum++;

  doc.rect(0, 0, 4, doc.page.height).fill(accent);

  doc.fontSize(10).font('Helvetica').fillColor(accent).text(`0${index + 1}`, 50, 35);
  doc.fontSize(22).font('Helvetica-Bold').fillColor(textDark).text(artwork.title, 50, 55);
  doc.fontSize(10).font('Helvetica').fillColor(textGray).text(`${artwork.category.toUpperCase()}  •  ${artwork.year}`, 50, 82);
  doc.moveDown(1);

  const imagePath = path.join(rootDir, 'public', artwork.imageUrl.replace('/', ''));
  let imageY = 110;

  if (fs.existsSync(imagePath)) {
    try {
      doc.image(imagePath, 50, imageY, { fit: [300, 220], align: 'center' });
      doc.y = imageY + 230;
    } catch (e) {
      doc.rect(50, imageY, 300, 220).fill('#f0f0f0');
      doc.fontSize(10).fillColor(textGray).text('[Image]', 175, imageY + 100);
      doc.y = imageY + 230;
    }
  } else {
    doc.rect(50, imageY, 300, 220).fill('#f5f5f5');
    doc.fontSize(10).fillColor(textGray).text('[Image Not Available]', 130, imageY + 100);
    doc.y = imageY + 230;
  }

  doc.fontSize(10).font('Helvetica').fillColor(textDark).text(artwork.description, 370, 110, { width: 180, align: 'justify' });

  doc.rect(370, 290, 180, 90).fill('#f8f8f8');
  doc.fontSize(9).font('Helvetica-Bold').fillColor(accent).text('MATERIALS', 380, 305);
  doc.font('Helvetica').fillColor(textDark).text(Array.isArray(artwork.materials) ? artwork.materials.join(', ') : artwork.materials, 380, 320, { width: 160 });

  if (artwork.dimensions) {
    doc.font('Helvetica-Bold').fillColor(accent).text('DIMENSIONS', 380, 350);
    doc.font('Helvetica').fillColor(textDark).text(artwork.dimensions, 380, 365, { width: 160 });
  }
});

// CONTACT
doc.addPage();
addFooter(doc, pageNum, 35);
doc.rect(0, 0, doc.page.width, doc.page.height).fill(darkBg);
doc.rect(0, 0, 4, doc.page.height).fill(accent);

doc.fontSize(32).font('Helvetica-Bold').fillColor(white).text("Let's Create Together", 50, 80, { align: 'center', width: doc.page.width - 100 });
doc.moveDown(2);

doc.fontSize(14).fillColor(accent).text('STUDIO', 50, doc.y, { align: 'center' });
doc.fontSize(11).fillColor(textLight).text('New Delhi, India', 50, doc.y + 15, { align: 'center' });
doc.moveDown(2);
doc.fontSize(14).fillColor(accent).text('EMAIL', 50, doc.y, { align: 'center' });
doc.fontSize(11).fillColor(textLight).text('contact@hookkapaani.com', 50, doc.y + 15, { align: 'center' });
doc.moveDown(2);
doc.fontSize(14).fillColor(accent).text('INSTAGRAM', 50, doc.y, { align: 'center' });
doc.fontSize(11).fillColor(textLight).text('@hookkapani', 50, doc.y + 15, { align: 'center' });
doc.moveDown(4);
doc.fontSize(9).fillColor(textGray).text('© 2026 Hookkapaani. All rights reserved.', 50, doc.page.height - 40, { align: 'center' });

doc.end();

stream.on('finish', () => {
  console.log('✅ Portfolio PDF created successfully!');
  const stats = fs.statSync(outputPath);
  console.log(`📄 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`🖼️ Total artworks: ${artworks.length}`);
});
