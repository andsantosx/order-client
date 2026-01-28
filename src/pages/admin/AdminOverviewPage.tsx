import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/services/admin/getDashboardStats";
import { DollarSign, ShoppingBag, Package, Calendar } from "lucide-react";

export function AdminOverviewPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                // Fallback or just empty for now until backend deploy
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading statistics...</div>;
    }

    if (!stats) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-semibold">Welcome Admin</h2>
                <p className="text-muted-foreground">Stats will appear here once orders populate.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                            <h3 className="text-2xl font-bold">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(stats.totalRevenue / 100)}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-700 rounded-lg">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                            <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Recent Orders
                </h2>
                <div className="bg-card border rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 text-muted-foreground text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {stats.recentOrders.map(order => (
                                <tr key={order.id} className="hover:bg-muted/30">
                                    <td className="px-6 py-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                                    <td className="px-6 py-4 text-sm">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm font-semibold">
                                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total / 100)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold 
                                    ${order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                order.status === 'CANCELED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {stats.recentOrders.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">No recent orders</div>
                    )}
                </div>
            </div>
        </div>
    );
}
