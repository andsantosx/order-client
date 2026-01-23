import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function CreateProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState(""); // comma-separated
  const [sizes, setSizes] = useState(""); // comma-separated

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price_cents: Math.round(parseFloat(price) * 100),
      currency: "BRL",
      stock: parseInt(stock, 10),
      description,
      category,
      image,
      colors: colors.split(",").map((c) => c.trim()),
      sizes: sizes.split(",").map((s) => s.trim()),
      rating: 0,
      reviews: 0,
    };

    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const newProduct = await response.json();
      toast.success("Produto criado com sucesso!");
      navigate(`/produto/${newProduct.id}`);
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Erro ao criar o produto.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Adicionar Novo Produto
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Nome do Produto
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Estoque
              </label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Categoria
            </label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              URL da Imagem
            </label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Descrição
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Cores (separadas por vírgula)
            </label>
            <Input value={colors} onChange={(e) => setColors(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Tamanhos (separados por vírgula)
            </label>
            <Input value={sizes} onChange={(e) => setSizes(e.target.value)} />
          </div>
          <Button type="submit" className="w-full h-12">
            Criar Produto
          </Button>
        </form>
      </div>
    </div>
  );
}
