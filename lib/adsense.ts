export const adsense = {
  client: 'ca-pub-7623182087547549',
  slots: {
    banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER ?? '2468294937',
    inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE ?? '9945807192',
  },
} as const;

export type AdVariant = keyof typeof adsense.slots;

export const adVariants = {
  banner: {
    slot: adsense.slots.banner,
    format: 'auto' as const,
    layout: undefined,
    fullWidthResponsive: true,
    style: { display: 'block' },
  },
  inArticle: {
    slot: adsense.slots.inArticle,
    format: 'fluid' as const,
    layout: 'in-article' as const,
    fullWidthResponsive: false,
    style: { display: 'block', textAlign: 'center' as const },
  },
} satisfies Record<AdVariant, {
  slot: string;
  format: string;
  layout?: string;
  fullWidthResponsive: boolean;
  style: { display: string; textAlign?: 'center' };
}>;
