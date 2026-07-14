import type { Metadata } from 'next';
import { site } from '@/lib/site';

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
    images: [
      {
        url: site.images.og,
        width: 980,
        height: 980,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.images.og],
    creator: site.social.twitter,
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
