import { apiClient } from "@/lib/api-client";
import type { OrderResponse } from "./getById";

export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface OrderRequest {
    items: OrderRequestItem[];
    guestEmail?: string;
    guestName?: string;
    guestCpf?: string;
    shippingAddress: ShippingAddress;
}

export interface OrderRequestItem {
    productId: string;
    quantity: number;
    size: string;
}

interface ApiOrderResponse {
    id: string;
    items: any[];
    total_amount: string;
    currency: string;
    status: string;
    created_at: string;
    user: any;
    guest_email: any;
    idempotency_key: string;
}

function mapOrderResponse(data: ApiOrderResponse): OrderResponse {
    return {
        id: data.id,
        items: data.items,
        total_amount: parseFloat(data.total_amount),
        currency: data.currency,
        status: data.status,
        created_at: data.created_at
    };
}

export const create = async (orderData: OrderRequest): Promise<OrderResponse> => {
    const { data } = await apiClient.post<ApiOrderResponse>("/orders", orderData);
    return mapOrderResponse(data);
};
