import { useState, useEffect } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAll as getAllProducts, type Product } from "@/services/product/getAll"
import { useCartStore } from "@/store/cartStore"
import toast from "react-hot-toast"

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCartStore()

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

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Destaques da Semana
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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

                <Button
                  className="w-full"
                  onClick={() => {
                    addItem({ ...product, quantity: 1 })
                    toast.success("Adicionado ao carrinho")
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
