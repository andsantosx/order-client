import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { create as createProduct } from "@/services/product/create";
import { getAll as getCategories, type Category } from "@/services/category/getAll";
import { getAll as getBrands, type Brand } from "@/services/brand";
import { getAll as getSizes, type Size } from "@/services/size/getAll";
import { validateImageUrl } from "@/utils/imageValidator";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableImage({ url, onRemove }: { url: string; onRemove: (url: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group aspect-square rounded-md overflow-hidden border border-border bg-muted touch-none"
    >
      <img src={url} alt="Preview" className="w-full h-full object-cover pointer-events-none" />
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking remove
        onClick={() => onRemove(url)}
        className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </button>
    </div>
  );
}

export function CreateProductPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [brandId, setBrandId] = useState<string>("");
  const [selectedSizeIds, setSelectedSizeIds] = useState<number[]>([]);

  // Image State
  const [currentInfoUrl, setCurrentInfoUrl] = useState(""); // Input field
  const [imageUrls, setImageUrls] = useState<string[]>([]); // List of added images

  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    Promise.all([getCategories(), getBrands(), getSizes()])
      .then(([cats, brs, szs]) => {
        setCategories(cats);
        setBrands(brs);
        // Ensure sizes are sorted by ID or logically if needed
        setSizes(szs.sort((a, b) => a.id - b.id));
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

  const handleAddImage = () => {
    if (!currentInfoUrl.trim()) return;

    // Validar domínio permitido
    const validation = validateImageUrl(currentInfoUrl.trim());
    if (!validation.valid) {
      toast.error(validation.error || "URL de imagem inválida");
      return;
    }

    if (imageUrls.includes(currentInfoUrl.trim())) {
      toast.error("Imagem já adicionada");
      return;
    }
    setImageUrls([...imageUrls, currentInfoUrl.trim()]);
    setCurrentInfoUrl("");
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setImageUrls(imageUrls.filter(url => url !== urlToRemove));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImageUrls((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
      const productData = {
        name,
        price_cents: Math.round(parseFloat(price) * 100),
        description,
        currency: "BRL",
        categoryId: parseInt(categoryId),
        brandId: brandId ? parseInt(brandId) : undefined,
        sizeIds: selectedSizeIds,
        images: imageUrls.length > 0 ? imageUrls : undefined
      };

      await createProduct(productData);

      toast.success("Produto criado com sucesso!");
      navigate(`/admin/products`);
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Erro ao criar o produto.");
    } finally {
      setLoading(false);
    }
  };

  // Group sizes by type
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
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Marca
                  </label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
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
            <h2 className="text-xl font-semibold">Imagens do Produto</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Arraste as imagens para reordenar. A primeira imagem será a capa.
            </p>

            {/* Input Area */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Adicionar Nova Imagem
              </label>
              <div className="flex gap-2">
                <Input
                  value={currentInfoUrl}
                  onChange={(e) => setCurrentInfoUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddImage();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddImage} variant="secondary">
                  Adicionar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Cole o link (HTTPS) de um domínio permitido
              </p>
            </div>

            {/* List */}
            {imageUrls.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={imageUrls}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
                    {imageUrls.map((url) => (
                      <SortableImage key={url} url={url} onRemove={handleRemoveImage} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
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
