import { apiClient } from "@/lib/api-client";

export interface ContactMessageRequest {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface ContactMessageResponse {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: string;
    created_at: string;
}

export const create = async (data: ContactMessageRequest): Promise<ContactMessageResponse> => {
    const response = await apiClient.post<ContactMessageResponse>("/contact", data);
    return response.data;
};
