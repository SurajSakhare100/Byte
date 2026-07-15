import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://byte.surajx.in';
const INDEXNOW_KEY = 'byteindexnow2026key';
const CONTENT_DIR = path.join(process.cwd(), 'content');

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(path.join(dir, entry.name))
      : entry.name.endsWith('.mdx')
        ? [path.join(dir, entry.name)]
        : [],
  );
}

function collectUrls() {
  const posts = walk(CONTENT_DIR).map((file) => {
    const parsed = matter(fs.readFileSync(file, 'utf8'));
    const data = parsed.data;
    if (data.draft) return null;
    return {
      slug: data.slug ?? path.basename(file, '.mdx'),
      category: data.category ?? 'General',
      tags: data.tags ?? [],
    };
  }).filter(Boolean);

  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  const categories = [...new Set(posts.map((post) => post.category))];

  return [
    SITE_URL,
    `${SITE_URL}/blog`,
    `${SITE_URL}/categories`,
    `${SITE_URL}/search`,
    ...posts.map((post) => `${SITE_URL}/blog/${post.slug}`),
    ...tags.map((tag) => `${SITE_URL}/tags/${slugify(tag)}`),
    ...categories.map((category) => `${SITE_URL}/categories/${slugify(category)}`),
  ];
}

async function submitUrls(urls) {
  const body = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`${endpoint}: ${response.status}`);
  }
}

const urls = collectUrls();
console.log(`Submitting ${urls.length} URLs to IndexNow...`);
await submitUrls(urls);
