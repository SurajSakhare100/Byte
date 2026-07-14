import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';
import { escapeCdata, escapeXml } from '@/lib/sanitize';

export async function GET() {
  const items = getAllPosts()
    .map((post) => {
      const link = `${site.url}/blog/${encodeURIComponent(post.slug)}`;

      return [
        '<item>',
        `<title><![CDATA[${escapeCdata(post.title)}]]></title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid>${escapeXml(link)}</guid>`,
        `<description><![CDATA[${escapeCdata(post.description)}]]></description>`,
        `<pubDate>${escapeXml(new Date(post.date).toUTCString())}</pubDate>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml(site.name)}</title>`,
    `<link>${escapeXml(site.url)}</link>`,
    `<description>${escapeXml(site.description)}</description>`,
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
