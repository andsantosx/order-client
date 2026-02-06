import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

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
          <aside className="hidden lg:block">
            <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-lg" />}>
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
                    className="mt-6"
                  />
                </Suspense>
                <div className="mt-8 pt-4 border-t border-border">
                  <Button className="w-full font-bold uppercase tracking-wider">
                    Ver {products.length} Resultados
                  </Button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-md" />
                    <Skeleton className="h-4 w-2/3 rounded-full" />
                    <Skeleton className="h-4 w-1/3 rounded-full" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
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

                      {/* Overlay / Quick Add */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation when clicking 'add'
                            addItem({
                              productId: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              size: "M", // Default size for quick add
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
              <div className="py-24 text-center border rounded-xl border-dashed">
                <p className="text-xl font-medium text-muted-foreground mb-2">Nenhum produto encontrado.</p>
                <p className="text-sm text-muted-foreground mb-6">Tente ajustar seus filtros de busca.</p>
                <Button variant="outline" onClick={clearAllFilters}>
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
