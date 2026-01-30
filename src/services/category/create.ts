import { apiClient } from "@/lib/api-client";
import type { Category } from "./getAll";

export interface CreateCategoryRequest {
    name: string;
    slug: string;
}

export const create = async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<Category>("/api/categories", data);
    return response.data;
};
