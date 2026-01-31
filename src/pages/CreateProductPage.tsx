import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { create as createProduct } from "@/services/product/create";
import { create as createImage } from "@/services/image/create";
import { getAll as getCategories, type Category } from "@/services/category/getAll";
import { getAll as getSizes, type Size } from "@/services/size/getAll";

export function CreateProductPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedSizeIds, setSelectedSizeIds] = useState<number[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  useEffect(() => {
    Promise.all([getCategories(), getSizes()])
      .then(([cats, szs]) => {
        setCategories(cats);
        setSizes(szs);
      })
      .catch(() => toast.error("Erro ao carregar dados iniciais"));
  }, []);

  const handleSizeToggle = (sizeId: number) => {
    setSelectedSizeIds(prev =>
      prev.includes(sizeId)
        ? prev.filter(id => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Selecione uma categoria");
      return;
    }
    if (selectedSizeIds.length === 0) {
      toast.error("Selecione pelo menos um tamanho");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Product
      const productData = {
        name,
        price_cents: Math.round(parseFloat(price) * 100),
        description,
        currency: "BRL",
        categoryId: parseInt(categoryId),
        sizeIds: selectedSizeIds,
      };

      const newProduct = await createProduct(productData);

      // 2. Add Image if provided
      if (imageUrl && imageUrl.trim() !== "") {
        try {
          await createImage(newProduct.id, imageUrl);
        } catch (imgError) {
          console.error("Failed to add image", imgError);
          toast.error("Produto criado, mas erro ao adicionar imagem.");
        }
      }

      toast.success("Produto criado com sucesso!");
      navigate(`/admin/products`); // Go back to list
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Erro ao criar o produto.");
    } finally {
      setLoading(false);
    }
  };

  // Group sizes by type for better UI
  const sizesByType = sizes.reduce((acc, size) => {
    const type = size.type || 'Outros';
    if (!acc[type]) acc[type] = [];
    acc[type].push(size);
    return acc;
  }, {} as Record<string, Size[]>);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Adicionar Novo Produto
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

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Descrição (Opcional)
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalhes do produto (opcional)"
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
                  required
                >
                  <option value="">Selecione...</option>
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

          {/* Images */}
          <div className="space-y-4 p-6 border rounded-lg bg-card">
            <h2 className="text-xl font-semibold">Imagens</h2>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                URL da Imagem Principal
              </label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Copie o link da imagem (ou use um placeholder como via.placeholder.com)
              </p>
            </div>
            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <img src={imageUrl} alt="Preview" className="h-40 w-40 object-cover rounded-md border" />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
            {loading ? "Criando..." : "Criar Produto"}
          </Button>
        </form>
      </div >
    </div >
  );
}
