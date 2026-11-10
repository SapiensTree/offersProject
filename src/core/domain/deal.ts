export type DealType = 'annual' | 'lifetime' | 'one_time';
export type DealStatus = 'annual' | 'published' | 'archived';

export interface Deal {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description?: string;
    discountCode?: string;
    discountLabel: string;
    dealType: DealType;
    targetUrl: string;
    isFeatured: boolean;
    status: DealStatus;
    categorySlug: string;
    categoryName?: string;
    categoryAccentColor?: string;
}

export type PublicDeal = Omit<Deal, 'targetUrl'>;
