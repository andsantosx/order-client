import { apiClient } from "@/lib/api-client";

export const remove = async (wishlistId: string): Promise<void> => {
    await apiClient.delete(`/profile/wishlist/${wishlistId}`);
};
