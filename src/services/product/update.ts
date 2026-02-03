import { apiClient } from "@/lib/api-client";

export interface UpdateProductRequest {
    name?: string;
    price_cents?: number;
    description?: string;
    categoryId?: number;
    brandId?: number;
    sizeIds?: number[];
}

export const update = async (id: string, data: UpdateProductRequest): Promise<void> => {
    await apiClient.put(`/api/products/${id}`, data);
};
