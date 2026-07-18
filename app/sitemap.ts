import type { MetadataRoute } from "next";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";
import { site } from "@/lib/site";
import { categoryPath, tagPath } from "@/lib/slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getTags();
  const categories = getCategories();

  return [
    // Homepage
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    // Blog index
    {
      url: `${site.url}/blog`,
      lastModified: posts.length
        ? new Date(posts[0].updated)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Categories
    {
      url: `${site.url}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Articles
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.9 : 0.8,
    })),

    // Categories
    ...categories.map((category) => ({
      url: `${site.url}${categoryPath(category)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Tags
    ...tags.map((tag) => ({
      url: `${site.url}${tagPath(tag)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
