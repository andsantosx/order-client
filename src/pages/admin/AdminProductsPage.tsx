import { useEffect, useState } from "react";
import { getAll as getAllProducts, type Product } from "@/services/product/getAll";
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
            toast.error("Erro ao carregar produtos");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        try {
            // await deleteProduct(id); // Need to implement delete service
            toast.success("Produto excluído");
            loadProducts();
        } catch (error) {
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
                                <Button variant="ghost" size="icon" onClick={() => toast("Editar não implementado")}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete()}>
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
