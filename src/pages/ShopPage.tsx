import { useState, useMemo } from "react";
import { Heart, ShoppingBag, Eye, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allProducts, categories } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import toast from "react-hot-toast";

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [sortBy, setSortBy] = useState("newest");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlistStore();

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, searchTerm, priceRange, sortBy]);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedColor: product.colors[0],
    });
    toast.success("Adicionado à sacola!");
  };

  const handleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removido dos favoritos");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: new Date().getTime(),
      });
      toast.success("Adicionado aos favoritos!");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nossa Coleção
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore nossa seleção exclusiva de roupas e acessórios de alta
            qualidade
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

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Categoria
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === ""
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  Todas
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-foreground"
                    }`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
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
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>R$ 0</span>
                  <span>R$ {priceRange[1].toLocaleString("pt-BR")}</span>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground"
              >
                <option value="newest">Mais Novo</option>
                <option value="price-low">Preço: Menor</option>
                <option value="price-high">Preço: Maior</option>
                <option value="rating">Melhor Avaliação</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredProducts.length} produtos
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum produto encontrado
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          hoveredId === product.id ? "scale-110" : "scale-100"
                        }`}
                      />

                      {/* Tag */}
                      {product.tag && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                            product.tag.includes("%")
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary/80 text-foreground border border-border"
                          }`}
                        >
                          {product.tag}
                        </div>
                      )}

                      {/* Stock */}
                      {product.stock < 10 && (
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-destructive/20 text-destructive text-xs font-medium backdrop-blur-sm">
                          {product.stock} em estoque
                        </div>
                      )}

                      {/* Actions */}
                      <div
                        className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                          hoveredId === product.id ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <button
                          onClick={() => handleWishlist(product)}
                          className={`p-3 rounded-full transition-all ${
                            isInWishlist(product.id)
                              ? "bg-destructive text-white"
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                        >
                          <Heart
                            className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                          />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                        >
                          <ShoppingBag className="h-5 w-5" />
                        </button>
                        <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all">
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-3">
                        <p className="font-bold text-lg text-foreground">
                          R$ {product.price.toLocaleString("pt-BR")}
                        </p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            R$ {product.originalPrice.toLocaleString("pt-BR")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
