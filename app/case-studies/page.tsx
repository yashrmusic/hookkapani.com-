import { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/data/case-studies';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Case Studies — Commissioned Kinetic Installations',
  description:
    'How Hookkapaani delivers commissions: a 9-floor corporate atrium installation and a gallery motion series, with constraints, process and outcomes.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-display mb-6">Case Studies</h1>
        <p className="text-body text-muted-foreground mb-12">
          Detailed accounts of commissioned projects, for clients assessing scope, reliability and fit.
        </p>

        <div className="space-y-10">
          {caseStudies.map((study) => (
            <article key={study.slug} className="border border-border p-6 md:p-8 bg-card/30">
              <h2 className="text-title mb-4">{study.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{study.summary}</p>
              <p className="text-sm mb-3">
                <span className="text-accent">Outcome:</span> {study.outcome}
              </p>
              <Link href={`/case-studies/${study.slug}`} className="text-sm font-medium text-accent hover:text-accent/80">
                Read the full case study →
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-12">
          Planning a project?{' '}
          <Link href="/commission" className="text-accent-bright hover:text-accent-bright/80">
            Submit a commission brief
          </Link>{' '}
          or{' '}
          <Link href="/portfolio" className="text-accent hover:text-accent/80">
            browse all works
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
