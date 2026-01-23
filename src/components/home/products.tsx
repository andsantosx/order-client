import { useState, useEffect } from "react"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { productService } from "@/services/product.service"
import type { Product } from "@/types"
import { useCartStore } from "@/store/cartStore"
import toast from "react-hot-toast"

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [likedIds, setLikedIds] = useState<string[]>([])
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getFeatured(6)
        setProducts(data)
      } catch (error) {
        console.error("Failed to load featured products", error)
      }
    }
    loadProducts()
  }, [])

  const toggleLike = (id: string) => {
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedColor: product.colors[0],
    })
    toast.success("Adicionado à sacola!")
  }

  return (
    <section className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-medium text-primary tracking-wide mb-3">Em Destaque</p>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Peças selecionadas
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full border-border bg-transparent hover:bg-secondary">
              Todos
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">
              Masculino
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">
              Feminino
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card mb-5">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredId === product.id ? "scale-105" : "scale-100"
                    }`}
                />

                {/* Tag */}
                {product.tag && (
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${product.tag.includes("%")
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/80 text-foreground border border-border"
                    }`}>
                    {product.tag}
                  </div>
                )}

                {/* Actions */}
                <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${hoveredId === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}>
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${likedIds.includes(product.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/80 text-foreground hover:bg-secondary border border-border"
                      }`}
                  >
                    <Heart className={`h-4 w-4 ${likedIds.includes(product.id) ? "fill-current" : ""}`} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center hover:bg-secondary border border-border transition-all">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to cart */}
                <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="font-[var(--font-display)] text-lg font-semibold text-foreground">
                    R$ {product.price.toLocaleString("pt-BR")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {product.originalPrice.toLocaleString("pt-BR")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <Button variant="outline" size="lg" className="rounded-full border-border px-12 bg-transparent hover:bg-secondary">
            Ver todos os produtos
          </Button>
        </div>
      </div>
    </section>
  )
}
