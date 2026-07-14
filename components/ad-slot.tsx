'use client';

import { useEffect, useRef } from 'react';
import { adVariants, adsense, type AdVariant } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  variant?: AdVariant;
  slot?: string;
  label?: string;
  className?: string;
};

export function AdSlot({
  variant = 'banner',
  slot,
  label = 'Advertisement',
  className,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const config = adVariants[variant];
  const adSlot = slot ?? config.slot;
  const isConfigured = Boolean(adsense.client && adSlot);

  useEffect(() => {
    if (!isConfigured || !ref.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may not be available during local development.
    }
  }, [isConfigured, adSlot]);

  if (!isConfigured) {
    return (
      <aside
        aria-label={label}
        className={
          className ??
          'my-8 w-full grid min-h-24 place-items-center rounded-xl border border-dashed bg-zinc-50 text-[10px] font-bold uppercase tracking-[.18em] text-zinc-400 dark:bg-zinc-950'
        }
      >
        {label}
      </aside>
    );
  }

  return (
    <aside
      aria-label={label}
      className={className ?? 'my-8 w-full flex w-full justify-center overflow-hidden'}
    >
      <ins
        ref={ref}
        className="adsbygoogle block w-full"
        style={config.style}
        data-ad-client={adsense.client}
        data-ad-slot={adSlot}
        data-ad-format={config.format}
        {...(config.layout ? { 'data-ad-layout': config.layout } : {})}
        {...(config.fullWidthResponsive ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </aside>
  );
}
