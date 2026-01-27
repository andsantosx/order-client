import { apiClient } from "@/lib/api-client";

export interface CreateImageRequest {
    url: string;
}

export interface ImageResponse {
    id: number;
    url: string;
    product_id: string;
}

export const create = async (productId: string, url: string): Promise<ImageResponse> => {
    const { data } = await apiClient.post<ImageResponse>(`/api/images/product/${productId}`, { url });
    return data;
};
