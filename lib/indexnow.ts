import { site } from '@/lib/site';

export const INDEXNOW_KEY = site.indexNow.key;

export const INDEXNOW_KEY_URL = `${site.url}/${INDEXNOW_KEY}.txt`;

export function getIndexNowEndpoints() {
  return [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];
}

export async function submitUrlsToIndexNow(urls: string[]): Promise<{ ok: boolean; details: string[] }> {
  if (!urls.length) return { ok: true, details: ['No URLs to submit.'] };

  const host = new URL(urls[0]).host;
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_URL,
    urlList: urls,
  };

  const details: string[] = [];

  for (const endpoint of getIndexNowEndpoints()) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });

      details.push(`${endpoint}: ${response.status}`);
    } catch (error) {
      details.push(`${endpoint}: ${error instanceof Error ? error.message : 'failed'}`);
    }
  }

  return { ok: details.some((detail) => detail.includes(': 200') || detail.includes(': 202')), details };
}
