import { apiClient } from "@/lib/api-client";

export interface Size {
    id: number;
    name: string;
    type: string;
}

export const getAll = async (): Promise<Size[]> => {
    const { data } = await apiClient.get<Size[]>("/sizes");
    return data;
};
