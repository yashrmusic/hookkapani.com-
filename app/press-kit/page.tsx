import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Press Kit | Hookkapaani Studio',
  description: 'Studio bio, media assets, and contact details for press and curatorial use.',
};

export default function PressKitPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-display mb-6">Press Kit</h1>
        <p className="text-muted-foreground mb-10">
          A concise media package for editors, curators, and collaborators.
        </p>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Studio Overview</h2>
          <p className="text-sm leading-relaxed">
            Hookkapaani is a kinetic sculpture studio based in New Delhi, focused on industrial materials,
            controlled motion systems, and site-aware installations.
          </p>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Founder Bio</h2>
          <p className="text-sm leading-relaxed">
            Vishal Gupta leads the studio&apos;s artistic and fabrication direction, with practice centered on
            material transformation and mechanical rhythm.
          </p>
        </section>

        <section className="mb-10 border border-border p-6 bg-card/30">
          <h2 className="text-title mb-4">Media Contact</h2>
          <p className="text-sm">Email: <a className="text-accent" href="mailto:studio@hookkapaani.com">studio@hookkapaani.com</a></p>
          <p className="text-sm">Location: New Delhi, India</p>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link href="/portfolio?print=true" className="px-5 py-3 bg-accent text-accent-foreground text-sm uppercase tracking-wider">
            Download Portfolio
          </Link>
          <Link href="/" className="px-5 py-3 border border-border text-sm uppercase tracking-wider">
            Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}
