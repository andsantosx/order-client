import { apiClient } from "@/lib/api-client";

export interface Brand {
    id: number;
    name: string;
    slug: string;
}

export const getAll = async (): Promise<Brand[]> => {
    const { data } = await apiClient.get<Brand[]>("/brands");
    return data;
};

export interface CreateBrandRequest {
    name: string;
    slug: string;
}

export const create = async (brand: CreateBrandRequest): Promise<Brand> => {
    const { data } = await apiClient.post<Brand>("/brands", brand);
    return data;
};

export interface UpdateBrandRequest {
    name: string;
    slug: string;
}

export const update = async (id: number, brand: UpdateBrandRequest): Promise<Brand> => {
    const { data } = await apiClient.put<Brand>(`/brands/${id}`, brand);
    return data;
};

export const remove = async (id: number): Promise<void> => {
    await apiClient.delete(`/brands/${id}`);
};
