import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post } from './post-types';

const contentDirectory = path.join(process.cwd(), 'content');
function walk(dir: string): string[] { return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : entry.name.endsWith('.mdx') ? [path.join(dir, entry.name)] : []); }
export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return walk(contentDirectory).map((file) => {
    const parsed = matter(fs.readFileSync(file, 'utf8')); const data = parsed.data as Partial<Post>;
    return { title: data.title ?? 'Untitled', description: data.description ?? '', slug: data.slug ?? path.basename(file, '.mdx'), date: data.date ?? '', updated: data.updated ?? data.date ?? '', author: data.author ?? 'byte team', category: data.category ?? 'General', tags: data.tags ?? [], coverImage: data.coverImage ?? 'linear-gradient(135deg,#111111,#737373)', readingTime: data.readingTime ?? readingTime(parsed.content).text, featured: Boolean(data.featured), draft: Boolean(data.draft), content: parsed.content };
  }).filter((post) => !post.draft).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export const getPost = (slug: string) => getAllPosts().find((post) => post.slug === slug);
export const getCategories = () => [...new Set(getAllPosts().map((post) => post.category))].sort();
export const getTags = () => [...new Set(getAllPosts().flatMap((post) => post.tags))].sort();
export function formatDate(date: string) { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date)); }
export function headings(content: string) { return [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => ({ level: match[0].startsWith('###') ? 3 : 2, text: match[1], id: match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })); }
