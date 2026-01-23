import { useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { productService } from "@/services/product.service"

export function Categories() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [categories, setCategories] = useState<{ id: string; name: string; description: string; image: string; count: string }[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await productService.getCategories()
        const mappedCategories = data.map((cat) => ({
          id: cat.id,
          name: cat.name,
          description: "Explore nossa seleção", // Dynamic description could be added if API supported it
          image: cat.image,
          count: `${cat.count} peças`
        }))
        setCategories(mappedCategories)
      } catch (error) {
        console.error("Failed to load categories", error)
      }
    }
    loadCategories()
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-medium text-primary tracking-wide mb-3">Categorias</p>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Explore por estilo
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground lg:text-right">
            Encontre sua identidade visual em nossas colecoes cuidadosamente curadas.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className={`w-full h-full object-cover transition-all duration-700 ${hoveredId === category.id ? "scale-110" : "scale-100"
                  }`}
              />

              {/* Overlay */}
              <div className={`absolute inset-0 transition-all duration-500 ${hoveredId === category.id
                ? "bg-gradient-to-t from-background via-background/60 to-transparent"
                : "bg-gradient-to-t from-background/90 via-background/30 to-transparent"
                }`} />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-primary tracking-wide px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
                    {category.count}
                  </span>
                  <span className="text-xs text-muted-foreground">0{index + 1}</span>
                </div>

                <h3 className="font-[var(--font-display)] text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {category.name}
                </h3>

                <div className={`flex items-center justify-between transition-all duration-500 ${hoveredId === category.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}>
                  <p className="text-muted-foreground">{category.description}</p>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Border glow effect */}
              <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 ${hoveredId === category.id ? "border-primary/50" : "border-transparent"
                }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
