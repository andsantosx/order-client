import { apiClient } from "@/lib/api-client";

export const remove = async (imgId: string): Promise<void> => {
    await apiClient.delete(`/api/images/${imgId}`);
};
