import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArticleCard } from '@/components/article-card';
import { ArticleTools } from '@/components/article-tools';
import { AdSlot } from '@/components/ad-slot';
import { mdxComponents } from '@/components/mdx';
import { formatDate, getAllPosts, getPost, headings } from '@/lib/posts';
import { createArticleMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createArticleMetadata(post);
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = headings(post.content);
  const related = getAllPosts()
    .filter(
      (item) =>
        item.slug !== post.slug &&
        (item.category === post.category || item.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, 3);

  const articleUrl = `${site.url}/blog/${post.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { '@type': 'Person', name: post.author },
    mainEntityOfPage: articleUrl,
    image: post.coverImage.startsWith('/') ? `${site.url}${post.coverImage}` : site.images.og,
  };

  const coverStyle = post.coverImage.startsWith('/')
    ? {
        backgroundImage: `url(${post.coverImage})`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
      }
    : { background: post.coverImage };

  return (
    <>
      <ArticleTools title={post.title} url={articleUrl} />

      <article>
        <div className="container-page py-10">
          <div className="mx-auto max-w-3xl">
            <nav className="text-sm text-zinc-500">
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {post.category}
            </nav>

            <div className="mt-7 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              {post.category}
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-6xl">{post.title}</h1>
            <p className="mt-5 text-xl leading-8 text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{post.author}</span>
              <span>·</span>
              <time>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
              {post.updated !== post.date && (
                <>
                  <span>·</span>
                  <span>Updated {formatDate(post.updated)}</span>
                </>
              )}
            </div>
          </div>

          <div
            className="mx-auto mt-10 h-64 max-w-5xl rounded-3xl bg-gradient-to-br from-black to-zinc-500 sm:h-96"
            style={coverStyle}
          />
        </div>

        <AdSlot variant="banner" label="Advertisement" />

        <div className="container-page grid max-w-7xl gap-12 lg:grid-cols-[190px_minmax(0,700px)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">On this page</p>
              <ul className="mt-4 space-y-2 text-sm">
                {toc.map((heading) => (
                  <li className={heading.level === 3 ? 'pl-3' : ''} key={heading.id}>
                    <a className="text-zinc-500 hover:text-brand" href={`#${heading.id}`}>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="prose-blog">
            <MDXRemote source={post.content} components={mdxComponents} />
            <AdSlot variant="inArticle" label="Advertisement" />
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  href={`/tags/${tag.toLowerCase()}`}
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="container-page mt-20">
        <h2 className="text-2xl font-bold">Keep reading</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ArticleCard key={item.slug} post={item} />
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
