import { apiClient } from "@/lib/api-client";
import type { ProductResponse } from "./getAll";

export interface CreateProductRequest {
    name: string;
    price_cents: number;
    description?: string;
    currency: string;
    categoryId: number;
    brandId?: number;
    sizeIds: number[];
    images?: string[];
}

export const create = async (product: CreateProductRequest): Promise<ProductResponse> => {
    const { data } = await apiClient.post<ProductResponse>("/api/products", product);
    return data;
};
