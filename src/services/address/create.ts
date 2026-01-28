import { apiClient } from "@/lib/api-client";
import type { Address } from "./getAll";

export type CreateAddressData = Omit<Address, "id">;

export const create = async (data: CreateAddressData): Promise<Address> => {
    // Map to API expected format (camelCase for zipCode based on docs)
    const payload = {
        ...data,
        zipCode: data.zip_code
    };
    const response = await apiClient.post<Address>("/api/profile/addresses", payload);
    return response.data;
};
