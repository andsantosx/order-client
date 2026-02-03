import { apiClient } from "@/lib/api-client";

export interface FiltersResponse {
    categories: { name: string; slug: string }[];
    brands: { name: string; slug: string }[];
    sizes: string[];
}

export const getFilters = async (): Promise<FiltersResponse> => {
    const { data } = await apiClient.get<FiltersResponse>("/api/products/filters");
    return data;
};
