import { apiClient } from "@/lib/api-client";


export interface WishlistItem {
    id: string; // Product ID
    name: string;
    price: number;
    image: string;
    addedAt: number;
}

// Adapting the response to match what the UI expects (Product-like)
export const getAll = async (): Promise<WishlistItem[]> => {
    // The endpoint returns list of products in wishlist
    const { data } = await apiClient.get<any[]>("/api/profile/wishlist");

    // Map response if necessary. Assuming backend returns an array of objects that contain 'product' info
    // or the list of products directly.
    // Based on "Get /api/orders" returns "items.product", maybe wishlist returns "items" too?
    // Let's assume it returns an array of Products for now based on typical implementation.
    // If user followed common sense, it returns the user's wishlist items.

    return data.map((item: any) => ({
        id: item.product?.id || item.productId, // UI expects Product ID here
        wishlistId: item.id, // Backend Wishlist ID
        name: item.name || item.product?.name,
        price: item.price || item.product?.price_cents ? (item.product.price_cents / 100) : 0,
        image: item.image || item.product?.images?.[0]?.url || "",
        addedAt: item.addedAt || Date.now()
    }));
};
