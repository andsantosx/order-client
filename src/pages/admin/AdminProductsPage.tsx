import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll as getAllProducts, type Product } from "@/services/product/getAll";
import { remove as deleteProduct } from "@/services/product/delete";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products:", error);
            toast.error("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        try {
            await deleteProduct(id);
            toast.success("Produto excluído");
            loadProducts();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir");
        }
    }

    if (loading) {
        return (
            <div>
                {/* Desktop Skeleton */}
                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden p-4 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <Skeleton className="w-12 h-12 rounded-lg" />
                            <Skeleton className="w-1/4 h-4" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-24 h-6 rounded-md" />
                            <Skeleton className="w-20 h-8 rounded-md" />
                        </div>
                    ))}
                </div>
                {/* Mobile Skeleton */}
                <div className="md:hidden space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="bg-card border border-border p-4 rounded-xl shadow-sm flex gap-4">
                            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-1/2 h-8" />
                                <div className="flex justify-end gap-2 mt-2">
                                    <Skeleton className="w-full h-8" />
                                    <Skeleton className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted border-b border-border text-foreground text-sm uppercase">
                        <tr>
                            <th className="py-4 px-6 font-semibold">Imagem</th>
                            <th className="py-4 px-6 font-semibold">Nome</th>
                            <th className="py-4 px-6 font-semibold">Preço</th>
                            <th className="py-4 px-6 font-semibold">Categoria</th>
                            <th className="py-4 px-6 font-semibold text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-medium">{product.name}</td>
                                <td className="py-4 px-6 font-semibold text-muted-foreground">
                                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                                </td>
                                <td className="py-4 px-6">
                                    <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right space-x-1">
                                    <Link to={`/produto/editar/${product.id}`}>
                                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(product.id)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {products.map(product => (
                    <div key={product.id} className="bg-card border border-border p-4 rounded-xl shadow-sm flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                                    <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-medium uppercase tracking-wide">
                                        {product.category}
                                    </span>
                                </div>
                                <p className="font-bold text-lg text-primary">
                                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                                </p>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <Link to={`/produto/editar/${product.id}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                                        <Edit className="w-3 h-3 mr-2" /> Editar
                                    </Button>
                                </Link>
                                <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(product.id)}>
                                    <Trash className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
