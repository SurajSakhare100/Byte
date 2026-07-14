'use client';

import {
  Check,
  Facebook,
  Link2,
  Linkedin,
  MessageCircle,
  Send,
  Share2,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
  getShareUrl,
  sharePlatforms,
  type SharePlatform,
  type SharePayload,
} from '@/lib/share';

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
  share: SharePayload;
};

function ShareIcon({ platform }: { platform: SharePlatform }) {
  const className = 'h-[18px] w-[18px]';

  switch (platform) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return <Linkedin className={className} strokeWidth={2} />;
    case 'facebook':
      return <Facebook className={className} strokeWidth={2} />;
    case 'reddit':
      return <Share2 className={className} strokeWidth={2} />;
    case 'whatsapp':
      return <MessageCircle className={className} strokeWidth={2} />;
    case 'telegram':
      return <Send className={className} strokeWidth={2} />;
  }
}

const shareLabels: Record<SharePlatform, string> = {
  x: 'Share on X',
  linkedin: 'Share on LinkedIn',
  facebook: 'Share on Facebook',
  reddit: 'Share on Reddit',
  whatsapp: 'Share on WhatsApp',
  telegram: 'Share on Telegram',
};

export function ShareModal({ open, onClose, share }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(share.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [share.url]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        aria-label="Close share dialog"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white py-2 shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <h2 id="share-modal-title" className="text-base font-bold">
            Share
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            {copied ? <Check size={18} /> : <Link2 size={18} />}
          </span>
          <span>{copied ? 'Link copied' : 'Copy link'}</span>
        </button>

        <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

        {sharePlatforms.map((platform) => (
          <a
            key={platform.id}
            href={getShareUrl(platform.id, share)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full ${platform.iconBg} ${platform.iconColor}`}
            >
              <ShareIcon platform={platform.id} />
            </span>
            <span>{shareLabels[platform.id]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
