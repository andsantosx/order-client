import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { create } from "@/services/product/create";

export function CreateProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price_cents: Math.round(parseFloat(price) * 100),
      currency: "BRL",
      stock: parseInt(stock, 10),
    };

    try {
      const newProduct = await create(productData);
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
          <Button type="submit" className="w-full h-12">
            Criar Produto
          </Button>
        </form>
      </div>
    </div>
  );
}
