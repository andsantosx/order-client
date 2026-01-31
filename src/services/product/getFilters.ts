import { apiClient } from "@/lib/api-client";

export interface FiltersResponse {
    categories: string[];
    sizes: string[];
}

export const getFilters = async (): Promise<FiltersResponse> => {
    const { data } = await apiClient.get<FiltersResponse>("/api/products/filters");
    return data;
};
