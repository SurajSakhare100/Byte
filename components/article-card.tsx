import Link from 'next/link';
import { Clock3 } from 'lucide-react';
import type { Post } from '@/lib/post-types';
import { tagPath } from '@/lib/slug';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));

const coverStyle = (coverImage: string) =>
  coverImage.startsWith('/')
    ? {
        backgroundImage: `url(${coverImage})`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
      }
    : { background: coverImage };

export function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-950">
      <Link href={`/blog/${post.slug}`}>
        <div
          className="h-40 bg-gradient-to-br from-zinc-950 to-zinc-500 p-5"
          style={coverStyle(post.coverImage)}
        >
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <Clock3 size={13} />
          {post.readingTime}
          <span>·</span>
          {formatDate(post.date)}
        </div>

        <h2 className="text-lg font-bold tracking-tight break-words sm:text-xl group-hover:text-brand">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              href={tagPath(tag)}
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
