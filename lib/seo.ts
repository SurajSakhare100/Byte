import type { Metadata } from 'next';
import type { Post } from '@/lib/post-types';
import { site } from '@/lib/site';
import { categoryPath, tagPath } from '@/lib/slug';
import { toIsoDate } from '@/lib/structured-data';

const defaultOgImage = {
  url: site.images.og,
  width: 1200,
  height: 630,
  alt: site.title,
  type: 'image/png',
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  publisher: site.name,
  applicationName: site.name,
  category: 'technology',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${site.url}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: site.social.twitter,
    creator: site.social.twitter,
    title: site.title,
    description: site.description,
    images: [site.images.og],
  },
  icons: {
    icon: [{ url: site.images.icon, type: 'image/png' }],
    shortcut: [site.images.icon],
    apple: [{ url: site.images.apple, type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'light dark',
  },
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = site.images.og,
}: PageMetadataOptions): Metadata {
  const url = path.startsWith('http') ? path : path;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: site.social.twitter,
      creator: site.social.twitter,
      title,
      description,
      images: [image],
    },
  };
}

export function createArticleMetadata(
  post: Pick<
    Post,
    'title' | 'description' | 'slug' | 'date' | 'updated' | 'author' | 'category' | 'tags' | 'coverImage'
  >,
): Metadata {
  const canonical = `${site.url}/blog/${post.slug}`;
  const imagePath = post.coverImage.startsWith('/') ? post.coverImage : site.images.og;
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${site.url}${imagePath}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      title: post.title,
      description: post.description,
      publishedTime: toIsoDate(post.date),
      modifiedTime: toIsoDate(post.updated),
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      images: [{ url: imageUrl, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: site.social.twitter,
      creator: site.social.twitter,
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export function createTagMetadata(tag: string, articleCount: number): Metadata {
  const path = tagPath(tag);
  const title = `${tag} articles`;
  const description = `Browse ${articleCount} technical article${articleCount === 1 ? '' : 's'} tagged with ${tag} on ${site.name}.`;

  return createPageMetadata({ title, description, path });
}

export function createCategoryMetadata(category: string, articleCount: number): Metadata {
  const path = categoryPath(category);
  const title = `${category} articles`;
  const description = `Explore ${articleCount} ${category} tutorial${articleCount === 1 ? '' : 's'} and guides on ${site.name}.`;

  return createPageMetadata({ title, description, path });
}
