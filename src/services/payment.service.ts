import { apiClient } from "@/lib/api-client";

export const paymentService = {
    createIntent: async (orderId: string) => {
        const { data } = await apiClient.post("/api/payments/create-intent", {
            orderId,
        });
        return data;
    },
};
