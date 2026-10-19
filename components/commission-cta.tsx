import Link from 'next/link';

export function CommissionCta() {
  return (
    <section id="commission" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-headline mb-6">Have a space in mind?</h2>
        <p className="text-body text-muted-foreground mb-4">
          Send a project brief — scope, site and timeline — and reference the works you
          shortlisted. The form takes about three minutes, in three short steps.
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          What happens next: the studio replies within 2 business days, followed by a site survey
          and a written proposal.
        </p>
        <Link
          href="/commission"
          className="inline-block px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors min-h-[44px]"
        >
          Submit a project brief
        </Link>
      </div>
    </section>
  );
}
