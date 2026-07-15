import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { findCategoryBySlug, getCategories, getPostsByCategorySlug } from '@/lib/posts';
import { createCategoryMetadata } from '@/lib/seo';
import { categoryPath, slugify } from '@/lib/slug';
import { categoryBreadcrumbJsonLd, collectionPageJsonLd } from '@/lib/structured-data';

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: slugify(category) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const label = findCategoryBySlug(categorySlug);
  if (!label) return {};
  return createCategoryMetadata(label, getPostsByCategorySlug(categorySlug).length);
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const label = findCategoryBySlug(categorySlug);
  const posts = getPostsByCategorySlug(categorySlug);

  if (!label || !posts.length) notFound();

  const path = categoryPath(label);
  const schemas = [
    collectionPageJsonLd({
      name: `${label} articles`,
      description: `${label} tutorials and guides on byte.`,
      path,
      itemCount: posts.length,
    }),
    categoryBreadcrumbJsonLd(label),
  ];

  return (
    <section className="container-page py-10 sm:py-14">
      <p className="text-sm font-bold text-brand">CATEGORY</p>
      <h1 className="mt-2 break-words text-3xl font-black sm:text-5xl">{label}</h1>
      <p className="mt-3 max-w-2xl text-zinc-500">
        {posts.length} article{posts.length === 1 ? '' : 's'} in {label}.
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
