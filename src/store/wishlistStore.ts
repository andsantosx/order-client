import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  addedAt: number
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  isInWishlist: (id: number) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id)
          if (exists) return state
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      isInWishlist: (id) => {
        const state = get()
        return state.items.some((i) => i.id === id)
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-store",
    }
  )
)
