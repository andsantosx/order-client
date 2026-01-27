import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { Product } from "@/services/product/getById";
import { getById as getProductById } from "@/services/product/getById";


export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Não foi possível carregar o produto.");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <p className="text-xl text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
    toast.success("Adicionado à sacola!");
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="space-y-2 py-4 border-y border-border">
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-foreground">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-foreground">
              {product.stock} produtos em estoque
            </span>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Quantidade
            </label>
            <div className="flex items-center border border-border rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
              >
                -
              </button>
              <span className="px-6 py-2 text-center font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Adicionar à Sacola
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
            <div className="text-center">
              <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-semibold text-foreground">
                Frete Grátis
              </p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-semibold text-foreground">
                Devolução Fácil
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-semibold text-foreground">
                Garantia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
