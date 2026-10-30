export type Attribution = {
  referrer: string;
  referrerHost: string;
  source: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

const STORAGE_KEY = 'hookkapani-attribution';

function hostOf(value: string): string {
  try {
    return new URL(value).hostname;
  } catch {
    return '';
  }
}

function normalizeSource(utmSource: string, referrerHost: string): string {
  const utm = utmSource.toLowerCase();
  if (utm === 'chatgpt' || utm === 'chatgpt.com') return 'chatgpt.com';
  if (referrerHost === 'chatgpt.com' || referrerHost.endsWith('.chatgpt.com')) return 'chatgpt.com';
  return utmSource || referrerHost || 'direct';
}

function readStored(): Attribution | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<Attribution>;
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.source !== 'string') return null;
    return {
      referrer: typeof parsed.referrer === 'string' ? parsed.referrer : '',
      referrerHost: typeof parsed.referrerHost === 'string' ? parsed.referrerHost : '',
      source: parsed.source,
      utmSource: typeof parsed.utmSource === 'string' ? parsed.utmSource : '',
      utmMedium: typeof parsed.utmMedium === 'string' ? parsed.utmMedium : '',
      utmCampaign: typeof parsed.utmCampaign === 'string' ? parsed.utmCampaign : '',
      utmContent: typeof parsed.utmContent === 'string' ? parsed.utmContent : '',
      utmTerm: typeof parsed.utmTerm === 'string' ? parsed.utmTerm : '',
    };
  } catch {
    return null;
  }
}

// First-touch attribution: the landing page's referrer and UTM parameters
// are kept for the whole visit, so later page views are still credited to
// the source that brought the visitor (for example utm_source=chatgpt.com).
export function readAttribution(): Attribution {
  const stored = readStored();
  if (stored) return stored;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') ?? '';
  const utmMedium = params.get('utm_medium') ?? '';
  const utmCampaign = params.get('utm_campaign') ?? '';
  const utmContent = params.get('utm_content') ?? '';
  const utmTerm = params.get('utm_term') ?? '';
  const referrer = document.referrer;
  const referrerHost = hostOf(referrer);
  const attribution: Attribution = {
    referrer,
    referrerHost,
    source: normalizeSource(utmSource, referrerHost),
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution still works for this page view without storage.
  }
  return attribution;
}
