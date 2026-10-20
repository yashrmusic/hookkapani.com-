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
      'A 9-floor corporate atrium that called for a visually calm yet mechanically expressive centrepiece.',
    constraints: ['High airflow variability', 'Low maintenance requirement', 'Tight installation window'],
    process:
      'The studio developed modular fabrication units with balanced moving elements and a carefully controlled distribution of mass.',
    outcome:
      'Completed in 14 weeks, including installation, with documented quarterly servicing.',
    summary: 'A large-format suspended sculpture for a high-traffic corporate atrium.',
  },
  {
    slug: 'gallery-motion-series',
    title: 'Gallery Motion Series',
    context: 'Three linked works for a curated exhibition centred on temporal transformation.',
    constraints: ['Gallery load limits', 'Quiet operation', 'Flexible layout for curation'],
    process:
      'The studio built lightweight kinetic assemblies in steel and brass, with low-noise motion elements.',
    outcome:
      'Increased visitor dwell time and earned the exhibition coverage in multiple publications.',
    summary: 'A three-part kinetic series for a contemporary gallery programme.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug);
}
