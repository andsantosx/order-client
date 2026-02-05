import { apiClient } from "@/lib/api-client";
import type { Category } from "./getAll";

export const getById = async (id: string): Promise<Category> => {
    const { data } = await apiClient.get<Category>(`/categories/${id}`);
    return data;
};
