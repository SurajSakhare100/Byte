import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { findTagBySlug, getPostsByTagSlug, getTags } from '@/lib/posts';
import { createTagMetadata } from '@/lib/seo';
import { slugify, tagPath } from '@/lib/slug';
import { collectionPageJsonLd, tagBreadcrumbJsonLd } from '@/lib/structured-data';

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: slugify(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const label = findTagBySlug(tagSlug);
  if (!label) return {};
  return createTagMetadata(label, getPostsByTagSlug(tagSlug).length);
}

export default async function Tag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const label = findTagBySlug(tagSlug);
  const posts = getPostsByTagSlug(tagSlug);

  if (!label || !posts.length) notFound();

  const path = tagPath(label);
  const schemas = [
    collectionPageJsonLd({
      name: `${label} articles`,
      description: `Articles tagged with ${label} on byte.`,
      path,
      itemCount: posts.length,
    }),
    tagBreadcrumbJsonLd(label),
  ];

  return (
    <section className="container-page py-10 sm:py-14">
      <p className="text-sm font-bold text-brand">TAG</p>
      <h1 className="mt-2 break-words text-3xl font-black sm:text-5xl">#{label}</h1>
      <p className="mt-3 max-w-2xl text-zinc-500">
        {posts.length} article{posts.length === 1 ? '' : 's'} about {label}.
      </p>
      <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    </section>
  );
}
