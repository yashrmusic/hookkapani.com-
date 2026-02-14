import Link from 'next/link';

const studies = [
  {
    slug: 'atrium-kinetic-installation',
    title: 'Corporate Atrium Kinetic Installation',
    summary: 'Commissioned large-format suspended sculpture for a high-traffic corporate atrium.',
    outcome: 'Delivered in 14 weeks, with low-maintenance motion system and night-lighting mode.',
  },
  {
    slug: 'gallery-motion-series',
    title: 'Gallery Motion Series',
    summary: 'Three-part kinetic series for a contemporary gallery program.',
    outcome: 'Improved visitor dwell time and press pickup through process-driven curation.',
  },
];

export function CaseStudiesPreview() {
  return (
    <section id="case-studies" className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-headline mb-3">Case Studies</h2>
            <p className="text-muted-foreground max-w-2xl">
              Structured project breakdowns for collectors, curators, and design teams evaluating fit.
            </p>
          </div>
          <Link href="/case-studies" className="text-sm uppercase tracking-wider text-accent hover:text-accent/80">
            View All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <article key={study.slug} className="border border-border p-6 bg-card/40">
              <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{study.summary}</p>
              <p className="text-sm mb-5">{study.outcome}</p>
              <Link href={`/case-studies#${study.slug}`} className="text-xs uppercase tracking-wider text-accent hover:text-accent/80">
                Read Case Study
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
