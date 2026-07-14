import type { ComponentPropsWithoutRef } from 'react';
import { isValidYouTubeId } from '@/lib/sanitize';

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function YouTubeEmbed({ id }: { id: string }) {
  if (!isValidYouTubeId(id)) return null;

  return (
    <div className="my-7 aspect-video overflow-hidden rounded-xl">
      <iframe
        className="h-full w-full"
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
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    const text = String(children);
    return (
      <h2 id={slug(text)} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
    const text = String(children);
    return (
      <h3 id={slug(text)} {...props}>
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
