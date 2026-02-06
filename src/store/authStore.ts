import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    profileLoaded: boolean;
    addresses: Address[];
    addressesLoaded: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    setProfile: (user: User) => void;
    setAddresses: (addresses: Address[]) => void;
    invalidateProfile: () => void;
    invalidateAddresses: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            profileLoaded: false,
            addresses: [],
            addressesLoaded: false,
            login: (user, token) => set({ user, token, profileLoaded: true }),
            logout: () => set({ 
                user: null, 
                token: null, 
                profileLoaded: false, 
                addresses: [], 
                addressesLoaded: false 
            }),
            isAuthenticated: () => !!get().token,
            setProfile: (user) => set({ user, profileLoaded: true }),
            setAddresses: (addresses) => set({ addresses, addressesLoaded: true }),
            invalidateProfile: () => set({ profileLoaded: false }),
            invalidateAddresses: () => set({ addressesLoaded: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);
