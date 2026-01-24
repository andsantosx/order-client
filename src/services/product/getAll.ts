import { apiClient } from "@/lib/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}


export interface ProductResponse {
    id: string;
    name: string;
    price_cents: string | number;
    currency: string;
    stock: number;
}

export const getAll = async (): Promise<Product[]> => {
    const { data } = await apiClient.get<ProductResponse[]>("/api/products");
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        price: typeof item.price_cents === 'string' ? parseFloat(item.price_cents) / 100 : item.price_cents / 100,
        stock: item.stock,
    }));
};
