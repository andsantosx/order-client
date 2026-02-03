import { apiClient } from "@/lib/api-client";

export interface Brand {
    id: number;
    name: string;
    slug: string;
}

export const getAll = async (): Promise<Brand[]> => {
    const { data } = await apiClient.get<Brand[]>("/api/brands");
    return data;
};

export interface CreateBrandRequest {
    name: string;
    slug: string;
}

export const create = async (brand: CreateBrandRequest): Promise<Brand> => {
    const { data } = await apiClient.post<Brand>("/api/brands", brand);
    return data;
};

export interface UpdateBrandRequest {
    name: string;
    slug: string;
}

export const update = async (id: number, brand: UpdateBrandRequest): Promise<Brand> => {
    const { data } = await apiClient.put<Brand>(`/api/brands/${id}`, brand);
    return data;
};

export const remove = async (id: number): Promise<void> => {
    await apiClient.delete(`/api/brands/${id}`);
};
