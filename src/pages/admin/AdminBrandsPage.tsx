import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAll as loadBrandsService, create as createBrand, update as updateBrand, remove as deleteBrand, type Brand } from "@/services/brand";
import { Trash2, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminBrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [newBrandName, setNewBrandName] = useState("");
    const [newBrandSlug, setNewBrandSlug] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadBrands = async () => {
        try {
            const data = await loadBrandsService();
            setBrands(data);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar marcas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBrands();
    }, []);

    // Auto-generate slug
    useEffect(() => {
        if (newBrandName) {
            const slug = newBrandName
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setNewBrandSlug(slug);
        }
    }, [newBrandName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingId) {
                await updateBrand(editingId, { name: newBrandName, slug: newBrandSlug });
                toast.success("Marca atualizada com sucesso");
            } else {
                await createBrand({ name: newBrandName, slug: newBrandSlug });
                toast.success("Marca criada com sucesso");
            }
            setNewBrandName("");
            setNewBrandSlug("");
            setEditingId(null);
            loadBrands();
        } catch (error) {
            console.error(error);
            toast.error(editingId ? "Erro ao atualizar marca" : "Erro ao criar marca");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditClick = (brand: Brand) => {
        setEditingId(brand.id);
        setNewBrandName(brand.name);
        setNewBrandSlug(brand.slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNewBrandName("");
        setNewBrandSlug("");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir esta marca?")) return;
        try {
            await deleteBrand(id);
            toast.success("Marca excluída");
            loadBrands();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir marca");
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
            <h1 className="text-3xl font-bold">Gerenciar Marcas</h1>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">{editingId ? "Editar Marca" : "Nova Marca"}</h2>
                <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Nome</label>
                        <Input
                            placeholder="Ex: Nike"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input
                            placeholder="Ex: nike"
                            value={newBrandSlug}
                            onChange={(e) => setNewBrandSlug(e.target.value)}
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
                        {brands.map((brand) => (
                            <TableRow key={brand.id}>
                                <TableCell className="font-mono">{brand.id}</TableCell>
                                <TableCell>{brand.name}</TableCell>
                                <TableCell className="text-muted-foreground">{brand.slug}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(brand)}>
                                        <Pencil className="w-4 h-4 text-blue-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)}>
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {brands.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    Nenhuma marca encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
