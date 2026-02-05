import { apiClient } from "@/lib/api-client";

export const remove = async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
};
