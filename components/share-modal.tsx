'use client';

import { Check, Facebook, Link2, Linkedin, MessageCircle, Send, X } from 'lucide-react';
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
  const className = 'h-5 w-5';

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
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      );
    case 'whatsapp':
      return <MessageCircle className={className} strokeWidth={2} />;
    case 'telegram':
      return <Send className={className} strokeWidth={2} />;
  }
}

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
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-label="Close share dialog"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Share</p>
            <h2 id="share-modal-title" className="mt-1 text-lg font-bold">
              Share this article
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm text-zinc-500">{share.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-zinc-100 p-2 text-zinc-500 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {sharePlatforms.map((platform) => (
            <a
              key={platform.id}
              href={getShareUrl(platform.id, share)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl p-2 transition hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105 ${platform.iconBg} ${platform.iconColor}`}
              >
                <ShareIcon platform={platform.id} />
              </span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {platform.label}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900">
          <input
            readOnly
            value={share.url}
            aria-label="Article link"
            className="min-w-0 flex-1 truncate bg-transparent px-2 text-sm text-zinc-600 outline-none dark:text-zinc-300"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-sm font-bold text-white dark:text-black"
          >
            {copied ? <Check size={15} /> : <Link2 size={15} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
