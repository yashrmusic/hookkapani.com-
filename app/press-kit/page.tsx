import { Metadata } from 'next';
import Link from 'next/link';
import { getArtworkById } from '@/data/artworks';
import { FOUNDER_TRAINING, SCALE_INTERVIEW, STUDIO_REACH } from '@/data/founder';
import { sizeLabel } from '@/lib/artwork-utils';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Press Kit',
  description:
    'Hookkapani press kit: studio and founder bios, fact sheet, logo, portfolio PDF, selected works and media contact for editors and curators.',
  path: '/press-kit',
});

const selectedWorks = ['new-work-28', 'new-work-22', 'new-work-26', 'new-work-32', 'new-work-17', 'new-work-30']
  .map((id) => getArtworkById(id))
  .filter(Boolean);

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-display mb-6">Press Kit</h1>
        <p className="text-muted-foreground mb-10">
          A concise media package for editors, curators, and collaborators.
        </p>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Studio Overview</h2>
          <p className="text-sm leading-relaxed">
            Hookkapani is a kinetic sculpture studio based in New Delhi, focused
            on industrial materials, controlled motion systems, and site-aware installations.
          </p>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Fact Sheet</h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div><dt className="text-muted-foreground">Studio</dt><dd className="font-medium">Hookkapani</dd></div>
            <div><dt className="text-muted-foreground">Founder</dt><dd className="font-medium">Vishal Gupta — Kinetic Sculptor</dd></div>
            <div><dt className="text-muted-foreground">Based</dt><dd className="font-medium">New Delhi, India</dd></div>
            <div><dt className="text-muted-foreground">Works</dt><dd className="font-medium">38 sculptures &amp; installations</dd></div>
            <div><dt className="text-muted-foreground">Largest work</dt><dd className="font-medium">The Bull — 17 ft</dd></div>
            <div><dt className="text-muted-foreground">Selected commission</dt><dd className="font-medium">9-floor corporate atrium, delivered in 14 weeks</dd></div>
          </dl>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Founder Bio</h2>
          <p className="text-sm leading-relaxed mb-4">
            <strong>Short:</strong> Vishal Gupta, founder and lead artist of Hookkapani Studio, is a New Delhi
            kinetic sculptor trained as a painter at Delhi College of Art. He leads the studio&apos;s artistic and
            fabrication direction, with a practice centred on material transformation and mechanical rhythm.
          </p>
          <p className="text-sm leading-relaxed">
            <strong>Long:</strong> Vishal Gupta is a New Delhi-based kinetic sculptor and the founder of
            Hookkapani Studio. {FOUNDER_TRAINING} Working in steel, resin and found industrial material, he
            builds sculptures whose mechanisms are part of the artwork — engineered to be serviced, not sealed.
            The studio&apos;s 38 works range from tabletop pieces to a 17 ft bull, and its commissions include a
            suspended kinetic installation for a 9-floor corporate atrium, delivered in 14 weeks, and a
            three-work motion series for a contemporary gallery programme. {STUDIO_REACH}
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Training and background as told to{' '}
            <a href={SCALE_INTERVIEW.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
              {SCALE_INTERVIEW.publication} ({SCALE_INTERVIEW.date})
            </a>
            .
          </p>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Coverage</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://scalemag.online/art/in-focus/hookkapani-the-kinetic-world-of-vishal-gupta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80"
              >
                Hookkapani: The Kinetic World of Vishal Gupta
              </a>{' '}
              <span className="text-muted-foreground">— Scale, interview by Aishwarya Kulkarni, 16 April 2026</span>
            </li>
          </ul>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Brand Assets</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/images/hookkapani-logo-red.png" download className="text-accent hover:text-accent/80">
                Studio logo (PNG, red on transparent)
              </a>
            </li>
            <li>
              <a href="/portfolio.pdf" download="Hookkapani_Portfolio_2026.pdf" className="text-accent hover:text-accent/80">
                Full portfolio catalogue (PDF, 13 MB)
              </a>
            </li>
            <li>
              <Link href="/case-studies" className="text-accent hover:text-accent/80">
                Case studies — atrium installation &amp; gallery series
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Selected Works — Images</h2>
          <p className="text-sm text-muted-foreground mb-4">
            High-resolution images are available from each work page, with captions and credits as listed there.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {selectedWorks.map((w) => (
              <li key={w!.id}>
                <Link href={`/work/${w!.id}`} className="text-accent hover:text-accent/80">
                  {w!.title}
                </Link>{' '}
                <span className="text-muted-foreground">— {sizeLabel(w!)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Media Contact</h2>
          <p className="text-sm">Email: <a className="text-accent" href="mailto:hookkapani.15@gmail.com">hookkapani.15@gmail.com</a></p>
          <p className="text-sm">Phone: <a className="text-accent" href="tel:+919540026221">+91 95400 26221</a></p>
          <p className="text-sm">Location: New Delhi, India</p>
        </section>

        <div className="flex flex-wrap gap-4">
          <a
            href="/portfolio.pdf"
            download="Hookkapani_Portfolio_2026.pdf"
            className="px-5 py-3 bg-accent text-accent-foreground text-sm font-medium min-h-[44px] flex items-center"
          >
            Download the Portfolio (13 MB)
          </a>
          <Link href="/" className="px-5 py-3 border border-border text-sm font-medium min-h-[44px] flex items-center">
            Return to the Website
          </Link>
        </div>
      </div>
    </div>
  );
}
