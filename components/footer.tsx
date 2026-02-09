export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg text-foreground">Abhigyan x Vishal</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Architecture & Sculpture
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Connect
            </p>
            <a
              href="https://www.instagram.com/hookkapani/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              abhigyanxvishal@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Studio
            </p>
            <p className="text-sm text-foreground">
              New Delhi, India
            </p>
            <p className="text-sm text-foreground">
              Hookkapani Studio
            </p>
            <p className="text-sm text-muted-foreground">
              By appointment only
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            {"Abhigyan x Vishal 2025. All rights reserved."}
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Crafting movement. Carving meaning.
          </p>
        </div>
      </div>
    </footer>
  );
}
