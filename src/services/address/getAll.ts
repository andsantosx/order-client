import { apiClient } from "@/lib/api-client";

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

export const getAll = async (): Promise<Address[]> => {
    const { data } = await apiClient.get<Address[]>("/profile/addresses");
    return data;
};
