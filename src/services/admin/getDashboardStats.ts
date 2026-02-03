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
export const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
        // Get overview stats from new endpoint
        const { data: overview } = await apiClient.get('/api/admin/stats/overview');

        // Get recent orders (using existing orders endpoint with limit)
        const { data: orders } = await apiClient.get('/api/orders?isAdmin=true&limit=10');

        // Get product count
        const { data: products } = await apiClient.get('/api/products?page=1&limit=1');

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
