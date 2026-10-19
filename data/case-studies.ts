export interface CaseStudy {
  slug: string;
  title: string;
  context: string;
  constraints: string[];
  process: string;
  outcome: string;
  summary: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'atrium-kinetic-installation',
    title: 'Corporate Atrium Kinetic Installation',
    context:
      'A 9-floor corporate atrium requiring a visually calm but mechanically expressive centerpiece.',
    constraints: ['High airflow variability', 'Low maintenance requirement', 'Tight installation window'],
    process:
      'Developed modular fabrication units with balanced moving elements and controlled mass distribution.',
    outcome:
      'Completed in 14 weeks including installation, with periodic service interval documented at quarterly checks.',
    summary: 'Commissioned large-format suspended sculpture for a high-traffic corporate atrium.',
  },
  {
    slug: 'gallery-motion-series',
    title: 'Gallery Motion Series',
    context: 'Three linked works for a curated exhibition centered on temporal transformation.',
    constraints: ['Gallery load limits', 'Quiet operation', 'Flexible layout for curation'],
    process:
      'Built lightweight kinetic assemblies using steel, brass, and low-noise motion elements.',
    outcome:
      'Increased visitor dwell time and generated multi-publication media coverage for the exhibition.',
    summary: 'Three-part kinetic series for a contemporary gallery program.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug);
}
