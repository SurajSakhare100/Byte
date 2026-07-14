import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { findTagBySlug, getPostsByTagSlug, getTags } from '@/lib/posts';
import { slugify } from '@/lib/slug';

export function generateStaticParams() {
  return getTags().map((tag) => ({ tag: slugify(tag) }));
}

export default async function Tag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const label = findTagBySlug(tagSlug);
  const posts = getPostsByTagSlug(tagSlug);

  if (!label || !posts.length) notFound();

  return (
    <section className="container-page py-10 sm:py-14">
      <p className="text-sm font-bold text-brand">TAG</p>
      <h1 className="mt-2 break-words text-3xl font-black sm:text-5xl">#{label}</h1>
      <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
