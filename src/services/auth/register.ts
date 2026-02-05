import { apiClient } from "@/lib/api-client";
import type { LoginResponse } from "./login";

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export const register = async (userData: RegisterRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/auth/register", userData);
    return data;
};
