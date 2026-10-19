import { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies | Hookkapaani Studio',
  description:
    'Detailed case studies covering constraints, process, engineering approach, and outcomes.',
  alternates: {
    canonical: '/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-display mb-6">Case Studies</h1>
        <p className="text-body text-muted-foreground mb-12">
          Structured breakdowns of commissioned projects for clients evaluating scope, reliability, and fit.
        </p>

        <div className="space-y-10">
          {caseStudies.map((study) => (
            <article key={study.slug} className="border border-border p-6 md:p-8 bg-card/30">
              <h2 className="text-title mb-4">{study.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{study.summary}</p>
              <p className="text-sm mb-3">
                <span className="text-accent">Outcome:</span> {study.outcome}
              </p>
              <p className="text-sm mb-6">
                <span className="text-accent">Budget Band:</span> {study.budgetBand}
              </p>
              <Link href={`/case-studies/${study.slug}`} className="text-sm font-medium text-accent hover:text-accent/80">
                Read the full case study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
