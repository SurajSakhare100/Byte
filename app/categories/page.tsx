import Link from 'next/link';
import { getCategories, getAllPosts } from '@/lib/posts';
export default function Categories() {
  const posts = getAllPosts();
  return (
    <section className="container-page py-14">
      <p className="text-sm font-bold text-brand">TOPICS</p>
      <h1 className="mt-2 text-5xl font-black">Categories</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {getCategories().map((c) => (
          <Link
            key={c}
            href={`/categories/${c.toLowerCase()}`}
            className="rounded-2xl border bg-white p-6 hover:border-brand dark:bg-zinc-950"
          >
            <h2 className="text-xl font-bold">{c}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              {posts.filter((p) => p.category === c).length} articles
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
