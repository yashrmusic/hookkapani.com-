import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Hookkapaani Studio',
  description:
    'Detailed case studies covering constraints, process, engineering approach, and outcomes.',
};

const caseStudies = [
  {
    id: 'atrium-kinetic-installation',
    title: 'Corporate Atrium Kinetic Installation',
    context:
      'A 9-floor corporate atrium requiring a visually calm but mechanically expressive centerpiece.',
    constraints: ['High airflow variability', 'Low maintenance requirement', 'Tight installation window'],
    process:
      'Developed modular fabrication units with balanced moving elements and controlled mass distribution.',
    outcome:
      'Completed in 14 weeks including installation, with periodic service interval documented at quarterly checks.',
    budgetBand: 'INR 12L - 18L',
  },
  {
    id: 'gallery-motion-series',
    title: 'Gallery Motion Series',
    context: 'Three linked works for a curated exhibition centered on temporal transformation.',
    constraints: ['Gallery load limits', 'Quiet operation', 'Flexible layout for curation'],
    process:
      'Built lightweight kinetic assemblies using steel, brass, and low-noise motion elements.',
    outcome:
      'Increased visitor dwell time and generated multi-publication media coverage for the exhibition.',
    budgetBand: 'INR 8L - 14L',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-display mb-6">Case Studies</h1>
        <p className="text-body text-muted-foreground mb-12">
          Structured breakdowns of commissioned projects for clients evaluating scope, reliability, and fit.
        </p>

        <div className="space-y-10">
          {caseStudies.map((study) => (
            <article key={study.id} id={study.id} className="border border-border p-6 md:p-8 bg-card/30">
              <h2 className="text-title mb-4">{study.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{study.context}</p>
              <p className="text-sm mb-3"><span className="text-accent">Constraints:</span> {study.constraints.join(', ')}</p>
              <p className="text-sm mb-3"><span className="text-accent">Process:</span> {study.process}</p>
              <p className="text-sm mb-3"><span className="text-accent">Outcome:</span> {study.outcome}</p>
              <p className="text-sm"><span className="text-accent">Budget Band:</span> {study.budgetBand}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
