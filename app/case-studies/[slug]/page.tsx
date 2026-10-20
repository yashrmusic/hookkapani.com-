import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/data/case-studies';
import { ORGANIZATION_ID, WEBSITE_ID, absoluteUrl, jsonLd, pageMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Case Study Not Found', robots: { index: false } };
  return pageMetadata({
    title: `${study.title} — Case Study`,
    description: `${study.summary} ${study.outcome}`,
    path: `/case-studies/${study.slug}`,
    ogType: 'article',
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((s) => s.slug !== study.slug);
  const url = absoluteUrl(`/case-studies/${study.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#case-study`,
    url,
    name: study.title,
    headline: study.title,
    description: study.summary,
    abstract: study.context,
    genre: 'Case study',
    inLanguage: 'en-IN',
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: url,
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
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
          </section>
        </div>

        <div className="mt-14 border border-accent/40 bg-accent/5 p-6 md:p-8 text-center">
          <h2 className="text-title mb-3">Planning something similar?</h2>
          <p className="text-muted-foreground mb-6">
            Send a brief describing your site and scope; the studio replies within two business days.
          </p>
          <Link
            href="/commission"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors min-h-[44px]"
          >
            Submit a project brief
          </Link>
          <p className="text-sm text-muted-foreground mt-5">
            Or{' '}
            <Link href="/portfolio" className="text-accent hover:text-accent/80">
              browse the studio&apos;s full portfolio of works
            </Link>
            .
          </p>
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
    </div>
  );
}
