
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAll as getAllCategories, type Category } from "@/services/category/getAll";
import { create as createCategory } from "@/services/category/create";
import { remove as deleteCategory } from "@/services/category/delete";
import { Plus, Tag, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            toast.error("Erro ao carregar categorias");
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createCategory({ name: newCategoryName, slug: newCategorySlug });
            toast.success("Categoria criada com sucesso!");
            setNewCategoryName("");
            setNewCategorySlug("");
            setIsCreating(false);
            loadCategories();
        } catch (error) {
            toast.error("Erro ao criar categoria");
            loadCategories();
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza? Produtos nesta categoria podem ficar sem categoria.")) return;
        try {
            await deleteCategory(id);
            toast.success("Categoria removida");
            loadCategories();
        } catch (error) {
            toast.error("Erro ao remover categoria");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Tag className="w-6 h-6" /> Categorias
                </h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? "Cancelar" : <><Plus className="w-4 h-4 mr-2" /> Nova Categoria</>}
                </Button>
            </div>

            {isCreating && (
                <div className="bg-card border p-6 rounded-xl shadow-sm animate-in slide-in-from-top-4">
                    <h2 className="font-semibold mb-4">Criar Nova Categoria</h2>
                    <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-sm font-medium">Nome</label>
                            <Input
                                value={newCategoryName}
                                onChange={e => {
                                    setNewCategoryName(e.target.value);
                                    // Auto-slug
                                    setNewCategorySlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                                }}
                                required
                                placeholder="Ex: Camisetas"
                            />
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-sm font-medium">Slug (URL)</label>
                            <Input
                                value={newCategorySlug}
                                onChange={e => setNewCategorySlug(e.target.value)}
                                required
                                placeholder="ex: camisetas"
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Criando..." : "Salvar"}
                        </Button>
                    </form>
                </div>
            )}

            <div className="bg-card border rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold">ID</th>
                            <th className="px-6 py-4 font-semibold">Nome</th>
                            <th className="px-6 py-4 font-semibold">Slug</th>
                            <th className="px-6 py-4 font-semibold text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories.map(cat => (
                            <tr key={cat.id} className="hover:bg-muted/30">
                                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">#{cat.id}</td>
                                <td className="px-6 py-4 font-medium">{cat.name}</td>
                                <td className="px-6 py-4 text-sm text-muted-foreground bg-muted/20 w-fit rounded px-2">{cat.slug}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => handleDelete(Number(cat.id))}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                                    Nenhuma categoria encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
