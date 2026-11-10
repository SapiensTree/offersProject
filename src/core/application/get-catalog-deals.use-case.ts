import { Category } from "../domain/category";
import { PublicDeal } from "../domain/deal";
import { CategoryRepository } from "../ports/category-repository";
import { DealRepository } from "../ports/deal-repository";

export interface CatalogData {
    deals: PublicDeal[];
    categories: Category[];
}

export class GetCatalogDealUseCase {
    constructor(
        private readonly dealRepo: DealRepository,
        private readonly categoryRepo: CategoryRepository
    ) { }

    async execute(): Promise<CatalogData> {
        const [deals, categories] = await Promise.all([
            this.dealRepo.findPublishedDeals(),
            this.categoryRepo.findActiveCategories(),
        ])

        return { deals, categories };

    }
}