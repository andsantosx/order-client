import { apiClient } from "@/lib/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    image?: string;
    category?: string;
}

export interface ProductResponse {
    id: string;
    name: string;
    price_cents: number;
    images: { id: number; url: string }[];
    sizes: { id: number; quantity: number; size: { id: number; name: string } }[];
    category?: { id: number; name: string; slug: string };
}

export interface ProductQueryParams {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
}

export interface PaginatedProductResponse {
    data: ProductResponse[];
    total: number;
    page: number;
    limit: number;
}

export const getAll = async (params: ProductQueryParams = {}): Promise<Product[]> => {
    const queryParams: any = {};
    if (params.search) queryParams.search = params.search;
    if (params.category) queryParams.category = params.category;
    // API docs specify camelCase for price params
    if (params.minPrice !== undefined) queryParams.minPrice = params.minPrice * 100; // API expects cents
    if (params.maxPrice !== undefined) queryParams.maxPrice = params.maxPrice * 100; // API expects cents
    if (params.sortBy) queryParams.sort = params.sortBy;

    const { data } = await apiClient.get<PaginatedProductResponse>("/api/products", {
        params: queryParams
    });

    return data.data.map((item) => ({
        id: item.id,
        name: item.name,
        price: (item.price_cents || 0) / 100, // Convert cents to float, safe fallback
        stock: (item.sizes || []).reduce((acc, size) => acc + (size.quantity || 0), 0), // Sum stock from sizes, safe fallback
        image: item.images?.[0]?.url,
        category: item.category?.name
    }));
};
