/**
 * Order and Payment Status Labels in Portuguese
 * Backend returns status in English, we translate for UI
 */

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  PROCESSING: 'Processando',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado',
  REFUNDED: 'Reembolsado'
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  in_process: 'Em Processamento',
  in_mediation: 'Em Mediação',
  rejected: 'Rejeitado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
  charged_back: 'Estornado'
};

/**
 * Get translated order status label
 * @param status - Order status from backend
 * @returns Translated label in Portuguese
 */
export const getOrderStatusLabel = (status: string): string => {
  return ORDER_STATUS_LABELS[status] || status;
};

/**
 * Get translated payment status label
 * @param status - Payment status from backend
 * @returns Translated label in Portuguese
 */
export const getPaymentStatusLabel = (status: string): string => {
  return PAYMENT_STATUS_LABELS[status] || status;
};

/**
 * Status color mapping for UI
 */
export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: 'orange',
  PAID: 'green',
  PROCESSING: 'blue',
  SHIPPED: 'purple',
  DELIVERED: 'green',
  CANCELED: 'red',
  REFUNDED: 'orange'
};
