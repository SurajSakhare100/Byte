import type { MetadataRoute } from 'next';
import { getAllPosts, getCategories, getTags } from '@/lib/posts';
import { site } from '@/lib/site';
import { categoryPath, tagPath } from '@/lib/slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getTags();
  const categories = getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      lastModified: new Date(posts[0]?.updated ?? Date.now()),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${site.url}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${site.url}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.8,
  }));

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${site.url}${tagPath(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}${categoryPath(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...tagPages, ...categoryPages];
}
