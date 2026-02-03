import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/services/admin/getDashboardStats";
import { DollarSign, ShoppingBag, Package, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function AdminOverviewPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("all"); // all, 7d, 30d, month, year

    const fetchStats = async () => {
        setLoading(true);
        try {
            let start: Date | undefined;
            const end = new Date(); // now

            if (period === '7d') {
                start = new Date();
                start.setDate(end.getDate() - 7);
            } else if (period === '30d') {
                start = new Date();
                start.setDate(end.getDate() - 30);
            } else if (period === 'month') {
                start = new Date(end.getFullYear(), end.getMonth(), 1);
            }

            // For "all", we don't send dates so backend uses defaults (global totals)
            // Or if backend requires dates for consistency, we could send a very old date.
            // My backend implementation handles missing dates as "All Time" for totals.

            const startDate = start ? start.toISOString().split('T')[0] : undefined;
            const endDate = start ? end.toISOString().split('T')[0] : undefined;

            const data = await getDashboardStats(startDate, endDate);
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [period]);

    if (loading && !stats) { // Show skeleton only on first load or if stats are null
        return (
            <div className="space-y-8">
                <div className="flex justify-end mb-4">
                    <Skeleton className="w-[180px] h-10" />
                </div>
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
                    <Skeleton className="w-24 h-6 mb-4" />
                    <div className="hidden md:block bg-card border rounded-xl overflow-hidden p-4 space-y-4">
                        {[1, 2, 3].map(i => (<Skeleton key={i} className="w-full h-12" />))}
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) return <div className="text-center py-10">No data available.</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold">Visão Geral</h1>

                <div className="flex items-center bg-card border rounded-lg p-1">
                    <Button
                        variant={period === 'all' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setPeriod('all')}
                        className="text-xs"
                    >
                        Tudo
                    </Button>
                    <Button
                        variant={period === '7d' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setPeriod('7d')}
                        className="text-xs"
                    >
                        7 Dias
                    </Button>
                    <Button
                        variant={period === '30d' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setPeriod('30d')}
                        className="text-xs"
                    >
                        30 Dias
                    </Button>
                    <Button
                        variant={period === 'month' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setPeriod('month')}
                        className="text-xs"
                    >
                        Este Mês
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                            <h3 className="text-2xl font-bold">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(stats.totalRevenue / 100)}
                            </h3>
                            {period !== 'all' && <span className="text-xs text-muted-foreground">no período selecionado</span>}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pedidos</p>
                            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                            {period !== 'all' && <span className="text-xs text-muted-foreground">no período selecionado</span>}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-700 rounded-lg">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Produtos Ativos</p>
                            <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                            <span className="text-xs text-muted-foreground">Total geral</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Pedidos Recentes
                </h2>
                <div className="hidden md:block bg-card border rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-muted border-b border-border text-foreground text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Cliente</th>
                                <th className="px-6 py-4 font-semibold">Data</th>
                                <th className="px-6 py-4 font-semibold">Valor</th>
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
                    <div className="p-8 text-center text-muted-foreground bg-card border rounded-xl">Sem pedidos recentes neste período.</div>
                )}
            </div>
        </div>
    );
}
