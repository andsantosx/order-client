import { Link, Outlet, useLocation } from "react-router-dom";
import { Package, ShoppingBag, LayoutDashboard } from "lucide-react";

export function AdminDashboardPage() {
    const location = useLocation();
    const currentPath = location.pathname;

    const tabs = [
        { name: "Visão Geral", path: "/admin", icon: LayoutDashboard, exact: true },
        { name: "Produtos", path: "/admin/products", icon: Package },
        { name: "Pedidos", path: "/admin/orders", icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                    <Link to="/produto/novo" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                        + Novo Produto
                    </Link>
                </div>

                <div className="flex border-b mb-8">
                    {tabs.map(tab => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors 
                            ${(tab.exact ? currentPath === tab.path : currentPath.startsWith(tab.path))
                                    ? "border-primary text-primary font-semibold"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.name}
                        </Link>
                    ))}
                </div>

                <Outlet />
            </div>
        </div>
    );
}
