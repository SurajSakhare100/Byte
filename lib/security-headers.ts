/**
 * HTTP security headers for the static Next.js site.
 * CSP is tuned for Google AdSense, optional Google Analytics, and YouTube embeds.
 */

export type SecurityHeader = {
  key: string;
  value: string;
};

function buildContentSecurityPolicy(): string {
  const scriptSources = [
    "'self'",
    "'unsafe-inline'", // theme bootstrap + optional GA inline config
    "'unsafe-eval'", // required by some Google ad scripts
    'https://pagead2.googlesyndication.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://googleads.g.doubleclick.net',
    'https://www.google.com',
    'https://www.gstatic.com',
    'https://adservice.google.com',
    'https://*.googlesyndication.com',
    'https://*.adtrafficquality.google',
  ];

  const connectSources = [
    "'self'",
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://pagead2.googlesyndication.com',
    'https://googleads.g.doubleclick.net',
    'https://www.googletagmanager.com',
    'https://vitals.vercel-insights.com',
    'https://*.adtrafficquality.google',
    'https://*.googlesyndication.com',
  ];

  const frameSources = [
    "'self'",
    'https://www.youtube-nocookie.com',
    'https://googleads.g.doubleclick.net',
    'https://tpc.googlesyndication.com',
    'https://www.google.com',
    'https://pagead2.googlesyndication.com',
    'https://*.googlesyndication.com',
  ];

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    `script-src ${scriptSources.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    `connect-src ${connectSources.join(' ')}`,
    `frame-src ${frameSources.join(' ')}`,
    "font-src 'self' data:",
    "manifest-src 'self'",
    "media-src 'self' https:",
    'upgrade-insecure-requests',
  ];

  return directives.join('; ');
}

export function getSecurityHeaders(): SecurityHeader[] {
  return [
    { key: 'Content-Security-Policy', value: buildContentSecurityPolicy() },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value:
        'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=()',
    },
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
    { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  ];
}
