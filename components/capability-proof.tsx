const capabilities = [
  {
    title: 'Engineering & Fabrication',
    points: ['Material testing', 'Load-aware structure', 'Serviceable assemblies'],
  },
  {
    title: 'Installation Readiness',
    points: ['Site drawings', 'Power and anchoring specs', 'Transport and rigging support'],
  },
  {
    title: 'Operational Reliability',
    points: ['Maintenance guidance', 'Replacement part strategy', 'Post-install review'],
  },
];

export function CapabilityProof() {
  return (
    <section id="capability" className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-headline mb-4">Proof of Capability</h2>
        <p className="text-muted-foreground max-w-3xl mb-10">
          A studio process designed for real-world delivery: technical clarity, fabrication discipline,
          and installation reliability.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((item) => (
            <div key={item.title} className="border border-border p-6 bg-card/30">
              <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point}>- {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
