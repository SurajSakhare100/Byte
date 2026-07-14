export type SharePlatform = 'x' | 'linkedin' | 'facebook' | 'reddit' | 'whatsapp' | 'telegram';

export type SharePayload = {
  title: string;
  url: string;
};

export const sharePlatforms: {
  id: SharePlatform;
  label: string;
  iconColor: string;
  iconBg: string;
}[] = [
  {
    id: 'x',
    label: 'X',
    iconColor: 'text-zinc-950 dark:text-white',
    iconBg: 'bg-zinc-100 dark:bg-zinc-800',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    iconColor: 'text-[#0A66C2]',
    iconBg: 'bg-[#0A66C2]/10',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    iconColor: 'text-[#1877F2]',
    iconBg: 'bg-[#1877F2]/10',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    iconColor: 'text-[#FF4500]',
    iconBg: 'bg-[#FF4500]/10',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    iconColor: 'text-[#25D366]',
    iconBg: 'bg-[#25D366]/10',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    iconColor: 'text-[#26A5E4]',
    iconBg: 'bg-[#26A5E4]/10',
  },
];

export function getShareUrl(platform: SharePlatform, { title, url }: SharePayload): string {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  switch (platform) {
    case 'x':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'reddit':
      return `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
  }
}
