import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";
import { updateStatus as updateOrderStatus } from "@/services/order/updateStatus";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock, XCircle, RotateCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
interface Order {
    id: string;
    total_amount: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' | 'REFUNDED';
    created_at: string;
    user: { email: string } | null;
    guest_email: string | null;
}

export function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthStore();

    const loadOrders = async () => {
        setLoading(true);
        try {
            const { data } = await apiClient.get<Order[]>("/api/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(data);
        } catch (error) {
            toast.error("Erro ao carregar pedidos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            loadOrders();
        }
    }, [token]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-800 border-green-200';
            case 'SHIPPED': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'DELIVERED': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'CANCELED': return 'bg-red-100 text-red-800 border-red-200';
            case 'REFUNDED': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const StatusBadge = ({ status }: { status: string }) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(status)} flex items-center gap-1 w-fit`}>
            {status === 'PAID' && <CheckCircle className="w-3 h-3" />}
            {status === 'SHIPPED' && <Truck className="w-3 h-3" />}
            {status === 'DELIVERED' && <Package className="w-3 h-3" />}
            {status === 'PENDING' && <Clock className="w-3 h-3" />}
            {status === 'CANCELED' && <XCircle className="w-3 h-3" />}
            {status === 'REFUNDED' && <RotateCcw className="w-3 h-3" />}
            {status}
        </span>
    );

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pedidos</h1>
                {/* Desktop Skeleton */}
                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden p-4 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <Skeleton className="w-8 h-4" />
                            <Skeleton className="w-32 h-4" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-32 h-8 rounded-md" />
                        </div>
                    ))}
                </div>
                {/* Mobile Skeleton */}
                <div className="md:hidden space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="bg-card border border-border p-4 rounded-xl shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <div className="space-y-2">
                                    <Skeleton className="w-20 h-3" />
                                    <Skeleton className="w-32 h-5" />
                                </div>
                                <Skeleton className="w-24 h-6 rounded-full" />
                            </div>
                            <div className="flex justify-between items-center border-t border-border pt-3">
                                <Skeleton className="w-24 h-4" />
                                <Skeleton className="w-24 h-6 rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pedidos</h1>

            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted border-b border-border">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">ID</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Cliente</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Data</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Total</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Status / Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                                <td className="py-4 px-6 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.guest_email || order.user?.email || "N/A"}</span>
                                        <span className="text-xs text-muted-foreground">{order.user ? "Registrado" : "Convidado"}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-muted-foreground">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-6 font-medium">
                                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(order.total_amount) / 100)}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <select
                                                value={order.status}
                                                onChange={async (e) => {
                                                    const newStatus = e.target.value;
                                                    try {
                                                        const updatedOrder = await updateOrderStatus(order.id, newStatus);
                                                        toast.success("Status atualizado");
                                                        setOrders(orders.map(o => o.id === order.id ? { ...o, status: updatedOrder.status } : o));
                                                    } catch (error) {
                                                        toast.error("Erro ao atualizar status");
                                                    }
                                                }}
                                                className={`appearance-none pl-3 pr-8 py-1.5 rounded-md text-xs font-semibold border bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${getStatusColor(order.status)}`}
                                                disabled={order.status === 'CANCELED' || order.status === 'REFUNDED'}
                                            >
                                                <option value={order.status}>{order.status}</option>
                                                {order.status !== 'CANCELED' && order.status !== 'REFUNDED' && (
                                                    <>
                                                        <option value="SHIPPED">Enviado</option>
                                                        <option value="DELIVERED">Entregue</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                        {order.status === 'PENDING' && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="h-7 text-xs"
                                                onClick={async () => {
                                                    if (!confirm('Cancelar pedido?')) return;
                                                    try {
                                                        await apiClient.post(`/api/orders/${order.id}/cancel`);
                                                        toast.success("Cancelado");
                                                        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'CANCELED' } : o));
                                                    } catch (error) { toast.error("Erro ao cancelar"); }
                                                }}
                                            >
                                                Cancelar
                                            </Button>
                                        )}

                                        {order.status === 'PAID' && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 text-xs border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                                                onClick={async () => {
                                                    if (!confirm('Reembolsar pedido?')) return;
                                                    try {
                                                        await apiClient.post(`/api/orders/${order.id}/refund`);
                                                        toast.success("Reembolsado");
                                                        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'REFUNDED' } : o));
                                                    } catch (error) { toast.error("Erro ao reembolsar"); }
                                                }}
                                            >
                                                Reembolsar
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                                    <span className="text-xs text-muted-foreground">• {new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="font-semibold text-sm">{order.guest_email || order.user?.email}</p>
                            </div>
                            <StatusBadge status={order.status} />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="font-bold text-lg">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(order.total_amount) / 100)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            {/* Mobile Actions */}
                            <div className="relative flex-1">
                                <select
                                    value={order.status}
                                    onChange={async (e) => {
                                        const newStatus = e.target.value;
                                        try {
                                            const updatedOrder = await updateOrderStatus(order.id, newStatus);
                                            toast.success("Status atualizado");
                                            setOrders(orders.map(o => o.id === order.id ? { ...o, status: updatedOrder.status } : o));
                                        } catch (error) {
                                            toast.error("Erro ao atualizar status");
                                        }
                                    }}
                                    className="w-full appearance-none px-3 py-2 rounded-md text-sm font-medium border bg-background"
                                    disabled={order.status === 'CANCELED' || order.status === 'REFUNDED'}
                                >
                                    <option value={order.status}>{order.status}</option>
                                    {order.status !== 'CANCELED' && order.status !== 'REFUNDED' && (
                                        <>
                                            <option value="SHIPPED">Enviado</option>
                                            <option value="DELIVERED">Entregue</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            {order.status === 'PENDING' && (
                                <Button variant="destructive" size="sm" onClick={async () => {
                                    if (!confirm('Cancelar?')) return;
                                    try {
                                        await apiClient.post(`/api/orders/${order.id}/cancel`); toast.success("Cancelado");
                                        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'CANCELED' } : o));
                                    } catch (e) { toast.error("Erro"); }
                                }}>Cancelar</Button>
                            )}
                            {order.status === 'PAID' && (
                                <Button variant="outline" size="sm" className="border-red-200 text-red-700" onClick={async () => {
                                    if (!confirm('Reembolsar?')) return;
                                    try {
                                        await apiClient.post(`/api/orders/${order.id}/refund`); toast.success("Reembolsado");
                                        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'REFUNDED' } : o));
                                    } catch (e) { toast.error("Erro"); }
                                }}>Reembolsar</Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
