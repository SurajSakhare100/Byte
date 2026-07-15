import { NextResponse } from 'next/server';
import { getAllIndexableUrls } from '@/lib/posts';
import { submitUrlsToIndexNow } from '@/lib/indexnow';

export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_SECRET;
  const authHeader = request.headers.get('authorization');

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let urls = getAllIndexableUrls();

  try {
    const body = (await request.json()) as { urls?: string[] };
    if (body.urls?.length) {
      urls = body.urls;
    }
  } catch {
    // Use all indexable URLs when no body is provided.
  }

  const result = await submitUrlsToIndexNow(urls);

  return NextResponse.json({
    submitted: urls.length,
    ...result,
  });
}
