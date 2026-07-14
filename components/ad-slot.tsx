'use client';

import { useEffect, useRef, useState } from 'react';
import { adVariants, adsense, type AdVariant } from '@/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdState = 'loading' | 'filled' | 'unfilled';

type AdSlotProps = {
  variant?: AdVariant;
  slot?: string;
  label?: string;
  className?: string;
};

const AD_LOAD_TIMEOUT_MS = 4000;

function resolveAdState(ins: HTMLModElement): AdState {
  const status = ins.getAttribute('data-ad-status');
  if (status === 'filled') return 'filled';
  if (status === 'unfilled') return 'unfilled';

  const iframe = ins.querySelector('iframe');
  if (iframe && ins.offsetHeight > 10) return 'filled';

  return 'loading';
}

export function AdSlot({
  variant = 'banner',
  slot,
  label = 'Advertisement',
  className,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const [adState, setAdState] = useState<AdState>('loading');
  const config = adVariants[variant];
  const adSlot = slot ?? config.slot;
  const isConfigured = Boolean(adsense.client && adSlot);

  useEffect(() => {
    if (!isConfigured || !ref.current) return;

    const ins = ref.current;

    const updateAdState = () => {
      setAdState((current) => {
        const next = resolveAdState(ins);
        return next === 'loading' ? current : next;
      });
    };

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdState('unfilled');
      return;
    }

    updateAdState();

    const observer = new MutationObserver(updateAdState);
    observer.observe(ins, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
      childList: true,
      subtree: true,
    });

    const timeout = window.setTimeout(() => {
      setAdState(resolveAdState(ins) === 'filled' ? 'filled' : 'unfilled');
    }, AD_LOAD_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [isConfigured, adSlot]);

  if (!isConfigured || adState === 'unfilled') return null;

  const isVisible = adState === 'filled';

  return (
    <aside
      aria-label={label}
      aria-hidden={!isVisible}
      className={
        isVisible
          ? (className ?? 'my-8 flex w-full justify-center overflow-hidden')
          : 'h-0 overflow-hidden opacity-0'
      }
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
