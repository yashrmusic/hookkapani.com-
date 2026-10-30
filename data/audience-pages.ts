export interface AudiencePage {
  slug: string;
  title: string;
  /** Meta description — unique per page, written to fit search snippets. */
  description: string;
  intro: string;
  workIds: string[];
  priceCta?: boolean;
  body: { heading: string; text: string }[];
  /**
   * One short section per setting, headed with the search it answers. Site facts
   * only: where the site has no setting-specific fact, the text says so plainly
   * ("as on every site") rather than inventing a difference.
   */
  settings?: { heading: string; text: string; link?: { href: string; label: string } }[];
  /** "What affects the cost" — factors only. Never figures, ranges or a price list. */
  costFactors?: { intro: string; factors: { label: string; text: string }[] };
  /** Show the studio Q&A block (with its FAQPage schema) on this page. */
  showFaq?: boolean;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
}

export const audiencePages: AudiencePage[] = [
  {
    slug: 'spaces',
    title: 'Commission for a space',
    description:
      'Kinetic centrepieces for restaurants, hotels, corporate atriums and public spaces — surveyed, engineered, fabricated and installed by one New Delhi studio.',
    intro:
      'For restaurants, hotels, corporate atriums, public spaces and the design studios behind them: a moving centrepiece designed around your site — its structure, ceiling, power and footfall — then surveyed, engineered, fabricated and installed by a single studio.',
    workIds: ['new-work-26', 'new-work-32', 'new-work-8', 'new-work-28', 'new-work-33', 'new-work-13'],
    body: [
      {
        heading: 'Proven at scale',
        text: 'The corporate atrium commission — a suspended kinetic work spanning a 9-floor atrium — was completed in 14 weeks, including installation, with a documented quarterly service schedule.',
      },
      {
        heading: 'What the studio needs from you',
        text: 'Site drawings, the available dimensions and the project timeline. The brief form asks for precisely this, including ceiling height, mounting and power supply on site.',
      },
    ],
    settings: [
      {
        heading: 'Kinetic installations for restaurants',
        text: "Restaurants are one of the settings the studio designs, engineers, fabricates and installs for. As on every site, the work is designed around the room's structure, ceiling, power and footfall, and the brief form asks for the ceiling height, the mounting (floor-standing, suspended or wall-mounted) and the power supply on site.",
      },
      {
        heading: 'Kinetic installations for hotels',
        text: 'Hotels are one of the settings the studio designs, engineers, fabricates and installs for. As on every site, the studio works from your site drawings and checks power, anchoring points and transport access before anything is built, then provides transport and rigging support, installs the work and commissions its motion system on site.',
      },
      {
        heading: 'Kinetic installations for malls',
        text: 'Malls are one of the settings the studio designs, engineers, fabricates and installs for. As on every site, the work is built as serviceable assemblies — mechanisms designed to be opened, checked and repaired — and followed by maintenance guidance, a replacement-parts plan and a post-installation review.',
      },
      {
        heading: 'Kinetic installations for corporate atriums',
        text: 'For a 9-floor corporate atrium, the studio had to plan for high airflow variability, a low maintenance requirement and a tight installation window. The result was a large-format suspended sculpture built from modular fabrication units, with balanced moving elements and a carefully controlled distribution of mass.',
        link: { href: '/case-studies/atrium-kinetic-installation', label: 'Read the atrium case study' },
      },
    ],
    costFactors: {
      intro:
        'Commercial terms are discussed once the studio has reviewed the site, and the written proposal sets out scope and timeline. These are the factors that shape the cost:',
      factors: [
        { label: 'Size and scale', text: 'the overall dimensions of the work.' },
        { label: 'Materials', text: 'steel, bronze, aluminium or found material.' },
        { label: 'Mechanism complexity', text: 'how much of the work moves and how involved its motion system is.' },
        {
          label: 'Site conditions',
          text: 'ceiling height, anchoring points, power on site, and the rigging and transport needed to bring the work in and install it.',
        },
        { label: 'Timeline', text: 'the time available for design, fabrication and installation.' },
      ],
    },
    showFaq: true,
    cta: { href: '/commission', label: 'Submit a project brief' },
    secondary: { href: '/case-studies/atrium-kinetic-installation', label: 'Read the atrium case study' },
  },
  {
    slug: 'collectors',
    title: 'Collect a work',
    description:
      'For private collectors and galleries: existing Hookkapani sculptures with dimensions and materials stated plainly. Enquire on any work for availability.',
    intro:
      'For private collectors and galleries: existing works from the studio, with dimensions and materials stated plainly. Availability and editions are confirmed directly with the studio for each work — enquire about any piece below and it will be attached to your brief.',
    workIds: ['new-work-22', 'new-work-17', 'new-work-12', 'new-work-3', 'new-work-20', 'new-work-31'],
    priceCta: true,
    body: [
      {
        heading: 'How to acquire a work',
        text: 'Select a work and enquire through the brief form. The studio replies within two business days with availability, edition details and delivery terms for your city.',
      },
    ],
    cta: { href: '/portfolio', label: 'Browse all 38 works' },
    secondary: { href: '/case-studies/gallery-motion-series', label: 'Read the gallery case study' },
  },
  {
    slug: 'press',
    title: 'Curate or write about the studio',
    description:
      'For curators, editors and researchers: Hookkapani fact sheet, case studies, press kit with bios and brand assets, and high-resolution work images.',
    intro:
      'For curators, editors and researchers: everything needed to programme an exhibition or write about the studio — case studies, the press kit with biographies and brand assets, high-resolution images and the studio fact sheet.',
    workIds: ['new-work-28', 'new-work-22', 'new-work-30'],
    body: [
      {
        heading: 'Fact sheet',
        text: 'Studio: Hookkapani. Founder: Vishal Gupta, kinetic sculptor. Based: New Delhi, India. Works: 38. Largest work: The Bull, 17 ft. Commissions delivered for corporate atriums and gallery programmes; a 9-floor atrium installation completed in 14 weeks.',
      },
      {
        heading: 'Assets',
        text: 'The press kit includes the studio and founder biographies, the logo file and the media contact. The portfolio PDF (13 MB) contains the full catalogue; high-resolution images are available on each work page.',
      },
    ],
    cta: { href: '/press-kit', label: 'Open the press kit' },
    secondary: { href: '/case-studies', label: 'Read the case studies' },
  },
];

export function getAudiencePage(slug: string): AudiencePage | undefined {
  return audiencePages.find((p) => p.slug === slug);
}
