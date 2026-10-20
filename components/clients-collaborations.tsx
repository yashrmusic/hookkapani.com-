import Link from 'next/link';

const paths = [
  {
    href: '/for/spaces',
    title: 'Commission for a space',
    audience: 'Hospitality groups · Corporate atriums · Public art programmes · Design studios',
    detail: 'A moving centrepiece designed around your site, structure and footfall — surveyed, engineered and installed by the studio.',
    action: 'Start with the works',
  },
  {
    href: '/for/collectors',
    title: 'Collect a work',
    audience: 'Private collectors · Contemporary galleries',
    detail: 'Existing works and editions, with dimensions, materials and availability discussed directly with the studio.',
    action: 'Browse collectable works',
  },
  {
    href: '/for/press',
    title: 'Curate or write about the studio',
    audience: 'Curators · Editors · Researchers',
    detail: 'Case studies, high-resolution images, biographies and the studio fact sheet — everything needed to write or programme.',
    action: 'Open the press kit',
  },
];

export function ClientsCollaborations() {
  return (
    <section id="clients" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-headline mb-4">Clients & Collaborations</h2>
        <p className="text-muted-foreground max-w-3xl mb-10">
          We work alongside architects, curators and fabrication teams to deliver dependable
          installations from concept to commissioning. Choose the path that suits you:
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group border border-border p-6 bg-card/30 hover:border-accent transition-colors flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{path.title}</h3>
              <p className="text-sm text-accent mb-3">{path.audience}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{path.detail}</p>
              <span className="mt-auto text-sm font-medium text-accent">{path.action} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
