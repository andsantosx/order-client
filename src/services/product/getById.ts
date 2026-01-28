import { apiClient } from "@/lib/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    images: string[];
    sizes: { id: string; name: string }[];
}

export const getById = async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<any>(`/api/products/${id}`);

    return {
        id: data.id,
        name: data.name,
        price: typeof data.price_cents === 'string' ? parseFloat(data.price_cents) / 100 : data.price_cents / 100,
        description: data.description || "Descrição do produto não disponível.",
        images: data.images?.map((img: any) => img.url) || [],
        sizes: data.sizes?.map((s: any) => ({
            id: s.size.id,
            name: s.size.name
        })) || []
    };
};
