import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ShoppingBag, Heart, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAll as getAllProducts, type Product } from "@/services/product/getAll"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { useAuthStore } from "@/store/authStore"
import { add as addToWishlistApi } from "@/services/wishlist/add"
import { remove as removeFromWishlistApi } from "@/services/wishlist/remove"
import toast from "react-hot-toast"
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCartStore()
  const { isInWishlist, addItem: addToWishlistStore, removeItem: removeFromWishlistStore, updateItem: updateWishlistStore, items: wishlistItems } = useWishlistStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data.slice(0, 6))
      } catch (error) {
        console.error("Failed to load featured products", error)
      }
    }
    loadProducts()
  }, [])

  const toggleWishlist = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation() // Prevent navigation
    const isLoved = isInWishlist(product.id)
    const wishlistItem = wishlistItems.find(i => i.id === product.id)

    // Optimistic update
    if (isLoved) {
      removeFromWishlistStore(product.id)
      if (user && wishlistItem?.wishlistId) {
        try {
          await removeFromWishlistApi(wishlistItem.wishlistId)
        } catch (error) {
          console.error("Error removing from wishlist", error)
        }
      }
      toast.success("Removido dos favoritos")
    } else {
      addToWishlistStore({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        addedAt: Date.now()
      })

      toast.success("Adicionado aos favoritos")

      if (user) {
        try {
          const newWishlistId = await addToWishlistApi(product.id)
          updateWishlistStore(product.id, { wishlistId: newWishlistId })
        } catch (error) {
          console.error("Error adding to wishlist", error)
        }
      }
    }
  }

  const handleProductClick = (productId: string) => {
    navigate(`/produto/${productId}`)
  }

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <AnimateOnScroll animation="fade-up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Seleção da Semana</p>
              <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
                Destaques
              </h2>
            </div>
            <Button variant="link" className="hidden md:flex text-sm font-bold uppercase tracking-widest group px-0" asChild>
              <a href="/loja">
                Ver Todos
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Button>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <AnimateOnScroll key={product.id} animation="fade-up" delay={index * 100}>
              <div
                className="group cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-secondary">
                  {product.image ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {product.images?.[1] && (
                        <img
                          src={product.images[1]}
                          alt={product.name}
                          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                      Sem Imagem
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        addItem({ ...product, imageUrl: product.image, quantity: 1 })
                        toast.success("Adicionado à sacola")
                      }}
                      className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-xs shadow-lg rounded-none"
                    >
                      <ShoppingBag className="mr-2 h-3 w-3" />
                      Adicionar Rápido
                    </Button>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/0 hover:bg-white/20 transition-all text-white opacity-0 group-hover:opacity-100"
                  >
                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? "fill-white text-white" : "text-white"}`} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-[var(--font-display)] font-bold text-lg uppercase tracking-wide text-foreground group-hover:underline decoration-1 underline-offset-4">
                      {product.name}
                    </h3>
                    <span className="font-mono text-sm text-foreground">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {product.stock > 0 ? 'Em Estoque' : 'Indisponível'}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
