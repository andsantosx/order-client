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
    productId: string;
    productName: string;
    totalQuantity: number;
    totalRevenue: number;
    orderCount: number;
}

export interface RevenueStats {
    totalRevenue: number;
    averageOrderValue: number;
    orderCount: number;
}

export interface OrderStatusBreakdown {
    status: string;
    count: number;
}

/**
 * Get overview statistics
 */
export const getOverview = async (token: string): Promise<OverviewStats> => {
    const { data } = await apiClient.get<OverviewStats>('/api/admin/stats/overview', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

/**
 * Get sales by period
 */
export const getSales = async (period: '7days' | '30days' | '90days' | 'year', token: string): Promise<SalesByPeriod[]> => {
    const { data } = await apiClient.get<SalesByPeriod[]>(`/api/admin/stats/sales?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

/**
 * Get best selling products
 */
export const getBestSellers = async (limit: number, token: string): Promise<BestSeller[]> => {
    const { data } = await apiClient.get<BestSeller[]>(`/api/admin/stats/best-sellers?limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

/**
 * Get revenue statistics
 */
export const getRevenue = async (token: string, from?: string, to?: string): Promise<RevenueStats> => {
    let url = '/api/admin/stats/revenue';
    if (from && to) {
        url += `?from=${from}&to=${to}`;
    }
    const { data } = await apiClient.get<RevenueStats>(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

/**
 * Get order status breakdown
 */
export const getOrderStatus = async (token: string): Promise<OrderStatusBreakdown[]> => {
    const { data } = await apiClient.get<OrderStatusBreakdown[]>('/api/admin/stats/order-status', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};
