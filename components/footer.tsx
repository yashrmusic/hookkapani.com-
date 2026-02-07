export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg text-foreground">Form & Matter</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Architecture & Sculpture
              <br />
              Studio based in Lisbon & Tokyo
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Connect
            </p>
            <a
              href="#"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              studio@formandmatter.co
            </a>
            <a
              href="#"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              +351 912 345 678
            </a>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Studio Hours
            </p>
            <p className="text-sm text-foreground">
              Monday - Friday
            </p>
            <p className="text-sm text-foreground">
              {"10:00 - 18:00"}
            </p>
            <p className="text-sm text-muted-foreground">
              By appointment only
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {"Form & Matter Studio 2024. All rights reserved."}
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            A collaboration in material and space
          </p>
        </div>
      </div>
    </footer>
  );
}
