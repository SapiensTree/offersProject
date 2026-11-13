import { PublicDeal } from "../domain/deal";

export interface DealRepository {
    findPublishedDeals(): Promise<PublicDeal[]>;
    findRedirectUrlBySlug(slug: string): Promise<string | null>;
    findDealBySlug(slug: string): Promise<PublicDeal | null>
}