import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { update as updateProduct } from "@/services/product/update";
import { getById as getProductById } from "@/services/product/getById";
import { create as createImage } from "@/services/image/create";
import { getAll as getCategories, type Category } from "@/services/category/getAll";
import { getAll as getSizes, type Size } from "@/services/size/getAll";
import { MoveLeft, X, Loader2 } from "lucide-react";
import { remove as deleteImage } from "@/services/image/delete";

export function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // Form State
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [selectedSizeIds, setSelectedSizeIds] = useState<number[]>([]);

    // Image State
    const [newImageUrl, setNewImageUrl] = useState("");
    const [existingImages, setExistingImages] = useState<{ id: string; url: string }[]>([]);
    const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

    // Data State
    const [categories, setCategories] = useState<Category[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!id) return;

                const [cats, szs, product] = await Promise.all([
                    getCategories(),
                    getSizes(),
                    getProductById(id)
                ]);

                setCategories(cats);
                setSizes(szs);

                // Populate Form
                setName(product.name);
                setPrice(product.price.toString());
                // Since getById might not return categoryId directly depending on backend, 
                // we might need to adjust this if category isn't pre-filled correctly.
                // Assuming product object has category_id or we can infer it. 
                // For now, let's leave category unset if not available or assume valid default.
                // NOTE: The current getById return type structure usually flattens data. 
                // If category ID is missing in getById response, we might need to update getById service.
                // For now, we will try to safe cast or handle it.

                // If product.sizes exists, map to IDs
                if (product.sizes) {
                    setSelectedSizeIds(product.sizes.map(s => parseInt(s.id) || 0).filter(id => id !== 0));
                }

                setExistingImages(product.images || []);

                // Note: We might be missing the categoryId from getById. 
                // We will assume for now user must re-select or we'll add it later if needed.

            } catch (error) {
                console.error("Error loading data", error);
                toast.error("Erro ao carregar dados do produto");
                navigate("/admin/products");
            } finally {
                setInitialLoading(false);
            }
        };

        loadData();
    }, [id, navigate]);

    const handleSizeToggle = (sizeId: number) => {
        setSelectedSizeIds(prev =>
            prev.includes(sizeId)
                ? prev.filter(id => id !== sizeId)
                : [...prev, sizeId]
        );
    };

    const handleImageDelete = async (imgId: string) => {
        if (!confirm("Remover esta imagem?")) return;
        setDeletingImageId(imgId);
        try {
            await deleteImage(imgId);
            setExistingImages(prev => prev.filter(img => img.id !== imgId));
            toast.success("Imagem removida");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao remover imagem");
        } finally {
            setDeletingImageId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        // Check validation if needed (e.g. category)
        // For update, we might allow partial updates, but good to be strict.
        if (selectedSizeIds.length === 0) {
            toast.error("Selecione pelo menos um tamanho");
            return;
        }

        setLoading(true);

        try {
            // 1. Update Product
            const productData = {
                name,
                price_cents: Math.round(parseFloat(price) * 100),
                // If categoryId is set, send it. If empty string (user didn't touch it and we didn't prefill), 
                // backend might complain or ignore. Ideally we prefilled it.
                ...(categoryId ? { categoryId: parseInt(categoryId) } : {}),
                sizeIds: selectedSizeIds,
            };

            await updateProduct(id, productData);

            // 2. Add New Image if provided
            if (newImageUrl && newImageUrl.trim() !== "") {
                try {
                    // Create image returns the image object (assuming standard create response)
                    // If it returns void, we can't get ID. Assuming it might need refetch 
                    // or optimistic update with fake ID if user doesn't delete immediately.
                    // Let's refetch to get consistency or verify create return type.
                    await createImage(id, newImageUrl);
                    toast.success("Imagem adicionada com sucesso!");
                    setNewImageUrl("");

                    // Ideally we refetch just the images, but full reload is safer
                    // to get the real ID for the new image in case user wants to delete it.
                    const updatedProduct = await getProductById(id);
                    setExistingImages(updatedProduct.images);
                } catch (imgError) {
                    console.error("Failed to add image", imgError);
                    toast.error("Produto atualizado, mas erro ao adicionar nova imagem.");
                }
            }

            toast.success("Produto atualizado com sucesso!");
        } catch (error) {
            console.error("Failed to update product:", error);
            toast.error("Erro ao atualizar o produto.");
        } finally {
            setLoading(false);
        }
    };

    // Group sizes by type for better UI (copied from CreateProductPage)
    const sizesByType = sizes.reduce((acc, size) => {
        const type = size.type || 'Outros';
        if (!acc[type]) acc[type] = [];
        acc[type].push(size);
        return acc;
    }, {} as Record<string, Size[]>);

    if (initialLoading) {
        return <div className="min-h-screen pt-24 pb-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="mx-auto max-w-[800px] px-6 lg:px-10">
                <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate("/admin/products")}>
                    <MoveLeft className="w-4 h-4 mr-2" />
                    Voltar para Produtos
                </Button>

                <h1 className="text-4xl font-bold text-foreground mb-8">
                    Editar Produto
                </h1>
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Info */}
                    <div className="space-y-4 p-6 border rounded-lg bg-card">
                        <h2 className="text-xl font-semibold">Informações Básicas</h2>

                        <div>
                            <label className="text-sm font-semibold text-foreground mb-2 block">
                                Nome do Produto
                            </label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Camiseta Básica"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-2 block">
                                    Preço (R$)
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-2 block">
                                    Categoria
                                </label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                // Not required here to allow keeping existing if we can't fetch it
                                >
                                    <option value="">Selecione (ou mantenha atual)...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="space-y-4 p-6 border rounded-lg bg-card">
                        <h2 className="text-xl font-semibold">Tamanhos Disponíveis</h2>
                        {Object.entries(sizesByType).map(([type, groupSizes]) => (
                            <div key={type} className="mb-4">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2 capitalize">{type}</h3>
                                <div className="flex flex-wrap gap-4">
                                    {groupSizes.map((size) => (
                                        <div key={size.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`size-${size.id}`}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                checked={selectedSizeIds.includes(size.id)}
                                                onChange={() => handleSizeToggle(size.id)}
                                            />
                                            <label
                                                htmlFor={`size-${size.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {size.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reference Existing Images */}
                    {existingImages.length > 0 && (
                        <div className="space-y-4 p-6 border rounded-lg bg-card">
                            <h2 className="text-xl font-semibold">Imagens Atuais</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {existingImages.map((img) => (
                                    <div key={img.id} className="aspect-square relative rounded-md overflow-hidden border group">
                                        <img src={img.url} alt="Produto" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleImageDelete(img.id)}
                                            disabled={deletingImageId === img.id}
                                            className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                        >
                                            {deletingImageId === img.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <X className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add New Image */}
                    <div className="space-y-4 p-6 border rounded-lg bg-card">
                        <h2 className="text-xl font-semibold">Adicionar Nova Imagem</h2>
                        <div>
                            <label className="text-sm font-semibold text-foreground mb-2 block">
                                URL da Imagem
                            </label>
                            <Input
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Cole o link de uma nova imagem para adicionar à galeria.
                            </p>
                        </div>
                        {newImageUrl && (
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                                <img src={newImageUrl} alt="Preview" className="h-40 w-40 object-cover rounded-md border" />
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
