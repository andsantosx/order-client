import { apiClient } from "@/lib/api-client";

export interface CreatePaymentIntentResponse {
    clientSecret: string;
}

export const create = async (orderId: string): Promise<CreatePaymentIntentResponse> => {
    const { data } = await apiClient.post<CreatePaymentIntentResponse>("/api/payments/create-intent", {
        orderId,
    });
    return data;
};
