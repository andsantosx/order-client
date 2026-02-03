import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAll as loadCategoriesService, type Category } from "@/services/category/getAll";
import { create as createCategory } from "@/services/category/create";
import { update as updateCategory } from "@/services/category/update";
import { remove as deleteCategory } from "@/services/category/delete";
import { Trash2, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadCategories = async () => {
        try {
            const data = await loadCategoriesService();
            setCategories(data);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar categorias");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    // Auto-generate slug from name
    useEffect(() => {
        if (newCategoryName) {
            const slug = newCategoryName
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setNewCategorySlug(slug);
        }
    }, [newCategoryName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingId) {
                await updateCategory(editingId, { name: newCategoryName, slug: newCategorySlug });
                toast.success("Categoria atualizada com sucesso");
            } else {
                await createCategory({ name: newCategoryName, slug: newCategorySlug });
                toast.success("Categoria criada com sucesso");
            }
            setNewCategoryName("");
            setNewCategorySlug("");
            setEditingId(null);
            loadCategories();
        } catch (error) {
            console.error(error);
            toast.error(editingId ? "Erro ao atualizar categoria" : "Erro ao criar categoria");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditClick = (category: Category) => {
        setEditingId(category.id);
        setNewCategoryName(category.name);
        setNewCategorySlug(category.slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNewCategoryName("");
        setNewCategorySlug("");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
        try {
            await deleteCategory(id);
            toast.success("Categoria excluída");
            loadCategories();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir categoria");
        }
    };

    if (loading) {
        return <div className="space-y-4">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-[300px] w-full" />
        </div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Gerenciar Categorias</h1>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">{editingId ? "Editar Categoria" : "Nova Categoria"}</h2>
                <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Nome</label>
                        <Input
                            placeholder="Ex: Camisetas"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input
                            placeholder="Ex: camisetas"
                            value={newCategorySlug}
                            onChange={(e) => setNewCategorySlug(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        {editingId && (
                            <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                <X className="w-4 h-4 mr-2" /> Cancelar
                            </Button>
                        )}
                        <Button type="submit" disabled={submitting}>
                            {submitting ? "Salvando..." : (editingId ? "Atualizar" : "Adicionar")}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-mono">{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(category)}>
                                        <Pencil className="w-4 h-4 text-blue-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    Nenhuma categoria encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
