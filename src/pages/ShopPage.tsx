import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { AddedToCartToast } from "@/components/cart/AddedToCartToast";
import { QuickAddOverlay } from "@/components/shop/QuickAddOverlay";

import { getAll as getAllProducts, type Product } from "@/services/product/getAll";
import { getFilters } from "@/services/product/getFilters";
import { useEffect, useState, useMemo, useRef, Suspense, lazy } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { generateProductCacheKey } from "@/lib/cacheKey";
const ActiveFilters = lazy(() => import("@/components/shop/active-filters").then(m => ({ default: m.ActiveFilters })));
const FilterSidebar = lazy(() => import("@/components/shop/filter-sidebar").then(m => ({ default: m.FilterSidebar })));
import { useProductStore } from "@/store/productStore";

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickAddProductId, setQuickAddProductId] = useState<string | null>(null);

  // Initialize filters from URL
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";
  const initialSortBy = searchParams.get("sort") || "newest";
  const initialSearch = searchParams.get("search") || "";

  // Parse arrays from URL (comma separated)
  const initialSizes = searchParams.get("sizes") ? searchParams.get("sizes")!.split(",") : [];
  const initialBrands = searchParams.get("brands") ? searchParams.get("brands")!.split(",") : [];

  // Support both 'category' (singular, preferred for single links) and 'categories' (plural)
  const singularCategory = searchParams.get("category");
  const pluralCategories = searchParams.get("categories") ? searchParams.get("categories")!.split(",") : [];

  const initialCategories = singularCategory
    ? [...pluralCategories, singularCategory].filter((v, i, a) => a.indexOf(v) === i) // unique
    : pluralCategories;

  // Local Filter States
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  // Applied Filter States
  const [activeMinPrice, setActiveMinPrice] = useState<number | undefined>(initialMinPrice ? Number(initialMinPrice) : undefined);
  const [activeMaxPrice, setActiveMaxPrice] = useState<number | undefined>(initialMaxPrice ? Number(initialMaxPrice) : undefined);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialSizes);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const {
    availableCategories,
    availableBrands,
    availableSizes,
    filtersLoaded,
    setFilters,
    getCachedProducts,
    setCachedProducts
  } = useProductStore();

  const { addItem } = useCartStore();
  const requestIdRef = useRef(0);

  // Create a unique key for the current set of filters (DETERMINISTIC)
  const cacheKey = useMemo(() => generateProductCacheKey({
    search: searchParams.get("search") || "",
    categories: selectedCategories,
    brands: selectedBrands,
    sizes: selectedSizes,
    minPrice: activeMinPrice,
    maxPrice: activeMaxPrice,
    sortBy
  }), [searchParams, selectedCategories, selectedBrands, selectedSizes, activeMinPrice, activeMaxPrice, sortBy]);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Sort
    if (sortBy !== "newest") params.set("sort", sortBy);
    else params.delete("sort");

    // Price
    if (activeMinPrice) params.set("minPrice", activeMinPrice.toString());
    else params.delete("minPrice");
    if (activeMaxPrice) params.set("maxPrice", activeMaxPrice.toString());
    else params.delete("maxPrice");

    // Arrays
    if (selectedSizes.length > 0) params.set("sizes", selectedSizes.join(","));
    else params.delete("sizes");

    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","));
    else params.delete("brands");

    // Check if we have a single category to use the cleaner '?category=' param
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0]);
      params.delete("categories"); // Remove plural if it exists
    } else if (selectedCategories.length > 1) {
      params.set("categories", selectedCategories.join(","));
      params.delete("category"); // Remove singular
    } else {
      params.delete("categories");
      params.delete("category");
    }

    // Search
    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");

    setSearchParams(params, { replace: true });
  }, [sortBy, activeMinPrice, activeMaxPrice, selectedSizes, selectedCategories, selectedBrands, searchQuery]);

  // Sync from URL to State (handle external searches, e.g. Header)
  useEffect(() => {
    const s = searchParams.get("search") || "";
    if (s !== searchQuery) {
      setSearchQuery(s);
    }
  }, [searchParams]);

  // Fetch Products & Filters
  useEffect(() => {
    fetchProducts();
  }, [cacheKey]); // Use cacheKey as dependency instead of whole searchParams for better control

  useEffect(() => {
    const fetchFilters = async () => {
      if (filtersLoaded) return; // ORCHESTRATION: Don't fetch if already in store

      try {
        const data = await getFilters();
        setFilters(data);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };
    fetchFilters();
  }, [filtersLoaded, setFilters]);

  const fetchProducts = async () => {
    // 1. Check if we have this specific query cached
    const cached = getCachedProducts(cacheKey);
    if (cached) {
      setProducts(cached);
      setIsLoading(false);
      return; // ORCHESTRATION: Satisfied from cache
    }

    // 2. Race condition protection: increment request ID
    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    setIsLoading(true);
    const searchFromUrl = (searchParams.get("search") || "").trim();

    try {
      const data = await getAllProducts({
        search: searchFromUrl,
        categories: selectedCategories,
        brands: selectedBrands,
        sizes: selectedSizes,
        minPrice: activeMinPrice,
        maxPrice: activeMaxPrice,
        sortBy
      });

      // 3. Only update state if this is still the latest request
      if (currentRequestId === requestIdRef.current) {
        setProducts(data);
        setCachedProducts(cacheKey, data); // ORCHESTRATION: Save to cache
      }
    } catch (error) {
      // Only show error if this is still the latest request
      if (currentRequestId === requestIdRef.current) {
        console.error("Failed to fetch products:", error);
        toast.error("Unable to load products");
      }
    } finally {
      // Only update loading state if this is still the latest request
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  const applyPriceFilter = () => {
    setActiveMinPrice(minPrice ? Number(minPrice) : undefined);
    setActiveMaxPrice(maxPrice ? Number(maxPrice) : undefined);
  };

  const clearAllFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setActiveMinPrice(undefined);
    setActiveMaxPrice(undefined);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortBy("newest");
    setSearchQuery("");
    // URL update handled by useEffect
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-8">
          {/* Controls Bar */}
          <div className="flex items-center justify-between border-b border-border pb-4 mb-2">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 uppercase font-medium tracking-widest text-[13px] hover:text-primary transition-colors py-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtrar e Ordenar
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[380px] p-0 border-l border-border bg-background">
                <div className="h-full flex flex-col">
                  <div className="px-6 py-8 flex items-center justify-between border-b border-border">
                    <h2 className="text-xl font-black uppercase tracking-tight leading-none text-foreground">
                      FILTRAR E<br />ORDENAR
                    </h2>
                    <SheetClose className="opacity-80 transition-opacity hover:opacity-100 focus:outline-none">
                        <X className="h-5 w-5" strokeWidth={1} />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
                      <FilterSidebar
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        applyPriceFilter={applyPriceFilter}
                        selectedSizes={selectedSizes}
                        setSelectedSizes={setSelectedSizes}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        availableCategories={availableCategories}
                        availableBrands={availableBrands}
                        availableSizes={availableSizes}
                        selectedBrands={selectedBrands}
                        setSelectedBrands={setSelectedBrands}
                      />
                    </Suspense>
                  </div>

                  <div className="p-8 border-t border-border">
                    <SheetClose asChild>
                      <Button 
                        className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-[0.2em] text-[10px] rounded-none transition-all"
                      >
                        Ver {products.length} Resultados
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid Area */}
          <div>
            <Suspense fallback={<Skeleton className="h-20 w-full mb-8" />}>
              <ActiveFilters
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                minPrice={activeMinPrice}
                maxPrice={activeMaxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setActiveMinPrice={setActiveMinPrice}
                setActiveMaxPrice={setActiveMaxPrice}
                clearAll={clearAllFilters}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </Suspense>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-md" />
                    <Skeleton className="h-4 w-2/3 rounded-full" />
                    <Skeleton className="h-4 w-1/3 rounded-full" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/produto/${product.id}`)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] mb-4 bg-secondary overflow-hidden rounded-md">
                      {product.image ? (
                        <>
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className={`h-full w-full object-cover transition-all duration-700 ${product.images && product.images[1] ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                          />
                          {product.images && product.images[1] && (
                            <img
                              src={product.images[1]}
                              alt={`${product.name} view 2`}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-105"
                            />
                          )}
                        </>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest bg-secondary/50">
                          Sem Imagem
                        </div>
                      )}

                      {/* Quick Add Overlay */}
                      {quickAddProductId === product.id && (
                        <QuickAddOverlay 
                          sizes={product.sizes || []}
                          onClose={() => setQuickAddProductId(null)}
                          onSelect={(sizeName) => {
                            addItem({
                              productId: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              size: sizeName,
                              imageUrl: product.image,
                            });
                            
                            setQuickAddProductId(null);
                            
                            toast.custom((t) => (
                              <AddedToCartToast 
                                t={t}
                                product={{
                                  name: product.name,
                                  price: product.price,
                                  imageUrl: product.image,
                                  size: sizeName
                                }}
                                cartSummary={{
                                  totalItems: useCartStore.getState().getItemCount(),
                                  totalAmount: useCartStore.getState().getTotal()
                                }}
                                onViewCart={() => useCartStore.getState().toggleCart()}
                              />
                            ), { duration: 4000, position: 'top-right' });
                          }}
                        />
                      )}

                      {/* Overlay / Quick Add Button - Hidden on Mobile */}
                      <div className="hidden lg:block absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation when clicking 'add'
                            setQuickAddProductId(product.id);
                          }}
                          className="w-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.2em] text-[10px] rounded-none shadow-lg h-10"
                        >
                          Adicionar Rápido +
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm uppercase tracking-wide text-foreground line-clamp-1 group-hover:text-primary transition-colors">
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
              <div className="py-24 text-center border rounded-xl border-dashed flex flex-col items-center justify-center">
                <div className="w-32 h-32 mb-6 opacity-20 grayscale">
                  <img src="/no-product.png" alt="Nenhum produto" className="w-full h-full object-contain" />
                </div>
                <p className="text-xl font-medium text-muted-foreground mb-2">Nenhum produto encontrado.</p>
                <p className="text-sm text-muted-foreground mb-6">Tente ajustar seus filtros de busca.</p>
                <Button variant="outline" onClick={clearAllFilters} className="rounded-none border-foreground/20 hover:border-foreground uppercase tracking-widest text-[10px] font-black h-12 px-8">
                  Limpar Todos os Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
