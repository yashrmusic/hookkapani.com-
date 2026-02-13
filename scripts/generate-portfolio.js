const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Get the root directory (parent of scripts folder)
const rootDir = path.join(__dirname, '..');

const artworks = [
  { id: "spheroid-ensemble", title: "Spheroid Ensemble", category: "Sculpture", year: "2024", imageUrl: "/images/project1.png", description: "A vertical accumulation of mirrored spheres, capturing a balanced reflection of the surrounding environment.", materials: ["Mirror-Finished Stainless Steel", "Internal Support"], dimensions: "320cm x 120cm x 120cm", tags: ["Reflection", "Minimalism", "Verticality"] },
  { id: "geometric-anatomist", title: "Geometric Anatomist", category: "Sculpture", year: "2024", imageUrl: "/images/project2.png", description: "A faceted study of human form in motion, interacting with a malachite-textured sphere.", materials: ["Verdigris Bronze", "Polished Malachite Resin"], dimensions: "180cm x 120cm x 240cm", tags: ["Anatomy", "Low-Poly", "Interaction"] },
  { id: "crimson-flux", title: "Crimson Flux", category: "Installation", year: "2023", imageUrl: "/images/project3.png", description: "Vibrant red planar forms that oscillate between rigidity and fluid motion.", materials: ["Anodized Aluminum", "High-Gloss Pigment"], dimensions: "Variable", tags: ["Rhythm", "Modular", "Contrast"] },
  { id: "sitar-silhouette", title: "Echo of the Sitar", category: "Sculpture", year: "2023", imageUrl: "/images/project4.png", description: "A weightless wireframe silhouette capturing the ethereal resonance of classical music.", materials: ["Hand-Drawn Copper Wire", "Steel Mesh"], dimensions: "160cm x 140cm x 190cm", tags: ["Sound", "Transparency", "Wireframe"] },
  { id: "organic-metamorphosis", title: "Organic Metamorphosis", category: "Installation", year: "2024", imageUrl: "/images/project5.png", description: "An abstract bronze form bridging natural curves and urban architecture.", materials: ["Cast Bronze", "Structural Steel"], dimensions: "500cm x 300cm x 300cm", tags: ["Urban", "Coastal", "Metamorphosis"] },
  { id: "lunar-dialogue", title: "Lunar Dialogue", category: "Installation", year: "2023", imageUrl: "/images/project6.png", description: "Stark white monoliths in the high-altitude desert creating geometric shadow play.", materials: ["Powder-Coated Aluminum"], dimensions: "500cm height", tags: ["Minimalism", "Light", "Shadow"] },
  { id: "ursine-monolith", title: "Ursine Monolith", category: "Sculpture", year: "2024", imageUrl: "/images/project7.png", description: "A faceted silver polar bear sculpture introducing clinical aesthetic.", materials: ["Polished Chrome", "Faceted Steel"], dimensions: "210cm x 210cm", tags: ["Brutalist", "Ursine", "Reflection"] },
  { id: "ethereal-weave", title: "Ethereal Weave", category: "Sculpture", year: "2023", imageUrl: "/images/project8.png", description: "Contemporary reinterpretation of Rajputana Jali work with intricate brass wire patterns.", materials: ["Polished Brass"], dimensions: "180cm x 180cm x 10cm", tags: ["Jali", "Light", "Shadow"] },
  { id: "companion-noir", title: "Companion Noir", category: "Sculpture", year: "2024", imageUrl: "/images/project9.png", description: "A deep blue pop-surrealist figure with iconic glowing eyes.", materials: ["Matte Polyurethane Resin", "Internal LED"], dimensions: "350cm x 150cm", tags: ["Pop Art", "Surrealism", "Iconic"] },
  { id: "tectonic-breath", title: "Tectonic Breath", category: "Kinetic", year: "2023", imageUrl: "/images/project10.png", description: "Balancing ancient and breathing with weighted granite and teak arms.", materials: ["Teak Wood", "Granite"], dimensions: "280cm x 400cm", tags: ["Organic", "Balance", "Nature"] },
  { id: "cardiac-ocular", title: "Cardiac Ocular", category: "Sculpture", year: "2024", imageUrl: "/images/project11.png", description: "A heart-shaped sculpture with realistic eye and botanical top-work.", materials: ["Hand-Painted Resin", "Silk Botanicals", "Steel Base"], dimensions: "240cm x 160cm x 100cm", tags: ["Surrealism", "Floral", "Anatomical"] },
  { id: "desert-mirage", title: "Desert Mirage", category: "Installation", year: "2023", imageUrl: "/images/project12.png", description: "Chrome surface reflecting heat haze into geometric patterns.", materials: ["Polished Chrome", "Sandstone"], tags: ["Reflection", "Desert", "Optical"] },
  { id: "banyan-resonance", title: "Banyan Resonance", category: "Sculpture", year: "2024", imageUrl: "/images/project13.png", description: "Iron and copper sculpture inspired by aerial roots of the Great Banyan.", materials: ["Cast Iron", "Copper Rootwork"], tags: ["Organic", "Roots", "Nature"] },
  { id: "stepped-silence", title: "Stepped Silence", category: "Sculpture", year: "2023", imageUrl: "/images/project14.png", description: "Tiered terracotta and glass sculpture inspired by India's stepwells.", materials: ["Terracotta", "Glass"], tags: ["Architecture", "Light", "Traditional"] },
  { id: "ghat-rhythm", title: "Ghat Rhythm", category: "Kinetic", year: "2024", imageUrl: "/images/project15.png", description: "Steel kinetic sculpture capturing relentless flow of the Ganges.", materials: ["Brushed Steel", "River Stone"], tags: ["River", "Motion", "Nature"] },
  { id: "indigo-echo", title: "Indigo Echo", category: "Sculpture", year: "2023", imageUrl: "/images/project16.png", description: "Deep blue geometric volumes resonating with Blue City architecture.", materials: ["Powdered Cobalt", "Concrete"], tags: ["Blue", "Geometry", "Architecture"] },
  { id: "temple-geometry", title: "Temple Geometry", category: "Sculpture", year: "2024", imageUrl: "/images/project17.png", description: "Granite monolith with intricate gold leaf patterns.", materials: ["Granite", "Gold Leaf"], tags: ["Temple", "Gold", "Precision"] },
  { id: "salt-monolith", title: "Salt Monolith", category: "Sculpture", year: "2024", imageUrl: "/images/project18.png", description: "White marble sculpture disappearing into white salt marshes.", materials: ["White Marble", "Polished Steel"], tags: ["Minimalism", "Desert", "Light"] },
  { id: "tidal-breather", title: "Tidal Breather", category: "Installation", year: "2023", imageUrl: "/images/project19.png", description: "Biological/mechanical installation responding to environmental humidity and tidal patterns.", materials: ["Bronze", "Pneumatic Systems"], tags: ["Environment", "Breathing", "Tidal"] },
  { id: "lotus-void", title: "Lotus Void", category: "Sculpture", year: "2024", imageUrl: "/images/project20.png", description: "White concrete geometric petals creating void that fills with light.", materials: ["White Concrete", "LED"], tags: ["Light", "Geometry", "Void"] },
  { id: "basalt-dialogue-ii", title: "Basalt Dialogue II", category: "Sculpture", year: "2023", imageUrl: "/images/project21.png", description: "Interaction of textures between polished obsidian and rough-hewn volcanic basalt.", materials: ["Carved Basalt", "Obsidian"], tags: ["Texture", "Duality", "Stone"] },
  { id: "mist-drift-mesh", title: "Mist Drift Mesh", category: "Kinetic", year: "2024", imageUrl: "/images/project22.png", description: "Aluminum mesh sculpture designed to capture and diffuse mountain mists.", materials: ["Anodized Aluminum Mesh"], tags: ["Atmosphere", "Wind", "Incorporeal"] },
  { id: "marine-skeletal-study", title: "Coral Resonance", category: "Sculpture", year: "2023", imageUrl: "/images/project23.png", description: "Porous, sintered ceramic form echoing intricate biological growth of coral reefs.", materials: ["Sintered Ceramic", "Limestone Base"], tags: ["Marine", "Biology", "Algorithmic"] },
  { id: "iron-epoch", title: "Iron Epoch", category: "Kinetic", year: "2024", imageUrl: "/images/project24.png", description: "Heavy, grinding kinetic piece celebrating industrial soul.", materials: ["Raw Pig Iron", "Graphite"], tags: ["Industrial", "Heavy", "Mechanical"] },
  { id: "spice-echo", title: "Spice Echo", category: "Sculpture", year: "2023", imageUrl: "/images/project25.png", description: "Red laterite and brass wire in coastal heritage setting.", materials: ["Red Laterite", "Brass Wire"], tags: ["Coastal", "Historical", "Wire"] },
  { id: "glacier-pulse", title: "Glacier Pulse", category: "Sculpture", year: "2024", imageUrl: "/images/project26.png", description: "Frosted glass sculpture in high-altitude environments.", materials: ["Frosted Glass", "Cold-Rolled Steel"], tags: ["High-Altitude", "Glass", "Thermal"] },
  { id: "textile-geometry-stone", title: "Marwar Weave", category: "Sculpture", year: "2023", imageUrl: "/images/project27.png", description: "Study in visual softness through carving of rigid stone jali and silk accents.", materials: ["Intricate Stone Jali", "Silk Cord"], tags: ["Textile", "Softness", "Precision"] },
  { id: "kinetic-array", title: "Kinetic Array", category: "Kinetic", year: "2024", imageUrl: "/images/project35.png", description: "Dynamic kinetic sculpture with moving parts responding to environmental forces.", materials: ["Steel", "Mechanical Components"], tags: ["Kinetic", "Motion", "Engineering"] },
];

