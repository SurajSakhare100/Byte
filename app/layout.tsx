import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { site } from '@/lib/site';
import { adsense } from '@/lib/adsense';
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: `${site.name} — Tech articles to help you build better software`, template: `%s | ${site.name}` }, description: site.description, alternates: { canonical: '/' }, openGraph: { type: 'website', siteName: site.name, title: site.name, description: site.description }, twitter: { card: 'summary_large_image' } };
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`;
import { Analytics } from "@vercel/analytics/next"
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
