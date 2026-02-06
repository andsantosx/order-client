import { create } from "zustand";
import type { Order } from "@/services/order/myOrders";

interface OrderState {
    orders: Order[];
    ordersLoaded: boolean;
    lastFetched: number | null;
    
    setOrders: (orders: Order[]) => void;
    clearOrders: () => void;
    invalidateOrders: () => void;
    shouldFetch: () => boolean;
}

const ORDER_CACHE_TTL = 2 * 60 * 1000; // 2 minutes (short cache)

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    ordersLoaded: false,
    lastFetched: null,

    setOrders: (orders) => set({
        orders,
        ordersLoaded: true,
        lastFetched: Date.now()
    }),

    clearOrders: () => set({
        orders: [],
        ordersLoaded: false,
        lastFetched: null
    }),

    invalidateOrders: () => set({
        ordersLoaded: false
    }),

    shouldFetch: () => {
        const { ordersLoaded, lastFetched } = get();
        if (!ordersLoaded || !lastFetched) return true;
        
        const isExpired = Date.now() - lastFetched > ORDER_CACHE_TTL;
        return isExpired;
    }
}));
