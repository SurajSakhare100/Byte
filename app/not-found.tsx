import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Page not found',
  description: 'The page you are looking for does not exist or may have been moved.',
  path: '/404',
  noIndex: true,
  image: site.images.icon,
});

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <Image
        src={site.images.icon}
        alt={site.name}
        width={120}
        height={120}
        priority
        className="rounded-2xl"
      />

      <p className="mt-8 text-7xl font-black tracking-tight text-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">That page took a coffee break.</h1>
      <p className="mt-3 max-w-md text-zinc-500">
        The article or page you&apos;re looking for doesn&apos;t exist, was moved, or the link may
        be broken.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white dark:text-black"
        >
          Back home
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-bold dark:border-zinc-700"
        >
          Browse articles
        </Link>
        <Link
          href="/search"
          className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-bold dark:border-zinc-700"
        >
          Search
        </Link>
      </div>
    </section>
  );
}
