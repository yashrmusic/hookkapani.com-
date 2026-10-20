import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { artworks, getArtworkById } from '@/data/artworks';
import { sizeLabel, isMoving } from '@/lib/artwork-utils';
import type { Artwork } from '@/data/artworks';
import { audiencePages, getAudiencePage } from '@/data/audience-pages';
import { artworkAlt, pageMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return audiencePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAudiencePage(slug);
  if (!page) return { title: 'Not Found', robots: { index: false } };
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/for/${page.slug}`,
  });
}

function WorkCard({ artwork, priceCta }: { artwork: Artwork; priceCta?: boolean }) {
  return (
    <div className="border border-border bg-card/30 flex flex-col">
      <Link href={`/work/${artwork.id}`} className="group block">
        <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: artwork.aspectRatio || '3/4' }}>
          <Image
            src={artwork.imageUrl}
            alt={artworkAlt(artwork)}
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
  const page = getAudiencePage(slug);
  if (!page) notFound();

  const works = page.workIds.map((id) => getArtworkById(id)).filter(Boolean) as Artwork[];

  return (
    <div className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="text-display mb-6">{page.title}</h1>
        <p className="text-body text-muted-foreground max-w-3xl mb-12">{page.intro}</p>

        <h2 className="sr-only">Selected works</h2>
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
    </div>
  );
}
