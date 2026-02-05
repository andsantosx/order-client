import { apiClient } from "@/lib/api-client";

/**
 * Process payment with Mercado Pago Brick
 * This keeps the user on your website throughout the entire payment flow.
 * Supports: Credit Card, Debit Card, PIX, Boleto, and more.
 * 
 * Used by: CheckoutPage.tsx
 * 
 * @param paymentData - Payment data from Mercado Pago Brick
 * @returns Payment response with status (approved, pending, rejected)
 */
export const process = async (paymentData: any): Promise<any> => {
  const { data } = await apiClient.post('/payments/process', paymentData);
  return data;
};
