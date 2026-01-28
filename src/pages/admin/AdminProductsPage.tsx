import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll as getAllProducts, type Product } from "@/services/product/getAll";
import { remove as deleteProduct } from "@/services/product/delete";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";

export function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

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

    return (
        <div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="py-4 font-semibold">Nome</th>
                        <th className="py-4 font-semibold">Preço</th>
                        <th className="py-4 font-semibold">Estoque</th>
                        <th className="py-4 font-semibold text-right">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="py-4">{product.name}</td>
                            <td className="py-4">
                                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
                            </td>
                            <td className="py-4">{product.stock}</td>
                            <td className="py-4 text-right space-x-2">
                                <Link to={`/produto/editar/${product.id}`}>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(product.id)}>
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
