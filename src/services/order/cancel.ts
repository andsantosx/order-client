import { apiClient } from "@/lib/api-client";

/**
 * Cancel a pending order
 * Only PENDING orders can be canceled
 * 
 * @param orderId - The order ID to cancel
 * @returns Success message
 */
export const cancelOrder = async (orderId: string): Promise<{ success: boolean; message: string }> => {
  const { data } = await apiClient.post(`/orders/${orderId}/cancel`);
  return data;
};
