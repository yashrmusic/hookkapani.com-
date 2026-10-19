import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { artworks, getArtworkById } from '@/data/artworks';
import { sizeLabel, isMoving } from '@/lib/artwork-utils';
import type { Artwork } from '@/data/artworks';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface AudiencePage {
  slug: string;
  title: string;
  intro: string;
  workIds: string[];
  priceCta?: boolean;
  body: { heading: string; text: string }[];
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
}

const PAGES: AudiencePage[] = [
  {
    slug: 'spaces',
    title: 'Commission for a space',
    intro:
      'Hotels, corporate atriums, public spaces and the design studios behind them: a moving centrepiece designed around your site — its structure, ceiling, power and footfall — then surveyed, engineered, fabricated and installed by one studio.',
    workIds: ['new-work-26', 'new-work-32', 'new-work-8', 'new-work-28', 'new-work-33', 'new-work-13'],
    body: [
      {
        heading: 'Proven at scale',
        text: 'The corporate atrium commission — a suspended kinetic work across a 9-floor atrium — was completed in 14 weeks including installation, with quarterly service checks documented.',
      },
      {
        heading: 'What the studio needs from you',
        text: 'Site drawings, the available dimensions, and the project timeline. The brief form asks for exactly this, including ceiling height, mounting and power at site.',
      },
    ],
    cta: { href: '/commission', label: 'Submit a project brief' },
    secondary: { href: '/case-studies/atrium-kinetic-installation', label: 'Read the atrium case study' },
  },
  {
    slug: 'collectors',
    title: 'Collect a work',
    intro:
      'For private collectors and galleries: existing works from the studio, with dimensions and materials stated plainly. Availability and editions are confirmed per work directly with the studio — enquire on any piece below and it travels with your brief.',
    workIds: ['new-work-22', 'new-work-17', 'new-work-12', 'new-work-3', 'new-work-20', 'new-work-31'],
    priceCta: true,
    body: [
      {
        heading: 'How collecting works here',
        text: 'Pick a work, enquire through the brief form, and the studio replies within 2 business days with availability, edition details and delivery terms for your city.',
      },
    ],
    cta: { href: '/portfolio', label: 'Browse all 38 works' },
    secondary: { href: '/case-studies/gallery-motion-series', label: 'Read the gallery case study' },
  },
  {
    slug: 'press',
    title: 'Curate or write about the studio',
    intro:
      'For curators, editors and researchers: everything needed to programme or file — case studies, the press kit with bios and brand assets, high-resolution images and the studio fact sheet.',
    workIds: ['new-work-28', 'new-work-22', 'new-work-30'],
    body: [
      {
        heading: 'Fact sheet',
        text: 'Studio: Hookkapaani. Founder: Vishal Gupta, kinetic sculptor. Based: New Delhi, India. Works: 38. Largest work: The Bull, 17 ft. Commissions delivered for corporate atriums and gallery programmes; a 9-floor atrium installation completed in 14 weeks.',
      },
      {
        heading: 'Assets',
        text: 'The press kit carries the studio and founder bios, the logo file and media contact. The portfolio PDF (13 MB) holds the full catalogue; individual high-resolution images sit on each work page.',
      },
    ],
    cta: { href: '/press-kit', label: 'Open the press kit' },
    secondary: { href: '/case-studies', label: 'Read the case studies' },
  },
];

export async function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES.find((p) => p.slug === slug);
  if (!page) return { title: 'Not Found | Hookkapaani Studio' };
  return {
    title: `${page.title} | Hookkapaani Studio`,
    description: page.intro.slice(0, 155),
    alternates: {
      canonical: `/for/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} - Hookkapaani Studio`,
      description: page.intro.slice(0, 155),
      url: `https://hookkapani.com/for/${page.slug}`,
      siteName: 'Hookkapaani Studio',
      type: 'website',
    },
  };
}

function WorkCard({ artwork, priceCta }: { artwork: Artwork; priceCta?: boolean }) {
  return (
    <div className="border border-border bg-card/30 flex flex-col">
      <Link href={`/work/${artwork.id}`} className="group block">
        <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: artwork.aspectRatio || '3/4' }}>
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={75}
          />
        </div>
        <div className="p-5 pb-0">
          <h3 className="font-semibold group-hover:text-accent transition-colors">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground">
            {[sizeLabel(artwork), artwork.materials[0], isMoving(artwork) ? 'Moves' : null].filter(Boolean).join(' · ')}
          </p>
        </div>
      </Link>
      {priceCta && (
        <div className="p-5 mt-auto">
          <Link
            href={`/commission?work=${artwork.id}`}
            className="block text-center py-3 px-4 border border-border text-sm font-medium hover:border-accent hover:text-accent transition-colors min-h-[44px]"
          >
            Enquire
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function AudiencePage({ params }: PageProps) {
  const { slug } = await params;
  const page = PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const works = page.workIds.map((id) => getArtworkById(id)).filter(Boolean) as Artwork[];

  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="text-display mb-6">{page.title}</h1>
        <p className="text-body text-muted-foreground max-w-3xl mb-12">{page.intro}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {works.map((w) => (
            <WorkCard key={w.id} artwork={w} priceCta={page.priceCta} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {page.body.map((block) => (
            <section key={block.heading} className="border border-border p-6 bg-card/30">
              <h2 className="text-lg font-semibold mb-3">{block.heading}</h2>
              <p className="text-sm text-foreground/85 leading-relaxed">{block.text}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href={page.cta.href}
            className="px-8 py-4 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors min-h-[44px] flex items-center"
          >
            {page.cta.label}
          </Link>
          {page.secondary && (
            <Link
              href={page.secondary.href}
              className="px-8 py-4 border border-border font-medium hover:border-accent hover:text-accent transition-colors min-h-[44px] flex items-center"
            >
              {page.secondary.label}
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
