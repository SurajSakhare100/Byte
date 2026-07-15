import Link from 'next/link';
import type { Post } from '@/lib/post-types';

type ArticleInternalLinksProps = {
  related: Post[];
};

export function ArticleInternalLinks({ related }: ArticleInternalLinksProps) {
  if (!related.length) return null;

  return (
    <aside className="not-prose mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Related reading</p>
      <ul className="mt-3 space-y-2">
        {related.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-semibold text-brand underline underline-offset-4 hover:opacity-80"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
