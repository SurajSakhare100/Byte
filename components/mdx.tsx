import type { ComponentPropsWithoutRef } from 'react';
import { isValidYouTubeId } from '@/lib/sanitize';
import { slugify } from '@/lib/slug';

function YouTubeEmbed({ id }: { id: string }) {
  if (!isValidYouTubeId(id)) return null;

  return (
    <div className="my-7 aspect-video max-w-full overflow-hidden rounded-xl">
      <iframe
        className="h-full w-full max-w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="YouTube video"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export const mdxComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => {
    const text = String(children);
    return (
      <h2 id={slugify(text)} {...props}>
        {children}
      </h2>
    );
  },
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    const text = String(children);
    return (
      <h2 id={slugify(text)} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
    const text = String(children);
    return (
      <h3 id={slugify(text)} {...props}>
        {children}
      </h3>
    );
  },
  Callout: ({ children }: { children: React.ReactNode }) => (
    <aside className="my-6 rounded-xl border border-zinc-300 bg-zinc-100 p-5 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white">
      <b>Note: </b>
      {children}
    </aside>
  ),
  YouTube: YouTubeEmbed,
};
