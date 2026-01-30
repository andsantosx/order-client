import { apiClient } from "@/lib/api-client";
import type { Address } from "./getAll";

export interface CreateAddressData {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export const create = async (data: CreateAddressData): Promise<Address> => {
    const response = await apiClient.post<Address>("/api/profile/addresses", data);
    return response.data;
};
