import { create } from "zustand";

interface UIState {
    isRouteLoading: boolean;
    setRouteLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isRouteLoading: false,
    setRouteLoading: (loading) => set({ isRouteLoading: loading }),
}));
