import { GetCatalogDealUseCase } from "@/core/application/get-catalog-deals.use-case";
import { PocketbaseCategoryRepository } from "./pocketbase/pocketbase-category.repository.ts";
import { PocketbaseDealRepository } from "./pocketbase/pocketbase-deal.repository";
import { ResolveDealRedirectUseCase } from "@/core/application/resolve-deal-redirect.use-case";
import { GetDealUseCase } from "@/core/application/get-deal-by-slug.use-case";

const dealRepository = new PocketbaseDealRepository();
const categoryRepository = new PocketbaseCategoryRepository();

export const getCatalogDealUseCase = new GetCatalogDealUseCase(
    dealRepository,
    categoryRepository
);

export const resolveDealRedirectUseCase = new ResolveDealRedirectUseCase(
    dealRepository
);

export const getDealUseCase = new GetDealUseCase(dealRepository);