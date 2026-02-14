const clients = [
  'Design Studios',
  'Hospitality Groups',
  'Corporate Atriums',
  'Private Collectors',
  'Contemporary Galleries',
  'Public Art Programs',
];

export function ClientsCollaborations() {
  return (
    <section id="clients" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-headline mb-4">Clients & Collaborations</h2>
        <p className="text-muted-foreground max-w-3xl mb-10">
          We collaborate across architecture, curation, and fabrication teams to deliver reliable
          installations from concept to commissioning.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div key={client} className="border border-border px-4 py-5 text-sm uppercase tracking-wider text-muted-foreground bg-card/30">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
