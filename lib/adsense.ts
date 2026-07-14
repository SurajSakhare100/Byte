export const adsense = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT!,
  slots: {
    banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER!,
    inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE!,
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
