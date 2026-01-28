import { apiClient } from "@/lib/api-client";

export const add = async (productId: string): Promise<void> => {
    await apiClient.post(`/api/wishlist/${productId}`);
};