const doc = new PDFDocument({
  size: 'A4',
  info: {
    Title: 'Hookkapaani Portfolio 2024',
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
  doc.fontSize(8).fillColor(textLight).text(`© 2024 Hookkapaani | Page ${pageNum}`, 50, y, { align: 'center', width: doc.page.width - 100 });
}

// COVER
doc.rect(0, 0, doc.page.width, doc.page.height).fill(darkBg);
doc.rect(0, 0, 4, doc.page.height).fill(accent);
doc.circle(doc.page.width - 150, 150, 100).fill(accent).opacity(0.1);

doc.fillColor(white).fontSize(14).font('Helvetica').text('KINETIC SCULPTURE STUDIO', 50, 180);
doc.fontSize(56).font('Helvetica-Bold').text('HOOKKAPAANI', 50, 200);
doc.fontSize(14).font('Helvetica').fillColor(accent).text('PORTFOLIO 2024', 50, 270);
doc.fontSize(11).fillColor(textLight).text('Exploring industrial materials, mechanical motion,', 50, 340).text('and temporal transformation through honest', 50, 355).text('construction and material research.', 50, 370);
doc.moveTo(50, 420).lineTo(200, 420).strokeColor(accent).lineWidth(2).stroke();
doc.fontSize(10).fillColor(textLight).text('NEW DELHI, INDIA', 50, 440).text('EST. 2019', 50, 455);
doc.fontSize(9).fillColor(textGray).text('www.hookkapaani.com', 50, doc.page.height - 50, { align: 'center' });

// ABOUT
doc.addPage();
addFooter(doc, 2, 35);
doc.rect(0, 0, 4, doc.page.height).fill(accent);
doc.fontSize(28).font('Helvetica-Bold').fillColor(textDark).text('About', 50, 50);
doc.fontSize(12).font('Helvetica').fillColor(textDark).text('Hookkapaani is a kinetic sculpture studio exploring the intersection of industrial materials, mechanical motion, and temporal transformation. Founded in 2019 in New Delhi, we create large-scale sculptures that move, breathe, and evolve with time.', 50, 90, { align: 'justify', width: doc.page.width - 100 });
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
doc.fontSize(11).fillColor(textLight).text('hello@hookkapaani.com', 50, doc.y + 15, { align: 'center' });
doc.moveDown(2);
doc.fontSize(14).fillColor(accent).text('INSTAGRAM', 50, doc.y, { align: 'center' });
doc.fontSize(11).fillColor(textLight).text('@hookkapani', 50, doc.y + 15, { align: 'center' });
doc.moveDown(4);
doc.fontSize(9).fillColor(textGray).text('© 2024 Hookkapaani. All rights reserved.', 50, doc.page.height - 40, { align: 'center' });

doc.end();

stream.on('finish', () => {
  console.log('✅ Portfolio PDF created successfully!');
  const stats = fs.statSync(outputPath);
  console.log(`📄 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`🖼️ Total artworks: ${artworks.length}`);
});
