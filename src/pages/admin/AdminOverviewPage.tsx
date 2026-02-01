import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/services/admin/getDashboardStats";
import { DollarSign, ShoppingBag, Package, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-6 bg-card border rounded-xl shadow-sm space-y-3">
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="w-24 h-4" />
                                    <Skeleton className="w-32 h-8" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="flex gap-2 mb-4">
                        <Skeleton className="w-5 h-5" />
                        <Skeleton className="w-32 h-6" />
                    </div>
                    {/* Desktop Table Skeleton */}
                    <div className="hidden md:block bg-card border rounded-xl overflow-hidden p-4 space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex justify-between items-center">
                                <Skeleton className="w-20 h-4" />
                                <Skeleton className="w-32 h-4" />
                                <Skeleton className="w-24 h-4" />
                                <Skeleton className="w-24 h-4" />
                                <Skeleton className="w-16 h-6 rounded-md" />
                            </div>
                        ))}
                    </div>
                    {/* Mobile Cards Skeleton */}
                    <div className="md:hidden space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="w-16 h-3" />
                                        <Skeleton className="w-32 h-4" />
                                    </div>
                                    <Skeleton className="w-16 h-6 rounded-full" />
                                </div>
                                <div className="pt-2 border-t border-border flex justify-between">
                                    <Skeleton className="w-20 h-4" />
                                    <Skeleton className="w-24 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
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
                <div className="hidden md:block bg-card border rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-muted border-b border-border text-foreground text-sm uppercase">
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
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                    {stats.recentOrders.map(order => (
                        <div key={order.id} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                                    <p className="font-semibold text-sm mt-1">{order.customer}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                    ${order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                        order.status === 'CANCELED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                                <span>{new Date(order.date).toLocaleDateString()}</span>
                                <span className="font-bold text-foreground text-base">
                                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total / 100)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {stats.recentOrders.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground bg-card border rounded-xl">No recent orders</div>
                )}
            </div>
        </div>
    );
}
