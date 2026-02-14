export function AvailabilityBlock() {
  return (
    <section className="py-16 md:py-20 bg-secondary/20 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-label text-muted-foreground mb-2">Current Commission Window</p>
            <p className="text-title">Q3 - Q4 2026</p>
          </div>
          <div>
            <p className="text-label text-muted-foreground mb-2">Typical Lead Time</p>
            <p className="text-title">10 - 20 Weeks</p>
          </div>
          <div>
            <p className="text-label text-muted-foreground mb-2">Response SLA</p>
            <p className="text-title">2 Business Days</p>
          </div>
        </div>
      </div>
    </section>
  );
}
