// Server component: manifesto content is rendered at full opacity in
// the served HTML, so crawlers that do not scroll still see it.
export function Manifesto() {
  return (
    <section className="py-32 px-6 md:px-10 lg:px-16 bg-background">
      <div className="mx-auto max-w-4xl text-center">
        <p
          className="mb-8 text-xs tracking-[0.4em] uppercase text-muted-foreground"
        >
          Manifesto
        </p>
        <blockquote
          className="font-serif text-3xl leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl"
        >
          We do not simply make sculpture; we engineer motion. Steel is given intent, mechanism
          becomes a form of poetry, and the work is made to breathe, move and transform.
        </blockquote>
        <div
          className="mt-12 flex items-center justify-center gap-8"
        >
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-foreground">
              Vishal Gupta
            </p>
            <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              Founder & Lead Artist
            </p>
          </div>
          <div
            className="h-8 w-px bg-border"
          />
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-foreground">
              Hookkapani Studio
            </p>
            <p className="mt-1 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              New Delhi, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
