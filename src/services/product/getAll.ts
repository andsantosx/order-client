import { apiClient } from "@/lib/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    image?: string;
    images?: string[];
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
    category?: string; // Legacy/Single
    categories?: string[]; // Multiple
    brands?: string[];
    sizes?: string[];
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

    // Handle array filters
    if (params.category) queryParams.category = params.category;
    if (params.categories && params.categories.length > 0) queryParams.categories = params.categories.join(',');
    if (params.brands && params.brands.length > 0) queryParams.brands = params.brands.join(',');
    if (params.sizes && params.sizes.length > 0) queryParams.sizes = params.sizes.join(',');

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
        image: item.images?.[0]?.url,
        images: item.images?.map(img => img.url),
        category: item.category?.name
    }));
};
