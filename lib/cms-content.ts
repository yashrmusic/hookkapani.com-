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

const REMOTE_FETCH_TIMEOUT_MS = 4500;
const MAX_HERO_TITLE_LENGTH = 120;
const MAX_HERO_SUBTITLE_LENGTH = 400;
const MAX_CARD_TITLE_LENGTH = 80;
const MAX_CARD_NUMBER_LENGTH = 8;
const MAX_INFO_CARDS = 6;

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

function sanitizeSingleLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized || normalized.length > maxLength) return null;
  return normalized;
}

function sanitizeInfoCard(value: unknown): CmsHeroCard | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const card = value as Record<string, unknown>;
  const number = sanitizeSingleLine(card.number, MAX_CARD_NUMBER_LENGTH);
  const title = sanitizeSingleLine(card.title, MAX_CARD_TITLE_LENGTH);
  if (!number || !title) return null;
  return { number, title };
}

export function validateCmsContent(raw: unknown): CmsContent | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>;
  const heroInput = input.hero;
  if (!heroInput || typeof heroInput !== 'object' || Array.isArray(heroInput)) return null;

  const hero = heroInput as Record<string, unknown>;
  const title = sanitizeSingleLine(hero.title, MAX_HERO_TITLE_LENGTH);
  const subtitle = sanitizeSingleLine(hero.subtitle, MAX_HERO_SUBTITLE_LENGTH);
  const infoCardsRaw = Array.isArray(hero.infoCards) ? hero.infoCards : [];
  const infoCards = infoCardsRaw
    .slice(0, MAX_INFO_CARDS)
    .map((card) => sanitizeInfoCard(card))
    .filter((card): card is CmsHeroCard => card !== null);

  if (!title || !subtitle || infoCards.length === 0) return null;
  return { hero: { title, subtitle, infoCards } };
}

function isAllowedRemoteUrl(remoteUrl: string) {
  try {
    const parsed = new URL(remoteUrl);
    if (parsed.protocol === 'https:') return true;
    if (parsed.protocol === 'http:' && (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function readLocalContent(): Promise<CmsContent> {
  try {
    const fullPath = path.join(process.cwd(), 'data', 'cms-content.json');
    const raw = await readFile(fullPath, 'utf8');
    const parsed = validateCmsContent(JSON.parse(raw));
    if (parsed) return parsed;
  } catch {
    // fall through to default
  }

  return defaultContent;
}

export async function getCmsContent(): Promise<CmsContent> {
  const remoteUrl = process.env.CMS_CONTENT_URL?.trim();
  if (!remoteUrl) {
    return readLocalContent();
  }

  if (!isAllowedRemoteUrl(remoteUrl)) {
    console.warn('Ignoring CMS_CONTENT_URL because it is not an allowed URL scheme/host.');
    return readLocalContent();
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REMOTE_FETCH_TIMEOUT_MS);
    const response = await (async () => {
      try {
        return await fetch(remoteUrl, {
          next: { revalidate: 60 },
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
    })();

    if (response.ok) {
      const parsed = validateCmsContent(await response.json());
      if (parsed) return parsed;
    }
  } catch {
    // Fall back to local JSON.
  }

  return readLocalContent();
}
