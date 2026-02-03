import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/authStore";
import { updateStatus as updateOrderStatus } from "@/services/order/updateStatus";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock, XCircle, RotateCcw, Eye, CreditCard, MapPin, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface Order {
    id: string;
    total_amount: number;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' | 'REFUNDED';
    created_at: string;
    user: { id: string; email: string; name?: string; document?: string } | null;
    guest_email: string | null;
    payment_method?: string;
    installments?: number;
    payment_id?: string;
    card_last_four?: string;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    } | null;
    items?: {
        id: string;
        quantity: number;
        unit_price: number;
        size?: string;
        product: {
            name: string;
            images: { image_url: string }[];
        };
    }[];
}

export function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const { token } = useAuthStore();

    const loadOrders = async (status?: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ isAdmin: 'true' });
            if (status && status !== 'ALL') {
                params.append('status', status);
            }

            const { data } = await apiClient.get<Order[]>(`/api/orders?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(data);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar pedidos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            loadOrders(statusFilter);
        }
    }, [token, statusFilter]);

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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value / 100);
    };

    const formatPaymentMethod = (method?: string, installments?: number, lastFour?: string) => {
        if (!method) return "Não informado";
        let text = method === 'pix' ? 'PIX' : method === 'bolbradesco' ? 'Boleto' : method;
        if (installments && installments > 1) text += ` (${installments}x)`;
        if (lastFour) text += ` •••• ${lastFour}`;
        return text;
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pedidos</h1>
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
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pedidos</h1>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Filtrar por:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-md border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="ALL">Todos os Status</option>
                        <option value="PENDING">⏳ Pendente</option>
                        <option value="PAID">✅ Pago</option>
                        <option value="SHIPPED">🚚 Enviado</option>
                        <option value="DELIVERED">📦 Entregue</option>
                        <option value="CANCELED">❌ Cancelado</option>
                        <option value="REFUNDED">🔄 Reembolsado</option>
                    </select>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted border-b border-border">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">ID</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Cliente</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Data</th>
                            <th className="py-4 px-6 font-semibold text-foreground text-sm">Pagamento</th>
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
                                        <span className="font-medium">{order.user?.name || "Cliente"}</span>
                                        <span className="text-xs text-muted-foreground">{order.guest_email || order.user?.email || "N/A"}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-muted-foreground">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-3 h-3 text-muted-foreground" />
                                        {formatPaymentMethod(order.payment_method, order.installments, order.card_last_four)}
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-medium">
                                    {formatCurrency(order.total_amount)}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">

                                        {/* View Details Sheet Trigger */}
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent className="overflow-y-auto sm:max-w-xl w-[90vw]">
                                                <SheetHeader className="mb-6">
                                                    <SheetTitle className="text-2xl">Detalhes do Pedido</SheetTitle>
                                                    <SheetDescription>
                                                        ID: <span className="font-mono text-foreground">{order.id}</span>
                                                    </SheetDescription>
                                                </SheetHeader>

                                                <div className="space-y-8">
                                                    {/* Status Section */}
                                                    <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                                                        <span className="text-sm font-medium">Status Atual</span>
                                                        <StatusBadge status={order.status} />
                                                    </div>

                                                    {/* Customer Details */}
                                                    <div className="space-y-3">
                                                        <h3 className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
                                                            <User className="w-5 h-5 text-primary" /> Cliente
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="block text-muted-foreground">Nome</span>
                                                                <span className="font-medium">{order.user?.name || "Cliente"}</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-muted-foreground">Email</span>
                                                                <span className="font-medium">{order.guest_email || order.user?.email}</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-muted-foreground">CPF/CNPJ</span>
                                                                <span className="font-medium">{order.user?.document || "N/A"}</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-muted-foreground">ID do Usuário</span>
                                                                <span className="font-mono text-xs">{order.user?.id || "Admin/Guest"}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Shipping Address */}
                                                    <div className="space-y-3">
                                                        <h3 className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
                                                            <MapPin className="w-5 h-5 text-primary" /> Entrega
                                                        </h3>
                                                        {order.shippingAddress ? (
                                                            <div className="text-sm space-y-1 bg-muted/30 p-3 rounded-md">
                                                                <p className="font-medium">{order.shippingAddress.street}</p>
                                                                <p>{order.shippingAddress.city} - {order.shippingAddress.state}</p>
                                                                <p className="text-muted-foreground">{order.shippingAddress.zip_code}</p>
                                                                <p className="text-xs text-muted-foreground mt-1">{order.shippingAddress.country}</p>
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-yellow-600">Endereço não registrado para este pedido.</p>
                                                        )}
                                                    </div>

                                                    {/* Payment Details */}
                                                    <div className="space-y-3">
                                                        <h3 className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
                                                            <CreditCard className="w-5 h-5 text-primary" /> Pagamento
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-md">
                                                            <div>
                                                                <span className="block text-muted-foreground">Método</span>
                                                                <span className="font-medium capitalize">{order.payment_method || "N/A"}</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-muted-foreground">Parcelas</span>
                                                                <span className="font-medium">{order.installments}x</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-muted-foreground">Cartão (Final)</span>
                                                                <span className="font-medium">{order.card_last_four ? `•••• ${order.card_last_four}` : "N/A"}</span>
                                                            </div>
                                                            <div>
                                                                <span className="block text-muted-foreground">ID Transação</span>
                                                                <span className="font-mono text-xs">{order.payment_id || "N/A"}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Order Items */}
                                                    <div className="space-y-3">
                                                        <h3 className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
                                                            <Package className="w-5 h-5 text-primary" /> Itens ({order.items?.length || 0})
                                                        </h3>
                                                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                                            {order.items?.map(item => (
                                                                <div key={item.id} className="flex gap-4 items-start bg-card border p-2 rounded-lg">
                                                                    <div className="w-12 h-12 bg-white rounded overflow-hidden shrink-0">
                                                                        <img
                                                                            src={item.product.images?.[0]?.image_url || "https://placehold.co/100"}
                                                                            alt={item.product.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium truncate">
                                                                            {item.product.name}
                                                                            {item.size && (
                                                                                <span className="ml-2 text-xs text-muted-foreground font-normal">
                                                                                    (Tamanho: {item.size})
                                                                                </span>
                                                                            )}
                                                                        </p>
                                                                        <p className="text-xs text-muted-foreground">
                                                                            {item.quantity}x {formatCurrency(item.unit_price)}
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-sm font-semibold">
                                                                        {formatCurrency(item.quantity * item.unit_price)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-between items-center border-t pt-3 mt-4">
                                                            <span className="font-bold">Total do Pedido</span>
                                                            <span className="font-bold text-xl text-primary">{formatCurrency(order.total_amount)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SheetContent>
                                        </Sheet>

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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View with Sheet support (Optional improvements for mobile would be similar) */}
            <div className="md:hidden space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                                    <span className="text-xs text-muted-foreground">• {new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="font-semibold text-sm">{order.user?.name || "Cliente"}</p>
                            </div>
                            <StatusBadge status={order.status} />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">Pagamento</span>
                                <span className="text-sm font-medium">{formatPaymentMethod(order.payment_method)}</span>
                            </div>
                            <span className="font-bold text-lg">
                                {formatCurrency(order.total_amount)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            {/* Sheet Trigger Mobile */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="w-4 h-4 mr-2" /> Detalhes
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto w-full">
                                    <SheetHeader className="mb-6">
                                        <SheetTitle>Detalhes do Pedido</SheetTitle>
                                        <SheetDescription>#{order.id}</SheetDescription>
                                    </SheetHeader>
                                    {/* Same content as desktop detailed view, reused logic ideally */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="font-semibold border-b pb-1">Cliente</h3>
                                            <p className="text-sm">{order.user?.name}</p>
                                            <p className="text-sm text-muted-foreground">{order.user?.email || order.guest_email}</p>
                                            <p className="text-sm text-muted-foreground">CPF: {order.user?.document}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-semibold border-b pb-1">Entrega</h3>
                                            {order.shippingAddress ? (
                                                <p className="text-sm">{order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.state}</p>
                                            ) : <p className="text-sm text-yellow-600">N/A</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-semibold border-b pb-1">Pagamento</h3>
                                            <p className="text-sm capitalize">{formatPaymentMethod(order.payment_method, order.installments, order.card_last_four)}</p>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <div className="relative flex-1">
                                <select
                                    value={order.status}
                                    onChange={async (e) => {
                                        const newStatus = e.target.value;
                                        try {
                                            await updateOrderStatus(order.id, newStatus);
                                            toast.success("Atualizado");
                                            // reload or update state locally
                                            loadOrders();
                                        } catch (e) { toast.error("Erro"); }
                                    }}
                                    className="w-full appearance-none px-3 py-2 rounded-md text-sm font-medium border bg-background"
                                >
                                    <option value={order.status}>{order.status}</option>
                                    <option value="SHIPPED">Enviado</option>
                                    <option value="DELIVERED">Entregue</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
