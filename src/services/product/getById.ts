import { apiClient } from "@/lib/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    images: { id: string; url: string }[];
    sizes: { id: string; name: string }[];
    category?: { id: number; name: string };
    brand?: { id: number; name: string };
}

export const getById = async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<any>(`/products/${id}`);

    return {
        id: data.id,
        name: data.name,
        price: typeof data.price_cents === 'string' ? parseFloat(data.price_cents) / 100 : data.price_cents / 100,
        description: data.description || "Descrição do produto não disponível.",
        images: data.images?.map((img: any) => ({
            id: img.id,
            url: img.url
        })) || [],
        sizes: data.sizes?.map((s: any) => ({
            id: s.size.id,
            name: s.size.name
        })) || [],
        category: data.category ? { id: data.category.id, name: data.category.name } : undefined,
        brand: data.brand ? { id: data.brand.id, name: data.brand.name } : undefined
    };
};
