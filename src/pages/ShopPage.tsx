import { SlidersHorizontal, Plus, Minus, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

import { getAll as getAllProducts, type Product } from "@/services/product/getAll";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get search and category from URL params
  const searchFromUrl = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "";

  // Filter States
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeMinPrice, setActiveMinPrice] = useState<number | undefined>(undefined);
  const [activeMaxPrice, setActiveMaxPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState("newest");

  const { addItem } = useCartStore();

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    price: true,
    sort: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch when filters change
  useEffect(() => {
    fetchProducts();
  }, [searchFromUrl, categoryFromUrl, activeMinPrice, activeMaxPrice, sortBy]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts({
        search: searchFromUrl,
        category: categoryFromUrl,
        minPrice: activeMinPrice,
        maxPrice: activeMaxPrice,
        sortBy
      });
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Unable to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const applyPriceFilter = () => {
    setActiveMinPrice(minPrice ? Number(minPrice) : undefined);
    setActiveMaxPrice(maxPrice ? Number(maxPrice) : undefined);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setActiveMinPrice(undefined);
    setActiveMaxPrice(undefined);
    // Redirect to clear search param
    window.location.href = "/loja";
  };

  // Reusable filter content JSX
  const renderFilters = (isMobile = false) => (
    <div className="space-y-8 h-full flex flex-col">
      {/* Label */}
      <div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
        {isMobile && (
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </SheetClose>
        )}
      </div>

      <div className="overflow-y-auto flex-1 pr-2 space-y-6">

        {/* Price Filter */}
        <div className="space-y-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
          >
            Preço
            {openSections.price ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>

          {openSections.price && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Mín"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
                    className="bg-secondary/20 border-border"
                  />
                </div>
                <span className="text-muted-foreground">—</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Máx"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
                    className="bg-secondary/20 border-border"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={applyPriceFilter}
              >
                Aplicar Filtro
              </Button>
            </div>
          )}
        </div>

        {/* Sort Filter */}
        <div className="space-y-4">
          <button
            onClick={() => toggleSection('sort')}
            className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors"
          >
            Ordenar
            {openSections.sort ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>

          {openSections.sort && (
            <div className="space-y-2">
              {[
                { label: "Mais Recentes", value: "newest" },
                { label: "Preço: Menor para Maior", value: "price-low" },
                { label: "Preço: Maior para Menor", value: "price-high" }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-secondary/50 transition-colors">
                  <div className={`w-4 h-4 border border-input rounded-sm flex items-center justify-center transition-colors ${sortBy === option.value ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent'}`}>
                    {sortBy === option.value && <Check className="w-3 h-3" />}
                  </div>
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="hidden"
                  />
                  <span className={`text-sm transition-colors ${sortBy === option.value ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-foreground"
          onClick={clearFilters}
        >
          Limpar Filtros
        </Button>
      </div>

      {/* Mobile Footer Actions */}
      {isMobile && (
        <div className="pt-4 border-t border-border mt-auto">
          <SheetClose asChild>
            <Button className="w-full font-bold uppercase tracking-wider">
              Ver {products.length} Resultados
            </Button>
          </SheetClose>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-4 leading-none">
              Nossa<br />Coleção
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm">
              Explore nossa última coleção de peças essenciais premium.
            </p>
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {products.length} Resultados
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-12">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block h-[calc(100vh-140px)] sticky top-32 overflow-hidden">
            {renderFilters(false)}
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between uppercase font-bold tracking-wider h-12">
                  Filtrar & Ordenar
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] sm:w-[380px] p-6">
                {renderFilters(true)}
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="bg-secondary aspect-[3/4] w-full rounded-md" />
                    <div className="h-4 bg-secondary w-2/3 rounded-full" />
                    <div className="h-4 bg-secondary w-1/3 rounded-full" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] mb-4 bg-secondary overflow-hidden rounded-md">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest bg-secondary/50">
                          Sem Imagem
                        </div>
                      )}

                      {/* Overlay / Quick Add */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                          onClick={() => {
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              imageUrl: product.image,
                            });
                            toast.success("Adicionado à sacola");
                          }}
                          className="w-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wider rounded shadow-lg"
                        >
                          Adicionar Rápido +
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm uppercase tracking-wide text-foreground line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border rounded-xl border-dashed">
                <p className="text-xl font-medium text-muted-foreground mb-2">Nenhum produto encontrado.</p>
                <p className="text-sm text-muted-foreground mb-6">Tente ajustar seus filtros de busca.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
