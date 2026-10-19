const steps = [
  {
    title: 'Brief',
    detail: 'Share scope, site and timeline through the project brief. Reference works you shortlisted travel with it.',
  },
  {
    title: 'Site survey',
    detail: 'We work from your site drawings and check power, anchoring points and transport access before anything is built.',
  },
  {
    title: 'Design & engineering',
    detail: 'Material testing and load-aware structure, reviewed and signed off with you before fabrication starts.',
  },
  {
    title: 'Fabrication',
    detail: 'Serviceable assemblies built in the New Delhi studio — mechanisms designed to be opened, checked and repaired.',
  },
  {
    title: 'Installation',
    detail: 'Transport and rigging support, on-site installation and commissioning of the motion system.',
  },
  {
    title: 'Service',
    detail: 'Maintenance guidance, a replacement part strategy and a post-install review, so the work keeps moving.',
  },
];

export function CapabilityProof() {
  return (
    <section id="capability" className="py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-headline mb-4">How a commission works</h2>
        <p className="text-muted-foreground max-w-3xl mb-10">
          Six steps from first brief to a moving work on site — the same process behind the corporate
          atrium delivered in 14 weeks and every gallery series since.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="border border-border p-6 bg-card/30">
              <p className="font-mono text-accent text-lg font-bold mb-3">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
