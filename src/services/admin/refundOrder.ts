import { apiClient } from "@/lib/api-client";

export interface RefundResponse {
  success: boolean;
  message: string;
  external_reference?: string;
}

/**
 * Refund a paid order (Admin only)
 * Only PAID orders can be refunded
 * 
 * @param orderId - The order ID to refund
 * @returns Refund result with Mercado Pago reference
 */
export const refundOrder = async (orderId: string): Promise<RefundResponse> => {
  const { data } = await apiClient.post<RefundResponse>(`/admin/orders/${orderId}/refund`);
  return data;
};
