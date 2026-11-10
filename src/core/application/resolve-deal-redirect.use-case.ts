import { DealRepository } from "../ports/deal-repository";

export class ResolveDealRedirectUseCase {
    constructor(private readonly dealRepo: DealRepository) { }

    async execute(slug: string): Promise<string | null> {
        if (!slug || slug.trim() === '') return null;

        return this.dealRepo.findRedirectUrlBySlug(slug.trim());

    }

}