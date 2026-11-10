import { Category } from "../domain/category";

export interface CategoryRepository {
    findActiveCategories(): Promise<Category[]>;
}