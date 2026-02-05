import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/lib/api-client";
import { getProfile, updateProfile } from "@/services/auth/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Package, LogOut, Settings, MapPin, Plus, Trash2 } from "lucide-react";
import { getAll as getAddresses, type Address } from "@/services/address/getAll";
import { create as createAddressApi, type CreateAddressData } from "@/services/address/create";
import { remove as removeAddressApi } from "@/services/address/delete";
import { useNavigate } from "react-router-dom";

import { listMyOrders, type Order } from "@/services/order/myOrders";

export function ProfilePage() {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();

    // Combined State
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

    // Profile State
    const [profileData, setProfileData] = useState({ name: '', email: '', password: '' });
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    // Orders State
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Address State
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState<CreateAddressData>({
        street: '', city: '', state: '', zipCode: '', country: 'Brasil'
    });

    // Initial Load
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        loadProfile();
        loadOrders();
    }, [token, navigate]);

    // Tab Effect
    useEffect(() => {
        if (activeTab === 'addresses') {
            loadAddresses();
        }
    }, [activeTab]);

    // Data Loaders
    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfileData({ ...profileData, name: data.name, email: data.email });
        } catch (error) {
            toast.error("Failed to load profile");
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const loadOrders = async () => {
        setIsLoadingOrders(true);
        try {
            const data = await listMyOrders();
            setOrders(data);
        } catch (error) {
            console.error("Orders load error", error);
        } finally {
            setIsLoadingOrders(false);
        }
    };

    const loadAddresses = async () => {
        setIsLoadingAddresses(true);
        try {
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error("Addresses load error", error);
        } finally {
            setIsLoadingAddresses(false);
        }
    };

    // Handlers
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { name, password } = profileData;
            await updateProfile({ name, password: password || undefined });
            toast.success("Profile updated successfully");
            setProfileData(prev => ({ ...prev, password: '' }));
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Note: service handles formatting
            await createAddressApi(newAddress);
            toast.success("Endereço adicionado!");
            setIsAddingAddress(false);
            setNewAddress({ street: '', city: '', state: '', zipCode: '', country: 'Brasil' });
            loadAddresses();
        } catch (error: any) {
            console.error("Erro ao adicionar endereço:", error);
            console.error("Payload enviado:", newAddress);
            toast.error(error.response?.data?.error || "Erro ao adicionar endereço");
        }
    };

    const handleDeleteAddress = async (id: string) => {
        try {
            await removeAddressApi(id);
            toast.success("Endereço removido");
            setAddresses(addresses.filter(a => a.id !== id));
        } catch (error) {
            toast.error("Erro ao remover endereço");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logged out");
    };

    if (isLoadingProfile) {
        return <div className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <div className="grid lg:grid-cols-[280px_1fr] gap-12">

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 pb-8 border-b border-border">
                            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl uppercase">
                                {profileData.name.charAt(0) || "U"}
                            </div>
                            <div>
                                <p className="font-bold text-lg leading-none">{profileData.name}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-[180px]">{profileData.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors border-l-2
                                    ${activeTab === 'profile'
                                        ? 'bg-secondary/50 border-primary text-primary'
                                        : 'hover:bg-secondary/30 border-transparent text-muted-foreground hover:text-foreground'}
                                `}
                            >
                                <Settings className="w-5 h-5" />
                                Account Settings
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors border-l-2
                                    ${activeTab === 'orders'
                                        ? 'bg-secondary/50 border-primary text-primary'
                                        : 'hover:bg-secondary/30 border-transparent text-muted-foreground hover:text-foreground'}
                                `}
                            >
                                <Package className="w-5 h-5" />
                                Order History
                            </button>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 font-medium transition-colors border-l-2
                                    ${activeTab === 'addresses'
                                        ? 'bg-secondary/50 border-primary text-primary'
                                        : 'hover:bg-secondary/30 border-transparent text-muted-foreground hover:text-foreground'}
                                `}
                            >
                                <MapPin className="w-5 h-5" />
                                Meus Endereços
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 font-medium text-destructive hover:bg-destructive/10 transition-colors border-l-2 border-transparent"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="bg-card border border-border p-4 md:p-8 min-h-[500px]">
                        {activeTab === 'profile' && (
                            <div className="max-w-xl space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">My Profile</h2>
                                    <p className="text-muted-foreground">Manage your account information and password.</p>
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-6">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Full Name</label>
                                            <Input
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="bg-background"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Email Address</label>
                                            <Input
                                                value={profileData.email}
                                                disabled
                                                className="bg-secondary/50 text-muted-foreground cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2 pt-4 border-t border-border">
                                            <label className="text-sm font-semibold">New Password (Optional)</label>
                                            <Input
                                                type="password"
                                                placeholder="Leave blank to keep current"
                                                value={profileData.password}
                                                onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                                className="bg-background"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" className="min-w-[150px]">
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Order History</h2>
                                    <p className="text-muted-foreground">View status and details of your past orders.</p>
                                </div>

                                {isLoadingOrders ? (
                                    <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed border-border">
                                        <Package className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                                        <h3 className="text-lg font-bold mb-2">No orders yet</h3>
                                        <p className="text-muted-foreground mb-4">Start shopping to see your orders here.</p>
                                        <Button variant="outline" onClick={() => navigate("/loja")}>
                                            Go to Shop
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="group border border-border p-4 md:p-6 hover:border-primary transition-colors bg-background rounded-lg shadow-sm">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                                                    <div>
                                                        <p className="font-bold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Placed on {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider
                                                            ${order.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-secondary text-foreground'}`}>
                                                            {order.status}
                                                        </span>
                                                        <p className="font-bold text-xl">
                                                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(order.total_amount) / 100)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <Button variant="link" className="px-0" onClick={() => setSelectedOrder(order)}>View Details</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedOrder && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
                                <div className="bg-background w-full max-w-2xl rounded-xl shadow-2xl border border-border p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                                        <div>
                                            <h3 className="text-xl font-bold">Pedido #{selectedOrder.id.slice(0, 8).toUpperCase()}</h3>
                                            <p className="text-sm text-muted-foreground">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary rounded-full">
                                            <LogOut className="w-5 h-5 rotate-180" />
                                        </button>
                                    </div>

                                    {/* Action Buttons */}
                                    {selectedOrder.status !== 'PAID' &&
                                        selectedOrder.status !== 'SHIPPED' &&
                                        selectedOrder.status !== 'DELIVERED' &&
                                        selectedOrder.status !== 'CANCELED' &&
                                        selectedOrder.status !== 'REFUNDED' && (
                                            <div className="mb-6 pb-4 border-b border-border flex justify-end">
                                                <Button
                                                    variant="destructive"
                                                    onClick={async () => {
                                                        if (!confirm('Tem certeza que deseja cancelar este pedido?')) return;
                                                        try {
                                                            await apiClient.post(`/orders/${selectedOrder.id}/cancel`); // Assuming apiClient is available or imported if not using hook
                                                            toast.success("Pedido cancelado");
                                                            // Update local state
                                                            setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'CANCELED' } : o));
                                                            setSelectedOrder({ ...selectedOrder, status: 'CANCELED' });
                                                        } catch (error) {
                                                            toast.error("Erro ao cancelar pedido");
                                                        }
                                                    }}
                                                >
                                                    Cancelar Pedido
                                                </Button>
                                            </div>
                                        )}

                                    <div className="space-y-8">
                                        {/* Items */}
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Package className="w-4 h-4" /> Itens do Pedido
                                            </h4>
                                            <div className="space-y-3">
                                                {selectedOrder.items?.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 bg-secondary/20 p-3 rounded-lg">

                                                        <div className="flex-1">
                                                            <p className="font-medium">{item.product_name || item.name || item.product?.name || "Produto"}</p>
                                                            <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-semibold">
                                                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(item.unit_price) / 100)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Shipping */}
                                        {selectedOrder.shippingAddress && (
                                            <div>
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" /> Endereço de Entrega
                                                </h4>
                                                <div className="bg-secondary/20 p-4 rounded-lg text-sm">
                                                    <p className="font-medium">{selectedOrder.shippingAddress.street}</p>
                                                    <p className="text-muted-foreground">{selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state}</p>
                                                    <p className="text-muted-foreground font-mono">{selectedOrder.shippingAddress.zip_code}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Total */}
                                        <div className="pt-4 border-t border-border flex justify-between items-center">
                                            <span className="font-semibold">Total do Pedido</span>
                                            <span className="text-2xl font-bold text-primary">
                                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(selectedOrder.total_amount) / 100)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Meus Endereços</h2>
                                        <p className="text-muted-foreground">Gerencie seus endereços de entrega.</p>
                                    </div>
                                    <Button onClick={() => setIsAddingAddress(!isAddingAddress)}>
                                        {isAddingAddress ? "Cancelar" : <><Plus className="w-4 h-4 mr-2" /> Novo Endereço</>}
                                    </Button>
                                </div>

                                {isAddingAddress && (
                                    <form onSubmit={handleAddAddress} className="bg-secondary/20 p-6 rounded-xl border border-border space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">CEP</label>
                                                <Input
                                                    value={newAddress.zipCode}
                                                    onChange={e => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                                                    placeholder="00000-000"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Rua</label>
                                                <Input
                                                    value={newAddress.street}
                                                    onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                                                    placeholder="Rua Exemplo, 123"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Cidade</label>
                                                <Input
                                                    value={newAddress.city}
                                                    onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Estado</label>
                                                <Input
                                                    value={newAddress.state}
                                                    onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                                                    placeholder="SP"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="submit">Salvar Endereço</Button>
                                        </div>
                                    </form>
                                )}

                                {isLoadingAddresses ? (
                                    <div className="text-center py-12 text-muted-foreground">Carregando endereços...</div>
                                ) : addresses.length === 0 && !isAddingAddress ? (
                                    <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                                        <MapPin className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                                        <h3 className="text-lg font-bold mb-2">Nenhum endereço salvo</h3>
                                        <p className="text-muted-foreground">Adicione um endereço para agilizar suas compras.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="relative border border-border p-6 rounded-xl hover:border-primary transition-colors bg-background">
                                                <div className="absolute top-4 right-4">
                                                    <button
                                                        onClick={() => handleDeleteAddress(address.id)}
                                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 text-primary mt-1" />
                                                    <div>
                                                        <p className="font-bold">{address.street}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {address.city} - {address.state}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground font-mono mt-1">
                                                            {address.zip_code}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
