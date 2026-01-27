import { apiClient } from "@/lib/api-client";
import type { ProductResponse } from "./getAll";

export interface CreateProductRequest {
    name: string;
    price_cents: number;
    currency: string;
    categoryId: number;
    sizeIds: number[];
}

export const create = async (product: CreateProductRequest): Promise<ProductResponse> => {
    const { data } = await apiClient.post<ProductResponse>("/api/products", product);
    return data;
};
