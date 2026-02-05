import { apiClient } from "@/lib/api-client";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface UpdateProfileDTO {
    name?: string;
    email?: string;
    password?: string;
}

export const getProfile = async (): Promise<UserProfile> => {
    const { data } = await apiClient.get<UserProfile>("/auth/me");
    return data;
};

export const updateProfile = async (data: UpdateProfileDTO): Promise<UserProfile> => {
    const response = await apiClient.put<UserProfile>("/auth/me", data);
    return response.data;
};
