import { apiClient } from "@/lib/api-client";

export const add = async (productId: string): Promise<string> => {
    const { data } = await apiClient.post<any>(`/profile/wishlist/${productId}`);
    return data.id; // Return the new wishlist item ID
};

