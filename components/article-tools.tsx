'use client';

import { ArrowUp, Check, Link2, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ShareModal } from '@/components/share-modal';

type ArticleToolsProps = {
  title: string;
  url: string;
};

export function ArticleTools({ title, url }: ArticleToolsProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setProgress(
        Math.min(100, (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100),
      );
    };

    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <div className="fixed left-0 top-16 z-30 h-1 bg-brand" style={{ width: `${progress}%` }} />

      <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2 sm:bottom-5 sm:right-5">
        <button
          type="button"
          onClick={copyLink}
          className="glass rounded-full p-3"
          aria-label="Copy article link"
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>

        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="glass rounded-full p-3"
          aria-label="Share article"
        >
          <Share2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
          className="glass rounded-full p-3"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        share={{ title, url }}
      />
    </>
  );
}
