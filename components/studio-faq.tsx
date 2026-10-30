import { studioFaq } from '@/data/faq';
import { WEBSITE_ID, absoluteUrl, jsonLd } from '@/lib/seo';

interface StudioFaqProps {
  /** Path of the page the block sits on — the FAQPage schema describes that page. */
  path: string;
  /** Render inside an existing page container instead of as a full-width homepage section. */
  embedded?: boolean;
}

/**
 * Visible Q&A block plus its FAQPage schema, both built from data/faq.ts so the
 * markup never describes anything that is not shown. Server-rendered, no
 * entrance animation: the text is in the HTML and visible without JavaScript.
 */
export function StudioFaq({ path, embedded = false }: StudioFaqProps) {
  const url = absoluteUrl(path);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: studioFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const items = (
    <div className="grid md:grid-cols-2 gap-6">
      {studioFaq.map((item) => (
        <div key={item.question} className="border border-border p-6 bg-card/30">
          <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
          <p className="text-sm text-foreground/85 leading-relaxed">{item.answer}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      {embedded ? (
        <section id="faq" aria-labelledby="faq-heading" className="mb-14">
          <h2 id="faq-heading" className="text-2xl font-semibold mb-6">
            Frequently asked questions
          </h2>
          {items}
        </section>
      ) : (
        <section id="faq" aria-labelledby="faq-heading" className="py-20 md:py-28 bg-background border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-headline mb-10">
              Frequently asked questions
            </h2>
            {items}
          </div>
        </section>
      )}
    </>
  );
}
