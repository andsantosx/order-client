import { useState, useMemo, useEffect } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import type { Product } from "@/types";

import { getAll as getAllProducts } from "@/services/product/getAll";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [sortBy, setSortBy] = useState("newest");
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Não foi possível carregar os produtos.");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossa Coleção
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore nossa seleção exclusiva
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Preço
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="600"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Ordenar
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="newest">Mais recentes</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg leading-none tracking-tight mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Estoque: {product.stock}
                      </p>
                    </div>
                    <p className="font-medium text-lg">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                      });
                      toast.success("Adicionado ao carrinho");
                    }}
                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
