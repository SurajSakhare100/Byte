import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { findCategoryBySlug, getCategories, getPostsByCategorySlug } from '@/lib/posts';
import { slugify } from '@/lib/slug';

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: slugify(category) }));
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const label = findCategoryBySlug(categorySlug);
  const posts = getPostsByCategorySlug(categorySlug);

  if (!label || !posts.length) notFound();

  return (
    <section className="container-page py-10 sm:py-14">
      <p className="text-sm font-bold text-brand">CATEGORY</p>
      <h1 className="mt-2 break-words text-3xl font-black sm:text-5xl">{label}</h1>
      <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
