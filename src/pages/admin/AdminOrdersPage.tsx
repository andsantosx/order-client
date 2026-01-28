import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";
import { updateStatus as updateOrderStatus } from "@/services/order/updateStatus";
import toast from "react-hot-toast";

interface Order {
    id: string;
    total_amount: number;
    status: string;
    created_at: string;
    user: { email: string } | null;
    guest_email: string | null;
}

export function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await apiClient.get<Order[]>("/api/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(data);
            } catch (error) {
                toast.error("Erro ao carregar pedidos");
            }
        };
        if (token) fetchOrders();
    }, [token]);

    return (
        <div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="py-4 font-semibold">ID</th>
                        <th className="py-4 font-semibold">Cliente</th>
                        <th className="py-4 font-semibold">Data</th>
                        <th className="py-4 font-semibold">Total</th>
                        <th className="py-4 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="py-4 text-sm font-mono">{order.id.slice(0, 8)}...</td>
                            <td className="py-4">
                                {order.user?.email || order.guest_email || "Convidado"}
                            </td>
                            <td className="py-4">
                                {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(order.total_amount) / 100)}
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
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
                                        className={`px-2 py-1 rounded text-xs font-semibold border-none cursor-pointer outline-none
                                            ${order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'DELIVERED' ? 'bg-purple-100 text-purple-800' :
                                                        order.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="PAID">PAID</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELED">CANCELED</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
