import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string; // Product ID (for compatibility with UI components linking to products)
  wishlistId?: string; // ID of the wishlist item in backend (required for removal)
  name: string;
  price: number;
  image: string;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  setItems: (items: WishlistItem[]) => void;
  updateItem: (id: string, updates: Partial<WishlistItem>) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);
          if (exists) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      isInWishlist: (id) => {
        const state = get();
        return state.items.some((i) => i.id === id);
      },
      setItems: (items: WishlistItem[]) => set({ items }),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-store",
    }
  )
);
