import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post } from './post-types';
import { slugify, tagPath, categoryPath } from './slug';
import { site } from './site';

const contentDirectory = path.join(process.cwd(), 'content');
function walk(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : entry.name.endsWith('.mdx')
          ? [path.join(dir, entry.name)]
          : [],
    );
}
export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return walk(contentDirectory)
    .map((file) => {
      const parsed = matter(fs.readFileSync(file, 'utf8'));
      const data = parsed.data as Partial<Post>;
      return {
        title: data.title ?? 'Untitled',
        description: data.description ?? '',
        slug: data.slug ?? path.basename(file, '.mdx'),
        date: data.date ?? '',
        updated: data.updated ?? data.date ?? '',
        author: data.author ?? 'byte team',
        category: data.category ?? 'General',
        tags: data.tags ?? [],
        coverImage: data.coverImage ?? 'linear-gradient(135deg,#111111,#737373)',
        readingTime: data.readingTime ?? readingTime(parsed.content).text,
        featured: Boolean(data.featured),
        draft: Boolean(data.draft),
        content: parsed.content,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export const getPost = (slug: string) => getAllPosts().find((post) => post.slug === slug);
export const getCategories = () => [...new Set(getAllPosts().map((post) => post.category))].sort();
export const getTags = () => [...new Set(getAllPosts().flatMap((post) => post.tags))].sort();

export function getPostsByTagSlug(tagSlug: string) {
  return getAllPosts().filter((post) => post.tags.some((tag) => slugify(tag) === tagSlug));
}

export function getPostsByCategorySlug(categorySlug: string) {
  return getAllPosts().filter((post) => slugify(post.category) === categorySlug);
}

export function findTagBySlug(tagSlug: string) {
  return getTags().find((tag) => slugify(tag) === tagSlug);
}

export function findCategoryBySlug(categorySlug: string) {
  return getCategories().find((category) => slugify(category) === categorySlug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .map((item) => {
      let score = 0;

      // Same category is more important
      if (item.category === post.category) {
        score += 5;
      }

      // Add points for each shared tag
      const sharedTags = item.tags.filter((tag) =>
        post.tags.includes(tag)
      ).length;

      score += sharedTags * 2;

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getAllIndexableUrls(): string[] {
  const posts = getAllPosts();
  const tags = getTags();
  const categories = getCategories();

  return [
    site.url,
    `${site.url}/blog`,
    `${site.url}/categories`,
    `${site.url}/search`,
    ...posts.map((post) => `${site.url}/blog/${post.slug}`),
    ...tags.map((tag) => `${site.url}${tagPath(tag)}`),
    ...categories.map((category) => `${site.url}${categoryPath(category)}`),
  ];
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(date),
  );
}
export function headings(content: string) {
  return [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => ({
    level: match[0].startsWith('###') ? 3 : 2,
    text: match[1],
    id: slugify(match[1]),
  }));
}
