import { apiClient } from "@/lib/api-client";

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';

export const updateStatus = async (id: string, status: string): Promise<any> => {
    const { data} = await apiClient.put(`/orders/${id}/status`, { status });
    return data;
};
