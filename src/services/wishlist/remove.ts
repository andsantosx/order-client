import { apiClient } from "@/lib/api-client";

export const remove = async (productId: string): Promise<void> => {
    await apiClient.delete(`/api/wishlist/${productId}`);
};
