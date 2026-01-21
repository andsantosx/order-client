import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Sparkles } from "lucide-react"

const collections = [
  {
    id: 1,
    title: "Midnight",
    subtitle: "Collection",
    description: "Elegancia noturna para quem domina a cidade",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    tag: "Exclusivo",
  },
  {
    id: 2,
    title: "Future",
    subtitle: "Tech Wear",
    description: "Inovacao e performance para o amanha",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1920&auto=format&fit=crop",
    tag: "Lancamento",
  },
]

export function Featured() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/10 blur-[150px] rounded-full" />
      
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Colecoes Especiais</span>
            </div>
            <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Feitas para destacar
            </h2>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(collection.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.title}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  hoveredId === collection.id ? "scale-110" : "scale-100"
                }`}
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className={`absolute inset-0 transition-all duration-500 ${
                hoveredId === collection.id ? "bg-primary/20" : "bg-transparent"
              }`} />
              
              {/* Tag */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm">
                  {collection.tag}
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                <h3 className="font-[var(--font-display)] text-5xl lg:text-7xl font-bold text-foreground leading-none">
                  {collection.title}
                  <span className="block text-3xl lg:text-4xl font-light text-foreground/70 mt-2">
                    {collection.subtitle}
                  </span>
                </h3>
                
                <div className={`flex items-center justify-between mt-6 transition-all duration-500 ${
                  hoveredId === collection.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <p className="text-muted-foreground max-w-xs">{collection.description}</p>
                  <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14 p-0">
                    <ArrowUpRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              
              {/* Border effect */}
              <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 ${
                hoveredId === collection.id ? "border-primary/50" : "border-white/5"
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
