import { apiClient } from "@/lib/api-client";

export const remove = async (id: string): Promise<void> => {
    await apiClient.delete(`/profile/addresses/${id}`);
};
