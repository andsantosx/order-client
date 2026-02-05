import { apiClient } from "@/lib/api-client";
import type { Category } from "./getAll";

export interface UpdateCategoryRequest {
    name: string;
    slug: string;
}

export const update = async (id: number, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put<Category>(`/categories/${id}`, data);
    return response.data;
};
