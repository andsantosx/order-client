import { apiClient } from "@/lib/api-client";

export const orderService = {
    create: async (items: { productId: string; quantity: number }[]) => {
        const { data } = await apiClient.post("/api/orders", { items });
        return data;
    },
};
