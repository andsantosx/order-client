import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";
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
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(order.total_amount))}
                            </td>
                            <td className="py-4">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold 
                                ${order.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
