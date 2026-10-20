import Link from 'next/link';

export function CommissionCta() {
  return (
    <section id="commission" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-headline mb-6">Have a space in mind?</h2>
        <p className="text-body text-muted-foreground mb-4">
          Send a project brief outlining scope, site and timeline, along with any works you have
          shortlisted. The form has three short steps and takes about three minutes.
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          The studio replies within two business days; a site survey and a written proposal
          follow.
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
