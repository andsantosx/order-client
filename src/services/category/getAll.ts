import { apiClient } from "@/lib/api-client";

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export const getAll = async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>("/api/categories");
    return data;
};
