import { site } from '@/lib/site';
import { categoryPath, tagPath } from '@/lib/slug';

export function toIsoDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toISOString();
}

export function publisherJsonLd() {
  return {
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}${site.images.icon}`,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    alternateName: site.title,
    url: site.url,
    description: site.description,
    inLanguage: 'en-US',
    publisher: publisherJsonLd(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    logo: `${site.url}${site.images.icon}`,
    sameAs: site.social.sameAs,
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  coverImage: string;
  content: string;
};

export function articleJsonLd(post: ArticleSchemaInput) {
  const articleUrl = `${site.url}/blog/${post.slug}`;
  const image = post.coverImage.startsWith('/')
    ? `${site.url}${post.coverImage}`
    : `${site.url}${site.images.og}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.updated),
    author: {
      '@type': 'Person',
      name: post.author,
      url: site.url,
    },
    publisher: publisherJsonLd(),
    image: [image],
    articleSection: post.category,
    inLanguage: 'en-US',
    wordCount: post.content.trim().split(/\s+/).filter(Boolean).length,
    isAccessibleForFree: true,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${site.url}${item.path}`,
    })),
  };
}

export function tagBreadcrumbJsonLd(tag: string) {
  return breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: tag, path: tagPath(tag) },
  ]);
}

export function categoryBreadcrumbJsonLd(category: string) {
  return breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: category, path: categoryPath(category) },
  ]);
}

export function articleBreadcrumbJsonLd(post: { title: string; slug: string; category: string }) {
  return breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.category, path: categoryPath(post.category) },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  itemCount,
}: {
  name: string;
  description: string;
  path: string;
  itemCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${site.url}${path}`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
    numberOfItems: itemCount,
  };
}
