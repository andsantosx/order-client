import { apiClient } from "@/lib/api-client";
import type { Product } from "@/types";

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const { data } = await apiClient.get("/api/products");
        return data.map((item: any) => ({
            ...item,
            price: item.price_cents / 100,
        }));
    },

    getById: async (id: string): Promise<Product> => {
        const { data } = await apiClient.get(`/api/products/${id}`);
        return {
            ...data,
            price: data.price_cents / 100,
        };
    },

    getFeatured: async (limit = 4): Promise<Product[]> => {
        const products = await productService.getAll();
        return products.slice(0, limit);
    },

    getCategories: async (): Promise<{ name: string; count: number; image: string; id: string }[]> => {
        const products = await productService.getAll();
        const categoryMap = new Map<string, { count: number; image: string }>();

        products.forEach((product) => {
            const current = categoryMap.get(product.category) || { count: 0, image: product.image };
            categoryMap.set(product.category, {
                count: current.count + 1,
                image: current.image
            });
        });

        return Array.from(categoryMap.entries()).map(([name, { count, image }], index) => ({
            id: String(index + 1),
            name,
            count,
            image
        }));
    },
};
