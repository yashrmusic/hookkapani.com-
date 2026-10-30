export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Studio Q&A shown on the homepage and /for/spaces. The FAQPage schema is
 * generated from this same list (components/studio-faq.tsx), so the markup can
 * only ever describe text that is visible on the page. Site facts only — do not
 * add an answer the site does not already state.
 */
export const studioFaq: FaqItem[] = [
  {
    question: 'Who is behind Hookkapani?',
    answer:
      'Vishal Gupta, founder and lead artist of Hookkapani Studio, a kinetic sculpture studio based in New Delhi, India.',
  },
  {
    question: 'How long does a commission take?',
    answer:
      "The studio's 9-floor corporate atrium installation was completed in 14 weeks, including installation.",
  },
  {
    question: 'How is a kinetic work maintained?',
    answer:
      'Works are engineered to be opened, checked and repaired, with documented quarterly servicing and a replacement-parts plan.',
  },
  {
    question: 'How do I start?',
    answer:
      'Submit a project brief (about three minutes); the studio replies within two business days, followed by a site survey and a written proposal.',
  },
];
