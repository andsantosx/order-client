import { apiClient } from "@/lib/api-client";

export interface PayerIdentification {
    type: string;
    number: string;
}

export interface Payer {
    email: string;
    identification: PayerIdentification;
    first_name?: string;
    last_name?: string;
}

export interface PaymentRequest {
    orderId: string;
    token: string;
    transaction_amount: number;
    description: string;
    payment_method_id: string;
    installments: number;
    issuer_id: string;
    payer: Payer;
}

export interface PaymentResponse {
    id: number;
    status: string;
    status_detail: string;
    payment_method_id?: string;
    date_of_expiration?: string;
    point_of_interaction?: {
        transaction_data?: {
            qr_code?: string;
            qr_code_base64?: string;
            ticket_url?: string;
        };
    };
}

export const process = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
    const { data } = await apiClient.post<PaymentResponse>("/api/payments/process", paymentData);
    return data;
};
