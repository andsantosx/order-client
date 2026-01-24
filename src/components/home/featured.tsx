import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { getAll as getAllProducts } from "@/services/product/getAll"

export function Featured() {
  const [featured, setFeatured] = useState<any[]>([])

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const products = await getAllProducts()
        setFeatured(products.slice(0, 2))
      } catch (error) {
        console.error("Failed to load featured products", error)
      }
    }
    loadFeatured()
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Coleções Especiais
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl overflow-hidden bg-background border p-8"
            >
              <div className="flex flex-col justify-end h-full">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xl font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </p>
                  <Button variant="outline" className="rounded-full">
                    Ver Detalhes <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
