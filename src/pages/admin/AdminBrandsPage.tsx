
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAll as getAllBrands, create as createBrand, remove as deleteBrand, type Brand } from "@/services/brand";
import { Plus, Tag, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export function AdminBrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newBrandName, setNewBrandName] = useState("");
    const [newBrandSlug, setNewBrandSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = async () => {
        try {
            const data = await getAllBrands();
            setBrands(data);
        } catch (error) {
            toast.error("Erro ao carregar marcas");
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createBrand({ name: newBrandName, slug: newBrandSlug });
            toast.success("Marca criada com sucesso!");
            setNewBrandName("");
            setNewBrandSlug("");
            setIsCreating(false);
            loadBrands();
        } catch (error) {
            toast.error("Erro ao criar marca");
            loadBrands();
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza? Produtos desta marca podem ficar sem marca.")) return;
        try {
            await deleteBrand(id);
            toast.success("Marca removida");
            loadBrands();
        } catch (error) {
            toast.error("Erro ao remover marca");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Tag className="w-6 h-6" /> Marcas
                </h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? "Cancelar" : <><Plus className="w-4 h-4 mr-2" /> Nova Marca</>}
                </Button>
            </div>

            {isLoadingData && (
                <div>
                    {/* Desktop Skeleton */}
                    <div className="hidden md:block bg-card border rounded-xl overflow-hidden shadow-sm p-4 space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex justify-between items-center">
                                <Skeleton className="w-8 h-4" />
                                <Skeleton className="w-32 h-4" />
                                <Skeleton className="w-24 h-6 rounded-md" />
                                <Skeleton className="w-8 h-8 rounded-md" />
                            </div>
                        ))}
                    </div>
                    {/* Mobile Skeleton */}
                    <div className="md:hidden space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-card border border-border p-4 rounded-xl shadow-sm flex justify-between items-center">
                                <div className="space-y-2">
                                    <Skeleton className="w-32 h-5" />
                                    <div className="flex gap-2">
                                        <Skeleton className="w-8 h-4" />
                                        <Skeleton className="w-20 h-4" />
                                    </div>
                                </div>
                                <Skeleton className="w-10 h-10 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isLoadingData && isCreating && (
                <div className="bg-card border p-6 rounded-xl shadow-sm animate-in slide-in-from-top-4">
                    <h2 className="font-semibold mb-4">Criar Nova Marca</h2>
                    <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-sm font-medium">Nome</label>
                            <Input
                                value={newBrandName}
                                onChange={e => {
                                    setNewBrandName(e.target.value);
                                    // Auto-slug
                                    setNewBrandSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                                }}
                                required
                                placeholder="Ex: Nike"
                            />
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-sm font-medium">Slug (URL)</label>
                            <Input
                                value={newBrandSlug}
                                onChange={e => setNewBrandSlug(e.target.value)}
                                required
                                placeholder="ex: nike"
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Criando..." : "Salvar"}
                        </Button>
                    </form>
                </div>
            )}

            {!isLoadingData && (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-card border rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-muted border-b border-border text-foreground text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">Nome</th>
                                    <th className="px-6 py-4 font-semibold">Slug</th>
                                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {brands.map(brand => (
                                    <tr key={brand.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-muted-foreground">#{brand.id}</td>
                                        <td className="px-6 py-4 font-medium">{brand.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-white bg-secondary px-2 py-1 rounded-md border border-border font-mono">
                                                {brand.slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(brand.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {brands.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                            <Tag className="w-12 h-12 mx-auto text-muted-foreground/20 mb-3" />
                                            <p>Nenhuma marca encontrada.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {brands.map(brand => (
                            <div key={brand.id} className="bg-card border border-border p-4 rounded-xl shadow-sm flex justify-between items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-foreground text-lg">{brand.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded font-mono border border-border">#{brand.id}</span>
                                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                                            /{brand.slug}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(brand.id)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        ))}
                        {brands.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                                <Tag className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                                <p className="text-muted-foreground text-sm">Nenhuma marca.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
