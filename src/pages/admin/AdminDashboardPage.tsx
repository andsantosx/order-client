import { Link, Outlet, useLocation } from "react-router-dom";
import { Package, ShoppingBag, LayoutDashboard } from "lucide-react";

export function AdminDashboardPage() {
    const location = useLocation();
    const currentPath = location.pathname;

    const tabs = [
        { name: "Visão Geral", path: "/admin", icon: LayoutDashboard, exact: true },
        { name: "Produtos", path: "/admin/products", icon: Package },
        { name: "Categorias", path: "/admin/categories", icon: Package },
        { name: "Marcas", path: "/admin/brands", icon: Package }, // Reuse icon for simplicity or use Tag
        { name: "Pedidos", path: "/admin/orders", icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                    <Link to="/produto/novo" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 w-full sm:w-auto text-center">
                        + Novo Produto
                    </Link>
                </div>

                <div className="flex border-b mb-8 overflow-x-auto no-scrollbar w-full pb-1">
                    {tabs.map(tab => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`flex flex-shrink-0 items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap
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
