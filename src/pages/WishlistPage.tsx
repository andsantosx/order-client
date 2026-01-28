import { useEffect } from "react"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlistStore } from "@/store/wishlistStore"
import { useCartStore } from "@/store/cartStore"
import { useAuthStore } from "@/store/authStore"
import { getAll as getWishlistItems } from "@/services/wishlist/getAll"
import { remove as removeFromWishlist } from "@/services/wishlist/remove"
import toast from "react-hot-toast"

export function WishlistPage() {
  const { items, removeItem, clearWishlist, setItems } = useWishlistStore()
  const { addItem } = useCartStore()
  const { user } = useAuthStore()

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return
      try {
        const apiItems = await getWishlistItems()
        setItems(apiItems)
      } catch (error) {
        console.error("Failed to sync wishlist", error)
        // Optionally keep local items if API fails, or show error
      }
    }
    fetchWishlist()
  }, [user, setItems])

  const handleRemove = async (id: string) => {
    if (user) {
      try {
        await removeFromWishlist(id)
      } catch (error) {
        toast.error("Erro ao remover do backend")
        return // Don't remove locally if backend failed? Or optimistic?
        // Let's be optimistic usually, but here simple is fine
      }
    }
    removeItem(id)
  }

  const handleMoveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.image,
    })
    handleRemove(item.id)
    toast.success("Movido para a sacola!")
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Heart className="h-10 w-10 text-primary" />
            Meus Favoritos
          </h1>
          <p className="text-lg text-muted-foreground">
            {items.length} produto{items.length !== 1 ? "s" : ""} salvo{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Lista vazia</h2>
            <p className="text-muted-foreground mb-6">Você ainda não adicionou nenhum produto aos favoritos</p>
            <a href="/loja">
              <Button>Ir para a Loja</Button>
            </a>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-foreground text-lg line-clamp-2">{item.name}</h3>
                    <p className="text-xl font-bold text-primary">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Adicionar
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => clearWishlist()}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Limpar favoritos
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
