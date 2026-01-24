import { apiClient } from "@/lib/api-client";
import type { ProductResponse } from "./getAll";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export const getById = async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<ProductResponse>(`/api/products/${id}`);
    return {
        id: data.id,
        name: data.name,
        price: typeof data.price_cents === 'string' ? parseFloat(data.price_cents) / 100 : data.price_cents / 100,
        stock: data.stock,
    };
};
