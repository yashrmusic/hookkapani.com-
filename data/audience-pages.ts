export interface AudiencePage {
  slug: string;
  title: string;
  /** Meta description — unique per page, written to fit search snippets. */
  description: string;
  intro: string;
  workIds: string[];
  priceCta?: boolean;
  body: { heading: string; text: string }[];
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
    cta: { href: '/commission', label: 'Submit a project brief' },
    secondary: { href: '/case-studies/atrium-kinetic-installation', label: 'Read the atrium case study' },
  },
  {
    slug: 'collectors',
    title: 'Collect a work',
    description:
      'For private collectors and galleries: existing Hookkapaani sculptures with dimensions and materials stated plainly. Enquire on any work for availability.',
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
      'For curators, editors and researchers: Hookkapaani fact sheet, case studies, press kit with bios and brand assets, and high-resolution work images.',
    intro:
      'For curators, editors and researchers: everything needed to programme an exhibition or write about the studio — case studies, the press kit with biographies and brand assets, high-resolution images and the studio fact sheet.',
    workIds: ['new-work-28', 'new-work-22', 'new-work-30'],
    body: [
      {
        heading: 'Fact sheet',
        text: 'Studio: Hookkapaani. Founder: Vishal Gupta, kinetic sculptor. Based: New Delhi, India. Works: 38. Largest work: The Bull, 17 ft. Commissions delivered for corporate atriums and gallery programmes; a 9-floor atrium installation completed in 14 weeks.',
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
