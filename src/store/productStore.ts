import { create } from "zustand";
import type { Product } from "@/services/product/getAll";

interface Filters {
    categories: { name: string; slug: string }[];
    brands: { name: string; slug: string }[];
    sizes: string[];
}

interface ProductState {
    // Cache for filters
    availableCategories: { name: string; slug: string }[];
    availableBrands: { name: string; slug: string }[];
    availableSizes: string[];
    filtersLoaded: boolean;

    // Cache for product listings
    // Key is JSON.stringify of the query params
    productCache: Record<string, { data: Product[]; timestamp: number }>;
    
    // Actions
    setFilters: (filters: Filters) => void;
    setCachedProducts: (key: string, products: Product[]) => void;
    getCachedProducts: (key: string) => Product[] | null;
    clearCache: () => void;
    invalidateProducts: () => void; // Clear product cache (for admin CRUD)
}

const CACHE_TTL = 2 * 60 * 1000; // 2 minutes (short cache)

export const useProductStore = create<ProductState>((set, get) => ({
    availableCategories: [],
    availableBrands: [],
    availableSizes: [],
    filtersLoaded: false,
    productCache: {},

    setFilters: (filters) => set({
        availableCategories: filters.categories,
        availableBrands: filters.brands,
        availableSizes: filters.sizes,
        filtersLoaded: true
    }),

    setCachedProducts: (key, products) => set((state) => ({
        productCache: {
            ...state.productCache,
            [key]: { data: products, timestamp: Date.now() }
        }
    })),

    getCachedProducts: (key) => {
        const cached = get().productCache[key];
        if (!cached) return null;

        const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
        if (isExpired) {
            // Optional: clean up expired entry
            return null;
        }

        return cached.data;
    },

    clearCache: () => set({ productCache: {} }),
    
    invalidateProducts: () => set({ productCache: {} }) // Clear all product caches
}));
