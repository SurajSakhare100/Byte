import Link from 'next/link';
import { getCategories, getAllPosts } from '@/lib/posts';
import { categoryPath } from '@/lib/slug';

export default function Categories() {
  const posts = getAllPosts();

  return (
    <section className="container-page py-10 sm:py-14">
      <p className="text-sm font-bold text-brand">TOPICS</p>
      <h1 className="mt-2 text-3xl font-black sm:text-5xl">Categories</h1>
      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {getCategories().map((category) => (
          <Link
            key={category}
            href={categoryPath(category)}
            className="rounded-2xl border bg-white p-5 hover:border-brand dark:bg-zinc-950 sm:p-6"
          >
            <h2 className="break-words text-lg font-bold sm:text-xl">{category}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              {posts.filter((post) => post.category === category).length} articles
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
