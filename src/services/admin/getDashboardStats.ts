import { apiClient } from "@/lib/api-client";

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    recentOrders: {
        id: string;
        total: number;
        status: string;
        date: string;
        customer: string;
    }[];
}

/**
 * Get dashboard statistics
 * Uses new stats API endpoints
 */
export const getDashboardStats = async (startDate?: string, endDate?: string): Promise<DashboardStats> => {
    try {
        // Build query params for date filtering
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        const queryString = params.toString() ? `?${params.toString()}` : '';

        // Get overview stats from new endpoint
        const { data: overview } = await apiClient.get(`/admin/stats${queryString}`);

        // Get recent orders (using existing orders endpoint with limit)
        const { data: orders } = await apiClient.get('/orders?isAdmin=true&limit=10');

        // Get product count
        const { data: products } = await apiClient.get('/products?page=1&limit=1');

        return {
            totalRevenue: overview.totalRevenue || 0,
            totalOrders: overview.totalOrders || 0,
            totalProducts: products.total || 0,
            recentOrders: Array.isArray(orders) ? orders.slice(0, 10).map((order: any) => ({
                id: order.id,
                total: order.total_amount,
                status: order.status,
                date: order.created_at,
                customer: order.user?.name || order.guest_email || 'Guest'
            })) : []
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};
