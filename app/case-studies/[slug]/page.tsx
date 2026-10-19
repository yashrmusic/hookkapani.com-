import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/data/case-studies';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Case Study Not Found | Hookkapaani Studio' };
  return {
    title: `${study.title} | Hookkapaani Studio`,
    description: study.summary,
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
    openGraph: {
      title: `${study.title} - Hookkapaani Studio`,
      description: study.summary,
      url: `https://hookkapani.com/case-studies/${study.slug}`,
      siteName: 'Hookkapaani Studio',
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((s) => s.slug !== study.slug);

  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-accent transition-colors">
          ← All case studies
        </Link>

        <h1 className="text-display mt-6 mb-6">{study.title}</h1>
        <p className="text-body text-muted-foreground mb-12">{study.context}</p>

        <div className="space-y-10">
          <section className="border border-border p-6 md:p-8 bg-card/30">
            <h2 className="text-title mb-4">Constraints</h2>
            <ul className="space-y-2">
              {study.constraints.map((c) => (
                <li key={c} className="text-base text-foreground/85">
                  — {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-border p-6 md:p-8 bg-card/30">
            <h2 className="text-title mb-4">Process</h2>
            <p className="text-base text-foreground/85 leading-relaxed">{study.process}</p>
            <p className="text-sm text-muted-foreground mt-4">
              The studio follows the same six steps on every commission: brief, site survey, design
              &amp; engineering, fabrication, installation, service.
            </p>
          </section>

          <section className="border border-border p-6 md:p-8 bg-card/30">
            <h2 className="text-title mb-4">Outcome</h2>
            <p className="text-base text-foreground/85 leading-relaxed">{study.outcome}</p>
            <p className="text-base mt-4">
             
            </p>
          </section>
        </div>

        <div className="mt-14 border border-accent/40 bg-accent/5 p-6 md:p-8 text-center">
          <h2 className="text-title mb-3">Planning something similar?</h2>
          <p className="text-muted-foreground mb-6">
            Send a brief with your site and scope — the studio replies within 2 business days.
          </p>
          <Link
            href="/commission"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors min-h-[44px]"
          >
            Submit a project brief
          </Link>
        </div>

        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">More case studies</h2>
            {others.map((o) => (
              <Link key={o.slug} href={`/case-studies/${o.slug}`} className="block border border-border p-5 bg-card/30 hover:border-accent transition-colors">
                <span className="font-medium">{o.title}</span>
                <span className="block text-sm text-muted-foreground mt-1">{o.summary}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
