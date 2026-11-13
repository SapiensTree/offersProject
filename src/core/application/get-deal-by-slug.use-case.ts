import { DealRepository } from "../ports/deal-repository";
import { PublicDeal } from "../domain/deal";

export class GetDealUseCase {
    constructor(private readonly dealRepo: DealRepository) { }

    async execute(slug: string): Promise<PublicDeal | null> {
        if (!slug || slug.trim() === '') return null;
        return this.dealRepo.findDealBySlug(slug.trim());
    }
}