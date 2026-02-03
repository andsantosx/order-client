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

export const getDashboardStats = async (startDate?: string, endDate?: string): Promise<DashboardStats> => {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const { data } = await apiClient.get<DashboardStats>(`/api/admin/dashboard-stats?${params.toString()}`);
    return data;
};
