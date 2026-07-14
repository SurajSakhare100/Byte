import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { StructuredData } from '@/components/structured-data';
import { ThemeScript } from '@/components/theme-script';
import { adsense } from '@/lib/adsense';
import { defaultMetadata } from '@/lib/seo';
import { isValidGaMeasurementId } from '@/lib/sanitize';

export const metadata: Metadata = defaultMetadata;

const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const GA_ID = rawGaId && isValidGaMeasurementId(rawGaId) ? rawGaId : undefined;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <StructuredData />
      </head>
      <body className="min-w-0 overflow-x-clip">
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="min-w-0 overflow-x-clip">{children}</main>
        <Footer />
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
