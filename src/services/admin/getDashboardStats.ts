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

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>("/api/admin/dashboard-stats");
    return data;
};
