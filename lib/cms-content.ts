import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface CmsHeroCard {
  number: string;
  title: string;
}

export interface CmsContent {
  hero: {
    title: string;
    subtitle: string;
    infoCards: CmsHeroCard[];
  };
}

const defaultContent: CmsContent = {
  hero: {
    title: 'HOOKKAPAANI',
    subtitle:
      'Kinetic sculpture studio exploring the intersection of industrial materials, mechanical motion, and temporal transformation.',
    infoCards: [
      {
        number: '01',
        title: 'Kinetic Sculpture',
      },
      {
        number: '02',
        title: 'Industrial Aesthetic',
      },
      {
        number: '03',
        title: 'Temporal Art',
      },
    ],
  },
};

export async function getCmsContent(): Promise<CmsContent> {
  const remoteUrl = process.env.CMS_CONTENT_URL;
  if (remoteUrl) {
    try {
      const response = await fetch(remoteUrl, { next: { revalidate: 60 } });
      if (response.ok) {
        return (await response.json()) as CmsContent;
      }
    } catch {
      // Fall back to local JSON.
    }
  }

  try {
    const fullPath = path.join(process.cwd(), 'data', 'cms-content.json');
    const raw = await readFile(fullPath, 'utf8');
    return JSON.parse(raw) as CmsContent;
  } catch {
    return defaultContent;
  }
}
