import { apiClient } from "@/lib/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image?: string;
}

export interface ProductResponse {
    id: string;
    name: string;
    price_cents: string | number;
    currency: string;
    // stock removed from backend, using sizes instead
    images: { id: number; url: string }[];
}

interface PaginatedResponse {
    data: ProductResponse[];
    total: number;
    page: number;
    limit: number;
}

export const getAll = async (): Promise<Product[]> => {
    const response = await apiClient.get<PaginatedResponse>("/api/products");
    // axios returns data in response.data
    const { data } = response.data;

    return data.map((item) => ({
        id: item.id,
        name: item.name,
        price: typeof item.price_cents === 'string' ? parseFloat(item.price_cents) / 100 : item.price_cents / 100,
        stock: 10, // Default stock as it is now managed by sizes
        image: item.images?.[0]?.url
    }));
};
