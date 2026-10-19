import Link from 'next/link';
import { caseStudies } from '@/data/case-studies';

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
          <Link href="/case-studies" className="text-sm font-medium text-accent hover:text-accent/80 whitespace-nowrap">
            View all
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <article key={study.slug} className="border border-border p-6 bg-card/40">
              <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{study.summary}</p>
              <p className="text-sm mb-2">{study.outcome}</p>
              <p className="text-sm text-muted-foreground mb-5">Budget band: {study.budgetBand}</p>
              <Link href={`/case-studies/${study.slug}`} className="text-sm font-medium text-accent hover:text-accent/80">
                Read case study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
