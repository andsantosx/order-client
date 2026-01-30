import { apiClient } from "@/lib/api-client";
import type { ProductResponse } from "@/services/product/getAll";

export interface OrderResponseItem {
    id: string;
    quantity: number;
    unit_price: string;
    total_price: string;
    product: ProductResponse;
}

export interface OrderResponse {
    id: string;
    items: OrderResponseItem[];
    total_amount: number;
    currency: string;
    status: string;
    created_at: string;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
}

interface ApiOrderResponse {
    id: string;
    items: OrderResponseItem[];
    total_amount: string;
    currency: string;
    status: string;
    created_at: string;
    user: any;
    guest_email: any;
    idempotency_key: string;
    shippingAddress?: any; // Expect object from backend
}

function mapOrderResponse(data: ApiOrderResponse): OrderResponse {
    return {
        id: data.id,
        items: data.items,
        total_amount: parseFloat(data.total_amount),
        currency: data.currency,
        status: data.status,
        created_at: data.created_at,
        shippingAddress: data.shippingAddress
    };
}

export const getById = async (id: string): Promise<OrderResponse> => {
    const { data } = await apiClient.get<ApiOrderResponse>(`/api/orders/${id}`);
    return mapOrderResponse(data);
};
