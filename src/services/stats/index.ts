import { apiClient } from "@/lib/api-client";

export interface OverviewStats {
    totalRevenue: number;
    revenueLastMonth: number;
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
}

export interface SalesByPeriod {
    date: string;
    orders: number;
    revenue: number;
}

export interface BestSeller {
    product_id: string;
    product_name: string;
    total_sold: number;
}

export interface RevenueStats {
    revenue: number;
    orderCount: number;
    period: string;
}

export interface OrderStatusBreakdown {
    status: string;
    count: string;
}

export type StatsPeriod = '7d' | '30d' | '90d' | 'year' | 'all';

/**
 * Get overview statistics (admin)
 */
export const getOverview = async (): Promise<OverviewStats> => {
    const { data } = await apiClient.get<OverviewStats>('/admin/stats');
    return data;
};

/**
 * Get sales by period (admin)
 * @param period - Time period: 7d, 30d, 90d, year, all
 */
export const getSales = async (period: StatsPeriod = '30d'): Promise<SalesByPeriod[]> => {
    const { data } = await apiClient.get<SalesByPeriod[]>(`/admin/stats/sales?period=${period}`);
    return data;
};

/**
 * Get best selling products (admin)
 * @param limit - Number of products to return
 * @param period - Time period
 */
export const getBestSellers = async (limit: number = 10, period: StatsPeriod = '30d'): Promise<BestSeller[]> => {
    const { data } = await apiClient.get<BestSeller[]>(`/admin/stats/best-sellers?limit=${limit}&period=${period}`);
    return data;
};

/**
 * Get revenue statistics (admin)
 * @param period - Time period
 */
export const getRevenue = async (period: StatsPeriod = '30d'): Promise<RevenueStats> => {
    const { data } = await apiClient.get<RevenueStats>(`/admin/stats/revenue?period=${period}`);
    return data;
};

/**
 * Get order status breakdown (admin)
 */
export const getOrderStatusBreakdown = async (): Promise<OrderStatusBreakdown[]> => {
    const { data } = await apiClient.get<OrderStatusBreakdown[]>('/admin/stats/status-breakdown');
    return data;
};
