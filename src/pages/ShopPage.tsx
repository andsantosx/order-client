import { Search, SlidersHorizontal, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { getAll as getAllProducts, type Product } from "@/services/product/getAll";
import { useEffect, useState } from "react";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");
  const { addItem } = useCartStore();

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    search: true,
    price: true,
    sort: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, priceRange, sortBy]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts({
        search: searchTerm,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
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

  // Initial load is handled by the useEffect above due to initial state


  const FilterContent = () => (
    <div className="space-y-8">
      {/* Label */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <span className="text-xl font-black uppercase tracking-tighter">Filters</span>
        <SlidersHorizontal className="w-5 h-5" />
      </div>

      {/* Search Filter */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('search')}
          className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider"
        >
          Search
          {openSections.search ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        {openSections.search && (
          <div className="relative">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 bg-transparent border-input"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider"
        >
          Price
          {openSections.price ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        {openSections.price && (
          <div className="space-y-4 pt-2">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1 bg-secondary appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider"
        >
          Sort By
          {openSections.sort ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        {openSections.sort && (
          <div className="space-y-2">
            {[
              { label: "Newest", value: "newest" },
              { label: "Price: Low to High", value: "price-low" },
              { label: "Price: High to Low", value: "price-high" }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 border border-input flex items-center justify-center ${sortBy === option.value ? 'bg-primary border-primary' : ''}`}>
                  {sortBy === option.value && <div className="w-2 h-2 bg-background" />}
                </div>
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="hidden"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-4 leading-none">
              All<br />Products
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm">
              Explore our latest collection of premium essentials.
            </p>
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {products.length} Results
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-12">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block h-fit sticky top-32">
            <FilterContent />
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between uppercase font-bold tracking-wider">
                  Filter & Sort
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="py-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="bg-secondary aspect-[3/4] w-full" />
                    <div className="h-4 bg-secondary w-2/3" />
                    <div className="h-4 bg-secondary w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] mb-4 bg-secondary overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                          No Image
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
                            toast.success("Added to Bag");
                          }}
                          className="w-full bg-white text-black hover:bg-white/90 font-bold uppercase tracking-wider rounded-none"
                        >
                          Quick Add +
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm uppercase tracking-wide text-foreground">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
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
              <div className="py-24 text-center">
                <p className="text-xl font-medium text-muted-foreground">No products found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("");
                    setPriceRange([0, 1000]);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
