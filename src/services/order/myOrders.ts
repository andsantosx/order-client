import { apiClient } from "@/lib/api-client";

interface OrderItem {
    id: string;
    product_id: string;
    product_name?: string; // Optional as it comes joined
    name?: string; // Sometimes flattened
    unit_price: number;
    quantity: number;
    image?: string;
    product?: {
        name: string;
        images: string[];
    };
}

interface ShippingAddress {
    street: string;
    city: string;
    state?: string;
    zip_code?: string;
    country?: string;
}

export interface Order {
    id: string;
    total_amount: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
    created_at: string;
    shippingAddress?: ShippingAddress;
    items?: OrderItem[];
}

export const listMyOrders = async (): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>("/api/orders");
    return data;
};
